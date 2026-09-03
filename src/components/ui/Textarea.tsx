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
            <label htmlFor={textareaId} className="block text-xs font-medium text-brand-secondary">
              {label}
            </label>
          )}
          {showCount && (
            <span className={cn('text-xs font-mono', currentLength >= (maxLength || 2000) ? 'text-red-400' : 'text-brand-muted')}>
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
            'block w-full rounded-lg border border-white/10 bg-transparent p-3.5 text-sm text-white placeholder-brand-muted transition-all duration-200',
            'focus:border-white/30 focus:outline-none focus:bg-white/5 focus:ring-1 focus:ring-white/20',
            'disabled:opacity-50 disabled:cursor-not-allowed resize-y min-h-[140px] leading-relaxed',
            error && 'border-red-500/50 focus:border-red-500/50',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-brand-muted">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
