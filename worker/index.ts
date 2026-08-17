import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Env } from './types';
import { authMiddleware, AuthenticatedContext } from './middleware/auth';
import { interviewRouter } from './routes/interviews';
import { dashboardRouter } from './routes/dashboard';

const app = new Hono<{ Bindings: Env; Variables: { user: AuthenticatedContext } }>();

// Enable CORS for all frontend origins
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 86400,
}));

// Health check
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    service: 'HirePilot API',
    timestamp: new Date().toISOString(),
  });
});

// Protect all /api/* routes with Supabase auth middleware
app.use('/api/*', authMiddleware);

// Mount routers
app.route('/api/interviews', interviewRouter);
app.route('/api/dashboard', dashboardRouter);

// Global 404 handler
app.notFound((c) => {
  return c.json({ error: 'Endpoint not found' }, 404);
});

// Global error handler
app.onError((err, c) => {
  console.error('Unhandled Server Error:', err);
  return c.json({
    error: err.message || 'Internal Server Error',
  }, 500);
});

export default app;
