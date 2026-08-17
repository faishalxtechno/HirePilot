import React from 'react';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { Sparkles, ArrowLeft } from 'lucide-react';
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
  const percentage = Math.round((currentQuestion / totalQuestions) * 100);

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sm:p-6 rounded-2xl shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Role & Type */}
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
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
            <p className="text-xs text-slate-500 mt-0.5">HirePilot AI Simulated Mock Session</p>
          </div>
        </div>

        {/* Right: Question Indicator */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Question</span>
            <p className="font-mono text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {currentQuestion} <span className="text-slate-400 font-normal">/ {totalQuestions}</span>
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
