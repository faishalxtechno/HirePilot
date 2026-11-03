import React, { useState } from 'react';
import { Briefcase, Building2, Bookmark, Check, Plus, ArrowUpRight } from 'lucide-react';
import { JobApplication } from './ApplicationTrackerOverview';

interface CuratedJob {
  id: string;
  title: string;
  company: string;
  salary: string;
  tags: string[];
  snippet: string;
  logoBg: string;
}

const CURATED_JOBS: CuratedJob[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Engineer',
    company: 'Linear',
    salary: '$145,000 / year',
    tags: ['4+ yr exp', 'Full-time', 'Remote'],
    snippet: 'Help build ultra-fast, responsive web interfaces with React, TypeScript and WebGL graphics.',
    logoBg: 'bg-violet-600',
  },
  {
    id: 'job-2',
    title: 'Full Stack Systems Engineer',
    company: 'Stripe',
    salary: '$160,000 / year',
    tags: ['3+ yr exp', 'Full-time', 'Hybrid'],
    snippet: 'Design resilient distributed payments infrastructure and high-throughput candidate APIs.',
    logoBg: 'bg-blue-600',
  },
  {
    id: 'job-3',
    title: 'AI Platform Engineer',
    company: 'Vercel',
    salary: '$155,000 / year',
    tags: ['3+ yr exp', 'Full-time', 'Remote'],
    snippet: 'Optimize next-generation AI developer tooling, edge execution runtime, and modern web frameworks.',
    logoBg: 'bg-black',
  },
];

const STORAGE_KEY = 'hirepilot_user_applications';

export const RecommendedJobsList: React.FC<{
  onApplicationAdded?: (count: number) => void;
}> = ({ onApplicationAdded }) => {
  const [trackedJobs, setTrackedJobs] = useState<Record<string, boolean>>({});

  const handleTrackJob = (job: CuratedJob) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const apps: JobApplication[] = raw ? JSON.parse(raw) : [];

      // Check if already added
      if (apps.some((a) => a.company === job.company && a.role === job.title)) {
        setTrackedJobs((prev) => ({ ...prev, [job.id]: true }));
        return;
      }

      const newApp: JobApplication = {
        id: `app-curated-${Date.now()}`,
        company: job.company,
        role: job.title,
        stage: 'saved',
        date: new Date().toISOString(),
        notes: `Curated recommendation (${job.salary})`,
      };

      const updated = [newApp, ...apps];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setTrackedJobs((prev) => ({ ...prev, [job.id]: true }));
      if (onApplicationAdded) onApplicationAdded(updated.length);
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="h-full rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
        <div>
          <h3 className="text-sm font-semibold text-[#111827] flex items-center gap-1.5">
            <span>Top Picks for your next role</span>
            <Building2 className="w-3.5 h-3.5 text-[#2563EB]" />
          </h3>
          <p className="text-[11px] text-[#64748B]">
            Curated opportunities aligned with your interview targets
          </p>
        </div>

        <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-[#64748B] border border-[#E5E7EB]">
          3 Curated
        </span>
      </div>

      {/* Jobs List (Image 1 & Image 2 Style) */}
      <div className="my-3 space-y-3">
        {CURATED_JOBS.map((job) => {
          const isTracked = trackedJobs[job.id];
          return (
            <div
              key={job.id}
              className="p-3 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB] hover:bg-slate-50 transition-all space-y-2 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-[6px] ${job.logoBg} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}
                  >
                    {job.company.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#111827] truncate">
                      {job.title}
                    </p>
                    <p className="text-[11px] text-[#64748B] truncate">
                      {job.company}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleTrackJob(job)}
                  disabled={isTracked}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] text-[11px] font-medium transition-all ${
                    isTracked
                      ? 'bg-emerald-50 text-[#16A34A] border border-emerald-200'
                      : 'bg-white hover:bg-blue-50 text-[#111827] hover:text-[#2563EB] border border-[#E5E7EB] shadow-2xs'
                  }`}
                  title={isTracked ? 'Saved to Application Tracker' : 'Add to Pipeline'}
                >
                  {isTracked ? (
                    <>
                      <Check className="w-3 h-3 text-[#16A34A]" />
                      <span>Tracked</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3 text-[#2563EB]" />
                      <span>Track</span>
                    </>
                  )}
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1 text-[10px]">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 rounded-[4px] bg-white border border-[#E5E7EB] text-[#64748B] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Snippet & Salary */}
              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-[#111827] text-[11px]">
                  {job.salary}
                </span>
                <span className="text-[10px] text-[#94A3B8] group-hover:text-[#2563EB] flex items-center gap-0.5 transition-colors">
                  <span>View Details</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-[#64748B]">
        <span>Auto-synced with hiring pipeline</span>
        <span className="font-medium text-[#2563EB]">1-Click Tracking</span>
      </div>
    </div>
  );
};

