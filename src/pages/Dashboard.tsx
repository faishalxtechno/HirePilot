import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { DashboardData } from '../types';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatCard } from '../components/dashboard/StatCard';
import { PerformanceChart } from '../components/dashboard/PerformanceChart';
import { RecommendationCard } from '../components/dashboard/RecommendationCard';
import { RecentInterviewsTable } from '../components/dashboard/RecentInterviewsTable';
import { ApplicationTrackerOverview } from '../components/dashboard/ApplicationTrackerOverview';
import { RecentActivityFeed } from '../components/dashboard/RecentActivityFeed';
import { GrowthJourneyCard } from '../components/dashboard/GrowthJourneyCard';
import { ActivityStreakHeatmap } from '../components/dashboard/ActivityStreakHeatmap';
import { WeeklyPrepPlan } from '../components/dashboard/WeeklyPrepPlan';
import { CareerGoalsTimeline } from '../components/dashboard/CareerGoalsTimeline';
import { RecommendedJobsList } from '../components/dashboard/RecommendedJobsList';
import { AchievementsBadges } from '../components/dashboard/AchievementsBadges';
import { Skeleton } from '../components/ui/Skeleton';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../components/motion';
import {
  Play,
  Trophy,
  Flame,
  CheckCircle2,
  Calendar,
  Sparkles,
  Zap,
  Briefcase,
  History,
  User,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { profile, user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [trackedApplicationsCount, setTrackedApplicationsCount] = useState<number>(0);

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
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in pb-12">
        {/* ========================================================= */}
        {/* 1. PERSONALIZED WELCOME HEADER & QUICK ACTIONS            */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E5E7EB]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#2563EB]">
                <Calendar className="w-3.5 h-3.5" />
                <span>{currentDate}</span>
              </span>
              <span className="text-xs text-[#64748B]">
                {profile?.target_role ? `Target: ${profile.target_role}` : 'Engineering Track'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#111827] tracking-tight">
              Welcome back, {displayName} 👋
            </h1>
            <p className="text-sm text-[#64748B] font-normal leading-relaxed">
              Here&apos;s your career preparation overview.
            </p>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link to="/interview/setup">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[6px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-medium transition-all shadow-xs hover:shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Start Mock Interview</span>
              </button>
            </Link>

            <Link to="/history">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-[6px] bg-white border border-[#E5E7EB] hover:bg-slate-50 text-[#111827] text-xs sm:text-sm font-medium transition-colors shadow-2xs"
              >
                <History className="w-3.5 h-3.5 text-[#64748B]" />
                <span>View History</span>
              </button>
            </Link>

            <Link to="/profile">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-[6px] bg-white border border-[#E5E7EB] hover:bg-slate-50 text-[#111827] text-xs sm:text-sm font-medium transition-colors shadow-2xs"
              >
                <User className="w-3.5 h-3.5 text-[#64748B]" />
                <span>Profile &amp; Targets</span>
              </button>
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. MONTHLY QUOTA BANNER (Inspired by CareerHero / Alvance) */}
        {/* ========================================================= */}
        {data?.stats && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-[12px] bg-white border border-[#E5E7EB] shadow-2xs gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-[8px] bg-blue-50 text-[#2563EB] border border-blue-200 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111827]">
                  {data.stats.monthlyRemaining} Free Mock Interview{data.stats.monthlyRemaining === 1 ? '' : 's'} Remaining This Month
                </p>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Standard community tier includes 3 full AI evaluations each calendar month with instant scoring.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-slate-100 text-[#111827] border border-[#E5E7EB]">
                {data.stats.monthlyUsed} of {data.stats.monthlyMax} Used
              </span>
              <Link
                to="/interview/setup"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:underline"
              >
                <span>Practice Now</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. CAREER OVERVIEW STATISTICS (4 METRIC CARDS WITH BARS)  */}
        {/* ========================================================= */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-36 bg-slate-200/80 rounded-[14px]" />
            ))}
          </div>
        ) : (
          <ScrollReveal
            staggerChildren={70}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Metric 1: Total Interviews */}
            <StatCard
              title="Total Interviews"
              value={data?.stats.interviewsCompleted ?? 0}
              subtitle="Lifetime mock sessions completed"
              icon={<CheckCircle2 className="w-4 h-4" />}
              accentColor="brand"
              trend={{ value: '+13%', isPositive: true }}
              actionLink={{ label: 'Practice >', to: '/interview/setup' }}
              sparklineData={[30, 45, 60, 50, 75, 65, 80, 95]}
            />

            {/* Metric 2: Average Score */}
            <StatCard
              title="Average Interview Score"
              value={data?.stats.interviewsCompleted ? `${data.stats.averageScore}%` : '0%'}
              subtitle={data?.stats.interviewsCompleted ? 'Across evaluated answers' : 'Take first session to baseline'}
              icon={<Trophy className="w-4 h-4" />}
              accentColor="emerald"
              trend={{ value: '+10%', isPositive: true }}
              actionLink={{ label: 'Review >', to: '/history' }}
              sparklineData={[40, 55, 60, 70, 65, 80, 85, 90]}
            />

            {/* Metric 3: Active Streak */}
            <StatCard
              title="Current Practice Streak"
              value={`${data?.stats.currentStreak ?? 0} days`}
              subtitle="Consistent preparation cadence"
              icon={<Flame className="w-4 h-4" />}
              accentColor="amber"
              trend={{ value: 'On Track', isPositive: true }}
              actionLink={{ label: 'Calibrate >', to: '/interview/setup' }}
              sparklineData={[50, 60, 55, 75, 80, 70, 85, 100]}
            />

            {/* Metric 4: Applications Tracked */}
            <StatCard
              title="Applications Tracked"
              value={trackedApplicationsCount}
              subtitle="Active hiring loops in pipeline"
              icon={<Briefcase className="w-4 h-4" />}
              accentColor="purple"
              trend={{ value: '+24%', isPositive: true }}
              actionLink={{ label: 'Pipeline >', to: '/profile' }}
              sparklineData={[25, 40, 50, 65, 60, 75, 80, 90]}
            />
          </ScrollReveal>
        )}

        {/* ========================================================= */}
        {/* 4. GROWTH & CADENCE POWER TRIO (From Image 4 MockAI)       */}
        {/* ========================================================= */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
            {/* Col 1: Your Growth Journey (4 Cols) */}
            <div className="lg:col-span-4 h-full">
              <GrowthJourneyCard
                interviewsCompleted={data?.stats.interviewsCompleted ?? 0}
                averageScore={data?.stats.averageScore ?? 0}
                bestScore={data?.stats.bestScore ?? 0}
              />
            </div>

            {/* Col 2: Activity Streak Heatmap (4 Cols) */}
            <div className="lg:col-span-4 h-full">
              <ActivityStreakHeatmap
                currentStreak={data?.stats.currentStreak ?? 0}
                interviewsCompleted={data?.stats.interviewsCompleted ?? 0}
              />
            </div>

            {/* Col 3: Weekly Prep Plan (4 Cols) */}
            <div className="lg:col-span-4 h-full">
              <WeeklyPrepPlan />
            </div>
          </div>
        </ScrollReveal>

        {/* ========================================================= */}
        {/* 5. PERSONALIZED CAREER RECOMMENDATIONS                    */}
        {/* ========================================================= */}
        <ScrollReveal delay={120}>
          <RecommendationCard
            recommendation={data?.recommendation}
            performance={data?.performance}
            interviewsCount={data?.stats.interviewsCompleted ?? 0}
          />
        </ScrollReveal>

        {/* ========================================================= */}
        {/* 6. INTERVIEW PERFORMANCE & RECENT SESSIONS                */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Skill Breakdown (5 Cols) */}
          <div className="lg:col-span-5 h-full">
            {isLoading || !data ? (
              <Skeleton className="h-96 bg-slate-200/80 rounded-[12px]" />
            ) : (
              <PerformanceChart performance={data.performance} />
            )}
          </div>

          {/* Recent Mock Interviews Table (7 Cols) */}
          <div className="lg:col-span-7 h-full">
            {isLoading || !data ? (
              <Skeleton className="h-96 bg-slate-200/80 rounded-[12px]" />
            ) : (
              <RecentInterviewsTable interviews={data.recentInterviews} />
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 7. CAREER GOALS & TOP CURATED ROLES (Image 1 CareerHero)  */}
        {/* ========================================================= */}
        <ScrollReveal delay={140}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Career Goals Stepped Trajectory (5 Cols) */}
            <div className="lg:col-span-5 h-full">
              <CareerGoalsTimeline
                targetRole={profile?.target_role}
                experienceLevel={profile?.experience_level}
              />
            </div>

            {/* Top Curated Opportunities (7 Cols) */}
            <div className="lg:col-span-7 h-full">
              <RecommendedJobsList
                onApplicationAdded={(cnt) => setTrackedApplicationsCount(cnt)}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* ========================================================= */}
        {/* 8. APPLICATION TRACKER & TRENDS PIPELINE                  */}
        {/* ========================================================= */}
        <ScrollReveal delay={160}>
          <ApplicationTrackerOverview onCountChange={setTrackedApplicationsCount} />
        </ScrollReveal>

        {/* ========================================================= */}
        {/* 9. ACHIEVEMENTS & BADGES (From Image 4 MockAI)            */}
        {/* ========================================================= */}
        <ScrollReveal delay={180}>
          <AchievementsBadges
            interviewsCompleted={data?.stats.interviewsCompleted ?? 0}
            averageScore={data?.stats.averageScore ?? 0}
            bestScore={data?.stats.bestScore ?? 0}
            currentStreak={data?.stats.currentStreak ?? 0}
            hasTargetRole={Boolean(profile?.target_role)}
            applicationsCount={trackedApplicationsCount}
          />
        </ScrollReveal>

        {/* ========================================================= */}
        {/* 10. RECENT ACTIVITY TIMELINE                              */}
        {/* ========================================================= */}
        {data?.recentInterviews && (
          <ScrollReveal delay={200}>
            <RecentActivityFeed interviews={data.recentInterviews} />
          </ScrollReveal>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
