import { Hono } from 'hono';
import { Env } from '../types';
import { AuthenticatedContext } from '../middleware/auth';
import { getSupabaseAdmin } from '../services/supabase';
import { checkMonthlyInterviewQuota } from '../middleware/rateLimit';

export const dashboardRouter = new Hono<{ Bindings: Env; Variables: { user: AuthenticatedContext } }>();

dashboardRouter.get('/stats', async (c) => {
  const user = c.get('user');
  const supabase = getSupabaseAdmin(c.env);

  // 1. Quota
  const quota = await checkMonthlyInterviewQuota(supabase, user.userId);

  // 2. Fetch all completed interviews
  const { data: interviews, error: intError } = await supabase
    .from('interviews')
    .select('id, role, interview_type, difficulty, score, status, started_at, completed_at')
    .eq('user_id', user.userId)
    .order('started_at', { ascending: false });

  if (intError) {
    console.error('Error fetching dashboard interviews:', intError);
  }

  const allInterviews = interviews || [];
  const completedInterviews = allInterviews.filter(i => i.status === 'completed' && i.score != null);

  const totalCompleted = completedInterviews.length;
  const scores = completedInterviews.map(i => Number(i.score));
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const bestScore = scores.length > 0 ? Math.max(...scores) : 0;

  // 3. Calculate streak (consecutive days with completed or started interviews)
  const streak = calculateStreak(allInterviews.map(i => i.started_at));

  // 4. Fetch all reports to aggregate categorical performance
  const { data: reports } = await supabase
    .from('interview_reports')
    .select('technical_score, problem_solving_score, communication_score, answer_quality_score')
    .eq('user_id', user.userId);

  let technical = 0;
  let problemSolving = 0;
  let communication = 0;
  let answerQuality = 0;

  if (reports && reports.length > 0) {
    technical = Math.round(reports.reduce((acc, r) => acc + (Number(r.technical_score) || 0), 0) / reports.length);
    problemSolving = Math.round(reports.reduce((acc, r) => acc + (Number(r.problem_solving_score) || 0), 0) / reports.length);
    communication = Math.round(reports.reduce((acc, r) => acc + (Number(r.communication_score) || 0), 0) / reports.length);
    answerQuality = Math.round(reports.reduce((acc, r) => acc + (Number(r.answer_quality_score) || 0), 0) / reports.length);
  } else if (completedInterviews.length > 0) {
    technical = avgScore;
    problemSolving = Math.max(0, avgScore - 4);
    communication = avgScore;
    answerQuality = avgScore;
  }

  // 5. Generate dynamic recommendation
  let recommendation = {
    title: 'Start your interview journey',
    description: 'Begin your first AI mock interview to analyze your core technical and behavioral strengths.',
    targetType: 'technical',
    targetRole: 'Software Engineer',
  };

  if (completedInterviews.length > 0) {
    const minCat = Math.min(
      technical || 100,
      problemSolving || 100,
      communication || 100,
      answerQuality || 100
    );

    if (minCat === problemSolving) {
      recommendation = {
        title: 'Sharpen Problem Solving & DSA',
        description: 'Your problem solving score is slightly lower than your technical average. Practice a DSA or System Design session next.',
        targetType: 'dsa',
        targetRole: completedInterviews[0]?.role || 'Software Engineer',
      };
    } else if (minCat === communication) {
      recommendation = {
        title: 'Elevate Communication & STAR Format',
        description: 'Your communication score has room for improvement. Try a Behavioral or HR interview to practice structured articulation.',
        targetType: 'behavioral',
        targetRole: completedInterviews[0]?.role || 'Software Engineer',
      };
    } else {
      recommendation = {
        title: `Deepen ${completedInterviews[0]?.role || 'Technical'} Mastery`,
        description: 'You are progressing well! Level up your difficulty to Medium/Hard on technical concepts.',
        targetType: 'technical',
        targetRole: completedInterviews[0]?.role || 'Software Engineer',
      };
    }
  }

  return c.json({
    stats: {
      interviewsCompleted: totalCompleted,
      averageScore: avgScore,
      bestScore: bestScore,
      currentStreak: streak,
      monthlyUsed: quota.used,
      monthlyMax: quota.max,
      monthlyRemaining: Math.max(0, quota.max - quota.used),
    },
    performance: {
      technicalKnowledge: technical || 75,
      problemSolving: problemSolving || 70,
      communication: communication || 80,
      answerQuality: answerQuality || 74,
    },
    recommendation,
    recentInterviews: allInterviews.slice(0, 5),
  });
});

function calculateStreak(dateStrings: string[]): number {
  if (!dateStrings.length) return 0;

  const daysSet = new Set(
    dateStrings.map(d => {
      const date = new Date(d);
      return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
    })
  );

  let current = new Date();
  let streak = 0;

  // Check today
  const todayStr = `${current.getUTCFullYear()}-${String(current.getUTCMonth() + 1).padStart(2, '0')}-${String(current.getUTCDate()).padStart(2, '0')}`;
  
  // If not practiced today, check if practiced yesterday to keep streak alive
  if (!daysSet.has(todayStr)) {
    current.setUTCDate(current.getUTCDate() - 1);
  }

  while (true) {
    const str = `${current.getUTCFullYear()}-${String(current.getUTCMonth() + 1).padStart(2, '0')}-${String(current.getUTCDate()).padStart(2, '0')}`;
    if (daysSet.has(str)) {
      streak++;
      current.setUTCDate(current.getUTCDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
