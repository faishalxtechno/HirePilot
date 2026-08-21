import { supabase } from '../lib/supabase';
import {
  Interview,
  Question,
  Answer,
  AnswerEvaluation,
  InterviewReport,
  DashboardData,
  InterviewType,
  DifficultyLevel,
} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCAL_STORAGE_KEY_INTERVIEWS = 'hirepilot_mobile_interviews';

const MOCK_QUESTIONS_MAP: Record<string, string[]> = {
  'Software Engineer': [
    'Explain the differences between optimistic and pessimistic locking in distributed databases, and provide a real-world use case for each.',
    'How does the V8 JavaScript engine handle asynchronous microtasks versus macrotasks during event loop execution?',
    'Describe how you would architect a horizontally scalable rate-limiter that handles 50,000 requests per second with Redis.',
    'What strategies do you use to diagnose and fix memory leaks in single-page web applications?',
    'Explain CAP theorem trade-offs when designing a globally distributed shopping cart system.',
  ],
  'Frontend Developer': [
    'How does React 18 Fiber reconciliation and concurrent rendering work under the hood?',
    'Explain how you optimize Core Web Vitals (LCP, FID/INP, CLS) on a high-traffic e-commerce portal.',
    'Describe the differences between CSS Grid, Flexbox, and subgrid, and when each is best utilized.',
    'How do you manage complex asynchronous client state with server caching in modern web apps?',
    'What security considerations do you enforce against XSS and CSRF attacks on the client side?',
  ],
  'Backend Developer': [
    'Explain database indexing internals (B-Tree vs Hash index) and how indexing impacts write vs read throughput.',
    'How would you design a fault-tolerant message queue system with at-least-once delivery semantics?',
    'Describe the nuances of connection pooling in PostgreSQL and how connection exhaustion can be avoided.',
    'What are the advantages and drawbacks of gRPC compared to standard RESTful JSON APIs?',
    'How do you ensure data consistency across multiple microservices without distributed transactions?',
  ],
};

export const interviewService = {
  /**
   * Retrieves all user interviews
   */
  async getInterviews(): Promise<Interview[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('interviews')
          .select('*, questions(*), answers(*), interview_reports(*)')
          .eq('user_id', user.id)
          .order('started_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data as Interview[];
        }
      }
    } catch (e) {
      console.warn('Supabase getInterviews fallback to local storage:', e);
    }

    // Local cached fallback
    try {
      const raw = await AsyncStorage.getItem(LOCAL_STORAGE_KEY_INTERVIEWS);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {}

    return [
      {
        id: 'mock-int-01',
        user_id: 'guest',
        role: 'Software Engineer',
        interview_type: 'technical',
        difficulty: 'medium',
        status: 'completed',
        total_questions: 5,
        score: 88,
        started_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        completed_at: new Date(Date.now() - 86400000 * 2 + 1800000).toISOString(),
        interview_reports: [
          {
            id: 'rep-01',
            interview_id: 'mock-int-01',
            overall_score: 88,
            role_readiness_score: 85,
            strengths: [
              'Strong technical articulation of distributed systems trade-offs.',
              'Clear explanation of microservices caching and cache invalidation.',
              'Great code complexity analysis with Big-O notation.',
            ],
            weaknesses: [
              'Could discuss more edge-case failure modes in database replication.',
              'Quantify operational metrics like p99 latency thresholds.',
            ],
            detailed_feedback: 'Demonstrated high competence across architectural design and algorithmic analysis. Answers were articulate, structured, and technically accurate.',
            radar_metrics: {
              technical: 90,
              communication: 88,
              problem_solving: 85,
              depth: 86,
            },
          },
        ],
      },
    ];
  },

  /**
   * Creates a new interview session
   */
  async createInterview(params: {
    role: string;
    interview_type: InterviewType;
    difficulty: DifficultyLevel;
    total_questions: number;
  }): Promise<{ interview: Interview; firstQuestion: Question }> {
    const interviewId = `int-${Date.now()}`;
    const questionTextList =
      MOCK_QUESTIONS_MAP[params.role] || MOCK_QUESTIONS_MAP['Software Engineer'];

    const questions: Question[] = questionTextList
      .slice(0, params.total_questions)
      .map((text, idx) => ({
        id: `q-${interviewId}-${idx + 1}`,
        interview_id: interviewId,
        question_order: idx + 1,
        question_text: text,
        category: params.interview_type,
        created_at: new Date().toISOString(),
      }));

    const newInterview: Interview = {
      id: interviewId,
      user_id: 'current-user',
      role: params.role,
      interview_type: params.interview_type,
      difficulty: params.difficulty,
      status: 'in_progress',
      total_questions: params.total_questions,
      started_at: new Date().toISOString(),
      questions,
      answers: [],
    };

    // Save to local storage
    const all = await this.getInterviews();
    all.unshift(newInterview);
    await AsyncStorage.setItem(LOCAL_STORAGE_KEY_INTERVIEWS, JSON.stringify(all));

    // Try saving to Supabase
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('interviews').insert({
          id: interviewId,
          user_id: user.id,
          role: params.role,
          interview_type: params.interview_type,
          difficulty: params.difficulty,
          status: 'in_progress',
          total_questions: params.total_questions,
          started_at: new Date().toISOString(),
        });
      }
    } catch (e) {
      console.warn('Supabase interview insert skipped:', e);
    }

    return {
      interview: newInterview,
      firstQuestion: questions[0],
    };
  },

  /**
   * Submits an answer and returns AI evaluation
   */
  async submitAnswer(params: {
    interview_id: string;
    question_id: string;
    answer_text: string;
  }): Promise<{ answer: Answer; evaluation: AnswerEvaluation }> {
    // Simulate AI evaluation latency
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const wordCount = params.answer_text.trim().split(/\s+/).length;
    const baseScore = Math.min(10, Math.max(6, Math.floor(wordCount / 10) + 4));

    const evaluation: AnswerEvaluation = {
      relevance: Math.min(10, baseScore + 1),
      accuracy: baseScore,
      completeness: Math.min(10, Math.max(6, baseScore - 1)),
      clarity: 9,
      feedback: 'Clear, structured explanation with good technical depth. Highlighted key trade-offs and concepts effectively.',
      what_went_well: [
        'Used accurate technical terminology and concise syntax explanation.',
        'Structured the answer logically from fundamentals to implementation.',
      ],
      missing_points: [
        'Could include more specific real-world metrics or scale considerations.',
      ],
      how_to_improve: [
        'Mention concrete failure recovery patterns and monitoring tools.',
      ],
    };

    const answer: Answer = {
      id: `ans-${Date.now()}`,
      interview_id: params.interview_id,
      question_id: params.question_id,
      answer_text: params.answer_text,
      evaluation,
      created_at: new Date().toISOString(),
    };

    return { answer, evaluation };
  },

  /**
   * Completes an interview and generates final report
   */
  async completeInterview(interviewId: string): Promise<InterviewReport> {
    const report: InterviewReport = {
      id: `rep-${Date.now()}`,
      interview_id: interviewId,
      overall_score: 87,
      role_readiness_score: 84,
      strengths: [
        'High technical clarity across fundamental and advanced questions.',
        'Strong problem breakdown and communication structure.',
        'Great knowledge of distributed systems patterns and performance optimization.',
      ],
      weaknesses: [
        'Deepen familiarity with asynchronous edge case failure recoveries.',
        'Provide more quantified metric outcomes from past project experience.',
      ],
      detailed_feedback:
        'Excellent overall performance. You communicated architectural concepts with authority and demonstrated strong problem-solving instinct.',
      radar_metrics: {
        technical: 88,
        communication: 90,
        problem_solving: 85,
        depth: 84,
      },
      created_at: new Date().toISOString(),
    };

    // Update in local storage
    const all = await this.getInterviews();
    const target = all.find((i) => i.id === interviewId);
    if (target) {
      target.status = 'completed';
      target.score = report.overall_score;
      target.completed_at = new Date().toISOString();
      target.interview_reports = [report];
      await AsyncStorage.setItem(LOCAL_STORAGE_KEY_INTERVIEWS, JSON.stringify(all));
    }

    return report;
  },

  /**
   * Retrieves dashboard aggregated metrics
   */
  async getDashboardData(): Promise<DashboardData> {
    const interviews = await this.getInterviews();
    const completed = interviews.filter((i) => i.status === 'completed');
    const avgScore = completed.length
      ? Math.round(completed.reduce((acc, curr) => acc + (curr.score || 80), 0) / completed.length)
      : 82;
    const bestScore = completed.length
      ? Math.max(...completed.map((c) => c.score || 80))
      : 88;

    return {
      stats: {
        interviewsCompleted: completed.length || 3,
        averageScore: avgScore,
        bestScore: Math.max(bestScore, 92),
        currentStreak: 4,
        monthlyUsed: 1,
        monthlyMax: 3,
        monthlyRemaining: 2,
      },
      recommendation: {
        title: 'System Design Mock Round',
        description: 'Practice architecting distributed microservices and database sharding.',
        action: 'Practice Now',
        type: 'technical',
        role: 'Software Engineer',
      },
      performance: {
        technical: 88,
        dsa: 82,
        behavioral: 92,
        systemDesign: 85,
        communication: 90,
      },
      recentInterviews: interviews.slice(0, 5),
    };
  },
};
