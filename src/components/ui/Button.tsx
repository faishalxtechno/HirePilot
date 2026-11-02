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
      'inline-flex items-center justify-center font-medium rounded-[5px] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#030014] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-[#5046e4] hover:bg-[#5f55f2] text-[#f4f0ff] border border-white/10 shadow-[inset_0_0_12px_rgba(255,255,255,0.06)] focus:ring-[#9382ff]',
      secondary:
        'bg-[#060317] hover:bg-[#10093a] text-[#f4f0ff] border border-white/10 shadow-[inset_0_0_24px_rgba(255,255,255,0.04)] focus:ring-[#9382ff]',
      outline:
        'border border-[#54525f]/60 bg-transparent hover:bg-white/[0.04] text-[#f4f0ff] focus:ring-[#9382ff]',
      ghost:
        'bg-transparent hover:bg-white/[0.04] text-[#918ea0] hover:text-[#f4f0ff] focus:ring-[#9382ff] border border-transparent',
      danger:
        'bg-rose-600/90 hover:bg-rose-600 text-white border border-rose-500/30 focus:ring-rose-500',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2 gap-2',
      lg: 'text-base px-5 py-2.5 gap-2.5 font-medium',
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
