import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Triangle, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
  const { signIn, signInWithGoogle, isConfigured, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!loading && user) {
      console.log('[ROUTE DEBUG]', { pathname: location.pathname, user: Boolean(user), loading, action: 'REDIRECT_TO_DASHBOARD' });
      navigate('/dashboard', { replace: true });
    }
  }, [user, loading, navigate, location.pathname]);

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error: signInError } = await signIn(email, password);
    setIsLoading(false);

    if (signInError) {
      setError(signInError.message || 'Invalid email or password.');
    } else {
      console.log('[LOGIN DEBUG] successful login');
      navigate(from, { replace: true });
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    const { error: googleError } = await signInWithGoogle();
    setIsLoading(false);

    if (googleError) {
      setError(googleError.message);
    } else if (!isConfigured) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12 relative overflow-hidden">
      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Triangle className="w-4 h-4 text-black fill-black" />
            </div>
            <span className="font-medium text-2xl text-white tracking-tight">
              HirePilot
            </span>
          </Link>
          <h2 className="text-xl font-medium text-white">Welcome back</h2>
          <p className="text-sm text-brand-secondary">
            Sign in to continue your interview practice sessions
          </p>
        </div>

        <Card className="p-6 sm:p-8 space-y-6 shadow-2xl border-white/10 bg-[#121212]">
          {error && (
            <div className="p-3 rounded-lg bg-[#1a0505] border border-red-500/20 text-sm text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Social Sign-in */}
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full"
            leftIcon={
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            }
          >
            Continue with Google
          </Button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-[#121212] px-3 text-[11px] uppercase tracking-wider text-brand-muted font-medium absolute">
              Or with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-medium text-brand-secondary">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-white hover:text-brand-secondary font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full mt-2"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>
        </Card>

        {/* Footer Link */}
        <p className="text-center text-sm text-brand-muted">
          Don't have an account?{' '}
          <Link to="/signup" className="text-white hover:text-brand-secondary font-medium transition-colors">
            Create a free account
          </Link>
        </p>
      </div>
    </div>
  );
};
