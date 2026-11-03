import React from 'react';
import { Award, Trophy, Flame, Target, MessageSquare, Briefcase, Lock, Check } from 'lucide-react';

interface AchievementsBadgesProps {
  interviewsCompleted: number;
  averageScore: number;
  bestScore: number;
  currentStreak: number;
  hasTargetRole: boolean;
  applicationsCount: number;
}

export const AchievementsBadges: React.FC<AchievementsBadgesProps> = ({
  interviewsCompleted,
  bestScore,
  currentStreak,
  hasTargetRole,
  applicationsCount,
}) => {
  const badges = [
    {
      id: 'badge-1',
      title: 'First Flight',
      description: 'Complete 1st mock interview',
      unlocked: interviewsCompleted >= 1,
      icon: Award,
      color: 'from-amber-400 to-orange-500',
      badgeBg: 'bg-amber-50 border-amber-200 text-amber-700',
    },
    {
      id: 'badge-2',
      title: 'Target Locked',
      description: 'Define target role & seniority',
      unlocked: hasTargetRole,
      icon: Target,
      color: 'from-blue-500 to-indigo-600',
      badgeBg: 'bg-blue-50 border-blue-200 text-[#2563EB]',
    },
    {
      id: 'badge-3',
      title: 'Streak Flame',
      description: 'Maintain 3-day practice cadence',
      unlocked: currentStreak >= 3,
      icon: Flame,
      color: 'from-rose-500 to-orange-500',
      badgeBg: 'bg-rose-50 border-rose-200 text-rose-700',
    },
    {
      id: 'badge-4',
      title: 'Score Master',
      description: 'Achieve 80%+ on an evaluation',
      unlocked: bestScore >= 80,
      icon: Trophy,
      color: 'from-emerald-400 to-teal-600',
      badgeBg: 'bg-emerald-50 border-emerald-200 text-[#16A34A]',
    },
    {
      id: 'badge-5',
      title: 'STAR Speaker',
      description: 'High communication evaluation',
      unlocked: interviewsCompleted >= 2,
      icon: MessageSquare,
      color: 'from-purple-500 to-violet-600',
      badgeBg: 'bg-purple-50 border-purple-200 text-[#7C3AED]',
    },
    {
      id: 'badge-6',
      title: 'Pipeline Pro',
      description: 'Track 3+ target company applications',
      unlocked: applicationsCount >= 3,
      icon: Briefcase,
      color: 'from-cyan-500 to-blue-600',
      badgeBg: 'bg-cyan-50 border-cyan-200 text-cyan-700',
    },
  ];

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
        <div>
          <h3 className="text-sm font-semibold text-[#111827] flex items-center gap-1.5">
            <span>Achievements &amp; Badges</span>
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
          </h3>
          <p className="text-[11px] text-[#64748B]">
            Milestones unlocked along your interview journey
          </p>
        </div>

        <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-[#111827] border border-[#E5E7EB]">
          {unlockedCount} / {badges.length} Unlocked
        </span>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className={`p-3 rounded-[12px] border text-center transition-all duration-200 relative group flex flex-col items-center justify-between ${
                badge.unlocked
                  ? `${badge.badgeBg} shadow-2xs hover:scale-[1.02]`
                  : 'bg-slate-50/70 border-slate-200/80 text-slate-400 opacity-70'
              }`}
            >
              {/* Badge Icon Emblem */}
              <div className="relative mb-2 mt-1">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center shadow-xs ${
                    badge.unlocked
                      ? `bg-gradient-to-br ${badge.color} text-white`
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {badge.unlocked ? (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#16A34A] text-white flex items-center justify-center ring-2 ring-white">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                ) : (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-400 text-white flex items-center justify-center ring-2 ring-white">
                    <Lock className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div>
                <p className="text-xs font-semibold text-[#111827] leading-tight">
                  {badge.title}
                </p>
                <p className="text-[10px] text-[#64748B] mt-0.5 line-clamp-2 leading-snug">
                  {badge.description}
                </p>
              </div>

              {/* Status pill */}
              <div className="mt-2.5 pt-2 border-t border-black/5 w-full">
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider ${
                    badge.unlocked ? 'text-[#16A34A]' : 'text-slate-400'
                  }`}
                >
                  {badge.unlocked ? 'Unlocked' : 'In Progress'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

