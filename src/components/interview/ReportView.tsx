import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { InterviewReport, Interview, UserProfile } from '../../types';
import { getScoreVerdict, formatDate } from '../../lib/utils';
import { generateCertificateId, generateResultId } from '../../lib/storage';
import { downloadInterviewResultPdf } from '../../lib/pdf/interviewResultPdf';
import { downloadCertificatePdf } from '../../lib/pdf/certificatePdf';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
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
  Download,
  Award,
  Calendar,
  ShieldCheck,
} from 'lucide-react';

interface ReportViewProps {
  report: InterviewReport;
  interview?: Interview;
  userProfile?: UserProfile | null;
}

export const ReportView: React.FC<ReportViewProps> = ({ report, interview, userProfile }) => {
  const { user, profile } = useAuth();

  const [isDownloadingResult, setIsDownloadingResult] = useState<boolean>(false);
  const [isDownloadingCert, setIsDownloadingCert] = useState<boolean>(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  // Dynamic candidate identity
  const candidateName =
    userProfile?.name ||
    profile?.name ||
    user?.user_metadata?.full_name ||
    (user?.email ? user.email.split('@')[0] : 'Candidate');

  const avatarUrl = userProfile?.avatar_url || profile?.avatar_url;

  const role = interview?.role || 'Software Developer';
  const rawDate = report.created_at || interview?.completed_at || interview?.started_at || new Date().toISOString();
  const formattedDate = formatDate(rawDate);

  // Persistent IDs
  const resultId = report.result_id || generateResultId(report.interview_id || report.id);
  const certificateId = report.certificate_id || generateCertificateId(report.interview_id || report.id);

  const verdict = getScoreVerdict(report.overall_score);

  // Metric scores
  const technicalScore = report.technical_score != null ? Math.round(report.technical_score) : null;
  const communicationScore = report.communication_score != null ? Math.round(report.communication_score) : null;
  const confidenceScore = report.confidence_score != null
    ? Math.round(report.confidence_score)
    : (report.answer_quality_score != null ? Math.round(report.answer_quality_score) : null);
  const problemSolvingScore = report.problem_solving_score != null ? Math.round(report.problem_solving_score) : null;

  useEffect(() => {
    // Trigger celebratory confetti if candidate performed well
    if (report.overall_score >= 65) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Non-blocking fallback
      }
    }
  }, [report.overall_score]);

  const handleDownloadResultPdf = async () => {
    setIsDownloadingResult(true);
    setDownloadError(null);
    try {
      await downloadInterviewResultPdf({
        report,
        interview,
        userProfile: profile || userProfile,
        candidateName,
        role,
        interviewDate: formattedDate,
        resultId,
        certificateId,
        avatarUrl,
      });
    } catch (err: any) {
      console.error('Error generating interview result PDF:', err);
      setDownloadError('Could not generate Interview Result PDF. Please try again.');
    } finally {
      setIsDownloadingResult(false);
    }
  };

  const handleDownloadCertificatePdf = async () => {
    setIsDownloadingCert(true);
    setDownloadError(null);
    try {
      await downloadCertificatePdf({
        report,
        interview,
        userProfile: profile || userProfile,
        candidateName,
        role,
        interviewDate: formattedDate,
        certificateId,
        overallScore: report.overall_score,
        avatarUrl,
      });
    } catch (err: any) {
      console.error('Error generating certificate PDF:', err);
      setDownloadError('Could not generate Certificate PDF. Please try again.');
    } finally {
      setIsDownloadingCert(false);
    }
  };

  const initials = candidateName
    .split(' ')
    .map((n: string) => n.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'HP';

  const categories = [
    { label: 'Technical Score', score: technicalScore, scoreDisplay: technicalScore != null ? `${technicalScore}/100` : 'N/A' },
    { label: 'Communication Score', score: communicationScore, scoreDisplay: communicationScore != null ? `${communicationScore}/100` : 'N/A' },
    { label: 'Confidence Score', score: confidenceScore, scoreDisplay: confidenceScore != null ? `${confidenceScore}/100` : 'N/A' },
    { label: 'Problem Solving', score: problemSolvingScore, scoreDisplay: problemSolvingScore != null ? `${problemSolvingScore}/100` : 'N/A' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Error Notice if PDF Generation Fails */}
      {downloadError && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{downloadError}</span>
        </div>
      )}

      {/* Hero Performance Banner with Dynamic Candidate Info */}
      <Card className="p-5 sm:p-8 bg-gradient-to-br from-[rgba(12,20,37,0.9)] via-[rgba(17,28,50,0.85)] to-[rgba(12,20,37,0.95)] text-white border-white/[0.08] shadow-glass-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-72 h-72 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left w-full lg:w-auto">
            {/* Candidate Profile Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-sky-400/40 shadow-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white shrink-0">
              {avatarUrl ? (
                <img src={avatarUrl} alt={candidateName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-black tracking-wider">{initials}</span>
              )}
            </div>

            <div className="space-y-2 flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/25 text-xs font-semibold">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Interview Performance Report</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white break-words">
                  {candidateName}
                </h1>
                <p className="text-sm font-medium text-sky-300 mt-0.5">
                  Role: <span className="text-white font-bold">{role}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {formattedDate}
                </span>
                <span>•</span>
                <span className="font-mono text-slate-400">Result ID: {resultId}</span>
                <span>•</span>
                <span className="font-mono text-sky-300 font-semibold">Cert ID: {certificateId}</span>
              </div>
            </div>
          </div>

          {/* Large Overall Score Gauge Box */}
          <div className="flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] shrink-0 w-full sm:w-auto min-w-[190px]">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Overall Score</span>
            <div className="font-mono text-4xl sm:text-5xl font-black text-white mt-1">
              {Math.round(report.overall_score)}
              <span className="text-xl text-slate-500 font-normal">/100</span>
            </div>
            <div className="mt-2.5">
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

        {/* Action Downloads Row on Banner */}
        <div className="mt-6 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <p className="text-xs text-slate-300 max-w-md">
            {verdict.desc}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            {/* Download Interview Result PDF */}
            <Button
              variant="secondary"
              size="md"
              onClick={handleDownloadResultPdf}
              isLoading={isDownloadingResult}
              leftIcon={<Download className="w-4 h-4 text-sky-400" />}
              className="w-full sm:w-auto"
            >
              Download Interview Result
            </Button>

            {/* Download Certificate PDF */}
            <Button
              variant="primary"
              size="md"
              onClick={handleDownloadCertificatePdf}
              isLoading={isDownloadingCert}
              leftIcon={<Award className="w-4 h-4 text-amber-300" />}
              className="w-full sm:w-auto shadow-md shadow-sky-500/25"
            >
              Download Certificate
            </Button>
          </div>
        </div>
      </Card>

      {/* Category Breakdown Cards (4 Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((c) => (
          <Card key={c.label} className="p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-400">{c.label}</span>
              <span className="font-mono font-bold text-white">{c.scoreDisplay}</span>
            </div>
            {c.score != null ? (
              <Progress value={c.score} size="md" variant="brand" />
            ) : (
              <div className="w-full bg-white/[0.04] h-2 rounded-full" />
            )}
          </Card>
        ))}
      </div>

      {/* AI Executive Summary Card */}
      {report.ai_summary && (
        <Card className="p-6 bg-sky-500/[0.06] border-sky-500/20 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-300">
            <Sparkles className="w-4 h-4 text-sky-400" />
            AI Executive Evaluation & Feedback
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            "{report.ai_summary}"
          </p>
        </Card>
      )}

      {/* Detailed Analysis Grid: Strengths, Areas to Improve, Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Strengths */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 border-b border-white/[0.06] pb-3">
            <CheckCircle2 className="w-4 h-4" />
            Key Strengths
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            {report.strengths?.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold mt-0.5">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Areas to Improve */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-400 border-b border-white/[0.06] pb-3">
            <AlertCircle className="w-4 h-4" />
            Areas to Improve
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            {report.weaknesses?.map((w, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold mt-0.5">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Recommended Topics */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-sky-400 border-b border-white/[0.06] pb-3">
            <BookOpen className="w-4 h-4" />
            Recommended Topics
          </div>
          <ol className="space-y-3 text-xs sm:text-sm text-slate-300 list-none">
            {(report.recommendations && report.recommendations.length > 0
              ? report.recommendations
              : [
                  'Advanced System Architecture Trade-offs',
                  'Edge-Case Concurrency & Transaction Isolation',
                  'STAR Behavioral Structure for Technical Leadership',
                ]
            ).map((r, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-sky-500/15 text-sky-300 text-xs font-bold flex items-center justify-center shrink-0 border border-sky-500/25">
                  {i + 1}
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      {/* Action Footer Navigation & Verification Attribution */}
      <Card className="p-6 space-y-4 border-white/[0.08]">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
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

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
            <Link
              to={`/interview/setup?role=${encodeURIComponent(interview?.role || 'Software Developer')}&type=${interview?.interview_type || 'technical'}`}
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
        </div>

        {/* Strict Founder Attribution Footer Line */}
        <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Official HirePilot AI Assessment Verification • <strong className="text-slate-300">Founder — Faishal Naushad</strong></span>
          </div>
          <span className="font-mono text-[11px] text-slate-500">
            Certificate ID: {certificateId}
          </span>
        </div>
      </Card>
    </div>
  );
};
