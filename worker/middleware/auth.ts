import { Context, Next } from 'hono';
import { getSupabaseAdmin } from '../services/supabase';
import { Env } from '../types';

export interface AuthenticatedContext {
  userId: string;
  userEmail: string;
}

export async function authMiddleware(c: Context<{ Bindings: Env; Variables: { user: AuthenticatedContext } }>, next: Next) {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized: Missing or invalid Authorization header' }, 401);
  }

  const token = authHeader.replace(/^Bearer\s+/i, '');
  const supabase = getSupabaseAdmin(c.env);

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return c.json({ error: 'Unauthorized: Invalid token or session expired' }, 401);
  }

  c.set('user', {
    userId: user.id,
    userEmail: user.email || '',
  });

  await next();
}
