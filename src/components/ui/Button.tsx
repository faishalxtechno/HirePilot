import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
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
      'inline-flex items-center justify-center font-medium rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer group button-lift';

    const variants = {
      primary:
        'bg-white text-black border border-white/20 shadow-sm hover:bg-white/90',
      secondary:
        'bg-brand-dark text-brand-secondary hover:bg-[#323234] hover:text-white border border-transparent',
      outline:
        'border border-white/20 bg-transparent hover:bg-white/5 text-brand-secondary hover:text-white',
      ghost:
        'bg-transparent hover:bg-white/5 text-brand-secondary hover:text-white border border-transparent',
      danger:
        'bg-[#1a0505] text-red-400 hover:bg-[#2a0505] border border-red-500/20 hover:border-red-500/40',
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
