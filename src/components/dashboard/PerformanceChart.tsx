import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Code2, Brain, MessageSquare, CheckCircle2, TrendingUp } from 'lucide-react';
import { Progress } from '../ui/Progress';
import { DashboardPerformance } from '../../types';

export const PerformanceChart: React.FC<{ performance: DashboardPerformance }> = ({ performance }) => {
  const metrics = [
    {
      label: 'Technical Knowledge',
      score: performance.technicalKnowledge,
      icon: Code2,
      description: 'Domain concepts, syntax accuracy, and best practices',
      variant: 'brand' as const,
    },
    {
      label: 'Problem Solving',
      score: performance.problemSolving,
      icon: Brain,
      description: 'Algorithmic approach, edge case handling, and tradeoffs',
      variant: 'purple' as const,
    },
    {
      label: 'Communication',
      score: performance.communication,
      icon: MessageSquare,
      description: 'Clarity, conciseness, and structured STAR explanations',
      variant: 'success' as const,
    },
    {
      label: 'Answer Quality',
      score: performance.answerQuality,
      icon: CheckCircle2,
      description: 'Depth, completeness, and practical real-world insight',
      variant: 'brand' as const,
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Skill Breakdown</CardTitle>
            <CardDescription>Multi-dimensional analysis across all mock interviews</CardDescription>
          </div>
          <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <m.icon className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">{m.label}</span>
              </div>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{m.score}%</span>
            </div>
            <Progress value={m.score} variant={m.variant === 'purple' ? 'brand' : m.variant} size="md" />
            <p className="text-[11px] text-slate-400 dark:text-slate-500">{m.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
