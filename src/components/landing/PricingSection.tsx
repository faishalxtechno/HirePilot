import React from 'react';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { ScrollReveal } from '../ui/ScrollReveal';

export const PricingSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePlanSelect = () => {
    if (user) {
      navigate('/interview/setup');
    } else {
      navigate('/signup');
    }
  };

  const plans = [
    {
      name: 'Free Starter',
      badge: 'Free Forever',
      badgeVariant: 'bg-slate-100 text-slate-700 border-slate-200',
      price: '₹0',
      period: 'forever free',
      taxNote: 'No credit card required',
      totalDisplay: 'Total: ₹0',
      interviews: '3 Mock Interviews',
      description: 'Ideal for trying out AI-powered interview practice and testing your skills.',
      popular: false,
      features: [
        '3 Comprehensive AI Mock Interviews',
        'Instant AI scoring & feedback report',
        'ATS resume analysis & score breakdown',
        'Standard evaluation speed',
        'All engineering & product roles',
      ],
      ctaText: user ? 'Start Free Practice' : 'Get Started Free',
    },
    {
      name: 'HirePilot Pro',
      badge: 'Most Popular',
      badgeVariant: 'bg-purple-100 text-[#8750FF] border-purple-200',
      price: '₹249',
      period: 'one-time pack',
      taxNote: '+ 18% GST (₹44.82)',
      totalDisplay: 'Total: ₹293.82 (₹294 incl. GST)',
      interviews: '15 Mock Interviews',
      description: 'The optimal package for active job seekers preparing for target company rounds.',
      popular: true,
      features: [
        '15 Comprehensive AI Mock Interviews',
        'Advanced System Design & DSA deep-dives',
        'AI Resume Bullet Rewriter (Action + Metric)',
        'Audio speech transcription & pace feedback',
        'Detailed rubric report with exportable feedback',
        'Priority Gemini Pro evaluation queue',
      ],
      ctaText: 'Choose Pro Plan',
    },
    {
      name: 'Unlimited Career',
      badge: 'Best Value',
      badgeVariant: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      price: '₹599',
      period: 'unlimited pack',
      taxNote: '+ 18% GST (₹107.82)',
      totalDisplay: 'Total: ₹706.82 (₹707 incl. GST)',
      interviews: 'Unlimited Interviews',
      description: 'Uncapped interview practice, continuous resume optimization, and priority matching.',
      popular: false,
      features: [
        'Unlimited AI Mock Interviews (All roles & seniority)',
        'Unlimited Resume Rewrites & Job Match Analysis',
        'Deep-dive behavioral + technical adaptive loop',
        'Detailed audio voice mock interviews with live transcription',
        'Priority recruiter visibility and certified interview report',
        '24/7 Priority AI assistance',
      ],
      ctaText: 'Get Unlimited Access',
    },
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 px-4 sm:px-6 relative max-w-7xl mx-auto">
      {/* Section Header */}
      <ScrollReveal className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 sm:mb-20">
        <span className="glass-pill px-3.5 py-1.5 rounded-full text-[#36D6FF] font-semibold uppercase tracking-widest text-xs mb-3 border border-white/10">
          Transparent Investment
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Flexible Plans For Every Career Phase
        </h2>
        <p className="text-sm sm:text-base text-[#9AA4B7] mt-3 leading-relaxed">
          Upgrade, pause, or switch at any time. Transparent Indian Rupee billing with immediate access.
        </p>
      </ScrollReveal>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {plans.map((plan, pIdx) => (
          <ScrollReveal key={plan.name} delayMs={pIdx * 80} className="h-full">
            <div
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full transition-all duration-200 ${
                plan.popular
                  ? 'glass-card-prominent border-2 border-[#7657FF]/80 shadow-[0_24px_50px_rgba(118,87,255,0.25),inset_0_1px_0_rgba(255,255,255,0.25)] -mt-2 lg:-mt-4'
                  : 'glass-card glass-card-interactive border border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#7657FF] to-[#36D6FF] text-white text-[11px] font-bold shadow-md tracking-wider uppercase font-mono border border-white/20">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white tracking-tight">{plan.name}</h3>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full glass-pill border border-white/10 text-[#36D6FF]">
                    {plan.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#9AA4B7] min-h-[40px] leading-relaxed mb-6">
                  {plan.description}
                </p>

                {/* Price block */}
                <div className="p-4 rounded-2xl glass-inset border border-white/5 mb-6 space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
                      {plan.price}
                    </span>
                    <span className="text-xs text-[#9AA4B7] font-medium">{plan.period}</span>
                  </div>
                  
                  {/* Tax Breakdown */}
                  <div className="text-xs text-[#9AA4B7] font-mono pt-1">
                    {plan.taxNote}
                  </div>
                  
                  {/* Total Amount Display */}
                  <div className="text-xs font-semibold text-[#c9beff] pt-0.5">
                    {plan.totalDisplay}
                  </div>

                  <div className="pt-2 border-t border-white/10 mt-2 flex items-center gap-1.5 text-xs font-bold text-[#36D399]">
                    <i className="pi pi-check-circle text-[#36D399]" />
                    <span>Includes {plan.interviews}</span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9AA4B7] font-semibold block">
                    What's included:
                  </span>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F8FC]">
                      <i className="pi pi-check text-[#36D6FF] text-xs mt-1 shrink-0 font-bold" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 mt-auto">
                <button
                  type="button"
                  onClick={handlePlanSelect}
                  className={`w-full rounded-2xl py-3 font-semibold text-sm transition-all duration-150 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-gradient-to-b from-[#8367FF] to-[#6340F5] text-white shadow-[0_8px_20px_rgba(118,87,255,0.4)] border border-white/25 hover:brightness-110'
                      : 'glass-pill text-white hover:bg-white/15 border border-white/15'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <i className="pi pi-arrow-right text-xs" />
                </button>
              </div>

            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* GST & Regulatory Notice */}
      <div className="mt-12 text-center text-xs text-[#9AA4B7] font-mono">
        Prices in INR. Applicable 18% GST is clearly displayed on all paid tiers. No recurring surprise charges.
      </div>
    </section>
  );
};

export default PricingSection;
