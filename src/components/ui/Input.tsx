import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-medium text-[#a8a6b7]">
            {label}
          </label>
        )}
        <div className="relative rounded-[5px]">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#918ea0]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'block w-full rounded-[5px] border border-white/10 bg-[#060317] px-3.5 py-2.5 text-sm text-[#f4f0ff] placeholder-[#918ea0] transition-colors shadow-[inset_0_0_12px_rgba(255,255,255,0.02)] focus:border-[#9382ff] focus:outline-none focus:ring-1 focus:ring-[#9382ff]/50 disabled:bg-[#030014] disabled:text-[#54525f]',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20 text-rose-300',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#918ea0]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-[#918ea0]">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
