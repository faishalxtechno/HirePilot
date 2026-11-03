import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { AnswerEvaluation } from '../../types';
import { CountUp, ScrollReveal } from '../motion';
import { calculateWeightedAnswerScore } from '../../lib/scoringRubric';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Award,
  Check,
  BookOpen,
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
  // Compute strictly verified weighted score (40/25/20/15)
  const weightedScore = evaluation.weighted_score !== undefined
    ? evaluation.weighted_score
    : calculateWeightedAnswerScore({
        accuracy: evaluation.accuracy,
        relevance: evaluation.relevance,
        completeness: evaluation.completeness,
        clarity: evaluation.clarity,
      });

  const dimensions = [
    { label: 'Technical Accuracy', weight: '40%', value: evaluation.accuracy, desc: 'Factual precision & depth' },
    { label: 'Relevance', weight: '25%', value: evaluation.relevance, desc: 'Direct prompt addressal' },
    { label: 'Completeness', weight: '20%', value: evaluation.completeness, desc: 'Edge cases & trade-offs' },
    { label: 'Clarity', weight: '15%', value: evaluation.clarity, desc: 'Structure & articulation' },
  ];

  return (
    <Card className="p-6 rounded-[14px] bg-white border border-[#E5E7EB] shadow-sm space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F1F5F9] gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[8px] bg-emerald-50 text-[#16A34A] border border-emerald-200 flex items-center justify-center shadow-2xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#111827]">
              Answer Evaluation
            </h3>
            <p className="text-xs text-[#64748B]">Impartial weighted assessment</p>
          </div>
        </div>

        {/* Weighted Score Badge (Image 1 Style: Score: 88/100) */}
        <div className="flex items-center gap-2">
          <span
            className={`font-mono text-sm font-bold px-3 py-1 rounded-full border shadow-2xs ${
              weightedScore >= 80
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : weightedScore >= 65
                ? 'bg-blue-50 text-[#2563EB] border-blue-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            Score: <CountUp value={weightedScore} duration={900} />/100
          </span>
        </div>
      </div>

      {/* 4 Dimension Score Gauges (Weighted Rubric) */}
      <ScrollReveal staggerChildren={60} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {dimensions.map((dim) => (
          <div
            key={dim.label}
            className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB] space-y-1 text-center"
          >
            <div className="flex items-center justify-between text-[10px] text-[#64748B]">
              <span className="font-medium truncate">{dim.label}</span>
              <span className="font-mono font-semibold text-[#94A3B8]">{dim.weight}</span>
            </div>
            <div className="text-xl font-bold font-mono text-[#111827]">
              <CountUp value={dim.value} duration={800} />
              <span className="text-xs text-[#94A3B8] font-normal">/10</span>
            </div>
            <p className="text-[10px] text-[#94A3B8] truncate">{dim.desc}</p>
          </div>
        ))}
      </ScrollReveal>

      {/* Feedback Narrative Paragraph */}
      {evaluation.feedback && (
        <div className="p-4 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#111827] leading-relaxed">
          <p className="font-semibold text-xs text-[#64748B] uppercase tracking-wider mb-1">
            Evaluator Feedback
          </p>
          <p>{evaluation.feedback}</p>
        </div>
      )}

      {/* Technical Accuracy Assessment */}
      {evaluation.accuracy_explanation && (
        <div className="p-4 rounded-[10px] bg-slate-50 border border-[#E5E7EB] text-xs text-[#111827] leading-relaxed">
          <p className="font-semibold text-xs text-[#475569] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Technical Accuracy Verification</span>
          </p>
          <p>{evaluation.accuracy_explanation}</p>
        </div>
      )}

      {/* Structured Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        {/* What Went Well */}
        <div className="p-4 rounded-[10px] bg-emerald-50/50 border border-emerald-200/70 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>What You Did Well</span>
          </div>
          <ul className="space-y-1.5 text-xs text-[#111827]">
            {evaluation.what_went_well?.length ? (
              evaluation.what_went_well.map((point, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))
            ) : (
              <li className="text-xs text-[#64748B]">Addressed foundational aspects of the question prompt.</li>
            )}
          </ul>
        </div>

        {/* Missing Points / Omissions */}
        <div className="p-4 rounded-[10px] bg-amber-50/50 border border-amber-200/70 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Areas Omitted / Gaps</span>
          </div>
          <ul className="space-y-1.5 text-xs text-[#111827]">
            {evaluation.missing_points?.length ? (
              evaluation.missing_points.map((point, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))
            ) : (
              <li className="text-xs text-[#64748B]">No critical engineering concepts were omitted.</li>
            )}
          </ul>
        </div>

        {/* How To Improve */}
        <div className="p-4 rounded-[10px] bg-blue-50/50 border border-blue-200/70 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-800 uppercase tracking-wider">
            <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
            <span>How to Elevate</span>
          </div>
          <ul className="space-y-1.5 text-xs text-[#111827]">
            {evaluation.how_to_improve?.length ? (
              evaluation.how_to_improve.map((point, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))
            ) : (
              <li className="text-xs text-[#64748B]">Continue practicing concise, quantified real-world examples.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Suggested Model Answer (Image 1 Style) */}
      {evaluation.suggested_answer && (
        <div className="p-4 rounded-[10px] bg-indigo-50/50 border border-indigo-200/80 space-y-2 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>Suggested 10/10 Model Answer</span>
            </div>
            <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded">
              Senior Exemplar
            </span>
          </div>
          <p className="text-xs text-[#111827] leading-relaxed italic">
            &ldquo;{evaluation.suggested_answer}&rdquo;
          </p>
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9]">
        <p className="text-xs text-[#64748B]">
          {isLastQuestion ? 'Final question complete' : 'Ready to advance to next question'}
        </p>

        <Button
          variant="primary"
          size="md"
          onClick={onNext}
          isLoading={isLoadingNext}
          rightIcon={!isLoadingNext ? <ArrowRight className="w-4 h-4" /> : undefined}
          className="shadow-xs bg-[#2563EB] hover:bg-[#1D4ED8]"
        >
          {isLoadingNext
            ? isLastQuestion
              ? 'Generating Final Report...'
              : 'Generating Next Question...'
            : isLastQuestion
            ? 'Complete Interview & View Report'
            : 'Proceed to Next Question'}
        </Button>
      </div>
    </Card>
  );
};
