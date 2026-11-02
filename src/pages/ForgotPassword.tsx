import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { HirePilotLogo } from '../components/ui/HirePilotLogo';
import { Mail, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-[#030014] starfield-bg px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <HirePilotLogo variant="auth" asLink to="/" />
          <div>
            <h2 className="text-xl font-medium text-[#f4f0ff]">Reset your password</h2>
            <p className="text-xs text-[#a8a6b7] mt-1">
              Enter your email and we'll send you recovery instructions
            </p>
          </div>
        </div>

        <Card className="p-6 sm:p-8 space-y-5 bg-[#060317] border border-white/10 rounded-[16px] shadow-[inset_0_0_24px_rgba(255,255,255,0.04)]">
          {isSent ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-[#10093a] text-[#9382ff] border border-[#5046e4]/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-[#f4f0ff]">Password reset link sent</h3>
              <p className="text-xs text-[#a8a6b7] leading-relaxed">
                If an account exists for <strong className="text-[#f4f0ff]">{email}</strong>, you will receive an email with instructions to reset your password.
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

        {/* Footer Link */}
        <p className="text-center text-xs text-[#a8a6b7]">
          <Link to="/login" className="text-[#9382ff] hover:text-[#ba9cff] font-medium inline-flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
