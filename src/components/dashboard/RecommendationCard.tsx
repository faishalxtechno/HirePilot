import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Sparkles, ArrowRight, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardRecommendation } from '../../types';

export const RecommendationCard: React.FC<{ recommendation: DashboardRecommendation }> = ({
  recommendation,
}) => {
  return (
    <Card className="relative overflow-hidden border border-white/10 bg-[#060317] shadow-[inset_0_0_24px_rgba(255,255,255,0.04)] p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[32px] bg-[#10093a] text-[#9382ff] border border-[#5046e4]/40 text-xs font-medium shadow-[inset_0_-7px_11px_rgba(164,143,255,0.12)]">
            <Sparkles className="w-3.5 h-3.5" />
            AI Practice Recommendation
          </div>
          <h4 className="text-base font-medium text-[#f4f0ff] tracking-tight">
            {recommendation.title}
          </h4>
          <p className="text-xs text-[#a8a6b7] leading-relaxed">
            {recommendation.description}
          </p>
        </div>

        <Link
          to={`/interview/setup?role=${encodeURIComponent(recommendation.targetRole)}&type=${recommendation.targetType}`}
          className="shrink-0 w-full sm:w-auto"
        >
          <Button
            variant="primary"
            size="md"
            className="w-full"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Practice {recommendation.targetType.toUpperCase()}
          </Button>
        </Link>
      </div>
    </Card>
  );
};
