import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Bot, Sparkles } from 'lucide-react';
import { Question } from '../../types';

export const QuestionCard: React.FC<{ question: Question }> = ({ question }) => {
  return (
    <Card className="p-5 sm:p-6 border-brand-200/80 dark:border-brand-900/60 bg-gradient-to-br from-brand-50/40 via-white to-white dark:from-brand-950/20 dark:via-slate-900 dark:to-slate-900 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
            AI Interviewer
          </span>
        </div>

        <div className="flex items-center gap-2">
          {question.category && (
            <Badge variant="outline" size="sm" className="font-mono text-[11px]">
              {question.category}
            </Badge>
          )}
        </div>
      </div>

      {/* Question Text */}
      <div className="pt-1">
        <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
          {question.question_text}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
        <Sparkles className="w-3.5 h-3.5 text-brand-500" />
        <span>Answer thoroughly. Highlight concepts, design decisions, edge cases, or trade-offs.</span>
      </div>
    </Card>
  );
};
