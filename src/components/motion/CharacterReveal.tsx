import React from 'react';
import { useInView } from './useInView';
import { useReducedMotion } from './useReducedMotion';

export interface CharacterRevealProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
  duration?: number;
  stagger?: number;
  delay?: number;
  blur?: boolean;
}

export const CharacterReveal: React.FC<CharacterRevealProps> = ({
  text,
  as: Component = 'span',
  duration = 450,
  stagger = 20,
  delay = 0,
  blur = true,
  className = '',
  ...props
}) => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });
  const prefersReduced = useReducedMotion();

  const characters = Array.from(text);

  if (prefersReduced) {
    return (
      <Component ref={ref as any} className={className} {...props}>
        {text}
      </Component>
    );
  }

  return (
    <Component
      ref={ref as any}
      className={`inline-block ${className}`}
      aria-label={text}
      {...props}
    >
      {characters.map((char, idx) => {
        const charDelay = delay + idx * stagger;

        if (char === ' ') {
          return (
            <span key={idx} className="inline-block">
              &nbsp;
            </span>
          );
        }

        return (
          <span
            key={idx}
            className="inline-block"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 10px, 0)',
              filter: blur ? (isInView ? 'blur(0px)' : 'blur(3px)') : undefined,
              transitionProperty: 'opacity, transform, filter',
              transitionDuration: `${duration}ms`,
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: `${charDelay}ms`,
              willChange: 'opacity, transform, filter',
            }}
          >
            {char}
          </span>
        );
      })}
    </Component>
  );
};

