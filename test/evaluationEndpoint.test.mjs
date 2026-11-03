import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import {
  RUBRIC_WEIGHTS,
  calculateWeightedAnswerScore,
  parseDimensionScore,
  calculateInterviewAggregates,
} from '../src/lib/scoringRubric';
import {
  RUBRIC_WEIGHTS as WORKER_RUBRIC_WEIGHTS,
  calculateWeightedAnswerScore as workerCalculateWeightedScore,
  parseDimensionScore as workerParseScore,
  calculateInterviewAggregates as workerCalculateAggregates,
} from '../worker/ai/scoringRubric';
import { authMiddleware } from '../worker/middleware/auth';
import { interviewRouter } from '../worker/routes/interviews';

console.log('🧪 Starting HirePilot AI Evaluation & 405 Prevention Test Suite...\n');

let passedTests = 0;
let totalTests = 0;

function test(description, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ PASS: ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${description}`);
    console.error(err);
    process.exitCode = 1;
  }
}

async function testAsync(description, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  ✅ PASS: ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${description}`);
    console.error(err);
    process.exitCode = 1;
  }
}

async function runAllTests() {
  const rootDir = process.cwd();

  // -----------------------------------------------------------------------------
  // 1. Vercel & URL Routing Configuration (Root Cause of 405)
  // -----------------------------------------------------------------------------
  console.log('--- 1. Testing Vercel Rewrite & URL Routing Configuration ---');

  test('vercel.json routes /api/:path* to Cloudflare Worker before /(.*) SPA fallback', () => {
    const vercelConfig = JSON.parse(fs.readFileSync(path.join(rootDir, 'vercel.json'), 'utf8'));
    assert.ok(Array.isArray(vercelConfig.rewrites), 'vercel.json must define rewrites');

    const apiRewriteIndex = vercelConfig.rewrites.findIndex(r => r.source === '/api/:path*');
    const spaFallbackIndex = vercelConfig.rewrites.findIndex(r => r.source === '/(.*)');

    assert.ok(apiRewriteIndex !== -1, 'vercel.json must include /api/:path* rewrite rule');
    assert.ok(spaFallbackIndex !== -1, 'vercel.json must include /(.*) SPA rewrite rule');
    assert.ok(
      apiRewriteIndex < spaFallbackIndex,
      'The /api/:path* rewrite rule MUST precede the /(.*) fallback to prevent POST /api rewriting to index.html (405)'
    );
    assert.ok(
      vercelConfig.rewrites[apiRewriteIndex].destination.includes('hirepilotapp.workers.dev'),
      'Destination must proxy to the live Cloudflare Worker'
    );
  });

  test('src/lib/api.ts defaults to live Cloudflare Worker in production when env var is absent', () => {
    const apiCode = fs.readFileSync(path.join(rootDir, 'src', 'lib', 'api.ts'), 'utf8');
    assert.ok(
      apiCode.includes('PRODUCTION_WORKER_URL = \'https://hirepilot-api.hirepilotapp.workers.dev/api\''),
      'Must define PRODUCTION_WORKER_URL constant'
    );
    assert.ok(
      apiCode.includes('import.meta.env.PROD ? PRODUCTION_WORKER_URL : \'/api\''),
      'Must use PRODUCTION_WORKER_URL in production when VITE_WORKER_API_URL is undefined'
    );
  });

  // -----------------------------------------------------------------------------
  // 2. HTTP Method Handling & 405 Verification
  // -----------------------------------------------------------------------------
  console.log('--- 2. Testing HTTP Methods & 405 Method Not Allowed ---');

  // Build a test Hono app matching worker/index.ts
  const testApp = new Hono();
  testApp.use('*', cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  }));
  testApp.use('/api/*', authMiddleware);
  testApp.route('/api/interviews', interviewRouter);

  await testAsync('OPTIONS preflight to /api/interviews/:id/answer succeeds with 204 without auth', async () => {
    const req = new Request('http://localhost/api/interviews/test-int/answer', {
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://hire-pilot-dusky.vercel.app',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type,Authorization',
      },
    });
    const res = await testApp.fetch(req, { GEMINI_API_KEY: 'test', SUPABASE_URL: 'https://test.supabase.co', SUPABASE_SERVICE_ROLE_KEY: 'test' });
    assert.equal(res.status, 204, 'CORS preflight OPTIONS should return 204 No Content');
    assert.equal(res.headers.get('Access-Control-Allow-Origin'), '*');
  });

  await testAsync('Missing Authorization header on POST /api/interviews/:id/answer returns 401 Unauthorized', async () => {
    const req = new Request('http://localhost/api/interviews/test-int/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question_id: 'q1', user_answer: 'test' }),
    });
    const res = await testApp.fetch(req, { GEMINI_API_KEY: 'test', SUPABASE_URL: 'https://test.supabase.co', SUPABASE_SERVICE_ROLE_KEY: 'test' });
    assert.equal(res.status, 401);
    const body = await res.json();
    assert.ok(body.error.includes('Missing or invalid Authorization header'));
  });

  await testAsync('Invalid HTTP method (GET) on /api/interviews/:id/answer returns 405 with Allow: POST', async () => {
    // Inject mock user context for router-level test
    const methodApp = new Hono();
    methodApp.use('*', async (c, next) => {
      c.set('user', { userId: 'u1', userEmail: 'u1@example.com' });
      await next();
    });
    methodApp.route('/api/interviews', interviewRouter);

    const req = new Request('http://localhost/api/interviews/test-int/answer', {
      method: 'GET',
    });
    const res = await methodApp.fetch(req, { GEMINI_API_KEY: 'test', SUPABASE_URL: 'https://test.supabase.co', SUPABASE_SERVICE_ROLE_KEY: 'test' });
    assert.equal(res.status, 405, 'Non-POST method should be rejected with 405 Method Not Allowed');
    assert.ok(res.headers.get('Allow')?.includes('POST'), 'Response must include Allow header specifying POST');
    const body = await res.json();
    assert.ok(body.error.includes('Expected POST'), 'Response body must state Expected POST');
  });

  await testAsync('Invalid HTTP method (PUT) on /api/interviews/:id/answer returns 405', async () => {
    const methodApp = new Hono();
    methodApp.use('*', async (c, next) => {
      c.set('user', { userId: 'u1', userEmail: 'u1@example.com' });
      await next();
    });
    methodApp.route('/api/interviews', interviewRouter);

    const req = new Request('http://localhost/api/interviews/test-int/answer', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_answer: 'test' }),
    });
    const res = await methodApp.fetch(req, { GEMINI_API_KEY: 'test', SUPABASE_URL: 'https://test.supabase.co', SUPABASE_SERVICE_ROLE_KEY: 'test' });
    assert.equal(res.status, 405);
  });

  // -----------------------------------------------------------------------------
  // 3. User Ownership & Database Failure Handling
  // -----------------------------------------------------------------------------
  console.log('--- 3. Testing Ownership Validation & Database Error Handling ---');

  await testAsync('Interview not found or owned by another user returns 404', async () => {
    const mockSupabase = {
      from: (table) => ({
        select: () => ({
          eq: () => ({
            eq: () => ({
              single: async () => ({ data: null, error: { message: 'Row not found' } }),
            }),
          }),
        }),
      }),
    };

    const mockApp = new Hono();
    mockApp.use('*', async (c, next) => {
      c.set('user', { userId: 'user-attacker', userEmail: 'attacker@example.com' });
      await next();
    });
    mockApp.route('/api/interviews', interviewRouter);

    const req = new Request('http://localhost/api/interviews/forbidden-id/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question_id: 'q1', user_answer: 'Valid answer' }),
    });
    const res = await mockApp.fetch(req, {
      GEMINI_API_KEY: 'test',
      SUPABASE_URL: 'https://test.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'test',
    });
    assert.equal(res.status, 404);
    const body = await res.json();
    assert.ok(body.error.includes('not found or access denied'));
  });

  // -----------------------------------------------------------------------------
  // 4. Scoring Rubric Consistency (Backend <-> Frontend)
  // -----------------------------------------------------------------------------
  console.log('--- 4. Testing Score Consistency Between Backend and Frontend ---');

  test('Backend and Frontend scoring weights are strictly identical', () => {
    assert.equal(RUBRIC_WEIGHTS.ACCURACY, WORKER_RUBRIC_WEIGHTS.ACCURACY);
    assert.equal(RUBRIC_WEIGHTS.RELEVANCE, WORKER_RUBRIC_WEIGHTS.RELEVANCE);
    assert.equal(RUBRIC_WEIGHTS.COMPLETENESS, WORKER_RUBRIC_WEIGHTS.COMPLETENESS);
    assert.equal(RUBRIC_WEIGHTS.CLARITY, WORKER_RUBRIC_WEIGHTS.CLARITY);
    assert.equal(RUBRIC_WEIGHTS.ACCURACY, 0.40);
    assert.equal(RUBRIC_WEIGHTS.RELEVANCE, 0.25);
    assert.equal(RUBRIC_WEIGHTS.COMPLETENESS, 0.20);
    assert.equal(RUBRIC_WEIGHTS.CLARITY, 0.15);
  });

  test('calculateWeightedAnswerScore produces identical scores on both ends', () => {
    const testCases = [
      { accuracy: 10, relevance: 10, completeness: 10, clarity: 10 },
      { accuracy: 0, relevance: 0, completeness: 0, clarity: 0 },
      { accuracy: 8.5, relevance: 9.0, completeness: 7.5, clarity: 8.0 },
      { accuracy: 7.0, relevance: 5.0, completeness: 6.0, clarity: 9.0 },
    ];

    for (const tc of testCases) {
      const frontendScore = calculateWeightedAnswerScore(tc);
      const backendScore = workerCalculateWeightedScore(tc);
      assert.equal(frontendScore, backendScore, `Score mismatch on ${JSON.stringify(tc)}: FE=${frontendScore}, BE=${backendScore}`);
    }
  });

  test('calculateInterviewAggregates produces identical overall and dimension aggregates', () => {
    const answers = [
      { accuracy: 9, relevance: 8, completeness: 8, clarity: 9 },
      { accuracy: 7, relevance: 6, completeness: 7, clarity: 8 },
      { accuracy: 8, relevance: 9, completeness: 8, clarity: 7 },
    ];

    const feAgg = calculateInterviewAggregates(answers);
    const beAgg = workerCalculateAggregates(answers);

    assert.equal(feAgg.overallScore, beAgg.overallScore);
    assert.equal(feAgg.technicalScore, beAgg.technicalScore);
    assert.equal(feAgg.problemSolvingScore, beAgg.problemSolvingScore);
    assert.equal(feAgg.communicationScore, beAgg.communicationScore);
    assert.equal(feAgg.answerQualityScore, beAgg.answerQualityScore);
  });

  // -----------------------------------------------------------------------------
  // 5. No Fake Scores & Answer Preservation on Failure
  // -----------------------------------------------------------------------------
  console.log('--- 5. Testing Error Preservation & No Fake Score Guarantee ---');

  test('submitAnswer never assigns a fake score when API request fails', () => {
    const apiCode = fs.readFileSync(path.join(rootDir, 'src', 'lib', 'api.ts'), 'utf8');
    // Verify that submitAnswer does NOT fall back to fallbackSubmitAnswer
    const submitAnswerBlock = apiCode.substring(
      apiCode.indexOf('async submitAnswer('),
      apiCode.indexOf('async getNextQuestion(')
    );
    assert.ok(
      !submitAnswerBlock.includes('return fallbackSubmitAnswer'),
      'submitAnswer MUST NOT silently return fallbackSubmitAnswer with fake scores'
    );
    assert.ok(
      submitAnswerBlock.includes('throw new Error('),
      'submitAnswer must throw meaningful errors so UI can preserve candidate answer and show retry'
    );
  });

  // -----------------------------------------------------------------------------
  // Summary
  // -----------------------------------------------------------------------------
  console.log('\n========================================');
  console.log(`🎉 EVALUATION TEST RESULTS: ${passedTests} / ${totalTests} Passed`);
  console.log('========================================\n');
}

runAllTests().catch((err) => {
  console.error('Fatal evaluation test error:', err);
  process.exit(1);
});

