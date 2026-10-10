import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { ScrollReveal } from '../ui/ScrollReveal';

export const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 bg-transparent border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-purple-300 text-xs font-mono font-semibold tracking-wide uppercase mb-3 border border-white/10 backdrop-blur-md">
            <i className="pi pi-question-circle text-xs text-purple-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Everything you need to know about interview limits, resume features, AI evaluations, and getting started.
          </p>
        </ScrollReveal>

        {/* Custom Dark Glass Accordion */}
        <ScrollReveal delayMs={100} className="remasto-accordion space-y-4">
          <Accordion activeIndex={0}>
            
            {/* 1. Interview limits */}
            <AccordionTab header="How many free mock interviews do I get, and how do limits work?">
              <p className="text-slate-300 leading-relaxed text-sm">
                Every new HirePilot account receives <strong className="text-white">3 comprehensive AI mock interviews completely free forever</strong>. 
                There is no credit card required to start practicing. When you want more practice, you can purchase the <strong className="text-purple-300">Pro pack (15 interviews for ₹249 + 18% GST = ₹294 total)</strong> or the <strong className="text-cyan-300">Unlimited plan (unlimited interviews for ₹599 + 18% GST = ₹707 total)</strong>.
              </p>
            </AccordionTab>

            {/* 2. Resume features */}
            <AccordionTab header="How does the Resume Builder help improve my job applications?">
              <p className="text-slate-300 leading-relaxed text-sm">
                HirePilot&apos;s Resume Builder audits your resume against industry Applicant Tracking Systems (ATS). 
                It identifies missing technical keywords, recommends Google XYZ-style impact bullet points (Accomplished [X] as measured by [Y], by doing [Z]), and directly links your resume achievements to the live questions you rehearse.
              </p>
            </AccordionTab>

            {/* 3. Account creation */}
            <AccordionTab header="How do I create an account and get started?">
              <p className="text-slate-300 leading-relaxed text-sm">
                Getting started takes under 30 seconds. Click any &quot;Get Started&quot; or &quot;Start Practicing&quot; button, enter your email or sign in with Google. 
                Your dashboard is immediately activated with your free mock interview credits ready to launch.
              </p>
            </AccordionTab>

            {/* 4. AI feedback engine */}
            <AccordionTab header="How does HirePilot's AI evaluate my interview responses?">
              <p className="text-slate-300 leading-relaxed text-sm">
                HirePilot uses an advanced Google Gemini Pro assessment engine configured with multi-rubric evaluation standards. 
                Your answers are analyzed for <strong className="text-white">Technical Depth & Precision</strong>, <strong className="text-white">Architecture Trade-offs</strong>, <strong className="text-white">Communication Clarity</strong>, and <strong className="text-white">Edge Case Handling</strong>. You receive granular percentage scores and targeted recommendations within 3 seconds of submitting your answer.
              </p>
            </AccordionTab>

            {/* 5. Customization */}
            <AccordionTab header="Are the interview questions tailored to specific roles and seniority?">
              <p className="text-slate-300 leading-relaxed text-sm">
                Yes. You can customize your practice session across Frontend, Backend, Full Stack, Data Structures & Algorithms, Distributed System Design, and Behavioral rounds, with difficulty calibrated from Entry-Level to Senior and Staff Engineer.
              </p>
            </AccordionTab>

          </Accordion>
        </ScrollReveal>

        {/* Still have questions banner */}
        <ScrollReveal delayMs={160} className="mt-12 text-center p-6 rounded-2xl glass-card border border-white/10 shadow-xl">
          <h4 className="text-sm font-bold text-white">Have a custom question or need dedicated assistance?</h4>
          <p className="text-xs text-slate-400 mt-1">Our team is here to help you accelerate your career.</p>
          <div className="mt-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
            >
              <span>Contact Support</span>
              <i className="pi pi-arrow-right text-[10px]" />
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default FAQSection;
