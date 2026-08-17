import { Context, Next } from 'hono';
import { getSupabaseAdmin } from '../services/supabase';
import { Env } from '../types';
import { AuthenticatedContext } from './auth';

const MAX_FREE_MONTHLY_INTERVIEWS = 3;

export async function checkMonthlyInterviewQuota(supabase: any, userId: string): Promise<{ allowed: boolean; used: number; max: number }> {
  const now = new Date();
  const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();

  const { count, error } = await supabase
    .from('interviews')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('started_at', startOfMonth);

  if (error) {
    console.error('Error checking interview count:', error);
    return { allowed: true, used: 0, max: MAX_FREE_MONTHLY_INTERVIEWS };
  }

  const used = count || 0;
  return {
    allowed: used < MAX_FREE_MONTHLY_INTERVIEWS,
    used,
    max: MAX_FREE_MONTHLY_INTERVIEWS,
  };
}

export async function quotaMiddleware(c: Context<{ Bindings: Env; Variables: { user: AuthenticatedContext } }>, next: Next) {
  const user = c.get('user');
  const supabase = getSupabaseAdmin(c.env);

  const quota = await checkMonthlyInterviewQuota(supabase, user.userId);
  if (!quota.allowed) {
    return c.json({
      error: "You've reached your free interview limit for this month.",
      code: 'MONTHLY_LIMIT_REACHED',
      used: quota.used,
      max: quota.max,
    }, 429);
  }

  await next();
}
