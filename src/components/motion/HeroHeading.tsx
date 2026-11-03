import React from 'react';
import { useInView } from './useInView';
import { useReducedMotion } from './useReducedMotion';
import { GradientText } from './GradientText';

export interface HeroHeadingProps {
  className?: string;
}

export const HeroHeading: React.FC<HeroHeadingProps> = ({
  className = '',
}) => {
  const { ref, isInView } = useInView<HTMLHeadingElement>({ threshold: 0.1 });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-[#f4f0ff] tracking-tight max-w-4xl mx-auto leading-[1.12] ${className}`}>
        <span>Practice Smarter. </span>
        <span className="cosmic-text-gradient">Interview Better. </span>
        <span>Get Hired.</span>
      </h1>
    );
  }

  // Define words with their line groups and delays for a cinematic line-by-line reveal
  const items = [
    { text: 'Practice', delay: 100 },
    { text: 'Smarter.', delay: 170 },
    { isBreak: true },
    {
      text: 'Interview Better.',
      isHighlight: true,
      delay: 380,
    },
    { isBreak: true },
    { text: 'Get', delay: 620 },
    { text: 'Hired.', delay: 690 },
  ];

  return (
    <h1
      ref={ref}
      className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-[#f4f0ff] tracking-tight max-w-4xl mx-auto leading-[1.12] ${className}`}
      aria-label="Practice Smarter. Interview Better. Get Hired."
    >
      <span className="inline-block">
        <span
          className="inline-block mr-[0.28em]"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
            filter: isInView ? 'blur(0px)' : 'blur(5px)',
            transitionProperty: 'opacity, transform, filter',
            transitionDuration: '700ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '100ms',
            willChange: 'opacity, transform, filter',
          }}
        >
          Practice
        </span>
        <span
          className="inline-block"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
            filter: isInView ? 'blur(0px)' : 'blur(5px)',
            transitionProperty: 'opacity, transform, filter',
            transitionDuration: '700ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '180ms',
            willChange: 'opacity, transform, filter',
          }}
        >
          Smarter.
        </span>
      </span>{' '}
      <span className="inline-block">
        <span
          className="inline-block"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
            filter: isInView ? 'blur(0px)' : 'blur(5px)',
            transitionProperty: 'opacity, transform, filter',
            transitionDuration: '750ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '360ms',
            willChange: 'opacity, transform, filter',
          }}
        >
          <GradientText animated withUnderline variant="cosmic">
            Interview Better.
          </GradientText>
        </span>
      </span>{' '}
      <span className="inline-block">
        <span
          className="inline-block mr-[0.28em]"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
            filter: isInView ? 'blur(0px)' : 'blur(5px)',
            transitionProperty: 'opacity, transform, filter',
            transitionDuration: '700ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '580ms',
            willChange: 'opacity, transform, filter',
          }}
        >
          Get
        </span>
        <span
          className="inline-block"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
            filter: isInView ? 'blur(0px)' : 'blur(5px)',
            transitionProperty: 'opacity, transform, filter',
            transitionDuration: '700ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '650ms',
            willChange: 'opacity, transform, filter',
          }}
        >
          Hired.
        </span>
      </span>
    </h1>
  );
};

