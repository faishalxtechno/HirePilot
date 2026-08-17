import React from 'react';
import { Card } from '../ui/Card';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  accentColor?: 'brand' | 'emerald' | 'amber' | 'purple';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  accentColor = 'brand',
}) => {
  const accentColors = {
    brand: 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400',
  };

  return (
    <Card className="p-5 flex flex-col justify-between" hoverable>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight font-mono">
            {value}
          </h3>
        </div>
        <div className={cn('p-2.5 rounded-xl shrink-0', accentColors[accentColor])}>
          {icon}
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800/80">
          {subtitle && <span className="text-slate-500 dark:text-slate-400">{subtitle}</span>}
          {trend && (
            <span
              className={cn(
                'font-semibold',
                trend.isPositive ? 'text-emerald-600' : 'text-slate-500'
              )}
            >
              {trend.value}
            </span>
          )}
        </div>
      )}
    </Card>
  );
};
