import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { ScrollReveal } from '../ui/ScrollReveal';

export const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#8750FF] text-xs font-mono font-semibold tracking-wide uppercase mb-3 border border-purple-200/50">
            <i className="pi pi-question-circle text-xs" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Everything you need to know about interview limits, resume features, AI evaluations, and getting started.
          </p>
        </ScrollReveal>

        {/* PrimeReact Accordion */}
        <ScrollReveal delayMs={100} className="remasto-accordion">
          <Accordion activeIndex={0}>
            
            {/* 1. Interview limits */}
            <AccordionTab header="How many free mock interviews do I get, and how do limits work?">
              <p>
                Every new HirePilot account receives <strong>3 comprehensive AI mock interviews completely free forever</strong>. 
                There is no credit card required to start practicing. When you want more practice, you can purchase the <strong>Pro pack (15 interviews for ₹249 + 18% GST = ₹294 total)</strong> or the <strong>Unlimited plan (unlimited interviews for ₹599 + 18% GST = ₹707 total)</strong>.
              </p>
            </AccordionTab>

            {/* 2. Resume features */}
            <AccordionTab header="How does the Resume Builder help improve my job applications?">
              <p>
                HirePilot&apos;s Resume Builder audits your resume against industry Applicant Tracking Systems (ATS). 
                It identifies missing technical keywords, recommends Google XYZ-style impact bullet points (Accomplished [X] as measured by [Y], by doing [Z]), and directly links your resume achievements to the live questions you rehearse.
              </p>
            </AccordionTab>

            {/* 3. Account creation */}
            <AccordionTab header="How do I create an account and get started?">
              <p>
                Getting started takes under 30 seconds. Click any &quot;Get Started&quot; or &quot;Start Practicing&quot; button, enter your email or sign in with Google. 
                Your dashboard is immediately activated with your free mock interview credits ready to launch.
              </p>
            </AccordionTab>

            {/* 4. AI feedback engine */}
            <AccordionTab header="How does HirePilot's AI evaluate my interview responses?">
              <p>
                HirePilot uses an advanced Google Gemini Pro assessment engine configured with multi-rubric evaluation standards. 
                Your answers are analyzed for <strong>Technical Depth & Precision</strong>, <strong>Architecture Trade-offs</strong>, <strong>Communication Clarity</strong>, and <strong>Edge Case Handling</strong>. You receive granular percentage scores and targeted recommendations within 3 seconds of submitting your answer.
              </p>
            </AccordionTab>

            {/* 5. Customization */}
            <AccordionTab header="Are the interview questions tailored to specific roles and seniority?">
              <p>
                Yes. You can customize your practice session across Frontend, Backend, Full Stack, Data Structures & Algorithms, Distributed System Design, and Behavioral rounds, with difficulty calibrated from Entry-Level to Senior and Staff Engineer.
              </p>
            </AccordionTab>

          </Accordion>
        </ScrollReveal>

        {/* Still have questions banner */}
        <ScrollReveal delayMs={160} className="mt-12 text-center p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
          <h4 className="text-sm font-bold text-slate-800">Have a custom question or need dedicated assistance?</h4>
          <p className="text-xs text-slate-500 mt-1">Our team is here to help you accelerate your career.</p>
          <div className="mt-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8750FF] hover:underline"
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
