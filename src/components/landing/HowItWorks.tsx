import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export const HowItWorks: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      step: '01',
      title: 'Choose your interview role',
      desc: 'Select from Frontend, Backend, Fullstack, System Design, DSA, or Behavioral tracks. Tailor difficulty to your career level.',
      icon: 'pi-sliders-h',
      tag: 'Targeted Roles',
      preview: [
        { label: 'Role', value: 'Full Stack Engineer' },
        { label: 'Difficulty', value: 'Senior Level' },
        { label: 'Format', value: 'Adaptive Voice & Tech' },
      ],
    },
    {
      step: '02',
      title: 'Practice with AI-generated questions',
      desc: 'Engage with dynamic questions generated specifically for your target domain, with simulated speech, real-time pacing, and audio transcription.',
      icon: 'pi-bolt',
      tag: 'Gemini Engine',
      preview: [
        { label: 'Interviewer', value: 'Google Gemini Pro' },
        { label: 'Speech Pacing', value: '135 WPM (Live Analysis)' },
        { label: 'Adaptability', value: 'Follow-ups based on your reply' },
      ],
    },
    {
      step: '03',
      title: 'Review your feedback and improve',
      desc: 'Receive immediate, objective feedback with deep scores on technical accuracy, structure, trade-off analysis, and targeted next steps.',
      icon: 'pi-chart-line',
      tag: 'Instant Scorecard',
      preview: [
        { label: 'Overall Score', value: '92 / 100 (Certified)' },
        { label: 'Strengths', value: 'System Scalability & Clarity' },
        { label: 'Growth Area', value: 'Clock drift edge case handling' },
      ],
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 px-4 sm:px-6 bg-slate-50/60 border-y border-slate-200/70">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#8750FF] text-xs font-mono font-semibold tracking-wide uppercase mb-3 border border-purple-200/50">
            <i className="pi pi-compass text-xs" />
            <span>Preparation Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            How HirePilot Works
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            A frictionless three-step workflow engineered to take you from initial practice to confident offers.
          </p>
        </div>

        {/* 3 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="relative rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-[0_10px_30px_rgba(135,80,255,0.05)] hover:shadow-[0_20px_45px_rgba(135,80,255,0.1)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Step pill & icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#8750FF]/25">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#8750FF] border border-purple-100 flex items-center justify-center">
                    <i className={`pi ${item.icon} text-base`} />
                  </div>
                </div>

                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#8750FF] bg-purple-50 px-2.5 py-1 rounded-full inline-block mb-3">
                  {item.tag}
                </span>

                <h3 className="text-xl font-bold text-slate-900 mb-2.5 tracking-tight">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              {/* Realistic Mock Snippet */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-3.5 space-y-2 mt-auto">
                {item.preview.map((p, pIdx) => (
                  <div key={pIdx} className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">{p.label}:</span>
                    <span className="font-semibold text-slate-800 text-right truncate max-w-[160px]">{p.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Button
            label="Select Your Role and Begin"
            icon="pi pi-arrow-right"
            iconPos="right"
            onClick={() => navigate('/interview/setup')}
            className="!rounded-full !bg-[#8750FF] !border-[#8750FF] !text-white !font-bold !px-8 !py-3.5 !text-sm sm:!text-base hover:!bg-[#723DE8] !shadow-[0_8px_25px_rgba(135,80,255,0.3)] transition-all"
          />
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
