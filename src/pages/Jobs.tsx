import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { jobsService, Job, JobApplication, ApplicationStage, JobMatchBreakdown } from '../lib/jobsService';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { TiltCard } from '../components/ui/TiltCard';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Search,
  Bookmark,
  Building2,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Check,
  Send,
  Calendar,
  ChevronRight,
  Play,
  Trash2,
  Info,
  Edit2,
  AlertTriangle,
  Target,
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

  // Match details modal state
  const [inspectingMatch, setInspectingMatch] = useState<{ job: Job; breakdown: JobMatchBreakdown } | null>(null);

  // Note editing state
  const [editingNotesAppId, setEditingNotesAppId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState<string>('');

  const targetRole = profile?.target_role || 'Software Engineer';

  useEffect(() => {
    if (profile?.id) {
      loadData();
    }
  }, [searchQuery, selectedRole, selectedWorkplace, profile?.id]);

  const loadData = async () => {
    const list = jobsService.getJobs({
      search: searchQuery,
      role: selectedRole,
      workplace: selectedWorkplace,
    });
    setJobs(list);
    
    if (profile?.id) {
      const apps = await jobsService.getApplications(profile.id);
      setApplications(apps);
      
      const saved = await jobsService.getSavedJobIds(profile.id);
      setSavedJobIds(saved);
    }
  };

  const handleApply = async (job: Job) => {
    if (!profile?.id) return;
    await jobsService.applyToJob(profile.id, job);
    const updatedApps = await jobsService.getApplications(profile.id);
    setApplications(updatedApps);
    setApplySuccessMsg(`Application sent to ${job.company} for ${job.title}! Tracked in your applications pipeline.`);
    setTimeout(() => setApplySuccessMsg(null), 5000);
  };

  const handleToggleSave = async (jobId: string) => {
    if (!profile?.id) return;
    await jobsService.toggleSaveJob(profile.id, jobId);
    const updatedSaved = await jobsService.getSavedJobIds(profile.id);
    setSavedJobIds(updatedSaved);
  };

  const handleStageChange = async (appId: string, stage: ApplicationStage) => {
    if (!profile?.id) return;
    await jobsService.updateStage(profile.id, appId, stage);
    const updatedApps = await jobsService.getApplications(profile.id);
    setApplications(updatedApps);
  };

  const handleDeleteApplication = async (appId: string) => {
    if (!profile?.id) return;
    await jobsService.deleteApplication(profile.id, appId);
    const updatedApps = await jobsService.getApplications(profile.id);
    setApplications(updatedApps);
  };

  const handleSaveNotes = async (appId: string) => {
    if (!profile?.id) return;
    await jobsService.updateNotes(profile.id, appId, notesDraft);
    setEditingNotesAppId(null);
    const updatedApps = await jobsService.getApplications(profile.id);
    setApplications(updatedApps);
  };

  const roleChips = ['All', 'Frontend', 'Backend', 'Full Stack', 'Software Engineer', 'Machine Learning'];
  const workplaceChips = ['All', 'Remote', 'Hybrid'];

  const stageCounts = {
    saved: applications.filter((a) => a.stage === 'saved').length,
    applied: applications.filter((a) => a.stage === 'applied').length,
    assessment: applications.filter((a) => a.stage === 'assessment').length,
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
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/5 text-white border border-white/10 flex items-center gap-1.5">
                  <img src="/assets/hirepilot-logo.png" alt="" className="w-3.5 h-3.5 object-contain" />
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
                    <TiltCard key={job.id} maxRotation={2} className="p-4 sm:p-6 space-y-4 bg-[#121212] border-white/10 hover:border-white/20 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                          {/* Company Logo */}
                          <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-white font-medium overflow-hidden shrink-0 shadow-sm layer-icon">
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
                          <button
                            type="button"
                            onClick={() => setInspectingMatch({ job, breakdown: jobsService.getJobMatchBreakdown(job, targetRole) })}
                            className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                            title="Click for transparent match breakdown"
                          >
                            <span>{matchScore}% Match</span>
                            <Info className="w-3 h-3 text-brand-muted" />
                          </button>
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
                    </TiltCard>
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
            {/* Pipeline Stage Summary Counters (6 Stages) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <Card className="p-3.5 space-y-1 bg-[#121212] border-white/10">
                <span className="text-[10px] font-medium text-brand-muted uppercase tracking-wider">Saved</span>
                <div className="font-mono text-xl font-bold text-white">{stageCounts.saved}</div>
              </Card>
              <Card className="p-3.5 space-y-1 bg-[#121212] border-white/10">
                <span className="text-[10px] font-medium text-brand-muted uppercase tracking-wider">Applied</span>
                <div className="font-mono text-xl font-bold text-white">{stageCounts.applied}</div>
              </Card>
              <Card className="p-3.5 space-y-1 bg-[#121212] border-white/10">
                <span className="text-[10px] font-medium text-brand-muted uppercase tracking-wider">Assessment</span>
                <div className="font-mono text-xl font-bold text-sky-400">{stageCounts.assessment}</div>
              </Card>
              <Card className="p-3.5 space-y-1 bg-[#121212] border-white/10">
                <span className="text-[10px] font-medium text-brand-muted uppercase tracking-wider">Interviewing</span>
                <div className="font-mono text-xl font-bold text-amber-400">{stageCounts.interviewing}</div>
              </Card>
              <Card className="p-3.5 space-y-1 bg-[#121212] border-white/10">
                <span className="text-[10px] font-medium text-brand-muted uppercase tracking-wider">Offer</span>
                <div className="font-mono text-xl font-bold text-emerald-400">{stageCounts.offer}</div>
              </Card>
              <Card className="p-3.5 space-y-1 bg-[#121212] border-white/10">
                <span className="text-[10px] font-medium text-brand-muted uppercase tracking-wider">Archived</span>
                <div className="font-mono text-xl font-bold text-brand-muted">{stageCounts.rejected}</div>
              </Card>
            </div>

            {/* Active Applications List */}
            <div className="space-y-4">
              {applications.length === 0 ? (
                <Card className="p-8 text-center space-y-3 bg-[#121212] border-white/10">
                  <Briefcase className="w-8 h-8 text-brand-muted mx-auto" />
                  <h3 className="text-sm font-medium text-white">No active applications tracked</h3>
                  <p className="text-xs text-brand-muted">Apply to jobs in the Explore tab or save roles to track them across all 6 pipeline stages.</p>
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
                          {app.location} • {app.salary} • Added {app.appliedDate}
                        </p>
                      </div>

                      {/* Stage dropdown selector & Actions */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-brand-muted">Stage:</span>
                        <select
                          value={app.stage}
                          onChange={(e) => handleStageChange(app.id, e.target.value as ApplicationStage)}
                          className="bg-black border border-white/10 rounded-xl px-3 py-1.5 text-xs font-medium text-white focus:outline-none focus:border-white/30"
                        >
                          <option value="saved">Saved</option>
                          <option value="applied">Applied</option>
                          <option value="assessment">Online Assessment</option>
                          <option value="interviewing">Interviewing</option>
                          <option value="offer">Offer Received 🎉</option>
                          <option value="rejected">Archived / Rejected</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => handleDeleteApplication(app.id)}
                          className="p-1.5 rounded-lg border border-white/10 hover:border-red-500/30 text-brand-muted hover:text-red-400 transition-colors"
                          title="Delete application record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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

                    {/* Notes Section with In-place Editing */}
                    <div className="bg-black/60 p-3 rounded-xl border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-white flex items-center gap-1.5">
                          <Edit2 className="w-3 h-3 text-brand-muted" /> Application Notes
                        </span>
                        {editingNotesAppId !== app.id && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingNotesAppId(app.id);
                              setNotesDraft(app.notes || '');
                            }}
                            className="text-[11px] text-brand-muted hover:text-white transition-colors"
                          >
                            {app.notes ? 'Edit' : '+ Add Note'}
                          </button>
                        )}
                      </div>

                      {editingNotesAppId === app.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={notesDraft}
                            onChange={(e) => setNotesDraft(e.target.value)}
                            placeholder="Recruiter contact, referral details, salary range, interview rounds..."
                            className="w-full text-xs p-2 rounded-lg bg-black border border-white/20 text-white placeholder:text-brand-muted focus:outline-none focus:border-white/40 resize-none h-20"
                          />
                          <div className="flex items-center gap-2 justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs h-7 px-2"
                              onClick={() => setEditingNotesAppId(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="primary"
                              size="sm"
                              className="text-xs h-7 px-3"
                              onClick={() => handleSaveNotes(app.id)}
                            >
                              Save Notes
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-brand-muted">
                          {app.notes || <span className="italic text-white/40">No notes added yet. Record referral names, salary notes, or round schedules.</span>}
                        </p>
                      )}
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: TRANSPARENT AI JOB MATCH BREAKDOWN                                 */}
        {/* ========================================================================= */}
        {inspectingMatch && (
          <Modal
            isOpen={true}
            onClose={() => setInspectingMatch(null)}
            title={`Match Breakdown: ${inspectingMatch.job.title}`}
          >
            <div className="space-y-5 text-left">
              {/* Header Score Overview */}
              <div className="p-4 rounded-2xl bg-black border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-brand-muted">{inspectingMatch.job.company}</div>
                  <div className="text-sm font-semibold text-white">{inspectingMatch.job.location}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-2xl font-bold text-white">
                    {inspectingMatch.breakdown.overallScore}%
                  </div>
                  <div className="text-[10px] text-brand-muted uppercase tracking-wider">Overall Match</div>
                </div>
              </div>

              {/* Criteria Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                  Scoring Criteria (Transparent Rubric)
                </h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs text-white mb-1">
                      <span>Target Role Alignment</span>
                      <span className="font-mono">{inspectingMatch.breakdown.criteria.roleAlignment}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${inspectingMatch.breakdown.criteria.roleAlignment}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-white mb-1">
                      <span>Technical Skills Overlap</span>
                      <span className="font-mono">{inspectingMatch.breakdown.criteria.skillsMatch}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 rounded-full"
                        style={{ width: `${inspectingMatch.breakdown.criteria.skillsMatch}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-white mb-1">
                      <span>Experience Level Fit</span>
                      <span className="font-mono">{inspectingMatch.breakdown.criteria.experienceLevel}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-400 rounded-full"
                        style={{ width: `${inspectingMatch.breakdown.criteria.experienceLevel}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Matched vs Missing Skills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
                  <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Matched Skills ({inspectingMatch.breakdown.matchedSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {inspectingMatch.breakdown.matchedSkills.length > 0 ? (
                      inspectingMatch.breakdown.matchedSkills.map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-[10px] text-emerald-300 font-mono">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-brand-muted italic">Add profile skills to match.</span>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-1.5">
                  <span className="text-xs font-medium text-amber-400 flex items-center gap-1">
                    <Target className="w-3.5 h-3.5" /> Target Skills to Highlight ({inspectingMatch.breakdown.missingSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {inspectingMatch.breakdown.missingSkills.map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded bg-amber-500/10 text-[10px] text-amber-300 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ATS Keywords & Recommendations */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                  Actionable Recommendations
                </span>
                <ul className="space-y-1.5 text-xs text-brand-muted">
                  {inspectingMatch.breakdown.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-white font-bold">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Transparent Disclaimer */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-brand-muted flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{inspectingMatch.breakdown.disclaimer}</span>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInspectingMatch(null)}
                >
                  Close
                </Button>
                <Link to={`/interview/setup?role=${encodeURIComponent(inspectingMatch.job.targetRoles[0] || targetRole)}&type=technical`}>
                  <Button variant="primary" size="sm" leftIcon={<Play className="w-3.5 h-3.5" />}>
                    Practice for this Role
                  </Button>
                </Link>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </DashboardLayout>
  );
};
