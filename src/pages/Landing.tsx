import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useScrollAnimationGroup } from '../lib/useScrollAnimation';
import {
  Sparkles,
  ArrowRight,
  Bot,
  Zap,
  Brain,
  BarChart3,
  History,
  Target,
  CheckCircle2,
  Code2,
  Users,
  MessageSquare,
  Binary,
  Layers,
  ChevronDown,
  Play,
  Mail,
  Send,
  UserCheck,
  Compass,
  Briefcase,
  FileText,
} from 'lucide-react';

export const Landing: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const containerRef = useScrollAnimationGroup<HTMLDivElement>({ threshold: 0.08 });

  const features = [
    {
      icon: Bot,
      title: 'AI Mock Interviews',
      desc: 'Practice realistic technical, behavioral, and HR questions powered by Google Gemini AI.',
      badge: 'Realistic',
    },
    {
      icon: Zap,
      title: 'Instant Evaluation',
      desc: 'Receive immediate multi-criteria scoring across Relevance, Accuracy, Completeness, and Clarity.',
      badge: 'Real-Time',
    },
    {
      icon: Brain,
      title: 'Adaptive Questions',
      desc: 'Question difficulty and depth dynamically adjust based on how well you answer previous questions.',
      badge: 'Dynamic',
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      desc: 'Deep-dive into your strengths, weakness radar, and communication mastery over time.',
      badge: 'Insights',
    },
    {
      icon: History,
      title: 'Interview History',
      desc: 'Track your growth and review detailed past transcripts, feedback points, and recommendations.',
      badge: 'Tracking',
    },
    {
      icon: Target,
      title: 'Personalized Practice',
      desc: 'Get tailored practice recommendations targeted specifically to your weakest interview categories.',
      badge: 'Tailored',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Choose your role',
      desc: 'Select from Software Engineer, Frontend, Backend, ML, DSA, HR, or specify your custom job title and target difficulty.',
    },
    {
      step: '02',
      title: 'Start your interview',
      desc: 'Enter a clean, focused interview room designed to simulate genuine hiring manager interactions without distractions.',
    },
    {
      step: '03',
      title: 'Answer AI questions',
      desc: 'Type your detailed explanations in text format and receive instant structured evaluations after each response.',
    },
    {
      step: '04',
      title: 'Get your performance report',
      desc: 'Review a comprehensive final score, categorical strengths, weak points, and actionable next topics to master.',
    },
  ];

  const interviewTypes = [
    {
      type: 'Technical',
      icon: Code2,
      role: 'Full Stack / Backend / Frontend',
      desc: 'Core architecture, design patterns, framework internals, state management, and production edge cases.',
    },
    {
      type: 'Data Structures & Algorithms (DSA)',
      icon: Binary,
      role: 'Software Engineer',
      desc: 'Time/space complexity analysis, tree traversals, dynamic programming logic, graph algorithms, and optimization.',
    },
    {
      type: 'Behavioral',
      icon: MessageSquare,
      role: 'All Engineering Roles',
      desc: 'STAR framework responses, conflict resolution, technical trade-offs, and handling production incidents.',
    },
    {
      type: 'HR & Cultural',
      icon: Users,
      role: 'Graduates & Experienced Candidates',
      desc: 'Career aspirations, motivation, leadership values, team collaboration, and communication style.',
    },
    {
      type: 'Mixed (Full Loop)',
      icon: Layers,
      role: 'Comprehensive Preparation',
      desc: 'A realistic simulation combining technical depth, problem-solving, and leadership scenario questions.',
    },
  ];

  const faqs = [
    {
      q: 'How does HirePilot evaluate my interview answers?',
      a: 'HirePilot uses Google Gemini AI trained on engineering hiring rubrics. Every submitted answer is evaluated on four objective dimensions: Relevance (1-10), Technical Accuracy (1-10), Completeness (1-10), and Clarity (1-10), accompanied by specific missing points and improvement tips.',
    },
    {
      q: 'Is HirePilot free to use?',
      a: 'Yes! Our Free tier allows up to 3 comprehensive mock interviews every month with up to 15 adaptive questions each, complete with instant evaluations and lifetime report history.',
    },
    {
      q: 'Why is HirePilot strictly text-based?',
      a: 'Text-based mock interviews allow you to practice articulating complex technical concepts, system design architectures, and behavioral situations with clarity and precision, without audio friction, stage fright, or expensive streaming costs.',
    },
    {
      q: 'How does adaptive questioning work?',
      a: 'If you answer a question with high technical precision, the AI interviewer will ask a more advanced question probing deeper edge cases or architectural tradeoffs. If you struggle, it will test foundational concepts to help you build confidence.',
    },
    {
      q: 'Can I practice for non-standard or custom job roles?',
      a: 'Yes! In the interview setup screen, you can select "Custom Role" and enter any specific target title (e.g. "DevOps Engineer", "iOS Developer", "Rust Systems Engineer").',
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-[#060b18] text-white">
      <Navbar />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative pt-32 sm:pt-36 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Atmospheric glow orbs */}
        <div className="glow-orb glow-orb-blue w-[600px] h-[400px] top-[10%] left-1/2 -translate-x-1/2 opacity-60" />
        <div className="glow-orb glow-orb-cyan w-[300px] h-[300px] top-[30%] right-[10%] opacity-40" />
        <div className="glow-orb glow-orb-indigo w-[400px] h-[300px] bottom-[10%] left-[10%] opacity-30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold animate-fade-in backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>YOUR AI CAREER COPILOT</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white tracking-tight max-w-5xl mx-auto leading-[1.1] animate-fade-in-up">
            Land your next job with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400">
              an AI that works for you.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up stagger-1">
            HirePilot helps you practice realistic interviews, refine your resume, and track your career journey — all powered by advanced AI.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 animate-fade-in-up stagger-2">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full shadow-lg shadow-sky-500/20"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Start for Free
              </Button>
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full" leftIcon={<Play className="w-4 h-4" />}>
                Explore HirePilot
              </Button>
            </a>
          </div>

          {/* Trust Stats Strip */}
          <div className="pt-10 reveal-init stagger-3">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-0 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl">
              {[
                { value: '10K+', label: 'Candidates' },
                { value: '50K+', label: 'AI Interviews' },
                { value: '95%', label: 'Improvement Rate' },
                { value: '4.9/5', label: 'User Rating' },
              ].map((stat, i) => (
                <div key={stat.label} className={`flex items-center gap-2 ${i > 0 ? 'sm:border-l sm:border-white/[0.08] sm:pl-6 sm:ml-6' : ''}`}>
                  <span className="text-lg sm:text-xl font-display font-bold text-white">{stat.value}</span>
                  <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Interactive UI Preview */}
          <div className="pt-8 sm:pt-12 max-w-4xl mx-auto reveal-init stagger-4">
            <div className="rounded-2xl border border-white/[0.08] bg-[rgba(12,20,37,0.6)] backdrop-blur-xl shadow-glass-lg overflow-hidden text-left transition-all duration-500 hover:border-white/[0.12] hover:shadow-glow-blue">
              {/* Window Header */}
              <div className="bg-white/[0.03] px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/[0.06] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-400/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400/80" />
                </div>
                <div className="text-[11px] sm:text-xs font-mono text-slate-500 font-medium truncate px-1">
                  HirePilot Live Mock Session — Software Engineer
                </div>
                <div className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 shrink-0">
                  Question 4 of 10
                </div>
              </div>

              {/* Window Content */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                {/* AI Question */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
                    <Bot className="w-4 h-4" />
                    AI Interviewer
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    "Explain the difference between an ArrayList and a LinkedList in Java. Under what memory and runtime conditions would you choose one over the other?"
                  </p>
                </div>

                {/* Candidate Answer Sample */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 font-mono space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Your Submitted Answer</span>
                  <p className="break-words">
                    ArrayList is backed by a dynamic array offering O(1) random access by index and better cache locality. LinkedList consists of doubly-linked nodes offering O(1) insertions/deletions at known positions but higher pointer overhead per element...
                  </p>
                </div>

                {/* Live Evaluation Preview */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/20 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                      <Sparkles className="w-3.5 h-3.5" />
                      Instant AI Evaluation: 85/100
                    </div>
                    <div className="flex gap-2 text-[11px] font-mono">
                      <span className="text-slate-400">Accuracy: <strong className="text-white">9/10</strong></span>
                      <span className="text-slate-400">Clarity: <strong className="text-white">8/10</strong></span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    "Excellent explanation of memory cache locality and asymptotic complexities. Consider also mentioning how ArrayList amortizes resize costs (1.5x capacity growth)."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURES ═══════════════════ */}
      <section id="features" className="py-16 sm:py-24 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto reveal-init">
            <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest">
              Core Capabilities
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Everything you need to get hired.
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Everything you need to gain confidence, master technical explanations, and secure top offers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {features.map((f, idx) => (
              <Card
                key={f.title}
                className={`p-5 sm:p-6 space-y-4 reveal-init stagger-${(idx % 3) + 1} glass-surface-hover`}
                hoverable
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/15">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" size="sm">
                    {f.badge}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{f.title}</h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{f.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <section id="how-it-works" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto reveal-init">
          <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest">
            Simple 4-Step Process
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            How HirePilot Works
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            From setup to complete performance report in four streamlined steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {steps.map((s, idx) => (
            <Card key={s.step} className={`p-5 sm:p-6 space-y-3 relative overflow-hidden reveal-init stagger-${idx + 1}`} hoverable>
              <div className="font-mono text-3xl font-black text-sky-400/15">
                {s.step}
              </div>
              <h4 className="text-base font-bold text-white">{s.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ═══════════════════ INTERVIEW TYPES ═══════════════════ */}
      <section id="ai-interview" className="py-20 sm:py-24 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto reveal-init">
            <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest">
              Interview Catalog
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Specialized Interview Modes
            </h3>
            <p className="text-sm text-slate-500">
              Select the exact interview style you want to practice for your upcoming rounds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {interviewTypes.map((t, idx) => (
              <Card key={t.type} className={`p-5 flex flex-col justify-between space-y-4 reveal-init stagger-${idx + 1}`} hoverable>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sky-400 flex items-center justify-center">
                    <t.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.type}</h4>
                    <p className="text-[11px] text-sky-400 font-medium mt-0.5">{t.role}</p>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{t.desc}</p>
                  </div>
                </div>

                <Link to="/interview/setup" className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Practice Now
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PRICING ═══════════════════ */}
      <section id="pricing" className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto reveal-init">
          <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest">
            Pricing & Quota
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            Free forever for early career candidates
          </h3>
          <p className="text-sm text-slate-500">
            Transparent usage limits designed to keep the platform free for students and job seekers.
          </p>
        </div>

        <div className="max-w-lg mx-auto reveal-init">
          <Card className="p-8 border-sky-500/30 shadow-glow space-y-6 relative" hoverable>
            <div className="absolute -top-3 right-6">
              <Badge variant="brand" size="md">
                Standard Free Tier
              </Badge>
            </div>

            <div>
              <h4 className="text-2xl font-bold text-white">Community Pilot</h4>
              <p className="text-xs text-slate-500 mt-1">Full access to all AI interview roles and analytics</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white font-mono">$0</span>
                <span className="text-xs text-slate-500">/ forever</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong className="text-slate-300">3 Free Full Interviews</strong> per user every calendar month</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong className="text-slate-300">Up to 15 Adaptive Questions</strong> per interview session</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong className="text-slate-300">Instant Multi-Criteria Scoring</strong> (Relevance, Accuracy, Clarity)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong className="text-slate-300">Comprehensive Final Performance Reports</strong> & AI Recommendations</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong className="text-slate-300">Lifetime Interview History</strong> & Progress Tracking</span>
              </li>
            </ul>

            <Link to="/signup" className="block pt-2">
              <Button variant="primary" size="lg" className="w-full shadow-md shadow-sky-500/20">
                Get Started Free
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* ═══════════════════ ABOUT / FOUNDER ═══════════════════ */}
      <section id="about" className="py-20 sm:py-24 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto reveal-init">
            <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest">
              About The Platform
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Empowering Job Seekers & Students
            </h3>
            <p className="text-sm text-slate-500">
              Built to level the playing field with intelligent mock preparation.
            </p>
          </div>

          <Card className="p-5 sm:p-8 md:p-10 reveal-init">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Mission Statement */}
              <div className="md:col-span-2 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Our Mission</span>
                </div>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
                  HirePilot is an AI-powered job search and career assistance platform designed to help students and job seekers discover opportunities, improve their resumes, prepare for interviews, and manage their applications.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-sky-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-300">Opportunity Discovery</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                    <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-300">Resume & Answer Refinement</span>
                  </div>
                </div>
              </div>

              {/* Founder Profile Card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center space-y-4 hover:border-white/[0.12] transition-colors">
                <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28">
                  <div className="w-full h-full rounded-full p-[3px] bg-gradient-to-tr from-sky-500 via-blue-500 to-purple-600 shadow-lg shadow-sky-500/20">
                    <img
                      src="/faishal-founder.png"
                      alt="Faishal Naushad - Founder of HirePilot"
                      className="w-full h-full rounded-full object-cover object-center bg-[#0c1425]"
                      loading="eager"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    Founder
                  </span>
                  <h4 className="text-lg font-extrabold text-white mt-0.5">
                    Faishal Naushad
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Founder of HirePilot
                  </p>
                </div>
                <div className="pt-2 border-t border-white/[0.06]">
                  <a
                    href="mailto:connectwithfaishal@gmail.com"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 hover:underline break-all"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span>connectwithfaishal@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ═══════════════════ CONTACT ═══════════════════ */}
      <section id="contact" className="py-20 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto reveal-init">
          <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest">
            Get In Touch
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            Official Contact
          </h3>
          <p className="text-sm text-slate-500">
            Reach out directly for platform inquiries, support, partnerships, or developer feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 reveal-init">
          {/* Direct Email Card */}
          <Card className="p-6 space-y-4 md:col-span-2" hoverable>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/15">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Email the Founder</h4>
                <p className="text-xs text-slate-500">Direct channel for all inquiries and support</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Official Contact Email</span>
                <p className="text-sm font-bold text-white font-mono mt-0.5">
                  connectwithfaishal@gmail.com
                </p>
              </div>
              <a
                href="mailto:connectwithfaishal@gmail.com?subject=HirePilot%20Inquiry"
                className="w-full sm:w-auto"
              >
                <Button variant="primary" size="sm" className="w-full" leftIcon={<Send className="w-3.5 h-3.5" />}>
                  Send Email
                </Button>
              </a>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Whether you have feedback on AI interview question quality, need help navigating the dashboard, or want to suggest new features for job preparation, your emails go straight to the developer.
            </p>
          </Card>

          {/* Quick Info Card */}
          <Card className="p-6 space-y-4 flex flex-col justify-between" hoverable>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Platform Leadership</h4>
              <div className="space-y-1 text-xs text-slate-500">
                <p><strong className="text-slate-300">Founder:</strong> Faishal Naushad</p>
                <p><strong className="text-slate-300">Platform:</strong> HirePilot AI Mock Interviews</p>
                <p><strong className="text-slate-300">Support:</strong> 100% Free Community Tier</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06]">
              <a
                href="mailto:connectwithfaishal@gmail.com"
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 hover:underline inline-flex items-center gap-1"
              >
                <span>Write to Faishal Naushad</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section id="faq" className="py-20 sm:py-24 border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3 reveal-init">
            <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest">
              Got Questions?
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3 reveal-init">
            {faqs.map((faq, idx) => (
              <Card
                key={idx}
                className="cursor-pointer transition-all overflow-hidden"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="p-5 flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-sky-400' : ''
                    }`}
                  />
                </div>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/[0.06] pt-3 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA STRIP ═══════════════════ */}
      <section className="py-16 sm:py-20 border-t border-white/[0.04] relative overflow-hidden">
        <div className="glow-orb glow-orb-blue w-[500px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="max-w-4xl mx-auto px-4 space-y-6 reveal-init text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            Ready to ace your next interview?
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Join candidates using HirePilot to identify weaknesses, refine explanations, and get hired faster.
          </p>
          <div>
            <Link to="/signup">
              <Button variant="primary" size="lg" className="shadow-lg shadow-sky-500/20">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
