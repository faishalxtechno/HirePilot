export interface Env {
  GEMINI_API_KEY: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

export type RoleType =
  | 'Software Engineer'
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Full Stack Developer'
  | 'Data Scientist'
  | 'Machine Learning Engineer'
  | 'Java Developer'
  | 'Python Developer'
  | string;

export type InterviewType = 'technical' | 'hr' | 'behavioral' | 'dsa' | 'mixed';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface CreateInterviewPayload {
  role: RoleType;
  interview_type: InterviewType;
  difficulty: DifficultyLevel;
  total_questions?: number;
}

export interface SubmitAnswerPayload {
  question_id: string;
  user_answer: string;
}

export interface AnswerEvaluation {
  relevance: number; // 1-10
  accuracy: number; // 1-10
  completeness: number; // 1-10
  clarity: number; // 1-10
  feedback: string;
  what_went_well: string[];
  missing_points: string[];
  how_to_improve: string[];
}

export interface QuestionOutput {
  question_text: string;
  category: string;
  difficulty: DifficultyLevel;
}

export interface FinalReportOutput {
  overall_score: number;
  technical_score: number;
  problem_solving_score: number;
  communication_score: number;
  answer_quality_score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  ai_summary: string;
}
