import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Env } from './types';
import { authMiddleware, AuthenticatedContext } from './middleware/auth';
import { interviewRouter } from './routes/interviews';
import { dashboardRouter } from './routes/dashboard';
import { getGeminiModel, DEFAULT_GEMINI_MODEL } from './ai/client';

const app = new Hono<{ Bindings: Env; Variables: { user: AuthenticatedContext } }>();

// Enable CORS for all frontend origins
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 86400,
  credentials: true,
}));

// Health check & safe AI diagnostic (no secrets exposed)
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    service: 'HirePilot API',
    ai: {
      provider: 'Google Gemini',
      model: getGeminiModel(c.env),
      hasApiKey: Boolean(c.env.GEMINI_API_KEY),
    },
    timestamp: new Date().toISOString(),
  });
});

// Safe diagnostic endpoint
app.get('/diagnostic', (c) => {
  return c.json({
    status: 'ok',
    service: 'HirePilot API',
    ai: {
      provider: 'Google Gemini',
      model: getGeminiModel(c.env),
      defaultModel: DEFAULT_GEMINI_MODEL,
      isCustomModel: Boolean(c.env.GEMINI_MODEL),
      hasApiKey: Boolean(c.env.GEMINI_API_KEY),
    },
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
