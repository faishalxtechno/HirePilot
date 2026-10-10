import React from 'react';
import { Card } from 'primereact/card';

import { ScrollReveal } from '../ui/ScrollReveal';

export const ProductBenefits: React.FC = () => {
  const benefits = [
    {
      title: 'Zero-Guesswork AI Scoring',
      desc: 'No more waiting weeks for generic rejection emails. Receive instant, multi-dimensional feedback highlighting technical precision, clarity, and structural gaps.',
      icon: 'pi-bolt',
      stat: '3s Feedback Loop',
    },
    {
      title: 'Resume & Interview Alignment',
      desc: 'Ensure the skills highlighted on your resume match the answers you deliver live. HirePilot aligns project discussions directly with employer expectations.',
      icon: 'pi-file-check',
      stat: 'ATS & Role Synced',
    },
    {
      title: 'Overcome Interview Anxiety',
      desc: 'Desensitize high-stakes pressure through realistic simulation with a timer, real-time transcription, and dynamic interviewer follow-ups.',
      icon: 'pi-shield',
      stat: 'Safe Practice Space',
    },
    {
      title: 'Targeted Skill Remediation',
      desc: 'Pinpoint weak spots in algorithms, distributed architecture, or communication so you spend study hours only where they move the needle.',
      icon: 'pi-chart-pie',
      stat: 'Pinpoint Accuracy',
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 relative max-w-7xl mx-auto">
      {/* Section Header */}
      <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
        <div className="glass-pill inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[#36D6FF] text-xs font-mono font-semibold tracking-wide uppercase mb-3 border border-white/10">
          <i className="pi pi-sparkles text-xs" />
          <span>Built For Job Seekers & Students</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Why Prepare With HirePilot?
        </h2>
        <p className="mt-3 text-[#9AA4B7] text-base sm:text-lg leading-relaxed">
          Traditional interview preparation relies on static flashcards and guesswork. HirePilot gives you an intelligent coach that listens, evaluates, and guides you to readiness.
        </p>
      </ScrollReveal>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {benefits.map((b, idx) => (
          <ScrollReveal key={b.title} delayMs={idx * 80} className="h-full">
            <div className="glass-card glass-card-interactive p-6 sm:p-8 rounded-3xl border border-white/10 h-full flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#7657FF]/20 text-[#c9beff] border border-[#7657FF]/30 flex items-center justify-center">
                  <i className={`pi ${b.icon} text-lg`} />
                </div>
                <span className="text-xs font-mono font-bold text-[#36D6FF] glass-pill border border-white/10 px-3 py-1 rounded-full">
                  {b.stat}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                {b.title}
              </h3>

              <p className="text-sm sm:text-base text-[#9AA4B7] leading-relaxed">
                {b.desc}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Highlight Banner */}
      <ScrollReveal delayMs={160} className="mt-12">
        <div className="glass-card-prominent rounded-3xl border border-white/15 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white">Ready to test your real interview performance?</h4>
            <p className="text-sm text-[#9AA4B7]">Start with 3 free mock interviews — no credit card required.</p>
          </div>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-b from-[#8367FF] to-[#6340F5] text-white text-sm font-bold shadow-md hover:brightness-110 transition-all active:scale-[0.98]"
          >
            <span>View Pricing & Plans</span>
            <i className="pi pi-arrow-right text-xs" />
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default ProductBenefits;
