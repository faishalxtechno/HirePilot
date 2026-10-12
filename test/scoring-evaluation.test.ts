import {
  calculateQuestionScore,
  calculateInterviewScores,
  clampDimension,
  evaluateAnswerDeterministically,
  RUBRIC_WEIGHTS,
} from '../src/lib/scoringRubric';
import { evaluateAnswer } from '../worker/ai/answerEvaluator';
import { generateFinalReport } from '../worker/ai/reportGenerator';
import { parseJsonOrThrow } from '../worker/ai/client';

console.log('🧪 Starting HirePilot Comprehensive Scoring & Evaluation Test Suite...\n');

let testsPassed = 0;
let testsTotal = 0;

function assert(condition: boolean, message: string) {
  testsTotal++;
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    throw new Error(message);
  }
  testsPassed++;
  console.log(`   ✅ PASS: ${message}`);
}

async function runAllTests() {
  // =========================================================================
  // Test Suite 1: Rubric Weights and Mathematical Sanity
  // =========================================================================
  console.log('1. Testing Rubric Weights and Clamping:');
  const totalWeight =
    RUBRIC_WEIGHTS.accuracy +
    RUBRIC_WEIGHTS.relevance +
    RUBRIC_WEIGHTS.completeness +
    RUBRIC_WEIGHTS.clarity;
  assert(Math.abs(totalWeight - 1.0) < 0.0001, 'Rubric dimension weights sum to exactly 1.00 (100%)');

  // Verify clampDimension does not convert 0 to 7 (the root cause falsy bug)
  assert(clampDimension(0) === 0, 'clampDimension(0) strictly preserves 0 instead of defaulting to 7');
  assert(clampDimension('0') === 0, 'clampDimension("0") strictly preserves 0');
  assert(clampDimension(10) === 10, 'clampDimension(10) returns 10');
  assert(clampDimension(12) === 10, 'clampDimension(12) clamps upper bound to 10');
  assert(clampDimension(-5) === 0, 'clampDimension(-5) clamps lower bound to 0');
  assert(clampDimension(NaN) === 0, 'clampDimension(NaN) returns 0');

  // Perfect score
  const perfectScore = calculateQuestionScore({ relevance: 10, accuracy: 10, completeness: 10, clarity: 10 });
  assert(perfectScore === 100, `Perfect dimensions evaluate to 100/100 (got ${perfectScore})`);

  // Zero score
  const zeroScore = calculateQuestionScore({ relevance: 0, accuracy: 0, completeness: 0, clarity: 0 });
  assert(zeroScore === 0, `Zero dimensions evaluate to 0/100 (got ${zeroScore})`);

  // =========================================================================
  // Test Suite 2: Controlled Candidate Response Cases (A, B, C, D, E, F)
  // =========================================================================
  console.log('\n2. Testing Controlled Candidate Cases on Same Technical Question:');

  const sampleQuestion = {
    questionText: 'Explain how you design an idempotency mechanism for distributed payment processing and handle concurrent race conditions.',
    category: 'System Design',
    role: 'Software Engineer',
  };

  // Case A: Correct and relevant answer
  const answerA = `We generate a unique idempotency key (UUIDv4) on the client before checkout. The payment service checks this key in a Redis cache with a TTL using an atomic SETNX or Redlock. In PostgreSQL, we store the payment intent with a UNIQUE constraint on idempotency_key and use SELECT FOR UPDATE to prevent concurrent race conditions during charge state transitions.`;

  // Case B: Partially correct answer
  const answerB = `You should give every request an ID so you don't double charge people. If the same ID comes in again, you just return the previous payment status from the database.`;

  // Case C: Incorrect answer
  const answerC = `To make payments idempotent, you run an infinite loop in JavaScript that checks if payment is true. Concurrency is not an issue because Node.js is single-threaded and databases automatically make everything safe without locks.`;

  // Case D: Empty answer
  const answerD = ``;

  // Case E: Correct but concise answer (SHORT - must NOT be penalized merely for being short)
  const answerE = `Use unique client idempotency keys, atomic Redis distributed locks (SETNX) with TTL, and database UNIQUE constraints with row-level locks.`;

  // Case F: Detailed but irrelevant answer (LONG - must NOT receive high score for length)
  const answerF = `I really enjoy cooking authentic Italian pasta on weekends. The key to great carbonara is using guanciale instead of bacon, freshly grated pecorino romano cheese, and whole eggs tempered slowly with hot pasta water so they don't scramble. Timing and heat management are essential to achieving a creamy sauce without cream.`;

  const evalA = evaluateAnswerDeterministically({ ...sampleQuestion, userAnswer: answerA });
  const evalB = evaluateAnswerDeterministically({ ...sampleQuestion, userAnswer: answerB });
  const evalC = evaluateAnswerDeterministically({ ...sampleQuestion, userAnswer: answerC });
  const evalD = evaluateAnswerDeterministically({ ...sampleQuestion, userAnswer: answerD });
  const evalE = evaluateAnswerDeterministically({ ...sampleQuestion, userAnswer: answerE });
  const evalF = evaluateAnswerDeterministically({ ...sampleQuestion, userAnswer: answerF });

  console.log(`   📊 Case A (Correct & Relevant):    ${evalA.score}% (Rel:${evalA.relevance}, Acc:${evalA.accuracy}, Comp:${evalA.completeness}, Cla:${evalA.clarity})`);
  console.log(`   📊 Case B (Partially Correct):     ${evalB.score}% (Rel:${evalB.relevance}, Acc:${evalB.accuracy}, Comp:${evalB.completeness}, Cla:${evalB.clarity})`);
  console.log(`   📊 Case C (Incorrect):             ${evalC.score}% (Rel:${evalC.relevance}, Acc:${evalC.accuracy}, Comp:${evalC.completeness}, Cla:${evalC.clarity})`);
  console.log(`   📊 Case D (Empty):                 ${evalD.score}% (Rel:${evalD.relevance}, Acc:${evalD.accuracy}, Comp:${evalD.completeness}, Cla:${evalD.clarity})`);
  console.log(`   📊 Case E (Correct but Concise):   ${evalE.score}% (Rel:${evalE.relevance}, Acc:${evalE.accuracy}, Comp:${evalE.completeness}, Cla:${evalE.clarity})`);
  console.log(`   📊 Case F (Detailed & Irrelevant): ${evalF.score}% (Rel:${evalF.relevance}, Acc:${evalF.accuracy}, Comp:${evalF.completeness}, Cla:${evalF.clarity})`);

  // Assertions for Requirement 4
  assert(evalA.score! >= 85, `Case A receives high score (got ${evalA.score}%, expected >= 85%)`);
  assert(evalA.score! > evalC.score!, `Case A scores higher than Case C (${evalA.score}% > ${evalC.score}%)`);
  assert(evalB.score! > evalC.score!, `Case B receives partial credit over incorrect answer (${evalB.score}% > ${evalC.score}%)`);
  assert(evalA.score! > evalB.score!, `Case A scores higher than partial answer Case B (${evalA.score}% > ${evalB.score}%)`);
  assert(evalD.score === 0, `Case D (Empty) receives 0% (got ${evalD.score}%) - NOT 68%`);
  assert(evalE.score! >= 80, `Case E (Concise & Correct) receives high score (got ${evalE.score}%, expected >= 80%)`);
  assert(evalE.score! > evalC.score!, `Case E is not penalized for brevity and outscores incorrect answer (${evalE.score}% > ${evalC.score}%)`);
  assert(evalF.score! <= 30, `Case F (Detailed & Irrelevant) receives low score despite length (got ${evalF.score}%, expected <= 30%)`);
  assert(evalA.score! > evalF.score!, `Case A significantly outscores long irrelevant Case F (${evalA.score}% > ${evalF.score}%)`);

  // Verify none of the controlled cases defaulted to 68%
  assert(evalA.score !== 68, `Case A is not stuck at 68% (${evalA.score}%)`);
  assert(evalD.score !== 68, `Case D is not stuck at 68% (${evalD.score}%)`);
  assert(evalF.score !== 68, `Case F is not stuck at 68% (${evalF.score}%)`);

  // Verify Determinism: identical answers evaluated twice produce identical scores
  const evalA_repeat = evaluateAnswerDeterministically({ ...sampleQuestion, userAnswer: answerA });
  assert(evalA.score === evalA_repeat.score, `Deterministic evaluation is 100% reproducible (${evalA.score}% === ${evalA_repeat.score}%)`);

  // =========================================================================
  // Test Suite 3: Overall Score Aggregation
  // =========================================================================
  console.log('\n3. Testing Overall Score Aggregation:');

  const candidateSessionItems = [
    { questionNumber: 1, relevance: evalA.relevance, accuracy: evalA.accuracy, completeness: evalA.completeness, clarity: evalA.clarity },
    { questionNumber: 2, relevance: evalE.relevance, accuracy: evalE.accuracy, completeness: evalE.completeness, clarity: evalE.clarity },
    { questionNumber: 3, relevance: evalB.relevance, accuracy: evalB.accuracy, completeness: evalB.completeness, clarity: evalB.clarity },
  ];

  const aggregated = calculateInterviewScores(candidateSessionItems);
  const expectedQ1 = calculateQuestionScore(candidateSessionItems[0]);
  const expectedQ2 = calculateQuestionScore(candidateSessionItems[1]);
  const expectedQ3 = calculateQuestionScore(candidateSessionItems[2]);
  const expectedOverall = Math.round((expectedQ1 + expectedQ2 + expectedQ3) / 3);

  console.log(`   Q1 Score: ${expectedQ1}%, Q2 Score: ${expectedQ2}%, Q3 Score: ${expectedQ3}% -> Overall: ${aggregated.overall_score}%`);
  assert(aggregated.overall_score === expectedOverall, `Aggregated overall score strictly matches mathematical mean of questions (${aggregated.overall_score}% === ${expectedOverall}%)`);
  assert(aggregated.overall_score !== 68, `Aggregated overall score is NOT stuck at 68% (got ${aggregated.overall_score}%)`);
  assert(aggregated.overall_score >= 0 && aggregated.overall_score <= 100, 'Overall score is within [0, 100]');
  assert(aggregated.technical_score >= 0 && aggregated.technical_score <= 100, 'Technical score is within [0, 100]');
  assert(aggregated.communication_score >= 0 && aggregated.communication_score <= 100, 'Communication score is within [0, 100]');

  // Test empty session aggregation
  const emptySessionScores = calculateInterviewScores([]);
  assert(emptySessionScores.overall_score === 0, `Empty session scores 0 overall (got ${emptySessionScores.overall_score}) - NOT 75 or 68`);

  // =========================================================================
  // Test Suite 4: Strict Error Propagation & No Silent 68 Fallback
  // =========================================================================
  console.log('\n4. Testing Error Propagation (No Silent 68 Substitution):');

  let caughtMissingKeyError = false;
  try {
    await evaluateAnswer('', {
      role: 'Software Engineer',
      questionText: 'Explain database indexing.',
      difficulty: 'medium',
      userAnswer: 'B-Trees are balanced tree data structures.',
    });
  } catch (err: any) {
    caughtMissingKeyError = true;
    assert(err.message.includes('Gemini API key is not configured'), `Explicitly identifies missing API key: "${err.message}"`);
  }
  assert(caughtMissingKeyError, 'evaluateAnswer throws when API key is missing instead of silently returning 68%');

  // Test parseJsonOrThrow on malformed JSON
  let caughtMalformedJson = false;
  try {
    parseJsonOrThrow('{ "relevance": 8, "accuracy": }');
  } catch (err: any) {
    caughtMalformedJson = true;
    assert(err.message.includes('malformed JSON'), `parseJsonOrThrow throws on malformed JSON: "${err.message}"`);
  }
  assert(caughtMalformedJson, 'parseJsonOrThrow rejects malformed JSON instead of defaulting to 68%');

  // =========================================================================
  // Test Suite 5: Final Report Synthesis with Real Calculated Scores
  // =========================================================================
  console.log('\n5. Testing Final Report Synthesis Ground Truth:');

  const finalReport = await generateFinalReport('', {
    role: 'Software Engineer',
    interviewType: 'technical',
    difficulty: 'medium',
    items: [
      {
        questionNumber: 1,
        questionText: sampleQuestion.questionText,
        userAnswer: answerA,
        relevance: evalA.relevance,
        accuracy: evalA.accuracy,
        completeness: evalA.completeness,
        clarity: evalA.clarity,
        feedback: evalA.feedback,
        what_went_well: evalA.what_went_well,
        missing_points: evalA.missing_points,
      },
      {
        questionNumber: 2,
        questionText: sampleQuestion.questionText,
        userAnswer: answerE,
        relevance: evalE.relevance,
        accuracy: evalE.accuracy,
        completeness: evalE.completeness,
        clarity: evalE.clarity,
        feedback: evalE.feedback,
        what_went_well: evalE.what_went_well,
        missing_points: evalE.missing_points,
      },
    ],
  });

  const expectedReportScore = Math.round((expectedQ1 + expectedQ2) / 2);
  assert(finalReport.overall_score === expectedReportScore, `Final report overall_score (${finalReport.overall_score}%) matches ground truth question evaluations (${expectedReportScore}%)`);
  assert(finalReport.overall_score !== 68, `Final report overall_score is not hardcoded to 68%`);
  assert(Array.isArray(finalReport.strengths) && finalReport.strengths.length > 0, 'Report includes concrete strengths');
  assert(Array.isArray(finalReport.weaknesses) && finalReport.weaknesses.length > 0, 'Report includes constructive weaknesses');
  assert(Array.isArray(finalReport.recommendations) && finalReport.recommendations.length > 0, 'Report includes actionable recommendations');

  console.log(`\n🎉 ALL ${testsPassed}/${testsTotal} UNIT & CONTROLLED TESTS PASSED SUCCESSFULLY!`);
}

runAllTests().catch((err) => {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
});
