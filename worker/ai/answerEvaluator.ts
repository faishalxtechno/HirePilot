import { callGemini, parseJsonOrThrow } from './client';
import { SYSTEM_PROMPT_EVALUATOR } from './prompts';
import { AnswerEvaluation, DifficultyLevel, RoleType } from '../types';
import { clampDimension, evaluateAnswerDeterministically } from './scoringRubric';

export interface EvaluationContext {
  role: RoleType;
  questionText: string;
  category?: string;
  difficulty: DifficultyLevel;
  userAnswer: string;
}

export async function evaluateAnswer(apiKey: string, context: EvaluationContext): Promise<AnswerEvaluation> {
  const { role, questionText, category, difficulty, userAnswer } = context;
  const trimmed = (userAnswer || '').trim();

  // Case D: Empty or whitespace answer directly scores 0 across all rubrics
  if (!trimmed) {
    return {
      relevance: 0,
      accuracy: 0,
      completeness: 0,
      clarity: 0,
      feedback: 'No answer was provided for this question. A response is required to earn interview credit.',
      what_went_well: [],
      missing_points: ['Answer was left blank or empty.'],
      how_to_improve: ['Structure your response using the STAR method or technical concept-tradeoff framework.'],
    };
  }

  // Support deterministic test mode when explicitly requested
  if (apiKey === 'offline-deterministic') {
    return evaluateAnswerDeterministically(context);
  }

  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Unable to perform AI answer evaluation.');
  }

  const userPrompt = `
Evaluate the candidate's answer for the following interview question:

- Target Role: ${role}
- Question Category: ${category || 'General'}
- Expected Difficulty: ${difficulty}
- Question Asked: "${questionText}"
- Candidate's Submitted Answer: "${trimmed}"

Please score each dimension strictly from 0 to 10 (integer or one decimal place) and provide structured feedback.
Scoring guide:
- 0 to 2: Off-topic, empty, or technically invalid.
- 3 to 5: Significant errors, major omissions, or weak relevance.
- 6 to 7: Partially correct, solid baseline, minor nuances omitted.
- 8 to 10: Accurate, relevant, clear, and well-explained. Do NOT penalize concise answers for brevity.

Return ONLY a JSON object with this exact schema:
{
  "relevance": 8.5,
  "accuracy": 8.0,
  "completeness": 7.0,
  "clarity": 9.0,
  "feedback": "Objective evaluation summary specific to their actual technical answer (2-3 sentences max).",
  "what_went_well": [
    "Specific technical strength 1",
    "Specific technical strength 2"
  ],
  "missing_points": [
    "Key omitted technical nuance or concept 1"
  ],
  "how_to_improve": [
    "Concrete actionable advice for future interview responses"
  ]
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

    const parsed = parseJsonOrThrow<AnswerEvaluation>(responseText);

    // Validate and clamp each dimension to [0, 10] without falsy fallbacks
    const sanitized: AnswerEvaluation = {
      relevance: clampDimension(parsed.relevance),
      accuracy: clampDimension(parsed.accuracy),
      completeness: clampDimension(parsed.completeness),
      clarity: clampDimension(parsed.clarity),
      feedback: typeof parsed.feedback === 'string' && parsed.feedback.trim()
        ? parsed.feedback.trim()
        : 'Answer evaluated against rubric criteria.',
      what_went_well: Array.isArray(parsed.what_went_well) ? parsed.what_went_well.filter(Boolean) : [],
      missing_points: Array.isArray(parsed.missing_points) ? parsed.missing_points.filter(Boolean) : [],
      how_to_improve: Array.isArray(parsed.how_to_improve) ? parsed.how_to_improve.filter(Boolean) : [],
    };

    return sanitized;
  } catch (error: any) {
    console.error('Error in evaluateAnswer AI call:', error);
    // Do NOT silently substitute fake passing scores (e.g. 68%).
    // Throw error to notify caller so it can provide a safe retry.
    throw new Error(`AI answer evaluation failed: ${error.message || 'Unknown model error'}`);
  }
}
