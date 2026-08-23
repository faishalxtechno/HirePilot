import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Triangle, Mail, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';

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
          <h2 className="text-xl font-medium text-white">Reset your password</h2>
          <p className="text-sm text-brand-secondary">
            Enter your email and we'll send you recovery instructions
          </p>
        </div>

        <Card className="p-6 sm:p-8 space-y-6 shadow-2xl border-white/10 bg-[#121212]">
          {isSent ? (
            <div className="text-center space-y-5 py-4">
              <div className="w-14 h-14 rounded-full bg-white/5 text-white border border-white/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-medium text-white">Password reset link sent</h3>
              <p className="text-sm text-brand-secondary leading-relaxed">
                If an account exists for <strong className="text-white">{email}</strong>, you will receive an email with instructions to reset your password.
              </p>
              <Link to="/login" className="block pt-3">
                <Button variant="primary" size="md" className="w-full">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="p-3 rounded-lg bg-[#1a0505] border border-red-500/20 text-sm text-red-400 flex items-center gap-2">
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
                  className="w-full mt-2"
                >
                  Send Reset Link
                </Button>
              </form>
            </>
          )}
        </Card>

        {/* Back Link */}
        <p className="text-center text-sm text-brand-muted">
          <Link to="/login" className="inline-flex items-center gap-2 text-brand-muted hover:text-white font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};
