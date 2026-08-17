import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  User as UserIcon,
  Mail,
  Briefcase,
  GraduationCap,
  Save,
  CheckCircle2,
  Trophy,
  Award,
  BarChart,
  Calendar,
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, profile, updateProfile } = useAuth();

  const [name, setName] = useState(profile?.name || '');
  const [targetRole, setTargetRole] = useState(profile?.target_role || 'Software Engineer');
  const [experienceLevel, setExperienceLevel] = useState(profile?.experience_level || 'Fresher / Student');

  const [stats, setStats] = useState<{ total: number; avgScore: number; bestScore: number; streak: number }>({
    total: 0,
    avgScore: 0,
    bestScore: 0,
    streak: 0,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setTargetRole(profile.target_role || 'Software Engineer');
      setExperienceLevel(profile.experience_level || 'Fresher / Student');
    }

    api.getDashboardData().then((data) => {
      if (data?.stats) {
        setStats({
          total: data.stats.interviewsCompleted,
          avgScore: data.stats.averageScore,
          bestScore: data.stats.bestScore,
          streak: data.stats.currentStreak,
        });
      }
    }).catch(() => {});
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    const { error } = await updateProfile({
      name,
      target_role: targetRole,
      experience_level: experienceLevel,
    });

    setIsSaving(false);
    if (error) {
      setSaveError(error.message);
    } else {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
        {/* Header */}
        <div className="space-y-1 pb-4 border-b border-slate-200/80 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Profile & Career Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Manage your personal information, experience level, and target job roles.
          </p>
        </div>

        {/* Lifetime Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-4 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Completed</span>
            <div className="font-mono text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart className="w-5 h-5 text-brand-600" />
              {stats.total}
            </div>
          </Card>
          <Card className="p-4 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Average Score</span>
            <div className="font-mono text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-emerald-600" />
              {stats.avgScore}%
            </div>
          </Card>
          <Card className="p-4 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Best Score</span>
            <div className="font-mono text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              {stats.bestScore}%
            </div>
          </Card>
          <Card className="p-4 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Active Streak</span>
            <div className="font-mono text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              {stats.streak}d
            </div>
          </Card>
        </div>

        {/* Profile Details Form */}
        <Card className="p-6 sm:p-8 space-y-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Your default target role is used to pre-configure new interview simulations.
            </CardDescription>
          </CardHeader>

          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Profile updated successfully!</span>
            </div>
          )}

          {saveError && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300">
              {saveError}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<UserIcon className="w-4 h-4" />}
                required
              />

              <Input
                label="Email Address"
                value={user?.email || profile?.email || ''}
                disabled
                leftIcon={<Mail className="w-4 h-4" />}
                helperText="Email cannot be changed directly."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Target Role"
                placeholder="e.g. Frontend Developer, Backend Engineer"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                leftIcon={<Briefcase className="w-4 h-4" />}
              />

              <Select
                label="Experience Level"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                options={[
                  { value: 'Student / Fresher', label: 'Student / Fresher (0-1 Years)' },
                  { value: 'Junior Developer', label: 'Junior Developer (1-3 Years)' },
                  { value: 'Mid-Level Engineer', label: 'Mid-Level Engineer (3-5 Years)' },
                  { value: 'Senior Engineer', label: 'Senior Engineer (5+ Years)' },
                  { value: 'Lead / Architect', label: 'Lead / Staff / Architect' },
                ]}
              />
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSaving}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};
