import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Lock, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter a new password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify and retry.');
      return;
    }

    if (!isSupabaseConfigured) {
      setError('Supabase is not configured. Unable to update password.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
      } else {
        setIsSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12 relative overflow-hidden">
      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center justify-center group focus:outline-none" aria-label="HirePilot Home">
            <img
              src="/assets/hirepilot-logo.png"
              alt="HirePilot"
              className="h-14 w-auto max-h-16 object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <h2 className="text-xl font-medium text-white">Set new password</h2>
          <p className="text-sm text-brand-secondary">
            Choose a secure password for your HirePilot account
          </p>
        </div>

        <Card className="p-6 sm:p-8 space-y-6 shadow-2xl border-white/10 bg-[#121212]">
          {isSuccess ? (
            <div className="text-center space-y-5 py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-medium text-white">Password updated successfully!</h3>
              <p className="text-sm text-brand-secondary leading-relaxed">
                Your new password has been saved. You can now access your HirePilot account.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/login')}
                className="w-full mt-2"
              >
                Proceed to Sign In
              </Button>
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
                  label="New Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={<Lock className="w-4 h-4" />}
                  required
                />

                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  leftIcon={<Lock className="w-4 h-4" />}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isLoading}
                  className="w-full mt-2"
                >
                  Update Password
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
