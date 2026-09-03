import { useEffect, useRef } from 'react';

interface TiltOptions {
  maxRotation?: number; // Maximum rotation in degrees (e.g. 4)
  scale?: number; // Scale on hover (e.g. 1.01)
  perspective?: number; // Perspective in px (e.g. 1000)
}

export function use3DTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const ref = useRef<T>(null);
  
  const { maxRotation = 4, scale = 1, perspective = 1000 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check if device supports hover (not a touch device)
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (prefersReducedMotion || !supportsHover) {
      return;
    }

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element.
      const y = e.clientY - rect.top;  // y position within the element.
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation based on cursor position (-1 to 1)
      const rotateX = ((y - centerY) / centerY) * -maxRotation;
      const rotateY = ((x - centerX) / centerX) * maxRotation;

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        element.style.setProperty('--rotate-x', `${rotateX}deg`);
        element.style.setProperty('--rotate-y', `${rotateY}deg`);
        element.style.setProperty('--mouse-x', `${x}px`);
        element.style.setProperty('--mouse-y', `${y}px`);
        
        // Add specific class that handles the transform based on these variables
        element.classList.add('is-tilting');
      });
    };

    const handleMouseLeave = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      animationFrameId = requestAnimationFrame(() => {
        element.style.setProperty('--rotate-x', '0deg');
        element.style.setProperty('--rotate-y', '0deg');
        element.classList.remove('is-tilting');
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxRotation, scale, perspective]);

  return ref;
}
