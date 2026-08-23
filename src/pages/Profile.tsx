import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { uploadProfilePhoto, deleteProfilePhoto } from '../lib/storage';
import {
  User as UserIcon,
  Mail,
  Briefcase,
  Save,
  CheckCircle2,
  Trophy,
  Award,
  BarChart,
  Calendar,
  Camera,
  Trash2,
  Loader2,
  AlertCircle,
  UploadCloud,
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, profile, updateProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Profile Photo Upload State
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isRemovingPhoto, setIsRemovingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [photoSuccess, setPhotoSuccess] = useState<string | null>(null);

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

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset file input value so user can re-select the same file if desired
    e.target.value = '';

    setPhotoError(null);
    setPhotoSuccess(null);
    setIsUploadingPhoto(true);

    const userId = user?.id || profile?.id || 'guest-user-123';
    const uploadResult = await uploadProfilePhoto(file, userId);

    if (uploadResult.error || !uploadResult.url) {
      setPhotoError(uploadResult.error || 'Failed to upload image.');
      setIsUploadingPhoto(false);
      return;
    }

    // Save avatar_url to user profile in Supabase & context
    const { error: profileError } = await updateProfile({
      avatar_url: uploadResult.url,
    });

    setIsUploadingPhoto(false);

    if (profileError) {
      setPhotoError(profileError.message);
    } else {
      setPhotoSuccess('Profile photo updated successfully!');
      setTimeout(() => setPhotoSuccess(null), 4000);
    }
  };

  const handlePhotoRemove = async () => {
    if (!profile?.avatar_url) return;

    setPhotoError(null);
    setPhotoSuccess(null);
    setIsRemovingPhoto(true);

    const userId = user?.id || profile?.id || 'guest-user-123';
    await deleteProfilePhoto(userId, profile.avatar_url);

    const { error } = await updateProfile({
      avatar_url: '',
    });

    setIsRemovingPhoto(false);

    if (error) {
      setPhotoError(error.message);
    } else {
      setPhotoSuccess('Profile photo removed.');
      setTimeout(() => setPhotoSuccess(null), 4000);
    }
  };

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

  const initials = (profile?.name || name || 'Candidate')
    .split(' ')
    .map((n: string) => n.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
        {/* Header */}
        <div className="space-y-1 pb-4 border-b border-white/10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Profile & Career Preferences
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted">
            Manage your profile picture, personal information, experience level, and target job roles.
          </p>
        </div>

        {/* Lifetime Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Card className="p-3.5 sm:p-4 space-y-1 bg-[#121212] border-white/10">
            <span className="text-[10px] sm:text-[11px] font-medium text-brand-muted uppercase tracking-wider block truncate">Total Completed</span>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <BarChart className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />
              <span>{stats.total}</span>
            </div>
          </Card>
          <Card className="p-3.5 sm:p-4 space-y-1 bg-[#121212] border-white/10">
            <span className="text-[10px] sm:text-[11px] font-medium text-brand-muted uppercase tracking-wider block truncate">Average Score</span>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-brand-secondary shrink-0" />
              <span>{stats.avgScore}%</span>
            </div>
          </Card>
          <Card className="p-3.5 sm:p-4 space-y-1 bg-[#121212] border-white/10">
            <span className="text-[10px] sm:text-[11px] font-medium text-brand-muted uppercase tracking-wider block truncate">Best Score</span>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />
              <span>{stats.bestScore}%</span>
            </div>
          </Card>
          <Card className="p-3.5 sm:p-4 space-y-1 bg-[#121212] border-white/10">
            <span className="text-[10px] sm:text-[11px] font-medium text-brand-muted uppercase tracking-wider block truncate">Active Streak</span>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-brand-secondary shrink-0" />
              <span>{stats.streak}d</span>
            </div>
          </Card>
        </div>

        {/* Profile Photo Card */}
        <Card className="p-5 sm:p-8 space-y-6 bg-[#121212] border-white/10">
          <CardHeader className="p-0 pb-2 border-b-0">
            <CardTitle>Profile Photo</CardTitle>
            <CardDescription>
              Your profile photo will be displayed on your dashboard, interview performance reports, and certificates of completion.
            </CardDescription>
          </CardHeader>

          {photoSuccess && (
            <div className="p-3 rounded-xl bg-[#0a1f10] border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{photoSuccess}</span>
            </div>
          )}

          {photoError && (
            <div className="p-3 rounded-xl bg-[#1f0a0a] border border-rose-500/20 text-xs text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{photoError}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-2">
            {/* Avatar Preview */}
            <div className="relative group shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-white/10 shadow-md bg-black flex items-center justify-center text-white shrink-0 relative">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.name || 'User profile'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-extrabold tracking-wider text-brand-muted">{initials}</span>
                )}

                {(isUploadingPhoto || isRemovingPhoto) && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center text-white">
                    <Loader2 className="w-7 h-7 animate-spin" />
                  </div>
                )}
              </div>

              {/* Quick Camera Action Badge */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingPhoto || isRemovingPhoto}
                className="absolute bottom-1 right-1 p-2 rounded-full bg-white hover:bg-brand-muted text-black shadow-md transition-transform hover:scale-105 cursor-pointer disabled:opacity-50"
                title="Change Photo"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Photo Action Controls */}
            <div className="flex-1 space-y-3 text-center sm:text-left w-full">
              <div>
                <h4 className="text-sm font-medium text-white">
                  {profile?.name || name || 'Candidate'}
                </h4>
                <p className="text-xs text-brand-muted mt-0.5">
                  Allowed formats: JPEG, PNG, WebP, GIF. Maximum file size: 5 MB.
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handlePhotoUpload}
                className="hidden"
              />

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  isLoading={isUploadingPhoto}
                  leftIcon={<UploadCloud className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  {profile?.avatar_url ? 'Change Photo' : 'Upload Photo'}
                </Button>

                {profile?.avatar_url && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handlePhotoRemove}
                    isLoading={isRemovingPhoto}
                    leftIcon={<Trash2 className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    Remove Photo
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Profile Details Form */}
        <Card className="p-5 sm:p-8 space-y-6 bg-[#121212] border-white/10">
          <CardHeader className="p-0 pb-4 border-b-0">
            <CardTitle>Personal Information & Career Preferences</CardTitle>
            <CardDescription>
              Your name and target role are used dynamically across interviews, reports, and completion certificates.
            </CardDescription>
          </CardHeader>

          {saveSuccess && (
            <div className="p-3 rounded-xl bg-[#0a1f10] border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>Profile updated successfully!</span>
            </div>
          )}

          {saveError && (
            <div className="p-3 rounded-xl bg-[#1f0a0a] border border-rose-500/20 text-xs text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{saveError}</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name (Dynamic Candidate Name)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<UserIcon className="w-4 h-4" />}
                placeholder="e.g. Faishal Naushad, Rahul Kumar"
                required
              />

              <Input
                label="Email Address"
                value={user?.email || profile?.email || ''}
                disabled
                leftIcon={<Mail className="w-4 h-4" />}
                helperText="Email is linked to your authenticated account."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Target Role"
                placeholder="e.g. Software Developer, Frontend Engineer"
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

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSaving}
                leftIcon={<Save className="w-4 h-4" />}
                className="w-full sm:w-auto"
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
