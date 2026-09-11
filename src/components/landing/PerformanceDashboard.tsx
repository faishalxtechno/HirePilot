import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, TrendingUp, Cpu, MessageSquare, BrainCircuit, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const PerformanceDashboard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  const metrics = [
    { label: 'Technical Skills', score: 92, icon: <Cpu className="w-4 h-4" /> },
    { label: 'Communication', score: 86, icon: <MessageSquare className="w-4 h-4" /> },
    { label: 'Problem Solving', score: 89, icon: <BrainCircuit className="w-4 h-4" /> },
    { label: 'Confidence', score: 81, icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Reset bars
    barsRef.current.forEach(bar => {
      if (bar) gsap.set(bar, { scaleX: 0 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 80%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(cardRef.current,
      { opacity: 0, y: 30, rotationX: -10 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.8, ease: "power3.out" }
    ).to(barsRef.current,
      { scaleX: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", transformOrigin: "left center" },
      "-=0.4"
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section className="w-full py-24 sm:py-32 px-6 bg-[#000000] relative" id="assessments">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10" ref={containerRef}>
        
        {/* Left: Content */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            <Trophy className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs uppercase tracking-widest font-mono font-bold text-indigo-300">
              Actionable Insights
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Know where you stand.
          </h2>
          
          <p className="text-lg text-white/60 leading-relaxed max-w-lg">
            Every interview gives you more than a score. It gives you a clearer picture of your strengths, your gaps, and where you can improve.
          </p>

          <button className="mt-4 px-8 py-3.5 rounded-full bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] text-white font-semibold text-sm transition-colors flex items-center gap-2 group">
            See Your Performance <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Right: Dashboard UI */}
        <div 
          ref={cardRef}
          className="w-full p-8 rounded-3xl bg-[#0a0a0e]/80 border border-white/10 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
          style={{ perspective: '1000px' }}
        >
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Interview Performance</h3>
                <p className="text-sm text-white/50">Detailed Breakdown</p>
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                89<span className="text-2xl text-white/40">%</span>
              </span>
              <p className="text-xs uppercase tracking-wider font-bold text-emerald-400 mt-1">Overall Match</p>
            </div>
          </div>

          <div className="space-y-6">
            {metrics.map((metric, i) => (
              <div key={metric.label}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                    <span className="text-white/40">{metric.icon}</span>
                    {metric.label}
                  </div>
                  <span className="text-sm font-mono text-cyan-300 font-bold">{metric.score}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div 
                    ref={el => barsRef.current[i] = el}
                    className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400"
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
