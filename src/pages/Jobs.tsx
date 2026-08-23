import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { jobsService, Job, JobApplication, ApplicationStage } from '../lib/jobsService';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Search,
  Bookmark,
  Building2,
  MapPin,
  CheckCircle2,
  Triangle,
  ArrowRight,
  Check,
  Send,
  Calendar,
  ChevronRight,
  Play,
} from 'lucide-react';

export const JobsPage: React.FC = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedWorkplace, setSelectedWorkplace] = useState<string>('All');

  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [applySuccessMsg, setApplySuccessMsg] = useState<string | null>(null);

  const targetRole = profile?.target_role || 'Software Engineer';

  useEffect(() => {
    loadData();
  }, [searchQuery, selectedRole, selectedWorkplace]);

  const loadData = () => {
    const list = jobsService.getJobs({
      search: searchQuery,
      role: selectedRole,
      workplace: selectedWorkplace,
    });
    setJobs(list);
    setApplications(jobsService.getApplications());
    setSavedJobIds(jobsService.getSavedJobIds());
  };

  const handleApply = (job: Job) => {
    const newApp = jobsService.applyToJob(job);
    setApplications(jobsService.getApplications());
    setApplySuccessMsg(`Application sent to ${job.company} for ${job.title}! Tracked in your applications pipeline.`);
    setTimeout(() => setApplySuccessMsg(null), 5000);
  };

  const handleToggleSave = (jobId: string) => {
    jobsService.toggleSaveJob(jobId);
    setSavedJobIds(jobsService.getSavedJobIds());
  };

  const handleStageChange = (appId: string, stage: ApplicationStage) => {
    jobsService.updateStage(appId, stage);
    setApplications(jobsService.getApplications());
  };

  const roleChips = ['All', 'Frontend', 'Backend', 'Full Stack', 'Software Engineer', 'Machine Learning'];
  const workplaceChips = ['All', 'Remote', 'Hybrid'];

  const stageCounts = {
    applied: applications.filter((a) => a.stage === 'applied').length,
    interviewing: applications.filter((a) => a.stage === 'interviewing').length,
    offer: applications.filter((a) => a.stage === 'offer').length,
    rejected: applications.filter((a) => a.stage === 'rejected').length,
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in pb-12">
        {/* Top Header Card */}
        <Card className="p-5 sm:p-8 bg-[#121212] border-white/10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/5 text-white border border-white/10 flex items-center gap-1">
                  <Triangle className="w-3.5 h-3.5 text-brand-secondary fill-brand-secondary" />
                  AI Matchmaking Engine
                </span>
                <span className="text-xs text-brand-muted">
                  Target: <strong className="text-brand-secondary">{targetRole}</strong>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Career Opportunities & Applications
              </h1>
              <p className="text-xs sm:text-sm text-brand-muted max-w-xl leading-relaxed">
                Discover verified tech roles matched to your skills, apply with 1-tap, and track all your active interview pipelines in one place.
              </p>
            </div>

            {/* Quick Tab Switcher */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black border border-white/10 shrink-0">
              <button
                onClick={() => setActiveTab('jobs')}
                className={`py-2 px-4 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'jobs'
                    ? 'bg-white text-black shadow-md'
                    : 'text-brand-muted hover:text-white'
                }`}
              >
                Explore Jobs
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`py-2 px-4 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'applications'
                    ? 'bg-white text-black shadow-md'
                    : 'text-brand-muted hover:text-white'
                }`}
              >
                <span>Tracker</span>
                <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-mono ${activeTab === 'applications' ? 'bg-black text-white' : 'bg-white/10 text-white'}`}>
                  {applications.length}
                </span>
              </button>
            </div>
          </div>
        </Card>

        {/* Apply Success Alert */}
        {applySuccessMsg && (
          <div className="p-4 rounded-2xl bg-[#0a1f10] border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2.5 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
            <span>{applySuccessMsg}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 1: EXPLORE JOBS                                                       */}
        {/* ========================================================================= */}
        {activeTab === 'jobs' && (
          <div className="space-y-5 animate-fade-in">
            {/* Search & Filters */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  type="text"
                  placeholder="Search by job title, company, or skills (e.g. React, Next.js, Go)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black border border-white/10 text-xs sm:text-sm text-white placeholder:text-brand-muted focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              {/* Role filter chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none">
                {roleChips.map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRole(r)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      selectedRole === r
                        ? 'bg-white text-black border border-white'
                        : 'bg-black text-brand-muted border border-white/10 hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Listings Grid */}
            <div className="space-y-4">
              {jobs.length === 0 ? (
                <Card className="p-8 text-center space-y-3 bg-[#121212] border-white/10">
                  <Briefcase className="w-8 h-8 text-brand-muted mx-auto" />
                  <h3 className="text-sm font-medium text-white">No matching jobs found</h3>
                  <p className="text-xs text-brand-muted">Try changing your search terms or role filters.</p>
                  <Button variant="outline" size="sm" onClick={() => { setSearchQuery(''); setSelectedRole('All'); }}>
                    Clear Filters
                  </Button>
                </Card>
              ) : (
                jobs.map((job) => {
                  const isSaved = savedJobIds.includes(job.id);
                  const isApplied = applications.some((a) => a.jobId === job.id);
                  const matchScore = jobsService.calculateMatchScore(job, targetRole);

                  return (
                    <Card key={job.id} className="p-4 sm:p-6 space-y-4 bg-[#121212] border-white/10 hover:border-white/20 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                          {/* Company Logo */}
                          <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-white font-medium overflow-hidden shrink-0 shadow-sm">
                            {job.companyLogo ? (
                              <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
                            ) : (
                              <Building2 className="w-6 h-6" />
                            )}
                          </div>

                          <div className="space-y-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-sm sm:text-base font-medium text-white">
                                {job.title}
                              </h3>
                              {job.featured && (
                                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-medium">
                                  Featured
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-brand-muted flex flex-wrap items-center gap-2">
                              <span className="font-medium text-white">{job.company}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-brand-muted" />
                                {job.location}
                              </span>
                              <span>•</span>
                              <span className="text-brand-secondary font-mono font-medium">{job.salary}</span>
                            </p>
                          </div>
                        </div>

                        {/* Match score & Bookmark */}
                        <div className="flex items-center gap-2 shrink-0 self-start">
                          <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono font-medium">
                            {matchScore}% Match
                          </span>
                          <button
                            onClick={() => handleToggleSave(job.id)}
                            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                              isSaved
                                ? 'bg-white/10 border-white/20 text-white'
                                : 'bg-black border-white/10 text-brand-muted hover:text-white'
                            }`}
                            title={isSaved ? 'Saved' : 'Save Job'}
                          >
                            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-brand-muted leading-relaxed">
                        {job.description}
                      </p>

                      {/* Skill tags & Apply Action */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/5">
                        <div className="flex flex-wrap gap-1.5">
                          {job.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 rounded-lg bg-black border border-white/10 text-[10px] text-brand-muted font-mono"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <Link
                            to={`/interview/setup?role=${encodeURIComponent(job.targetRoles[0] || targetRole)}&type=technical`}
                            className="w-1/2 sm:w-auto"
                          >
                            <Button variant="outline" size="sm" className="w-full text-xs" leftIcon={<Play className="w-3.5 h-3.5" />}>
                              Practice Interview
                            </Button>
                          </Link>

                          <Button
                            variant={isApplied ? 'secondary' : 'primary'}
                            size="sm"
                            onClick={() => handleApply(job)}
                            disabled={isApplied}
                            leftIcon={isApplied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Send className="w-3.5 h-3.5" />}
                            className={`w-1/2 sm:w-auto text-xs font-medium ${isApplied ? 'text-emerald-400' : ''}`}
                          >
                            {isApplied ? 'Applied' : '1-Tap Apply'}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: APPLICATION TRACKER PIPELINE                                       */}
        {/* ========================================================================= */}
        {activeTab === 'applications' && (
          <div className="space-y-6 animate-fade-in">
            {/* Pipeline Stage Summary Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Card className="p-3.5 sm:p-4 space-y-1 bg-[#121212] border-white/10">
                <span className="text-[11px] font-medium text-brand-muted uppercase tracking-wider">Applied</span>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white">{stageCounts.applied}</div>
              </Card>
              <Card className="p-3.5 sm:p-4 space-y-1 bg-[#121212] border-white/10">
                <span className="text-[11px] font-medium text-brand-muted uppercase tracking-wider">Interviewing</span>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white">{stageCounts.interviewing}</div>
              </Card>
              <Card className="p-3.5 sm:p-4 space-y-1 bg-[#121212] border-white/10">
                <span className="text-[11px] font-medium text-brand-muted uppercase tracking-wider">Offer</span>
                <div className="font-mono text-xl sm:text-2xl font-bold text-brand-secondary">{stageCounts.offer}</div>
              </Card>
              <Card className="p-3.5 sm:p-4 space-y-1 bg-[#121212] border-white/10">
                <span className="text-[11px] font-medium text-brand-muted uppercase tracking-wider">Archived</span>
                <div className="font-mono text-xl sm:text-2xl font-bold text-brand-muted">{stageCounts.rejected}</div>
              </Card>
            </div>

            {/* Active Applications List */}
            <div className="space-y-4">
              {applications.length === 0 ? (
                <Card className="p-8 text-center space-y-3 bg-[#121212] border-white/10">
                  <Briefcase className="w-8 h-8 text-brand-muted mx-auto" />
                  <h3 className="text-sm font-medium text-white">No active applications tracked</h3>
                  <p className="text-xs text-brand-muted">Apply to jobs in the Explore tab to track them here.</p>
                  <Button variant="primary" size="sm" onClick={() => setActiveTab('jobs')}>
                    Explore Jobs
                  </Button>
                </Card>
              ) : (
                applications.map((app) => (
                  <Card key={app.id} className="p-4 sm:p-6 space-y-4 bg-[#121212] border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm sm:text-base font-medium text-white">{app.jobTitle}</h3>
                          <span className="text-xs text-brand-muted">• {app.company}</span>
                        </div>
                        <p className="text-xs text-brand-muted mt-0.5">
                          {app.location} • {app.salary} • Applied {app.appliedDate}
                        </p>
                      </div>

                      {/* Stage dropdown selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-brand-muted">Stage:</span>
                        <select
                          value={app.stage}
                          onChange={(e) => handleStageChange(app.id, e.target.value as ApplicationStage)}
                          className="bg-black border border-white/10 rounded-xl px-3 py-1.5 text-xs font-medium text-white focus:outline-none focus:border-white/30"
                        >
                          <option value="applied">Applied</option>
                          <option value="interviewing">Interviewing</option>
                          <option value="offer">Offer Received</option>
                          <option value="rejected">Archived / Rejected</option>
                        </select>
                      </div>
                    </div>

                    {/* Interview Date alert if scheduled */}
                    {app.interviewDate && (
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-white shrink-0" />
                          <span>Interview Scheduled: <strong>{app.interviewDate}</strong></span>
                        </div>
                        <Link to={`/interview/setup?role=${encodeURIComponent(targetRole)}&type=technical`}>
                          <span className="font-medium text-brand-secondary hover:text-white text-[11px] flex items-center gap-0.5 transition-colors">
                            Practice Round <ArrowRight className="w-3 h-3" />
                          </span>
                        </Link>
                      </div>
                    )}

                    {/* Notes */}
                    {app.notes && (
                      <p className="text-xs text-brand-muted bg-black p-3 rounded-xl border border-white/10">
                        <strong className="text-white">Notes:</strong> {app.notes}
                      </p>
                    )}
                  </Card>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
