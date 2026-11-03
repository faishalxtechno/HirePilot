import React from 'react';
import { useInView } from './useInView';
import { useReducedMotion } from './useReducedMotion';

export interface FadeInTextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li';
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  delay?: number;
  distance?: number;
  blur?: boolean;
}

export const FadeInText: React.FC<FadeInTextProps> = ({
  as: Component = 'p',
  direction = 'up',
  duration = 550,
  delay = 0,
  distance = 14,
  blur = true,
  className = '',
  children,
  ...props
}) => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });
  const prefersReduced = useReducedMotion();

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'none':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  if (prefersReduced) {
    return (
      <Component ref={ref as any} className={className} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={ref as any}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translate3d(0, 0, 0)' : getInitialTransform(),
        filter: blur ? (isInView ? 'blur(0px)' : 'blur(4px)') : undefined,
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

export const AnimatedText = FadeInText;

