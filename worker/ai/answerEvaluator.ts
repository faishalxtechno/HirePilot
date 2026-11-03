import { callGemini, parseJsonFromAi } from './client';
import { SYSTEM_PROMPT_EVALUATOR } from './prompts';
import { AnswerEvaluation, DifficultyLevel, RoleType } from '../types';
import { parseDimensionScore, calculateWeightedAnswerScore } from './scoringRubric';

export interface EvaluationContext {
  role: RoleType;
  questionText: string;
  category?: string;
  difficulty: DifficultyLevel;
  userAnswer: string;
}

export async function evaluateAnswer(apiKey: string, context: EvaluationContext): Promise<AnswerEvaluation> {
  const { role, questionText, category, difficulty, userAnswer } = context;
  const trimmedAnswer = (userAnswer || '').trim();

  // If answer is empty or completely blank, assign genuine zero scores without masking or falsy coercion
  if (!trimmedAnswer) {
    return {
      accuracy: 0,
      relevance: 0,
      completeness: 0,
      clarity: 0,
      weighted_score: 0,
      feedback: 'No answer was provided for this question. In an actual interview, submitting an empty response represents an unattempted question.',
      what_went_well: [],
      missing_points: ['No response submitted to evaluate domain knowledge or problem-solving approaches.'],
      how_to_improve: ['Always attempt the question by outlining foundational concepts, asking clarifying questions, or explaining high-level approaches.'],
      suggested_answer: 'A strong answer would directly define the core architecture, discuss runtime trade-offs, and cite concrete examples from past projects.',
    };
  }

  const userPrompt = `
Evaluate the candidate's answer for the following interview question:

- Target Role: ${role}
- Question Category: ${category || 'General'}
- Expected Seniority/Difficulty: ${difficulty}
- Question Asked: "${questionText}"
- Candidate's Submitted Answer: "${trimmedAnswer}"

Scoring Guidelines:
1. accuracy (40% weight): Score 0.0 to 10.0. Technical precision and factual correctness.
2. relevance (25% weight): Score 0.0 to 10.0. Direct addressal of the prompt without evasive padding.
3. completeness (20% weight): Score 0.0 to 10.0. Coverage of edge cases, architectural trade-offs, scale, or failure modes.
4. clarity (15% weight): Score 0.0 to 10.0. Structural conciseness, articulation, and professional phrasing.

CRITICAL:
- If the answer is nonsense, completely wrong, or a generic placeholder, assign 0 or near 0 scores.
- Do NOT reward length over substance.
- Do NOT penalize concise answers if factually and conceptually complete.
- Provide a realistic 10/10 exemplar "suggested_answer" demonstrating how a seasoned engineer would answer this question concisely and effectively.

Return ONLY a JSON object adhering to this exact schema:
{
  "accuracy": 8.0,
  "relevance": 9.0,
  "completeness": 7.5,
  "clarity": 8.5,
  "feedback": "Objective evaluation paragraph analyzing the technical and communication merits of their answer (2-3 sentences max).",
  "what_went_well": [
    "Specific point 1 directly from their answer",
    "Specific point 2 directly from their answer"
  ],
  "missing_points": [
    "Concrete technical nuance, edge case, or trade-off omitted 1",
    "Concrete detail omitted 2"
  ],
  "how_to_improve": [
    "Actionable guidance to elevate response to senior/staff level"
  ],
  "suggested_answer": "Exemplary 10/10 model response demonstrating ideal depth, structure, and technical terminology."
}
`;

  try {
    const responseText = await callGemini({
      apiKey,
      systemInstruction: SYSTEM_PROMPT_EVALUATOR,
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      temperature: 0.2,
      responseMimeType: 'application/json',
    });

    const parsed = parseJsonFromAi<Partial<AnswerEvaluation>>(responseText, {});

    // Parse scores safely preserving genuine zeros (never use Number() || fallback)
    const accuracy = parseDimensionScore(parsed.accuracy, 5);
    const relevance = parseDimensionScore(parsed.relevance, 5);
    const completeness = parseDimensionScore(parsed.completeness, 5);
    const clarity = parseDimensionScore(parsed.clarity, 5);

    const weighted_score = calculateWeightedAnswerScore({ accuracy, relevance, completeness, clarity });

    const feedback = typeof parsed.feedback === 'string' && parsed.feedback.trim()
      ? parsed.feedback.trim()
      : 'Your answer was evaluated across technical accuracy, relevance, completeness, and clarity.';

    const what_went_well = Array.isArray(parsed.what_went_well) ? parsed.what_went_well.filter(Boolean) : [];
    const missing_points = Array.isArray(parsed.missing_points) ? parsed.missing_points.filter(Boolean) : [];
    const how_to_improve = Array.isArray(parsed.how_to_improve) ? parsed.how_to_improve.filter(Boolean) : [];
    const suggested_answer = typeof parsed.suggested_answer === 'string' && parsed.suggested_answer.trim()
      ? parsed.suggested_answer.trim()
      : undefined;

    return {
      accuracy,
      relevance,
      completeness,
      clarity,
      weighted_score,
      feedback,
      what_went_well,
      missing_points,
      how_to_improve,
      suggested_answer,
    };
  } catch (error: any) {
    console.error('Error in evaluateAnswer AI call:', error);
    // Explicit evaluation error - Never silently substitute with fake constant scores
    throw new Error(
      `AI Answer Evaluation failed: ${error.message || 'Unable to analyze answer with Gemini AI'}. Please check your connection and retry submission.`
    );
  }
}
