import React from 'react';
import { Target, CheckCircle2, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CareerGoalsTimelineProps {
  targetRole?: string;
  experienceLevel?: string;
}

export const CareerGoalsTimeline: React.FC<CareerGoalsTimelineProps> = ({
  targetRole = 'Software Engineer',
  experienceLevel = 'mid',
}) => {
  // Determine trajectory based on user's target role
  const steps = [
    {
      status: 'completed',
      tag: 'You are here!',
      role: 'Associate / Intermediate Engineer',
      salary: '$75,000 / year',
      icon: CheckCircle2,
      dotColor: 'bg-[#16A34A] text-white',
      badgeBg: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      status: 'active',
      tag: 'Next target!',
      role: targetRole || 'Senior Software Engineer',
      salary: '$130,000 / year',
      icon: Target,
      dotColor: 'bg-[#2563EB] text-white ring-4 ring-blue-100',
      badgeBg: 'text-[#2563EB] bg-blue-50 border-blue-200',
    },
    {
      status: 'upcoming',
      tag: 'Future potential!',
      role: 'Staff Engineer / Engineering Lead',
      salary: '$180,000+ / year',
      icon: Sparkles,
      dotColor: 'bg-purple-100 text-[#7C3AED]',
      badgeBg: 'text-purple-700 bg-purple-50 border-purple-200',
    },
  ];

  return (
    <div className="h-full rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
        <div>
          <h3 className="text-sm font-semibold text-[#111827] flex items-center gap-1.5">
            <span>Career Goals</span>
            <TrendingUp className="w-3.5 h-3.5 text-[#2563EB]" />
          </h3>
          <p className="text-[11px] text-[#64748B]">
            Seniority progression &amp; compensation targets
          </p>
        </div>

        <Link
          to="/profile"
          className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#2563EB] hover:text-[#1D4ED8]"
        >
          <span>Edit Target</span>
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Vertical Stepped Timeline (Image 1 CareerHero Style) */}
      <div className="my-3 space-y-4 relative">
        {/* Connecting Line */}
        <div className="absolute left-[13px] top-3 bottom-3 w-0.5 bg-slate-200 -z-0" />

        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="flex items-start gap-3 relative z-10">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-2xs ${step.dotColor}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              <div className="flex-1 min-w-0 bg-[#F8FAFC] border border-[#E5E7EB] rounded-[10px] p-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${step.badgeBg}`}
                  >
                    {step.tag}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#111827]">
                    {step.salary}
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#111827] mt-1 truncate">
                  {step.role}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-[#F1F5F9] text-[11px] text-[#64748B] flex items-center justify-between">
        <span>Active track: Engineering</span>
        <Link to="/profile" className="text-[#2563EB] font-medium hover:underline">
          Update Profile
        </Link>
      </div>
    </div>
  );
};

