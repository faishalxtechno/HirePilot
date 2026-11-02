import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { HirePilotLogo } from '../components/ui/HirePilotLogo';
import { useRobotsMeta } from '../hooks/useRobotsMeta';
import { Mail, Lock, User, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Signup: React.FC = () => {
  useRobotsMeta('noindex, follow');
  const { signUp, signInWithGoogle, isConfigured } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check URL query parameters or hash fragments for OAuth errors
    const searchParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(
      window.location.hash.startsWith('#') ? window.location.hash.substring(1) : window.location.hash
    );
    const errorDesc =
      searchParams.get('error_description') ||
      hashParams.get('error_description') ||
      searchParams.get('error') ||
      hashParams.get('error');

    if (errorDesc) {
      setError(decodeURIComponent(errorDesc.replace(/\+/g, ' ')));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error: signUpError } = await signUp(email, password, name);
    setIsLoading(false);

    if (signUpError) {
      setError(signUpError.message);
    } else {
      if (isConfigured) {
        setIsSuccess(true);
      } else {
        navigate('/dashboard');
      }
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError(null);
    const { error: googleError } = await signInWithGoogle();
    setIsLoading(false);

    if (googleError) {
      setError(googleError.message);
    } else if (!isConfigured) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030014] starfield-bg px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <HirePilotLogo variant="auth" asLink to="/" />
          <div>
            <h2 className="text-xl font-medium text-[#f4f0ff]">Create your account</h2>
            <p className="text-xs text-[#a8a6b7] mt-1">
              Start your free AI mock interviews today
            </p>
          </div>
        </div>

        <Card className="p-6 sm:p-8 space-y-5 bg-[#060317] border border-white/10 rounded-[16px] shadow-[inset_0_0_24px_rgba(255,255,255,0.04)]">
          {isSuccess ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-[#10093a] text-[#9382ff] border border-[#5046e4]/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-[#f4f0ff]">Verification email sent!</h3>
              <p className="text-xs text-[#a8a6b7] leading-relaxed">
                We've sent a verification link to <strong className="text-[#f4f0ff]">{email}</strong>. Please check your inbox to confirm your account and begin practicing.
              </p>
              <Link to="/login" className="block pt-2">
                <Button variant="primary" size="md" className="w-full">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="p-3 rounded-[5px] bg-rose-950/40 border border-rose-900/50 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Social Google Signup */}
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={handleGoogleSignup}
                disabled={isLoading}
                className="w-full border-white/10 hover:border-white/20"
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
                Sign up with Google
              </Button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-white/10 w-full" />
                <span className="bg-[#060317] px-3 text-[11px] uppercase tracking-wider text-[#918ea0] font-medium absolute">
                  Or with email
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Alex Mercer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  leftIcon={<User className="w-4 h-4" />}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail className="w-4 h-4" />}
                  required
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={<Lock className="w-4 h-4" />}
                  helperText="Must be at least 6 characters"
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isLoading}
                  className="w-full"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Create Free Account
                </Button>
              </form>
            </>
          )}
        </Card>

        {/* Footer Link */}
        <p className="text-center text-xs text-[#a8a6b7]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#9382ff] hover:text-[#ba9cff] font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
