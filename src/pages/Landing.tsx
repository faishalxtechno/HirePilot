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
    <div className="min-h-screen w-full font-sans relative overflow-x-hidden bg-[#080B14] text-[#F7F8FC] selection:bg-[#7657FF] selection:text-white">
      {/* Ambient Specular Fluid Glow Orbs (Apple iOS Background depth) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[650px] h-[650px] bg-[#7657FF]/15 rounded-full blur-[140px] mix-blend-screen transform-gpu pointer-events-none" />
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-[#00c3eb]/10 rounded-full blur-[130px] mix-blend-screen transform-gpu pointer-events-none" />
        <div className="absolute top-2/3 left-10 w-[550px] h-[550px] bg-[#00865d]/10 rounded-full blur-[150px] mix-blend-screen transform-gpu pointer-events-none" />
        <div className="absolute -bottom-20 right-1/4 w-[600px] h-[600px] bg-[#7657FF]/15 rounded-full blur-[160px] mix-blend-screen transform-gpu pointer-events-none" />
      </div>

      {/* Floating Segmented Apple Glass Navbar */}
      <Navbar
        onNavigateSection={handleNavigateSection}
        isDarkTheme={isDarkTheme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Landing Page Content Narrative */}
      <main className="relative z-10">
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
