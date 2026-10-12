import { supabase, isSupabaseConfigured } from './supabase';
import { generateCertificateId, generateResultId } from './storage';
import {
  calculateQuestionScore,
  calculateInterviewScores,
  evaluateAnswerDeterministically,
} from './scoringRubric';
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

const WORKER_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WORKER_API_URL) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.DEV
    ? '/api'
    : 'https://hirepilot-api.hirepilotapp.workers.dev/api');

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
    const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
    const trimmed = (payload.user_answer || '').trim();

    if (isDev) {
      console.log(`[HirePilot-Scoring] SubmitAnswer invoked | Interview ID: ${interviewId} | Question ID: ${payload.question_id}`);
      console.log(`[HirePilot-Scoring] Target API endpoint: ${WORKER_URL}/interviews/${interviewId}/answer`);
    }

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
      const evaluation: AnswerEvaluation = data.evaluation;

      // Detect stale unpatched remote worker fallback (relevance 7, accuracy 7, completeness 6, clarity 7)
      const isStaleWorkerFallback =
        evaluation &&
        evaluation.relevance === 7 &&
        evaluation.accuracy === 7 &&
        evaluation.completeness === 6 &&
        evaluation.clarity === 7 &&
        (trimmed.length === 0 || evaluation.feedback?.includes('good baseline understanding'));

      if (isStaleWorkerFallback) {
        if (isDev) {
          console.warn('[HirePilot-Scoring] Detected stale unpatched remote worker fallback (7/7/6/7 -> 68%). Intercepting and re-evaluating via local deterministic rubric.');
        }
        return fallbackSubmitAnswer(interviewId, payload);
      }

      const questionScore = evaluation.score ?? calculateQuestionScore(evaluation);

      if (isDev) {
        console.log(`[HirePilot-Scoring] Evaluator selected: AI (Worker API: ${WORKER_URL})`);
        console.log(`[HirePilot-Scoring] Parsed dimensions: relevance=${evaluation.relevance}, accuracy=${evaluation.accuracy}, completeness=${evaluation.completeness}, clarity=${evaluation.clarity}`);
        console.log(`[HirePilot-Scoring] Computed question score: ${questionScore}%`);
      }

      return {
        ...evaluation,
        score: questionScore,
      };
    } catch (err: any) {
      if (err.message && !isNetworkFetchError(err) && (err as any).code === 'EVALUATION_FAILED') {
        // Backend AI evaluation error — rethrow so UI can display specific message & retry
        throw err;
      }
      if (isDev) {
        console.warn(`[HirePilot-Scoring] Backend worker unavailable (${err.message}). Using local rubric evaluator.`);
      }
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
      if (err.message && !isNetworkFetchError(err)) {
        throw err;
      }
      console.warn('Backend worker offline, using client-side fallback:', err.message);
      return fallbackNextQuestion(interviewId);
    }
  },

  // 4. Complete Interview & Generate Report
  async completeInterview(interviewId: string): Promise<{ report: InterviewReport; interview?: Interview }> {
    const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
    if (isDev) {
      console.log(`[HirePilot-Scoring] CompleteInterview invoked | Interview ID: ${interviewId}`);
    }

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

      const data = await res.json();
      if (isDev) {
        console.log(`[HirePilot-Scoring] Overall score after report generation (Worker): ${data.report?.overall_score}%`);
      }
      return data;
    } catch (err: any) {
      if (err.message && !isNetworkFetchError(err)) {
        throw err;
      }
      if (isDev) {
        console.warn(`[HirePilot-Scoring] Backend worker offline for complete (${err.message}). Using local report synthesis.`);
      }
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

function isNetworkFetchError(err: any): boolean {
  if (!err) return false;
  const msg = (err.message || '').toLowerCase();
  return (
    msg.includes('failed to fetch') ||
    msg.includes('networkerror') ||
    msg.includes('load failed') ||
    msg.includes('fetch failed') ||
    msg.includes('network request failed') ||
    msg.includes('econnrefused') ||
    msg.includes('504') ||
    msg.includes('unauthorized') ||
    msg.includes('invalid token')
  );
}

function fallbackSubmitAnswer(interviewId: string, payload: { question_id: string; user_answer: string }): AnswerEvaluation {
  const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
  const interviews = getLocalData<Interview[]>(LOCAL_STORAGE_KEY_INTERVIEWS, []);
  const interview = interviews.find((i) => i.id === interviewId);
  const questions = getLocalData<Question[]>(LOCAL_STORAGE_KEY_QUESTIONS, []).filter(
    (q) => q.interview_id === interviewId
  );
  const currentQ = questions.find((q) => q.id === payload.question_id) || questions[questions.length - 1];

  const evalResult = evaluateAnswerDeterministically({
    questionText: currentQ?.question_text || 'Explain the core system architecture and technical trade-offs.',
    userAnswer: payload.user_answer,
    category: currentQ?.category,
    role: interview?.role,
  });

  const questionScore = evalResult.score ?? calculateQuestionScore(evalResult);

  if (isDev) {
    console.log(`[HirePilot-Scoring] Evaluator selected: Deterministic Rubric (Local Engine)`);
    console.log(`[HirePilot-Scoring] Parsed dimensions: relevance=${evalResult.relevance}, accuracy=${evalResult.accuracy}, completeness=${evalResult.completeness}, clarity=${evalResult.clarity}`);
    console.log(`[HirePilot-Scoring] Computed question score: ${questionScore}%`);
  }

  const evaluation: AnswerEvaluation = {
    ...evalResult,
    id: 'eval-' + Math.random().toString(36).substring(2, 9),
    question_id: payload.question_id,
    question_text: currentQ?.question_text,
    user_answer: payload.user_answer,
    score: questionScore,
  };

  const answers = getLocalData<any[]>(LOCAL_STORAGE_KEY_ANSWERS, []);
  answers.push({
    ...evaluation,
    interview_id: interviewId,
    user_answer: payload.user_answer,
    created_at: new Date().toISOString(),
  });
  saveLocalData(LOCAL_STORAGE_KEY_ANSWERS, answers);

  if (isDev) {
    console.log(`[HirePilot-Scoring] Score saved to persistence (localStorage answers): ${questionScore}%`);
  }

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
  const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
  const interviews = getLocalData<Interview[]>(LOCAL_STORAGE_KEY_INTERVIEWS, []);
  const interview = interviews.find((i) => i.id === interviewId);

  const answers = getLocalData<any[]>(LOCAL_STORAGE_KEY_ANSWERS, []).filter((a) => a.interview_id === interviewId);
  const calculatedScores = calculateInterviewScores(answers);

  if (isDev) {
    console.log(`[HirePilot-Scoring] Overall score before report generation (from ${answers.length} answers): ${calculatedScores.overall_score}%`);
  }

  // Check if report already exists for this interview
  const reports = getLocalData<InterviewReport[]>(LOCAL_STORAGE_KEY_REPORTS, []);
  let existingReport = reports.find((r) => r.interview_id === interviewId);
  if (existingReport) {
    // Keep report score in sync with actual evaluated answers to eliminate stale 68% reports
    if (answers.length > 0) {
      existingReport.overall_score = calculatedScores.overall_score;
      existingReport.technical_score = calculatedScores.technical_score;
      existingReport.problem_solving_score = calculatedScores.problem_solving_score;
      existingReport.communication_score = calculatedScores.communication_score;
      existingReport.confidence_score = calculatedScores.communication_score;
      existingReport.answer_quality_score = calculatedScores.answer_quality_score;
    }
    if (!existingReport.certificate_id) {
      existingReport.certificate_id = generateCertificateId(interviewId);
      existingReport.result_id = generateResultId(interviewId);
    }
    saveLocalData(LOCAL_STORAGE_KEY_REPORTS, reports);
    if (interview) {
      interview.score = existingReport.overall_score;
      saveLocalData(LOCAL_STORAGE_KEY_INTERVIEWS, interviews);
    }
    if (isDev) {
      console.log(`[HirePilot-Scoring] Overall score after report generation (Synchronized existing): ${existingReport.overall_score}%`);
    }
    return { report: existingReport, interview };
  }

  const certificateId = generateCertificateId(interviewId);
  const resultId = generateResultId(interviewId);

  const report: InterviewReport = {
    id: 'rep-' + Math.random().toString(36).substring(2, 9),
    interview_id: interviewId,
    user_id: 'local-user',
    overall_score: calculatedScores.overall_score,
    technical_score: calculatedScores.technical_score,
    problem_solving_score: calculatedScores.problem_solving_score,
    communication_score: calculatedScores.communication_score,
    confidence_score: calculatedScores.communication_score,
    answer_quality_score: calculatedScores.answer_quality_score,
    certificate_id: certificateId,
    result_id: resultId,
    strengths: [
      `Foundational understanding in technical concepts evaluated`,
      'Demonstrated structured problem-solving approach',
      'Clear communication of technical ideas',
    ],
    weaknesses: [
      'Further practice with asymptotic time & space complexities',
      'Elaborate more on operational trade-offs and edge failure handling',
      'Provide more concrete real-world metrics from past experience',
    ],
    recommendations: [
      'Distributed Systems & Caching Strategies',
      'Deep Dive into Concurrency & Race Conditions',
      'Behavioral STAR Method for Architectural Leadership',
    ],
    ai_summary: `Candidate completed ${answers.length} questions for the ${interview?.role || 'Developer'} role with an evaluated score of ${calculatedScores.overall_score}/100.`,
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

  if (isDev) {
    console.log(`[HirePilot-Scoring] Overall score after report generation (New local report): ${report.overall_score}%`);
    console.log(`[HirePilot-Scoring] Score saved to persistence (localStorage): ${report.overall_score}%`);
  }

  return { report, interview };
}

function fallbackGetInterview(interviewId: string) {
  const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
  const interviews = getLocalData<Interview[]>(LOCAL_STORAGE_KEY_INTERVIEWS, []);
  const interview = interviews.find(i => i.id === interviewId);
  if (!interview) throw new Error('Interview not found');

  const questions = getLocalData<Question[]>(LOCAL_STORAGE_KEY_QUESTIONS, []).filter(q => q.interview_id === interviewId);
  const answers = getLocalData<any[]>(LOCAL_STORAGE_KEY_ANSWERS, []).filter(a => a.interview_id === interviewId);
  const reports = getLocalData<InterviewReport[]>(LOCAL_STORAGE_KEY_REPORTS, []);
  let report = reports.find(r => r.interview_id === interviewId) || null;

  if (report) {
    if (answers.length > 0) {
      const freshScores = calculateInterviewScores(answers);
      report.overall_score = freshScores.overall_score;
      report.technical_score = freshScores.technical_score;
      report.problem_solving_score = freshScores.problem_solving_score;
      report.communication_score = freshScores.communication_score;
      report.confidence_score = freshScores.communication_score;
      report.answer_quality_score = freshScores.answer_quality_score;
      if (interview) {
        interview.score = freshScores.overall_score;
        saveLocalData(LOCAL_STORAGE_KEY_INTERVIEWS, interviews);
      }
    }
    if (!report.certificate_id) {
      report.certificate_id = generateCertificateId(interviewId);
      report.result_id = generateResultId(interviewId);
    }
    saveLocalData(LOCAL_STORAGE_KEY_REPORTS, reports);

    if (isDev) {
      console.log(`[HirePilot-Scoring] Score retrieved from database/storage (Interview ${interviewId}): ${report.overall_score}%`);
    }
  }

  return { interview, questions, answers, report };
}

function fallbackGetReport(interviewId: string) {
  const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
  const reports = getLocalData<InterviewReport[]>(LOCAL_STORAGE_KEY_REPORTS, []);
  let report = reports.find(r => r.interview_id === interviewId);
  if (!report) throw new Error('Report not found');

  const answers = getLocalData<any[]>(LOCAL_STORAGE_KEY_ANSWERS, []).filter(a => a.interview_id === interviewId);
  if (answers.length > 0) {
    const freshScores = calculateInterviewScores(answers);
    report.overall_score = freshScores.overall_score;
    report.technical_score = freshScores.technical_score;
    report.problem_solving_score = freshScores.problem_solving_score;
    report.communication_score = freshScores.communication_score;
    report.confidence_score = freshScores.communication_score;
    report.answer_quality_score = freshScores.answer_quality_score;
  }

  if (!report.certificate_id) {
    report.certificate_id = generateCertificateId(interviewId);
    report.result_id = generateResultId(interviewId);
  }
  saveLocalData(LOCAL_STORAGE_KEY_REPORTS, reports);

  if (isDev) {
    console.log(`[HirePilot-Scoring] Score retrieved from database/storage (Report ${interviewId}): ${report.overall_score}%`);
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
