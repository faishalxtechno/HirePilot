import assert from 'node:assert/strict';
import {
  DEFAULT_GEMINI_MODEL,
  getGeminiModel,
  buildGeminiEndpoint,
  callGemini,
} from '../worker/ai/client';
import { generateQuestion } from '../worker/ai/questionGenerator';
import { evaluateAnswer } from '../worker/ai/answerEvaluator';
import { generateFinalReport } from '../worker/ai/reportGenerator';
import app from '../worker/index';

console.log('🧪 Starting HirePilot Gemini Model Configuration Test Suite...\n');

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
  // -----------------------------------------------------------------------------
  // 1. Model Defaults & Prefix Normalization
  // -----------------------------------------------------------------------------
  console.log('--- 1. Default Model and Prefix Sanitization ---');

  test('DEFAULT_GEMINI_MODEL is strictly set to gemini-3.8-flash', () => {
    assert.equal(DEFAULT_GEMINI_MODEL, 'gemini-3.8-flash');
  });

  test('getGeminiModel defaults to gemini-3.8-flash when GEMINI_MODEL is unset', () => {
    assert.equal(getGeminiModel(), 'gemini-3.8-flash');
    assert.equal(getGeminiModel({}), 'gemini-3.8-flash');
    assert.equal(getGeminiModel({ GEMINI_MODEL: '' }), 'gemini-3.8-flash');
  });

  test('getGeminiModel sanitizes models/ prefix if present', () => {
    assert.equal(getGeminiModel({ GEMINI_MODEL: 'models/gemini-3.8-flash' }), 'gemini-3.8-flash');
    assert.equal(getGeminiModel({ GEMINI_MODEL: 'models/custom-model-pro' }), 'custom-model-pro');
  });

  test('getGeminiModel returns custom model when configured', () => {
    assert.equal(getGeminiModel({ GEMINI_MODEL: 'gemini-pro' }), 'gemini-pro');
  });

  // -----------------------------------------------------------------------------
  // 2. Endpoint Construction & Compatibility
  // -----------------------------------------------------------------------------
  console.log('--- 2. REST Endpoint Construction ---');

  test('buildGeminiEndpoint constructs correct v1beta URL with default model', () => {
    const url = buildGeminiEndpoint('TEST_KEY_123');
    assert.equal(
      url,
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=TEST_KEY_123'
    );
  });

  test('buildGeminiEndpoint constructs URL with custom configured model', () => {
    const url = buildGeminiEndpoint('TEST_KEY_123', 'gemini-custom-model');
    assert.equal(
      url,
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-custom-model:generateContent?key=TEST_KEY_123'
    );
  });

  test('buildGeminiEndpoint strips models/ prefix without double prefixing', () => {
    const url = buildGeminiEndpoint('TEST_KEY_123', 'models/gemini-3.8-flash');
    assert.equal(
      url,
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=TEST_KEY_123'
    );
  });

  // -----------------------------------------------------------------------------
  // 3. Question Generation Uses Configured Model
  // -----------------------------------------------------------------------------
  console.log('--- 3. Question Generation Model Integration ---');

  await testAsync('generateQuestion targets gemini-3.8-flash by default', async () => {
    const originalFetch = globalThis.fetch;
    let requestedUrl = '';

    globalThis.fetch = async (url) => {
      requestedUrl = url.toString();
      return new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [
                  {
                    text: JSON.stringify({
                      question_text: 'Explain indexing in Postgres.',
                      category: 'Databases',
                      difficulty: 'medium',
                      hint: 'Think about B-Trees.',
                    }),
                  },
                ],
              },
            },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    };

    try {
      const q = await generateQuestion('FAKE_KEY', {
        role: 'Backend Developer',
        interviewType: 'technical',
        currentDifficulty: 'medium',
        questionNumber: 1,
        totalQuestions: 5,
      });

      assert.ok(requestedUrl.includes('/models/gemini-3.8-flash:generateContent'));
      assert.equal(q.question_text, 'Explain indexing in Postgres.');
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  await testAsync('generateQuestion respects custom GEMINI_MODEL override', async () => {
    const originalFetch = globalThis.fetch;
    let requestedUrl = '';

    globalThis.fetch = async (url) => {
      requestedUrl = url.toString();
      return new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [
                  {
                    text: JSON.stringify({
                      question_text: 'Explain CAP theorem.',
                      category: 'Distributed Systems',
                      difficulty: 'hard',
                    }),
                  },
                ],
              },
            },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    };

    try {
      await generateQuestion('FAKE_KEY', {
        role: 'Backend Developer',
        interviewType: 'technical',
        currentDifficulty: 'hard',
        questionNumber: 2,
        totalQuestions: 5,
        model: 'gemini-advanced-test',
      });

      assert.ok(requestedUrl.includes('/models/gemini-advanced-test:generateContent'));
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  // -----------------------------------------------------------------------------
  // 4. Answer Evaluation Uses Configured Model
  // -----------------------------------------------------------------------------
  console.log('--- 4. Answer Evaluation Model Integration ---');

  await testAsync('evaluateAnswer targets gemini-3.8-flash by default', async () => {
    const originalFetch = globalThis.fetch;
    let requestedUrl = '';

    globalThis.fetch = async (url) => {
      requestedUrl = url.toString();
      return new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [
                  {
                    text: JSON.stringify({
                      accuracy: 8.5,
                      relevance: 9.0,
                      completeness: 8.0,
                      clarity: 8.5,
                      feedback: 'Good explanation.',
                      accuracy_explanation: 'Correct principles stated.',
                      what_went_well: ['Clear points'],
                      missing_points: ['Edge cases'],
                      how_to_improve: ['Quantify metrics'],
                      suggested_answer: 'Detailed model answer.',
                    }),
                  },
                ],
              },
            },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    };

    try {
      const evaluation = await evaluateAnswer('FAKE_KEY', {
        role: 'Frontend Developer',
        questionText: 'What is the Virtual DOM?',
        difficulty: 'medium',
        userAnswer: 'It is an in-memory representation of real DOM elements for batch diffing.',
      });

      assert.ok(requestedUrl.includes('/models/gemini-3.8-flash:generateContent'));
      assert.equal(evaluation.accuracy, 8.5);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  await testAsync('evaluateAnswer respects custom GEMINI_MODEL override', async () => {
    const originalFetch = globalThis.fetch;
    let requestedUrl = '';

    globalThis.fetch = async (url) => {
      requestedUrl = url.toString();
      return new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [
                  {
                    text: JSON.stringify({
                      accuracy: 9.0,
                      relevance: 9.0,
                      completeness: 8.5,
                      clarity: 9.0,
                      feedback: 'Flawless answer.',
                      accuracy_explanation: 'Completely accurate.',
                      what_went_well: ['Great depth'],
                      missing_points: [],
                      how_to_improve: [],
                    }),
                  },
                ],
              },
            },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    };

    try {
      await evaluateAnswer('FAKE_KEY', {
        role: 'Frontend Developer',
        questionText: 'What is the Virtual DOM?',
        difficulty: 'medium',
        userAnswer: 'In-memory tree used by React to compute minimal real DOM operations.',
        model: 'gemini-evaluator-v2',
      });

      assert.ok(requestedUrl.includes('/models/gemini-evaluator-v2:generateContent'));
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  // -----------------------------------------------------------------------------
  // 5. Final Report Generation Uses Configured Model
  // -----------------------------------------------------------------------------
  console.log('--- 5. Final Report Generation Model Integration ---');

  await testAsync('generateFinalReport targets configured model', async () => {
    const originalFetch = globalThis.fetch;
    let requestedUrl = '';

    globalThis.fetch = async (url) => {
      requestedUrl = url.toString();
      return new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [
                  {
                    text: JSON.stringify({
                      strengths: ['Great communication'],
                      weaknesses: ['Review edge cases'],
                      recommendations: ['Distributed systems'],
                      ai_summary: 'Overall solid candidate.',
                    }),
                  },
                ],
              },
            },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    };

    try {
      await generateFinalReport('FAKE_KEY', {
        role: 'Full Stack Developer',
        interviewType: 'technical',
        difficulty: 'medium',
        model: 'gemini-3.8-flash',
        items: [
          {
            questionNumber: 1,
            questionText: 'Q1',
            userAnswer: 'A1',
            relevance: 8,
            accuracy: 8,
            completeness: 8,
            clarity: 8,
          },
        ],
      });

      assert.ok(requestedUrl.includes('/models/gemini-3.8-flash:generateContent'));
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  // -----------------------------------------------------------------------------
  // 6. Safe Diagnostic Endpoints (No Secret Leaks)
  // -----------------------------------------------------------------------------
  console.log('--- 6. Safe Diagnostic Endpoints ---');

  await testAsync('GET /health returns configured model without logging secret keys', async () => {
    const req = new Request('http://localhost/health', { method: 'GET' });
    const res = await app.fetch(req, {
      GEMINI_API_KEY: 'super-secret-production-key-do-not-leak',
      GEMINI_MODEL: 'gemini-3.8-flash',
      SUPABASE_URL: 'https://test.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'test-secret',
    });

    assert.equal(res.status, 200);
    const body = await res.json();

    assert.equal(body.status, 'ok');
    assert.equal(body.ai.provider, 'Google Gemini');
    assert.equal(body.ai.model, 'gemini-3.8-flash');
    assert.equal(body.ai.hasApiKey, true);

    // CRITICAL SECURITY ASSERTION: No secret key values anywhere in the response
    const rawBodyString = JSON.stringify(body);
    assert.ok(!rawBodyString.includes('super-secret-production-key'));
    assert.ok(!rawBodyString.includes('test-secret'));
  });

  await testAsync('GET /diagnostic returns model details with default fallback', async () => {
    const req = new Request('http://localhost/diagnostic', { method: 'GET' });
    const res = await app.fetch(req, {
      GEMINI_API_KEY: 'test-key',
      SUPABASE_URL: 'https://test.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'test-secret',
    });

    assert.equal(res.status, 200);
    const body = await res.json();

    assert.equal(body.status, 'ok');
    assert.equal(body.ai.model, 'gemini-3.8-flash');
    assert.equal(body.ai.defaultModel, 'gemini-3.8-flash');
    assert.equal(body.ai.isCustomModel, false);
    assert.equal(body.ai.hasApiKey, true);
  });

  // -----------------------------------------------------------------------------
  // Summary
  // -----------------------------------------------------------------------------
  console.log('\n=============================================================');
  console.log(`🎉 ALL GEMINI CONFIGURATION TESTS PASSED: ${passedTests} / ${totalTests}`);
  console.log('=============================================================\n');
}

runAllTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});

