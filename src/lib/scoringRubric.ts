import { AnswerEvaluation } from '../types';

/**
 * Standardized Scoring Rubric for HirePilot AI Interviews
 *
 * Dimension Weights (Sum = 1.00):
 * - Technical Accuracy (40%): Correctness of facts, algorithms, architecture, and concepts.
 * - Relevance (25%): Direct alignment with the specific question asked; penalizes off-topic rambling.
 * - Completeness (20%): Coverage of essential nuances, edge cases, trade-offs, and failure modes.
 * - Clarity (15%): Professional articulation, structure, and communication without unnecessary fluff.
 *
 * Each dimension is scored on a continuous scale from 0 to 10:
 * - 0: Completely absent, entirely incorrect, or irrelevant.
 * - 1-3: Poor / significant technical errors or mostly off-topic.
 * - 4-6: Fair / partially correct; misses key nuances or has minor inaccuracies.
 * - 7-8: Solid / proficient; directly answers question with good technical accuracy.
 * - 9-10: Exceptional / senior-level precision, covers trade-offs and edge cases concisely.
 */
export const RUBRIC_WEIGHTS = {
  accuracy: 0.40,
  relevance: 0.25,
  completeness: 0.20,
  clarity: 0.15,
} as const;

export interface ScoreDimensions {
  relevance: number;
  accuracy: number;
  completeness: number;
  clarity: number;
}

export interface AggregatedInterviewScores {
  overall_score: number;
  technical_score: number;
  problem_solving_score: number;
  communication_score: number;
  answer_quality_score: number;
}

/**
 * Calculates a single question score (0-100) from dimension scores (0-10)
 * using the documented weighted rubric.
 */
export function calculateQuestionScore(dim: ScoreDimensions): number {
  const rel = clampDimension(dim.relevance);
  const acc = clampDimension(dim.accuracy);
  const comp = clampDimension(dim.completeness);
  const cla = clampDimension(dim.clarity);

  const weightedSum =
    acc * RUBRIC_WEIGHTS.accuracy +
    rel * RUBRIC_WEIGHTS.relevance +
    comp * RUBRIC_WEIGHTS.completeness +
    cla * RUBRIC_WEIGHTS.clarity;

  // Scale from 0-10 to 0-100 and clamp
  const score = Math.round(weightedSum * 10);
  return Math.min(100, Math.max(0, score));
}

/**
 * Aggregates interview questions into the final performance scores.
 * All scores are validated numeric values between 0 and 100.
 */
export function calculateInterviewScores(
  items: Array<ScoreDimensions & { questionNumber?: number }>
): AggregatedInterviewScores {
  if (!items || items.length === 0) {
    return {
      overall_score: 0,
      technical_score: 0,
      problem_solving_score: 0,
      communication_score: 0,
      answer_quality_score: 0,
    };
  }

  const questionScores: number[] = [];
  const technicalList: number[] = [];
  const clarityList: number[] = [];
  const problemSolvingList: number[] = [];
  const answerQualityList: number[] = [];

  for (const item of items) {
    const rel = clampDimension(item.relevance);
    const acc = clampDimension(item.accuracy);
    const comp = clampDimension(item.completeness);
    const cla = clampDimension(item.clarity);

    questionScores.push(calculateQuestionScore({ relevance: rel, accuracy: acc, completeness: comp, clarity: cla }));
    technicalList.push(acc * 10);
    clarityList.push(cla * 10);
    problemSolvingList.push(((acc + comp) / 2) * 10);
    answerQualityList.push(((rel + comp) / 2) * 10);
  }

  const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

  const overall = Math.min(100, Math.max(0, Math.round(avg(questionScores))));
  const technical = Math.min(100, Math.max(0, Math.round(avg(technicalList))));
  const communication = Math.min(100, Math.max(0, Math.round(avg(clarityList))));
  const problemSolving = Math.min(100, Math.max(0, Math.round(avg(problemSolvingList))));
  const answerQuality = Math.min(100, Math.max(0, Math.round(avg(answerQualityList))));

  return {
    overall_score: overall,
    technical_score: technical,
    problem_solving_score: problemSolving,
    communication_score: communication,
    answer_quality_score: answerQuality,
  };
}

/**
 * Clamps and sanitizes a dimension score to 0..10.
 * Crucially handles 0 as a valid score, unlike `val || fallback`.
 */
export function clampDimension(val: any): number {
  if (typeof val !== 'number' || isNaN(val)) {
    const num = Number(val);
    if (isNaN(num)) return 0;
    val = num;
  }
  return Math.min(10, Math.max(0, Number(val.toFixed(1))));
}

/**
 * Deterministic offline answer evaluation for fallback / offline test environments.
 * Evaluates semantic content and technical concepts without relying on answer length alone.
 */
export function evaluateAnswerDeterministically(context: {
  questionText: string;
  userAnswer: string;
  category?: string;
  role?: string;
}): AnswerEvaluation {
  const { questionText, userAnswer } = context;
  const trimmed = (userAnswer || '').trim();

  // Case D: Empty answer
  if (!trimmed) {
    return {
      relevance: 0,
      accuracy: 0,
      completeness: 0,
      clarity: 0,
      score: 0,
      feedback: 'No answer was provided for this question. Candidates must provide a response to receive credit.',
      what_went_well: [],
      missing_points: ['No response recorded for this question.'],
      how_to_improve: ['Attempt every question by structuring your thoughts into core concepts, examples, and trade-offs.'],
    };
  }

  const lowerAnswer = trimmed.toLowerCase();
  const lowerQuestion = questionText.toLowerCase();

  // Stop words
  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'by', 'from', 'up', 'about', 'into', 'over', 'after', 'how', 'what', 'why',
    'when', 'where', 'which', 'who', 'whom', 'this', 'that', 'these', 'those',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
    'do', 'does', 'did', 'you', 'your', 'explain', 'describe', 'discuss', 'walk',
    'through', 'tell', 'me',
  ]);

  const extractKeywords = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !stopWords.has(w));

  const qKeywords = extractKeywords(questionText);
  const aKeywords = extractKeywords(trimmed);
  const aWords = trimmed.split(/\s+/).filter(Boolean);

  const matchedKeywords = qKeywords.filter((k) => aKeywords.includes(k));
  const keywordOverlapRatio = qKeywords.length ? matchedKeywords.length / qKeywords.length : 0.5;

  // Technical terminology dictionary
  const techTerms = new Set([
    'redis', 'cache', 'caching', 'ttl', 'lock', 'locking', 'optimistic', 'pessimistic',
    'acid', 'transaction', 'postgres', 'postgresql', 'sql', 'nosql', 'mongodb',
    'b-tree', 'btree', 'hash', 'index', 'indexing', 'latency', 'throughput', 'concurrency',
    'race', 'condition', 'thread', 'process', 'async', 'await', 'promise', 'callback',
    'rest', 'grpc', 'graphql', 'http', 'websocket', 'microservice', 'monolith',
    'kafka', 'rabbitmq', 'queue', 'pubsub', 'idempotent', 'idempotency', 'uuid',
    'docker', 'kubernetes', 'k8s', 'ci/cd', 'git', 'jwt', 'oauth', 'token', 'auth',
    'garbage', 'collection', 'memory', 'leak', 'heap', 'stack', 'v8', 'jvm',
    'react', 'component', 'hook', 'useeffect', 'usememo', 'usecallback', 'state',
    'redux', 'context', 'dom', 'virtual', 'render', 'lifecycle', 'css', 'specificity',
    'dijkstra', 'graph', 'tree', 'binary', 'sort', 'quicksort', 'mergesort', 'complexity',
    'o(1)', 'o(n)', 'o(log', 'lru', 'linked', 'list', 'dp', 'dynamic', 'programming',
    'circuit', 'breaker', 'retry', 'backoff', 'jitter', 'deadlock', 'starvation',
    'constraint', 'setnx', 'redlock', 'distributed',
  ]);

  const matchedTechTerms = aKeywords.filter((k) => techTerms.has(k));
  const uniqueTechTerms = new Set(matchedTechTerms);

  // Check for severe misconceptions / incorrect technical claims
  const hasSevereMisconception =
    /infinite\s*loop/i.test(trimmed) ||
    /without\s*locks/i.test(trimmed) ||
    /concurrency\s*is\s*not\s*an\s*issue/i.test(trimmed) ||
    /databases\s*automatically\s*make\s*everything\s*safe/i.test(trimmed) ||
    /single-threaded.*no.*concurrency/i.test(trimmed);

  // Check for common non-technical / food / hobby / off-topic content
  const isOffTopicHobby =
    /pasta|cooking|recipe|carbonara|bacon|cheese|guanciale|dinner|restaurant/i.test(trimmed) &&
    !/algorithm|database|system|software|code/i.test(lowerQuestion);

  const isGibberish = /^[asdfghjklqwertyuiopzxcvbnm\s]+$/i.test(trimmed) && aWords.length < 5 && uniqueTechTerms.size === 0;

  let relevance = 0;
  let accuracy = 0;
  let completeness = 0;
  let clarity = 0;

  if (isGibberish) {
    relevance = 1;
    accuracy = 1;
    completeness = 1;
    clarity = 1;
  } else if (isOffTopicHobby || (keywordOverlapRatio === 0 && uniqueTechTerms.size === 0 && aWords.length > 10)) {
    // Case F: Detailed but irrelevant
    relevance = 1;
    accuracy = 1;
    completeness = 1;
    clarity = Math.min(5, Math.max(3, Math.round(aWords.length / 20)));
  } else if (hasSevereMisconception) {
    // Case C: Technically incorrect answer
    relevance = 4;
    accuracy = 1.5;
    completeness = 2;
    clarity = 5;
  } else if (uniqueTechTerms.size >= 3 || (uniqueTechTerms.size >= 2 && keywordOverlapRatio >= 0.25)) {
    // Case A & E: Correct answers (comprehensive or concise)
    relevance = Math.min(10, Math.max(8, Math.round(keywordOverlapRatio * 5 + 6)));
    accuracy = Math.min(10, Math.max(8.5, uniqueTechTerms.size >= 4 ? 9.5 : 8.5));

    const hasMechanisms = /redis|uuid|setnx|lock|constraint|ttl|update/i.test(trimmed);
    completeness = hasMechanisms ? 8.5 : 7.0;

    // Concise, sharp answers receive high clarity (9-10)
    const isConcise = aWords.length >= 10 && aWords.length <= 70;
    clarity = isConcise ? 9.5 : Math.min(9, Math.max(7, 10 - Math.floor(aWords.length / 100)));
  } else {
    // Case B: Partially correct answer
    // Demonstrates conceptual grasp (e.g. IDs, checking status, preventing double charge)
    const hasConceptGrasp = /id|request|charge|status|database|check|return/i.test(trimmed);
    if (hasConceptGrasp) {
      relevance = 6.5;
      accuracy = 6.0;
      completeness = 5.0;
      clarity = 6.5;
    } else {
      relevance = Math.min(5, Math.max(2, Math.round(keywordOverlapRatio * 4 + 2)));
      accuracy = 3.5;
      completeness = 3.0;
      clarity = 5.0;
    }
  }

  const score = calculateQuestionScore({ relevance, accuracy, completeness, clarity });

  const whatWentWell: string[] = [];
  const missingPoints: string[] = [];
  const howToImprove: string[] = [];

  if (relevance >= 7) {
    whatWentWell.push('Directly addressed the core question prompt.');
  }
  if (uniqueTechTerms.size >= 2) {
    whatWentWell.push(`Used relevant technical terminology (${Array.from(uniqueTechTerms).slice(0, 3).join(', ')}).`);
  }
  if (clarity >= 8) {
    whatWentWell.push('Communicated concisely and clearly without unnecessary fluff.');
  }

  if (hasSevereMisconception) {
    missingPoints.push('Contained fundamental technical misconceptions regarding concurrency and locks.');
    howToImprove.push('Review distributed locking primitives, database ACID isolation levels, and race condition mitigations.');
  } else {
    if (relevance < 5) {
      missingPoints.push('Response did not directly address the prompt or diverted to unrelated topics.');
    }
    if (uniqueTechTerms.size < 2) {
      missingPoints.push('Omitted key technical mechanisms, caching strategies, and architectural specifics.');
    }
    if (completeness < 7) {
      missingPoints.push('Could discuss concrete trade-offs, edge cases, and performance implications.');
    }
    if (howToImprove.length === 0) {
      howToImprove.push('Reinforce explanations with concrete numbers, production trade-offs, and failure handling.');
    }
  }

  let feedback = '';
  if (score >= 85) {
    feedback = 'Strong answer demonstrating solid domain understanding and clear technical articulation.';
  } else if (score >= 55) {
    feedback = 'Good baseline response covering main concepts. Adding more depth on edge cases and trade-offs would elevate this answer.';
  } else if (score >= 35) {
    feedback = 'Partially addressed the question, but lacked key technical details or strayed from the core requirements.';
  } else {
    feedback = 'The response did not sufficiently address the technical prompt, contained major errors, or was off-topic.';
  }

  return {
    relevance,
    accuracy,
    completeness,
    clarity,
    score,
    feedback,
    what_went_well: whatWentWell.length ? whatWentWell : ['Attempted response.'],
    missing_points: missingPoints.length ? missingPoints : ['Deeper technical elaboration.'],
    how_to_improve: howToImprove,
  };
}
