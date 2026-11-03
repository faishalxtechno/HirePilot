import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Bot, Lightbulb, ChevronDown, ChevronUp, Sparkles, HelpCircle } from 'lucide-react';
import { Question } from '../../types';
import { FadeInText } from '../motion';

interface QuestionCardProps {
  question: Question;
  questionNumber?: number;
  totalQuestions?: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
}) => {
  const [hintOpen, setHintOpen] = useState(false);

  return (
    <Card className="p-6 rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[8px] bg-blue-50 text-[#2563EB] border border-blue-200 flex items-center justify-center font-bold text-xs shadow-2xs">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              AI Interviewer
            </span>
            {questionNumber && totalQuestions && (
              <p className="text-[11px] text-[#64748B]">
                Question {questionNumber} of {totalQuestions}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {question.category && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-[#111827] border border-[#E5E7EB]">
              {question.category}
            </span>
          )}
          {question.difficulty && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-blue-50 text-[#2563EB] border border-blue-200">
              {question.difficulty}
            </span>
          )}
        </div>
      </div>

      {/* Main Question Heading & Content */}
      <div className="space-y-1.5 pt-1">
        <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
          Question
        </h3>
        <FadeInText
          key={question.id || question.question_text}
          duration={400}
          distance={8}
          blur={true}
          className="text-base sm:text-lg font-semibold text-[#111827] leading-relaxed"
        >
          {question.question_text}
        </FadeInText>
      </div>

      {/* Expandable Hint Box (Inspired by Image 1) */}
      {question.hint && (
        <div className="rounded-[10px] bg-emerald-50/70 border border-emerald-200/80 overflow-hidden transition-all duration-200">
          <button
            type="button"
            onClick={() => setHintOpen(!hintOpen)}
            className="w-full px-4 py-2.5 flex items-center justify-between text-left text-xs font-semibold text-emerald-900 hover:bg-emerald-100/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Lightbulb className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hint &amp; Thinking Framework</span>
            </span>
            {hintOpen ? (
              <ChevronUp className="w-4 h-4 text-emerald-700" />
            ) : (
              <ChevronDown className="w-4 h-4 text-emerald-700" />
            )}
          </button>

          {hintOpen && (
            <div className="px-4 pb-3 pt-1 text-xs text-emerald-800 leading-relaxed border-t border-emerald-200/50 animate-fade-in">
              {question.hint}
            </div>
          )}
        </div>
      )}

      {/* Helper Footer */}
      <div className="flex items-center gap-2 pt-2 border-t border-[#F1F5F9] text-[11px] text-[#64748B]">
        <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
        <span>Answer thoroughly. Mention practical architectural trade-offs, scale constraints, or edge cases.</span>
      </div>
    </Card>
  );
};
