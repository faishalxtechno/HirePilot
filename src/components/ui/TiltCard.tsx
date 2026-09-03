import React from 'react';
import { use3DTilt } from '../../hooks/use3DTilt';
import { cn } from '../../lib/utils';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxRotation?: number;
}

export const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
  ({ children, className, maxRotation = 2, ...props }, externalRef) => {
    const tiltRef = use3DTilt<HTMLDivElement>({ maxRotation });

    return (
      <div
        ref={(node) => {
          if (typeof externalRef === 'function') externalRef(node);
          else if (externalRef) externalRef.current = node;
          
          if (tiltRef && 'current' in tiltRef) {
            (tiltRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        className={cn('card-3d card-glow-wrapper transition-all duration-300', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TiltCard.displayName = 'TiltCard';
