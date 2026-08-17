import { callGemini, parseJsonFromAi } from './client';
import { SYSTEM_PROMPT_REPORT } from './prompts';
import { FinalReportOutput, RoleType, InterviewType, DifficultyLevel } from '../types';

export interface InterviewSessionData {
  role: RoleType;
  interviewType: InterviewType;
  difficulty: DifficultyLevel;
  items: Array<{
    questionNumber: number;
    questionText: string;
    category?: string;
    userAnswer: string;
    relevance: number;
    accuracy: number;
    completeness: number;
    clarity: number;
    feedback?: string;
  }>;
}

export async function generateFinalReport(apiKey: string, session: InterviewSessionData): Promise<FinalReportOutput> {
  const { role, interviewType, difficulty, items } = session;

  const transcript = items.map((item, idx) => `
Question ${idx + 1} (${item.category || 'General'}): "${item.questionText}"
Candidate Answer: "${item.userAnswer}"
Scores - Relevance: ${item.relevance}/10, Accuracy: ${item.accuracy}/10, Completeness: ${item.completeness}/10, Clarity: ${item.clarity}/10
Feedback: ${item.feedback || 'None'}
---
`).join('\n');

  const userPrompt = `
Synthesize this complete mock interview transcript for a candidate interviewing for:
- Role: ${role}
- Interview Type: ${interviewType.toUpperCase()}
- Level: ${difficulty}

Transcript:
${transcript}

Compute weighted realistic scores between 0 and 100 for each performance category:
- overall_score (0-100)
- technical_score (0-100)
- problem_solving_score (0-100)
- communication_score (0-100)
- answer_quality_score (0-100)

Highlight key strengths, clear constructive weaknesses, 3 targeted learning topics/areas to practice next, and a brief executive AI summary.

Return ONLY a JSON object adhering to this schema:
{
  "overall_score": 78,
  "technical_score": 82,
  "problem_solving_score": 76,
  "communication_score": 80,
  "answer_quality_score": 75,
  "strengths": [
    "Strong fundamental domain knowledge",
    "Clear and structured explanations",
    "Good attention to best practices"
  ],
  "weaknesses": [
    "Could discuss more concrete edge cases",
    "Time complexity analysis could be sharper"
  ],
  "recommendations": [
    "System Design & Scalability Patterns",
    "Data Structure Optimization",
    "Asynchronous Processing Models"
  ],
  "ai_summary": "Overall solid performance demonstrating good readiness for the role, with a clear path to master advanced problem-solving."
}
`;

  try {
    const responseText = await callGemini({
      apiKey,
      systemInstruction: SYSTEM_PROMPT_REPORT,
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      temperature: 0.3,
      responseMimeType: 'application/json',
    });

    const parsed = parseJsonFromAi<FinalReportOutput>(responseText, {
      overall_score: calculateFallbackScore(items),
      technical_score: 75,
      problem_solving_score: 72,
      communication_score: 78,
      answer_quality_score: 74,
      strengths: ['Good foundational knowledge', 'Clear articulation of ideas'],
      weaknesses: ['Provide more concrete architectural examples', 'Cover edge cases systematically'],
      recommendations: ['Algorithm efficiency', 'System architecture basics', 'Domain patterns'],
      ai_summary: 'Solid performance across the board. Focus on building real-world practical examples to elevate answers to senior levels.',
    });

    // Score sanitation
    parsed.overall_score = Math.min(100, Math.max(0, Math.round(Number(parsed.overall_score) || 75)));
    parsed.technical_score = Math.min(100, Math.max(0, Math.round(Number(parsed.technical_score) || 75)));
    parsed.problem_solving_score = Math.min(100, Math.max(0, Math.round(Number(parsed.problem_solving_score) || 75)));
    parsed.communication_score = Math.min(100, Math.max(0, Math.round(Number(parsed.communication_score) || 75)));
    parsed.answer_quality_score = Math.min(100, Math.max(0, Math.round(Number(parsed.answer_quality_score) || 75)));

    return parsed;
  } catch (error) {
    console.error('Error in generateFinalReport AI call:', error);
    const calculated = calculateFallbackScore(items);
    return {
      overall_score: calculated,
      technical_score: Math.min(100, calculated + 2),
      problem_solving_score: Math.max(0, calculated - 3),
      communication_score: calculated,
      answer_quality_score: calculated,
      strengths: ['Demonstrated clear familiarity with core role concepts', 'Structured response style'],
      weaknesses: ['Add deeper depth on operational edge cases', 'Include concrete metrics and trade-offs'],
      recommendations: ['Core Role Deep Dive', 'Scenario-based Problem Solving', 'Interview Communication Mastery'],
      ai_summary: 'You have shown good baseline competence. Continuing targeted practice will help you perform with high confidence in actual interviews.',
    };
  }
}

function calculateFallbackScore(items: InterviewSessionData['items']): number {
  if (!items.length) return 75;
  const totals = items.map(i => ((i.relevance + i.accuracy + i.completeness + i.clarity) / 4) * 10);
  const avg = totals.reduce((a, b) => a + b, 0) / totals.length;
  return Math.round(avg);
}
