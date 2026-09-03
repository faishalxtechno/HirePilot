import React from 'react';
import { TiltCard } from '../ui/TiltCard';
import { Badge } from '../ui/Badge';
import { Bot, Sparkles, Volume2 } from 'lucide-react';
import { Question } from '../../types';

export const QuestionCard: React.FC<{ question: Question }> = ({ question }) => {
  return (
    <TiltCard className="p-4 sm:p-6 bg-[#121212] border-white/10 shadow-2xl space-y-4">
      {/* Header with AI Voice / Waveform indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-black border border-white/10 flex items-center justify-center text-white shrink-0 layer-icon">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                AI Interviewer
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
            <p className="text-[10px] text-brand-muted">Gemini Pro Evaluation Engine</p>
          </div>
        </div>

        {/* Stitch Audio Waveform Visualizer */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white">
          <Volume2 className="w-3.5 h-3.5 text-white shrink-0" />
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-2 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 h-1.5 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            <span className="w-0.5 h-2.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
          </div>
        </div>
      </div>

      {/* Category tag */}
      {question.category && (
        <div>
          <Badge variant="outline" size="sm" className="font-mono text-[10px] border-white/10 text-brand-muted bg-white/5">
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

      <div className="flex items-center gap-2 pt-2 border-t border-white/10 text-[11px] text-brand-muted">
        <Sparkles className="w-3.5 h-3.5 text-white shrink-0" />
        <span>Answer clearly. Highlight concepts, design decisions, edge cases, and trade-offs.</span>
      </div>
    </TiltCard>
  );
};
