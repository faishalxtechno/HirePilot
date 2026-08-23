import React from 'react';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface InterviewHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  role: string;
  difficulty: string;
  interviewType: string;
}

export const InterviewHeader: React.FC<InterviewHeaderProps> = ({
  currentQuestion,
  totalQuestions,
  role,
  difficulty,
  interviewType,
}) => {
  return (
    <div className="bg-[#121212] border border-white/10 p-4 sm:p-6 rounded-2xl shadow-2xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Role & Type */}
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <Link
            to="/dashboard"
            className="p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl border border-white/10 text-brand-muted hover:text-white hover:border-white/30 transition-colors shrink-0 bg-black"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h2 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight break-words">
                {role}
              </h2>
              <Badge variant="brand" size="sm" className="capitalize">
                {interviewType}
              </Badge>
              <Badge
                variant={difficulty === 'hard' ? 'danger' : difficulty === 'medium' ? 'warning' : 'success'}
                size="sm"
                className="capitalize"
              >
                {difficulty}
              </Badge>
            </div>
            <p className="text-xs text-brand-muted mt-0.5">HirePilot AI Simulated Mock Session</p>
          </div>
        </div>

        {/* Right: Question Indicator */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
          <div className="text-left sm:text-right flex sm:block items-center gap-2">
            <span className="text-xs text-brand-muted uppercase font-medium tracking-wider">Question</span>
            <p className="font-mono text-base sm:text-lg font-bold text-white">
              {currentQuestion} <span className="text-brand-muted/70 font-normal">/ {totalQuestions}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <Progress value={currentQuestion} max={totalQuestions} variant="brand" size="sm" />
      </div>
    </div>
  );
};
