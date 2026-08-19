import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { DashboardData } from '../types';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatCard } from '../components/dashboard/StatCard';
import { PerformanceChart } from '../components/dashboard/PerformanceChart';
import { RecommendationCard } from '../components/dashboard/RecommendationCard';
import { RecentInterviewsTable } from '../components/dashboard/RecentInterviewsTable';
import { ResumeSkillsCard } from '../components/dashboard/ResumeSkillsCard';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
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
  Code2,
  Binary,
  MessageSquare,
  History,
  User,
  ArrowRight,
  Briefcase,
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
  const targetRole = profile?.target_role || 'Software Engineer';

  const quickActions = [
    {
      title: 'Technical Mock',
      desc: 'System design & architecture',
      link: `/interview/setup?role=${encodeURIComponent(targetRole)}&type=technical`,
      icon: Code2,
      color: 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60',
    },
    {
      title: 'DSA Practice',
      desc: 'Algorithms & complexities',
      link: `/interview/setup?role=${encodeURIComponent(targetRole)}&type=dsa`,
      icon: Binary,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60',
    },
    {
      title: 'Behavioral STAR',
      desc: 'Leadership & teamwork stories',
      link: `/interview/setup?role=${encodeURIComponent(targetRole)}&type=behavioral`,
      icon: MessageSquare,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      title: 'Interview History',
      desc: 'Transcripts & evaluations',
      link: '/history',
      icon: History,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
        {/* Top Header & Greeting Hero */}
        <Card className="p-5 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  Ready to Practice
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  Targeting: <strong>{targetRole}</strong>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words">
                Welcome back, {displayName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Sharpen your technical explanations, practice real-world interview rounds, and level up with instant AI feedback.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 pt-1 md:pt-0">
              <Link to="/interview/setup" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto shadow-lg shadow-brand-500/30"
                  leftIcon={<Play className="w-4 h-4 fill-white" />}
                >
                  Start New Interview
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Quota Banner */}
        {data?.stats && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200/80 dark:border-brand-900/60 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-brand-500/20">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-brand-900 dark:text-brand-200">
                  {data.stats.monthlyRemaining} free interview{data.stats.monthlyRemaining === 1 ? '' : 's'} remaining this month
                </p>
                <p className="text-[11px] text-brand-700/80 dark:text-brand-400">
                  Standard free plan allows 3 comprehensive AI evaluations each month.
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-white dark:bg-slate-900 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 shrink-0 shadow-xs">
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

        {/* Quick Actions Bar */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {quickActions.map((act) => (
              <Link key={act.title} to={act.link}>
                <Card className="p-4 flex items-center justify-between group hover:border-brand-300 dark:hover:border-brand-700" hoverable>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${act.color}`}>
                      <act.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                        {act.title}
                      </h4>
                      <p className="text-[11px] text-slate-400">{act.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all" />
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Recommendation Card */}
        {data?.recommendation && (
          <RecommendationCard recommendation={data.recommendation} />
        )}

        {/* Resume & Career Skills Section */}
        <div id="resume-skills">
          <ResumeSkillsCard />
        </div>

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
