import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useAuth } from '../../context/AuthContext';

interface HeroSectionProps {
  onExploreClick?: () => void;
  onOpenDemo?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onOpenDemo }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartPracticing = () => {
    if (user) {
      navigate('/interview/setup');
    } else {
      navigate('/signup');
    }
  };

  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('features');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="home"
      className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden flex flex-col items-center text-center"
    >
      {/* Ambient background glows inspired by Remasto visual styling */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] max-w-full h-[420px] remasto-glow-purple pointer-events-none -z-10 blur-[80px]" />
      <div className="absolute top-28 left-1/3 -translate-x-1/2 w-[480px] h-[340px] remasto-glow-cyan pointer-events-none -z-10 blur-[90px]" />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 mb-6 sm:mb-8 animate-fade-up">
          <Tag
            value="AI-POWERED CAREER COPILOT"
            icon="pi pi-sparkles"
            className="!bg-purple-50 !text-[#8750FF] !border !border-purple-200/70 !font-mono !font-semibold !text-[11px] sm:!text-xs !tracking-wider !px-3.5 !py-1.5 !rounded-full shadow-sm"
          />
        </div>

        {/* Main Headline */}
        <h1 className="font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight text-slate-900 leading-[1.08] mb-6 animate-fade-up stagger-1">
          <span className="block text-slate-900">Practice Smarter.</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#8750FF] via-[#A855F7] to-[#6830E8]">
            Get Hired Faster.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed mb-8 sm:mb-10 animate-fade-up stagger-2">
          Practice real interview scenarios, get instant AI feedback, build a standout resume, and move closer to your dream career — all in one place.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-10 animate-fade-up stagger-3">
          <Button
            label="Start Practicing"
            icon="pi pi-arrow-right"
            iconPos="right"
            onClick={handleStartPracticing}
            className="w-full sm:w-auto !rounded-full !bg-[#8750FF] !border-[#8750FF] !text-white !font-bold !px-7 !py-3.5 !text-sm sm:!text-base hover:!bg-[#723DE8] hover:!border-[#723DE8] !shadow-[0_10px_25px_rgba(135,80,255,0.35)] hover:!shadow-[0_14px_30px_rgba(135,80,255,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          />

          <Button
            label="Explore Features"
            icon="pi pi-compass"
            iconPos="left"
            onClick={handleExplore}
            className="w-full sm:w-auto !rounded-full !bg-white !border-slate-200 !text-slate-700 !font-semibold !px-6 !py-3.5 !text-sm sm:!text-base hover:!bg-slate-50 hover:!border-slate-300 hover:!text-slate-900 !shadow-sm transition-all duration-200"
          />

          {onOpenDemo && (
            <button
              type="button"
              onClick={onOpenDemo}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8750FF] hover:text-[#723DE8] px-3 py-2 rounded-full hover:bg-purple-50/80 transition-colors"
            >
              <i className="pi pi-play text-xs" />
              <span>Try Interactive Demo</span>
            </button>
          )}
        </div>

        {/* Compact Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-600 animate-fade-up stagger-4 pt-2">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-[#8750FF]">
              <i className="pi pi-check text-[11px] font-bold" />
            </span>
            <span className="font-medium text-slate-700">3 free mock interviews</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-[#8750FF]">
              <i className="pi pi-check text-[11px] font-bold" />
            </span>
            <span className="font-medium text-slate-700">AI-powered interview feedback</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-[#8750FF]">
              <i className="pi pi-check text-[11px] font-bold" />
            </span>
            <span className="font-medium text-slate-700">Resume building in one place</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
