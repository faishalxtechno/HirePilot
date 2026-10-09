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
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#8750FF] text-xs font-mono font-semibold tracking-wide uppercase mb-3 border border-purple-200/50">
            <i className="pi pi-sparkles text-xs" />
            <span>Built For Job Seekers & Students</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why Prepare With HirePilot?
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Traditional interview preparation relies on static flashcards and guesswork. HirePilot gives you an intelligent coach that listens, evaluates, and guides you to readiness.
          </p>
        </ScrollReveal>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {benefits.map((b, idx) => (
            <ScrollReveal key={b.title} delayMs={idx * 80} className="h-full">
              <Card
                className="!rounded-3xl !border !border-slate-200/90 !bg-slate-50/50 hover:!bg-white hover:!border-[#8750FF]/40 hover:!shadow-[0_16px_36px_rgba(135,80,255,0.08)] transition-all duration-200 hover:-translate-y-1 !p-2 h-full"
              >
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100/70 text-[#8750FF] flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                      <i className={`pi ${b.icon} text-lg`} />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#8750FF] bg-purple-50 border border-purple-200/60 px-3 py-1 rounded-full">
                      {b.stat}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {b.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Highlight Banner */}
        <ScrollReveal delayMs={160} className="mt-12">
          <div className="rounded-3xl bg-gradient-to-r from-purple-50 via-slate-50 to-indigo-50 border border-purple-100 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-lg font-bold text-slate-900">Ready to test your real interview performance?</h4>
              <p className="text-sm text-slate-600">Start with 3 free mock interviews — no credit card required.</p>
            </div>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#8750FF] text-white text-sm font-bold shadow-md hover:bg-[#723DE8] transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98]"
            >
              <span>View Pricing & Plans</span>
              <i className="pi pi-arrow-right text-xs" />
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default ProductBenefits;
