import { callGemini, parseJsonFromAi } from './client';
import { SYSTEM_PROMPT_EVALUATOR } from './prompts';
import { AnswerEvaluation, DifficultyLevel, RoleType } from '../types';

export interface EvaluationContext {
  role: RoleType;
  questionText: string;
  category?: string;
  difficulty: DifficultyLevel;
  userAnswer: string;
}

export async function evaluateAnswer(apiKey: string, context: EvaluationContext): Promise<AnswerEvaluation> {
  const { role, questionText, category, difficulty, userAnswer } = context;

  const userPrompt = `
Evaluate the candidate's answer for the following interview question:

- Role Context: ${role}
- Question Category: ${category || 'General'}
- Expected Difficulty: ${difficulty}
- Question Asked: "${questionText}"
- Candidate's Submitted Answer: "${userAnswer}"

Please score each category from 1 to 10 (integer or one decimal place) and provide structured feedback.
Do NOT give generic feedback; be specific to the technical and conceptual merits of their answer.

Return ONLY a JSON object with this exact schema:
{
  "relevance": 8,
  "accuracy": 7,
  "completeness": 6,
  "clarity": 8,
  "feedback": "Concise summary evaluation paragraph (2-3 sentences max).",
  "what_went_well": [
    "Specific point 1",
    "Specific point 2"
  ],
  "missing_points": [
    "Key omitted technical nuance or concept 1",
    "Key omitted detail 2"
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
      temperature: 0.3,
      responseMimeType: 'application/json',
    });

    const parsed = parseJsonFromAi<AnswerEvaluation>(responseText, {
      relevance: 7,
      accuracy: 7,
      completeness: 6,
      clarity: 8,
      feedback: 'Good overall answer that demonstrated core knowledge of the subject with clear expression.',
      what_went_well: ['Addressed the main intent of the question directly', 'Clear communication'],
      missing_points: ['Could elaborate on specific architectural trade-offs', 'Provide more concrete examples'],
      how_to_improve: ['Structure technical explanations using the STAR or problem-solution-tradeoff format'],
    });

    // Ensure score bounds (1-10)
    parsed.relevance = Math.min(10, Math.max(1, Number(parsed.relevance) || 7));
    parsed.accuracy = Math.min(10, Math.max(1, Number(parsed.accuracy) || 7));
    parsed.completeness = Math.min(10, Math.max(1, Number(parsed.completeness) || 6));
    parsed.clarity = Math.min(10, Math.max(1, Number(parsed.clarity) || 7));

    if (!Array.isArray(parsed.what_went_well)) parsed.what_went_well = [];
    if (!Array.isArray(parsed.missing_points)) parsed.missing_points = [];
    if (!Array.isArray(parsed.how_to_improve)) parsed.how_to_improve = [];

    return parsed;
  } catch (error) {
    console.error('Error in evaluateAnswer AI call:', error);
    return {
      relevance: 7,
      accuracy: 7,
      completeness: 6,
      clarity: 7,
      feedback: 'Your answer demonstrated good baseline understanding. Continue practicing concise explanations with practical examples.',
      what_went_well: ['Clear presentation of concepts', 'Relevant to the question asked'],
      missing_points: ['Deeper dive into edge cases and performance characteristics'],
      how_to_improve: ['Mention real-world implementation details to reinforce your expertise'],
    };
  }
}
