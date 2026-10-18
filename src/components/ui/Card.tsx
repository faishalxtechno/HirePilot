import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  elevation?: 'none' | 'sm' | 'md' | 'lg' | 'figmaHero' | 'figmaGrid';
  variant?: 'default' | 'glass' | 'figma' | 'figmaHero' | 'figmaSoft';
  glass?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, elevation = 'sm', variant = 'default', glass = false, children, ...props }, ref) => {
    const isFigmaHero = variant === 'figmaHero' || elevation === 'figmaHero';
    const isFigmaGrid = variant === 'figma' || elevation === 'figmaGrid';
    const isFigmaSoft = variant === 'figmaSoft';

    const getSurfaceClasses = () => {
      if (isFigmaHero) {
        return 'bg-white rounded-[16px] shadow-[0px_24px_70px_0px_rgba(0,0,0,0.1)] border-0 text-black';
      }
      if (isFigmaGrid) {
        return 'bg-white rounded-[16px] border border-[#e2e2e2] shadow-none text-black';
      }
      if (isFigmaSoft) {
        return 'bg-[#e2e2e2] rounded-[16px] border-0 text-black';
      }
      if (glass || variant === 'glass') {
        return 'rounded-2xl glass-card';
      }
      return 'rounded-2xl bg-[#121827] border border-[#1E2638] shadow-sm';
    };

    return (
      <div
        ref={ref}
        className={cn(
          getSurfaceClasses(),
          hoverable &&
            (glass
              ? 'glass-card-interactive cursor-pointer will-change-transform'
              : isFigmaGrid
              ? 'hover:border-black/30 transition-colors cursor-pointer'
              : 'card-hover cursor-pointer will-change-transform'),
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
  <div className={cn('p-6 pb-4 border-b border-white/5', className)} {...props} />
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h3 className={cn('text-lg font-medium text-white tracking-tight', className)} {...props} />
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <p className={cn('text-sm text-brand-secondary mt-1.5 leading-relaxed', className)} {...props} />
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('p-6', className)} {...props} />
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('p-6 pt-4 border-t border-white/5 flex items-center', className)} {...props} />
);
