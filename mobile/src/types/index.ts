/**
 * HirePilot Mobile Core Type Definitions
 * Matches existing Supabase database models and API contracts
 */

export type RoleType =
  | 'Software Engineer'
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Full Stack Developer'
  | 'Data Scientist'
  | 'Machine Learning Engineer'
  | 'DevOps Engineer'
  | 'Product Manager'
  | 'Custom Role';

export type InterviewType = 'technical' | 'dsa' | 'behavioral' | 'hr' | 'mixed';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type InterviewStatus = 'in_progress' | 'completed' | 'abandoned';

export interface UserProfile {
  id: string;
  name: string;
  target_role: string;
  experience_level: string;
  target_companies?: string[];
  skills?: string[];
  avatar_url?: string;
  resume_url?: string;
  subscription_tier?: 'free' | 'pro' | 'enterprise';
  monthly_interviews_used?: number;
  monthly_interviews_limit?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Question {
  id: string;
  interview_id: string;
  question_order: number;
  question_text: string;
  category?: string;
  created_at?: string;
}

export interface AnswerEvaluation {
  relevance: number; // 0-10
  accuracy: number; // 0-10
  completeness: number; // 0-10
  clarity: number; // 0-10
  feedback: string;
  what_went_well?: string[];
  missing_points?: string[];
  how_to_improve?: string[];
}

export interface Answer {
  id: string;
  interview_id: string;
  question_id: string;
  answer_text: string;
  evaluation?: AnswerEvaluation;
  time_spent_seconds?: number;
  created_at?: string;
}

export interface InterviewReport {
  id: string;
  interview_id: string;
  overall_score: number; // 0-100
  strengths: string[];
  weaknesses: string[];
  detailed_feedback: string;
  role_readiness_score: number;
  radar_metrics?: {
    technical: number;
    communication: number;
    problem_solving: number;
    depth: number;
  };
  created_at?: string;
}

export interface Interview {
  id: string;
  user_id: string;
  role: string;
  interview_type: InterviewType;
  difficulty: DifficultyLevel;
  status: InterviewStatus;
  total_questions: number;
  score?: number;
  started_at: string;
  completed_at?: string;
  questions?: Question[];
  answers?: Answer[];
  interview_reports?: InterviewReport[];
}

export interface DashboardData {
  stats: {
    interviewsCompleted: number;
    averageScore: number;
    bestScore: number;
    currentStreak: number;
    monthlyUsed: number;
    monthlyMax: number;
    monthlyRemaining: number;
  };
  recommendation: {
    title: string;
    description: string;
    action: string;
    type: InterviewType;
    role: string;
  };
  performance: {
    technical: number;
    dsa: number;
    behavioral: number;
    systemDesign: number;
    communication: number;
  };
  recentInterviews: Interview[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Part-time' | 'Internship';
  workplaceType: 'Remote' | 'Hybrid' | 'On-site';
  salary: string;
  experienceLevel: string;
  targetRoles: string[];
  skills: string[];
  description: string;
  postedAt: string;
  featured?: boolean;
}

export type ApplicationStage = 'saved' | 'applied' | 'interviewing' | 'offer' | 'rejected';

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  workplaceType: string;
  stage: ApplicationStage;
  appliedDate: string;
  lastUpdated: string;
  interviewDate?: string;
  notes?: string;
}

export interface ResumeAnalysis {
  id: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  atsScore: number; // 0-100
  categoryScores: {
    keywords: number;
    impact: number;
    formatting: number;
    actionVerbs: number;
  };
  strengths: string[];
  improvements: string[];
  missingKeywords: string[];
  detectedKeywords: string[];
  bulletPoints: {
    original: string;
    improved: string;
    reason: string;
  }[];
}
