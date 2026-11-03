import React from 'react';
import { Link } from 'react-router-dom';
import {
  Linkedin,
  Github,
  Mail,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Quote,
  Brain,
  Cpu,
  Code2,
  Binary,
  Terminal,
  Database,
  Layers,
  Rocket,
  CheckCircle2,
  GraduationCap,
} from 'lucide-react';

/**
 * Verified Founder & Developer Profile Details for Faishal Naushad
 */
export const FOUNDER_DATA = {
  name: 'Faishal Naushad',
  title: 'Founder & Developer',
  product: 'HirePilot',
  background: 'B.Tech Computer Science Engineering (AI & ML), Galgotias University',
  photoUrl: '/images/faishal-naushad-founder.png',
  bio: [
    "Hi, I'm Faishal Naushad, the Founder & Developer of HirePilot. I'm pursuing B.Tech in Computer Science Engineering with a specialization in Artificial Intelligence and Machine Learning at Galgotias University.",
    "I created HirePilot with a vision to make career preparation more accessible through technology. By combining AI-powered mock interviews, resume-building tools, and personalized career guidance, my goal is to help students and job seekers prepare for professional opportunities with greater confidence.",
  ],
  missionTitle: 'Why I Built HirePilot',
  missionQuote:
    'HirePilot was created to help candidates prepare for the real challenges of finding a job. By combining AI-powered mock interviews, resume-building tools, and personalized career guidance, my goal is to help students and job seekers prepare for professional opportunities with greater confidence.',
  technologies: [
    { name: 'Artificial Intelligence', icon: Brain },
    { name: 'Machine Learning', icon: Cpu },
    { name: 'React', icon: Code2 },
    { name: 'TypeScript', icon: Binary },
    { name: 'Python', icon: Terminal },
    { name: 'Supabase', icon: Database },
    { name: 'Full-Stack Development', icon: Layers },
    { name: 'Product Development', icon: Rocket },
  ],
  socialLinks: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/faishal-naushad-b28807273/',
      icon: Linkedin,
      color: 'hover:text-[#2563EB] hover:border-[#2563EB]/40',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/faishalxtechno',
      icon: Github,
      color: 'hover:text-[#111827] hover:border-[#111827]/40',
    },
    {
      label: 'Email',
      href: 'mailto:connectwithfaishal@gmail.com',
      icon: Mail,
      color: 'hover:text-[#2563EB] hover:border-[#2563EB]/40',
    },
  ],
};

export interface FounderSectionProps {
  theme?: 'light' | 'dark';
}

export const FounderSection: React.FC<FounderSectionProps> = ({ theme = 'light' }) => {
  if (theme === 'light') {
    return (
      <section
        id="founder"
        className="relative py-24 sm:py-28 bg-white text-[#111827] overflow-hidden border-t border-[#E5E7EB]"
        aria-labelledby="founder-heading"
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Meet the Founder</span>
            </div>
            <h2
              id="founder-heading"
              className="text-3xl sm:text-4xl font-semibold text-[#111827] tracking-tight"
            >
              The Vision Behind HirePilot
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] font-normal">
              A developer-led platform created to empower candidates through structured, accessible, AI-powered preparation.
            </p>
          </div>

          {/* Two-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Real Photograph & Frame */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm">
                {/* Main Photo Card Frame */}
                <div className="relative rounded-[16px] p-3 sm:p-4 bg-white border border-[#E5E7EB] shadow-lg">
                  {/* Floating Status Pill (Top-Right) */}
                  <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-blue-200 z-10 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
                    <span>Founder & Developer</span>
                  </div>

                  {/* Founder Image Container */}
                  <div className="relative rounded-[12px] overflow-hidden aspect-[4/4.5] bg-slate-100 border border-[#E5E7EB]">
                    <img
                      src={FOUNDER_DATA.photoUrl}
                      alt={`${FOUNDER_DATA.name} — ${FOUNDER_DATA.title} of ${FOUNDER_DATA.product}`}
                      width={500}
                      height={560}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.01]"
                    />
                  </div>

                  {/* Sub-card: Credentials & University */}
                  <div className="mt-3.5 p-3 rounded-[10px] bg-slate-50 border border-[#E5E7EB] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-[#111827] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span>{FOUNDER_DATA.name}</span>
                      </p>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-[#2563EB] border border-blue-200">
                        Galgotias Univ
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64748B] leading-snug font-normal">
                      B.Tech CSE (AI &amp; ML) Specialization
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio, Vision, Tech Stack & Navigation to Full Page */}
            <div className="lg:col-span-7 space-y-6">
              {/* Name, Title & Academic Specialization */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] font-semibold block">
                  Founder &amp; Developer
                </span>
                <h3 className="text-3xl sm:text-4xl font-semibold text-[#111827] tracking-tight">
                  {FOUNDER_DATA.name}
                </h3>
                <p className="text-sm font-medium text-[#4B5563]">
                  {FOUNDER_DATA.title} • {FOUNDER_DATA.product}
                </p>
                <div className="inline-flex items-center gap-2 text-xs text-[#4B5563] bg-slate-50 px-3 py-1.5 rounded-[6px] border border-[#E5E7EB]">
                  <GraduationCap className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span>{FOUNDER_DATA.background}</span>
                </div>
              </div>

              {/* Biography paragraphs */}
              <div className="space-y-3.5 text-sm sm:text-base text-[#4B5563] font-normal leading-relaxed">
                {FOUNDER_DATA.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Mission Section Quote */}
              <div className="p-4 sm:p-5 rounded-[12px] bg-slate-50 border border-[#E5E7EB] border-l-4 border-l-[#2563EB]">
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5 opacity-80" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-[#111827] uppercase tracking-wider">
                      {FOUNDER_DATA.missionTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#334155] italic leading-relaxed font-normal">
                      &ldquo;{FOUNDER_DATA.missionQuote}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Technology & Expertise: What I Work With */}
              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-semibold text-[#111827] uppercase tracking-wider">
                  Core Technologies &amp; Focus
                </h4>
                <div className="flex flex-wrap gap-2">
                  {FOUNDER_DATA.technologies.slice(0, 6).map((tech) => {
                    const Icon = tech.icon;
                    return (
                      <span
                        key={tech.name}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] text-xs font-medium bg-slate-50 text-[#1E293B] border border-[#E5E7EB]"
                      >
                        <Icon className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                        <span>{tech.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* CTAs: Link to Dedicated /founder page & Social Links */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link to="/founder" className="shrink-0">
                  <button
                    type="button"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[6px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium transition-colors shadow-xs"
                  >
                    <span>Read Full Founder Journey</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>

                <div className="flex items-center gap-2 flex-wrap">
                  {FOUNDER_DATA.socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
                        rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                        title={link.label}
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-[6px] bg-white border border-[#E5E7EB] text-xs font-medium text-[#4B5563] hover:text-[#111827] transition-all hover:bg-slate-50 ${link.color}`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{link.label}</span>
                        {!link.href.startsWith('mailto:') && (
                          <ArrowUpRight className="w-3 h-3 text-[#94A3B8]" />
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Dark fallback
  return (
    <section
      id="founder"
      className="relative py-24 sm:py-28 bg-[#030014] text-[#f4f0ff] overflow-hidden"
      aria-labelledby="founder-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[32px] bg-[#060317] border border-[#5046e4] text-[#f4f0ff] text-xs font-medium shadow-[inset_0_-7px_11px_rgba(164,143,255,0.12)]">
            <Sparkles className="w-3.5 h-3.5 text-[#9382ff]" />
            <span>Meet the Founder</span>
          </div>
          <h2
            id="founder-heading"
            className="text-3xl sm:text-4xl font-medium text-[#f4f0ff] tracking-tight"
          >
            The Mind Behind HirePilot
          </h2>
          <p className="text-sm text-[#a8a6b7] font-normal">
            A developer-led platform created to empower job seekers through accessible, AI-powered preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              <div className="relative rounded-[16px] p-3 sm:p-4 bg-[#060317] border border-white/10 shadow-[inset_0_0_24px_rgba(255,255,255,0.04)]">
                <div className="absolute -top-3 right-4 px-3 py-1 rounded-[32px] bg-[#10093a] text-[#f4f0ff] text-[11px] font-mono font-medium flex items-center gap-1.5 border border-[#5046e4]/40 z-10 shadow-[inset_0_0_12px_rgba(255,255,255,0.05)]">
                  <span className="w-2 h-2 rounded-full bg-[#9382ff] animate-pulse" />
                  <span>Founder & Developer</span>
                </div>

                <div className="relative rounded-[12px] overflow-hidden aspect-[4/4.5] bg-[#10093a] border border-white/5">
                  <img
                    src={FOUNDER_DATA.photoUrl}
                    alt={`${FOUNDER_DATA.name} — ${FOUNDER_DATA.title} of ${FOUNDER_DATA.product}`}
                    width={500}
                    height={560}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.01]"
                  />
                </div>

                <div className="mt-3.5 p-3 rounded-[10px] bg-[#10093a]/50 border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-[#f4f0ff] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#9382ff]" />
                      <span>{FOUNDER_DATA.name}</span>
                    </p>
                    <span className="px-2 py-0.5 rounded-[32px] text-[10px] font-medium bg-[#5046e4]/20 text-[#ba9cff] border border-[#5046e4]/40">
                      Galgotias Univ
                    </span>
                  </div>
                  <p className="text-[11px] text-[#918ea0] leading-snug font-normal">
                    B.Tech CSE (AI &amp; ML) Specialization
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#9382ff] font-medium block">
                Founder &amp; Developer
              </span>
              <h3 className="text-3xl sm:text-4xl font-medium text-[#f4f0ff] tracking-tight">
                {FOUNDER_DATA.name}
              </h3>
              <p className="text-sm font-medium text-[#ba9cff]">
                {FOUNDER_DATA.title} • {FOUNDER_DATA.product}
              </p>
              <div className="inline-flex items-center gap-2 text-xs text-[#a8a6b7] bg-[#060317] px-3 py-1.5 rounded-[5px] border border-white/10 shadow-[inset_0_0_12px_rgba(255,255,255,0.03)]">
                <GraduationCap className="w-4 h-4 text-[#9382ff] shrink-0" />
                <span>{FOUNDER_DATA.background}</span>
              </div>
            </div>

            <div className="space-y-3.5 text-sm sm:text-base text-[#a8a6b7] font-normal leading-relaxed">
              {FOUNDER_DATA.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="p-4 sm:p-5 rounded-[16px] bg-[#060317] border border-white/10 border-l-2 border-l-[#9382ff] shadow-[inset_0_0_24px_rgba(255,255,255,0.04)]">
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-[#9382ff] shrink-0 mt-0.5 opacity-80" />
                <div className="space-y-1">
                  <h4 className="text-xs font-medium text-[#f4f0ff] uppercase tracking-wider">
                    {FOUNDER_DATA.missionTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#f4f0ff]/90 italic leading-relaxed font-normal">
                    &ldquo;{FOUNDER_DATA.missionQuote}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-medium text-[#f4f0ff] uppercase tracking-wider">
                What I Work With
              </h4>
              <div className="flex flex-wrap gap-2">
                {FOUNDER_DATA.technologies.slice(0, 6).map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <span
                      key={tech.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[5px] text-xs font-medium bg-[#10093a]/70 text-[#f4f0ff] border border-white/10 shadow-[inset_0_0_12px_rgba(255,255,255,0.02)]"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#9382ff] shrink-0" />
                      <span>{tech.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link to="/founder" className="shrink-0">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[5px] bg-[#5046e4] hover:bg-[#10093a] text-white text-sm font-medium transition-colors shadow-[0_0_16px_rgba(80,70,228,0.35)]"
                >
                  <span>Meet the Founder (Full Page)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
