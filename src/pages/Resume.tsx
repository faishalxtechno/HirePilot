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
  Triangle,
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
        <Card className="p-5 sm:p-8 bg-[#121212] border-white/10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/5 text-white border border-white/10 flex items-center gap-1">
                  <Triangle className="w-3.5 h-3.5 text-brand-secondary fill-brand-secondary" />
                  AI ATS Intelligence
                </span>
                <span className="text-xs text-brand-muted flex items-center gap-1">
                  <Target className="w-3.5 h-3.5" />
                  Targeting: <strong className="text-brand-secondary">{targetRole}</strong>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                AI Resume & ATS Enhancer
              </h1>
              <p className="text-xs sm:text-sm text-brand-muted max-w-xl leading-relaxed">
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
                className=""
              >
                Upload New Resume
              </Button>
            </div>
          </div>
        </Card>

        {/* Upload Success Alert */}
        {uploadSuccess && (
          <div className="p-4 rounded-2xl bg-[#0a1f10] border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2.5 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
            <span>{uploadSuccess}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ATS SCORE SUMMARY STRIP                                                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Main Overall ATS Gauge */}
          <Card className="col-span-2 sm:col-span-2 lg:col-span-1 p-4 sm:p-5 flex flex-col items-center justify-center text-center bg-[#121212] border-white/10">
            <div className="relative w-20 h-20 rounded-full bg-black border-4 border-brand-secondary/40 flex items-center justify-center mb-2">
              <span className="font-mono text-2xl font-bold text-white">
                {analysis.atsScore}
              </span>
            </div>
            <h3 className="text-xs font-medium text-white uppercase tracking-wider">Overall ATS Score</h3>
            <p className="text-[11px] text-brand-muted mt-0.5">
              {analysis.atsScore >= 80 ? 'Excellent Match' : 'Needs Optimization'}
            </p>
          </Card>

          {/* 4 Category Subscores */}
          <Card className="p-4 space-y-1.5 flex flex-col justify-center bg-[#121212] border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-brand-muted">Keyword Match</span>
              <span className="font-mono font-bold text-brand-secondary">{analysis.categoryScores.keywords}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-brand-secondary rounded-full" style={{ width: `${analysis.categoryScores.keywords}%` }} />
            </div>
            <span className="text-[10px] text-brand-muted">Core skills & tooling</span>
          </Card>

          <Card className="p-4 space-y-1.5 flex flex-col justify-center bg-[#121212] border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-brand-muted">Impact & Metrics</span>
              <span className="font-mono font-bold text-white">{analysis.categoryScores.impact}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${analysis.categoryScores.impact}%` }} />
            </div>
            <span className="text-[10px] text-brand-muted">Quantified results</span>
          </Card>

          <Card className="p-4 space-y-1.5 flex flex-col justify-center bg-[#121212] border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-brand-muted">ATS Formatting</span>
              <span className="font-mono font-bold text-white">{analysis.categoryScores.formatting}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${analysis.categoryScores.formatting}%` }} />
            </div>
            <span className="text-[10px] text-brand-muted">Parseable structure</span>
          </Card>

          <Card className="p-4 space-y-1.5 flex flex-col justify-center bg-[#121212] border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-brand-muted">Action Verbs</span>
              <span className="font-mono font-bold text-white">{analysis.categoryScores.actionVerbs}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${analysis.categoryScores.actionVerbs}%` }} />
            </div>
            <span className="text-[10px] text-brand-muted">Active phrasing</span>
          </Card>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black border border-white/10 overflow-x-auto select-none">
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
                className={`flex-1 min-w-[120px] sm:min-w-0 py-2.5 px-3 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isCurrent
                    ? 'bg-white text-black shadow-sm'
                    : 'text-brand-muted hover:text-white'
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
            <Card className="p-5 sm:p-6 space-y-4 bg-[#121212] border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/5 text-white flex items-center justify-center border border-white/10">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">ATS Strengths</h3>
                  <p className="text-[11px] text-brand-muted">Elements parsed correctly by screening algorithms</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-brand-muted">
                {analysis.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-black border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Improvement Opportunities Card */}
            <Card className="p-5 sm:p-6 space-y-4 bg-[#121212] border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/5 text-white flex items-center justify-center border border-white/10">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Areas for Improvement</h3>
                  <p className="text-[11px] text-brand-muted">Fix these to reach top 5% applicant tier</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-brand-muted">
                {analysis.improvements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-black border border-white/10">
                    <TrendingUp className="w-4 h-4 text-white shrink-0 mt-0.5" />
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
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-brand-secondary" />
                  AI High-Impact Bullet Enhancer
                </h3>
                <p className="text-xs text-brand-muted">
                  Transformed using the Google XYZ Formula: Accomplished [X] as measured by [Y], by doing [Z].
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {analysis.bulletPoints.map((bp, i) => (
                <Card key={i} className="p-4 sm:p-6 space-y-4 bg-[#121212] border-white/10">
                  {/* Original Bullet */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-medium text-brand-muted uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-muted" />
                      Original Bullet (Weak / Passive)
                    </span>
                    <p className="text-xs text-brand-muted p-3 rounded-xl bg-black border border-white/10">
                      "{bp.original}"
                    </p>
                  </div>

                  {/* Improved Bullet */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-white uppercase tracking-wider flex items-center gap-1">
                        <Triangle className="w-3.5 h-3.5 text-brand-secondary fill-brand-secondary" />
                        Optimized AI Bullet (Strong / Quantified)
                      </span>
                      <button
                        onClick={() => handleCopy(bp.improved, i)}
                        className="text-[11px] font-medium text-brand-secondary hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {copiedIndex === i ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-500">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Bullet</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs font-medium text-white p-3 rounded-xl bg-white/5 border border-white/10 leading-relaxed">
                      "{bp.improved}"
                    </p>
                  </div>

                  {/* Reason */}
                  <div className="text-[11px] text-brand-muted flex items-center gap-1.5 pt-1">
                    <span className="font-medium text-white">Why it's better:</span>
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
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                type="text"
                placeholder="Search keywords for your target role..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-black border border-white/10 text-xs text-white placeholder:text-brand-muted focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Missing Keywords */}
              <Card className="p-5 space-y-3 bg-[#121212] border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-medium text-white uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-white" />
                    Missing Keywords ({analysis.missingKeywords.length})
                  </h3>
                  <span className="text-[10px] text-brand-muted">Add to your skills section</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filteredMissingKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium"
                    >
                      + {kw}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Detected Keywords */}
              <Card className="p-5 space-y-3 bg-[#121212] border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-medium text-white uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
                    Detected Keywords ({analysis.detectedKeywords.length})
                  </h3>
                  <span className="text-[10px] text-brand-muted">Successfully parsed</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.detectedKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-brand-secondary text-xs font-medium"
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
            <Card className="p-5 sm:p-6 space-y-4 bg-[#121212] border-white/10">
              <h3 className="text-sm font-medium text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-secondary" />
                Actionable Resume Checklist
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-black border border-white/10 space-y-1">
                  <span className="font-medium text-white">1. Single-Column Hierarchy</span>
                  <p className="text-brand-muted">
                    Always use a single-column layout. Two-column or side-by-side text columns can scramble the reading order in older ATS engines (Workday, Taleo).
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-black border border-white/10 space-y-1">
                  <span className="font-medium text-white">2. Include Relevant System Design Terms</span>
                  <p className="text-brand-muted">
                    For roles like {targetRole}, recruiters filter for architectural phrases like "REST APIs", "PostgreSQL indexing", and "Docker containerization".
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-black border border-white/10 space-y-1">
                  <span className="font-medium text-white">3. Practice STAR Method for Experience Bullets</span>
                  <p className="text-brand-muted">
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
