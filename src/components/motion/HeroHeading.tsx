import React from 'react';
import { useInView } from './useInView';
import { useReducedMotion } from './useReducedMotion';
import { GradientText } from './GradientText';

export interface HeroHeadingProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export const HeroHeading: React.FC<HeroHeadingProps> = ({
  className = '',
  theme = 'light',
}) => {
  const { ref, isInView } = useInView<HTMLHeadingElement>({ threshold: 0.1 });
  const prefersReduced = useReducedMotion();

  const textColor = theme === 'light' ? 'text-[#111827]' : 'text-[#f4f0ff]';

  if (prefersReduced) {
    return (
      <h1
        className={`text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-semibold tracking-tight ${textColor} max-w-4xl mx-auto leading-[1.08] ${className}`}
      >
        <span>Your Next </span>
        <span className="text-[#2563EB]">Career Move </span>
        <span>Starts Here.</span>
      </h1>
    );
  }

  return (
    <h1
      ref={ref}
      className={`text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-semibold tracking-tight ${textColor} max-w-4xl mx-auto leading-[1.08] ${className}`}
      aria-label="Your Next Career Move Starts Here."
    >
      <span className="inline-block">
        <span
          className="inline-block mr-[0.28em]"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 18px, 0)',
            filter: isInView ? 'blur(0px)' : 'blur(5px)',
            transitionProperty: 'opacity, transform, filter',
            transitionDuration: '700ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '100ms',
            willChange: 'opacity, transform, filter',
          }}
        >
          Your
        </span>
        <span
          className="inline-block"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 18px, 0)',
            filter: isInView ? 'blur(0px)' : 'blur(5px)',
            transitionProperty: 'opacity, transform, filter',
            transitionDuration: '700ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '170ms',
            willChange: 'opacity, transform, filter',
          }}
        >
          Next
        </span>
      </span>{' '}
      <span className="inline-block">
        <span
          className="inline-block"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 18px, 0)',
            filter: isInView ? 'blur(0px)' : 'blur(5px)',
            transitionProperty: 'opacity, transform, filter',
            transitionDuration: '750ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '340ms',
            willChange: 'opacity, transform, filter',
          }}
        >
          <GradientText animated withUnderline variant={theme === 'light' ? 'blue' : 'cosmic'}>
            Career Move
          </GradientText>
        </span>
      </span>{' '}
      <span className="inline-block">
        <span
          className="inline-block mr-[0.28em]"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 18px, 0)',
            filter: isInView ? 'blur(0px)' : 'blur(5px)',
            transitionProperty: 'opacity, transform, filter',
            transitionDuration: '700ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '520ms',
            willChange: 'opacity, transform, filter',
          }}
        >
          Starts
        </span>
        <span
          className="inline-block"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 18px, 0)',
            filter: isInView ? 'blur(0px)' : 'blur(5px)',
            transitionProperty: 'opacity, transform, filter',
            transitionDuration: '700ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '600ms',
            willChange: 'opacity, transform, filter',
          }}
        >
          Here.
        </span>
      </span>
    </h1>
  );
};
