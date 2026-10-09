import React from 'react';

export const FounderSection: React.FC = () => {
  return (
    <section id="founder" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-white border-t border-slate-200/80 overflow-hidden">
      
      {/* Ambient soft glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[350px] remasto-glow-purple pointer-events-none -z-10 blur-[100px]" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[300px] remasto-glow-cyan pointer-events-none -z-10 blur-[90px]" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Pre-Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/70 text-[#8750FF] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <i className="pi pi-user text-xs" />
            <span>Leadership & Vision</span>
          </div>

          <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-[1.12]">
            Built with a simple belief.<br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8750FF] via-[#A855F7] to-[#6830E8]">
              Show what you can do.
            </span>
          </h2>
        </div>

        {/* Two-Column Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left: Founder Portrait Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Ambient backlight */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#8750FF]/15 via-purple-300/10 to-transparent blur-xl pointer-events-none" />

            <div className="relative rounded-3xl p-3 bg-white border border-slate-200/90 shadow-[0_25px_60px_rgba(135,80,255,0.12)] max-w-sm w-full group">
              <div className="relative rounded-2xl overflow-hidden aspect-square sm:aspect-[4/5] bg-gradient-to-b from-purple-50 to-slate-100 flex items-center justify-center p-4">
                <img
                  src="/faishal-founder.png"
                  alt="Faishal Naushad — Founder of HirePilot"
                  className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Floating UI Badge (Top Right) */}
              <div className="absolute -top-3 -right-3 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono text-slate-800 flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold">Founder & Lead Builder</span>
              </div>

              {/* Floating UI Badge (Bottom Left) */}
              <div className="absolute -bottom-3 -left-3 px-3.5 py-2 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 shadow-xl max-w-[210px]">
                <div className="flex items-center gap-1.5 text-[#8750FF] font-mono text-[11px] uppercase tracking-wider font-bold">
                  <i className="pi pi-verified text-xs" />
                  <span>HirePilot Platform</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                  AI Assessment & Prep Suite
                </p>
              </div>
            </div>

          </div>

          {/* Right: Founder Story & Vision */}
          <div className="lg:col-span-7 space-y-7">
            
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#8750FF] font-bold block mb-1.5">
                Meet the Founder
              </span>
              <h3 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Faishal Naushad
              </h3>
              <p className="text-sm font-mono text-slate-500 mt-1">
                Founder & Builder — HirePilot
              </p>
            </div>

            {/* Vision Statement Quote */}
            <div className="p-6 sm:p-7 rounded-2xl bg-purple-50/50 border-l-4 border-[#8750FF] border-y border-r border-purple-100 shadow-sm">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8750FF] block mb-2.5 font-bold">
                The vision behind HirePilot
              </span>
              <blockquote className="text-base sm:text-lg text-slate-800 font-normal leading-relaxed italic">
                &ldquo;Great opportunities should be discovered through what you can actually do — not just what&apos;s written on your resume. HirePilot gives everyone a stage to practice, perform, and be seen by the right companies based on pure skill.&rdquo;
              </blockquote>
            </div>

            {/* Social / Connect Links */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
              <a
                href="https://www.linkedin.com/in/faishal-naushad-b28807273/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#8750FF]/50 text-slate-700 hover:text-[#8750FF] text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow"
              >
                <i className="pi pi-linkedin text-sm text-[#0A66C2]" />
                <span>Connect on LinkedIn</span>
                <i className="pi pi-arrow-up-right text-[10px]" />
              </a>

              <a
                href="https://www.instagram.com/techifyfaishal?stkn=MWE1ZGo1cmEzYWw3eA=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-50 hover:bg-white border border-slate-200 hover:border-pink-300 text-slate-700 hover:text-pink-600 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow"
              >
                <i className="pi pi-instagram text-sm text-pink-500" />
                <span>Follow on Instagram</span>
                <i className="pi pi-arrow-up-right text-[10px]" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FounderSection;
