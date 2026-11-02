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
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

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
      color: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/40',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/faishalxtechno',
      icon: Github,
      color: 'hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600',
    },
    {
      label: 'Email',
      href: 'mailto:connectwithfaishal@gmail.com',
      icon: Mail,
      color: 'hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-500/40',
    },
  ],
};

export const FounderSection: React.FC = () => {
  return (
    <section
      id="founder"
      className="relative py-20 sm:py-28 bg-white dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800 overflow-hidden"
      aria-labelledby="founder-heading"
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-1/3 left-10 w-96 h-96 bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Meet the Founder</span>
          </div>
          <h2
            id="founder-heading"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            The Mind Behind HirePilot
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            A developer-led platform created to empower job seekers through accessible, AI-powered preparation.
          </p>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Real Photograph & Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              {/* Soft decorative backplate */}
              <div
                className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-brand-500/20 via-indigo-500/15 to-transparent blur-xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Main Photo Card Frame */}
              <div className="relative rounded-3xl p-3 sm:p-4 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-900/5 dark:shadow-black/40">
                {/* Floating Status Pill (Top-Right) */}
                <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100 text-[11px] font-mono font-medium flex items-center gap-1.5 shadow-lg border border-slate-700/60 z-10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Founder & Developer</span>
                </div>

                {/* Founder Image Container with cover and center top position */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/4.5] bg-slate-100 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
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
                <div className="mt-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-850/80 border border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                      <span>{FOUNDER_DATA.name}</span>
                    </p>
                    <Badge variant="brand" size="sm">
                      Galgotias Univ
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
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
              <span className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 font-bold block">
                Founder &amp; Developer
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {FOUNDER_DATA.name}
              </h3>
              <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                {FOUNDER_DATA.title} • {FOUNDER_DATA.product}
              </p>
              <div className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                <GraduationCap className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                <span>{FOUNDER_DATA.background}</span>
              </div>
            </div>

            {/* Biography paragraphs */}
            <div className="space-y-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {FOUNDER_DATA.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Mission Section Quote */}
            <Card className="p-4 sm:p-5 bg-gradient-to-br from-brand-50/60 to-white dark:from-brand-950/20 dark:to-slate-900 border-l-4 border-l-brand-600 dark:border-l-brand-500 border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5 opacity-80" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    {FOUNDER_DATA.missionTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                    &ldquo;{FOUNDER_DATA.missionQuote}&rdquo;
                  </p>
                </div>
              </div>
            </Card>

            {/* Technology & Expertise: What I Work With */}
            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                What I Work With
              </h4>
              <div className="flex flex-wrap gap-2">
                {FOUNDER_DATA.technologies.slice(0, 6).map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <span
                      key={tech.name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      <Icon className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0" />
                      <span>{tech.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* CTAs: Link to Dedicated /founder page & Social Links */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link to="/founder" className="shrink-0">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto shadow-md shadow-brand-500/20"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Meet the Founder (Full Page)
                </Button>
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
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/90 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all duration-200 hover:shadow-xs hover:-translate-y-0.5 ${link.color}`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{link.label}</span>
                      {!link.href.startsWith('mailto:') && (
                        <ArrowUpRight className="w-3 h-3 text-slate-400" />
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
};

export default FounderSection;
