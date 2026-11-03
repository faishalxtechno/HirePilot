import { callGemini, parseJsonFromAi } from './client';
import { SYSTEM_PROMPT_REPORT } from './prompts';
import { FinalReportOutput, RoleType, InterviewType, DifficultyLevel } from '../types';
import { calculateInterviewAggregates, calculateWeightedAnswerScore, parseDimensionScore } from './scoringRubric';

export interface InterviewSessionData {
  role: RoleType;
  interviewType: InterviewType;
  difficulty: DifficultyLevel;
  model?: string;
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

export async function generateFinalReport(
  apiKey: string,
  session: InterviewSessionData,
  model?: string
): Promise<FinalReportOutput> {
  const { role, interviewType, difficulty, items } = session;
  const selectedModel = model || session.model;

  // Compute strictly verified mathematical scores from the rubric
  const mathAggregates = calculateInterviewAggregates(
    items.map(i => ({
      accuracy: i.accuracy,
      relevance: i.relevance,
      completeness: i.completeness,
      clarity: i.clarity,
    }))
  );

  const transcript = items.map((item, idx) => {
    const qScore = calculateWeightedAnswerScore({
      accuracy: item.accuracy,
      relevance: item.relevance,
      completeness: item.completeness,
      clarity: item.clarity,
    });
    return `
Question ${idx + 1} (${item.category || 'General'}): "${item.questionText}"
Candidate Answer: "${item.userAnswer}"
Scores - Accuracy: ${item.accuracy}/10, Relevance: ${item.relevance}/10, Completeness: ${item.completeness}/10, Clarity: ${item.clarity}/10 => Question Score: ${qScore}%
Feedback: ${item.feedback || 'None'}
---`;
  }).join('\n');

  const userPrompt = `
Synthesize this complete mock interview transcript for a candidate interviewing for:
- Role: ${role}
- Interview Type: ${interviewType.toUpperCase()}
- Seniority/Level: ${difficulty}
- Mathematically Computed Overall Score: ${mathAggregates.overallScore}%

Transcript:
${transcript}

Requirements:
- Highlight 3-5 concrete strengths demonstrated during the interview citing real elements from their answers.
- Highlight 2-4 specific areas for improvement / gaps observed.
- Provide 3 targeted, actionable learning topics / technical concepts to revise next.
- Provide a thoughtful, balanced executive AI summary paragraph summarizing their readiness and clear next steps.

Return ONLY a JSON object adhering to this exact schema:
{
  "strengths": [
    "Specific technical or communication strength 1",
    "Specific strength 2"
  ],
  "weaknesses": [
    "Concrete technical gap or missed edge case 1",
    "Concrete gap 2"
  ],
  "recommendations": [
    "Topic 1 (e.g. Distributed Consensus & Locking)",
    "Topic 2 (e.g. Profiling Memory Leaks in V8)",
    "Topic 3 (e.g. STAR Framework Delivery)"
  ],
  "ai_summary": "Executive summary paragraph summarizing the candidate's performance, strengths, and recommended focus areas."
}
`;

  try {
    const responseText = await callGemini({
      apiKey,
      model: selectedModel,
      systemInstruction: SYSTEM_PROMPT_REPORT,
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      temperature: 0.3,
      responseMimeType: 'application/json',
    });

    const parsed = parseJsonFromAi<Partial<FinalReportOutput>>(responseText, {});

    const strengths = Array.isArray(parsed.strengths) && parsed.strengths.length > 0
      ? parsed.strengths.filter(Boolean)
      : ['Clear technical articulation of foundational concepts', 'Direct and professional communication style'];

    const weaknesses = Array.isArray(parsed.weaknesses) && parsed.weaknesses.length > 0
      ? parsed.weaknesses.filter(Boolean)
      : ['Cover operational edge cases and scale constraints in greater depth', 'Include concrete metrics and trade-off considerations'];

    const recommendations = Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0
      ? parsed.recommendations.filter(Boolean)
      : ['System Design & Scalability Patterns', 'Core Domain Fundamentals', 'Scenario-Based Answer Structuring'];

    const ai_summary = typeof parsed.ai_summary === 'string' && parsed.ai_summary.trim()
      ? parsed.ai_summary.trim()
      : `The candidate demonstrated solid baseline competence for the ${role} position with an overall score of ${mathAggregates.overallScore}%. Focused revision on advanced edge cases and system trade-offs will enhance readiness for senior-level rounds.`;

    return {
      overall_score: mathAggregates.overallScore,
      technical_score: mathAggregates.technicalScore,
      problem_solving_score: mathAggregates.problemSolvingScore,
      communication_score: mathAggregates.communicationScore,
      answer_quality_score: mathAggregates.answerQualityScore,
      strengths,
      weaknesses,
      recommendations,
      ai_summary,
    };
  } catch (error: any) {
    console.error('Error in generateFinalReport AI call:', error);
    // Even if qualitative AI summary generation encounters a network blip,
    // the mathematical scores derived from the candidate's actual answers are 100% preserved.
    return {
      overall_score: mathAggregates.overallScore,
      technical_score: mathAggregates.technicalScore,
      problem_solving_score: mathAggregates.problemSolvingScore,
      communication_score: mathAggregates.communicationScore,
      answer_quality_score: mathAggregates.answerQualityScore,
      strengths: ['Demonstrated clear familiarity with core role concepts', 'Structured response style across questions'],
      weaknesses: ['Add deeper depth on operational edge cases', 'Include concrete metrics and trade-offs'],
      recommendations: ['Core Role Deep Dive', 'Scenario-based Problem Solving', 'Interview Communication Mastery'],
      ai_summary: `Your performance was evaluated across ${items.length} questions resulting in a verified score of ${mathAggregates.overallScore}%. Continue targeting key architectural edge cases to reach top-tier interview readiness.`,
    };
  }
}
