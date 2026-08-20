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
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060b18] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.97] cursor-pointer will-change-transform';

    const variants = {
      primary:
        'bg-gradient-to-b from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-500/25 border border-sky-400/20',
      secondary:
        'bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border border-white/[0.1] hover:border-white/[0.15] backdrop-blur-md',
      outline:
        'border border-white/[0.12] bg-transparent hover:bg-white/[0.05] text-slate-300 hover:text-white hover:border-white/[0.2] backdrop-blur-sm',
      ghost:
        'bg-transparent hover:bg-white/[0.06] text-slate-400 hover:text-white border border-transparent',
      danger:
        'bg-gradient-to-b from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white shadow-md shadow-rose-500/20 border border-rose-400/20',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-2 min-h-[38px] gap-1.5 font-medium',
      md: 'text-sm px-4 py-2.5 min-h-[42px] sm:min-h-[44px] gap-2 font-medium',
      lg: 'text-base px-6 py-3 min-h-[48px] gap-2.5 font-semibold',
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
