/**
 * HirePilot Interview Scoring Rubric
 * Single Source of Truth for Weighted Answer Evaluations & Report Calculations.
 *
 * Rubric Weights:
 * - Technical Accuracy: 40% (0.40)
 * - Relevance:          25% (0.25)
 * - Completeness:       20% (0.20)
 * - Clarity:            15% (0.15)
 * Total:               100% (1.00)
 */

export const RUBRIC_WEIGHTS = {
  ACCURACY: 0.40,
  RELEVANCE: 0.25,
  COMPLETENESS: 0.20,
  CLARITY: 0.15,
} as const;

export interface ScoreDimensions {
  accuracy: number;     // 0 - 10
  relevance: number;    // 0 - 10
  completeness: number; // 0 - 10
  clarity: number;      // 0 - 10
}

/**
 * Safely parses and validates a dimension score from AI or database output.
 * Crucial: Does NOT use JavaScript falsy coercion (val || fallback) so valid scores of 0 are never converted.
 */
export function parseDimensionScore(raw: unknown, defaultValue = 0): number {
  if (typeof raw === 'number' && !Number.isNaN(raw)) {
    return Math.min(10, Math.max(0, Math.round(raw * 10) / 10));
  }

  if (typeof raw === 'string') {
    const parsed = parseFloat(raw.trim());
    if (!Number.isNaN(parsed)) {
      return Math.min(10, Math.max(0, Math.round(parsed * 10) / 10));
    }
  }

  return defaultValue;
}

/**
 * Calculates a unified weighted score on a 0-100 scale for an individual answer.
 * Formula: (Accuracy * 0.40 + Relevance * 0.25 + Completeness * 0.20 + Clarity * 0.15) * 10
 */
export function calculateWeightedAnswerScore(scores: ScoreDimensions): number {
  const accuracy = parseDimensionScore(scores.accuracy);
  const relevance = parseDimensionScore(scores.relevance);
  const completeness = parseDimensionScore(scores.completeness);
  const clarity = parseDimensionScore(scores.clarity);

  const weighted =
    accuracy * RUBRIC_WEIGHTS.ACCURACY +
    relevance * RUBRIC_WEIGHTS.RELEVANCE +
    completeness * RUBRIC_WEIGHTS.COMPLETENESS +
    clarity * RUBRIC_WEIGHTS.CLARITY;

  return Math.min(100, Math.max(0, Math.round(weighted * 10)));
}

/**
 * Calculates overall interview and categorical scores across all completed questions.
 * Ensures consistent mathematical alignment between answers, reports, and database records.
 */
export function calculateInterviewAggregates(answers: ScoreDimensions[]): {
  overallScore: number;
  technicalScore: number;
  problemSolvingScore: number;
  communicationScore: number;
  answerQualityScore: number;
} {
  if (!answers || answers.length === 0) {
    return {
      overallScore: 0,
      technicalScore: 0,
      problemSolvingScore: 0,
      communicationScore: 0,
      answerQualityScore: 0,
    };
  }

  let totalAccuracy = 0;
  let totalRelevance = 0;
  let totalCompleteness = 0;
  let totalClarity = 0;
  let totalWeighted = 0;

  for (const ans of answers) {
    const acc = parseDimensionScore(ans.accuracy);
    const rel = parseDimensionScore(ans.relevance);
    const comp = parseDimensionScore(ans.completeness);
    const cla = parseDimensionScore(ans.clarity);

    totalAccuracy += acc;
    totalRelevance += rel;
    totalCompleteness += comp;
    totalClarity += cla;
    totalWeighted += calculateWeightedAnswerScore({ accuracy: acc, relevance: rel, completeness: comp, clarity: cla });
  }

  const n = answers.length;
  const avgAccuracy = (totalAccuracy / n) * 10;
  const avgRelevance = (totalRelevance / n) * 10;
  const avgCompleteness = (totalCompleteness / n) * 10;
  const avgClarity = (totalClarity / n) * 10;
  const overall = Math.round(totalWeighted / n);

  // Technical Score: Domain depth + Accuracy
  const technicalScore = Math.min(100, Math.max(0, Math.round(avgAccuracy)));

  // Problem Solving: Completeness of edge cases & solution trade-offs
  const problemSolvingScore = Math.min(100, Math.max(0, Math.round(avgCompleteness * 0.6 + avgAccuracy * 0.4)));

  // Communication: Clarity + Relevance to the question asked
  const communicationScore = Math.min(100, Math.max(0, Math.round(avgClarity * 0.65 + avgRelevance * 0.35)));

  // Answer Quality: Weighted overall across all responses
  const answerQualityScore = overall;

  return {
    overallScore: overall,
    technicalScore,
    problemSolvingScore,
    communicationScore,
    answerQualityScore,
  };
}

