import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  FileText,
  CheckCircle2,
  Sparkles,
  Layers,
  Code2,
  MessageSquare,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResumeSkillsCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resume' | 'star' | 'technical'>('resume');

  const checklist = [
    {
      title: 'Action-Driven Resume Bullets',
      desc: 'Use the XYZ formula: Accomplished [X] as measured by [Y], by doing [Z].',
      tag: 'Resume',
      checked: true,
    },
    {
      title: 'STAR Story Repository',
      desc: 'Prepare 3 concise stories for challenges, technical trade-offs, and leadership.',
      tag: 'Behavioral',
      checked: true,
    },
    {
      title: 'Complexity Trade-Offs',
      desc: 'State Big-O time and space complexity proactively before coding.',
      tag: 'Technical',
      checked: false,
    },
  ];

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <CardTitle>Career & Resume Readiness</CardTitle>
            <CardDescription>Preparation checklist & interview strategy guide</CardDescription>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-medium w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('resume')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 min-h-[36px] rounded-lg transition-all text-center cursor-pointer ${
              activeTab === 'resume'
                ? 'bg-white dark:bg-slate-900 text-brand-600 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Resume Focus
          </button>
          <button
            onClick={() => setActiveTab('star')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 min-h-[36px] rounded-lg transition-all text-center cursor-pointer ${
              activeTab === 'star'
                ? 'bg-white dark:bg-slate-900 text-brand-600 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            STAR Method
          </button>
          <button
            onClick={() => setActiveTab('technical')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 min-h-[36px] rounded-lg transition-all text-center cursor-pointer ${
              activeTab === 'technical'
                ? 'bg-white dark:bg-slate-900 text-brand-600 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Tech Framework
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {activeTab === 'resume' && (
          <div className="space-y-3 animate-fade-in">
            <div className="p-4 rounded-xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-200/60 dark:border-brand-900/40 text-xs text-brand-900 dark:text-brand-200 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                Resume ATS & Impact Rule:
              </div>
              "Engineered distributed caching layer with Redis, reducing API latency by 45% across 2.5M daily active requests."
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-1">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">1. Impact Metrics</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Quantify outcomes using percentages, throughput, or time saved.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-1">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">2. Relevant Tech Stack</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Align keywords directly with target job requirements.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-1">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">3. Active Verbs</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Start points with Architected, Implemented, or Accelerated.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'star' && (
          <div className="space-y-3 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <Badge variant="brand" size="sm">Situation</Badge>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">Set the scene and provide necessary business context.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <Badge variant="brand" size="sm">Task</Badge>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">Describe the specific goal or technical challenge.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <Badge variant="brand" size="sm">Action</Badge>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">Detail your personal contribution and decisions.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <Badge variant="success" size="sm">Result</Badge>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">Highlight measurable metrics and what you learned.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'technical' && (
          <div className="space-y-3 animate-fade-in">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white">Structured Technical Answer Rubric:</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                1. Clarify constraints → 2. Explain high-level approach → 3. Discuss edge cases & error states → 4. Analyze runtime/memory complexities.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
