import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
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
  ShieldCheck,
  Play,
} from 'lucide-react';

export const Landing: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-brand-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Next-Gen AI Mock Interview Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Practice Smarter.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600 dark:from-brand-400 dark:to-indigo-400">
              Interview Better.
            </span>{' '}
            Get Hired.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Practice realistic technical and HR interviews with an AI interviewer that evaluates your answers in real time and helps you improve.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full shadow-lg shadow-brand-500/25"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Start Free Interview
              </Button>
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full" leftIcon={<Play className="w-4 h-4" />}>
                See How It Works
              </Button>
            </a>
          </div>

          {/* Hero Interactive UI Preview */}
          <div className="pt-10 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden text-left">
              {/* Window Header */}
              <div className="bg-slate-100 dark:bg-slate-850 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="text-xs font-mono text-slate-500 font-medium">
                  HirePilot Live Mock Session — Software Engineer
                </div>
                <div className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300">
                  Question 4 of 10
                </div>
              </div>

              {/* Window Content */}
              <div className="p-6 space-y-5">
                {/* AI Question */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-600 uppercase tracking-wider">
                    <Bot className="w-4 h-4" />
                    AI Interviewer
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    "Explain the difference between an ArrayList and a LinkedList in Java. Under what memory and runtime conditions would you choose one over the other?"
                  </p>
                </div>

                {/* Candidate Answer Sample */}
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-mono space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Your Submitted Answer</span>
                  <p>
                    ArrayList is backed by a dynamic array offering O(1) random access by index and better cache locality. LinkedList consists of doubly-linked nodes offering O(1) insertions/deletions at known positions but higher pointer overhead per element...
                  </p>
                </div>

                {/* Live Evaluation Preview */}
                <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      <Sparkles className="w-3.5 h-3.5" />
                      Instant AI Evaluation: 85/100
                    </div>
                    <div className="flex gap-2 text-[11px] font-mono">
                      <span className="text-slate-600 dark:text-slate-300">Accuracy: <strong>9/10</strong></span>
                      <span className="text-slate-600 dark:text-slate-300">Clarity: <strong>8/10</strong></span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    "Excellent explanation of memory cache locality and asymptotic complexities. Consider also mentioning how ArrayList amortizes resize costs (1.5x capacity growth)."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
              Core Capabilities
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Engineered for realistic interview preparation
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Everything you need to gain confidence, master technical explanations, and secure top offers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="p-6 space-y-4" hoverable>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" size="sm">
                    {f.badge}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{f.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{f.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
            Simple 4-Step Process
          </h2>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            How HirePilot Works
          </h3>
          <p className="text-sm text-slate-500">
            From setup to complete performance report in four streamlined steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <Card key={s.step} className="p-6 space-y-3 relative overflow-hidden">
              <div className="font-mono text-3xl font-black text-brand-600/30 dark:text-brand-400/20">
                {s.step}
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">{s.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Interview Types Section */}
      <section id="interview-types" className="py-20 bg-slate-100/60 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
              Interview Catalog
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Specialized Interview Modes
            </h3>
            <p className="text-sm text-slate-500">
              Select the exact interview style you want to practice for your upcoming rounds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {interviewTypes.map((t) => (
              <Card key={t.type} className="p-5 flex flex-col justify-between space-y-4" hoverable>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-brand-600 flex items-center justify-center">
                    <t.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.type}</h4>
                    <p className="text-[11px] text-brand-600 dark:text-brand-400 font-medium mt-0.5">{t.role}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{t.desc}</p>
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

      {/* Pricing / Free Tier Limits Section */}
      <section id="pricing" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
            Pricing & Quota
          </h2>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Free forever for early career candidates
          </h3>
          <p className="text-sm text-slate-500">
            Transparent usage limits designed to keep the platform free for students and job seekers.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <Card className="p-8 border-2 border-brand-500/80 dark:border-brand-500 shadow-xl space-y-6 relative">
            <div className="absolute -top-3 right-6">
              <Badge variant="brand" size="md">
                Standard Free Tier
              </Badge>
            </div>

            <div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Community Pilot</h4>
              <p className="text-xs text-slate-500 mt-1">Full access to all AI interview roles and analytics</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900 dark:text-white font-mono">$0</span>
                <span className="text-xs text-slate-500">/ forever</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>3 Free Full Interviews</strong> per user every calendar month</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Up to 15 Adaptive Questions</strong> per interview session</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Instant Multi-Criteria Scoring</strong> (Relevance, Accuracy, Clarity)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Comprehensive Final Performance Reports</strong> & AI Recommendations</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Lifetime Interview History</strong> & Progress Tracking</span>
              </li>
            </ul>

            <Link to="/signup" className="block pt-2">
              <Button variant="primary" size="lg" className="w-full shadow-md shadow-brand-500/20">
                Get Started Free
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
              Got Questions?
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <Card
                key={idx}
                className="cursor-pointer transition-all overflow-hidden"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="p-5 flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </div>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 bg-gradient-to-r from-brand-600 to-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ready to ace your next technical or HR interview?
          </h2>
          <p className="text-sm text-brand-100 max-w-xl mx-auto">
            Join candidates using HirePilot to identify weaknesses, refine explanations, and get hired faster.
          </p>
          <div>
            <Link to="/signup">
              <Button variant="secondary" size="lg" className="bg-white text-slate-900 hover:bg-slate-100 border-none shadow-xl">
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
