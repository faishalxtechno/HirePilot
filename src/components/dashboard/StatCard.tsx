import React from 'react';
import { TiltCard } from '../ui/TiltCard';
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
    brand: 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-[0_0_12px_rgba(56,171,248,0.15)]',
    emerald: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_12px_rgba(52,211,153,0.15)]',
    amber: 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_12px_rgba(251,191,36,0.15)]',
    purple: 'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_12px_rgba(192,132,252,0.15)]',
  };

  return (
    <TiltCard className="p-5 flex flex-col justify-between glass-surface-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1 tracking-tight font-mono">
            {value}
          </h3>
        </div>
        <div className={cn('p-2.5 rounded-xl shrink-0 layer-icon', accentColors[accentColor])}>
          {icon}
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 flex items-center justify-between text-xs pt-2.5 border-t border-white/[0.06]">
          {subtitle && <span className="text-slate-500">{subtitle}</span>}
          {trend && (
            <span
              className={cn(
                'font-semibold',
                trend.isPositive ? 'text-emerald-400' : 'text-slate-400'
              )}
            >
              {trend.value}
            </span>
          )}
        </div>
      )}
    </TiltCard>
  );
};
