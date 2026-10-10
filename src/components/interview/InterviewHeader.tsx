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
  elapsedSeconds?: number;
  onExit?: () => void;
}

export const InterviewHeader: React.FC<InterviewHeaderProps> = ({
  currentQuestion,
  totalQuestions,
  role,
  difficulty,
  interviewType,
  elapsedSeconds = 0,
  onExit,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 sm:p-5 glass-panel rounded-2xl border border-white/10 shadow-2xl relative">
      {/* Specular accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Left: Live Session Pill & Title */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 glass-pill px-3 py-1 rounded-full border border-cyan-500/30 shadow-[0_0_14px_rgba(54,214,255,0.25)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#36D6FF]" />
          <span className="font-mono text-[11px] text-cyan-300 tracking-wider font-bold uppercase">
            Live Mock Session
          </span>
        </div>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 flex-wrap">
            <span className="tracking-tight">{role}</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-xs font-mono text-purple-300 glass-pill px-2.5 py-0.5 rounded-full border border-purple-500/30 font-semibold">
              Question {currentQuestion} of {totalQuestions}
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5 capitalize">
            {interviewType} Round • {difficulty} Difficulty Assessment
          </p>
        </div>
      </div>

      {/* Right: Telemetry & Actions */}
      <div className="flex items-center gap-3 flex-wrap justify-between lg:justify-end border-t lg:border-t-0 border-white/5 pt-3 lg:pt-0">
        {/* Voice Model Health Tag */}
        <div className="flex items-center gap-2 glass-pill px-3 py-1.5 rounded-2xl border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-medium text-slate-200">AI Voice: Active</span>
            <span className="font-mono text-[10px] text-emerald-400 font-bold">38ms Latency</span>
          </div>
        </div>

        {/* Live Elapsed Timer (iOS Stopwatch pill) */}
        <div className="flex items-center gap-2 glass-pill px-3.5 py-1.5 rounded-2xl border border-white/10">
          <span className="text-xs text-cyan-400 font-mono">⏱</span>
          <span className="font-mono text-sm font-bold tracking-tight text-white">
            {formatTime(elapsedSeconds)}
          </span>
          <span className="font-mono text-[11px] text-slate-500">/ 30:00</span>
        </div>

        {/* Action: Exit Session Trigger */}
        {onExit ? (
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-xl transition-all border border-transparent hover:border-red-500/20 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit Interview</span>
          </button>
        ) : (
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-xl transition-all border border-transparent hover:border-red-500/20 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit Interview</span>
          </Link>
        )}
      </div>
    </div>
  );
};
