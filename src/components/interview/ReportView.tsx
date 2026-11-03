import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { InterviewReport, Interview, Question, Answer } from '../../types';
import { getScoreVerdict, formatDate } from '../../lib/utils';
import { calculateWeightedAnswerScore, parseDimensionScore } from '../../lib/scoringRubric';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CountUp, ScrollReveal } from '../motion';
import {
  Trophy,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Sparkles,
  RotateCcw,
  PlusCircle,
  LayoutDashboard,
  Target,
  Compass,
  ChevronDown,
  ChevronUp,
  FileText,
  Clock,
  History,
} from 'lucide-react';

interface ReportViewProps {
  report: InterviewReport;
  interview?: Interview;
  questions?: Question[];
  answers?: Answer[];
}

export const ReportView: React.FC<ReportViewProps> = ({
  report,
  interview,
  questions = [],
  answers = [],
}) => {
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const verdict = getScoreVerdict(report.overall_score);

  useEffect(() => {
    // Trigger celebratory confetti if candidate scored well (>= 70%)
    if (report.overall_score >= 70) {
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
    { label: 'Technical Accuracy', score: report.technical_score, weight: '40% weight', desc: 'Factual correctness & domain depth' },
    { label: 'Problem Solving', score: report.problem_solving_score, weight: '20% weight', desc: 'Edge cases & architectural trade-offs' },
    { label: 'Communication', score: report.communication_score, weight: '15% weight', desc: 'Clarity, conciseness & STAR structure' },
    { label: 'Answer Quality', score: report.answer_quality_score, weight: '25% weight', desc: 'Relevance & overall engineering nuance' },
  ];

  // Derive Personalized Coach recommendations (Section 9)
  const nextRecommendedDifficulty =
    report.overall_score >= 80 ? 'Hard' : report.overall_score >= 60 ? 'Medium' : 'Easy';

  // Find lowest-scoring questions to recommend for targeted replay
  const questionPairs = questions.map((q) => {
    const ans = answers.find((a) => a.question_id === q.id || a.interview_id === q.interview_id);
    const score = ans
      ? calculateWeightedAnswerScore({
          accuracy: parseDimensionScore(ans.accuracy_score, 0),
          relevance: parseDimensionScore(ans.relevance_score, 0),
          completeness: parseDimensionScore(ans.completeness_score, 0),
          clarity: parseDimensionScore(ans.clarity_score, 0),
        })
      : 0;
    return { question: q, answer: ans, score };
  });

  const lowScoringQuestions = [...questionPairs]
    .sort((a, b) => a.score - b.score)
    .slice(0, 2)
    .filter((p) => p.score < 80);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* 1. Hero Performance Banner */}
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-[#0B0F19] via-[#111827] to-[#1E293B] text-white border-slate-800 shadow-lg relative overflow-hidden rounded-[16px]">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Interview Evaluation Scorecard</span>
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
                <span className="capitalize">{interview.interview_type} Loop</span>
                <span>•</span>
                <span className="capitalize">{interview.difficulty} Level</span>
                <span>•</span>
                <span>{questions.length || interview.total_questions} Questions</span>
              </div>
            )}
          </div>

          {/* Large Overall Score Box */}
          <div className="flex flex-col items-center justify-center p-6 rounded-[14px] bg-white/5 backdrop-blur-md border border-white/10 shrink-0 min-w-[190px]">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Overall Score
            </span>
            <div className="font-mono text-5xl font-black text-white mt-1">
              <CountUp value={report.overall_score} duration={1100} />
              <span className="text-xl text-slate-400 font-normal">/100</span>
            </div>
            <div className="mt-2.5">
              <span
                className={`font-mono text-xs font-semibold px-3 py-1 rounded-full border ${
                  report.overall_score >= 80
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : report.overall_score >= 65
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}
              >
                {verdict.label}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* 2. Categorical Rubric Breakdown (Technical, Problem Solving, Communication, Answer Quality) */}
      <ScrollReveal staggerChildren={70} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((c) => (
          <Card key={c.label} className="p-4 rounded-[12px] bg-white border border-[#E5E7EB] shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#111827]">{c.label}</span>
              <span className="font-mono font-bold text-[#111827]">
                <CountUp value={c.score} duration={900} />%
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-[#2563EB] rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, Math.max(0, c.score))}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#94A3B8]">
              <span>{c.weight}</span>
              <span className="truncate max-w-[130px]">{c.desc}</span>
            </div>
          </Card>
        ))}
      </ScrollReveal>

      {/* 3. AI Executive Summary */}
      {report.ai_summary && (
        <ScrollReveal delay={100}>
          <Card className="p-6 rounded-[14px] bg-blue-50/40 border border-blue-200/80 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              <span>AI Executive Performance Summary</span>
            </div>
            <p className="text-xs sm:text-sm text-[#111827] leading-relaxed">
              &ldquo;{report.ai_summary}&rdquo;
            </p>
          </Card>
        </ScrollReveal>
      )}

      {/* 4. Detailed Analysis: Strengths, Weaknesses, Recommended Topics */}
      <ScrollReveal staggerChildren={80} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Strengths */}
        <Card className="h-full p-5 rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#16A34A] uppercase tracking-wider border-b border-[#F1F5F9] pb-3">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
            <span>Key Strengths</span>
          </div>
          <ul className="space-y-2 text-xs text-[#111827]">
            {report.strengths?.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#16A34A] font-bold">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Weaknesses */}
        <Card className="h-full p-5 rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D97706] uppercase tracking-wider border-b border-[#F1F5F9] pb-3">
            <AlertCircle className="w-4 h-4 text-[#D97706]" />
            <span>Priority Areas to Improve</span>
          </div>
          <ul className="space-y-2 text-xs text-[#111827]">
            {report.weaknesses?.map((w, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#D97706] font-bold">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Recommended Topics */}
        <Card className="h-full p-5 rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] uppercase tracking-wider border-b border-[#F1F5F9] pb-3">
            <BookOpen className="w-4 h-4 text-[#2563EB]" />
            <span>Topics to Revise</span>
          </div>
          <ol className="space-y-2 text-xs text-[#111827] list-none">
            {report.recommendations?.map((r, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-100 text-[#2563EB] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ol>
        </Card>
      </ScrollReveal>

      {/* 5. Personalized Interview Coach Recommendations (Section 9) */}
      <ScrollReveal delay={120}>
        <Card className="p-6 rounded-[14px] bg-[#F8FAFC] border border-[#E5E7EB] shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#2563EB]" />
              <h3 className="text-sm font-semibold text-[#111827]">
                Personalized Interview Coach Action Plan
              </h3>
            </div>
            <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
              Next Difficulty: {nextRecommendedDifficulty}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Suggested Next Practice */}
            <div className="p-4 rounded-[10px] bg-white border border-[#E5E7EB] space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-[#111827]">
                <Target className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Recommended Next Session Focus</span>
              </div>
              <p className="text-[#64748B] leading-relaxed">
                Take another <strong>{interview?.interview_type || 'technical'}</strong> session on <strong>{nextRecommendedDifficulty}</strong> difficulty focusing on edge cases, scaling limits, and structured STAR delivery.
              </p>
              <div className="pt-2">
                <Link
                  to={`/interview/setup?role=${encodeURIComponent(interview?.role || 'Software Engineer')}&type=${interview?.interview_type || 'technical'}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:underline"
                >
                  <span>Launch Recommended Session</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Targeted Question Replays */}
            <div className="p-4 rounded-[10px] bg-white border border-[#E5E7EB] space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-[#111827]">
                <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                <span>Questions Recommended to Replay</span>
              </div>
              {lowScoringQuestions.length > 0 ? (
                <ul className="space-y-1 text-[#64748B]">
                  {lowScoringQuestions.map((item, idx) => (
                    <li key={idx} className="line-clamp-1">
                      <span className="font-semibold text-[#111827]">Q{item.question.question_number}:</span> {item.question.question_text}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#64748B]">
                  All questions were answered with high competency. Focus next on system architecture trade-offs.
                </p>
              )}
            </div>
          </div>
        </Card>
      </ScrollReveal>

      {/* 6. Individual Question Results & Transcript (Image 2 Intelliview Q&A Style) */}
      {questionPairs.length > 0 && (
        <ScrollReveal delay={140}>
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1">
              <div>
                <h3 className="text-sm font-semibold text-[#111827]">
                  Question-by-Question Evaluation Breakdown
                </h3>
                <p className="text-xs text-[#64748B]">
                  Review your submitted responses, dimension scores, and senior model answers
                </p>
              </div>
              <span className="text-xs font-mono font-semibold text-[#64748B]">
                {questionPairs.length} Evaluated
              </span>
            </div>

            <div className="space-y-3">
              {questionPairs.map(({ question, answer, score }) => {
                const isOpen = expandedQuestionId === question.id;
                return (
                  <Card
                    key={question.id}
                    className="rounded-[12px] bg-white border border-[#E5E7EB] shadow-2xs overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedQuestionId(isOpen ? null : question.id)}
                      className="w-full p-4 flex items-start justify-between gap-3 text-left hover:bg-slate-50 transition-colors"
                    >
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#2563EB]">
                            Q{question.question_number}
                          </span>
                          {question.category && (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-[#64748B] border border-[#E5E7EB]">
                              {question.category}
                            </span>
                          )}
                          {question.difficulty && (
                            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-200">
                              {question.difficulty}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-[#111827] line-clamp-2">
                          {question.question_text}
                        </p>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <span
                          className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                            score >= 80
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : score >= 65
                              ? 'bg-blue-50 text-[#2563EB] border-blue-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {score}%
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#64748B]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#64748B]" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-[#F1F5F9] space-y-3 bg-[#F8FAFC]/50 text-xs animate-fade-in">
                        {/* Submitted Answer */}
                        <div className="space-y-1 pt-3">
                          <p className="font-semibold text-[11px] text-[#64748B] uppercase tracking-wider">
                            Your Submitted Answer:
                          </p>
                          <p className="p-3 rounded-[8px] bg-white border border-[#E5E7EB] text-[#111827] leading-relaxed">
                            {answer?.user_answer || '(No answer recorded)'}
                          </p>
                        </div>

                        {/* Evaluator Feedback */}
                        {answer?.feedback && (
                          <div className="space-y-1">
                            <p className="font-semibold text-[11px] text-[#64748B] uppercase tracking-wider">
                              AI Feedback:
                            </p>
                            <p className="text-[#111827] leading-relaxed">
                              {answer.feedback}
                            </p>
                          </div>
                        )}

                        {/* Model Suggested Answer */}
                        {answer?.suggested_answer && (
                          <div className="p-3 rounded-[8px] bg-indigo-50/60 border border-indigo-200/80 space-y-1">
                            <p className="font-semibold text-[11px] text-indigo-900 uppercase tracking-wider">
                              Exemplar 10/10 Answer:
                            </p>
                            <p className="text-[#111827] italic leading-relaxed">
                              &ldquo;{answer.suggested_answer}&rdquo;
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* 7. Action Footer */}
      <ScrollReveal delay={160}>
        <Card className="p-5 rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" size="md" className="w-full text-xs" leftIcon={<LayoutDashboard className="w-4 h-4" />}>
                Dashboard
              </Button>
            </Link>
            <Link to="/history" className="w-full sm:w-auto">
              <Button variant="ghost" size="md" className="w-full text-xs" leftIcon={<History className="w-4 h-4" />}>
                History
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Link
              to={`/interview/setup?role=${encodeURIComponent(interview?.role || 'Software Engineer')}&type=${interview?.interview_type || 'technical'}`}
              className="w-full sm:w-auto"
            >
              <Button variant="secondary" size="md" className="w-full text-xs" leftIcon={<RotateCcw className="w-4 h-4" />}>
                Retake Session
              </Button>
            </Link>
            <Link to="/interview/setup" className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="w-full text-xs bg-[#2563EB] hover:bg-[#1D4ED8]" leftIcon={<PlusCircle className="w-4 h-4" />}>
                New Interview
              </Button>
            </Link>
          </div>
        </Card>
      </ScrollReveal>
    </div>
  );
};

export default ReportView;
