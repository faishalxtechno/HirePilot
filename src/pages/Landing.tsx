import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { FounderSection } from '../components/landing/FounderSection';
import {
  Sparkles,
  ArrowRight,
  ChevronRight,
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
  Shield,
  Play,
  Quote,
} from 'lucide-react';

export const Landing: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // 8 Outlined Feature Cards for the 4-Column Grid
  const features = [
    {
      icon: Bot,
      title: 'AI Mock Interviews',
      desc: 'Simulate realistic technical and behavioral hiring loops powered by Google Gemini AI.',
    },
    {
      icon: Zap,
      title: 'Real-Time Evaluation',
      desc: 'Receive immediate structured rubrics across Relevance, Accuracy, Completeness, and Clarity.',
    },
    {
      icon: Brain,
      title: 'Adaptive Questioning',
      desc: 'Questions dynamically adjust in depth and difficulty according to your previous explanations.',
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      desc: 'Uncover category strength breakdowns, explanation clarity scores, and weak-point trends.',
    },
    {
      icon: History,
      title: 'Archived Transcripts',
      desc: 'Revisit every past session, candidate explanation, and personalized coaching recommendation.',
    },
    {
      icon: Target,
      title: 'Targeted Practice',
      desc: 'Focus your preparation on specific gap areas before sitting for high-stakes company interviews.',
    },
    {
      icon: Layers,
      title: 'Custom Job Roles',
      desc: 'Practice for non-standard positions by defining your exact target title and technical level.',
    },
    {
      icon: CheckCircle2,
      title: 'STAR Methodology',
      desc: 'Master behavioral storytelling structured with Situation, Task, Action, and Result framing.',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Select Role & Focus',
      desc: 'Choose from Frontend, Backend, Full-Stack, Machine Learning, DSA, or specify a custom job title.',
    },
    {
      step: '02',
      title: 'Enter Interview Chamber',
      desc: 'Join a distraction-free environment calibrated to simulate real-world hiring dialogues.',
    },
    {
      step: '03',
      title: 'Type Articulate Answers',
      desc: 'Submit detailed explanations in text format and receive instant multi-criteria grading.',
    },
    {
      step: '04',
      title: 'Review Performance Radar',
      desc: 'Inspect an actionable summary report detailing strong points, missing nuances, and study guides.',
    },
  ];

  const interviewTypes = [
    {
      type: 'Technical Architecture',
      icon: Code2,
      role: 'Full Stack / Backend / Frontend',
      desc: 'Core architecture, design patterns, framework internals, state management, and edge cases.',
    },
    {
      type: 'Algorithms & Data Structures',
      icon: Binary,
      role: 'Software Engineer',
      desc: 'Asymptotic complexity, dynamic programming logic, graph traversals, and optimization tradeoffs.',
    },
    {
      type: 'Behavioral & Scenario',
      icon: MessageSquare,
      role: 'All Engineering Roles',
      desc: 'STAR framework responses, technical disagreements, trade-off communication, and incident reviews.',
    },
    {
      type: 'Leadership & HR',
      icon: Users,
      role: 'Graduates & Experienced Engineers',
      desc: 'Career trajectory, mentorship philosophies, cross-functional collaboration, and cultural fit.',
    },
    {
      type: 'Full-Loop Mixed Round',
      icon: Layers,
      role: 'Comprehensive Simulation',
      desc: 'A complete multi-stage interview combining architectural design, coding theory, and behavioral scenarios.',
    },
  ];

  // 3-Column Testimonial Wall of Love (Reflect Notes style)
  const testimonials = [
    {
      name: 'Aarav Sharma',
      role: 'Frontend Engineer @ FinTech',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      quote:
        'Practicing with <span class="text-[#9382ff]">HirePilot</span> completely changed how I articulate React lifecycle and memory trade-offs. The instant rubric breakdown showed me exactly what I was leaving out in system design questions.',
    },
    {
      name: 'Priya Patel',
      role: 'Software Engineer @ CloudScale',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      quote:
        'The adaptive questioning is genuinely impressive. When I answered tree traversals easily, it pivoted to amortized analysis and distributed caching. Helped me land my dream offer after 3 weeks of daily sessions.',
    },
    {
      name: 'Rohan Verma',
      role: 'AI / ML Engineer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      quote:
        'The text-based format eliminated my interview anxiety. Being able to review my past transcripts and see my explanation score jump from 65 to 90 gave me total confidence going into final rounds.',
    },
  ];

  const faqs = [
    {
      q: 'How does HirePilot evaluate my interview answers?',
      a: 'HirePilot employs Google Gemini AI trained on technical hiring criteria. Each submission is scored across four dimensions: Relevance (1-10), Technical Accuracy (1-10), Completeness (1-10), and Clarity (1-10), accompanied by specific suggestions for omitted technical nuances.',
    },
    {
      q: 'Is HirePilot free to use?',
      a: 'Yes. Our Free Community Tier allows up to 3 comprehensive mock interviews every month with up to 15 adaptive questions each, complete with live grading, feedback reports, and lifetime transcript archives.',
    },
    {
      q: 'Why is HirePilot primarily text-based?',
      a: 'Text-based mock interviews force precision in articulating complex technical thoughts, system invariants, and behavioral situations clearly without the friction, background noise, or stage fright of video streaming.',
    },
    {
      q: 'How does adaptive questioning work?',
      a: 'When you answer with strong technical depth, the AI interviewer dynamically probes deeper into edge cases, scalability limits, or architectural trade-offs. If you struggle, it tests foundational knowledge to help you reconstruct understanding.',
    },
    {
      q: 'Can I practice for non-standard or custom job roles?',
      a: 'Yes. In the interview setup screen, select "Custom Role" and specify any target title such as "DevOps Engineer", "Rust Systems Programmer", or "Data Platform Engineer".',
    },
  ];

  return (
    <div className="min-h-screen bg-[#030014] text-[#f4f0ff] selection:bg-[#5046e4] selection:text-white starfield-bg relative overflow-x-hidden font-sans">
      {/* Floating Navigation Pill */}
      <Navbar variant="floating" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-24 md:pt-36 md:pb-32 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          {/* AI Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[32px] bg-[#060317] border border-[#5046e4] text-[#f4f0ff] text-xs font-medium shadow-[inset_0_-7px_11px_rgba(164,143,255,0.12)]">
            <Sparkles className="w-3.5 h-3.5 text-[#9382ff]" />
            <span>Next-Gen AI Mock Interview Platform</span>
          </div>

          {/* Headline (AeonikPro / Inter medium 500, never bold) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-[#f4f0ff] tracking-tight max-w-4xl mx-auto leading-[1.12]">
            Practice Smarter.{' '}
            <span className="cosmic-text-gradient">
              Interview Better.
            </span>{' '}
            Get Hired.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-[#a8a6b7] max-w-2xl mx-auto leading-relaxed font-normal">
            Practice realistic technical and HR interviews with an AI interviewer that evaluates your answers in real time and helps you improve.
          </p>

          {/* Primary CTA & Secondary Action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/signup" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[5px] bg-[#5046e4] hover:bg-[#10093a] text-white text-sm font-medium transition-all shadow-[0_0_24px_rgba(80,70,228,0.4)]"
              >
                <span>Start Free Interview</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-[5px] text-[#918ea0] hover:text-[#f4f0ff] text-sm font-normal transition-colors"
            >
              <Play className="w-3.5 h-3.5 text-[#9382ff]" />
              <span>See How It Works</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#9382ff]" />
            </a>
          </div>

          {/* Hero Product Showcase (Mockup Chamber) */}
          <div className="pt-12 max-w-4xl mx-auto">
            <div className="rounded-[16px] bg-[#060317] border border-white/10 shadow-[inset_0_0_24px_rgba(255,255,255,0.04)] overflow-hidden text-left">
              {/* Window Header */}
              <div className="bg-[#10093a]/40 px-5 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-xs font-mono text-[#918ea0] font-normal truncate px-2">
                  HirePilot Live Mock Chamber — Software Engineer
                </div>
                <div className="text-[11px] font-medium px-2.5 py-0.5 rounded-[5px] bg-[#10093a] text-[#ba9cff] border border-white/10">
                  Question 4 of 10
                </div>
              </div>

              {/* Window Content */}
              <div className="p-6 space-y-5">
                {/* AI Question */}
                <div className="p-4 rounded-[10px] bg-[#10093a]/50 border border-white/10 space-y-2 shadow-[inset_0_0_16px_rgba(255,255,255,0.02)]">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#9382ff] uppercase tracking-wider">
                    <Bot className="w-4 h-4" />
                    <span>AI Interviewer</span>
                  </div>
                  <p className="text-sm font-medium text-[#f4f0ff] leading-relaxed">
                    &ldquo;Explain the difference between an ArrayList and a LinkedList in Java. Under what memory access patterns and runtime conditions would you choose one over the other?&rdquo;
                  </p>
                </div>

                {/* Candidate Answer Sample */}
                <div className="p-4 rounded-[10px] bg-[#030014] border border-white/10 text-xs text-[#a8a6b7] font-mono space-y-1.5">
                  <span className="text-[10px] text-[#918ea0] uppercase tracking-wider font-medium block">
                    Your Submitted Answer
                  </span>
                  <p className="leading-relaxed">
                    ArrayList is backed by a contiguous dynamic array offering O(1) random access by index and superior CPU cache locality. LinkedList consists of doubly-linked nodes offering O(1) node insertion/deletion at known positions, but suffers from cache misses and pointer overhead per element...
                  </p>
                </div>

                {/* Live Evaluation Preview */}
                <div className="p-4 rounded-[10px] bg-[#060317] border border-[#5046e4]/40 space-y-3 shadow-[inset_0_0_20px_rgba(164,143,255,0.08)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#ba9cff]">
                      <Sparkles className="w-3.5 h-3.5 text-[#9382ff]" />
                      <span>Instant AI Evaluation: 85/100</span>
                    </div>
                    <div className="flex gap-3 text-[11px] font-mono text-[#918ea0]">
                      <span>Accuracy: <strong className="text-[#f4f0ff]">9/10</strong></span>
                      <span>Clarity: <strong className="text-[#f4f0ff]">8/10</strong></span>
                      <span>Depth: <strong className="text-[#f4f0ff]">8.5/10</strong></span>
                    </div>
                  </div>
                  <p className="text-xs text-[#f4f0ff]/90 leading-relaxed font-normal">
                    &ldquo;Excellent explanation of cache locality and asymptotic bounds. For full marks, also mention amortized resizing costs (1.5x capacity allocation) and garbage collection impact in high-throughput JVM environments.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aurora Divider */}
      <div className="aurora-divider" />

      {/* 4-Column Feature Grid (Reflect Notes style) */}
      <section id="features" className="py-24 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[32px] bg-[#060317] border border-[#5046e4]/50 text-xs font-medium text-[#9382ff] shadow-[inset_0_-7px_11px_rgba(164,143,255,0.12)]">
            <span>Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-medium text-[#f4f0ff] tracking-tight">
            Engineered for genuine interview mastery
          </h2>
          <p className="text-sm text-[#a8a6b7] font-normal">
            Everything you need to eliminate stage fright, refine technical communication, and secure top offers.
          </p>
        </div>

        {/* 4-Column Grid: 8 features in 2 rows of 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="p-6 rounded-[16px] bg-[#060317] border border-white/10 shadow-[inset_0_0_24px_rgba(255,255,255,0.04)] space-y-3 transition-colors hover:border-[#9382ff]/40"
              >
                {/* Outlined Icon: 1.5px stroke weight, white outlined */}
                <div className="w-10 h-10 rounded-[5px] bg-[#10093a]/60 text-[#f4f0ff] flex items-center justify-center border border-white/5">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-[#f4f0ff]">{f.title}</h3>
                  <p className="text-xs text-[#918ea0] mt-1.5 leading-relaxed font-normal">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Aurora Divider */}
      <div className="aurora-divider" />

      {/* How It Works Section (4-Step Flow) */}
      <section id="how-it-works" className="py-24 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[32px] bg-[#060317] border border-[#5046e4]/50 text-xs font-medium text-[#9382ff] shadow-[inset_0_-7px_11px_rgba(164,143,255,0.12)]">
            <span>Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-medium text-[#f4f0ff] tracking-tight">
            How HirePilot Works
          </h2>
          <p className="text-sm text-[#a8a6b7] font-normal">
            From setup to complete performance report in four streamlined steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.step}
              className="p-6 rounded-[16px] bg-[#060317] border border-white/10 shadow-[inset_0_0_24px_rgba(255,255,255,0.04)] space-y-3 relative overflow-hidden"
            >
              <div className="font-mono text-3xl font-medium text-[#9382ff]/50">
                {s.step}
              </div>
              <h3 className="text-base font-medium text-[#f4f0ff]">{s.title}</h3>
              <p className="text-xs text-[#918ea0] leading-relaxed font-normal">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Aurora Divider */}
      <div className="aurora-divider" />

      {/* Specialized Interview Catalog */}
      <section id="interview-types" className="py-24 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[32px] bg-[#060317] border border-[#5046e4]/50 text-xs font-medium text-[#9382ff] shadow-[inset_0_-7px_11px_rgba(164,143,255,0.12)]">
            <span>Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-medium text-[#f4f0ff] tracking-tight">
            Specialized Interview Modes
          </h2>
          <p className="text-sm text-[#a8a6b7] font-normal">
            Practice the exact format matching your upcoming company loops.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {interviewTypes.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.type}
                className="p-5 rounded-[16px] bg-[#060317] border border-white/10 shadow-[inset_0_0_24px_rgba(255,255,255,0.04)] flex flex-col justify-between space-y-4 hover:border-[#9382ff]/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-[5px] bg-[#10093a]/70 text-[#f4f0ff] flex items-center justify-center border border-white/5">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#f4f0ff]">{t.type}</h3>
                    <p className="text-[11px] text-[#9382ff] font-medium mt-0.5">{t.role}</p>
                    <p className="text-xs text-[#918ea0] mt-2 leading-relaxed font-normal">{t.desc}</p>
                  </div>
                </div>

                <Link to="/interview/setup" className="pt-2">
                  <button
                    type="button"
                    className="w-full py-2 px-3 rounded-[5px] bg-[#10093a]/80 hover:bg-[#5046e4] text-[#f4f0ff] text-xs font-medium border border-white/10 transition-colors"
                  >
                    Practice Mode
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Aurora Divider */}
      <div className="aurora-divider" />

      {/* Testimonials (3-Column Wall of Love) */}
      <section className="py-24 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[32px] bg-[#060317] border border-[#5046e4]/50 text-xs font-medium text-[#9382ff] shadow-[inset_0_-7px_11px_rgba(164,143,255,0.12)]">
            <Quote className="w-3.5 h-3.5" />
            <span>Wall of Love</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-medium text-[#f4f0ff] tracking-tight">
            Loved by candidates landing tech offers
          </h2>
          <p className="text-sm text-[#a8a6b7] font-normal">
            Real feedback from developers who trained with HirePilot before their company rounds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testi) => (
            <div
              key={testi.name}
              className="p-6 rounded-[16px] bg-[#060317] border border-white/10 shadow-[inset_0_0_24px_rgba(255,255,255,0.04)] space-y-4"
            >
              {/* Circular Avatar + Author Info */}
              <div className="flex items-center gap-3">
                <img
                  src={testi.avatar}
                  alt={testi.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
                <div>
                  <h3 className="text-sm font-medium text-[#f4f0ff]">{testi.name}</h3>
                  <p className="text-xs text-[#918ea0] font-normal">{testi.role}</p>
                </div>
              </div>

              {/* Quote text with #9382ff highlighted mentions */}
              <p
                className="text-xs sm:text-sm text-[#f4f0ff]/90 leading-relaxed font-normal"
                dangerouslySetInnerHTML={{ __html: `&ldquo;${testi.quote}&rdquo;` }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Aurora Divider */}
      <div className="aurora-divider" />

      {/* Pricing / Free Tier Quota */}
      <section id="pricing" className="py-24 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[32px] bg-[#060317] border border-[#5046e4]/50 text-xs font-medium text-[#9382ff] shadow-[inset_0_-7px_11px_rgba(164,143,255,0.12)]">
            <span>Free Tier</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-medium text-[#f4f0ff] tracking-tight">
            Free forever for early-career candidates
          </h2>
          <p className="text-sm text-[#a8a6b7] font-normal">
            Transparent monthly quotas designed to keep AI career preparation accessible to all.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="p-8 rounded-[16px] bg-[#060317] border border-[#5046e4]/60 shadow-[inset_0_0_24px_rgba(255,255,255,0.04)] space-y-6 relative">
            <div className="absolute -top-3 right-6">
              <span className="px-3 py-0.5 rounded-[32px] text-xs font-medium bg-[#10093a] text-[#ba9cff] border border-[#5046e4] shadow-[inset_0_-7px_11px_rgba(164,143,255,0.12)]">
                Community Tier
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-medium text-[#f4f0ff]">Community Pilot</h3>
              <p className="text-xs text-[#918ea0] mt-1 font-normal">Full access to all roles, adaptive questions, and analytics</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-medium text-[#f4f0ff] font-mono">$0</span>
                <span className="text-xs text-[#918ea0] font-normal">/ forever</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-[#a8a6b7] font-normal">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#9382ff] shrink-0" />
                <span><strong className="text-[#f4f0ff] font-medium">3 Free Full Interviews</strong> per user every calendar month</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#9382ff] shrink-0" />
                <span><strong className="text-[#f4f0ff] font-medium">Up to 15 Adaptive Questions</strong> per mock session</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#9382ff] shrink-0" />
                <span><strong className="text-[#f4f0ff] font-medium">Instant Multi-Criteria Scoring</strong> (Relevance, Accuracy, Clarity)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#9382ff] shrink-0" />
                <span><strong className="text-[#f4f0ff] font-medium">Detailed Evaluation Reports</strong> with missing point callouts</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#9382ff] shrink-0" />
                <span><strong className="text-[#f4f0ff] font-medium">Lifetime Progress History</strong> & transcript review</span>
              </li>
            </ul>

            <Link to="/signup" className="block pt-2">
              <button
                type="button"
                className="w-full py-3 px-4 rounded-[5px] bg-[#5046e4] hover:bg-[#10093a] text-white text-sm font-medium transition-all shadow-[0_0_20px_rgba(80,70,228,0.35)]"
              >
                Get Started Free
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Aurora Divider */}
      <div className="aurora-divider" />

      {/* Meet the Founder Section */}
      <FounderSection />

      {/* Aurora Divider */}
      <div className="aurora-divider" />

      {/* FAQ Section */}
      <section id="faq" className="py-24 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[32px] bg-[#060317] border border-[#5046e4]/50 text-xs font-medium text-[#9382ff] shadow-[inset_0_-7px_11px_rgba(164,143,255,0.12)]">
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-medium text-[#f4f0ff] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-[16px] bg-[#060317] border border-white/10 shadow-[inset_0_0_24px_rgba(255,255,255,0.04)] overflow-hidden cursor-pointer transition-colors hover:border-white/20"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className="p-5 flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-[#f4f0ff]">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#918ea0] shrink-0 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180 text-[#9382ff]' : ''
                  }`}
                />
              </div>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-[#a8a6b7] leading-relaxed border-t border-white/5 pt-3 font-normal">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Aurora Divider */}
      <div className="aurora-divider" />

      {/* Final Call to Action */}
      <section className="py-20 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-[16px] bg-[#060317] border border-white/10 shadow-[inset_0_0_24px_rgba(255,255,255,0.04)] text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#f4f0ff] tracking-tight">
            Ready to ace your next <span className="cosmic-text-gradient">technical interview</span>?
          </h2>
          <p className="text-sm text-[#a8a6b7] max-w-xl mx-auto font-normal leading-relaxed">
            Join hundreds of candidates using HirePilot to isolate weak concepts, hone explanations, and walk into interviews with unshakeable confidence.
          </p>
          <div>
            <Link to="/signup">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[5px] bg-[#5046e4] hover:bg-[#10093a] text-white text-sm font-medium transition-all shadow-[0_0_24px_rgba(80,70,228,0.4)]"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
