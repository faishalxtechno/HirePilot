import React from 'react';
import { useInView } from './useInView';
import { useReducedMotion } from './useReducedMotion';

export interface AnimatedHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  duration?: number;
  delay?: number;
  blur?: boolean;
  distance?: number;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  as: Component = 'h2',
  duration = 750,
  delay = 0,
  blur = true,
  distance = 18,
  className = '',
  children,
  ...props
}) => {
  const { ref, isInView } = useInView<HTMLHeadingElement>({ threshold: 0.1 });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <Component ref={ref} className={className} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translate3d(0, 0, 0)' : `translate3d(0, ${distance}px, 0)`,
        filter: blur ? (isInView ? 'blur(0px)' : 'blur(5px)') : undefined,
        transitionProperty: 'opacity, transform, filter',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform, filter',
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

