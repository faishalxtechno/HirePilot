import { callGemini, parseJsonOrThrow } from './client';
import { SYSTEM_PROMPT_REPORT } from './prompts';
import { FinalReportOutput, RoleType, InterviewType, DifficultyLevel } from '../types';
import { calculateInterviewScores, calculateQuestionScore } from './scoringRubric';

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
    what_went_well?: string[];
    missing_points?: string[];
    how_to_improve?: string[];
  }>;
}

export async function generateFinalReport(apiKey: string, session: InterviewSessionData): Promise<FinalReportOutput> {
  const { role, interviewType, difficulty, items } = session;

  // Calculate ground-truth mathematical scores from evaluated question items
  const aggregatedScores = calculateInterviewScores(items);

  if (!items || items.length === 0) {
    return {
      overall_score: 0,
      technical_score: 0,
      problem_solving_score: 0,
      communication_score: 0,
      answer_quality_score: 0,
      strengths: [],
      weaknesses: ['No questions were completed during this session.'],
      recommendations: ['Complete full interview session to receive personalized recommendations.'],
      ai_summary: 'Interview session ended without recorded answers.',
    };
  }

  // Format transcript including real scores for Gemini synthesis
  const transcript = items.map((item, idx) => {
    const qScore = calculateQuestionScore(item);
    return `
Question ${idx + 1} (${item.category || 'General'}): "${item.questionText}"
Candidate Answer: "${item.userAnswer}"
Scores - Relevance: ${item.relevance}/10, Accuracy: ${item.accuracy}/10, Completeness: ${item.completeness}/10, Clarity: ${item.clarity}/10 (Question Score: ${qScore}/100)
Feedback: ${item.feedback || 'None'}
---`;
  }).join('\n');

  const userPrompt = `
Synthesize this complete mock interview transcript for a candidate interviewing for:
- Role: ${role}
- Interview Type: ${interviewType.toUpperCase()}
- Level: ${difficulty}
- Overall Evaluated Score: ${aggregatedScores.overall_score}/100
- Technical Accuracy Score: ${aggregatedScores.technical_score}/100

Transcript:
${transcript}

Highlight 3-5 concrete strengths demonstrated during the interview, 2-4 clear constructive weaknesses, 3 targeted learning topics/areas to practice next, and a brief executive AI summary.

Return ONLY a JSON object adhering to this schema:
{
  "strengths": [
    "Specific technical or conceptual strength 1",
    "Specific strength 2"
  ],
  "weaknesses": [
    "Specific technical gap or missing detail 1",
    "Specific gap 2"
  ],
  "recommendations": [
    "Topic 1 to study",
    "Topic 2 to study",
    "Topic 3 to study"
  ],
  "ai_summary": "Executive summary paragraph evaluating readiness for the target role based on their actual performance."
}
`;

  try {
    if (!apiKey || apiKey === 'offline-deterministic') {
      throw new Error('API key not provided for Gemini report generation');
    }

    const responseText = await callGemini({
      apiKey,
      systemInstruction: SYSTEM_PROMPT_REPORT,
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      temperature: 0.3,
      responseMimeType: 'application/json',
    });

    const parsed = parseJsonOrThrow<Partial<FinalReportOutput>>(responseText);

    const report: FinalReportOutput = {
      // Ground-truth scores calculated directly from question evaluations
      overall_score: aggregatedScores.overall_score,
      technical_score: aggregatedScores.technical_score,
      problem_solving_score: aggregatedScores.problem_solving_score,
      communication_score: aggregatedScores.communication_score,
      answer_quality_score: aggregatedScores.answer_quality_score,
      strengths: Array.isArray(parsed.strengths) && parsed.strengths.length > 0
        ? parsed.strengths.filter(Boolean)
        : deriveStrengthsFromItems(items),
      weaknesses: Array.isArray(parsed.weaknesses) && parsed.weaknesses.length > 0
        ? parsed.weaknesses.filter(Boolean)
        : deriveWeaknessesFromItems(items),
      recommendations: Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0
        ? parsed.recommendations.filter(Boolean)
        : ['System Architecture & Edge Cases', 'Data Structures & Algorithms', 'Communication Structure'],
      ai_summary: typeof parsed.ai_summary === 'string' && parsed.ai_summary.trim()
        ? parsed.ai_summary.trim()
        : `Candidate completed ${items.length} questions for the ${role} position, achieving an overall evaluated score of ${aggregatedScores.overall_score}/100.`,
    };

    return report;
  } catch (error) {
    console.warn('AI report generation fallback to deterministic synthesis:', error);
    // Deterministic factual synthesis without fabricating feedback or defaulting to 68%
    return {
      overall_score: aggregatedScores.overall_score,
      technical_score: aggregatedScores.technical_score,
      problem_solving_score: aggregatedScores.problem_solving_score,
      communication_score: aggregatedScores.communication_score,
      answer_quality_score: aggregatedScores.answer_quality_score,
      strengths: deriveStrengthsFromItems(items),
      weaknesses: deriveWeaknessesFromItems(items),
      recommendations: deriveRecommendationsFromItems(items, role),
      ai_summary: `Candidate completed ${items.length} interview questions for the ${role} position with an overall evaluated performance score of ${aggregatedScores.overall_score}/100.`,
    };
  }
}

function deriveStrengthsFromItems(items: InterviewSessionData['items']): string[] {
  const gathered: string[] = [];
  for (const item of items) {
    if (item.what_went_well && item.what_went_well.length) {
      gathered.push(...item.what_went_well);
    }
  }
  const unique = Array.from(new Set(gathered)).slice(0, 4);
  if (unique.length > 0) return unique;
  return ['Demonstrated foundational knowledge during technical questioning.'];
}

function deriveWeaknessesFromItems(items: InterviewSessionData['items']): string[] {
  const gathered: string[] = [];
  for (const item of items) {
    if (item.missing_points && item.missing_points.length) {
      gathered.push(...item.missing_points);
    }
  }
  const unique = Array.from(new Set(gathered)).slice(0, 4);
  if (unique.length > 0) return unique;
  return ['Could provide deeper elaboration on operational edge cases and performance trade-offs.'];
}

function deriveRecommendationsFromItems(items: InterviewSessionData['items'], role: string): string[] {
  const gathered: string[] = [];
  for (const item of items) {
    if (item.how_to_improve && item.how_to_improve.length) {
      gathered.push(...item.how_to_improve);
    }
  }
  const unique = Array.from(new Set(gathered)).slice(0, 3);
  if (unique.length > 0) return unique;
  return [
    `${role} Architecture & Trade-Offs`,
    'Performance Optimization & Concurrency',
    'Structured STAR Technical Communication',
  ];
}
