import { useEffect, useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook to trigger GPU-accelerated scroll animations on element entry.
 * Uses IntersectionObserver for 60fps scrolling without continuous event listeners.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px 0px -40px 0px', triggerOnce = true } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If browser doesn't support IntersectionObserver, reveal immediately
    if (!('IntersectionObserver' in window)) {
      el.classList.add('reveal-visible');
      return;
    }

    el.classList.add('reveal-init');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-visible');
          if (triggerOnce) {
            observer.unobserve(el);
          }
        } else if (!triggerOnce) {
          el.classList.remove('reveal-visible');
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return ref;
}

/**
 * Custom hook to reveal all child elements with .reveal-init inside a container
 */
export function useScrollAnimationGroup<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {}
) {
  const { threshold = 0.08, rootMargin = '0px 0px -40px 0px', triggerOnce = true } = options;
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!('IntersectionObserver' in window)) {
      const items = container.querySelectorAll('.reveal-init');
      items.forEach((item) => item.classList.add('reveal-visible'));
      return;
    }

    const items = container.querySelectorAll('.reveal-init');
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove('reveal-visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return containerRef;
}
