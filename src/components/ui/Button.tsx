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
      'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer will-change-transform';

    const variants = {
      primary:
        'bg-white text-black hover:-translate-y-[1px] hover:scale-[1.02] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_22px_rgba(255,255,255,0.32),0_0_44px_rgba(255,255,255,0.12)] border border-transparent',
      secondary:
        'bg-brand-dark text-brand-secondary hover:bg-[#323234] hover:text-white border border-transparent hover:-translate-y-[1px]',
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
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
