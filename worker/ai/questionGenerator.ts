import { callGemini, extractJsonFromAi } from './client';
import { SYSTEM_PROMPT_INTERVIEWER } from './prompts';
import { DifficultyLevel, InterviewType, QuestionOutput, RoleType, ExperienceLevel } from '../types';

export interface QuestionContext {
  role: RoleType;
  interviewType: InterviewType;
  currentDifficulty: DifficultyLevel;
  questionNumber: number;
  totalQuestions: number;
  experienceLevel?: ExperienceLevel;
  programmingLanguage?: string;
  jobDescription?: string;
  history?: Array<{
    question: string;
    answer: string;
    scoreAvg: number;
    difficulty: string;
    category?: string;
  }>;
}

export async function generateQuestion(apiKey: string, context: QuestionContext): Promise<QuestionOutput> {
  const {
    role,
    interviewType,
    currentDifficulty,
    questionNumber,
    totalQuestions,
    experienceLevel = 'intermediate',
    programmingLanguage,
    jobDescription,
    history = [],
  } = context;

  // Adaptive difficulty guidance based on recent performance
  let performanceSummary = 'Starting interview session. Present a strong, foundational question tailored to the role.';
  if (history.length > 0) {
    const recentScores = history.slice(-2).map(h => h.scoreAvg);
    const avgRecent = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;

    if (avgRecent >= 8.0) {
      performanceSummary = `Candidate scored exceptionally high (~${avgRecent.toFixed(1)}/10) on recent questions. Increase challenge, probe distributed trade-offs, failure modes, and edge cases.`;
    } else if (avgRecent <= 5.0) {
      performanceSummary = `Candidate had difficulty (~${avgRecent.toFixed(1)}/10) on recent questions. Step back to core conceptual principles to establish baseline understanding.`;
    } else {
      performanceSummary = `Candidate is performing steadily (~${avgRecent.toFixed(1)}/10). Maintain balanced ${currentDifficulty} difficulty with realistic scenario-based engineering questions.`;
    }
  }

  const previousQuestionsList = history
    .map((h, i) => `${i + 1}. [${h.difficulty} - ${h.category || 'General'}] ${h.question}`)
    .join('\n');

  const contextAdditions = [
    experienceLevel ? `- Candidate Experience Level: ${experienceLevel}` : '',
    programmingLanguage ? `- Focus Language / Framework: ${programmingLanguage}` : '',
    jobDescription ? `- Target Job Description Snippet: "${jobDescription.slice(0, 500)}"` : '',
  ].filter(Boolean).join('\n');

  const userPrompt = `
Generate Question ${questionNumber} of ${totalQuestions} for an interview with the following parameters:
- Target Role: ${role}
- Interview Format: ${interviewType.toUpperCase()} (technical concepts, system architecture, DSA, behavioral, or mixed)
- Base Difficulty: ${currentDifficulty}
${contextAdditions}
- Performance Progression: ${performanceSummary}

Previously Asked Questions in this Session (DO NOT repeat or ask duplicates):
${previousQuestionsList || 'None (First Question)'}

Requirements:
- Ask exactly ONE clear, thoughtful, realistic question.
- Do NOT provide the answer or solution.
- Provide a helpful, constructive "hint" (a thinking framework or key angles to consider without giving away the direct answer).

Return ONLY a JSON object adhering to this exact schema:
{
  "question_text": "The exact question text for the candidate to answer in text format. Keep it concise, engaging, and clear.",
  "category": "Core category (e.g. Distributed Caching, React State Architecture, Database Indexing, STAR Conflict Resolution, etc.)",
  "difficulty": "easy" | "medium" | "hard",
  "hint": "A concise hint or thinking framework (1-2 sentences) guiding how to structure a complete answer."
}
`;

  try {
    const responseText = await callGemini({
      apiKey,
      systemInstruction: SYSTEM_PROMPT_INTERVIEWER,
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      temperature: 0.4,
      responseMimeType: 'application/json',
    });

    const parsed = extractJsonFromAi<Partial<QuestionOutput>>(responseText);

    if (!parsed.question_text || typeof parsed.question_text !== 'string' || !parsed.question_text.trim()) {
      throw new Error('Gemini returned an invalid or empty question payload');
    }

    return {
      question_text: parsed.question_text.trim(),
      category: parsed.category && typeof parsed.category === 'string' ? parsed.category.trim() : 'Technical Fundamentals',
      difficulty: (parsed.difficulty === 'easy' || parsed.difficulty === 'hard') ? parsed.difficulty : currentDifficulty,
      hint: parsed.hint && typeof parsed.hint === 'string' ? parsed.hint.trim() : undefined,
    };
  } catch (error: any) {
    console.error('Error in generateQuestion AI call:', error);
    // Explicit error throw - Never silently substitute unrelated hardcoded questions
    throw new Error(
      `Question generation failed: ${error.message || 'Unable to connect to Gemini AI'}. Please click retry to generate this question.`
    );
  }
}
