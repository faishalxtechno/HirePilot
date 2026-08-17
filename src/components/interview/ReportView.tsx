import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { InterviewReport, Interview } from '../../types';
import { getScoreColor, getScoreVerdict, formatDate } from '../../lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Sparkles,
  RotateCcw,
  PlusCircle,
  LayoutDashboard,
  Share2,
} from 'lucide-react';

interface ReportViewProps {
  report: InterviewReport;
  interview?: Interview;
}

export const ReportView: React.FC<ReportViewProps> = ({ report, interview }) => {
  const navigate = useNavigate();
  const verdict = getScoreVerdict(report.overall_score);

  useEffect(() => {
    // Trigger confetti if score is solid
    if (report.overall_score >= 65) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe catch in non-canvas environments
      }
    }
  }, [report.overall_score]);

  const categories = [
    { label: 'Technical Knowledge', score: report.technical_score },
    { label: 'Problem Solving', score: report.problem_solving_score },
    { label: 'Communication', score: report.communication_score },
    { label: 'Answer Quality', score: report.answer_quality_score },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Hero Performance Banner */}
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Interview Evaluation Completed
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {interview?.role || 'Technical'} Mock Interview
            </h1>
            <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
              {verdict.desc}
            </p>
            {interview && (
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs text-slate-400">
                <span>{formatDate(interview.started_at)}</span>
                <span>•</span>
                <span className="capitalize">{interview.interview_type}</span>
                <span>•</span>
                <span className="capitalize">{interview.difficulty}</span>
              </div>
            )}
          </div>

          {/* Large Circular / Score Box */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shrink-0 min-w-[180px]">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Overall Score</span>
            <div className="font-mono text-5xl font-black text-white mt-1">
              {report.overall_score}
              <span className="text-xl text-slate-400 font-normal">/100</span>
            </div>
            <div className="mt-2">
              <Badge
                variant={
                  report.overall_score >= 80
                    ? 'success'
                    : report.overall_score >= 65
                    ? 'brand'
                    : 'warning'
                }
                size="md"
              >
                {verdict.label}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Category Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((c) => (
          <Card key={c.label} className="p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">{c.label}</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{c.score}%</span>
            </div>
            <Progress value={c.score} size="md" variant="brand" />
          </Card>
        ))}
      </div>

      {/* AI Executive Summary Card */}
      {report.ai_summary && (
        <Card className="p-6 bg-brand-50/40 dark:bg-brand-950/20 border-brand-200/70 dark:border-brand-900/60 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
            <Sparkles className="w-4 h-4" />
            AI Executive Recommendation
          </div>
          <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            "{report.ai_summary}"
          </p>
        </Card>
      )}

      {/* Detailed Analysis Grid: Strengths, Weaknesses, Recommended Topics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Strengths */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400 border-b border-slate-100 dark:border-slate-800 pb-3">
            <CheckCircle2 className="w-4 h-4" />
            Key Strengths
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {report.strengths?.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold mt-0.5">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Weaknesses */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-700 dark:text-amber-400 border-b border-slate-100 dark:border-slate-800 pb-3">
            <AlertCircle className="w-4 h-4" />
            Areas to Improve
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {report.weaknesses?.map((w, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Recommended Topics */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-brand-700 dark:text-brand-400 border-b border-slate-100 dark:border-slate-800 pb-3">
            <BookOpen className="w-4 h-4" />
            Recommended Topics
          </div>
          <ol className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-none">
            {report.recommendations?.map((r, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      {/* Action Footer */}
      <Card className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full" leftIcon={<LayoutDashboard className="w-4 h-4" />}>
              Back to Dashboard
            </Button>
          </Link>
          <Link to="/history" className="w-full sm:w-auto">
            <Button variant="ghost" size="md" className="w-full">
              View History
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            to={`/interview/setup?role=${encodeURIComponent(interview?.role || 'Software Engineer')}&type=${interview?.interview_type || 'technical'}`}
            className="w-full sm:w-auto"
          >
            <Button variant="secondary" size="md" className="w-full" leftIcon={<RotateCcw className="w-4 h-4" />}>
              Try Again
            </Button>
          </Link>
          <Link to="/interview/setup" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full" leftIcon={<PlusCircle className="w-4 h-4" />}>
              Start New Interview
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
