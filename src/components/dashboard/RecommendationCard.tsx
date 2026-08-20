import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardRecommendation } from '../../types';

export const RecommendationCard: React.FC<{ recommendation: DashboardRecommendation }> = ({
  recommendation,
}) => {
  return (
    <Card className="relative overflow-hidden border-sky-500/20 bg-gradient-to-br from-sky-500/[0.07] via-[rgba(12,20,37,0.8)] to-[rgba(12,20,37,0.9)] p-6 shadow-glass">
      <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-48 h-48 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            AI Practice Recommendation
          </div>
          <h4 className="text-base font-bold text-white tracking-tight">
            {recommendation.title}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
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
            className="w-full shadow-md shadow-sky-500/20"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Practice {recommendation.targetType.toUpperCase()}
          </Button>
        </Link>
      </div>
    </Card>
  );
};
