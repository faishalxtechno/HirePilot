import React from 'react';
import { Sparkles, ArrowRight, Target, CheckCircle2, BookOpen, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardRecommendation, DashboardPerformance } from '../../types';

interface RecommendedStepsCardProps {
  recommendation?: DashboardRecommendation;
  performance?: DashboardPerformance;
  interviewsCount?: number;
}

export const RecommendationCard: React.FC<RecommendedStepsCardProps> = ({
  recommendation,
  performance,
  interviewsCount = 0,
}) => {
  // Generate tailored next steps based on real user data
  const getDynamicSteps = () => {
    if (interviewsCount === 0) {
      return [
        {
          title: 'Complete Your Diagnostic Mock Interview',
          description: 'Establish your baseline score across Technical Accuracy, Problem Solving, and Communication.',
          actionText: 'Start First Session',
          link: '/interview/setup?role=Software%20Engineer&type=technical',
          badge: 'Priority 1',
        },
        {
          title: 'Configure Your Target Role & Experience Level',
          description: 'Set your preferred engineering specialization so AI questions calibrate to your seniority.',
          actionText: 'Update Profile',
          link: '/profile',
          badge: 'Setup',
        },
      ];
    }

    const steps = [];

    // Check lowest evaluation dimension if performance data exists
    if (performance) {
      const { technicalKnowledge, problemSolving, communication, answerQuality } = performance;
      const scores = [
        { name: 'Technical Knowledge', score: technicalKnowledge, type: 'technical', role: 'Software Engineer' },
        { name: 'Problem Solving', score: problemSolving, type: 'dsa', role: 'Software Engineer' },
        { name: 'Communication', score: communication, type: 'behavioral', role: 'Engineering Lead' },
        { name: 'Answer Quality', score: answerQuality, type: 'technical', role: 'Full Stack Developer' },
      ];

      scores.sort((a, b) => a.score - b.score);
      const lowest = scores[0];

      if (lowest && lowest.score < 80) {
        steps.push({
          title: `Sharpen Your ${lowest.name} (Currently ${lowest.score}%)`,
          description: `Your ${lowest.name.toLowerCase()} score has the highest potential for growth. Focus on this dimension in your next session.`,
          actionText: `Practice ${lowest.type.toUpperCase()}`,
          link: `/interview/setup?type=${lowest.type}&role=${encodeURIComponent(lowest.role)}`,
          badge: 'Skill Focus',
        });
      }
    }

    if (recommendation) {
      steps.push({
        title: recommendation.title,
        description: recommendation.description,
        actionText: `Practice ${recommendation.targetType.toUpperCase()}`,
        link: `/interview/setup?role=${encodeURIComponent(recommendation.targetRole)}&type=${recommendation.targetType}`,
        badge: 'Recommended',
      });
    }

    if (steps.length === 0) {
      steps.push({
        title: 'Maintain Your Consistent Practice Streak',
        description: 'Take a challenging mock session this week to keep your explanations sharp and fluid under pressure.',
        actionText: 'Start Next Session',
        link: '/interview/setup',
        badge: 'Ongoing',
      });
    }

    return steps.slice(0, 2);
  };

  const steps = getDynamicSteps();

  return (
    <div className="rounded-[12px] bg-white border border-[#E5E7EB] shadow-2xs p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-[6px] bg-blue-50 text-[#2563EB] border border-blue-200">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#111827]">
              Recommended Next Steps
            </h3>
            <p className="text-xs text-[#64748B]">
              Personalized guidance derived from your actual session performance
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="p-4 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB] hover:border-slate-300 transition-colors flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  {step.badge}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-[#111827]">
                {step.title}
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="pt-1">
              <Link
                to={step.link}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] bg-white border border-[#E5E7EB] text-xs font-semibold text-[#111827] hover:bg-slate-50 hover:text-[#2563EB] transition-colors shadow-2xs"
              >
                <span>{step.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
