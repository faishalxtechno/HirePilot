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
export type InterviewStatus = 'in_progress' | 'completed' | 'abandoned';

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

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  target_role?: string;
  experience_level?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Question {
  id: string;
  interview_id: string;
  question_number: number;
  question_text: string;
  category?: string;
  difficulty: DifficultyLevel;
  created_at?: string;
}

export interface Answer {
  id: string;
  question_id: string;
  interview_id: string;
  user_id: string;
  user_answer: string;
  relevance_score: number;
  accuracy_score: number;
  completeness_score: number;
  clarity_score: number;
  feedback?: string;
  missing_points?: string[];
  created_at?: string;
}

export interface AnswerEvaluation {
  id?: string;
  question_id?: string;
  relevance: number; // 1-10
  accuracy: number; // 1-10
  completeness: number; // 1-10
  clarity: number; // 1-10
  feedback: string;
  what_went_well: string[];
  missing_points: string[];
  how_to_improve: string[];
}

export interface InterviewReport {
  id: string;
  interview_id: string;
  user_id: string;
  overall_score: number;
  technical_score: number;
  problem_solving_score?: number;
  communication_score: number;
  confidence_score?: number;
  answer_quality_score?: number;
  strengths: string[];
  weaknesses: string[];
  recommendations?: string[];
  ai_summary: string;
  certificate_id?: string;
  result_id?: string;
  created_at?: string;
}

export interface Interview {
  id: string;
  user_id: string;
  role: RoleType;
  interview_type: InterviewType;
  difficulty: DifficultyLevel;
  total_questions: number;
  current_question: number;
  score?: number;
  status: InterviewStatus;
  started_at: string;
  completed_at?: string;
  interview_reports?: Array<{ overall_score: number }>;
}

export interface DashboardStats {
  interviewsCompleted: number;
  averageScore: number;
  bestScore: number;
  currentStreak: number;
  monthlyUsed: number;
  monthlyMax: number;
  monthlyRemaining: number;
}

export interface DashboardPerformance {
  technicalKnowledge: number;
  problemSolving: number;
  communication: number;
  answerQuality: number;
}

export interface DashboardRecommendation {
  title: string;
  description: string;
  targetType: InterviewType;
  targetRole: string;
}

export interface DashboardData {
  stats: DashboardStats;
  performance: DashboardPerformance;
  recommendation: DashboardRecommendation;
  recentInterviews: Interview[];
}

export * from './resumeBuilder';
