import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollReveal } from '../ui/ScrollReveal';

export const HowItWorks: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="how-it-works" className="w-full py-16 sm:py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <ScrollReveal className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="glass-pill px-3.5 py-1.5 rounded-full text-[#7657FF] font-semibold uppercase tracking-widest text-xs mb-3 border border-white/10">
          How It Works
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          From Zero to Offer in Three Precise Steps
        </h2>
        <p className="text-sm sm:text-base text-[#9AA4B7] mt-3 leading-relaxed">
          Experience frictionless career progression designed to replace guesswork with empirical preparation.
        </p>
      </ScrollReveal>

      {/* 3 Step Process Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        {/* Step 1 */}
        <ScrollReveal delayMs={0} className="h-full">
          <div className="glass-card glass-card-interactive p-6 rounded-3xl flex flex-col justify-between h-full gap-5">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-2xl bg-gradient-to-b from-[#7657FF] to-[#5e3be7] text-white font-bold text-lg flex items-center justify-center border border-white/20 shadow-md">
                  1
                </span>
                <span className="px-2.5 py-1 rounded-full glass-pill font-mono text-xs text-[#9AA4B7]">
                  Setup • 60s
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                Choose Your Target Role
              </h3>
              <p className="text-xs sm:text-sm text-[#9AA4B7] leading-relaxed">
                Select your targeted industry, engineering track, seniority level (Junior to Staff), and paste relevant JD requirements.
              </p>
            </div>

            {/* Workflow preview */}
            <div className="glass-inset p-4 rounded-2xl space-y-2.5 border border-white/5 mt-auto">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white font-medium">Target: Staff Backend Architect</span>
                <span className="text-[#36D399] font-mono text-[11px] bg-[#36D399]/15 px-2 py-0.5 rounded-full border border-[#36D399]/25">
                  Ready
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden shadow-inner">
                <div className="w-full h-full bg-gradient-to-r from-[#7657FF] to-[#36D6FF]" />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Step 2 */}
        <ScrollReveal delayMs={100} className="h-full">
          <div className="glass-card glass-card-interactive p-6 rounded-3xl flex flex-col justify-between h-full gap-5">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-2xl bg-gradient-to-b from-[#36D6FF] to-[#009ac2] text-black font-bold text-lg flex items-center justify-center border border-white/20 shadow-md">
                  2
                </span>
                <span className="px-2.5 py-1 rounded-full glass-pill font-mono text-xs text-[#36D6FF]">
                  Real-Time Simulation
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                Start AI Mock Interview
              </h3>
              <p className="text-xs sm:text-sm text-[#9AA4B7] leading-relaxed">
                Engage with intelligent conversational agents that press deeper into your answers, challenge edge cases, and evaluate poise.
              </p>
            </div>

            {/* Audio simulation */}
            <div className="glass-inset p-4 rounded-2xl flex items-center justify-between border border-white/5 mt-auto">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#36D399] animate-ping" />
                <span className="font-mono text-xs text-white font-medium">Speech Frequency Analysis</span>
              </div>
              <span className="text-xs text-[#36D6FF] font-mono px-2 py-0.5 rounded-full bg-[#36D6FF]/15">
                142 WPM
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Step 3 */}
        <ScrollReveal delayMs={200} className="h-full">
          <div className="glass-card glass-card-interactive p-6 rounded-3xl flex flex-col justify-between h-full gap-5">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-2xl bg-gradient-to-b from-[#36D399] to-[#00865d] text-white font-bold text-lg flex items-center justify-center border border-white/20 shadow-md">
                  3
                </span>
                <span className="px-2.5 py-1 rounded-full glass-pill font-mono text-xs text-[#36D399]">
                  Action Plan
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                Receive Granular Report
              </h3>
              <p className="text-xs sm:text-sm text-[#9AA4B7] leading-relaxed">
                Obtain an immediate breakdown: answer quality, technical accuracy, missing keywords, and follow-up recommended study drills.
              </p>
            </div>

            {/* Report visual tag */}
            <div className="glass-inset p-4 rounded-2xl flex items-center justify-between border border-white/5 mt-auto">
              <span className="font-mono text-xs text-[#c9beff] font-medium">Report #993 Generated</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#36D399]/20 border border-[#36D399]/30 text-[#36D399] text-xs font-semibold">
                Passed Benchmark
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom CTA */}
      <ScrollReveal delayMs={200} className="mt-12 sm:mt-16 text-center">
        <button
          type="button"
          onClick={() => navigate('/interview/setup')}
          className="relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm sm:text-base bg-gradient-to-b from-[#8367FF] to-[#6340F5] text-white border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_12px_24px_-6px_rgba(118,87,255,0.45)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>Select Your Role and Begin</span>
          <i className="pi pi-arrow-right text-xs" />
        </button>
      </ScrollReveal>
    </section>
  );
};

export default HowItWorks;
