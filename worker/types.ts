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
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface CreateInterviewPayload {
  role: RoleType;
  interview_type: InterviewType;
  difficulty: DifficultyLevel;
  total_questions?: number;
  experience_level?: ExperienceLevel;
  programming_language?: string;
  job_description?: string;
}

export interface SubmitAnswerPayload {
  question_id: string;
  user_answer: string;
}

export interface AnswerEvaluation {
  relevance: number; // 0-10
  accuracy: number; // 0-10
  completeness: number; // 0-10
  clarity: number; // 0-10
  weighted_score?: number; // 0-100
  feedback: string;
  accuracy_explanation?: string;
  what_went_well: string[];
  missing_points: string[];
  how_to_improve: string[];
  suggested_answer?: string;
}

export interface QuestionOutput {
  question_text: string;
  category: string;
  difficulty: DifficultyLevel;
  hint?: string;
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
