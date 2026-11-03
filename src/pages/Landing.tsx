import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { FounderSection } from '../components/landing/FounderSection';
import { LogoIntro } from '../components/ui/LogoIntro';
import {
  HeroHeading,
  AnimatedHeading,
  FadeUpText,
  ScrollReveal,
  GradientText,
  CountUp,
} from '../components/motion';
import {
  Sparkles,
  ArrowRight,
  Bot,
  Zap,
  Brain,
  BarChart3,
  CheckCircle2,
  FileText,
  Briefcase,
  Layers,
  ChevronRight,
  Shield,
  FileCheck,
  Search,
  Sliders,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Play,
  Terminal,
  Clock,
  ArrowUpRight,
  ChevronDown,
} from 'lucide-react';

export const Landing: React.FC = () => {
  // Hero interactive studio preview tab
  const [heroPreviewTab, setHeroPreviewTab] = useState<'interview' | 'ats' | 'tracker'>('interview');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // 6 Core Platform Features (Section C)
  const coreFeatures = [
    {
      icon: Bot,
      title: 'AI Mock Interviews',
      desc: 'Simulate realistic technical, system design, and behavioral interviews calibrated by role and difficulty using Google Gemini AI.',
      badge: 'Interactive',
    },
    {
      icon: FileText,
      title: 'Smart Resume Builder',
      desc: 'Craft structured, recruiter-ready resumes using industry-standard layouts engineered specifically for tech candidates.',
      badge: 'Editor',
    },
    {
      icon: FileCheck,
      title: 'ATS Resume Analysis',
      desc: 'Audit your resume against modern Applicant Tracking Systems to identify keyword gaps, formatting flaws, and match rates.',
      badge: 'Analysis',
    },
    {
      icon: Search,
      title: 'Job Matching',
      desc: 'Discover career opportunities and role requirements that closely align with your validated skills, projects, and target seniority.',
      badge: 'Intelligence',
    },
    {
      icon: Sliders,
      title: 'Application Tracker',
      desc: 'Organize your job search pipeline from initial application and screening through technical rounds to final offers in one dashboard.',
      badge: 'Pipeline',
    },
    {
      icon: BarChart3,
      title: 'Interview Performance Reports',
      desc: 'Inspect granular multi-criteria rubrics on Relevance, Accuracy, Completeness, and Clarity with targeted study recommendations.',
      badge: 'Feedback',
    },
  ];

  // How It Works: 3 Clear Steps (Section D)
  const howItWorksSteps = [
    {
      step: '01',
      title: 'Build your professional profile',
      desc: 'Input your technical background, target roles, and create or upload your resume to establish your career baseline.',
      highlight: 'Profile & Resume Setup',
    },
    {
      step: '02',
      title: 'Prepare with AI-powered tools',
      desc: 'Practice adaptive, role-specific mock interviews and optimize your resume for automated ATS screening filters.',
      highlight: 'Simulate & Optimize',
    },
    {
      step: '03',
      title: 'Track your career progress',
      desc: 'Review actionable performance scorecards, eliminate knowledge gaps, and manage active applications in your pipeline.',
      highlight: 'Measure & Improve',
    },
  ];

  // Frequently Asked Questions
  const faqs = [
    {
      q: 'How does HirePilot evaluate interview responses?',
      a: 'HirePilot utilizes Google Gemini AI trained on technical hiring rubrics. Every answer is evaluated across four core criteria: Relevance, Technical Accuracy, Completeness, and Clarity. You receive an objective numerical score out of 100 alongside targeted recommendations for omitted technical nuances.',
    },
    {
      q: 'What is ATS Resume Analysis and why does it matter?',
      a: 'Applicant Tracking Systems (ATS) automatically parse and rank resumes before recruiters read them. HirePilot analyzes your resume format, keyword distribution, and role alignment against standard screening algorithms so your application reaches human decision-makers.',
    },
    {
      q: 'Can I practice for non-standard or specialized engineering roles?',
      a: 'Yes. In the interview setup screen, you can choose pre-configured tracks (Frontend, Backend, Full Stack, Machine Learning, DevOps, DSA, Behavioral) or specify any custom target title to generate tailored question loops.',
    },
    {
      q: 'Is HirePilot free to use?',
      a: 'HirePilot offers a free community tier providing monthly mock interview sessions, complete performance feedback reports, and pipeline tracking. No credit card is required to sign up and start practicing.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans selection:bg-[#2563EB] selection:text-white relative overflow-x-hidden">
      {/* Cinematic 3D Logo Intro Overlay (Plays once per session on initial visit) */}
      <LogoIntro />

      {/* Light Frosted Navbar */}
      <Navbar variant="light" />

      {/* ========================================================= */}
      {/* SECTION A: HERO SECTION (MAIN PRIORITY)                   */}
      {/* ========================================================= */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-[#F8FAFC]/60 to-white">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(#111827 1px, transparent 1px), radial-gradient(#111827 1px, #FFFFFF 1px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          {/* Category Tag Pill */}
          <FadeUpText
            duration={500}
            distance={8}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#2563EB] text-xs font-semibold shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Next-Gen AI Career Preparation Platform</span>
          </FadeUpText>

          {/* Hero Headline (Word-by-word reveal with upward motion & blur-to-focus) */}
          <HeroHeading theme="light" />

          {/* Hero Supporting Text */}
          <FadeUpText
            delay={320}
            duration={650}
            distance={14}
            className="text-lg sm:text-xl text-[#64748B] max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Prepare smarter, present your skills confidently, and move closer to your dream career with AI-powered career preparation.
          </FadeUpText>

          {/* Hero CTA Buttons */}
          <FadeUpText
            delay={480}
            duration={600}
            distance={12}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2"
          >
            <Link to="/signup" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[6px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium transition-all duration-200 shadow-xs hover:shadow-sm hover:-translate-y-0.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[6px] bg-white border border-[#E5E7EB] hover:bg-slate-50 text-[#111827] text-sm font-medium transition-colors shadow-2xs"
            >
              <span>Explore Features</span>
              <ChevronRight className="w-4 h-4 text-[#64748B]" />
            </a>
          </FadeUpText>

          {/* ========================================================= */}
          {/* HERO PRODUCT PREVIEW (Beside or below hero content)       */}
          {/* ========================================================= */}
          <ScrollReveal
            delay={200}
            distance={24}
            blur={true}
            className="pt-8 sm:pt-12 max-w-5xl mx-auto text-left"
          >
            <div className="rounded-[16px] bg-white border border-[#E5E7EB] shadow-xl overflow-hidden">
              {/* Studio Window Header */}
              <div className="bg-[#F8FAFC] px-4 sm:px-6 py-3 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Traffic lights */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-400 border border-rose-500/30" />
                    <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/30" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/30" />
                  </div>
                  <span className="text-xs font-semibold text-[#111827] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    HirePilot AI Studio
                  </span>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center bg-white p-1 rounded-[8px] border border-[#E5E7EB] gap-1 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setHeroPreviewTab('interview')}
                    className={`px-3 py-1 text-xs font-medium rounded-[5px] transition-colors ${
                      heroPreviewTab === 'interview'
                        ? 'bg-[#2563EB] text-white shadow-2xs'
                        : 'text-[#64748B] hover:text-[#111827]'
                    }`}
                  >
                    AI Mock Interview
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroPreviewTab('ats')}
                    className={`px-3 py-1 text-xs font-medium rounded-[5px] transition-colors ${
                      heroPreviewTab === 'ats'
                        ? 'bg-[#2563EB] text-white shadow-2xs'
                        : 'text-[#64748B] hover:text-[#111827]'
                    }`}
                  >
                    ATS Resume Audit
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroPreviewTab('tracker')}
                    className={`px-3 py-1 text-xs font-medium rounded-[5px] transition-colors ${
                      heroPreviewTab === 'tracker'
                        ? 'bg-[#2563EB] text-white shadow-2xs'
                        : 'text-[#64748B] hover:text-[#111827]'
                    }`}
                  >
                    Application Pipeline
                  </button>
                </div>
              </div>

              {/* Studio Window Content */}
              <div className="p-5 sm:p-7 bg-white min-h-[380px]">
                {heroPreviewTab === 'interview' && (
                  <div className="space-y-5 animate-fade-in">
                    {/* Role header & status */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5E7EB]">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-[#2563EB] border border-blue-200">
                          Senior Full-Stack Engineer
                        </span>
                        <span className="text-xs text-[#64748B]">System Design &amp; Scalability Loop</span>
                      </div>
                      <div className="text-xs font-mono font-medium text-[#64748B]">
                        Question 4 of 8
                      </div>
                    </div>

                    {/* AI Question Box */}
                    <div className="p-4 rounded-[10px] bg-slate-50 border border-[#E5E7EB] space-y-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
                        <Bot className="w-4 h-4" />
                        <span>AI Interviewer Question</span>
                      </div>
                      <p className="text-sm font-medium text-[#111827] leading-relaxed">
                        &ldquo;How would you design a distributed rate limiter that protects multi-region microservices against traffic spikes? What storage engine and concurrency primitives would you implement to prevent race conditions?&rdquo;
                      </p>
                    </div>

                    {/* Candidate Answer Box */}
                    <div className="p-4 rounded-[10px] bg-white border border-[#E5E7EB] space-y-1.5 text-xs text-[#334155] font-mono shadow-2xs">
                      <span className="text-[11px] text-[#64748B] uppercase tracking-wider font-semibold block">
                        Candidate Answer Preview
                      </span>
                      <p className="leading-relaxed font-sans text-xs sm:text-sm text-[#4B5563]">
                        I would implement a Sliding Window Counter algorithm backed by Redis clusters. Using atomic Lua scripts with Redis Sorted Sets (<span className="font-mono text-[#2563EB]">ZADD</span> and <span className="font-mono text-[#2563EB]">ZREMRANGEBYSCORE</span>) ensures distributed atomicity without expensive locking. For multi-region consistency, requests are routed to local PoPs with asynchronous counter reconciliation...
                      </p>
                    </div>

                    {/* Instant AI Evaluation Result */}
                    <div className="p-4 rounded-[10px] bg-blue-50/60 border border-blue-200/80 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB]">
                          <Sparkles className="w-4 h-4 text-[#2563EB]" />
                          <span>Instant Gemini Evaluation: 94 / 100</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-mono text-[#4B5563]">
                          <span>Accuracy: <strong className="text-[#111827]">9.5/10</strong></span>
                          <span>Completeness: <strong className="text-[#111827]">9.2/10</strong></span>
                          <span>Clarity: <strong className="text-[#111827]">9.5/10</strong></span>
                        </div>
                      </div>
                      <p className="text-xs text-[#334155] leading-relaxed">
                        &ldquo;Outstanding explanation of Lua atomicity and Redis data structures. For maximum marks, also mention circuit breaking fallbacks (e.g., local in-memory token buckets) if cross-region Redis latency spikes.&rdquo;
                      </p>
                    </div>
                  </div>
                )}

                {heroPreviewTab === 'ats' && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5E7EB]">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Target Role: Staff Software Engineer
                        </span>
                        <span className="text-xs text-[#64748B]">Resume: Senior_Engineer_2026.pdf</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        93% Match Rate
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-[10px] bg-slate-50 border border-[#E5E7EB] text-center space-y-1">
                        <span className="text-xs text-[#64748B] font-medium">ATS Readability</span>
                        <div className="text-2xl font-semibold text-[#111827]">98 / 100</div>
                        <p className="text-[11px] text-emerald-600 font-medium">Clean single-column parsing</p>
                      </div>
                      <div className="p-4 rounded-[10px] bg-slate-50 border border-[#E5E7EB] text-center space-y-1">
                        <span className="text-xs text-[#64748B] font-medium">Keyword Density</span>
                        <div className="text-2xl font-semibold text-[#111827]">91%</div>
                        <p className="text-[11px] text-emerald-600 font-medium">28 of 31 key skills found</p>
                      </div>
                      <div className="p-4 rounded-[10px] bg-slate-50 border border-[#E5E7EB] text-center space-y-1">
                        <span className="text-xs text-[#64748B] font-medium">Impact Quantifiers</span>
                        <div className="text-2xl font-semibold text-[#111827]">89%</div>
                        <p className="text-[11px] text-[#2563EB] font-medium">Strong metric-driven bullets</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-[10px] bg-white border border-[#E5E7EB] space-y-2">
                      <span className="text-xs font-semibold text-[#111827] block uppercase tracking-wider">
                        Matched Technical Keywords
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {['Distributed Systems', 'TypeScript', 'React 18', 'Redis Caching', 'PostgreSQL', 'Docker', 'REST & GraphQL', 'Microservices', 'CI/CD Pipelines'].map((kw) => (
                          <span key={kw} className="px-2.5 py-1 rounded-[5px] bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {heroPreviewTab === 'tracker' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                      <span className="text-xs font-semibold text-[#111827] uppercase tracking-wider">
                        Active Application Pipeline
                      </span>
                      <span className="text-xs text-[#64748B]">4 Active Hiring Loops</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-[10px] bg-slate-50 border border-[#E5E7EB] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#111827]">Stripe</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Offer Stage
                          </span>
                        </div>
                        <p className="text-xs text-[#4B5563]">Senior Frontend Engineer</p>
                        <p className="text-[11px] text-[#64748B]">Decision discussion scheduled</p>
                      </div>

                      <div className="p-3.5 rounded-[10px] bg-slate-50 border border-[#E5E7EB] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#111827]">Linear</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-[#2563EB] border border-blue-200">
                            System Design
                          </span>
                        </div>
                        <p className="text-xs text-[#4B5563]">Full Stack Engineer</p>
                        <p className="text-[11px] text-[#64748B]">Prep score: 94% readiness</p>
                      </div>

                      <div className="p-3.5 rounded-[10px] bg-slate-50 border border-[#E5E7EB] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#111827]">Datadog</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            Technical Round
                          </span>
                        </div>
                        <p className="text-xs text-[#4B5563]">Backend / Distributed Systems</p>
                        <p className="text-[11px] text-[#64748B]">Upcoming loop in 2 days</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION B: TRUST AND VALUE PROPOSITION                    */}
      {/* ========================================================= */}
      <section id="problem-solution" className="py-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 border-t border-[#E5E7EB]">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-[#E5E7EB] text-xs font-semibold text-[#4B5563]">
            <span>The Reality of Tech Hiring</span>
          </div>
          <AnimatedHeading as="h2" className="text-3xl sm:text-4xl font-semibold text-[#111827] tracking-tight">
            Why traditional career preparation leaves candidates stranded
          </AnimatedHeading>
          <FadeUpText delay={120} className="text-base text-[#64748B] font-normal leading-relaxed">
            Landing competitive technical offers requires more than generic study guides. Understanding the structural hurdles of modern hiring is the first step toward overcoming them.
          </FadeUpText>
        </div>

        {/* 2-Column Comparison: The Problem vs How HirePilot Helps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: The Problem */}
          <div className="p-7 sm:p-8 rounded-[16px] bg-[#F8FAFC] border border-[#E5E7EB] space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[8px] bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
                <AlertCircle className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827]">
                The Traditional Preparation Problem
              </h3>
            </div>

            <ul className="space-y-4 text-sm text-[#4B5563]">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <div>
                  <strong className="text-[#111827] font-semibold block">Opaque Rejections Without Feedback</strong>
                  <span>Candidates receive automated rejection emails with zero explanation of why their technical or architectural answers fell short.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <div>
                  <strong className="text-[#111827] font-semibold block">The ATS Screening Gate</strong>
                  <span>Qualified candidates are filtered out by resume parsers before a hiring manager ever reads their experience due to missing keyword density.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <div>
                  <strong className="text-[#111827] font-semibold block">Practicing in Isolation</strong>
                  <span>Memorizing answers doesn't prepare engineers for real-time probing, dynamic follow-ups, or articulating trade-offs under scrutiny.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 2: How HirePilot Helps */}
          <div className="p-7 sm:p-8 rounded-[16px] bg-white border border-[#E5E7EB] shadow-sm space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[8px] bg-blue-50 text-[#2563EB] flex items-center justify-center border border-blue-200">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827]">
                How HirePilot Solves It
              </h3>
            </div>

            <ul className="space-y-4 text-sm text-[#4B5563]">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                <div>
                  <strong className="text-[#111827] font-semibold block">Instant, Multi-Criteria Evaluation</strong>
                  <span>Every answer is scored objectively on Relevance, Technical Accuracy, Completeness, and Clarity with specific points for improvement.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                <div>
                  <strong className="text-[#111827] font-semibold block">ATS-Calibrated Resume Audits</strong>
                  <span>Scan your resume against real role descriptions to verify parsing compatibility, detect missing keywords, and ensure recruiter visibility.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                <div>
                  <strong className="text-[#111827] font-semibold block">Adaptive, Pressure-Resilient Simulations</strong>
                  <span>Practice answering unpredictable follow-up questions in an authentic environment that turns anxious rehearsing into calm competence.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION C: FEATURES SECTION                               */}
      {/* ========================================================= */}
      <section id="features" className="py-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 border-t border-[#E5E7EB]">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#2563EB]">
            <span>Product Capabilities</span>
          </div>
          <AnimatedHeading as="h2" className="text-3xl sm:text-4xl font-semibold text-[#111827] tracking-tight">
            Comprehensive tools for career preparation
          </AnimatedHeading>
          <FadeUpText delay={120} className="text-base text-[#64748B] font-normal leading-relaxed">
            Everything you need to refine technical articulation, optimize resumes for automated screeners, and manage your hiring pipeline.
          </FadeUpText>
        </div>

        {/* 6-Card Linear-style Grid */}
        <ScrollReveal
          staggerChildren={70}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {coreFeatures.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="h-full p-6 sm:p-7 rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 hover:border-slate-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-[8px] bg-slate-50 border border-[#E5E7EB] text-[#2563EB] flex items-center justify-center">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-[#4B5563] border border-[#E5E7EB]">
                      {f.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-[#111827]">
                      {f.title}
                    </h3>
                    <p className="text-sm text-[#64748B] mt-2 leading-relaxed font-normal">
                      {f.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                  >
                    <span>Try with HirePilot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* SECTION D: HOW IT WORKS (3 CLEAR STEPS)                   */}
      {/* ========================================================= */}
      <section id="how-it-works" className="py-24 bg-[#F8FAFC] border-t border-b border-[#E5E7EB]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E7EB] text-xs font-semibold text-[#4B5563]">
              <span>Three-Step Workflow</span>
            </div>
            <AnimatedHeading as="h2" className="text-3xl sm:text-4xl font-semibold text-[#111827] tracking-tight">
              How HirePilot Works
            </AnimatedHeading>
            <FadeUpText delay={120} className="text-base text-[#64748B] font-normal leading-relaxed">
              From profile setup to actionable scorecards in three streamlined phases.
            </FadeUpText>
          </div>

          <ScrollReveal
            staggerChildren={90}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {howItWorksSteps.map((s) => (
              <div
                key={s.step}
                className="h-full p-8 rounded-[16px] bg-white border border-[#E5E7EB] shadow-2xs space-y-4 relative flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-bold text-[#2563EB]/40">
                      {s.step}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {s.highlight}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[#111827]">
                      {s.title}
                    </h3>
                    <p className="text-sm text-[#64748B] mt-2 leading-relaxed font-normal">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION E: PRODUCT SHOWCASE                               */}
      {/* ========================================================= */}
      <section id="showcase" className="py-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#2563EB]">
            <span>Product Showcase</span>
          </div>
          <AnimatedHeading as="h2" className="text-3xl sm:text-4xl font-semibold text-[#111827] tracking-tight">
            Engineered for genuine interview readiness
          </AnimatedHeading>
          <FadeUpText delay={120} className="text-base text-[#64748B] font-normal leading-relaxed">
            See how HirePilot guides you through real-world technical and behavioral interview preparation.
          </FadeUpText>
        </div>

        {/* 3 Detailed Product Showcase Cards */}
        <div className="space-y-12">
          {/* Showcase Item 1: Real-time Interview Simulation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-[16px] bg-[#F8FAFC] border border-[#E5E7EB]">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
                Adaptive AI Dialogue
              </span>
              <h3 className="text-2xl font-semibold text-[#111827] tracking-tight">
                Practice answering complex questions under realistic conditions
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Rather than memorizing flashcards, articulate your reasoning in depth. HirePilot adapts question difficulty dynamically based on how thoroughly you handle initial invariants and edge cases.
              </p>
              <ul className="space-y-2 text-xs font-medium text-[#4B5563]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                  <span>Technical, System Design, DSA, and Behavioral rounds</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                  <span>Support for custom job titles and seniority levels</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7 bg-white rounded-[12px] p-5 border border-[#E5E7EB] shadow-sm space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                <span className="font-semibold text-[#111827]">Live Interview Session</span>
                <span className="text-emerald-600 font-mono text-[11px] font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Adaptive Level: Advanced
                </span>
              </div>
              <p className="text-[#111827] font-medium leading-relaxed">
                &ldquo;Under high write contention, what trade-offs exist between optimistic locking using version columns and pessimistic locking with SELECT FOR UPDATE?&rdquo;
              </p>
              <div className="p-3 bg-slate-50 rounded-[8px] border border-[#E5E7EB] text-[#4B5563] text-[11px] leading-relaxed">
                Optimistic locking avoids database lock contention by checking row version during commit, ideal when collisions are infrequent. Pessimistic locking guarantees reservation upfront but risks queuing and deadlocks under concurrent bursts...
              </div>
            </div>
          </div>

          {/* Showcase Item 2: Multi-Criteria Rubric Reports */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-[16px] bg-[#F8FAFC] border border-[#E5E7EB]">
            <div className="lg:col-span-5 space-y-4 lg:order-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
                Actionable Evaluation
              </span>
              <h3 className="text-2xl font-semibold text-[#111827] tracking-tight">
                Objective scoring across four critical hiring dimensions
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Receive specific, actionable feedback on what you did well, what concepts you missed, and how to improve your explanations before high-stakes company loops.
              </p>
              <ul className="space-y-2 text-xs font-medium text-[#4B5563]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                  <span>Relevance, Technical Accuracy, Completeness, Clarity</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                  <span>Omitted technical nuances and study guides</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7 bg-white rounded-[12px] p-5 border border-[#E5E7EB] shadow-sm space-y-4 lg:order-1 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                <span className="font-semibold text-[#111827]">Performance Scorecard</span>
                <span className="font-mono text-sm font-bold text-[#2563EB]">91% Overall</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-[8px] bg-slate-50 border border-[#E5E7EB]">
                  <span className="text-[10px] text-[#64748B] block">Relevance</span>
                  <span className="text-base font-semibold text-[#111827]">9.5/10</span>
                </div>
                <div className="p-2.5 rounded-[8px] bg-slate-50 border border-[#E5E7EB]">
                  <span className="text-[10px] text-[#64748B] block">Accuracy</span>
                  <span className="text-base font-semibold text-[#111827]">9.0/10</span>
                </div>
                <div className="p-2.5 rounded-[8px] bg-slate-50 border border-[#E5E7EB]">
                  <span className="text-[10px] text-[#64748B] block">Completeness</span>
                  <span className="text-base font-semibold text-[#111827]">8.8/10</span>
                </div>
                <div className="p-2.5 rounded-[8px] bg-slate-50 border border-[#E5E7EB]">
                  <span className="text-[10px] text-[#64748B] block">Clarity</span>
                  <span className="text-base font-semibold text-[#111827]">9.2/10</span>
                </div>
              </div>
              <div className="p-3 bg-emerald-50 rounded-[8px] border border-emerald-200 text-emerald-800 text-[11px] leading-relaxed">
                <strong>Strong Point:</strong> Excellent explanation of concurrency bounds and recovery states under network partitions.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION F: FOUNDER SECTION PREVIEW                        */}
      {/* ========================================================= */}
      <FounderSection theme="light" />

      {/* ========================================================= */}
      {/* FREQUENTLY ASKED QUESTIONS                                */}
      {/* ========================================================= */}
      <section id="faq" className="py-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 border-t border-[#E5E7EB]">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-[#E5E7EB] text-xs font-semibold text-[#4B5563]">
            <span>Frequently Asked Questions</span>
          </div>
          <AnimatedHeading as="h2" className="text-3xl sm:text-4xl font-semibold text-[#111827] tracking-tight">
            Common questions about HirePilot
          </AnimatedHeading>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-[12px] bg-white border border-[#E5E7EB] shadow-2xs overflow-hidden cursor-pointer transition-colors hover:border-slate-300"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className="p-5 flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-[#111827]">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#64748B] shrink-0 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180 text-[#2563EB]' : ''
                  }`}
                />
              </div>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-slate-100 pt-3 font-normal">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION G: FINAL CTA                                      */}
      {/* ========================================================= */}
      <section className="py-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal
          delay={100}
          className="p-10 sm:p-14 rounded-[20px] bg-gradient-to-b from-[#F8FAFC] to-white border border-[#E5E7EB] shadow-md text-center space-y-6"
        >
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#111827] tracking-tight">
              Your Next Opportunity Is Waiting.
            </h2>
            <p className="text-base text-[#64748B] max-w-xl mx-auto font-normal leading-relaxed">
              Join thousands of job seekers preparing smarter, building confidence, and securing top career opportunities with HirePilot.
            </p>
          </div>

          <div className="pt-2">
            <Link to="/signup">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[6px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium transition-all shadow-xs hover:shadow-sm hover:-translate-y-0.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* SECTION H: FOOTER                                         */}
      {/* ========================================================= */}
      <Footer theme="light" />
    </div>
  );
};

export default Landing;
