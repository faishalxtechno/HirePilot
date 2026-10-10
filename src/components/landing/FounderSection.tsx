import React from 'react';

import { ScrollReveal } from '../ui/ScrollReveal';

export const FounderSection: React.FC = () => {
  return (
    <section id="founder" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-transparent border-t border-white/5 overflow-hidden">
      
      {/* Ambient soft glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-purple-600/10 pointer-events-none -z-10 blur-[120px]" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-cyan-500/10 pointer-events-none -z-10 blur-[100px]" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Pre-Header */}
        <ScrollReveal className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-300 text-xs font-mono font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
            <i className="pi pi-user text-xs text-purple-400" />
            <span>Leadership & Vision</span>
          </div>

          <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-[1.12]">
            Built with a simple belief.<br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-cyan-400">
              Show what you can do.
            </span>
          </h2>
        </ScrollReveal>

        {/* Two-Column Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left: Founder Portrait Frame */}
          <ScrollReveal delayMs={100} className="lg:col-span-5 relative flex justify-center">
            
            {/* Ambient backlight */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-purple-600/20 via-cyan-500/10 to-transparent blur-xl pointer-events-none" />

            <div className="relative rounded-3xl p-3 glass-card border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] max-w-sm w-full group">
              <div className="relative rounded-2xl overflow-hidden aspect-square sm:aspect-[4/5] bg-gradient-to-b from-white/5 to-white/0 flex items-center justify-center p-4 border border-white/5">
                <img
                  src="/faishal-founder.png"
                  alt="Faishal Naushad — Founder of HirePilot"
                  className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Floating UI Badge (Top Right) */}
              <div className="absolute -top-3 -right-3 px-3.5 py-1.5 rounded-full bg-[#121827]/95 border border-white/15 text-xs font-mono text-slate-200 flex items-center gap-2 shadow-xl backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold">Founder & Lead Builder</span>
              </div>

              {/* Floating UI Badge (Bottom Left) */}
              <div className="absolute -bottom-3 -left-3 px-3.5 py-2 rounded-2xl bg-[#121827]/95 border border-white/15 text-xs text-slate-200 shadow-2xl backdrop-blur-md max-w-[210px]">
                <div className="flex items-center gap-1.5 text-purple-400 font-mono text-[11px] uppercase tracking-wider font-bold">
                  <i className="pi pi-verified text-xs" />
                  <span>HirePilot Platform</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                  AI Assessment & Prep Suite
                </p>
              </div>
            </div>

          </ScrollReveal>

          {/* Right: Founder Story & Vision */}
          <ScrollReveal delayMs={160} className="lg:col-span-7 space-y-7">
            
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold block mb-1.5">
                Meet the Founder
              </span>
              <h3 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Faishal Naushad
              </h3>
              <p className="text-sm font-mono text-slate-400 mt-1">
                Founder & Builder — HirePilot
              </p>
            </div>

            {/* Vision Statement Quote */}
            <div className="p-6 sm:p-7 rounded-2xl glass-panel border-l-4 border-l-purple-500 border border-white/10 shadow-lg">
              <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300 block mb-2.5 font-bold">
                The vision behind HirePilot
              </span>
              <blockquote className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed italic">
                &ldquo;Great opportunities should be discovered through what you can actually do — not just what&apos;s written on your resume. HirePilot gives everyone a stage to practice, perform, and be seen by the right companies based on pure skill.&rdquo;
              </blockquote>
            </div>

            {/* Social / Connect Links */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
              <a
                href="https://www.linkedin.com/in/faishal-naushad-b28807273/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card hover:border-purple-500/50 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0"
              >
                <i className="pi pi-linkedin text-sm text-[#0A66C2]" />
                <span>Connect on LinkedIn</span>
                <i className="pi pi-arrow-up-right text-[10px] text-slate-400" />
              </a>

              <a
                href="https://www.instagram.com/techifyfaishal?stkn=MWE1ZGo1cmEzYWw3eA=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card hover:border-pink-500/50 text-slate-200 hover:text-pink-300 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0"
              >
                <i className="pi pi-instagram text-sm text-pink-400" />
                <span>Follow on Instagram</span>
                <i className="pi pi-arrow-up-right text-[10px] text-slate-400" />
              </a>
            </div>

          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};

export default FounderSection;
