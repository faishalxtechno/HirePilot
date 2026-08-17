import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Sparkles, Mail, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error: resetError } = await resetPassword(email);
    setIsLoading(false);

    if (resetError) {
      setError(resetError.message);
    } else {
      setIsSent(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-sm shadow-brand-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-bold text-2xl text-slate-900 dark:text-white tracking-tight">
              Hire<span className="text-brand-600">Pilot</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Reset your password</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enter your email and we'll send you recovery instructions
          </p>
        </div>

        <Card className="p-6 sm:p-8 space-y-5 shadow-xl border-slate-200 dark:border-slate-800">
          {isSent ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Password reset link sent</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                If an account exists for <strong>{email}</strong>, you will receive an email with instructions to reset your password.
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
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

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

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isLoading}
                  className="w-full"
                >
                  Send Reset Link
                </Button>
              </form>
            </>
          )}
        </Card>

        {/* Back Link */}
        <p className="text-center text-xs text-slate-500">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-400 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};
