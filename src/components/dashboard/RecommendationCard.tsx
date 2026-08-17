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
    <Card className="relative overflow-hidden border-brand-200 dark:border-brand-900/60 bg-gradient-to-br from-brand-50/50 via-white to-brand-50/30 dark:from-brand-950/20 dark:via-slate-900 dark:to-slate-900/80 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            AI Practice Recommendation
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            {recommendation.title}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
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
            className="w-full shadow-md shadow-brand-500/20"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Practice {recommendation.targetType.toUpperCase()}
          </Button>
        </Link>
      </div>
    </Card>
  );
};
