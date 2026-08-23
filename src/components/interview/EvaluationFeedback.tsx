import React from 'react';
import { Card } from '../ui/Card';
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
    <Card className="border-white/10 shadow-2xl p-5 sm:p-6 space-y-5 sm:space-y-6 animate-slide-up bg-[#121212]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Answer Evaluation
            </h3>
            <p className="text-xs text-brand-muted">Gemini AI objective assessment</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-brand-muted font-medium">Question Score:</span>
          <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-lg bg-white text-black border border-white">
            {avgScore}%
          </span>
        </div>
      </div>

      {/* 4 Score Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {scores.map((s) => (
          <div
            key={s.label}
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-center space-y-1"
          >
            <span className="text-[11px] font-medium text-brand-muted block truncate">
              {s.label}
            </span>
            <span className="font-mono text-lg font-bold text-white">
              {s.value}
              <span className="text-xs text-brand-muted/70 font-normal">/10</span>
            </span>
          </div>
        ))}
      </div>

      {/* Feedback Summary Paragraph */}
      {evaluation.feedback && (
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white/90 leading-relaxed">
          {evaluation.feedback}
        </div>
      )}

      {/* Detailed Analysis Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* What Went Well */}
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            What You Did Well
          </div>
          <ul className="space-y-1.5 text-xs text-white/80">
            {evaluation.what_went_well?.length ? (
              evaluation.what_went_well.map((point, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))
            ) : (
              <li className="text-brand-muted italic">Clear attempt with relevant concepts.</li>
            )}
          </ul>
        </div>

        {/* What You Missed */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" />
            What You Missed
          </div>
          <ul className="space-y-1.5 text-xs text-white/80">
            {evaluation.missing_points?.length ? (
              evaluation.missing_points.map((point, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))
            ) : (
              <li className="text-brand-muted italic">No major omissions detected.</li>
            )}
          </ul>
        </div>

        {/* How to Improve */}
        <div className="p-4 rounded-xl bg-white/10 border border-white/20 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
            <Lightbulb className="w-3.5 h-3.5" />
            How to Improve
          </div>
          <ul className="space-y-1.5 text-xs text-white/80">
            {evaluation.how_to_improve?.length ? (
              evaluation.how_to_improve.map((point, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-white font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))
            ) : (
              <li className="text-brand-muted italic">Provide deeper trade-off discussions.</li>
            )}
          </ul>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-4 border-t border-white/10 flex justify-end">
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
          isLoading={isLoadingNext}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="w-full sm:w-auto"
        >
          {isLastQuestion ? 'Complete Interview & View Report' : 'Next Question'}
        </Button>
      </div>
    </Card>
  );
};
