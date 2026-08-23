import React, { useEffect, useState, useRef } from 'react';

export const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only enable on devices that support hover (desktop)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;
    
    // Check for reduced motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
      
      const target = e.target as HTMLElement;
      // Check if hovering over an interactive element (a, button, input, select, textarea, or elements with .interactive, .button-lift)
      const isInteractive = target.closest('a, button, input, select, textarea, .interactive, .button-lift, .nav-link, .card-hover, .icon-button, [role="button"]') !== null;
      setIsHovering(isInteractive);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };
    
    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Magnetic effect logic for elements with .magnetic
    const magneticElements = document.querySelectorAll('.magnetic');
    
    const handleMagneticMove = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Move by a max of approx 4px horizontal, 4px vertical
      const moveX = (x / rect.width) * 8; 
      const moveY = (y / rect.height) * 8;
      
      el.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
    };
    
    const handleMagneticLeave = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = ''; // reset to default
    };

    const attachMagneticEvents = () => {
      const elements = document.querySelectorAll('.magnetic');
      elements.forEach(el => {
        el.removeEventListener('mousemove', handleMagneticMove as any);
        el.removeEventListener('mouseleave', handleMagneticLeave as any);
        el.addEventListener('mousemove', handleMagneticMove as any);
        el.addEventListener('mouseleave', handleMagneticLeave as any);
      });
    };

    // Use MutationObserver to re-attach magnetic events if DOM changes (like React re-renders)
    const observer = new MutationObserver(() => {
      attachMagneticEvents();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    attachMagneticEvents();

    // Smooth cursor follow animation
    const animate = () => {
      // Linear interpolation for smooth following
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      }
      
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);
    
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      
      const elements = document.querySelectorAll('.magnetic');
      elements.forEach(el => {
        el.removeEventListener('mousemove', handleMagneticMove as any);
        el.removeEventListener('mouseleave', handleMagneticLeave as any);
      });
    };
  }, [isVisible]);

  // If mobile or touch device, render nothing
  if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return null;
  }

  return (
    <div 
      ref={cursorRef}
      className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-all duration-300 ease-out -ml-4 -mt-4
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${isHovering ? 'scale-[1.5] bg-white/30 backdrop-blur-[1px]' : 'scale-100 bg-white/20'}
      `}
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
        willChange: 'transform, opacity, transform'
      }}
    />
  );
};

export default Cursor;
