import assert from 'node:assert/strict';
import {
  RUBRIC_WEIGHTS,
  parseDimensionScore,
  calculateWeightedAnswerScore,
  calculateInterviewAggregates,
} from '../src/lib/scoringRubric';
import { evaluateAnswer } from '../worker/ai/answerEvaluator';

console.log('🧪 Starting HirePilot AI Interview Engine Test Suite...\n');

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
  // 1. Scoring Rubric Weights Validation
  // -----------------------------------------------------------------------------
  console.log('--- 1. Testing Scoring Rubric & Weights ---');

  test('Rubric weights match exact specification (40/25/20/15) and sum to 1.0', () => {
    assert.equal(RUBRIC_WEIGHTS.ACCURACY, 0.40);
    assert.equal(RUBRIC_WEIGHTS.RELEVANCE, 0.25);
    assert.equal(RUBRIC_WEIGHTS.COMPLETENESS, 0.20);
    assert.equal(RUBRIC_WEIGHTS.CLARITY, 0.15);

    const sum = RUBRIC_WEIGHTS.ACCURACY + RUBRIC_WEIGHTS.RELEVANCE + RUBRIC_WEIGHTS.COMPLETENESS + RUBRIC_WEIGHTS.CLARITY;
    assert.ok(Math.abs(sum - 1.0) < 0.0001, 'Weights must sum to 1.0');
  });

  test('Perfect scores (10/10 across all dimensions) compute exactly 100%', () => {
    const score = calculateWeightedAnswerScore({ accuracy: 10, relevance: 10, completeness: 10, clarity: 10 });
    assert.equal(score, 100);
  });

  test('Zero scores (0/10 across all dimensions) compute exactly 0%', () => {
    const score = calculateWeightedAnswerScore({ accuracy: 0, relevance: 0, completeness: 0, clarity: 0 });
    assert.equal(score, 0);
  });

  test('Single dimension test: Accuracy only (10/10, others 0) computes exactly 40%', () => {
    const score = calculateWeightedAnswerScore({ accuracy: 10, relevance: 0, completeness: 0, clarity: 0 });
    assert.equal(score, 40); // 10 * 0.40 * 10 = 40
  });

  test('Single dimension test: Relevance only (10/10, others 0) computes exactly 25%', () => {
    const score = calculateWeightedAnswerScore({ accuracy: 0, relevance: 10, completeness: 0, clarity: 0 });
    assert.equal(score, 25); // 10 * 0.25 * 10 = 25
  });

  test('Decimal score precision: (accuracy: 8.5, relevance: 9.0, completeness: 7.5, clarity: 8.0) computes 84%', () => {
    // (8.5 * 0.40 + 9.0 * 0.25 + 7.5 * 0.20 + 8.0 * 0.15) * 10
    // (3.40 + 2.25 + 1.50 + 1.20) * 10 = 8.35 * 10 = 83.5 -> Math.round = 84
    const score = calculateWeightedAnswerScore({ accuracy: 8.5, relevance: 9.0, completeness: 7.5, clarity: 8.0 });
    assert.equal(score, 84);
  });

  // -----------------------------------------------------------------------------
  // 2. Falsy Coercion Defect Prevention
  // -----------------------------------------------------------------------------
  console.log('\n--- 2. Testing Falsy Coercion Prevention ---');

  test('parseDimensionScore preserves valid numeric 0 without converting to default', () => {
    const parsed = parseDimensionScore(0, 7);
    assert.equal(parsed, 0, 'Zero must NOT be coerced to default 7');
  });

  test('parseDimensionScore preserves string "0" without converting to default', () => {
    const parsed = parseDimensionScore('0', 7);
    assert.equal(parsed, 0, 'String "0" must NOT be coerced to default 7');
  });

  test('parseDimensionScore parses valid string decimals correctly', () => {
    const parsed = parseDimensionScore('8.7', 0);
    assert.equal(parsed, 8.7);
  });

  test('parseDimensionScore clamps values outside 0-10 bounds', () => {
    assert.equal(parseDimensionScore(15), 10);
    assert.equal(parseDimensionScore(-5), 0);
  });

  // -----------------------------------------------------------------------------
  // 3. Empty & Blank Answer Handling
  // -----------------------------------------------------------------------------
  console.log('\n--- 3. Testing Empty Answer Handling ---');

  await testAsync('Empty answer produces genuine 0 score without calling AI or assigning fake defaults', async () => {
    const result = await evaluateAnswer('test-key', {
      role: 'Software Engineer',
      questionText: 'Explain microservices architecture.',
      category: 'Architecture',
      difficulty: 'medium',
      userAnswer: '   ',
    });

    assert.equal(result.accuracy, 0);
    assert.equal(result.relevance, 0);
    assert.equal(result.completeness, 0);
    assert.equal(result.clarity, 0);
    assert.equal(result.weighted_score, 0);
    assert.ok(result.feedback.includes('No answer was provided'));
    assert.ok(result.suggested_answer !== undefined, 'Suggested answer must be provided to guide the candidate');
  });

  // -----------------------------------------------------------------------------
  // 4. Interview Aggregate Scores Consistency
  // -----------------------------------------------------------------------------
  console.log('\n--- 4. Testing Multi-Question Report Aggregation ---');

  test('Overall interview score aligns with average of question weighted scores', () => {
    const sessionAnswers = [
      { accuracy: 9, relevance: 9, completeness: 8, clarity: 9 }, // 9*0.4 + 9*0.25 + 8*0.2 + 9*0.15 = 3.6 + 2.25 + 1.6 + 1.35 = 8.8 * 10 = 88
      { accuracy: 6, relevance: 7, completeness: 5, clarity: 7 }, // 6*0.4 + 7*0.25 + 5*0.2 + 7*0.15 = 2.4 + 1.75 + 1.0 + 1.05 = 6.2 * 10 = 62
    ];

    const q1Score = calculateWeightedAnswerScore(sessionAnswers[0]);
    const q2Score = calculateWeightedAnswerScore(sessionAnswers[1]);
    assert.equal(q1Score, 88);
    assert.equal(q2Score, 62);

    const aggregates = calculateInterviewAggregates(sessionAnswers);
    const expectedOverall = Math.round((88 + 62) / 2); // 75
    assert.equal(aggregates.overallScore, expectedOverall);
    assert.equal(aggregates.overallScore, 75);
    assert.ok(aggregates.technicalScore >= 0 && aggregates.technicalScore <= 100);
    assert.ok(aggregates.problemSolvingScore >= 0 && aggregates.problemSolvingScore <= 100);
    assert.ok(aggregates.communicationScore >= 0 && aggregates.communicationScore <= 100);
  });

  // -----------------------------------------------------------------------------
  // 5. Verification of Non-Constant Evaluation
  // -----------------------------------------------------------------------------
  console.log('\n--- 5. Testing Scoring Variance (No Constant Score) ---');

  test('Different answers compute strictly different scores', () => {
    const highQuality = { accuracy: 9.5, relevance: 9.5, completeness: 9.0, clarity: 9.0 };
    const mediocre = { accuracy: 5.0, relevance: 6.0, completeness: 4.0, clarity: 5.0 };
    const poor = { accuracy: 2.0, relevance: 2.0, completeness: 1.0, clarity: 3.0 };

    const scoreHigh = calculateWeightedAnswerScore(highQuality);
    const scoreMed = calculateWeightedAnswerScore(mediocre);
    const scorePoor = calculateWeightedAnswerScore(poor);

    assert.notEqual(scoreHigh, scoreMed);
    assert.notEqual(scoreMed, scorePoor);
    assert.ok(scoreHigh > scoreMed, 'High quality must score higher than mediocre');
    assert.ok(scoreMed > scorePoor, 'Mediocre must score higher than poor');
  });

  console.log(`\n========================================`);
  console.log(`🎉 TEST RESULTS: ${passedTests} / ${totalTests} Passed`);
  console.log(`========================================\n`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runAllTests().catch((e) => {
  console.error(e);
  process.exit(1);
});
