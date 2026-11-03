import React from 'react';
import { Interview } from '../../types';
import { CheckCircle2, Clock, PlayCircle, Briefcase, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../lib/utils';

export const RecentActivityFeed: React.FC<{ interviews: Interview[] }> = ({ interviews }) => {
  // Synthesize genuine chronological activities from actual user interviews and profile state
  const activities = interviews.slice(0, 5).map((interview) => {
    const isCompleted = interview.status === 'completed';
    return {
      id: interview.id,
      title: isCompleted
        ? `Completed ${interview.role} Mock Interview`
        : `Started ${interview.role} Session`,
      description: isCompleted
        ? `Achieved ${interview.score ?? 0}% overall score in ${interview.interview_type} loop.`
        : `Answered ${interview.current_question} of ${interview.total_questions} questions.`,
      date: interview.completed_at || interview.started_at,
      icon: isCompleted ? CheckCircle2 : PlayCircle,
      iconColor: isCompleted ? 'text-[#16A34A] bg-emerald-50 border-emerald-200' : 'text-[#2563EB] bg-blue-50 border-blue-200',
      link: isCompleted ? `/interview/${interview.id}/result` : `/interview/${interview.id}`,
      actionText: isCompleted ? 'View Scorecard' : 'Continue Session',
    };
  });

  return (
    <div className="rounded-[12px] bg-white border border-[#E5E7EB] shadow-2xs p-6 space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
        <div>
          <h3 className="text-base font-semibold text-[#111827]">
            Recent Activity
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Log of completed sessions, evaluation updates, and pipeline progress
          </p>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="py-8 text-center space-y-2">
          <p className="text-sm font-medium text-[#111827]">No activity logged yet</p>
          <p className="text-xs text-[#64748B] max-w-xs mx-auto">
            Your completed mock interviews and career milestone updates will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-start gap-3.5 p-3 rounded-[8px] bg-[#F8FAFC] border border-[#E5E7EB] hover:border-slate-300 transition-colors"
              >
                <div className={`p-2 rounded-[6px] border ${item.iconColor} shrink-0 mt-0.5`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-semibold text-[#111827] truncate">
                      {item.title}
                    </h4>
                    <span className="text-[11px] font-mono text-[#94A3B8] shrink-0">
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="pt-2">
                    <Link
                      to={item.link}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

