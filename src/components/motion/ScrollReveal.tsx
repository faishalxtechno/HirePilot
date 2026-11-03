import React from 'react';
import { useInView, UseInViewOptions } from './useInView';
import { useReducedMotion } from './useReducedMotion';

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  delay?: number;
  distance?: number;
  staggerChildren?: number; // ms to stagger direct children if needed
  childClassName?: string;
  blur?: boolean;
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  as: Component = 'div',
  direction = 'up',
  duration = 650,
  delay = 0,
  distance = 18,
  staggerChildren = 0,
  childClassName = '',
  blur = false,
  threshold = 0.12,
  className = '',
  children,
  ...props
}) => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold });
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

  // If staggering children, wrap each direct child in a transition container
  if (staggerChildren > 0 && React.Children.count(children) > 1) {
    return (
      <Component ref={ref as any} className={className} {...props}>
        {React.Children.map(children, (child, idx) => {
          if (!React.isValidElement(child)) return child;

          const childDelay = delay + idx * staggerChildren;

          return (
            <div
              key={child.key || idx}
              className={childClassName || 'h-full'}
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translate3d(0, 0, 0)' : getInitialTransform(),
                filter: blur ? (isInView ? 'blur(0px)' : 'blur(4px)') : undefined,
                transitionProperty: 'opacity, transform, filter',
                transitionDuration: `${duration}ms`,
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: `${childDelay}ms`,
                willChange: 'opacity, transform',
              }}
            >
              {child}
            </div>
          );
        })}
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
        willChange: 'opacity, transform',
      }}
      {...props}
    >
      {children}
    </Component>
  );
};
