import React from 'react';
import { Interview } from '../../types';
import { formatDate } from '../../lib/utils';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Play, CheckCircle2, Clock } from 'lucide-react';

export const RecentInterviewsTable: React.FC<{ interviews: Interview[] }> = ({ interviews }) => {
  return (
    <div className="rounded-[12px] bg-white border border-[#E5E7EB] shadow-2xs overflow-hidden flex flex-col justify-between">
      <div className="p-6 pb-4 border-b border-[#F1F5F9] flex flex-row items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-[#111827]">
            Recent Mock Interviews
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Your latest simulated interview loops and performance scores
          </p>
        </div>
        <Link
          to="/history"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
        >
          <span>View All History</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="p-0">
        {interviews.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111827]">No interviews completed yet</p>
              <p className="text-xs text-[#64748B] mt-0.5 max-w-sm mx-auto">
                Start your first AI mock interview to generate structured evaluation reports and track your skill growth.
              </p>
            </div>
            <Link
              to="/interview/setup"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] bg-[#2563EB] text-white text-xs font-medium hover:bg-[#1D4ED8] transition-colors shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Start First Interview</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] text-[#64748B] border-b border-[#E5E7EB] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-6 py-3.5">Target Role</th>
                  <th className="px-6 py-3.5">Loop Type</th>
                  <th className="px-6 py-3.5">Difficulty</th>
                  <th className="px-6 py-3.5">Score</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5 text-right">Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] text-[#4B5563]">
                {interviews.map((item) => {
                  const scoreNum = Number(item.score);
                  const isCompleted = item.status === 'completed';

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-semibold text-[#111827]">
                        {item.role}
                      </td>
                      <td className="px-6 py-4">
                        <span className="capitalize text-slate-700 font-medium">
                          {item.interview_type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 border border-[#E5E7EB] capitalize">
                          {item.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {isCompleted && item.score != null ? (
                          <span
                            className={`font-mono font-semibold px-2.5 py-0.5 rounded-full border text-xs ${
                              scoreNum >= 80
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : scoreNum >= 65
                                ? 'bg-blue-50 text-[#2563EB] border-blue-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            {scoreNum}%
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-[#2563EB] border border-blue-200 flex items-center gap-1 w-fit">
                            <Clock className="w-3 h-3" />
                            <span>In Progress</span>
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-[#64748B]">
                        {formatDate(item.started_at)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {isCompleted ? (
                          <Link
                            to={`/interview/${item.id}/result`}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-[5px] border border-[#E5E7EB] text-[#111827] bg-white hover:bg-slate-50 text-xs font-medium transition-colors"
                          >
                            <span>View</span>
                            <ArrowRight className="w-3 h-3 text-[#64748B]" />
                          </Link>
                        ) : (
                          <Link
                            to={`/interview/${item.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-[5px] bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-xs font-medium transition-colors"
                          >
                            <span>Resume</span>
                            <Play className="w-3 h-3 fill-white" />
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
