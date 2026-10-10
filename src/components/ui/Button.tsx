import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'glass' | 'glassPrimary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7657FF]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer group button-lift active:scale-[0.98] active:translate-y-0.5 transition-all duration-150';

    const variants = {
      primary:
        'bg-gradient-to-b from-[#8367FF] to-[#6340F5] text-white border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_16px_rgba(118,87,255,0.3)] hover:brightness-110 hover:-translate-y-0.5',
      secondary:
        'bg-[#121827] text-[#F7F8FC] hover:bg-[#171F33] hover:text-white border border-[#1E2638] hover:border-[#2D374E] hover:-translate-y-0.5',
      outline:
        'border border-white/15 bg-white/[0.04] backdrop-blur-md hover:bg-white/10 text-white hover:-translate-y-0.5',
      ghost:
        'bg-transparent hover:bg-white/5 text-[#9AA4B7] hover:text-white border border-transparent hover:-translate-y-0.5',
      danger:
        'bg-[#1a0505] text-red-400 hover:bg-[#2a0505] border border-red-500/20 hover:border-red-500/40 hover:-translate-y-0.5',
      glass:
        'glass-btn text-white hover:text-white hover:-translate-y-0.5',
      glassPrimary:
        'glass-primary-btn text-white hover:-translate-y-0.5',
    };

    const sizes = {
      sm: 'text-xs px-4 py-2 min-h-[36px] gap-1.5',
      md: 'text-sm px-5 py-2.5 min-h-[42px] gap-2',
      lg: 'text-base px-8 py-4 min-h-[52px] gap-2 font-semibold',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {!isLoading && leftIcon && <span className="shrink-0 icon-pop">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0 icon-pop">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
