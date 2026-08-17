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
            <label htmlFor={textareaId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              {label}
            </label>
          )}
          {showCount && (
            <span className={cn('text-xs font-mono', currentLength >= (maxLength || 2000) ? 'text-rose-500' : 'text-slate-400')}>
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
            'block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/90 p-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:bg-slate-50 disabled:text-slate-500 resize-y min-h-[140px] leading-relaxed',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
