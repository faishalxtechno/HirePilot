import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { LiveInterviewDemo } from '../components/landing/LiveInterviewDemo';
import { HowItWorks } from '../components/landing/HowItWorks';
import { InterviewTypes } from '../components/landing/InterviewTypes';
import { PerformanceDashboard } from '../components/landing/PerformanceDashboard';
import { CompanyRecommendations } from '../components/landing/CompanyRecommendations';
import { FounderSection } from '../components/landing/FounderSection';
import { FinalCTA } from '../components/landing/FinalCTA';
import { Footer } from '../components/landing/Footer';

export const Landing: React.FC = () => {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    // Handle initial hash scroll
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          lenis.scrollTo(target as HTMLElement, { offset: -80 });
        }, 150);
      }
    }

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  const handleNavigateSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#000000] text-white selection:bg-cyan-400 selection:text-black font-sans relative overflow-x-hidden">
      
      {/* Floating Top Navbar */}
      <Navbar onNavigateSection={handleNavigateSection} />

      {/* Main Content Narrative */}
      <main>
        {/* 1. Cinematic 3D Hero */}
        <Hero onExploreClick={() => handleNavigateSection('how-it-works')} />

        {/* 2. Live Interview Experience */}
        <div id="product">
          <LiveInterviewDemo />
        </div>

        {/* 3. The Journey / How It Works */}
        <HowItWorks />

        {/* 4. Interview Types (Editorial Layout) */}
        <InterviewTypes />

        {/* 5. Performance Dashboard (Interactive Stats) */}
        <PerformanceDashboard />

        {/* 6. Company Recommendations (Glowing Match Network) */}
        <CompanyRecommendations />

        {/* 7. Required Founder Section (Faishal Naushad) */}
        <FounderSection />

        {/* 8. Final 3D CTA */}
        <FinalCTA />
      </main>

      {/* Minimal Footer */}
      <Footer />

    </div>
  );
};

export default Landing;
