import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { jobsService, Job } from '../lib/jobsService';
import { resumeService, ResumeAnalysis } from '../lib/resumeService';
import { DashboardData } from '../types';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatCard } from '../components/dashboard/StatCard';
import { PerformanceChart } from '../components/dashboard/PerformanceChart';
import { RecommendationCard } from '../components/dashboard/RecommendationCard';
import { RecentInterviewsTable } from '../components/dashboard/RecentInterviewsTable';
import { ResumeSkillsCard } from '../components/dashboard/ResumeSkillsCard';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { Link, useNavigate } from 'react-router-dom';
import {
  Play,
  Trophy,
  Award,
  Flame,
  CheckCircle2,
  Zap,
  Code2,
  Binary,
  MessageSquare,
  ArrowRight,
  Briefcase,
  FileText,
  Triangle,
  ChevronRight,
  Clock,
  Building2,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { profile, user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [resumeData, setResumeData] = useState<ResumeAnalysis | null>(null);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const dashboard = await api.getDashboardData();
      setData(dashboard);

      const targetRole = profile?.target_role || 'Software Engineer';
      const jobs = jobsService.getJobs({ role: targetRole }).slice(0, 3);
      setRecommendedJobs(jobs.length > 0 ? jobs : jobsService.getJobs().slice(0, 3));

      const resume = resumeService.getAnalysis();
      setResumeData(resume);

      setSavedJobIds(jobsService.getSavedJobIds());
    } catch (err) {
      console.error('Error loading dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSaveJob = (e: React.MouseEvent, jobId: string) => {
    e.preventDefault();
    e.stopPropagation();
    jobsService.toggleSaveJob(jobId);
    setSavedJobIds(jobsService.getSavedJobIds());
  };

  const displayName = profile?.name || user?.email?.split('@')[0] || 'Candidate';
  const targetRole = profile?.target_role || 'Software Engineer';
  const careerScore = data?.stats.averageScore || 82;

  const quickActions = [
    {
      title: 'Technical Mock',
      desc: 'System design & architecture',
      link: `/interview/setup?role=${encodeURIComponent(targetRole)}&type=technical`,
      icon: Code2,
      color: 'text-white bg-white/5 border-white/10',
    },
    {
      title: 'DSA Practice',
      desc: 'Algorithms & complexities',
      link: `/interview/setup?role=${encodeURIComponent(targetRole)}&type=dsa`,
      icon: Binary,
      color: 'text-white bg-white/5 border-white/10',
    },
    {
      title: 'Behavioral STAR',
      desc: 'Leadership & teamwork stories',
      link: `/interview/setup?role=${encodeURIComponent(targetRole)}&type=behavioral`,
      icon: MessageSquare,
      color: 'text-white bg-white/5 border-white/10',
    },
    {
      title: 'AI Resume Check',
      desc: 'ATS score & improvements',
      link: '/resume',
      icon: FileText,
      color: 'text-white bg-white/5 border-white/10',
    },
  ];

  return (
    <DashboardLayout>
      {/* ========================================================================= */}
      {/* MOBILE STITCH HOME VIEW (<= 768px / md:hidden)                            */}
      {/* ========================================================================= */}
      <div className="block md:hidden space-y-5 animate-fade-in pb-4">
        {/* Stitch Greeting & Career Readiness Hero */}
        <div className="relative p-5 rounded-3xl bg-[#121212] border border-white/10 shadow-2xl overflow-hidden">
          <div className="relative z-10 space-y-4">
            {/* Top row: Target Role pill + status */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white text-[11px] font-semibold">
                <Triangle className="w-3 h-3 text-brand-secondary fill-brand-secondary" />
                {targetRole}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-medium text-brand-secondary bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
                AI Ready
              </span>
            </div>

            {/* Candidate Name */}
            <div>
              <p className="text-xs text-brand-muted">Welcome back,</p>
              <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
                {displayName}
              </h1>
            </div>

            {/* Circular Readiness Gauge & Quick Stats */}
            <div className="p-3.5 rounded-2xl bg-black border border-white/10 flex items-center justify-between gap-4">
              {/* Left: Radial Score Gauge */}
              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-full bg-black border-2 border-white/20 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-base font-bold font-mono text-white leading-none block">
                      {careerScore}
                    </span>
                    <span className="text-[9px] text-brand-secondary font-semibold uppercase tracking-wider">ATS %</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Career Readiness</p>
                  <p className="text-[10px] text-brand-muted">
                    {careerScore >= 80 ? 'Competitive profile score' : 'Practice to increase score'}
                  </p>
                </div>
              </div>

              {/* Right: Quick Stat Chips */}
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <div className="flex items-center gap-1 text-[11px] font-mono font-medium text-white bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
                  <Flame className="w-3 h-3 text-white" />
                  {data?.stats.currentStreak ?? 1}d Streak
                </div>
                <div className="text-[10px] font-mono text-brand-muted">
                  {data?.stats.interviewsCompleted ?? 0} interviews
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <Link to="/interview/setup" className="block w-full">
              <Button
                variant="primary"
                size="md"
                className="w-full py-3"
                leftIcon={<Play className="w-4 h-4 fill-white" />}
              >
                Start AI Mock Interview
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Action Horizontal Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-medium uppercase tracking-wider text-brand-muted">
              Quick Practice
            </h2>
            <Link to="/interview/setup" className="text-[11px] font-medium text-white hover:text-brand-secondary flex items-center gap-0.5 transition-colors">
              All Modes <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {quickActions.map((act) => (
              <Link key={act.title} to={act.link}>
                <div className="p-3 rounded-2xl bg-[#121212] border border-white/10 hover:border-white/20 active:scale-98 transition-all flex flex-col justify-between h-24">
                  <div className="flex items-center justify-between">
                    <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${act.color}`}>
                      <act.icon className="w-4 h-4" />
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-muted" />
                  </div>
                  <div>
                    <h3 className="text-xs font-medium text-white truncate">{act.title}</h3>
                    <p className="text-[10px] text-brand-muted truncate">{act.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Resume Status Card */}
        {resumeData && (
          <div className="p-4 rounded-2xl bg-[#121212] border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/5 text-white flex items-center justify-center border border-white/10">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-white">AI Resume Analysis</h3>
                  <p className="text-[10px] text-brand-muted">{resumeData.fileName}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-sm font-bold text-white">
                  {resumeData.atsScore}/100
                </span>
                <span className="block text-[9px] text-brand-muted">ATS Score</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px]">
              <span className="text-brand-muted">
                {resumeData.missingKeywords.length} suggested keywords
              </span>
              <Link to="/resume" className="font-medium text-white hover:text-brand-secondary flex items-center gap-1 transition-colors">
                Optimize Resume <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* Recommended Jobs for Candidate */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-medium uppercase tracking-wider text-brand-muted flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-white" />
              Matches for You
            </h2>
            <Link to="/jobs" className="text-[11px] font-medium text-white hover:text-brand-secondary flex items-center gap-0.5 transition-colors">
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {recommendedJobs.map((job) => {
              const isSaved = savedJobIds.includes(job.id);
              const matchScore = jobsService.calculateMatchScore(job, targetRole);
              return (
                <Link key={job.id} to="/jobs">
                  <div className="p-3.5 rounded-2xl bg-[#121212] border border-white/10 hover:border-white/20 transition-all space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-black border border-white/10 flex items-center justify-center text-white overflow-hidden shrink-0">
                          {job.companyLogo ? (
                            <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
                          ) : (
                            <Building2 className="w-4 h-4" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-medium text-white truncate">{job.title}</h4>
                          <p className="text-[11px] text-brand-muted">{job.company} • {job.location}</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white text-[10px] font-medium font-mono shrink-0">
                        {matchScore}% Match
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-white/5">
                      <span className="font-mono font-medium text-brand-secondary">{job.salary}</span>
                      <span className="text-[10px] text-white font-medium flex items-center gap-0.5">
                        Apply with HirePilot <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Interviews Activity */}
        {data?.recentInterviews && data.recentInterviews.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-medium uppercase tracking-wider text-brand-muted flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-muted" />
                Recent Sessions
              </h2>
              <Link to="/history" className="text-[11px] font-medium text-white hover:text-brand-secondary flex items-center gap-0.5 transition-colors">
                History <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2">
              {data.recentInterviews.slice(0, 3).map((item) => (
                <Link key={item.id} to={`/interview/${item.id}/result`}>
                  <div className="p-3 rounded-2xl bg-[#121212] border border-white/10 flex items-center justify-between hover:border-white/20 transition-all">
                    <div>
                      <h4 className="text-xs font-medium text-white capitalize">{item.role}</h4>
                      <p className="text-[10px] text-brand-muted capitalize">{item.interview_type} • {item.difficulty}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-medium px-2 py-0.5 rounded-md bg-white/5 text-white border border-white/10">
                        {item.score ?? item.interview_reports?.[0]?.overall_score ?? 85}%
                      </span>
                      <ChevronRight className="w-4 h-4 text-brand-muted" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP VIEW (> 768px / hidden md:block)                                  */}
      {/* ========================================================================= */}
      <div className="hidden md:block space-y-6 sm:space-y-8 animate-fade-in pb-12">
        {/* Top Header & Greeting Hero */}
        <Card className="p-5 sm:p-8 bg-[#121212] text-white border-white/10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/5 text-white border border-white/10">
                  Ready to Practice
                </span>
                <span className="text-xs text-brand-muted flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  Targeting: <strong className="text-brand-secondary">{targetRole}</strong>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight break-words">
                Welcome back, {displayName}
              </h1>
              <p className="text-xs sm:text-sm text-brand-muted max-w-xl leading-relaxed">
                Sharpen your technical explanations, practice real-world interview rounds, and level up with instant AI feedback.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 pt-1 md:pt-0">
              <Link to="/interview/setup" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-[#121212] border border-white/10 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-white">
                  {data.stats.monthlyRemaining} free interview{data.stats.monthlyRemaining === 1 ? '' : 's'} remaining this month
                </p>
                <p className="text-[11px] text-brand-muted">
                  Standard free plan allows 3 comprehensive AI evaluations each month.
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-medium px-3 py-1 rounded-xl bg-white/5 text-white border border-white/10 shrink-0">
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
              icon={<CheckCircle2 className="w-5 h-5 text-white" />}
              accentColor="brand"
            />
            <StatCard
              title="Average Score"
              value={`${data?.stats.averageScore ?? 0}%`}
              subtitle="Across all interviews"
              icon={<Trophy className="w-5 h-5 text-white" />}
              accentColor="emerald"
            />
            <StatCard
              title="Best Score"
              value={`${data?.stats.bestScore ?? 0}%`}
              subtitle="Highest achieved score"
              icon={<Award className="w-5 h-5 text-white" />}
              accentColor="purple"
            />
            <StatCard
              title="Current Streak"
              value={`${data?.stats.currentStreak ?? 0} days`}
              subtitle="Consistent practice"
              icon={<Flame className="w-5 h-5 text-white" />}
              accentColor="amber"
            />
          </div>
        )}

        {/* Quick Actions Bar */}
        <div className="space-y-3">
          <h3 className="text-xs font-medium text-brand-muted uppercase tracking-wider">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {quickActions.map((act) => (
              <Link key={act.title} to={act.link}>
                <Card className="p-4 flex items-center justify-between group hover:border-white/20 transition-all bg-[#121212] border-white/10" hoverable>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${act.color}`}>
                      <act.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-white group-hover:text-brand-secondary transition-colors">
                        {act.title}
                      </h4>
                      <p className="text-[11px] text-brand-muted">{act.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-muted group-hover:text-white group-hover:translate-x-0.5 transition-all" />
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
