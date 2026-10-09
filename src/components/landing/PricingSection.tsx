import React from 'react';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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
    <section id="pricing" className="py-20 sm:py-28 px-4 sm:px-6 bg-slate-50/60 border-t border-slate-200/70">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#8750FF] text-xs font-mono font-semibold tracking-wide uppercase mb-3 border border-purple-200/50">
            <i className="pi pi-tag text-xs" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Simple, Transparent Plans
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Start for free with 3 full mock interviews. Upgrade when you need deeper practice and unlimited repetitions.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl bg-white p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'border-2 border-[#8750FF] shadow-[0_20px_50px_rgba(135,80,255,0.14)] md:-translate-y-2'
                  : 'border border-slate-200/90 shadow-sm hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-[#8750FF] text-white text-xs font-bold shadow-md tracking-wide uppercase font-mono">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">{plan.name}</h3>
                  <span className={`text-[11px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${plan.badgeVariant}`}>
                    {plan.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 min-h-[40px] leading-relaxed mb-6">
                  {plan.description}
                </p>

                {/* Price block */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-6 space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{plan.period}</span>
                  </div>
                  
                  {/* Tax Breakdown */}
                  <div className="text-xs text-slate-500 font-mono pt-1">
                    {plan.taxNote}
                  </div>
                  
                  {/* Total Amount Display */}
                  <div className="text-xs font-semibold text-[#8750FF] pt-0.5">
                    {plan.totalDisplay}
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 mt-2 flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <i className="pi pi-check-circle text-[#8750FF]" />
                    <span>Includes {plan.interviews}</span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                    What's included:
                  </span>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                      <i className="pi pi-check text-[#8750FF] text-xs mt-1 shrink-0 font-bold" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 mt-auto">
                <Button
                  label={plan.ctaText}
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  onClick={handlePlanSelect}
                  className={`w-full !rounded-2xl !py-3 !font-bold !text-sm transition-all ${
                    plan.popular
                      ? '!bg-[#8750FF] !border-[#8750FF] !text-white hover:!bg-[#723DE8] !shadow-[0_4px_16px_rgba(135,80,255,0.35)]'
                      : '!bg-slate-900 !border-slate-900 !text-white hover:!bg-slate-800'
                  }`}
                />
              </div>

            </div>
          ))}
        </div>

        {/* GST & Regulatory Notice */}
        <div className="mt-12 text-center text-xs text-slate-500 font-mono">
          Prices in INR. Applicable 18% GST is clearly displayed on all paid tiers. No recurring surprise charges.
        </div>

      </div>
    </section>
  );
};

export default PricingSection;
