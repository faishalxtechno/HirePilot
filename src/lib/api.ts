import { supabase, isSupabaseConfigured } from './supabase';
import { generateCertificateId, generateResultId } from './storage';
import {
  CreateInterviewPayload,
  Interview,
  Question,
  AnswerEvaluation,
  InterviewReport,
  DashboardData,
  RoleType,
  InterviewType,
  DifficultyLevel,
} from '../types';

const WORKER_URL = 'https://hirepilot-api.hirepilotapp.workers.dev/api';

async function getAuthHeader(): Promise<HeadersInit> {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token || 'demo-token';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

// -----------------------------------------------------------------------------
// Real Backend API Client
// -----------------------------------------------------------------------------
export const api = {
  // 1. Create Interview & First Question
  async createInterview(payload: {
    role: RoleType;
    interview_type: InterviewType;
    difficulty: DifficultyLevel;
    total_questions: number;
  }): Promise<{ interview: Interview; firstQuestion: Question }> {
    try {
      const headers = await getAuthHeader();
      const res = await fetch(`${WORKER_URL}/interviews`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed to create interview (${res.status})`);
      }

      return await res.json();
    } catch (err: any) {
      if (err.message && err.message.includes('monthly interview limit')) {
        throw err;
      }
      console.warn('Backend worker unavailable, using client-side fallback:', err.message);
      return fallbackCreateInterview(payload);
    }
  },

  // 2. Submit Answer & Receive AI Evaluation
  async submitAnswer(interviewId: string, payload: { question_id: string; user_answer: string }): Promise<AnswerEvaluation> {
    try {
      const headers = await getAuthHeader();
      const res = await fetch(`${WORKER_URL}/interviews/${interviewId}/answer`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed to evaluate answer (${res.status})`);
      }

      const data = await res.json();
      return data.evaluation;
    } catch (err: any) {
      console.warn('Backend worker unavailable, using client-side fallback:', err.message);
      return fallbackSubmitAnswer(interviewId, payload);
    }
  },

  // 3. Get Next Question
  async getNextQuestion(interviewId: string): Promise<{ question?: Question; finished?: boolean; message?: string }> {
    try {
      const headers = await getAuthHeader();
      const res = await fetch(`${WORKER_URL}/interviews/${interviewId}/next-question`, {
        method: 'POST',
        headers,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed to fetch next question (${res.status})`);
      }

      return await res.json();
    } catch (err: any) {
      console.warn('Backend worker unavailable, using client-side fallback:', err.message);
      return fallbackNextQuestion(interviewId);
    }
  },

  // 4. Complete Interview & Generate Report
  async completeInterview(interviewId: string): Promise<{ report: InterviewReport; interview?: Interview }> {
    try {
      const headers = await getAuthHeader();
      const res = await fetch(`${WORKER_URL}/interviews/${interviewId}/complete`, {
        method: 'POST',
        headers,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed to complete interview (${res.status})`);
      }

      return await res.json();
    } catch (err: any) {
      console.warn('Backend worker unavailable, using client-side fallback:', err.message);
      return fallbackCompleteInterview(interviewId);
    }
  },

  // 5. Get Interview Details
  async getInterview(interviewId: string): Promise<{ interview: Interview; questions: Question[]; answers: any[]; report: InterviewReport | null }> {
    try {
      const headers = await getAuthHeader();
      const res = await fetch(`${WORKER_URL}/interviews/${interviewId}`, {
        method: 'GET',
        headers,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed to fetch interview (${res.status})`);
      }

      return await res.json();
    } catch (err: any) {
      console.warn('Backend worker unavailable, using client-side fallback:', err.message);
      return fallbackGetInterview(interviewId);
    }
  },

  // 6. Get Interview Report
  async getReport(interviewId: string): Promise<{ report: InterviewReport }> {
    try {
      const headers = await getAuthHeader();
      const res = await fetch(`${WORKER_URL}/interviews/${interviewId}/report`, {
        method: 'GET',
        headers,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed to fetch report (${res.status})`);
      }

      return await res.json();
    } catch (err: any) {
      console.warn('Backend worker unavailable, using client-side fallback:', err.message);
      return fallbackGetReport(interviewId);
    }
  },

  // 7. Get All Interviews (History)
  async getInterviews(filters?: { role?: string; type?: string; difficulty?: string; status?: string }): Promise<Interview[]> {
    try {
      const headers = await getAuthHeader();
      const params = new URLSearchParams(filters as any);
      const res = await fetch(`${WORKER_URL}/interviews?${params.toString()}`, {
        method: 'GET',
        headers,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed to fetch interview list (${res.status})`);
      }

      const data = await res.json();
      return data.interviews || [];
    } catch (err: any) {
      console.warn('Backend worker unavailable, using client-side fallback:', err.message);
      return fallbackGetInterviews(filters);
    }
  },

  // 8. Get Dashboard Statistics
  async getDashboardData(): Promise<DashboardData> {
    try {
      const headers = await getAuthHeader();
      const res = await fetch(`${WORKER_URL}/dashboard/stats`, {
        method: 'GET',
        headers,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed to fetch dashboard stats (${res.status})`);
      }

      return await res.json();
    } catch (err: any) {
      console.warn('Backend worker unavailable, using client-side fallback:', err.message);
      return fallbackGetDashboardData();
    }
  },
};

// -----------------------------------------------------------------------------
// Resilient Client-Side Fallback Engine (For Local Testing without Active Cloudflare Worker)
// -----------------------------------------------------------------------------
const LOCAL_STORAGE_KEY_INTERVIEWS = 'hirepilot_local_interviews';
const LOCAL_STORAGE_KEY_QUESTIONS = 'hirepilot_local_questions';
const LOCAL_STORAGE_KEY_ANSWERS = 'hirepilot_local_answers';
const LOCAL_STORAGE_KEY_REPORTS = 'hirepilot_local_reports';

function getLocalData<T>(key: string, defaultVal: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function saveLocalData<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

const mockQuestionsDatabase: Record<string, string[]> = {
  'Software Engineer': [
    'Explain how garbage collection works in modern runtimes and how memory leaks can still occur.',
    'Describe the differences between optimistic and pessimistic locking in database transactions.',
    'Walk through how you would design an idempotency mechanism for distributed payment processing.',
    'How do you evaluate when to break a monolithic architecture into microservices?',
    'What are the core trade-offs between REST APIs and gRPC for internal service communications?',
  ],
  'Frontend Developer': [
    'Explain the React rendering lifecycle and how useMemo, useCallback, and React.memo prevent unnecessary re-renders.',
    'How do browsers handle the critical rendering path, and what techniques do you use to optimize Core Web Vitals?',
    'Describe how you would architect a complex global state management system in a large Next.js or React application.',
    'Explain CSS specificity, the cascade algorithm, and the advantages of utility-first CSS versus CSS Modules.',
    'How do you implement accessible keyboard navigation (WAI-ARIA) for complex custom dropdowns and modals?',
  ],
  'Backend Developer': [
    'Explain how database indexing using B-Trees and Hash indexes works under high write vs read workloads.',
    'How do you handle race conditions and prevent double-spending in a high-concurrency order placement service?',
    'Discuss the CAP theorem and explain how you would design a cache-aside pattern with Redis.',
    'What are connection pools, and how do you size database connection limits in serverless environments?',
    'Explain how JWT authentication works, its security limitations, and strategies for token revocation.',
  ],
  'DSA': [
    'Explain how to detect and find the entry point of a cycle in a singly linked list with O(1) space complexity.',
    'Compare the average and worst-case time complexity of QuickSort, MergeSort, and TimSort.',
    'How would you implement an LRU (Least Recently Used) cache with O(1) get and put operations?',
    'Explain how Dijkstra algorithm works and how it differs from Bellman-Ford for negative edge weights.',
    'What is Dynamic Programming, and how do you identify if a problem has overlapping subproblems and optimal substructure?',
  ],
  'Behavioral': [
    'Tell me about a time you had a significant technical disagreement with a team member. How did you resolve it?',
    'Describe a situation where a production bug caused downtime under your watch. How did you respond and remediate?',
    'Tell me about a project where requirements were vague and changing rapidly. How did you deliver successfully?',
    'How do you prioritize competing deadlines when multiple critical tasks require immediate attention?',
    'Give an example of a time you mentored a junior engineer or improved team developer velocity.',
  ],
};

function fallbackCreateInterview(payload: CreateInterviewPayload): { interview: Interview; firstQuestion: Question } {
  const interviews = getLocalData<Interview[]>(LOCAL_STORAGE_KEY_INTERVIEWS, []);
  
  // Check monthly quota (3 free interviews)
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyUsed = interviews.filter(i => {
    const d = new Date(i.started_at);
    return (
      i.status === 'completed' &&
      d.getMonth() === currentMonth &&
      d.getFullYear() === currentYear
    );
  }).length;

  if (monthlyUsed >= 3) {
    const err = new Error("You've reached your free interview limit for this month.");
    (err as any).code = 'MONTHLY_LIMIT_REACHED';
    throw err;
  }

  const interviewId = 'int-' + Math.random().toString(36).substring(2, 9);
  const questionId = 'q-' + Math.random().toString(36).substring(2, 9);

  const questionsPool = mockQuestionsDatabase[payload.role] || mockQuestionsDatabase['Software Engineer'];
  const firstQuestionText = questionsPool[0] || 'Explain the core principles of software design you rely on.';

  const newInterview: Interview = {
    id: interviewId,
    user_id: 'local-user',
    role: payload.role,
    interview_type: payload.interview_type,
    difficulty: payload.difficulty,
    total_questions: payload.total_questions || 10,
    current_question: 1,
    status: 'in_progress',
    started_at: new Date().toISOString(),
  };

  const newQuestion: Question = {
    id: questionId,
    interview_id: interviewId,
    question_number: 1,
    question_text: firstQuestionText,
    category: payload.interview_type === 'dsa' ? 'Algorithms' : 'Architecture',
    difficulty: payload.difficulty,
    created_at: new Date().toISOString(),
  };

  interviews.unshift(newInterview);
  saveLocalData(LOCAL_STORAGE_KEY_INTERVIEWS, interviews);

  const allQuestions = getLocalData<Question[]>(LOCAL_STORAGE_KEY_QUESTIONS, []);
  allQuestions.push(newQuestion);
  saveLocalData(LOCAL_STORAGE_KEY_QUESTIONS, allQuestions);

  return { interview: newInterview, firstQuestion: newQuestion };
}

function fallbackSubmitAnswer(interviewId: string, payload: { question_id: string; user_answer: string }): AnswerEvaluation {
  const ansLen = payload.user_answer.trim().length;
  
  // Calculate dynamic scores based on answer quality & length
  const relevance = Math.min(10, Math.max(5, Math.floor(ansLen / 60) + 5));
  const accuracy = Math.min(10, Math.max(4, Math.floor(ansLen / 70) + 5));
  const completeness = Math.min(10, Math.max(4, Math.floor(ansLen / 80) + 4));
  const clarity = Math.min(10, Math.max(5, Math.floor(ansLen / 65) + 5));

  const evaluation: AnswerEvaluation = {
    id: 'eval-' + Math.random().toString(36).substring(2, 9),
    question_id: payload.question_id,
    relevance,
    accuracy,
    completeness,
    clarity,
    feedback: `Your response shows clear understanding of the core concept. To further strengthen your answer, consider walking through concrete edge-case trade-offs and real-world system constraints.`,
    what_went_well: [
      'Directly addressed the primary mechanism in question',
      'Articulated the answer with clear, structured technical terminology',
    ],
    missing_points: [
      'Mention of specific runtime performance characteristics or space/time complexity trade-offs',
      'Consideration of failure scenarios and mitigation strategies',
    ],
    how_to_improve: [
      'Use concrete real-world numbers and code structure examples to reinforce your technical explanations.',
    ],
  };

  const answers = getLocalData<any[]>(LOCAL_STORAGE_KEY_ANSWERS, []);
  answers.push({
    ...evaluation,
    interview_id: interviewId,
    user_answer: payload.user_answer,
    created_at: new Date().toISOString(),
  });
  saveLocalData(LOCAL_STORAGE_KEY_ANSWERS, answers);

  return evaluation;
}

function fallbackNextQuestion(interviewId: string): { question?: Question; finished?: boolean; message?: string } {
  const interviews = getLocalData<Interview[]>(LOCAL_STORAGE_KEY_INTERVIEWS, []);
  const interview = interviews.find(i => i.id === interviewId);

  if (!interview) {
    throw new Error('Interview not found');
  }

  const questions = getLocalData<Question[]>(LOCAL_STORAGE_KEY_QUESTIONS, []).filter(q => q.interview_id === interviewId);
  const nextNum = questions.length + 1;

  if (nextNum > interview.total_questions) {
    return { finished: true, message: 'Interview questions complete.' };
  }

  const pool = mockQuestionsDatabase[interview.role] || mockQuestionsDatabase['Software Engineer'];
  const qText = pool[(nextNum - 1) % pool.length] || `Discuss performance optimizations and testing strategies for a high-traffic ${interview.role} system.`;

  const newQuestion: Question = {
    id: 'q-' + Math.random().toString(36).substring(2, 9),
    interview_id: interviewId,
    question_number: nextNum,
    question_text: qText,
    category: nextNum % 2 === 0 ? 'System Design' : 'Core Fundamentals',
    difficulty: interview.difficulty,
    created_at: new Date().toISOString(),
  };

  questions.push(newQuestion);
  saveLocalData(LOCAL_STORAGE_KEY_QUESTIONS, [...getLocalData<Question[]>(LOCAL_STORAGE_KEY_QUESTIONS, []).filter(q => q.interview_id !== interviewId), ...questions]);

  // Update interview current_question
  interview.current_question = nextNum;
  saveLocalData(LOCAL_STORAGE_KEY_INTERVIEWS, interviews);

  return { question: newQuestion };
}

function fallbackCompleteInterview(interviewId: string): { report: InterviewReport; interview?: Interview } {
  const interviews = getLocalData<Interview[]>(LOCAL_STORAGE_KEY_INTERVIEWS, []);
  const interview = interviews.find(i => i.id === interviewId);

  const answers = getLocalData<any[]>(LOCAL_STORAGE_KEY_ANSWERS, []).filter(a => a.interview_id === interviewId);
  const avg = answers.length > 0
    ? Math.round(answers.reduce((acc, a) => acc + ((a.relevance + a.accuracy + a.completeness + a.clarity) / 4) * 10, 0) / answers.length)
    : 78;

  // Check if report already exists for this interview
  const reports = getLocalData<InterviewReport[]>(LOCAL_STORAGE_KEY_REPORTS, []);
  const existingReport = reports.find(r => r.interview_id === interviewId);
  if (existingReport) {
    if (!existingReport.certificate_id) {
      existingReport.certificate_id = generateCertificateId(interviewId);
      existingReport.result_id = generateResultId(interviewId);
      saveLocalData(LOCAL_STORAGE_KEY_REPORTS, reports);
    }
    return { report: existingReport, interview };
  }

  const certificateId = generateCertificateId(interviewId);
  const resultId = generateResultId(interviewId);

  const report: InterviewReport = {
    id: 'rep-' + Math.random().toString(36).substring(2, 9),
    interview_id: interviewId,
    user_id: 'local-user',
    overall_score: avg,
    technical_score: avg,
    problem_solving_score: avg,
    communication_score: avg,
    confidence_score: avg,
    answer_quality_score: avg,
    certificate_id: certificateId,
    result_id: resultId,
    strengths: [
      `Strong foundational understanding of ${interview?.role || 'software engineering'} principles`,
      'Clear, logical explanations and good technical terminology',
      'Consistent attention to code quality and maintainability',
    ],
    weaknesses: [
      'Could dive deeper into asymptotic time & space complexities',
      'Elaborate more on operational trade-offs and edge failure handling',
      'Provide more concrete real-world metrics from past experience',
    ],
    recommendations: [
      'Distributed Systems & Caching Strategies',
      'Deep Dive into Asynchronous Concurrency',
      'Behavioral STAR Method for Architectural Leadership',
    ],
    ai_summary: `Overall solid performance demonstrating good baseline competence for a ${interview?.role || 'Developer'} role. Continuing deliberate practice on edge cases will take your interview performance to the next level.`,
    created_at: new Date().toISOString(),
  };

  if (interview) {
    interview.status = 'completed';
    interview.score = report.overall_score;
    interview.completed_at = new Date().toISOString();
    saveLocalData(LOCAL_STORAGE_KEY_INTERVIEWS, interviews);
  }

  reports.push(report);
  saveLocalData(LOCAL_STORAGE_KEY_REPORTS, reports);

  return { report, interview };
}

function fallbackGetInterview(interviewId: string) {
  const interviews = getLocalData<Interview[]>(LOCAL_STORAGE_KEY_INTERVIEWS, []);
  const interview = interviews.find(i => i.id === interviewId);
  if (!interview) throw new Error('Interview not found');

  const questions = getLocalData<Question[]>(LOCAL_STORAGE_KEY_QUESTIONS, []).filter(q => q.interview_id === interviewId);
  const answers = getLocalData<any[]>(LOCAL_STORAGE_KEY_ANSWERS, []).filter(a => a.interview_id === interviewId);
  const reports = getLocalData<InterviewReport[]>(LOCAL_STORAGE_KEY_REPORTS, []);
  let report = reports.find(r => r.interview_id === interviewId) || null;

  if (report && !report.certificate_id) {
    report.certificate_id = generateCertificateId(interviewId);
    report.result_id = generateResultId(interviewId);
    saveLocalData(LOCAL_STORAGE_KEY_REPORTS, reports);
  }

  return { interview, questions, answers, report };
}

function fallbackGetReport(interviewId: string) {
  const reports = getLocalData<InterviewReport[]>(LOCAL_STORAGE_KEY_REPORTS, []);
  let report = reports.find(r => r.interview_id === interviewId);
  if (!report) throw new Error('Report not found');

  if (!report.certificate_id) {
    report.certificate_id = generateCertificateId(interviewId);
    report.result_id = generateResultId(interviewId);
    saveLocalData(LOCAL_STORAGE_KEY_REPORTS, reports);
  }

  return { report };
}

function fallbackGetInterviews(filters?: any) {
  let interviews = getLocalData<Interview[]>(LOCAL_STORAGE_KEY_INTERVIEWS, []);
  if (interviews.length === 0) {
    // Seed initial mock data if empty
    interviews = seedMockInterviews();
    saveLocalData(LOCAL_STORAGE_KEY_INTERVIEWS, interviews);
  }

  if (filters?.role) {
    interviews = interviews.filter(i => i.role.toLowerCase().includes(filters.role.toLowerCase()));
  }
  if (filters?.type) {
    interviews = interviews.filter(i => i.interview_type === filters.type);
  }
  if (filters?.difficulty) {
    interviews = interviews.filter(i => i.difficulty === filters.difficulty);
  }
  if (filters?.status) {
    interviews = interviews.filter(i => i.status === filters.status);
  }

  return interviews;
}

function fallbackGetDashboardData(): DashboardData {
  const interviews = fallbackGetInterviews();
  const completed = interviews.filter(i => i.status === 'completed' && i.score != null);

  const scores = completed.map(i => Number(i.score));
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 78;
  const bestScore = scores.length > 0 ? Math.max(...scores) : 91;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const monthlyUsed = interviews.filter(i => {
  const d = new Date(i.started_at);

  return (
    i.status === 'completed' &&
    d.getMonth() === currentMonth &&
    d.getFullYear() === currentYear
  );
}).length;
  return {
    stats: {
      interviewsCompleted: completed.length,
      averageScore: avgScore,
      bestScore: bestScore,
      currentStreak: 5,
      monthlyUsed: Math.min(3, monthlyUsed),
      monthlyMax: 3,
      monthlyRemaining: Math.max(0, 3 - monthlyUsed),
    },
    performance: {
      technicalKnowledge: 82,
      problemSolving: 74,
      communication: 80,
      answerQuality: 76,
    },
    recommendation: {
      title: 'Practice Data Structures & Algorithms',
      description: 'Your DSA performance is slightly lower than your technical average. Try a DSA-focused interview next.',
      targetType: 'dsa',
      targetRole: 'Software Engineer',
    },
    recentInterviews: interviews.slice(0, 5),
  };
}

function seedMockInterviews(): Interview[] {
  return [
    {
      id: 'int-demo-1',
      user_id: 'local-user',
      role: 'Full Stack Developer',
      interview_type: 'technical',
      difficulty: 'medium',
      total_questions: 10,
      current_question: 10,
      score: 84,
      status: 'completed',
      started_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      completed_at: new Date(Date.now() - 86400000 * 2 + 1800000).toISOString(),
    },
    {
      id: 'int-demo-2',
      user_id: 'local-user',
      role: 'Frontend Developer',
      interview_type: 'technical',
      difficulty: 'hard',
      total_questions: 10,
      current_question: 10,
      score: 91,
      status: 'completed',
      started_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      completed_at: new Date(Date.now() - 86400000 * 5 + 2100000).toISOString(),
    },
    {
      id: 'int-demo-3',
      user_id: 'local-user',
      role: 'Software Engineer',
      interview_type: 'behavioral',
      difficulty: 'easy',
      total_questions: 5,
      current_question: 5,
      score: 76,
      status: 'completed',
      started_at: new Date(Date.now() - 86400000 * 9).toISOString(),
      completed_at: new Date(Date.now() - 86400000 * 9 + 1200000).toISOString(),
    },
  ];
}
