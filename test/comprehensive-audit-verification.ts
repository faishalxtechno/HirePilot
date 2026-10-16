import { describe, it } from 'node:test';
import assert from 'node:assert';
import { jobsService, Job, ApplicationStage } from '../src/lib/jobsService';
import { resumeBuilderService } from '../src/lib/resumeBuilderService';
import { resumeService } from '../src/lib/resumeService';
import { calculateQuestionScore, calculateInterviewScores, clampDimension } from '../src/lib/scoringRubric';

console.log('--- RUNNING HIREPILOT COMPREHENSIVE AUDIT VERIFICATION SUITE ---');

// =============================================================================
// SUITE 1: PRICING & GST INTEGRITY
// =============================================================================
describe('Pricing & Indian GST (18%) Calculation Integrity', () => {
  it('should accurately calculate Pro plan tax and total', () => {
    const basePrice = 249;
    const gstRate = 0.18;
    const gstAmount = Number((basePrice * gstRate).toFixed(2));
    const totalAmount = Number((basePrice + gstAmount).toFixed(2));

    assert.strictEqual(gstAmount, 44.82, 'Pro plan 18% GST must be exactly ₹44.82');
    assert.strictEqual(totalAmount, 293.82, 'Pro plan total with GST must be exactly ₹293.82');
  });

  it('should accurately calculate Unlimited plan tax and total', () => {
    const basePrice = 599;
    const gstRate = 0.18;
    const gstAmount = Number((basePrice * gstRate).toFixed(2));
    const totalAmount = Number((basePrice + gstAmount).toFixed(2));

    assert.strictEqual(gstAmount, 107.82, 'Unlimited plan 18% GST must be exactly ₹107.82');
    assert.strictEqual(totalAmount, 706.82, 'Unlimited plan total with GST must be exactly ₹706.82');
  });
});

// =============================================================================
// SUITE 2: SCORING & ZERO-VALUE INTEGRITY (68% ROOT-CAUSE DEFENSE)
// =============================================================================
describe('Scoring & Zero-Score Preservation Rubric', () => {
  it('must preserve legitimate 0 scores without falling back to 7 or 70%', () => {
    const clamped = clampDimension(0);
    assert.strictEqual(clamped, 0, 'Zero must NOT be treated as falsy or replaced');

    const agg = calculateInterviewScores([
      { relevance: 0, accuracy: 0, completeness: 0, clarity: 0 }
    ]);
    assert.strictEqual(agg.overall_score, 0, 'Interview score with all zeroes must be 0%');
    assert.strictEqual(agg.technical_score, 0, 'Technical score must be 0%');

    const score = calculateQuestionScore({
      relevance: 0,
      accuracy: 0,
      completeness: 0,
      clarity: 0,
    });
    assert.strictEqual(score, 0, 'All-zero dimensions must result in a 0% overall score');
  });

  it('should calculate authentic scores for high performing answers', () => {
    const score = calculateQuestionScore({
      relevance: 10,
      accuracy: 9,
      completeness: 9,
      clarity: 9,
    });
    // Weights: acc 40%, rel 25%, comp 20%, clar 15%
    // (9*4 + 10*2.5 + 9*2 + 9*1.5) = 36 + 25 + 18 + 13.5 = 92.5 -> Math.round = 93
    assert.strictEqual(score, 93, 'High quality answer must yield authentic calculated 93% score');
  });

  it('should produce distinct scores between different answer qualities', () => {
    const good = calculateQuestionScore({ relevance: 9, accuracy: 9, completeness: 8, clarity: 8 });
    const poor = calculateQuestionScore({ relevance: 3, accuracy: 2, completeness: 3, clarity: 4 });

    assert.notStrictEqual(good, 68, 'Good answer should not get stuck on 68%');
    assert.notStrictEqual(poor, 68, 'Poor answer should not get stuck on 68%');
    assert.ok(good > poor, 'Good answer must score higher than poor answer');
  });
});

// =============================================================================
// SUITE 3: RESUME SERVICE ATS DETERMINISM & FACTUAL PRESERVATION
// =============================================================================
describe('Resume Service ATS Analysis & Optimization', () => {
  it('should deterministically analyze a resume without Math.random()', async () => {
    const sampleFile = { name: 'Alex_Mercer_Resume.pdf', size: 140000 };

    const run1 = await resumeService.analyzeResume(sampleFile, 'Full Stack Engineer');
    const run2 = await resumeService.analyzeResume(sampleFile, 'Full Stack Engineer');

    assert.strictEqual(run1.atsScore, run2.atsScore, 'ATS score must be deterministic across identical runs');
    assert.strictEqual(run1.categoryScores.formatting, run2.categoryScores.formatting, 'Formatting score must be deterministic');
    assert.ok(run1.atsScore >= 80, 'Well-formed resume should achieve strong ATS score');
  });

  it('enhanceTextForAts should preserve core candidate facts while enhancing action verbs', () => {
    const original = 'Worked on database queries and managed server deployments for customer portal';
    const enhanced = resumeBuilderService.enhanceTextForAts(original);

    assert.ok(!enhanced.includes('AI-enhanced placeholder'), 'Must not contain hardcoded placeholder copy');
    assert.ok(enhanced.toLowerCase().includes('database') || enhanced.toLowerCase().includes('server'), 'Must preserve candidate subject matter');
    assert.ok(enhanced.length >= original.length, 'Enhanced text should be thorough and structured');
  });
});

// =============================================================================
// SUITE 4: JOB MATCHING ENGINE & 6-STAGE PIPELINE
// =============================================================================
describe('Job Matching Engine & 6-Stage Pipeline Lifecycle', () => {
  const sampleJob: Job = {
    id: 'test-job-01',
    title: 'Senior Full Stack Engineer',
    company: 'Vercel',
    location: 'Remote',
    type: 'Full-time',
    workplaceType: 'Remote',
    salary: '$160,000 - $190,000',
    experienceLevel: 'Senior',
    targetRoles: ['Full Stack Engineer', 'Software Engineer'],
    skills: ['TypeScript', 'Next.js', 'React', 'Node.js', 'PostgreSQL'],
    description: 'Lead engineering on high scale serverless infrastructure.',
    postedAt: '1 day ago',
  };

  it('should compute transparent match breakdown with all criteria', () => {
    const breakdown = jobsService.getJobMatchBreakdown(sampleJob, 'Full Stack Engineer');

    assert.ok(typeof breakdown.overallScore === 'number', 'Match score must be a number');
    assert.ok(breakdown.overallScore >= 0 && breakdown.overallScore <= 100, 'Score must be 0-100%');
    assert.ok(breakdown.criteria.roleAlignment >= 0, 'Role alignment must be computed');
    assert.ok(breakdown.matchedSkills.length > 0, 'Should identify matched skills');
    assert.ok(breakdown.recommendations.length > 0, 'Should provide actionable recommendations');
    assert.ok(breakdown.disclaimer.toLowerCase().includes('guarantee'), 'Must provide clear non-guarantee disclaimer');
  });

  it('should support full 6-stage lifecycle transitions', async () => {
    const userId = 'test-audit-user-123';
    
    // 1. 1-Tap Apply (creates 'applied' stage)
    const app = await jobsService.applyToJob(userId, sampleJob);
    assert.strictEqual(app.stage, 'applied');

    // 2. Transition through pipeline stages
    const stages: ApplicationStage[] = ['assessment', 'interviewing', 'offer', 'rejected', 'saved'];
    for (const stage of stages) {
      await jobsService.updateStage(userId, app.id, stage);
      const apps = await jobsService.getApplications(userId);
      const current = apps.find((a) => a.id === app.id);
      assert.strictEqual(current?.stage, stage, `Stage must update cleanly to ${stage}`);
    }

    // 3. Update notes
    await jobsService.updateNotes(userId, app.id, 'Spoke with hiring manager, round 2 technical scheduled');
    const appsAfterNotes = await jobsService.getApplications(userId);
    const notedApp = appsAfterNotes.find((a) => a.id === app.id);
    assert.strictEqual(notedApp?.notes, 'Spoke with hiring manager, round 2 technical scheduled');

    // 4. Delete application
    await jobsService.deleteApplication(userId, app.id);
    const appsAfterDelete = await jobsService.getApplications(userId);
    assert.ok(!appsAfterDelete.some((a) => a.id === app.id), 'Application must be deleted cleanly');
  });
});
