import React from 'react';
import { Card } from '../ui/Card';
import { cn } from '../../lib/utils';
import { CountUp } from '../motion';

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
    brand: 'bg-[#10093a] text-[#9382ff] border border-[#5046e4]/30',
    emerald: 'bg-[#062016] text-emerald-300 border border-emerald-500/30',
    amber: 'bg-[#241705] text-amber-300 border border-amber-500/30',
    purple: 'bg-[#1a0f3d] text-[#ba9cff] border border-[#9382ff]/30',
  };

  return (
    <Card className="p-5 flex flex-col justify-between" hoverable>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-[#a8a6b7]">{title}</p>
          <h3 className="text-2xl font-medium text-[#f4f0ff] mt-1 tracking-tight font-mono">
            <CountUp value={value} duration={1100} />
          </h3>
        </div>
        <div className={cn('p-2.5 rounded-[8px] shrink-0', accentColors[accentColor])}>
          {icon}
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 flex items-center justify-between text-xs pt-2 border-t border-white/10">
          {subtitle && <span className="text-[#918ea0]">{subtitle}</span>}
          {trend && (
            <span
              className={cn(
                'font-medium',
                trend.isPositive ? 'text-emerald-400' : 'text-[#918ea0]'
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
