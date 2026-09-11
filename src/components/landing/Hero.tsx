import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { HeroScene3D } from './HeroScene3D';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const navigate = useNavigate();
  const [animatedTextIndex, setAnimatedTextIndex] = useState(0);
  const animatedTexts = ['Get Discovered.', 'Improve.', 'Get Hired.'];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedTextIndex((prev) => (prev + 1) % animatedTexts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [animatedTexts.length]);

  const handleStartInterview = () => {
    navigate('/interview/setup');
  };

  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('how-it-works');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const orbitTags = ['INTERVIEW', 'ANALYZE', 'PERFORMANCE', 'MATCH'];

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-center items-center pt-28 pb-16 px-6 overflow-hidden bg-[#000000]"
    >
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 bg-grid-subtle opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 my-auto">
        
        {/* Left Column: Big Typography & Value Proposition */}
        <div className="lg:col-span-6 space-y-8 text-left relative z-20">
          
          {/* Subtle AI Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs uppercase tracking-widest font-mono font-semibold text-white/70">
              AI Interview & Assessment Platform
            </span>
          </div>

          {/* Large Headline */}
          <h1 className="font-sans font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-[1.04]">
            <span className="block text-white">Practice.</span>
            <span className="block text-white/90">Perform.</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-indigo-300 transition-all duration-500">
              {animatedTexts[animatedTextIndex]}
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="max-w-xl text-base sm:text-lg text-white/60 leading-relaxed font-light">
            HirePilot helps you practice real interview scenarios, evaluate your performance, and discover companies that match your skills.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={handleStartInterview}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold text-sm tracking-wide shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Start Your Interview</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={handleExplore}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white/90 hover:text-white border border-white/10 hover:border-white/20 font-medium text-sm tracking-wide transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>See How It Works</span>
            </button>
          </div>

          {/* Orbiting Capability Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest mr-2">Core Engine:</span>
            {orbitTags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-md bg-white/[0.03] text-cyan-300/80 border border-white/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>

        {/* Right Column: Real 3D AI Recruitment Core with Floating Candidate Cards */}
        <div className="lg:col-span-6 relative w-full h-[540px] sm:h-[620px] flex items-center justify-center pointer-events-none">
          
          {/* Three.js Canvas Container */}
          <div className="absolute inset-0 z-0">
            <HeroScene3D />
          </div>

        </div>

      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="relative z-10 mt-8 flex flex-col items-center">
        <button
          onClick={handleExplore}
          className="flex flex-col items-center gap-1.5 text-white/30 hover:text-white/70 transition-colors cursor-pointer group"
          aria-label="Scroll to discover"
        >
          <span className="text-[10px] uppercase font-mono tracking-widest">Scroll to discover</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>

    </section>
  );
};
