import React from 'react';
import { Button } from '../ui/Button';
import { AnswerEvaluation } from '../../types';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface EvaluationFeedbackProps {
  evaluation: AnswerEvaluation;
  onNext: () => void;
  isLoadingNext: boolean;
  isLastQuestion: boolean;
}

export const EvaluationFeedback: React.FC<EvaluationFeedbackProps> = ({
  evaluation,
  onNext,
  isLoadingNext,
  isLastQuestion,
}) => {
  const scores = [
    { label: 'Relevance', value: evaluation.relevance },
    { label: 'Technical Accuracy', value: evaluation.accuracy },
    { label: 'Completeness', value: evaluation.completeness },
    { label: 'Clarity', value: evaluation.clarity },
  ];

  const avgScore = Math.round(
    ((evaluation.relevance + evaluation.accuracy + evaluation.completeness + evaluation.clarity) / 4) * 10
  );

  return (
    <div className="glass-panel border border-white/10 shadow-2xl p-5 sm:p-7 rounded-3xl space-y-6 animate-slide-up text-slate-100 relative overflow-hidden">
      {/* Specular accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/10 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl glass-pill border border-purple-500/30 text-purple-300 flex items-center justify-center shadow-[0_0_14px_rgba(118,87,255,0.25)]">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              AI Evaluation & Rubric Scores
            </h3>
            <p className="text-xs text-slate-400">Gemini Pro multi-dimensional analysis</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Question Score:</span>
          <span className="font-mono text-sm font-bold px-3 py-1 rounded-xl glass-primary-btn text-white border border-white/20 shadow-[0_0_12px_rgba(118,87,255,0.4)]">
            {avgScore}%
          </span>
        </div>
      </div>

      {/* 4 Score Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {scores.map((s) => (
          <div
            key={s.label}
            className="p-3.5 rounded-2xl glass-card border border-white/5 text-center space-y-1"
          >
            <span className="text-[11px] font-mono text-slate-400 block truncate font-medium">
              {s.label}
            </span>
            <span className="font-mono text-xl font-bold text-white">
              {s.value}
              <span className="text-xs text-slate-500 font-normal">/10</span>
            </span>
          </div>
        ))}
      </div>

      {/* Feedback Summary Paragraph */}
      {evaluation.feedback && (
        <div className="p-4 sm:p-5 rounded-2xl glass-card-interactive border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
          {evaluation.feedback}
        </div>
      )}

      {/* Detailed Analysis Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        {/* What Went Well */}
        <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
            <CheckCircle2 className="w-4 h-4" />
            What You Did Well
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {evaluation.what_went_well?.length ? (
              evaluation.what_went_well.map((point, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-500 italic">Clear attempt with relevant concepts.</li>
            )}
          </ul>
        </div>

        {/* What You Missed */}
        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
            <AlertTriangle className="w-4 h-4" />
            What You Missed
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {evaluation.missing_points?.length ? (
              evaluation.missing_points.map((point, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-500 italic">No major omissions detected.</li>
            )}
          </ul>
        </div>

        {/* How to Improve */}
        <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400 uppercase tracking-wider font-mono">
            <Lightbulb className="w-4 h-4" />
            How to Improve
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {evaluation.how_to_improve?.length ? (
              evaluation.how_to_improve.map((point, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-500 italic">Provide deeper trade-off discussions.</li>
            )}
          </ul>
        </div>
      </div>

      {/* CTA Advance Button */}
      <div className="pt-4 border-t border-white/10 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={isLoadingNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full glass-primary-btn text-white text-xs font-semibold shadow-[0_4px_20px_rgba(118,87,255,0.45)] border border-white/20 transition-all hover:scale-102 cursor-pointer disabled:opacity-50"
        >
          <span>{isLoadingNext ? 'Loading Next...' : isLastQuestion ? 'Complete Interview & View Report' : 'Next Question'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
