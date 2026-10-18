import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'brand' | 'success' | 'warning' | 'danger' | 'purple' | 'outline' | 'figmaMono' | 'figmaTag' | 'figmaIndigo' | 'figmaLilac' | 'figmaLime' | 'figmaAqua';
  size?: 'sm' | 'md' | 'icon';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-brand-dark text-white border-white/10 rounded-full',
    brand: 'bg-white text-black border-transparent rounded-full',
    success: 'bg-white/5 text-white border-white/10 rounded-full',
    warning: 'bg-white/5 text-white border-white/10 rounded-full',
    danger: 'bg-white/5 text-white border-white/10 rounded-full',
    purple: 'bg-white/5 text-white border-white/10 rounded-full',
    outline: 'border border-white/20 text-brand-secondary bg-transparent rounded-full',
    figmaMono: 'font-mono text-xs tracking-[0.04em] text-[#595959] bg-[#e2e2e2]/60 border-transparent rounded-[2px]',
    figmaTag: 'font-sans text-xs font-normal text-black bg-[#e2e2e2] border-transparent rounded-[8px]',
    figmaIndigo: 'font-sans text-xs font-medium text-white bg-[#4d49fc] border-transparent rounded-[50px]',
    figmaLilac: 'font-sans text-xs font-medium text-black bg-[#c4baff] border-transparent rounded-[8px]',
    figmaLime: 'font-sans text-xs font-medium text-black bg-[#e4ff97] border-transparent rounded-[8px]',
    figmaAqua: 'font-sans text-xs font-medium text-black bg-[#c7f8fb] border-transparent rounded-[8px]',
  };

  const sizes = {
    icon: 'text-[10px] px-1.5 py-0.5',
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
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
