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
          <div className="p-2 rounded-[8px] bg-[#10093a] text-[#9382ff] border border-white/10">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <m.icon className="w-4 h-4 text-[#918ea0] shrink-0" />
                <span className="font-medium text-[#f4f0ff]">{m.label}</span>
              </div>
              <span className="font-mono font-medium text-[#f4f0ff]">{m.score}%</span>
            </div>
            <Progress value={m.score} variant={m.variant === 'purple' ? 'brand' : m.variant} size="md" />
            <p className="text-[11px] text-[#918ea0]">{m.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
