import React from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCount?: boolean;
  maxLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, showCount, maxLength, id, value, onChange, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className="w-full space-y-1.5">
        <div className="flex justify-between items-center">
          {label && (
            <label htmlFor={textareaId} className="block text-xs font-medium text-[#a8a6b7]">
              {label}
            </label>
          )}
          {showCount && (
            <span className={cn('text-xs font-mono', currentLength >= (maxLength || 2000) ? 'text-rose-400' : 'text-[#918ea0]')}>
              {currentLength} {maxLength ? `/ ${maxLength}` : 'chars'}
            </span>
          )}
        </div>
        <textarea
          id={textareaId}
          ref={ref}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className={cn(
            'block w-full rounded-[5px] border border-white/10 bg-[#060317] p-3.5 text-sm text-[#f4f0ff] placeholder-[#918ea0] transition-colors shadow-[inset_0_0_12px_rgba(255,255,255,0.02)] focus:border-[#9382ff] focus:outline-none focus:ring-1 focus:ring-[#9382ff]/50 disabled:bg-[#030014] disabled:text-[#54525f] resize-y min-h-[140px] leading-relaxed',
            error && 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20 text-rose-300',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-[#918ea0]">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
