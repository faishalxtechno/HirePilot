import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Navbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { InterviewPreview } from '../components/landing/InterviewPreview';
import { FeatureSection } from '../components/landing/FeatureCard';
import { HowItWorks } from '../components/landing/HowItWorks';
import { ProductBenefits } from '../components/landing/ProductBenefits';
import { PricingSection } from '../components/landing/PricingSection';
import { FounderSection } from '../components/landing/FounderSection';
import { FAQSection } from '../components/landing/FAQSection';
import { Footer } from '../components/landing/Footer';
import { QuickDemoModal } from '../components/landing/QuickDemoModal';

export const Landing: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
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

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen w-full font-sans relative overflow-x-hidden transition-colors duration-300 ${
        isDarkTheme
          ? 'bg-[#0B0F19] text-slate-100 selection:bg-[#8750FF] selection:text-white'
          : 'bg-[#FAFAFC] text-[#0F172A] selection:bg-purple-200 selection:text-purple-900 bg-remasto-grid'
      }`}
    >
      {/* Floating Pill Top Navbar */}
      <Navbar
        onNavigateSection={handleNavigateSection}
        isDarkTheme={isDarkTheme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Landing Page Content Narrative */}
      <main>
        {/* 1. Remasto-Inspired Centered Hero */}
        <HeroSection
          onExploreClick={() => handleNavigateSection('features')}
          onOpenDemo={() => setDemoModalOpen(true)}
        />

        {/* 2. Main Product Preview (Interview Practice Studio) */}
        <InterviewPreview onTestDemo={() => setDemoModalOpen(true)} />

        {/* 3. HirePilot 4 Feature Cards */}
        <FeatureSection />

        {/* 4. How It Works (Three-Step Process) */}
        <HowItWorks />

        {/* 5. Product Benefits for Students & Job Seekers */}
        <ProductBenefits />

        {/* 6. Transparent Pricing Plans (18% GST Breakdown) */}
        <PricingSection />

        {/* 7. Founder Section (Faishal Naushad) */}
        <FounderSection />

        {/* 8. FAQ Section with PrimeReact Accordion */}
        <FAQSection />
      </main>

      {/* 9. Light Modern Footer */}
      <Footer />

      {/* Interactive Quick Demo Modal */}
      <QuickDemoModal
        visible={demoModalOpen}
        onHide={() => setDemoModalOpen(false)}
      />
    </div>
  );
};

export default Landing;
