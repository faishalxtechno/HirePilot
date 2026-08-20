import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
  FileText,
  Sparkles,
} from 'lucide-react';

export const ResumeSkillsCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resume' | 'star' | 'technical'>('resume');

  return (
    <Card className="border-white/[0.08]">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <CardTitle>Career & Resume Readiness</CardTitle>
            <CardDescription>Preparation checklist & interview strategy guide</CardDescription>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-1 bg-white/[0.04] p-1 rounded-xl text-xs font-medium w-full sm:w-auto border border-white/[0.06]">
          <button
            onClick={() => setActiveTab('resume')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 min-h-[36px] rounded-lg transition-all text-center cursor-pointer ${
              activeTab === 'resume'
                ? 'bg-sky-500/15 text-sky-300 border border-sky-500/25 shadow-xs font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Resume Focus
          </button>
          <button
            onClick={() => setActiveTab('star')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 min-h-[36px] rounded-lg transition-all text-center cursor-pointer ${
              activeTab === 'star'
                ? 'bg-sky-500/15 text-sky-300 border border-sky-500/25 shadow-xs font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            STAR Method
          </button>
          <button
            onClick={() => setActiveTab('technical')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 min-h-[36px] rounded-lg transition-all text-center cursor-pointer ${
              activeTab === 'technical'
                ? 'bg-sky-500/15 text-sky-300 border border-sky-500/25 shadow-xs font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Tech Framework
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {activeTab === 'resume' && (
          <div className="space-y-3 animate-fade-in">
            <div className="p-4 rounded-xl bg-sky-500/[0.07] border border-sky-500/20 text-xs text-slate-200 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold mb-1 text-sky-300">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                Resume ATS & Impact Rule:
              </div>
              "Engineered distributed caching layer with Redis, reducing API latency by 45% across 2.5M daily active requests."
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                <span className="text-[11px] font-bold text-slate-200">1. Impact Metrics</span>
                <p className="text-[11px] text-slate-400">Quantify outcomes using percentages, throughput, or time saved.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                <span className="text-[11px] font-bold text-slate-200">2. Relevant Tech Stack</span>
                <p className="text-[11px] text-slate-400">Align keywords directly with target job requirements.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                <span className="text-[11px] font-bold text-slate-200">3. Active Verbs</span>
                <p className="text-[11px] text-slate-400">Start points with Architected, Implemented, or Accelerated.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'star' && (
          <div className="space-y-3 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                <Badge variant="brand" size="sm">Situation</Badge>
                <p className="text-[11px] text-slate-400 mt-1">Set the scene and provide necessary business context.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                <Badge variant="brand" size="sm">Task</Badge>
                <p className="text-[11px] text-slate-400 mt-1">Describe the specific goal or technical challenge.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                <Badge variant="brand" size="sm">Action</Badge>
                <p className="text-[11px] text-slate-400 mt-1">Detail your personal contribution and decisions.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                <Badge variant="success" size="sm">Result</Badge>
                <p className="text-[11px] text-slate-400 mt-1">Highlight measurable metrics and what you learned.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'technical' && (
          <div className="space-y-3 animate-fade-in">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300 space-y-1">
              <span className="font-bold text-white">Structured Technical Answer Rubric:</span>
              <p className="text-[11px] text-slate-400">
                1. Clarify constraints → 2. Explain high-level approach → 3. Discuss edge cases & error states → 4. Analyze runtime/memory complexities.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
