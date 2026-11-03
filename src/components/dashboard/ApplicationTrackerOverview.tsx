import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, CheckCircle2, Clock, ChevronRight, X, ExternalLink, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';

export type ApplicationStage = 'saved' | 'applied' | 'assessment' | 'interview' | 'offer' | 'rejected';

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  stage: ApplicationStage;
  date: string;
  notes?: string;
}

const STORAGE_KEY = 'hirepilot_user_applications';

export const ApplicationTrackerOverview: React.FC<{ onCountChange?: (count: number) => void }> = ({ onCountChange }) => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [stage, setStage] = useState<ApplicationStage>('applied');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setApplications(parsed);
        if (onCountChange) onCountChange(parsed.length);
      } else {
        // Starter applications
        const sample: JobApplication[] = [
          {
            id: 'app-1',
            company: 'Stripe',
            role: 'Full Stack Systems Engineer',
            stage: 'interview',
            date: new Date(Date.now() - 86400000 * 2).toISOString(),
            notes: 'System design loop scheduled',
          },
          {
            id: 'app-2',
            company: 'Linear',
            role: 'Senior Frontend Engineer',
            stage: 'assessment',
            date: new Date(Date.now() - 86400000 * 4).toISOString(),
            notes: 'Take-home assessment submitted',
          },
          {
            id: 'app-3',
            company: 'Vercel',
            role: 'AI Platform Engineer',
            stage: 'applied',
            date: new Date(Date.now() - 86400000 * 7).toISOString(),
            notes: 'Application submitted via referral',
          },
        ];
        setApplications(sample);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sample));
        if (onCountChange) onCountChange(sample.length);
      }
    } catch {
      // safe fallback
    }
  }, []);

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      company: company.trim(),
      role: role.trim(),
      stage,
      date: new Date().toISOString(),
      notes: notes.trim() || undefined,
    };

    const updated = [newApp, ...applications];
    setApplications(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (onCountChange) onCountChange(updated.length);

    setCompany('');
    setRole('');
    setNotes('');
    setIsAddModalOpen(false);
  };

  const stageConfig: Record<ApplicationStage, { label: string; bg: string; text: string; border: string }> = {
    saved: { label: 'Saved', bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' },
    applied: { label: 'Applied', bg: 'bg-blue-50', text: 'text-[#2563EB]', border: 'border-blue-200' },
    assessment: { label: 'Assessment', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    interview: { label: 'Interview', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    offer: { label: 'Offer', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    rejected: { label: 'Archived', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  };

  const stages: ApplicationStage[] = ['saved', 'applied', 'assessment', 'interview', 'offer', 'rejected'];

  // Trend bars mock distribution across 30 days (Image 1 CareerHero style)
  const trendPeriods = [
    { label: '1-4', total: 16, awaiting: 10, response: 4, rejected: 2 },
    { label: '5-8', total: 48, awaiting: 28, response: 14, rejected: 6 },
    { label: '9-12', total: 42, awaiting: 22, response: 15, rejected: 5 },
    { label: '13-16', total: 45, awaiting: 26, response: 14, rejected: 5 },
    { label: '17-20', total: 50, awaiting: 30, response: 15, rejected: 5 },
    { label: '21-24', total: 18, awaiting: 10, response: 6, rejected: 2 },
    { label: '25-28', total: 11, awaiting: 6, response: 3, rejected: 2 },
    { label: '29-31', total: 20, awaiting: 12, response: 6, rejected: 2 },
  ];

  return (
    <div className="rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F1F5F9]">
        <div>
          <h3 className="text-base font-semibold text-[#111827] flex items-center gap-2">
            <span>Application Trends &amp; Pipeline</span>
            <TrendingUp className="w-4 h-4 text-[#2563EB]" />
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Monitor hiring cycles, response velocity, and interview rounds
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[6px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Application</span>
          </button>
        </div>
      </div>

      {/* Application Trends Stacked Chart (Inspired by Image 1 CareerHero) */}
      <div className="p-4 rounded-[12px] bg-[#F8FAFC] border border-[#E5E7EB] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-[#111827]">Application Volume</span>
            <span className="text-xs font-mono font-bold text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              +24% vs last month
            </span>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center gap-4 text-[11px] text-[#64748B]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
              <span>Awaiting response</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span>Interview loop</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]" />
              <span>Archived</span>
            </span>
          </div>
        </div>

        {/* Stacked Bars */}
        <div className="grid grid-cols-8 gap-2 items-end pt-4 h-32 px-1">
          {trendPeriods.map((period, idx) => {
            const heightFactor = (period.total / 50) * 100;
            return (
              <div key={idx} className="flex flex-col items-center gap-1 h-full justify-end group">
                <span className="text-[10px] font-mono text-[#64748B] group-hover:font-bold transition-all">
                  {period.total}
                </span>

                {/* Stacked bar container */}
                <div
                  className="w-full max-w-[28px] rounded-[6px] overflow-hidden flex flex-col justify-end bg-slate-200/60 transition-all duration-300 group-hover:scale-105"
                  style={{ height: `${Math.max(25, heightFactor)}%` }}
                >
                  {/* Pink top */}
                  <div
                    className="w-full bg-[#F43F5E]"
                    style={{ height: `${(period.rejected / period.total) * 100}%` }}
                  />
                  {/* Green middle */}
                  <div
                    className="w-full bg-[#10B981]"
                    style={{ height: `${(period.response / period.total) * 100}%` }}
                  />
                  {/* Blue base */}
                  <div
                    className="w-full bg-[#3B82F6]"
                    style={{ height: `${(period.awaiting / period.total) * 100}%` }}
                  />
                </div>

                <span className="text-[10px] font-medium text-[#94A3B8]">
                  {period.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage Breakdown Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {stages.map((stg) => {
          const count = applications.filter((a) => a.stage === stg).length;
          const conf = stageConfig[stg];
          return (
            <div
              key={stg}
              className={`p-2.5 rounded-[10px] ${conf.bg} border ${conf.border} text-center space-y-0.5`}
            >
              <span className={`text-[11px] font-medium ${conf.text} block`}>
                {conf.label}
              </span>
              <span className={`text-base font-bold font-mono ${conf.text}`}>
                {count}
              </span>
            </div>
          );
        })}
      </div>

      {/* Application List */}
      <div className="space-y-3">
        {applications.length === 0 ? (
          <div className="py-8 text-center space-y-2">
            <p className="text-sm font-medium text-[#111827]">No applications tracked yet</p>
            <p className="text-xs text-[#64748B]">
              Add your target companies to track interview stages, take-homes, and feedback.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#F1F5F9] border-t border-[#F1F5F9]">
            {applications.slice(0, 5).map((app) => {
              const conf = stageConfig[app.stage];
              return (
                <div
                  key={app.id}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/70 px-2 rounded-[8px] transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#111827] truncate">
                        {app.company}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${conf.bg} ${conf.text} ${conf.border}`}>
                        {conf.label}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5 truncate">
                      {app.role} {app.notes && `• ${app.notes}`}
                    </p>
                  </div>

                  <span className="text-[11px] font-mono text-[#94A3B8] shrink-0">
                    {new Date(app.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Application Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-[14px] border border-[#E5E7EB] shadow-xl p-6 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <h4 className="text-base font-semibold text-[#111827]">
                Track New Application
              </h4>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#64748B] hover:text-[#111827]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddApplication} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-medium text-[#111827] mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stripe, Linear, Google"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-[6px] border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#111827] mb-1">
                  Target Role
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend Engineer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-[6px] border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#111827] mb-1">
                  Current Pipeline Stage
                </label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value as ApplicationStage)}
                  className="w-full px-3 py-2 rounded-[6px] border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  <option value="saved">Saved</option>
                  <option value="applied">Applied</option>
                  <option value="assessment">Technical Assessment</option>
                  <option value="interview">Interview Loop</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#111827] mb-1">
                  Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Recruiter phone screen on Thursday"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-[6px] border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-[6px] border border-[#E5E7EB] text-[#64748B] hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-[6px] bg-[#2563EB] text-white hover:bg-[#1D4ED8] font-medium"
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
