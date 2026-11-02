import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-medium text-[#a8a6b7]">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'block w-full appearance-none rounded-[5px] border border-white/10 bg-[#060317] px-3.5 py-2.5 pr-10 text-sm text-[#f4f0ff] transition-colors shadow-[inset_0_0_12px_rgba(255,255,255,0.02)] focus:border-[#9382ff] focus:outline-none focus:ring-1 focus:ring-[#9382ff]/50 disabled:bg-[#030014] disabled:text-[#54525f]',
              error && 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20 text-rose-300',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled} className="bg-[#060317] text-[#f4f0ff]">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#918ea0]">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-[#918ea0]">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
