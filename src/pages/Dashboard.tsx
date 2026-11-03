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
import { AnimatedHeading, FadeInText, ScrollReveal } from '../components/motion';
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
          <div>
            <AnimatedHeading
              as="h1"
              duration={600}
              distance={12}
              className="text-2xl sm:text-3xl font-medium text-[#f4f0ff] tracking-tight"
            >
              Welcome back, {displayName}
            </AnimatedHeading>
            <FadeInText
              delay={150}
              duration={550}
              distance={8}
              className="text-xs sm:text-sm text-[#a8a6b7] mt-1"
            >
              Ready for your next interview? Track your performance and sharpen your skills.
            </FadeInText>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/interview/setup">
              <Button
                variant="primary"
                size="md"
                leftIcon={<Play className="w-4 h-4 fill-white" />}
              >
                Start New Interview
              </Button>
            </Link>
          </div>
        </div>

        {/* Quota Banner */}
        {data?.stats && (
          <ScrollReveal
            delay={100}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-[16px] bg-[#060317] border border-white/10 shadow-[inset_0_0_24px_rgba(255,255,255,0.04)] gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[8px] bg-[#10093a] text-[#9382ff] border border-white/10 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-[#f4f0ff]">
                  {data.stats.monthlyRemaining} interview{data.stats.monthlyRemaining === 1 ? '' : 's'} remaining this month
                </p>
                <p className="text-[11px] text-[#918ea0]">
                  Standard free plan allows 3 comprehensive AI evaluations each month.
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-[5px] bg-[#10093a] text-[#9382ff] border border-white/10 shrink-0">
              {data.stats.monthlyUsed} / {data.stats.monthlyMax} Used
            </span>
          </ScrollReveal>
        )}

        {/* 4 Statistics Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-28" />
            ))}
          </div>
        ) : (
          <ScrollReveal
            staggerChildren={70}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
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
          </ScrollReveal>
        )}

        {/* AI Recommendation Card */}
        {data?.recommendation && (
          <ScrollReveal delay={120}>
            <RecommendationCard recommendation={data.recommendation} />
          </ScrollReveal>
        )}

        {/* Skill Breakdown & Recent Interviews Grid */}
        <ScrollReveal delay={150} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
        </ScrollReveal>
      </div>
    </DashboardLayout>
  );
};
