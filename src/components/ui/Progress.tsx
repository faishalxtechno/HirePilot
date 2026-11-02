import React from 'react';
import { cn } from '../../lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  variant?: 'brand' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = 'brand',
  size = 'md',
  showLabel = false,
  className,
  ...props
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const variants = {
    brand: 'bg-[#5046e4] shadow-[0_0_12px_rgba(80,70,228,0.5)]',
    success: 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.4)]',
    warning: 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.4)]',
    danger: 'bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.4)]',
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3.5',
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-medium text-[#f4f0ff]">
          <span>Progress</span>
          <span className="font-mono text-[#9382ff]">{percentage}%</span>
        </div>
      )}
      <div className={cn('w-full bg-[#10093a] border border-white/5 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', variants[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
