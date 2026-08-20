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
    brand: 'bg-gradient-to-r from-sky-500 to-blue-500',
    success: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
    warning: 'bg-gradient-to-r from-amber-500 to-amber-400',
    danger: 'bg-gradient-to-r from-rose-500 to-rose-400',
  };

  const glowColors = {
    brand: 'shadow-[0_0_8px_rgba(56,171,248,0.3)]',
    success: 'shadow-[0_0_8px_rgba(52,211,153,0.3)]',
    warning: 'shadow-[0_0_8px_rgba(251,191,36,0.3)]',
    danger: 'shadow-[0_0_8px_rgba(251,113,133,0.3)]',
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-semibold text-slate-300">
          <span>Progress</span>
          <span className="font-mono">{percentage}%</span>
        </div>
      )}
      <div className={cn('w-full bg-white/[0.06] rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-700 ease-out', variants[variant], glowColors[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
