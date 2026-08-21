import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { resumeService, ResumeAnalysis, DEFAULT_RESUME_ANALYSIS } from '../lib/resumeService';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Copy,
  Check,
  TrendingUp,
  Target,
  ArrowRight,
  ShieldCheck,
  Layers,
  Wand2,
  FileCheck,
  RefreshCw,
  Search,
} from 'lucide-react';

export const ResumePage: React.FC = () => {
  const { profile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [analysis, setAnalysis] = useState<ResumeAnalysis>(DEFAULT_RESUME_ANALYSIS);
  const [activeTab, setActiveTab] = useState<'overview' | 'keywords' | 'bullets' | 'improvements'>('overview');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const targetRole = profile?.target_role || 'Software Engineer';

  useEffect(() => {
    const saved = resumeService.getAnalysis();
    setAnalysis(saved);
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input
    e.target.value = '';

    setIsAnalyzing(true);
    setUploadSuccess(null);

    try {
      const result = await resumeService.analyzeResume(file, targetRole);
      setAnalysis(result);
      setUploadSuccess(`Successfully evaluated ${file.name}! ATS score updated to ${result.atsScore}%.`);
      setTimeout(() => setUploadSuccess(null), 5000);
    } catch (err) {
      console.error('Error evaluating resume:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const filteredMissingKeywords = analysis.missingKeywords.filter((k) =>
    k.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in pb-12">
        {/* Top Header Card */}
        <Card className="p-5 sm:p-8 bg-gradient-to-r from-[rgba(12,20,37,0.95)] via-[rgba(19,31,58,0.9)] to-[rgba(12,20,37,0.95)] border-white/[0.08] shadow-glass-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-60 h-60 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/25 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  AI ATS Intelligence
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5" />
                  Targeting: <strong className="text-slate-200">{targetRole}</strong>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                AI Resume & ATS Enhancer
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
                Scan your resume against real applicant tracking systems, optimize bullet points with high-impact metrics, and fill critical skill gaps.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="primary"
                size="md"
                onClick={() => fileInputRef.current?.click()}
                isLoading={isAnalyzing}
                leftIcon={<UploadCloud className="w-4 h-4" />}
                className="shadow-lg shadow-sky-500/25 font-bold"
              >
                Upload New Resume
              </Button>
            </div>
          </div>
        </Card>

        {/* Upload Success Alert */}
        {uploadSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2.5 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            <span>{uploadSuccess}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ATS SCORE SUMMARY STRIP                                                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Main Overall ATS Gauge */}
          <Card className="col-span-2 sm:col-span-2 lg:col-span-1 p-4 sm:p-5 flex flex-col items-center justify-center text-center bg-gradient-to-b from-sky-500/10 to-transparent border-sky-500/25">
            <div className="relative w-20 h-20 rounded-full bg-slate-900 border-4 border-sky-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(56,171,248,0.25)] mb-2">
              <span className="font-mono text-2xl font-extrabold text-white">
                {analysis.atsScore}
              </span>
            </div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Overall ATS Score</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {analysis.atsScore >= 80 ? 'Excellent Match' : 'Needs Optimization'}
            </p>
          </Card>

          {/* 4 Category Subscores */}
          <Card className="p-4 space-y-1.5 flex flex-col justify-center">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-400">Keyword Match</span>
              <span className="font-mono font-bold text-sky-400">{analysis.categoryScores.keywords}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-sky-400 rounded-full" style={{ width: `${analysis.categoryScores.keywords}%` }} />
            </div>
            <span className="text-[10px] text-slate-500">Core skills & tooling</span>
          </Card>

          <Card className="p-4 space-y-1.5 flex flex-col justify-center">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-400">Impact & Metrics</span>
              <span className="font-mono font-bold text-emerald-400">{analysis.categoryScores.impact}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${analysis.categoryScores.impact}%` }} />
            </div>
            <span className="text-[10px] text-slate-500">Quantified results</span>
          </Card>

          <Card className="p-4 space-y-1.5 flex flex-col justify-center">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-400">ATS Formatting</span>
              <span className="font-mono font-bold text-purple-400">{analysis.categoryScores.formatting}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-purple-400 rounded-full" style={{ width: `${analysis.categoryScores.formatting}%` }} />
            </div>
            <span className="text-[10px] text-slate-500">Parseable structure</span>
          </Card>

          <Card className="p-4 space-y-1.5 flex flex-col justify-center">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-400">Action Verbs</span>
              <span className="font-mono font-bold text-amber-400">{analysis.categoryScores.actionVerbs}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${analysis.categoryScores.actionVerbs}%` }} />
            </div>
            <span className="text-[10px] text-slate-500">Active phrasing</span>
          </Card>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-x-auto select-none">
          {[
            { id: 'overview', label: 'Overview', icon: FileCheck },
            { id: 'bullets', label: 'AI Bullet Optimizer', icon: Wand2 },
            { id: 'keywords', label: 'Target Keywords', icon: Target },
            { id: 'improvements', label: 'Recommendations', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[120px] sm:min-w-0 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isCurrent
                    ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW & STRENGTHS                                               */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
            {/* Strengths Card */}
            <Card className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">ATS Strengths</h3>
                  <p className="text-[11px] text-slate-400">Elements parsed correctly by screening algorithms</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {analysis.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Improvement Opportunities Card */}
            <Card className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Areas for Improvement</h3>
                  <p className="text-[11px] text-slate-400">Fix these to reach top 5% applicant tier</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {analysis.improvements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <TrendingUp className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: AI BULLET OPTIMIZER                                                */}
        {/* ========================================================================= */}
        {activeTab === 'bullets' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between px-1">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-sky-400" />
                  AI High-Impact Bullet Enhancer
                </h3>
                <p className="text-xs text-slate-400">
                  Transformed using the Google XYZ Formula: Accomplished [X] as measured by [Y], by doing [Z].
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {analysis.bulletPoints.map((bp, i) => (
                <Card key={i} className="p-4 sm:p-6 space-y-4 border-white/[0.08]">
                  {/* Original Bullet */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      Original Bullet (Weak / Passive)
                    </span>
                    <p className="text-xs text-slate-400 p-3 rounded-xl bg-rose-500/[0.04] border border-rose-500/15">
                      "{bp.original}"
                    </p>
                  </div>

                  {/* Improved Bullet */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        Optimized AI Bullet (Strong / Quantified)
                      </span>
                      <button
                        onClick={() => handleCopy(bp.improved, i)}
                        className="text-[11px] font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedIndex === i ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Bullet</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs font-medium text-slate-200 p-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/25 leading-relaxed">
                      "{bp.improved}"
                    </p>
                  </div>

                  {/* Reason */}
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                    <span className="font-bold text-sky-400">Why it's better:</span>
                    <span>{bp.reason}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: KEYWORD MATCHER                                                    */}
        {/* ========================================================================= */}
        {activeTab === 'keywords' && (
          <div className="space-y-5 animate-fade-in">
            {/* Search filter */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search keywords for your target role..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500/50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Missing Keywords */}
              <Card className="p-5 space-y-3 border-amber-500/25 bg-amber-500/[0.02]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    Missing Keywords ({analysis.missingKeywords.length})
                  </h3>
                  <span className="text-[10px] text-slate-400">Add to your skills section</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filteredMissingKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold"
                    >
                      + {kw}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Detected Keywords */}
              <Card className="p-5 space-y-3 border-emerald-500/25 bg-emerald-500/[0.02]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Detected Keywords ({analysis.detectedKeywords.length})
                  </h3>
                  <span className="text-[10px] text-slate-400">Successfully parsed</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.detectedKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold"
                    >
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: RECOMMENDATIONS                                                    */}
        {/* ========================================================================= */}
        {activeTab === 'improvements' && (
          <div className="space-y-4 animate-fade-in">
            <Card className="p-5 sm:p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-400" />
                Actionable Resume Checklist
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <span className="font-bold text-white">1. Single-Column Hierarchy</span>
                  <p className="text-slate-400">
                    Always use a single-column layout. Two-column or side-by-side text columns can scramble the reading order in older ATS engines (Workday, Taleo).
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <span className="font-bold text-white">2. Include Relevant System Design Terms</span>
                  <p className="text-slate-400">
                    For roles like {targetRole}, recruiters filter for architectural phrases like "REST APIs", "PostgreSQL indexing", and "Docker containerization".
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <span className="font-bold text-white">3. Practice STAR Method for Experience Bullets</span>
                  <p className="text-slate-400">
                    Structure bullets around Situation, Task, Action, and Result to ensure recruiters immediately see business and engineering value.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
