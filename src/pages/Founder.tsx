import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import {
  Sparkles,
  GraduationCap,
  ArrowRight,
  ArrowUpRight,
  Linkedin,
  Github,
  Mail,
  Target,
  Brain,
  Code2,
  Binary,
  Terminal,
  Database,
  Layers,
  Cpu,
  Bot,
  Zap,
  CheckCircle2,
  Quote,
  ShieldCheck,
  Compass,
  FileText,
  BarChart3,
} from 'lucide-react';

export const Founder: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const founderDetails = {
    name: 'Faishal Naushad',
    title: 'Founder & Developer',
    product: 'HirePilot',
    background: 'B.Tech Computer Science Engineering (AI & ML), Galgotias University',
    photoUrl: '/images/faishal-naushad-founder.png',
  };

  const techStack = [
    {
      category: 'Frontend & UI',
      name: 'React & TypeScript',
      icon: Code2,
      desc: 'Type-safe component architecture, responsive Tailwind styling, and modern UI performance.',
      tags: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite'],
    },
    {
      category: 'Artificial Intelligence & ML',
      name: 'Google Gemini AI',
      icon: Brain,
      desc: 'Adaptive context generation, real-time rubric scoring across 4 evaluation criteria, and tailored feedback.',
      tags: ['Gemini 1.5 Pro/Flash', 'Prompt Engineering', 'Evaluation Rubrics'],
    },
    {
      category: 'Backend & Data',
      name: 'Supabase & Python',
      icon: Database,
      desc: 'PostgreSQL database with Row Level Security, secure authentication, user sessions, and Python AI evaluation pipelines.',
      tags: ['PostgreSQL', 'Supabase Auth', 'Python', 'RLS Policies'],
    },
    {
      category: 'System Architecture',
      name: 'Full-Stack Integration',
      icon: Layers,
      desc: 'Serverless Cloudflare workers, instant response streaming, and client-side performance analytics.',
      tags: ['Edge Workers', 'REST APIs', 'Cloud Architecture'],
    },
  ];

  const visionPoints = [
    {
      title: 'Democratizing Career Coaching',
      desc: 'Quality interview coaching should not be reserved for those who can afford expensive bootcamp tutors. HirePilot puts enterprise-grade preparation tools directly in the hands of every aspiring engineer.',
      icon: Compass,
    },
    {
      title: 'Real-Time, Objective Evaluation',
      desc: 'Traditional practice lacks immediate feedback. HirePilot uses multi-dimensional AI scoring across Relevance, Accuracy, Completeness, and Clarity so candidates know exactly what to improve.',
      icon: Target,
    },
    {
      title: 'Confidence Through Repetition',
      desc: 'By testing technical, DSA, behavioral, and HR questions in an adaptive environment, students build muscle memory and articulate complex engineering ideas with clarity.',
      icon: ShieldCheck,
    },
  ];

  const aboutHirePilotFeatures = [
    {
      title: 'AI Mock Interviews',
      desc: 'Simulate realistic engineering interviews with dynamic questioning based on candidate responses.',
      icon: Bot,
      badge: 'Interactive',
    },
    {
      title: 'Instant Multi-Criteria Rubrics',
      desc: 'Receive immediate breakdown scores for technical accuracy, clarity, and missing edge cases.',
      icon: Zap,
      badge: 'Real-Time',
    },
    {
      title: 'Personalized Career Guidance',
      desc: 'Comprehensive performance reports that highlight categorical strengths and actionable weak points.',
      icon: BarChart3,
      badge: 'Analytics',
    },
    {
      title: 'Resume & Preparation Tools',
      desc: 'Structured tooling to refine technical talking points and present project impact with conviction.',
      icon: FileText,
      badge: 'Career Suite',
    },
  ];

  const socialLinks = [
    {
      label: 'LinkedIn',
      handle: 'Faishal Naushad',
      href: 'https://www.linkedin.com/in/faishal-naushad-b28807273/',
      icon: Linkedin,
      subtext: 'Connect for professional discussions & opportunities',
      buttonText: 'Connect on LinkedIn',
      color: 'hover:border-[#0A66C2]/50 hover:text-[#0A66C2]',
    },
    {
      label: 'GitHub',
      handle: 'faishalxtechno',
      href: 'https://github.com/faishalxtechno',
      icon: Github,
      subtext: 'Explore open-source code & HirePilot development',
      buttonText: 'Follow on GitHub',
      color: 'hover:border-slate-500 hover:text-slate-900 dark:hover:text-white',
    },
    {
      label: 'Email',
      handle: 'connectwithfaishal@gmail.com',
      href: 'mailto:connectwithfaishal@gmail.com',
      icon: Mail,
      subtext: 'Direct founder inquiries & feedback',
      buttonText: 'Send Direct Email',
      color: 'hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-brand-500 selection:text-white">
      <Navbar variant="standard" />

      {/* Breadcrumb / Top Bar */}
      <div className="border-b border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200 font-medium">Founder & Developer</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
            <span>HirePilot Platform</span>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">Verified Profile</span>
          </div>
        </div>
      </div>

      {/* Hero Section: Two-Column Layout */}
      <section className="relative py-14 sm:py-20 overflow-hidden">
        {/* Soft Ambient Background Elements */}
        <div
          className="absolute top-10 left-1/4 w-[500px] h-[400px] bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Desktop Left / Mobile Top: Founder Photograph */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-md">
                {/* Subtle outer glow frame */}
                <div
                  className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-brand-500/20 via-indigo-500/10 to-transparent blur-xl pointer-events-none"
                  aria-hidden="true"
                />

                {/* Portrait Card */}
                <div className="relative rounded-3xl p-3 sm:p-4 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-900/5 dark:shadow-black/40">
                  {/* Floating Indicator Badge */}
                  <div className="absolute -top-3 right-5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white dark:bg-slate-850 dark:text-slate-100 text-xs font-mono font-medium flex items-center gap-2 shadow-lg border border-slate-700/60 z-10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Founder & Developer</span>
                  </div>

                  {/* Photograph Container */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/4.5] sm:aspect-[4/4.6] bg-slate-100 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
                    <img
                      src={founderDetails.photoUrl}
                      alt={`${founderDetails.name} — ${founderDetails.title} of ${founderDetails.product}`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.01]"
                      loading="eager"
                      decoding="async"
                    />
                  </div>

                  {/* Under-Photo Credential Bar */}
                  <div className="mt-3.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850/80 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                        <span>{founderDetails.name}</span>
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        {founderDetails.title}
                      </p>
                    </div>
                    <Badge variant="brand" size="sm">
                      HirePilot
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Right / Mobile Bottom: Biography & Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Meet the Founder</span>
              </div>

              {/* Title & Name */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                  {founderDetails.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-base font-semibold text-brand-600 dark:text-brand-400">
                  <span>{founderDetails.title}</span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span>{founderDetails.product}</span>
                </div>
              </div>

              {/* Educational Background Card */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block">
                    Education & Specialization
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {founderDetails.background}
                  </p>
                </div>
              </div>

              {/* Founder Biography */}
              <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  Hi, I&apos;m <strong className="text-slate-900 dark:text-white font-semibold">Faishal Naushad</strong>, the Founder &amp; Developer of HirePilot. I&apos;m pursuing B.Tech in Computer Science Engineering with a specialization in Artificial Intelligence and Machine Learning at Galgotias University.
                </p>
                <p>
                  I created HirePilot with a vision to make career preparation more accessible through technology. By combining AI-powered mock interviews, resume-building tools, and personalized career guidance, my goal is to help students and job seekers prepare for professional opportunities with greater confidence.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a href="#vision">
                  <Button variant="outline" size="md">
                    Read My Vision
                  </Button>
                </a>
                <a href="#connect">
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Connect With Me
                  </Button>
                </a>
                <Link to="/interview/setup">
                  <Button variant="secondary" size="md">
                    Try HirePilot Mock Interview
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 1: My Vision */}
      <section id="vision" className="py-16 sm:py-24 bg-white dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
              Guiding Philosophy
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              My Vision: Making AI-Powered Career Preparation Accessible
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Every ambitious candidate deserves honest, data-driven feedback on their technical and communication skills before stepping into high-stakes interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visionPoints.map((item) => (
              <Card key={item.title} className="p-6 space-y-4 relative" hoverable>
                <div className="w-11 h-11 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <item.icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </Card>
            ))}
          </div>

          {/* Mission Quote Card */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 sm:p-8 bg-gradient-to-br from-brand-50/70 to-white dark:from-brand-950/30 dark:to-slate-900 border-l-4 border-l-brand-600 dark:border-l-brand-500 shadow-sm">
              <div className="flex items-start gap-4">
                <Quote className="w-8 h-8 text-brand-600 dark:text-brand-400 shrink-0 opacity-70" />
                <div className="space-y-2">
                  <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 italic font-medium leading-relaxed">
                    &ldquo;I believe technology should make opportunities more accessible and help people present their abilities with confidence. HirePilot was built to give candidates the exact practice and objective feedback they need to achieve their career goals.&rdquo;
                  </p>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">
                    — Faishal Naushad, Founder &amp; Developer
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 2: About HirePilot */}
      <section id="about-hirepilot" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
            The Product
          </h2>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How HirePilot Helps Job Seekers
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            A comprehensive, distraction-free environment tailored for software engineers, developers, and early-career candidates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutHirePilotFeatures.map((feat) => (
            <Card key={feat.title} className="p-6 space-y-3 flex flex-col justify-between" hoverable>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                    <feat.icon className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" size="sm">
                    {feat.badge}
                  </Badge>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {feat.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 3: Technology & Development */}
      <section id="technology" className="py-16 sm:py-24 bg-slate-100/60 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
              Engineering & Stack
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Technology & Development
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Modern full-stack technologies and AI architectures power HirePilot&apos;s speed and accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techStack.map((tech) => (
              <Card key={tech.name} className="p-6 space-y-4" hoverable>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                      <tech.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                        {tech.category}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {tech.name}
                      </h4>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {tech.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tech.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Connect With Me */}
      <section id="connect" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
            Get In Touch
          </h2>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Connect With Me
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Open for collaborations, developer feedback, and professional networking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {socialLinks.map((item) => (
            <Card key={item.label} className="p-6 space-y-4 flex flex-col justify-between" hoverable>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-brand-600 dark:text-brand-400">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.label}
                  </h4>
                  <p className="text-xs font-mono text-brand-600 dark:text-brand-400 font-medium mt-0.5">
                    {item.handle}
                  </p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.subtext}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={item.href}
                  target={item.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors shadow-2xs"
                >
                  <span>{item.buttonText}</span>
                  {!item.href.startsWith('mailto:') && <ArrowUpRight className="w-3.5 h-3.5" />}
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Final Action CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-600 to-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Experience AI Mock Interviews on HirePilot
          </h2>
          <p className="text-sm text-brand-100 max-w-xl mx-auto">
            Test your skills with adaptive questions and instant objective feedback designed to accelerate your career.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/interview/setup">
              <Button variant="secondary" size="lg" className="bg-white text-slate-900 hover:bg-slate-100 border-none shadow-xl">
                Start Free Mock Interview
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Back to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Founder;
