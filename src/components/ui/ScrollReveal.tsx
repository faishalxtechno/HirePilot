import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delayMs?: number;
  children: React.ReactNode;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  delayMs = 0,
  className,
  style,
  children,
  ...props
}) => {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <div
      ref={ref}
      style={{
        ...style,
        transitionDelay: isRevealed && delayMs > 0 ? `${delayMs}ms` : undefined,
      }}
      className={cn(
        'reveal-hidden',
        isRevealed && 'reveal-visible',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
