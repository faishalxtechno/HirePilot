import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Bot, Sparkles, Volume2 } from 'lucide-react';
import { Question } from '../../types';

export const QuestionCard: React.FC<{ question: Question }> = ({ question }) => {
  return (
    <Card className="p-4 sm:p-6 border-sky-500/25 bg-gradient-to-br from-sky-500/[0.08] via-[rgba(12,20,37,0.85)] to-[rgba(12,20,37,0.9)] backdrop-blur-2xl shadow-glass space-y-4">
      {/* Header with AI Voice / Waveform indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/25 shrink-0">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                AI Interviewer
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[10px] text-slate-400">Gemini Pro Evaluation Engine</p>
          </div>
        </div>

        {/* Stitch Audio Waveform Visualizer */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300">
          <Volume2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-2 bg-sky-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 h-3 bg-sky-300 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 h-1.5 bg-sky-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            <span className="w-0.5 h-2.5 bg-sky-300 rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
          </div>
        </div>
      </div>

      {/* Category tag */}
      {question.category && (
        <div>
          <Badge variant="outline" size="sm" className="font-mono text-[10px] border-white/[0.1] text-slate-300 bg-white/[0.02]">
            Category: {question.category}
          </Badge>
        </div>
      )}

      {/* Question Text */}
      <div className="pt-0.5">
        <p className="text-sm sm:text-base md:text-lg font-semibold text-white leading-relaxed tracking-tight">
          {question.question_text}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06] text-[11px] text-slate-400">
        <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
        <span>Answer clearly. Highlight concepts, design decisions, edge cases, and trade-offs.</span>
      </div>
    </Card>
  );
};
