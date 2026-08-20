import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Bot, Sparkles } from 'lucide-react';
import { Question } from '../../types';

export const QuestionCard: React.FC<{ question: Question }> = ({ question }) => {
  return (
    <Card className="p-5 sm:p-6 border-sky-500/20 bg-gradient-to-br from-sky-500/[0.06] via-[rgba(12,20,37,0.7)] to-[rgba(12,20,37,0.8)] backdrop-blur-2xl shadow-glass space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-sm shadow-sky-500/20">
            <Bot className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            AI Interviewer
          </span>
        </div>

        <div className="flex items-center gap-2">
          {question.category && (
            <Badge variant="outline" size="sm" className="font-mono text-[11px] border-white/[0.1] text-slate-300">
              {question.category}
            </Badge>
          )}
        </div>
      </div>

      {/* Question Text */}
      <div className="pt-1">
        <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
          {question.question_text}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06] text-[11px] text-slate-400">
        <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
        <span>Answer thoroughly. Highlight concepts, design decisions, edge cases, or trade-offs.</span>
      </div>
    </Card>
  );
};
