import React from 'react';
import { Sparkles, Trophy, ArrowRight, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GrowthJourneyCardProps {
  interviewsCompleted: number;
  averageScore: number;
  bestScore: number;
}

export const GrowthJourneyCard: React.FC<GrowthJourneyCardProps> = ({
  interviewsCompleted,
  averageScore,
  bestScore,
}) => {
  // Calculate dynamic XP and Level based on real user actions
  // Base XP: 100 XP per interview + bonus based on average score
  const earnedXp = interviewsCompleted * 150 + Math.round(averageScore * 3.5);
  const targetXp = 1000;
  const progressPercent = Math.min(100, Math.max(15, Math.round((earnedXp / targetXp) * 100)));

  // Calculate Level
  let currentLevel = 'Level 01';
  let levelTitle = 'Cadet Pilot';
  if (interviewsCompleted >= 5 || averageScore >= 80) {
    currentLevel = 'Level 04';
    levelTitle = 'Flight Captain';
  } else if (interviewsCompleted >= 3 || averageScore >= 70) {
    currentLevel = 'Level 03';
    levelTitle = 'First Officer';
  } else if (interviewsCompleted >= 1) {
    currentLevel = 'Level 02';
    levelTitle = 'Co-Pilot';
  }

  // SVG circular gauge geometry
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="h-full rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
        <div>
          <h3 className="text-sm font-semibold text-[#111827] flex items-center gap-1.5">
            <span>Your Growth Journey</span>
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
          </h3>
          <p className="text-[11px] text-[#64748B]">
            Interview readiness &amp; mastery level
          </p>
        </div>
        <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
          {currentLevel}
        </span>
      </div>

      {/* Circular Radial Gauge (Image 4 MockAI Style) */}
      <div className="my-4 flex flex-col items-center justify-center">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 148 148">
            {/* Background track */}
            <circle
              cx="74"
              cy="74"
              r={radius}
              className="text-slate-100"
              strokeWidth="11"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Animated progress stroke */}
            <circle
              cx="74"
              cy="74"
              r={radius}
              className="text-[#16A34A] transition-all duration-1000 ease-out"
              strokeWidth="11"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Center text in dial */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold font-mono text-[#111827] tracking-tight">
              {progressPercent}%
            </span>
            <span className="text-[10px] font-medium text-[#64748B] mt-0.5">
              {earnedXp}/{targetXp} XP
            </span>
          </div>
        </div>

        {/* Level badge label */}
        <div className="text-center mt-2 space-y-0.5">
          <p className="text-xs font-semibold text-[#111827]">{levelTitle}</p>
          <p className="text-[11px] text-[#64748B]">
            {interviewsCompleted === 0
              ? 'Complete first session to unlock Level 02'
              : `${targetXp - earnedXp > 0 ? targetXp - earnedXp : 0} XP to next milestone`}
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-3 border-t border-[#F1F5F9]">
        <Link
          to="/interview/setup"
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-[6px] bg-slate-50 hover:bg-blue-50 text-[#111827] hover:text-[#2563EB] border border-[#E5E7EB] hover:border-blue-200 text-xs font-medium transition-all group"
        >
          <Zap className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Boost Level (+150 XP)</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

