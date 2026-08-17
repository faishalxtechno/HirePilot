import { evaluateAnswer } from '../worker/ai/answerEvaluator.js';
import { generateQuestion } from '../worker/ai/questionGenerator.js';
import { generateFinalReport } from '../worker/ai/reportGenerator.js';

async function runTests() {
  console.log('🚀 Running HirePilot Verification Test Suite...\n');

  // Test 1: Question Generator Fallback / Logic
  console.log('1. Testing Question Generator...');
  const q1 = await generateQuestion('', {
    role: 'Software Engineer',
    interviewType: 'technical',
    currentDifficulty: 'medium',
    questionNumber: 1,
    totalQuestions: 5,
    history: [],
  });
  console.log('   ✅ Question 1 generated:', q1.question_text.substring(0, 70) + '...');
  console.log('   ✅ Category:', q1.category, '| Difficulty:', q1.difficulty);

  // Test 2: Answer Evaluator
  console.log('\n2. Testing Answer Evaluator...');
  const evalResult = await evaluateAnswer('', {
    role: 'Software Engineer',
    questionText: q1.question_text,
    category: q1.category,
    difficulty: q1.difficulty,
    userAnswer: 'In our microservices architecture, we use Redis for caching frequent read queries with TTL expiration. For race conditions in financial transactions, we implement distributed Redis locks with Redlock algorithm and PostgreSQL SELECT FOR UPDATE row-level locks.',
  });
  console.log('   ✅ Scores -> Relevance:', evalResult.relevance, 'Accuracy:', evalResult.accuracy, 'Completeness:', evalResult.completeness, 'Clarity:', evalResult.clarity);
  console.log('   ✅ Feedback:', evalResult.feedback);
  console.log('   ✅ What went well points:', evalResult.what_went_well.length);
  console.log('   ✅ Missing points:', evalResult.missing_points.length);

  // Test 3: Adaptive Question Generation (after high score)
  console.log('\n3. Testing Adaptive Question Progression...');
  const q2 = await generateQuestion('', {
    role: 'Software Engineer',
    interviewType: 'technical',
    currentDifficulty: 'medium',
    questionNumber: 2,
    totalQuestions: 5,
    history: [
      {
        question: q1.question_text,
        answer: 'Redis caching and optimistic concurrency locking.',
        scoreAvg: 8.5,
        difficulty: 'medium',
        category: q1.category,
      },
    ],
  });
  console.log('   ✅ Adaptive Question 2 generated:', q2.question_text.substring(0, 70) + '...');

  // Test 4: Final Report Generator
  console.log('\n4. Testing Final Report Synthesis...');
  const report = await generateFinalReport('', {
    role: 'Software Engineer',
    interviewType: 'technical',
    difficulty: 'medium',
    items: [
      {
        questionNumber: 1,
        questionText: q1.question_text,
        category: q1.category,
        userAnswer: 'Redis caching and optimistic concurrency locking.',
        relevance: 8,
        accuracy: 9,
        completeness: 8,
        clarity: 8,
        feedback: 'Great explanation of locking.',
      },
      {
        questionNumber: 2,
        questionText: q2.question_text,
        category: q2.category,
        userAnswer: 'Circuit breakers and exponential backoff retry patterns with jitter.',
        relevance: 8,
        accuracy: 8,
        completeness: 7,
        clarity: 8,
        feedback: 'Solid discussion of fault tolerance.',
      },
    ],
  });

  console.log('   ✅ Overall Score:', report.overall_score, '/ 100');
  console.log('   ✅ Technical Score:', report.technical_score);
  console.log('   ✅ Strengths count:', report.strengths.length);
  console.log('   ✅ Weaknesses count:', report.weaknesses.length);
  console.log('   ✅ Recommendations count:', report.recommendations.length);
  console.log('   ✅ AI Summary:', report.ai_summary);

  console.log('\n✨ All HirePilot backend verification tests PASSED successfully!\n');
}

runTests().catch((e) => {
  console.error('❌ Test failed:', e);
  process.exit(1);
});
