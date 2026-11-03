import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

export interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useInView = <T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) => {
  const {
    threshold = 0.12,
    rootMargin = '0px 0px -40px 0px',
    triggerOnce = true,
  } = options;

  const ref = useRef<T | null>(null);
  const prefersReduced = useReducedMotion();
  const [isInView, setIsInView] = useState<boolean>(() => {
    // If running in SSR or reduced motion is active, default to in-view
    if (typeof window === 'undefined') return true;
    return false;
  });

  useEffect(() => {
    if (prefersReduced) {
      setIsInView(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(node);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, prefersReduced]);

  return { ref, isInView: prefersReduced || isInView };
};

