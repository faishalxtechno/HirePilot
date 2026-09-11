import React, { useEffect, useRef } from 'react';
import { Sparkles, Terminal, Linkedin, Instagram } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FounderSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageWrapperRef.current) return;

    // Subtle 3D mouse parallax for the founder image wrapper
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageWrapperRef.current) return;
      
      const rect = imageWrapperRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 25;
      const y = (e.clientY - rect.top - rect.height / 2) / 25;

      gsap.to(imageWrapperRef.current, {
        rotationY: x,
        rotationX: -y,
        duration: 0.8,
        ease: 'power2.out',
        transformPerspective: 900
      });
    };

    const handleMouseLeave = () => {
      gsap.to(imageWrapperRef.current, {
        rotationY: 0,
        rotationX: 0,
        duration: 1.2,
        ease: 'power3.out'
      });
    };

    const el = imageWrapperRef.current;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="founder" className="relative w-full py-32 sm:py-44 px-6 bg-[#030305] border-t border-white/[0.06] overflow-hidden">
      
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-indigo-500/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Pre-Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Leadership & Vision</span>
          </div>

          <h2 className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
            Built with a simple belief.<br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-indigo-300">
              Show what you can do.
            </span>
          </h2>
        </div>

        {/* Two-Column Premium Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Large Founder Portrait with 3D Depth Treatment */}
          <div className="lg:col-span-5 relative" ref={containerRef}>
            
            {/* Ambient Backlight for Frame */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/10 to-transparent blur-xl pointer-events-none" />

            {/* Main Portrait Container */}
            <div 
              ref={imageWrapperRef}
              className="relative rounded-3xl p-2 bg-gradient-to-b from-white/[0.12] to-white/[0.04] border border-white/[0.12] shadow-[0_30px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl group"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#0c0c12]">
                <img
                  src="/faishal-founder.png"
                  alt="Faishal Naushad — Founder of HirePilot"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute inset-0 border border-white/[0.08] rounded-2xl pointer-events-none" />
              </div>

              {/* Floating UI Badge 1 (Top Right) */}
              <div className="absolute -top-3 -right-3 sm:-right-4 px-4 py-2 rounded-xl bg-[#0a0a0f]/90 border border-white/20 text-xs font-mono text-white flex items-center gap-2 shadow-xl backdrop-blur-md transform transition-transform duration-500 hover:-translate-y-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>89% Interview Score</span>
              </div>

              {/* Floating UI Badge 2 (Bottom Left) */}
              <div className="absolute -bottom-4 -left-3 sm:-left-4 p-4 rounded-2xl bg-[#0e0e14]/90 border border-white/15 text-xs text-white shadow-2xl backdrop-blur-md max-w-[200px] transform transition-transform duration-500 hover:-translate-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] uppercase tracking-wider mb-1 font-bold">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>92% Company Match</span>
                </div>
                <p className="text-[11px] text-white/70 leading-snug">
                  AI Assessment Complete
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT: Founder Story, Vision & Journey Timeline */}
          <div className="lg:col-span-7 space-y-8">
            
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold block mb-2">
                Meet the Founder
              </span>
              <h3 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Faishal Naushad
              </h3>
              <p className="text-sm font-mono text-white/50 mt-1">
                Founder & Builder — HirePilot
              </p>
            </div>

            {/* Vision Statement Quote */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border-l-2 border-cyan-400 border-y border-r border-white/[0.06] backdrop-blur-md">
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 block mb-2 font-semibold">
                The vision behind HirePilot
              </span>
              <blockquote className="text-lg sm:text-xl font-sans text-white/90 font-light leading-relaxed italic">
                &ldquo;Great opportunities should be discovered through what you can actually do — not just what's written on your resume. HirePilot gives everyone a stage to practice, perform, and be seen by the right companies based on pure skill.&rdquo;
              </blockquote>
            </div>

            {/* Social / Connect Links */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="https://www.instagram.com/techifyfaishal?stkn=MWE1ZGo1cmEzYWw3eA=="
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10 hover:border-fuchsia-500/50 hover:bg-fuchsia-500/10 transition-all duration-300 overflow-hidden"
              >
                <Instagram className="w-5 h-5 text-white/70 group-hover:text-fuchsia-400 transition-colors duration-300 group-hover:scale-110" />
                <span className="text-sm font-semibold text-white/90 group-hover:text-white">Instagram ↗</span>
                <div className="absolute inset-0 rounded-full bg-fuchsia-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </a>

              <a
                href="https://www.linkedin.com/in/faishal-naushad-b28807273/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 overflow-hidden"
              >
                <Linkedin className="w-5 h-5 text-white/70 group-hover:text-cyan-400 transition-colors duration-300 group-hover:scale-110" />
                <span className="text-sm font-semibold text-white/90 group-hover:text-white">LinkedIn ↗</span>
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
