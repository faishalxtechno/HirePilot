import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { DashboardData } from '../types';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatCard } from '../components/dashboard/StatCard';
import { PerformanceChart } from '../components/dashboard/PerformanceChart';
import { RecommendationCard } from '../components/dashboard/RecommendationCard';
import { RecentInterviewsTable } from '../components/dashboard/RecentInterviewsTable';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { Link } from 'react-router-dom';
import {
  Play,
  Trophy,
  Award,
  Flame,
  CheckCircle2,
  Calendar,
  Sparkles,
  Zap,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { profile, user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const dashboard = await api.getDashboardData();
      setData(dashboard);
    } catch (err) {
      console.error('Error loading dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const displayName = profile?.name || user?.email?.split('@')[0] || 'Candidate';

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Top Header & Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome back, {displayName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Ready for your next interview? Track your performance and sharpen your skills.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/interview/setup">
              <Button
                variant="primary"
                size="md"
                className="shadow-md shadow-brand-500/20"
                leftIcon={<Play className="w-4 h-4 fill-white" />}
              >
                Start New Interview
              </Button>
            </Link>
          </div>
        </div>

        {/* Quota Banner */}
        {data?.stats && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200/80 dark:border-brand-900/60 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-brand-900 dark:text-brand-200">
                  {data.stats.monthlyRemaining} interview{data.stats.monthlyRemaining === 1 ? '' : 's'} remaining this month
                </p>
                <p className="text-[11px] text-brand-700/80 dark:text-brand-400">
                  Standard free plan allows 3 comprehensive AI evaluations each month.
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 shrink-0">
              {data.stats.monthlyUsed} / {data.stats.monthlyMax} Used
            </span>
          </div>
        )}

        {/* 4 Statistics Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-28" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Interviews Completed"
              value={data?.stats.interviewsCompleted ?? 0}
              subtitle="Lifetime mock sessions"
              icon={<CheckCircle2 className="w-5 h-5 text-brand-600" />}
              accentColor="brand"
            />
            <StatCard
              title="Average Score"
              value={`${data?.stats.averageScore ?? 0}%`}
              subtitle="Across all interviews"
              icon={<Trophy className="w-5 h-5 text-emerald-600" />}
              accentColor="emerald"
            />
            <StatCard
              title="Best Score"
              value={`${data?.stats.bestScore ?? 0}%`}
              subtitle="Highest achieved score"
              icon={<Award className="w-5 h-5 text-purple-600" />}
              accentColor="purple"
            />
            <StatCard
              title="Current Streak"
              value={`${data?.stats.currentStreak ?? 0} days`}
              subtitle="Consistent practice"
              icon={<Flame className="w-5 h-5 text-amber-600 fill-amber-500/20" />}
              accentColor="amber"
            />
          </div>
        )}

        {/* AI Recommendation Card */}
        {data?.recommendation && (
          <RecommendationCard recommendation={data.recommendation} />
        )}

        {/* Skill Breakdown & Recent Interviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Radar/Progress Breakdown (1 Col) */}
          <div className="lg:col-span-1">
            {isLoading || !data ? (
              <Skeleton className="h-96" />
            ) : (
              <PerformanceChart performance={data.performance} />
            )}
          </div>

          {/* Recent Interviews Table (2 Cols) */}
          <div className="lg:col-span-2">
            {isLoading || !data ? (
              <Skeleton className="h-96" />
            ) : (
              <RecentInterviewsTable interviews={data.recentInterviews} />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
