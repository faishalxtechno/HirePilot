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
    default: 'bg-brand-dark text-white border-white/10',
    brand: 'bg-white text-black border-transparent',
    success: 'bg-white/5 text-white border-white/10',
    warning: 'bg-white/5 text-white border-white/10',
    danger: 'bg-white/5 text-white border-white/10',
    purple: 'bg-white/5 text-white border-white/10',
    outline: 'border border-white/20 text-brand-secondary bg-transparent',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium rounded-full',
    md: 'text-xs px-2.5 py-1 font-medium rounded-full',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 border select-none',
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
