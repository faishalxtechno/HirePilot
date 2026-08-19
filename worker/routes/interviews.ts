import { Hono } from 'hono';
import { Env, CreateInterviewPayload, SubmitAnswerPayload } from '../types';
import { AuthenticatedContext } from '../middleware/auth';
import { getSupabaseAdmin } from '../services/supabase';
import { checkMonthlyInterviewQuota } from '../middleware/rateLimit';
import { generateQuestion } from '../ai/questionGenerator';
import { evaluateAnswer } from '../ai/answerEvaluator';
import { generateFinalReport } from '../ai/reportGenerator';

export const interviewRouter = new Hono<{ Bindings: Env; Variables: { user: AuthenticatedContext } }>();

// 1. POST /api/interviews - Create new interview & first question
interviewRouter.post('/', async (c) => {
  const user = c.get('user');
  const supabase = getSupabaseAdmin(c.env);
  const body: CreateInterviewPayload = await c.req.json();

  const { role, interview_type, difficulty, total_questions = 10 } = body;

  if (!role || !interview_type || !difficulty) {
    return c.json({ error: 'Missing required interview configuration fields (role, interview_type, difficulty)' }, 400);
  }

  // Check quota
  const quota = await checkMonthlyInterviewQuota(supabase, user.userId);
  if (!quota.allowed) {
    return c.json({
      error: "You've reached your free interview limit for this month.",
      code: 'MONTHLY_LIMIT_REACHED',
      used: quota.used,
      max: quota.max,
    }, 429);
  }

  // Create interview row in Supabase
  const { data: interview, error: createError } = await supabase
    .from('interviews')
    .insert({
      user_id: user.userId,
      role,
      interview_type,
      difficulty,
      total_questions: Math.min(15, Math.max(5, total_questions)),
      current_question: 1,
      status: 'in_progress',
    })
    .select()
    .single();

  if (createError || !interview) {
    console.error('Error creating interview in DB:', createError);
    return c.json({ error: 'Failed to initialize interview session' }, 500);
  }

  // Generate 1st question via Gemini
  const questionOutput = await generateQuestion(c.env.GEMINI_API_KEY, {
    role,
    interviewType: interview_type,
    currentDifficulty: difficulty,
    questionNumber: 1,
    totalQuestions: interview.total_questions,
    history: [],
  });

  // Save 1st question to DB
  const { data: question, error: qError } = await supabase
    .from('questions')
    .insert({
      interview_id: interview.id,
      question_number: 1,
      question_text: questionOutput.question_text,
      category: questionOutput.category,
      difficulty: questionOutput.difficulty,
    })
    .select()
    .single();

  if (qError) {
    console.error('Error saving first question:', qError);
  }

  return c.json({
    interview,
    firstQuestion: question || {
      id: 'q-1',
      question_number: 1,
      question_text: questionOutput.question_text,
      category: questionOutput.category,
      difficulty: questionOutput.difficulty,
    },
  }, 201);
});

// 2. GET /api/interviews - List user's interviews
interviewRouter.get('/', async (c) => {
  const user = c.get('user');
  const supabase = getSupabaseAdmin(c.env);

  const role = c.req.query('role');
  const interview_type = c.req.query('type');
  const difficulty = c.req.query('difficulty');
  const status = c.req.query('status');

  let query = supabase
    .from('interviews')
    .select('*, interview_reports(overall_score)')
    .eq('user_id', user.userId)
    .order('started_at', { ascending: false });

  if (role) query = query.ilike('role', `%${role}%`);
  if (interview_type) query = query.eq('interview_type', interview_type);
  if (difficulty) query = query.eq('difficulty', difficulty);
  if (status) query = query.eq('status', status);

  const { data: interviews, error } = await query;

  if (error) {
    console.error('Error fetching interviews:', error);
    return c.json({ error: 'Failed to fetch interviews' }, 500);
  }

  return c.json({ interviews: interviews || [] });
});

// 3. GET /api/interviews/:id - Get interview details, questions & answers
interviewRouter.get('/:id', async (c) => {
  const user = c.get('user');
  const id = c.req.param('id');
  const supabase = getSupabaseAdmin(c.env);

  const { data: interview, error: intError } = await supabase
    .from('interviews')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.userId)
    .single();

  if (intError || !interview) {
    return c.json({ error: 'Interview not found' }, 404);
  }

  const { data: questions } = await supabase
    .from('questions')
    .select('*')
    .eq('interview_id', id)
    .order('question_number', { ascending: true });

  const { data: answers } = await supabase
    .from('answers')
    .select('*')
    .eq('interview_id', id)
    .order('created_at', { ascending: true });

  const { data: report } = await supabase
    .from('interview_reports')
    .select('*')
    .eq('interview_id', id)
    .maybeSingle();

  return c.json({
    interview,
    questions: questions || [],
    answers: answers || [],
    report: report || null,
  });
});

// 4. POST /api/interviews/:id/answer - Submit answer and evaluate with Gemini
interviewRouter.post('/:id/answer', async (c) => {
  const user = c.get('user');
  const interviewId = c.req.param('id');
  const supabase = getSupabaseAdmin(c.env);
  const body: SubmitAnswerPayload = await c.req.json();

  const { question_id, user_answer } = body;

  if (!user_answer || !user_answer.trim()) {
    return c.json({ error: 'Answer cannot be empty' }, 400);
  }

  // Verify interview ownership
  const { data: interview, error: intError } = await supabase
    .from('interviews')
    .select('*')
    .eq('id', interviewId)
    .eq('user_id', user.userId)
    .single();

  if (intError || !interview) {
    return c.json({ error: 'Interview not found' }, 404);
  }

  // Get question
  const { data: question, error: qError } = await supabase
    .from('questions')
    .select('*')
    .eq('id', question_id)
    .eq('interview_id', interviewId)
    .single();

  if (qError || !question) {
    return c.json({ error: 'Question not found' }, 404);
  }

  // Evaluate with Gemini
  const evaluation = await evaluateAnswer(c.env.GEMINI_API_KEY, {
    role: interview.role,
    questionText: question.question_text,
    category: question.category,
    difficulty: question.difficulty,
    userAnswer: user_answer.trim(),
  });

  // Save answer to Supabase
  const { data: answer, error: ansError } = await supabase
    .from('answers')
    .insert({
      question_id: question.id,
      interview_id: interviewId,
      user_id: user.userId,
      user_answer: user_answer.trim(),
      relevance_score: evaluation.relevance,
      accuracy_score: evaluation.accuracy,
      completeness_score: evaluation.completeness,
      clarity_score: evaluation.clarity,
      feedback: evaluation.feedback,
      missing_points: evaluation.missing_points,
    })
    .select()
    .single();

  if (ansError) {
    console.error('Error saving answer:', ansError);
  }

  return c.json({
    evaluation: {
      ...evaluation,
      id: answer?.id,
      question_id: question.id,
    },
  });
});

// 5. POST /api/interviews/:id/next-question - Generate next adaptive question
interviewRouter.post('/:id/next-question', async (c) => {
  const user = c.get('user');
  const interviewId = c.req.param('id');
  const supabase = getSupabaseAdmin(c.env);

  const { data: interview, error: intError } = await supabase
    .from('interviews')
    .select('*')
    .eq('id', interviewId)
    .eq('user_id', user.userId)
    .single();

  if (intError || !interview) {
    return c.json({ error: 'Interview not found' }, 404);
  }

  // Fetch all prior questions & answers
  const { data: questions } = await supabase
    .from('questions')
    .select('*, answers(*)')
    .eq('interview_id', interviewId)
    .order('question_number', { ascending: true });

  const currentCount = questions ? questions.length : 0;
  const nextQuestionNumber = currentCount + 1;

  if (nextQuestionNumber > interview.total_questions) {
    return c.json({
      finished: true,
      message: 'All interview questions have been completed. Ready to generate report.',
    });
  }

  // Construct history for adaptive generation
  const history = (questions || []).map((q: any) => {
    const ans = q.answers?.[0];
    const avg = ans
      ? (Number(ans.relevance_score) + Number(ans.accuracy_score) + Number(ans.completeness_score) + Number(ans.clarity_score)) / 4
      : 7;
    return {
      question: q.question_text,
      answer: ans?.user_answer || '',
      scoreAvg: avg,
      difficulty: q.difficulty || interview.difficulty,
      category: q.category,
    };
  });

  // Call Gemini for adaptive next question
  const questionOutput = await generateQuestion(c.env.GEMINI_API_KEY, {
    role: interview.role,
    interviewType: interview.interview_type,
    currentDifficulty: interview.difficulty,
    questionNumber: nextQuestionNumber,
    totalQuestions: interview.total_questions,
    history,
  });

  // Save new question
  const { data: newQuestion, error: qError } = await supabase
    .from('questions')
    .insert({
      interview_id: interviewId,
      question_number: nextQuestionNumber,
      question_text: questionOutput.question_text,
      category: questionOutput.category,
      difficulty: questionOutput.difficulty,
    })
    .select()
    .single();

  // Update interview's current_question
  await supabase
    .from('interviews')
    .update({ current_question: nextQuestionNumber })
    .eq('id', interviewId);

  return c.json({
    question: newQuestion || {
      id: `q-${nextQuestionNumber}`,
      question_number: nextQuestionNumber,
      question_text: questionOutput.question_text,
      category: questionOutput.category,
      difficulty: questionOutput.difficulty,
    },
  });
});

// 6. POST /api/interviews/:id/complete - Complete interview & generate comprehensive final report
interviewRouter.post('/:id/complete', async (c) => {
  const user = c.get('user');
  const interviewId = c.req.param('id');
  const supabase = getSupabaseAdmin(c.env);

  const { data: interview, error: intError } = await supabase
    .from('interviews')
    .select('*')
    .eq('id', interviewId)
    .eq('user_id', user.userId)
    .single();

  if (intError || !interview) {
    return c.json({ error: 'Interview not found' }, 404);
  }

  // Check if report already exists
  const { data: existingReport } = await supabase
    .from('interview_reports')
    .select('*')
    .eq('interview_id', interviewId)
    .maybeSingle();

  if (existingReport) {
    return c.json({ report: existingReport, interview });
  }

  // Fetch all questions & answers
  const { data: questions } = await supabase
    .from('questions')
    .select('*, answers(*)')
    .eq('interview_id', interviewId)
    .order('question_number', { ascending: true });

  const sessionItems = (questions || []).map((q: any) => {
    const ans = q.answers?.[0] || {};
    return {
      questionNumber: q.question_number,
      questionText: q.question_text,
      category: q.category,
      userAnswer: ans.user_answer || '(No answer recorded)',
      relevance: Number(ans.relevance_score) || 7,
      accuracy: Number(ans.accuracy_score) || 7,
      completeness: Number(ans.completeness_score) || 6,
      clarity: Number(ans.clarity_score) || 7,
      feedback: ans.feedback,
    };
  });

  // Call Gemini to generate full report
  const reportOutput = await generateFinalReport(c.env.GEMINI_API_KEY, {
    role: interview.role,
    interviewType: interview.interview_type,
    difficulty: interview.difficulty,
    items: sessionItems,
  });

  // Generate unique Certificate ID (e.g. HP-CERT-8F29A1)
  const certHex = Math.random().toString(36).substring(2, 8).toUpperCase();
  const certificateId = `HP-CERT-${certHex}`;

  // Save report to Supabase
  const { data: report, error: repError } = await supabase
    .from('interview_reports')
    .insert({
      interview_id: interviewId,
      user_id: user.userId,
      overall_score: reportOutput.overall_score,
      technical_score: reportOutput.technical_score,
      problem_solving_score: reportOutput.problem_solving_score,
      communication_score: reportOutput.communication_score,
      confidence_score: reportOutput.answer_quality_score || reportOutput.communication_score || 80,
      answer_quality_score: reportOutput.answer_quality_score,
      strengths: reportOutput.strengths,
      weaknesses: reportOutput.weaknesses,
      recommendations: reportOutput.recommendations,
      ai_summary: reportOutput.ai_summary,
      certificate_id: certificateId,
    })
    .select()
    .single();

  if (repError) {
    console.error('Error saving report:', repError);
  }

  // Update interview status
  await supabase
    .from('interviews')
    .update({
      status: 'completed',
      score: reportOutput.overall_score,
      completed_at: new Date().toISOString(),
    })
    .eq('id', interviewId);

  return c.json({
    report: report || {
      ...reportOutput,
      interview_id: interviewId,
      user_id: user.userId,
      certificate_id: certificateId,
    },
  });
});

// 7. GET /api/interviews/:id/report - Get report
interviewRouter.get('/:id/report', async (c) => {
  const user = c.get('user');
  const interviewId = c.req.param('id');
  const supabase = getSupabaseAdmin(c.env);

  const { data: report, error } = await supabase
    .from('interview_reports')
    .select('*, interviews(*)')
    .eq('interview_id', interviewId)
    .eq('user_id', user.userId)
    .single();

  if (error || !report) {
    return c.json({ error: 'Report not found' }, 404);
  }

  return c.json({ report });
});
