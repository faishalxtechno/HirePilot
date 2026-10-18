import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'figma';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, variant = 'default', ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const isFigma = variant === 'figma';

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-xs font-medium",
              isFigma ? "text-[#595959]" : "text-brand-secondary"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className={cn(
              "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none",
              isFigma ? "text-[#595959]" : "text-brand-muted"
            )}>
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'block w-full rounded-lg transition-all duration-200 px-3.5 py-2.5 text-sm',
              isFigma
                ? 'border border-[#e2e2e2] bg-white text-black placeholder-[#595959] focus:border-black focus:outline-none focus:ring-1 focus:ring-black'
                : 'border border-white/10 bg-transparent text-white placeholder-brand-muted focus:border-white/30 focus:outline-none focus:bg-white/5 focus:ring-1 focus:ring-white/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500/50 focus:border-red-500/50',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-brand-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-brand-muted">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
