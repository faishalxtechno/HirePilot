import React from 'react';
import { Code2, Brain, MessageSquare, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { DashboardPerformance } from '../../types';
import { Link } from 'react-router-dom';

export const PerformanceChart: React.FC<{ performance: DashboardPerformance }> = ({ performance }) => {
  const metrics = [
    {
      label: 'Technical Knowledge',
      score: performance.technicalKnowledge,
      icon: Code2,
      description: 'Domain concepts, system architecture, and best practices',
      color: 'bg-[#2563EB]',
    },
    {
      label: 'Problem Solving',
      score: performance.problemSolving,
      icon: Brain,
      description: 'Algorithmic reasoning, edge cases, and runtime tradeoffs',
      color: 'bg-[#7C3AED]',
    },
    {
      label: 'Communication',
      score: performance.communication,
      icon: MessageSquare,
      description: 'Clarity, conciseness, and structured STAR explanations',
      color: 'bg-[#16A34A]',
    },
    {
      label: 'Answer Quality',
      score: performance.answerQuality,
      icon: CheckCircle2,
      description: 'Depth, completeness, and practical engineering nuances',
      color: 'bg-[#0284C7]',
    },
  ];

  const hasData = metrics.some((m) => m.score > 0);

  return (
    <div className="h-full rounded-[12px] bg-white border border-[#E5E7EB] shadow-2xs p-6 flex flex-col justify-between">
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
          <div>
            <h3 className="text-base font-semibold text-[#111827]">
              Skill Evaluation Breakdown
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Multi-dimensional analysis from Gemini AI evaluations
            </p>
          </div>
          <div className="p-2 rounded-[8px] bg-blue-50 text-[#2563EB] border border-blue-200">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        {!hasData ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-[#64748B] flex items-center justify-center mx-auto">
              <Sparkles className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#111827]">No skill evaluations yet</p>
              <p className="text-xs text-[#64748B] max-w-xs mx-auto mt-1">
                Complete a mock interview to calibrate your technical, problem-solving, and communication scores.
              </p>
            </div>
            <Link
              to="/interview/setup"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] bg-[#2563EB] text-white text-xs font-medium hover:bg-[#1D4ED8] transition-colors"
            >
              Start Diagnostic Interview
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {metrics.map((m) => (
              <div key={m.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <m.icon className="w-4 h-4 text-[#64748B] shrink-0" />
                    <span className="font-medium text-[#111827]">{m.label}</span>
                  </div>
                  <span className="font-mono font-semibold text-[#111827]">{m.score}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${m.color}`}
                    style={{ width: `${Math.min(100, Math.max(0, m.score))}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#64748B]">{m.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {hasData && (
        <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
          <span>Calibrated via Gemini AI</span>
          <Link to="/history" className="text-[#2563EB] hover:underline font-medium">
            View Trends
          </Link>
        </div>
      )}
    </div>
  );
};
