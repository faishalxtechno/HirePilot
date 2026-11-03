import React, { useEffect, useState, useCallback } from 'react';
import { useReducedMotion } from '../motion/useReducedMotion';

interface LogoIntroProps {
  /** If true, forces the intro to display regardless of sessionStorage (useful for testing/demo) */
  forceShow?: boolean;
  /** Callback fired when the intro animation has completely finished and unmounted */
  onComplete?: () => void;
  /** Active display duration in ms before starting the exit transition (default: 2300ms) */
  displayDuration?: number;
}

const STORAGE_KEY = 'hirepilot_intro_seen';

export const LogoIntro: React.FC<LogoIntroProps> = ({
  forceShow = false,
  onComplete,
  displayDuration = 2300,
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Determine initial visibility synchronously to prevent any layout flash
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (forceShow) return true;
    if (typeof window === 'undefined') return false;
    try {
      return !sessionStorage.getItem(STORAGE_KEY);
    } catch {
      return false;
    }
  });

  // State to trigger the smooth fade/zoom out transition
  const [isExiting, setIsExiting] = useState<boolean>(false);

  // Dismiss / Transition to homepage handler
  const handleDismiss = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);

    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore sessionStorage exceptions in private/strict sandboxes
    }

    // Allow 550ms for the exit dissolve transition before unmounting
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 550);

    return () => clearTimeout(timer);
  }, [isExiting, onComplete]);

  // Main lifecycle timers & accessibility controls
  useEffect(() => {
    if (!isVisible) return;

    // Lock body scroll during cinematic intro playback
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // If user prefers reduced motion, skip 3D sequence and exit promptly
    if (prefersReducedMotion) {
      const reducedTimer = setTimeout(() => {
        handleDismiss();
      }, 400);

      return () => {
        clearTimeout(reducedTimer);
        document.body.style.overflow = originalOverflow;
      };
    }

    // Record session seen flag
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Safe fallback
    }

    // Schedule exit transition
    const mainTimer = setTimeout(() => {
      handleDismiss();
    }, displayDuration);

    // Hard fallback safety timer (in case CSS transitions stall)
    const safetyTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, displayDuration + 900);

    // Keyboard ESC listener to skip intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(mainTimer);
      clearTimeout(safetyTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isVisible, prefersReducedMotion, displayDuration, handleDismiss, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="HirePilot introduction"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030014] select-none transition-all duration-550 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting
          ? 'opacity-0 scale-[1.04] blur-[8px] pointer-events-none'
          : 'opacity-100 scale-100 blur-0 pointer-events-auto'
      }`}
      onClick={handleDismiss}
    >
      {/* Deep cosmic nebula background glows */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Central violet/iris radiant bloom */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] sm:w-[850px] sm:h-[550px] bg-gradient-to-tr from-[#5046e4]/25 via-[#9382ff]/20 to-transparent rounded-full blur-[90px] animate-logo-ambient pointer-events-none" />

        {/* Studio radial vignette to soften outer canvas */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(3,0,20,0.85)_100%)] pointer-events-none" />

        {/* Subtle starlight specks */}
        <div className="absolute inset-0 starfield-bg opacity-30 pointer-events-none" />
      </div>

      {/* Discrete, accessible Skip Button */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white text-xs font-medium tracking-wide transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#9382ff]"
          aria-label="Skip intro animation"
        >
          Skip ✕
        </button>
      </div>

      {/* 3D Perspective Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-full [perspective:1200px]">
        {/* Physical 3D Logo Card with Depth & Specular Sheen */}
        <div
          className={`relative flex items-center justify-center p-3.5 sm:p-5 md:p-6 rounded-[18px] sm:rounded-[22px] bg-white border border-white/30 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8),0_0_55px_rgba(147,130,255,0.35),inset_0_1px_2px_rgba(255,255,255,0.9)] overflow-hidden max-w-[320px] sm:max-w-[420px] md:max-w-[480px] w-full transition-transform ${
            prefersReducedMotion ? 'opacity-100' : 'animate-logo-3d-stage'
          }`}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Specular lighting sweep across logo glass */}
          <div
            className={`absolute -inset-full w-[250%] h-[250%] pointer-events-none bg-gradient-to-r from-transparent via-white/50 to-transparent ${
              prefersReducedMotion ? 'hidden' : 'animate-logo-specular'
            }`}
            aria-hidden="true"
          />

          {/* Official HirePilot Logo Asset (Unchanged, Pristine Integrity) */}
          <img
            src="/images/hirepilot-logo.png"
            alt="HirePilot - Practice • Prepare • Get Hired"
            className="w-full h-auto object-contain select-none"
            loading="eager"
            decoding="sync"
            width={2172}
            height={724}
          />
        </div>

        {/* 3D Floor Shadow under the logo */}
        <div
          className={`w-64 sm:w-80 md:w-96 h-5 sm:h-7 mt-6 sm:mt-8 rounded-full bg-[#9382ff]/25 blur-xl pointer-events-none ${
            prefersReducedMotion ? 'opacity-40' : 'animate-logo-shadow'
          }`}
          aria-hidden="true"
        />

        {/* Cinematic Tagline / Brand Reveal */}
        <div
          className={`mt-6 sm:mt-8 flex items-center gap-2.5 text-[10px] sm:text-xs font-medium tracking-[0.22em] sm:tracking-[0.28em] text-[#f4f0ff]/85 uppercase select-none ${
            prefersReducedMotion ? 'opacity-90' : 'animate-logo-tagline'
          }`}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#9382ff] shadow-[0_0_8px_#9382ff]"
            aria-hidden="true"
          />
          <span>Practice • Prepare • Get Hired</span>
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#9382ff] shadow-[0_0_8px_#9382ff]"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default LogoIntro;

