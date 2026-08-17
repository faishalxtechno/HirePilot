import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AnswerEvaluation } from '../../types';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Sparkles,
  BarChart2,
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
    <Card className="border-slate-200 dark:border-slate-800 shadow-md p-6 space-y-6 animate-slide-up bg-white dark:bg-slate-900">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Answer Evaluation
            </h3>
            <p className="text-xs text-slate-500">Gemini AI objective assessment</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Question Score:</span>
          <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
            {avgScore}%
          </span>
        </div>
      </div>

      {/* 4 Score Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {scores.map((s) => (
          <div
            key={s.label}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-center space-y-1"
          >
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block truncate">
              {s.label}
            </span>
            <span className="font-mono text-lg font-bold text-slate-900 dark:text-white">
              {s.value}
              <span className="text-xs text-slate-400 font-normal">/10</span>
            </span>
          </div>
        ))}
      </div>

      {/* Feedback Summary Paragraph */}
      {evaluation.feedback && (
        <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {evaluation.feedback}
        </div>
      )}

      {/* Detailed Analysis Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* What Went Well */}
        <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/50 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            What You Did Well
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {evaluation.what_went_well?.length ? (
              evaluation.what_went_well.map((point, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-400 italic">Clear attempt with relevant concepts.</li>
            )}
          </ul>
        </div>

        {/* What You Missed */}
        <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/50 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" />
            What You Missed
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {evaluation.missing_points?.length ? (
              evaluation.missing_points.map((point, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-400 italic">No major omissions detected.</li>
            )}
          </ul>
        </div>

        {/* How to Improve */}
        <div className="p-4 rounded-xl bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200/60 dark:border-brand-900/50 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-800 dark:text-brand-300 uppercase tracking-wider">
            <Lightbulb className="w-3.5 h-3.5" />
            How to Improve
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {evaluation.how_to_improve?.length ? (
              evaluation.how_to_improve.map((point, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-brand-500 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-400 italic">Provide deeper trade-off discussions.</li>
            )}
          </ul>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
          isLoading={isLoadingNext}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="shadow-md shadow-brand-500/20 w-full sm:w-auto"
        >
          {isLastQuestion ? 'Complete Interview & View Report' : 'Next Question'}
        </Button>
      </div>
    </Card>
  );
};
