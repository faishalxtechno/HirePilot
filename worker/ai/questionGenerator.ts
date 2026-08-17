import { callGemini, parseJsonFromAi } from './client';
import { SYSTEM_PROMPT_INTERVIEWER } from './prompts';
import { DifficultyLevel, InterviewType, QuestionOutput, RoleType } from '../types';

export interface QuestionContext {
  role: RoleType;
  interviewType: InterviewType;
  currentDifficulty: DifficultyLevel;
  questionNumber: number;
  totalQuestions: number;
  history?: Array<{
    question: string;
    answer: string;
    scoreAvg: number;
    difficulty: string;
    category?: string;
  }>;
}

export async function generateQuestion(apiKey: string, context: QuestionContext): Promise<QuestionOutput> {
  const { role, interviewType, currentDifficulty, questionNumber, totalQuestions, history = [] } = context;

  // Determine dynamic difficulty guidance based on recent performance
  let performanceSummary = 'First question of the interview. Start with a solid foundational question.';
  if (history.length > 0) {
    const recentScores = history.slice(-2).map(h => h.scoreAvg);
    const avgRecent = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
    
    if (avgRecent >= 8.0) {
      performanceSummary = `The candidate scored very high (~${avgRecent.toFixed(1)}/10) on recent questions. Increase challenge, probe deeper architectural or edge-case nuances.`;
    } else if (avgRecent <= 5.0) {
      performanceSummary = `The candidate struggled (~${avgRecent.toFixed(1)}/10) on recent questions. Scale back slightly to test fundamental underlying concepts before building back up.`;
    } else {
      performanceSummary = `Candidate is performing moderately (~${avgRecent.toFixed(1)}/10). Maintain standard ${currentDifficulty} difficulty with practical real-world scenarios.`;
    }
  }

  const previousQuestionsList = history.map((h, i) => `${i + 1}. [${h.difficulty}] ${h.question}`).join('\n');

  const userPrompt = `
Generate Question ${questionNumber} of ${totalQuestions} for an interview with the following parameters:
- Target Role: ${role}
- Interview Type: ${interviewType.toUpperCase()} (e.g. technical concepts, system design, DSA, HR behavioral, or mixed)
- Base Difficulty Level: ${currentDifficulty}
- Candidate Performance Trend: ${performanceSummary}

Already Asked Questions (DO NOT repeat or ask near-duplicates of these):
${previousQuestionsList || 'None'}

Return ONLY a JSON object adhering to this schema:
{
  "question_text": "The exact question text for the candidate to answer in text format. Keep it concise, engaging, and clear.",
  "category": "Core category (e.g. Data Structures, React State, System Design, Behavioral Conflict, Database Indexing, etc.)",
  "difficulty": "easy" | "medium" | "hard"
}
`;

  try {
    const responseText = await callGemini({
      apiKey,
      systemInstruction: SYSTEM_PROMPT_INTERVIEWER,
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      temperature: 0.5,
      responseMimeType: 'application/json',
    });

    const parsed = parseJsonFromAi<QuestionOutput>(responseText, {
      question_text: `Explain how you approach optimizing performance in a ${role} project.`,
      category: 'System Performance',
      difficulty: currentDifficulty,
    });

    return parsed;
  } catch (error) {
    console.error('Error in generateQuestion AI call:', error);
    // Safe fallback based on interview type and role
    return getFallbackQuestion(role, interviewType, questionNumber, currentDifficulty);
  }
}

function getFallbackQuestion(role: string, type: InterviewType, qNum: number, diff: DifficultyLevel): QuestionOutput {
  const defaults: Record<string, string> = {
    technical: `In your experience as a ${role}, how do you ensure code maintainability, error handling, and testability in production environments?`,
    dsa: `Explain the trade-offs between using a Hash Map versus a Balanced Binary Search Tree for lookups and insertions.`,
    behavioral: `Tell me about a time you faced a complex technical disagreement with a team member. How did you handle it and what was the outcome?`,
    hr: `Why are you interested in pursuing a ${role} position, and what strengths do you bring to a high-performing engineering team?`,
    mixed: `Walk me through how you design an API endpoint from database schema to client response for high availability.`,
  };

  return {
    question_text: defaults[type] || defaults.technical,
    category: type === 'dsa' ? 'Algorithms' : type === 'behavioral' ? 'Collaboration' : 'Architecture',
    difficulty: diff,
  };
}
