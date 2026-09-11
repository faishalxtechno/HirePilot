import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Building2, ChevronRight, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CompanyRecommendations: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  const companies = [
    {
      name: 'Microsoft',
      match: 92,
      role: 'Software Engineering',
      skills: ['Python', 'Data Structures', 'Machine Learning'],
      color: 'from-blue-500 to-cyan-400',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' // Placeholder icon visual
    },
    {
      name: 'Google',
      match: 88,
      role: 'Software Engineering',
      skills: ['Algorithms', 'Python', 'Cloud'],
      color: 'from-red-500 to-yellow-400',
    },
    {
      name: 'Amazon',
      match: 86,
      role: 'Backend Engineering',
      skills: ['Java', 'AWS', 'System Design'],
      color: 'from-orange-500 to-yellow-500',
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Reset connecting lines
    linesRef.current.forEach(line => {
      if (line) gsap.set(line, { scaleX: 0 });
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo(cardsRef.current,
        { opacity: 0, x: 50, rotateY: 15 },
        { opacity: 1, x: 0, rotateY: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" }
      ).to(linesRef.current,
        { scaleX: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", transformOrigin: "left center" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full py-24 sm:py-32 px-6 bg-[#050505] relative overflow-hidden" id="companies">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10" ref={containerRef}>
        
        {/* Left: Text */}
        <div className="w-full lg:w-5/12 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs uppercase tracking-widest font-mono font-bold text-cyan-300">
              Get Discovered
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Your skills deserve the right opportunity.
          </h2>
          
          <p className="text-lg text-white/60 leading-relaxed">
            Based on your interview performance and skill profile, HirePilot helps you discover companies and opportunities that may be a strong fit.
          </p>
        </div>

        {/* Right: Network Map / Cards */}
        <div className="w-full lg:w-7/12 relative flex items-center" style={{ perspective: '1000px' }}>
          
          {/* Candidate Node (Left side of right panel) */}
          <div className="hidden sm:flex flex-col items-center gap-3 z-20 absolute left-0 bg-[#0a0a0e] p-4 rounded-2xl border border-white/10 shadow-2xl">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400/50 relative">
               <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-white">Your Profile</p>
              <p className="text-[10px] text-cyan-400 font-mono">Analyzed</p>
            </div>
          </div>

          <div className="w-full sm:pl-32 flex flex-col gap-5">
            {companies.map((company, i) => (
              <div key={company.name} className="relative w-full flex items-center">
                
                {/* Connecting Line from Profile to Card */}
                <div 
                  ref={el => linesRef.current[i] = el}
                  className="hidden sm:block absolute right-full top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-cyan-400/20 to-cyan-400"
                  style={{ width: '40px' }}
                />

                <div 
                  ref={el => cardsRef.current[i] = el}
                  className="w-full p-5 sm:p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        {company.name}
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white/80">Demo</span>
                      </h4>
                      <p className="text-xs text-white/50 mt-1 flex items-center gap-1.5">
                        <Briefcase className="w-3 h-3" /> {company.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-3">
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-sm font-mono font-bold text-emerald-400">{company.match}% MATCH</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {company.skills.map(skill => (
                        <span key={skill} className="text-[10px] font-mono px-2 py-1 rounded bg-black/40 text-white/60 border border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover arrow indicator */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 hidden sm:block">
                     <ChevronRight className="w-5 h-5 text-white/30" />
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
