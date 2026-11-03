import React, { useEffect, useState } from 'react';
import { useInView } from './useInView';
import { useReducedMotion } from './useReducedMotion';

export interface CountUpProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number | string;
  duration?: number; // ms
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const CountUp: React.FC<CountUpProps> = ({
  value,
  duration = 1100,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  ...props
}) => {
  const { ref, isInView } = useInView<HTMLSpanElement>({ threshold: 0.1 });
  const prefersReduced = useReducedMotion();

  // Extract numeric part and any embedded suffix if value is passed as string (e.g. "85%" or "3 days")
  let targetNumber = 0;
  let detectedSuffix = suffix;

  if (typeof value === 'number') {
    targetNumber = value;
  } else if (typeof value === 'string') {
    const match = value.match(/([0-9]+(?:\.[0-9]+)?)/);
    if (match) {
      targetNumber = parseFloat(match[1]);
      if (!suffix) {
        detectedSuffix = value.substring(match.index! + match[1].length);
      }
    }
  }

  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    if (prefersReduced || !isInView) {
      if (prefersReduced) setDisplayValue(targetNumber);
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Ease Out Cubic: 1 - (1 - t)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = easeOut * targetNumber;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(targetNumber);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, targetNumber, duration, prefersReduced]);

  const formattedValue = (prefersReduced ? targetNumber : displayValue).toFixed(decimals);

  return (
    <span ref={ref} className={`font-mono inline-block ${className}`} {...props}>
      {prefix}
      {formattedValue}
      {detectedSuffix}
    </span>
  );
};

