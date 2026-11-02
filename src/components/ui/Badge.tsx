import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'brand' | 'success' | 'warning' | 'danger' | 'purple' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}) => {
  const variants = {
    default:
      'bg-[#060317] text-[#f4f0ff] border-white/10 shadow-[inset_0_0_12px_rgba(255,255,255,0.03)]',
    brand:
      'bg-[#060317] text-[#9382ff] border-[#5046e4]/40 shadow-[inset_0_-7px_11px_rgba(164,143,255,0.12)]',
    success:
      'bg-[#060317] text-emerald-300 border-emerald-500/30 shadow-[inset_0_-7px_11px_rgba(16,185,129,0.12)]',
    warning:
      'bg-[#060317] text-amber-300 border-amber-500/30 shadow-[inset_0_-7px_11px_rgba(245,158,11,0.12)]',
    danger:
      'bg-[#060317] text-rose-300 border-rose-500/30 shadow-[inset_0_-7px_11px_rgba(244,63,94,0.12)]',
    purple:
      'bg-[#060317] text-[#9382ff] border-[#9382ff]/40 shadow-[inset_0_-7px_11px_rgba(164,143,255,0.12)]',
    outline: 'border border-white/15 text-[#a8a6b7] bg-transparent',
  };

  const sizes = {
    sm: 'text-[11px] px-2.5 py-0.5 rounded-[32px]',
    md: 'text-xs px-3 py-1 rounded-[32px]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 border border-transparent select-none font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
