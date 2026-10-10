import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { jobsService, Job } from '../lib/jobsService';
import { resumeService, ResumeAnalysis } from '../lib/resumeService';
import { DashboardData } from '../types';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Skeleton } from '../components/ui/Skeleton';
import { Link, useNavigate } from 'react-router-dom';
import {
  Play,
  ArrowRight,
  Briefcase,
  FileText,
  ChevronRight,
  Building2,
  Code2,
  Binary,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Upload,
  RefreshCw,
  ExternalLink,
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

      if (profile?.id) {
        const saved = await jobsService.getSavedJobIds(profile.id);
        setSavedJobIds(saved);
      }
    } catch (err) {
      console.error('Error loading dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const displayName = profile?.name || user?.email?.split('@')[0] || 'Candidate';
  const targetRole = profile?.target_role || 'Software Engineer';
  const monthlyRemaining = data?.stats.monthlyRemaining ?? 3;
  const monthlyMax = data?.stats.monthlyMax ?? 3;
  const allowancePercent = Math.min(100, Math.round((monthlyRemaining / (monthlyMax || 1)) * 100));
  const careerScore = data?.stats.averageScore ? Math.min(100, Math.max(65, data.stats.averageScore)) : 87;
  const precisionScore = data?.stats.averageScore ? `${data.stats.averageScore}%` : '91.4%';
  const atsScore = resumeData?.atsScore ?? 94;

  const quickActions = [
    {
      title: 'Technical Mock',
      desc: 'System design & architecture',
      link: `/interview/setup?role=${encodeURIComponent(targetRole)}&type=technical`,
      icon: Code2,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'DSA Practice',
      desc: 'Algorithms & complexities',
      link: `/interview/setup?role=${encodeURIComponent(targetRole)}&type=dsa`,
      icon: Binary,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    },
    {
      title: 'Behavioral STAR',
      desc: 'Leadership & teamwork stories',
      link: `/interview/setup?role=${encodeURIComponent(targetRole)}&type=behavioral`,
      icon: MessageSquare,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'AI Resume Audit',
      desc: 'ATS score & improvements',
      link: '/resume',
      icon: FileText,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
  ];

  return (
    <DashboardLayout>
      <div className="w-full flex flex-col gap-6 sm:gap-8 pb-12 animate-fade-in text-slate-100">
        
        {/* ========================================================================= */}
        {/* TOP GREETING & TARGET META BAR (STITCH APPLE SPECIFICATION)                */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>Welcome back, {displayName}</span>
                <span className="text-2xl select-none">👋</span>
              </h1>
              <span className="text-xs font-mono px-3 py-1 rounded-full glass-pill text-cyan-300 flex items-center gap-1.5 shadow-[0_0_12px_rgba(54,214,255,0.2)] border border-cyan-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                {monthlyMax > 3 ? 'Pro Tier (Active)' : 'Free Tier (3 Credits)'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-slate-400 text-xs sm:text-sm">
              <span className="font-mono uppercase text-[11px] tracking-wider text-slate-500 font-semibold">
                Target Role
              </span>
              <span className="text-white font-medium glass-pill px-3 py-1 rounded-xl text-xs border border-purple-500/30 text-purple-300">
                {targetRole}
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-slate-300 hidden sm:inline">Target Level: L5 / Senior IC</span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1 text-xs sm:text-sm">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Cohort Percentile: Top 4%</span>
              </span>
            </div>
          </div>

          {/* Quick Action Launchpad */}
          <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0">
            <Link
              to="/resume"
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-medium glass-btn text-slate-200 hover:text-white transition-all border border-white/10"
            >
              <Upload className="w-4 h-4 text-slate-400" />
              <span>Upload Resume</span>
            </Link>

            <Link
              to="/interview/setup"
              className="relative group flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold glass-primary-btn text-white transition-all overflow-hidden shadow-[0_4px_18px_rgba(118,87,255,0.45)]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="tracking-wide">Start New Interview</span>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* KEY METRICS ROW (APPLE IOS CONTROL CENTER BENTO GLASS TILES)               */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          
          {/* Card 1: Allowance Metric with Radial Arc */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold block">
                  Monthly Allowance
                </span>
                <div className="text-2xl sm:text-3xl font-bold text-white mt-1.5 tracking-tight font-sans">
                  {monthlyRemaining}{' '}
                  <span className="text-base sm:text-lg text-slate-400 font-normal">/ {monthlyMax}</span>
                </div>
              </div>

              {/* Glowing Cyan Radial Arc Ring */}
              <div className="relative w-14 h-14 flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(54,214,255,0.4)]">
                <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/10"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="url(#dashArcCyan)"
                    strokeDasharray={`${allowancePercent}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3.2"
                  />
                  <defs>
                    <linearGradient id="dashArcCyan" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stopColor="#36D6FF" />
                      <stop offset="100%" stopColor="#7657FF" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute font-mono text-[11px] text-cyan-300 font-bold">
                  {allowancePercent}%
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-slate-400 text-xs border-t border-white/5">
              <span>{monthlyRemaining === 0 ? 'Monthly limit reached' : 'Resets on 1st of month'}</span>
              <Link to="/#pricing" className="text-cyan-300 hover:underline font-medium">
                {monthlyMax > 3 ? 'Manage' : 'Add Credits'}
              </Link>
            </div>
          </div>

          {/* Card 2: Career Readiness Index */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold block">
                  Career Readiness
                </span>
                <div className="text-2xl sm:text-3xl font-bold text-white mt-1.5 tracking-tight flex items-baseline gap-1 font-sans">
                  {careerScore}
                  <span className="text-base sm:text-lg text-slate-400 font-normal">/100</span>
                </div>
              </div>

              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full glass-pill text-emerald-400 flex items-center gap-0.5 border-emerald-500/20 shadow-[0_0_8px_rgba(52,211,153,0.2)]">
                <TrendingUp className="w-3 h-3" /> +4.2%
              </span>
            </div>

            <div className="mt-4">
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden p-0.5 shadow-inner">
                <div
                  className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                  style={{ width: `${careerScore}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-2 font-mono text-[11px] text-slate-500">
                <span>Baseline: 70</span>
                <span className="text-emerald-400 font-medium">Offer Ready Tier</span>
              </div>
            </div>
          </div>

          {/* Card 3: Interview Precision Score */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold block">
                  Interview Precision
                </span>
                <div className="text-2xl sm:text-3xl font-bold text-white mt-1.5 tracking-tight font-sans">
                  {precisionScore}
                </div>
              </div>

              <div className="w-10 h-10 rounded-2xl glass-pill flex items-center justify-center text-purple-300 shadow-[0_0_12px_rgba(118,87,255,0.25)] border-purple-500/20">
                <Brain className="w-5 h-5 text-purple-400" />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-white/5 pt-3">
              {/* Mini Sparkline SVG with soft violet glow */}
              <svg className="w-20 h-6 text-purple-400 shrink-0 filter drop-shadow-[0_0_4px_rgba(168,85,247,0.6)]" fill="none" viewBox="0 0 96 24">
                <path
                  d="M2 18L20 14L38 16L56 8L74 10L94 2"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
              </svg>
              <span className="text-xs text-slate-400 truncate">Consistent high performance</span>
            </div>
          </div>

          {/* Card 4: Resume ATS Score */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold block">
                  Resume ATS Match
                </span>
                <div className="text-2xl sm:text-3xl font-bold text-white mt-1.5 tracking-tight font-sans">
                  {atsScore}%
                </div>
              </div>

              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full glass-pill text-cyan-300 border-cyan-500/20 shadow-[0_0_8px_rgba(54,214,255,0.2)] font-medium">
                Optimized
              </span>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-slate-400 text-xs border-t border-white/5">
              <span className="flex items-center gap-1 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> FAANG Ready
              </span>
              <Link to="/resume" className="text-purple-300 hover:underline font-medium">
                Scan Details
              </Link>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MAIN BODY GRID: 8 COLS (ANALYTICS & SESSIONS) + 4 COLS (COPILOT & TARGETS) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8">
          
          {/* LEFT COLUMN: 8 COLS */}
          <div className="xl:col-span-8 flex flex-col gap-6 sm:gap-8">
            
            {/* Performance Analytics Chart Module (Skill Velocity & Rubrics) */}
            <div className="glass-card p-5 sm:p-7 rounded-3xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Skill Velocity & Rubrics</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Rolling evaluation across your recent mock interview cycles
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs text-slate-300 glass-pill px-2.5 py-1 rounded-full border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_6px_#c9beff]" /> Technical Depth
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-300 glass-pill px-2.5 py-1 rounded-full border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#6eddff]" /> Problem Solving
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-300 glass-pill px-2.5 py-1 rounded-full border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#47dfa4]" /> Communication
                  </span>
                </div>
              </div>

              {/* Analytical SVG Chart Visualization */}
              <div className="w-full h-56 relative flex flex-col justify-between py-2">
                {/* Background Grid Ticks */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                  <div className="w-full border-b border-white/10" />
                  <div className="w-full border-b border-white/10" />
                  <div className="w-full border-b border-white/10" />
                  <div className="w-full border-b border-white/10" />
                </div>

                {/* Multi-Series Chart Vectors with VisionOS Luminous Curves */}
                <svg className="w-full h-full overflow-visible z-10" preserveAspectRatio="none" viewBox="0 0 700 180">
                  <defs>
                    <linearGradient id="primaryGlow" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#7657ff" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#7657ff" stopOpacity="0.0" />
                    </linearGradient>
                    <filter id="glowEffect" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#c9beff" floodOpacity="0.5" />
                    </filter>
                    <filter id="secondaryGlowEffect" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#36D6FF" floodOpacity="0.5" />
                    </filter>
                    <filter id="tertiaryGlowEffect" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#36D399" floodOpacity="0.5" />
                    </filter>
                  </defs>

                  {/* Technical Depth (Primary) Filled Area */}
                  <path d="M 0 110 Q 140 95, 280 60 T 560 40 L 700 25 L 700 180 L 0 180 Z" fill="url(#primaryGlow)" />
                  <path
                    d="M 0 110 Q 140 95, 280 60 T 560 40 L 700 25"
                    fill="none"
                    filter="url(#glowEffect)"
                    stroke="#a78bfa"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />

                  {/* Problem Solving (Secondary Cyan) */}
                  <path
                    d="M 0 135 Q 140 120, 280 85 T 560 65 L 700 48"
                    fill="none"
                    filter="url(#secondaryGlowEffect)"
                    stroke="#38bdf8"
                    strokeDasharray="5 3"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />

                  {/* Communication (Tertiary Emerald) */}
                  <path
                    d="M 0 150 Q 140 130, 280 110 T 560 80 L 700 60"
                    fill="none"
                    filter="url(#tertiaryGlowEffect)"
                    stroke="#34d399"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />

                  {/* Interactive Marker Nodes with Apple Bezel ring */}
                  <circle cx="700" cy="25" fill="#7657ff" r="5" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="700" cy="48" fill="#36D6FF" r="4.5" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="700" cy="60" fill="#36D399" r="4.5" stroke="#ffffff" strokeWidth="2" />
                </svg>

                {/* Horizontal X-Axis Markers */}
                <div className="flex justify-between font-mono text-[11px] text-slate-500 z-20 pt-2 border-t border-white/5">
                  <span>Session 1</span>
                  <span>Session 3</span>
                  <span>Session 6</span>
                  <span>Session 9</span>
                  <span>Session 12</span>
                  <span className="text-white font-semibold">Latest Cycle</span>
                </div>
              </div>

              {/* Takeaway Insight Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-5 p-3 rounded-2xl glass-pill text-slate-300 text-xs border border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Key takeaway: System trade-offs and latency calculations improved by <strong className="text-white">+18%</strong> over baseline.
                  </span>
                </div>
                <Link to="/history" className="text-purple-300 hover:underline font-medium shrink-0 self-end sm:self-auto">
                  Full Metric History →
                </Link>
              </div>
            </div>

            {/* Recent Interview Sessions Stack */}
            <div className="glass-card p-5 sm:p-7 rounded-3xl flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">Recent Interview Sessions</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Evaluated against Staff & Senior grading benchmarks
                  </p>
                </div>

                <Link
                  to="/history"
                  className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                >
                  <span>View All History</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Sessions List */}
              {data?.recentInterviews && data.recentInterviews.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {data.recentInterviews.slice(0, 4).map((session) => {
                    const score = session.score ?? session.interview_reports?.[0]?.overall_score ?? 85;
                    return (
                      <div
                        key={session.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 glass-card-interactive rounded-2xl group border border-white/5 hover:border-white/15 transition-all gap-3"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="w-10 h-10 rounded-2xl glass-pill flex items-center justify-center shrink-0 text-cyan-300 border border-cyan-500/20 shadow-[0_0_12px_rgba(54,214,255,0.15)]">
                            <Code2 className="w-5 h-5 text-cyan-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                                {session.role}
                              </h3>
                              <span className="font-mono text-[11px] px-2 py-0.5 rounded-full glass-pill text-emerald-400 border border-emerald-500/20 font-bold">
                                {score}%
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 text-xs mt-0.5 flex-wrap">
                              <span className="capitalize">{session.interview_type}</span>
                              <span>•</span>
                              <span className="capitalize">{session.difficulty}</span>
                              <span>•</span>
                              <span>{new Date(session.started_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <Link
                            to={`/interview/${session.id}/result`}
                            className="px-3.5 py-1.5 rounded-xl text-xs glass-btn text-slate-200 hover:text-white flex items-center gap-1 font-medium"
                          >
                            <span>Review Report</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Empty state when user hasn't completed sessions yet */
                <div className="text-center py-10 px-4 space-y-3 glass-card rounded-2xl border border-white/5">
                  <div className="w-12 h-12 rounded-full glass-pill flex items-center justify-center text-slate-400 mx-auto border border-white/10">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">No interview sessions recorded yet</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      Start your first AI mock session to receive instant granular rubrics, audio analysis, and code reviews.
                    </p>
                  </div>
                  <Link to="/interview/setup" className="inline-block mt-2">
                    <button className="glass-primary-btn text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all">
                      Launch First Interview
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Practice Mode Cards */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Instant Practice Modes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {quickActions.map((act) => (
                  <Link key={act.title} to={act.link}>
                    <div className="p-4 glass-card-interactive rounded-2xl flex flex-col justify-between h-28 group border border-white/5 hover:border-purple-500/30 transition-all">
                      <div className="flex items-center justify-between">
                        <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${act.color}`}>
                          <act.icon className="w-4 h-4" />
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white group-hover:text-purple-300 transition-colors truncate">
                          {act.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{act.desc}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: 4 COLS (COPILOT ACTION PLAN & TARGET ROLES) */}
          <div className="xl:col-span-4 flex flex-col gap-6 sm:gap-8">
            
            {/* Copilot Action Plan */}
            <div className="glass-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <h2 className="text-base font-bold text-white tracking-tight">Copilot Action Plan</h2>
                  </div>
                  <span className="font-mono text-[11px] px-2.5 py-0.5 glass-pill text-slate-400 rounded-full border border-white/10 font-medium">
                    3 Recommended
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Action 1: Behavioral Mock */}
                  <Link
                    to={`/interview/setup?role=${encodeURIComponent(targetRole)}&type=behavioral`}
                    className="p-3.5 glass-card-interactive rounded-2xl group border border-white/5 block"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1 font-semibold">
                        <MessageSquare className="w-3 h-3" /> High Priority
                      </span>
                      <span className="font-mono text-[11px] text-slate-500">Est. 25m</span>
                    </div>
                    <p className="text-xs font-semibold text-white mt-1.5 group-hover:text-purple-300 transition-colors">
                      Take Mock Behavioral Interview for {targetRole}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      Calibrate narrative tone for stakeholder ambiguity and org-wide strategic influence.
                    </p>
                    <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-purple-400 group-hover:underline">
                      <span>Launch Session</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>

                  {/* Action 2: ATS Resume Fix */}
                  <Link
                    to="/resume"
                    className="p-3.5 glass-card-interactive rounded-2xl group border border-white/5 block"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1 font-semibold">
                        <AlertTriangle className="w-3 h-3" /> ATS Checklist
                      </span>
                      <span className="font-mono text-[11px] text-slate-500">Resume</span>
                    </div>
                    <p className="text-xs font-semibold text-white mt-1.5 group-hover:text-purple-300 transition-colors">
                      Audit {resumeData?.missingKeywords?.length || 3} ATS keywords on your resume
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      Increase match percentage against modern applicant tracking systems.
                    </p>
                    <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-purple-400 group-hover:underline">
                      <span>Review in Builder</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>

                  {/* Action 3: Technical System Design Review */}
                  <Link
                    to={`/interview/setup?role=${encodeURIComponent(targetRole)}&type=technical`}
                    className="p-3.5 glass-card-interactive rounded-2xl group border border-white/5 block"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider flex items-center gap-1 font-semibold">
                        <RefreshCw className="w-3 h-3" /> Deep Practice
                      </span>
                      <span className="font-mono text-[11px] text-slate-500">Technical</span>
                    </div>
                    <p className="text-xs font-semibold text-white mt-1.5 group-hover:text-purple-300 transition-colors">
                      Rehearse Distributed Architecture & CAP Trade-offs
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      Sharpen failure scenarios, partitioning strategies, and high-concurrency caches.
                    </p>
                    <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-purple-400 group-hover:underline">
                      <span>Start Practice</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Recommended Target Roles & Matches */}
            <div className="glass-card p-5 sm:p-6 rounded-3xl flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                  <h2 className="text-base font-bold text-white tracking-tight">Matched Opportunities</h2>
                </div>
                <Link to="/jobs" className="text-xs text-purple-400 hover:underline font-semibold">
                  View All
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                {recommendedJobs.map((job) => {
                  const matchScore = jobsService.calculateMatchScore(job, targetRole);
                  return (
                    <Link key={job.id} to="/jobs" className="block">
                      <div className="p-3.5 glass-card-interactive rounded-2xl group border border-white/5 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-white shrink-0 overflow-hidden">
                              {job.companyLogo ? (
                                <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
                              ) : (
                                <Building2 className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-semibold text-white group-hover:text-purple-300 transition-colors truncate">
                                {job.title}
                              </h4>
                              <p className="text-[11px] text-slate-400 truncate">
                                {job.company} • {job.location}
                              </p>
                            </div>
                          </div>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded-md glass-pill text-cyan-300 border border-cyan-500/20 shrink-0 font-bold">
                            {matchScore}%
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[11px] border-t border-white/5 text-slate-400">
                          <span className="font-mono text-slate-300 font-medium">{job.salary}</span>
                          <span className="text-purple-400 flex items-center gap-1 font-semibold group-hover:underline">
                            <span>Rehearse for Role</span>
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
