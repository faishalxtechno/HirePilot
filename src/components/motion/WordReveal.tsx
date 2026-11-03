import React from 'react';
import { useInView } from './useInView';
import { useReducedMotion } from './useReducedMotion';

export interface WordRevealProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  duration?: number; // ms
  stagger?: number; // ms
  delay?: number; // ms initial delay
  blur?: boolean;
  highlightWords?: string[];
  highlightClassName?: string;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  as: Component = 'span',
  duration = 600,
  stagger = 45,
  delay = 0,
  blur = true,
  highlightWords = [],
  highlightClassName = 'cosmic-text-gradient',
  className = '',
  ...props
}) => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });
  const prefersReduced = useReducedMotion();

  const words = text.split(/\s+/).filter(Boolean);

  if (prefersReduced) {
    return (
      <Component ref={ref as any} className={className} {...props}>
        {words.map((word, idx) => {
          const isHighlight = highlightWords.some(
            (hw) => hw.toLowerCase() === word.replace(/[^\w]/g, '').toLowerCase()
          );
          return (
            <React.Fragment key={idx}>
              <span className={isHighlight ? highlightClassName : undefined}>{word}</span>
              {idx < words.length - 1 ? ' ' : ''}
            </React.Fragment>
          );
        })}
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
      {words.map((word, idx) => {
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === word.replace(/[^\w]/g, '').toLowerCase()
        );
        const wordDelay = delay + idx * stagger;

        return (
          <span
            key={idx}
            className="inline-block whitespace-nowrap"
            style={{
              marginRight: idx < words.length - 1 ? '0.28em' : undefined,
            }}
          >
            <span
              className={`inline-block ${isHighlight ? highlightClassName : ''}`}
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 14px, 0)',
                filter: blur ? (isInView ? 'blur(0px)' : 'blur(4px)') : undefined,
                transitionProperty: 'opacity, transform, filter',
                transitionDuration: `${duration}ms`,
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: `${wordDelay}ms`,
                willChange: 'opacity, transform, filter',
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Component>
  );
};

