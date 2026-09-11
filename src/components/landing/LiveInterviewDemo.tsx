import React, { useEffect, useRef } from 'react';
import { Mic, Video, Sparkles, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const LiveInterviewDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const aiAnalysisRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !aiAnalysisRef.current) return;

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

    // Animate AI analysis appearing and bars growing
    tl.fromTo(aiAnalysisRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    ).to(barsRef.current, 
      { scaleX: 1, duration: 1, stagger: 0.2, ease: "power3.out", transformOrigin: "left center" },
      "-=0.2"
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section className="relative w-full py-24 sm:py-32 px-6 bg-[#000000] overflow-hidden" id="live-demo">
      <div className="absolute inset-0 bg-grid-subtle opacity-20 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Left: The Interview Interface */}
        <div 
          ref={containerRef}
          className="w-full lg:w-3/5 rounded-2xl bg-[#0a0a0e] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0d0d12]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-mono text-white/50 uppercase tracking-widest">Recording</span>
            </div>
            <span className="text-xs font-mono text-cyan-400">Question 03 / 10</span>
          </div>

          {/* Video Area */}
          <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden group">
            {/* Simulated Candidate Video */}
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800" 
              alt="Candidate" 
              className="w-full h-full object-cover opacity-80"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Question Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="px-5 py-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
                <p className="text-sm sm:text-base font-medium text-white">
                  "Explain how you would optimize a slow database query."
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="absolute top-4 right-4 flex gap-3">
              <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80">
                <Mic className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80">
                <Video className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI Analysis Panel */}
        <div className="w-full lg:w-2/5 flex flex-col justify-center space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Real-time AI Evaluation
            </h2>
            <p className="text-white/60 leading-relaxed font-light">
              As you answer, our proprietary AI engine evaluates your technical depth, clarity, and problem-solving skills, giving you actionable insights immediately.
            </p>
          </div>

          <div 
            ref={aiAnalysisRef}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm space-y-6 opacity-0"
          >
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Live Analysis</h4>
                <p className="text-xs text-white/50">Computing metrics...</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Metric 1 */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-white/80">Technical Depth</span>
                  <span className="text-cyan-400 font-mono">94%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    ref={el => barsRef.current[0] = el}
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 w-[94%]" 
                  />
                </div>
              </div>

              {/* Metric 2 */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-white/80">Clarity & Communication</span>
                  <span className="text-cyan-400 font-mono">89%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    ref={el => barsRef.current[1] = el}
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 w-[89%]" 
                  />
                </div>
              </div>

              {/* Metric 3 */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-white/80">Problem Solving</span>
                  <span className="text-cyan-400 font-mono">92%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    ref={el => barsRef.current[2] = el}
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 w-[92%]" 
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Strong response detected.</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
