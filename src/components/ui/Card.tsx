import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  elevation?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, elevation = 'sm', children, ...props }, ref) => {
    const elevationStyles = {
      none: 'shadow-none',
      sm: 'shadow-sm shadow-slate-200/50 dark:shadow-none',
      md: 'shadow-md shadow-slate-200/60 dark:shadow-none',
      lg: 'shadow-xl shadow-slate-300/40 dark:shadow-none',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 transition-all duration-300',
          elevationStyles[elevation],
          hoverable &&
            'hover:-translate-y-1 hover:shadow-card-hover hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer will-change-transform',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('p-5 sm:p-6 pb-3 border-b border-slate-100 dark:border-slate-800/80', className)} {...props} />
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h3 className={cn('text-lg font-bold text-slate-900 dark:text-white tracking-tight', className)} {...props} />
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <p className={cn('text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1', className)} {...props} />
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('p-5 sm:p-6', className)} {...props} />
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('p-5 sm:p-6 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center', className)} {...props} />
);
