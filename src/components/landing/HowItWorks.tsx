import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MonitorPlay, Sparkles, LineChart, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      num: '01',
      title: 'Take the Test',
      desc: 'Start an online interview or assessment designed around your skills.',
      icon: <MonitorPlay className="w-6 h-6 text-cyan-400" />
    },
    {
      num: '02',
      title: 'Show Your Skills',
      desc: 'Answer questions and demonstrate your technical and communication abilities.',
      icon: <Sparkles className="w-6 h-6 text-indigo-400" />
    },
    {
      num: '03',
      title: 'Understand Your Performance',
      desc: 'Get structured insights, scores and areas for improvement.',
      icon: <LineChart className="w-6 h-6 text-emerald-400" />
    },
    {
      num: '04',
      title: 'Discover Opportunities',
      desc: 'HirePilot recommends companies and opportunities that align with your profile.',
      icon: <Target className="w-6 h-6 text-fuchsia-400" />
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the connecting line
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true
          }
        }
      );

      // Animate each step fading in
      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        gsap.fromTo(step,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full py-24 sm:py-32 px-6 bg-[#000000] relative" id="how-it-works">
      <div className="max-w-4xl mx-auto" ref={containerRef}>
        
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-white/50 text-lg">Your journey from practice to placement.</p>
        </div>

        <div className="relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[39px] sm:left-1/2 top-0 bottom-0 w-px bg-white/10 hidden sm:block">
            <div ref={lineRef} className="w-full h-full bg-gradient-to-b from-cyan-400 via-indigo-500 to-fuchsia-500 origin-top" />
          </div>

          <div className="space-y-16">
            {steps.map((step, i) => (
              <div 
                key={i} 
                ref={el => stepsRef.current[i] = el}
                className={`relative flex flex-col sm:flex-row gap-8 items-start ${i % 2 === 0 ? 'sm:flex-row-reverse text-left' : 'text-left sm:text-right'}`}
              >
                {/* Center Node */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-0 w-20 h-20 items-center justify-center z-10">
                  <div className="w-12 h-12 rounded-full bg-[#0a0a0e] border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="w-full sm:w-1/2 relative group">
                  <div className={`sm:px-12 ${i % 2 === 0 ? '' : 'sm:text-right'}`}>
                    <span className="text-4xl font-black text-white/5 font-mono mb-2 block">{step.num}</span>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{step.title}</h3>
                    <p className="text-white/60 leading-relaxed">{step.desc}</p>
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
