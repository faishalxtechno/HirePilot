import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import {
  ArrowRight,
  ChevronDown,
  Check,
  Share2,
  Play,
  Volume2,
  Terminal,
  FileText,
  Cpu,
  BarChart3,
  Users,
  CheckCircle2,
  Code2,
  Compass,
  Sparkles,
  ExternalLink,
  Shield,
  Award,
  Layers,
  SlidersHorizontal,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { QuickDemoModal } from '../components/landing/QuickDemoModal';

// Authentic community technical tracks for the 4-column gallery
const INTERVIEW_TRACKS = [
  {
    id: 1,
    title: 'Distributed Systems & Consensus at Scale',
    author: 'Elena Rostova',
    role: 'Staff Infrastructure Eng',
    avatar: 'ER',
    level: 'L6+ / Staff',
    gradient: 'linear-gradient(135deg, #000000 0%, #1a1a2e 100%)',
    badge: 'System Design',
    color: '#ff7237',
    topics: ['Raft Protocol', '2PC & Sagas', 'Redis Cluster'],
  },
  {
    id: 2,
    title: 'High-Concurrency Payment Pipeline Architecture',
    author: 'Marcus Vance',
    role: 'Principal Backend Architect',
    avatar: 'MV',
    level: 'Senior / Lead',
    gradient: 'linear-gradient(135deg, #121827 0%, #202b42 100%)',
    badge: 'Backend Core',
    color: '#00b6ff',
    topics: ['Idempotency Keys', 'Kafka Outbox', 'Zero-Loss Ledger'],
  },
  {
    id: 3,
    title: 'Frontend Rendering Engine & DOM Virtualization',
    author: 'Soren Lindqvist',
    role: 'Design Engineer / UI Lead',
    avatar: 'SL',
    level: 'Staff UI',
    gradient: 'linear-gradient(135deg, #1a2218 0%, #0d1f14 100%)',
    badge: 'Frontend Systems',
    color: '#24cb71',
    topics: ['React 19 Concurrency', 'Offscreen Canvas', 'Memory Leaks'],
  },
  {
    id: 4,
    title: 'ML Inference Optimization & KV-Cache Sharding',
    author: 'Aoi Tanaka',
    role: 'ML Platform Engineer',
    avatar: 'AT',
    level: 'AI / Platform',
    gradient: 'linear-gradient(135deg, #24142b 0%, #15091a 100%)',
    badge: 'Machine Learning',
    color: '#c4baff',
    topics: ['vLLM PagedAttention', 'Speculative Decoding', 'Triton'],
  },
];

// Feature Matrix capabilities
const CAPABILITIES = [
  {
    title: 'Real-Time Voice & Text Simulation',
    description: 'Ultra-low latency spoken dialogue with dynamic audio response waves and real-time transcription.',
    icon: Volume2,
    tag: 'Low-Latency Audio',
    link: '/interview/setup',
  },
  {
    title: 'Multi-Dimensional Rubric Scoring',
    description: 'Calibrated scoring across Technical Depth, Architectural Trade-offs, Delivery Structuring, and Edge Cases.',
    icon: BarChart3,
    tag: 'Calibrated Rubrics',
    link: '/history',
  },
  {
    title: 'Live Code Execution Sandbox',
    description: 'In-browser editor with multi-language execution, algorithmic complexity auditing, and test case verification.',
    icon: Terminal,
    tag: 'Multi-Language',
    link: '/interview/setup',
  },
  {
    title: 'ATS Resume Keyword Gap Audit',
    description: 'Precision semantic parser that cross-references candidate resumes against real Silicon Valley job specifications.',
    icon: FileText,
    tag: 'ATS Compliance',
    link: '/resume',
  },
  {
    title: 'Personalized Skill Progression Map',
    description: 'Continuous competency tracking that shifts dynamically based on your weak points across interviews.',
    icon: Compass,
    tag: 'Adaptive Roadmap',
    link: '/profile',
  },
  {
    title: 'Cryptographically Verifiable Badges',
    description: 'Performance milestone certificates shareable directly to LinkedIn and engineering job boards.',
    icon: Award,
    tag: 'Verified Credentials',
    link: '/history',
  },
];

export const Landing: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [activeRubricTab, setActiveRubricTab] = useState<'depth' | 'tradeoffs' | 'clarity' | 'edgecases'>('depth');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Initialize smooth scroll with Lenis
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          lenis.scrollTo(target as HTMLElement, { offset: -70 });
        }, 150);
      }
    }

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  const handleStartPracticing = () => {
    if (user) {
      navigate('/interview/setup');
    } else {
      navigate('/signup');
    }
  };

  const handleSignIn = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#000000] font-figmaSans selection:bg-[#4d49fc] selection:text-white antialiased overflow-x-hidden">
      {/* =========================================================================
          1. TOP NAVIGATION BAR (Exact Figma Spec)
          - White background, 64px tall
          - Logo left, primary nav center with dropdown carets, auth actions right
          - No border, no shadow — sits flush on the white canvas
          ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#ffffff] h-16 border-b border-[#e2e2e2]/60 px-6 sm:px-10 flex items-center justify-between">
        {/* Brand identifier: Four-color geometric logo mark */}
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 select-none group">
            <div className="w-5 h-7 flex flex-col justify-between shrink-0">
              <div className="flex h-2.5 w-5">
                <div className="w-2.5 h-2.5 rounded-l-full bg-[#ff7237]" />
                <div className="w-2.5 h-2.5 rounded-r-full bg-[#ff7237]" />
              </div>
              <div className="flex h-2.5 w-5">
                <div className="w-2.5 h-2.5 rounded-l-full bg-[#00b6ff]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#24cb71]" />
              </div>
              <div className="w-2.5 h-2.5 rounded-l-full rounded-br-full bg-[#000000]" />
            </div>
            <span className="font-figmaSans font-extrabold text-lg tracking-tight text-[#000000]">
              HirePilot
            </span>
          </Link>

          {/* Center Navigation Links (figmaSans weight 400 at 16px) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-normal text-[#000000]">
            <button
              onClick={() => scrollToSection('tracks')}
              className="flex items-center gap-1 hover:opacity-60 transition-opacity"
            >
              <span>Tracks</span>
              <ChevronDown className="w-3.5 h-3.5 mb-[2px] opacity-60" />
            </button>
            <button
              onClick={() => scrollToSection('studio')}
              className="flex items-center gap-1 hover:opacity-60 transition-opacity"
            >
              <span>Product Studio</span>
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="flex items-center gap-1 hover:opacity-60 transition-opacity"
            >
              <span>Rubrics & Scoring</span>
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="flex items-center gap-1 hover:opacity-60 transition-opacity"
            >
              <span>Pricing</span>
            </button>
            <Link
              to="/design-system"
              className="flex items-center gap-1 text-[#595959] hover:text-black transition-colors"
            >
              <span className="font-figmaMono text-xs tracking-[0.04em]">Design System</span>
            </Link>
          </nav>
        </div>

        {/* Auth & Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Ghost Nav Button: Transparent fill, 1px black border, 8px radius */}
          <button
            onClick={handleSignIn}
            className="inline-flex items-center justify-center font-figmaSans font-normal text-sm text-[#000000] border border-[#000000] rounded-lg px-[18px] py-1.5 hover:bg-black/5 transition-colors cursor-pointer"
          >
            {user ? 'Dashboard' : 'Sign in'}
          </button>

          {/* Pill Black Nav Button: Black fill, white text, 50px pill radius */}
          <button
            onClick={handleStartPracticing}
            className="hidden sm:inline-flex items-center justify-center font-figmaSans font-normal text-sm text-white bg-[#000000] rounded-[50px] px-[18px] py-1.5 hover:bg-black/85 transition-opacity cursor-pointer"
          >
            Get started for free
          </button>
        </div>
      </header>

      {/* =========================================================================
          2. HERO SECTION (Exact Figma Spec)
          - Horizontally scattered 2D collage behind
          - Centered floating headline card with rgba(0,0,0,0.1) 0px 24px 70px 0px shadow
          - Headline 56px weight 320 ink black, negative tracking -0.84px
          - Primary CTA: Electric Indigo (#4d49fc) 50px pill — ONLY saturated fill
          ========================================================================= */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 pb-24 sm:pb-36 px-4 sm:px-8 border-b border-[#e2e2e2]/60">
        {/* Background Scattered Design Collage: Proof-of-capability */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-95">
          {/* Technical Card 1: System Design Architecture */}
          <div className="absolute -top-6 left-6 sm:left-12 w-64 sm:w-72 rounded-2xl bg-white border border-[#e2e2e2] rotate-[-5deg] shadow-md p-5 text-black">
            <div className="flex items-center justify-between border-b border-[#e2e2e2] pb-2 mb-3">
              <span className="font-figmaMono text-[10px] text-[#595959] uppercase tracking-[0.04em]">
                SYS-DESIGN // SPEC 04
              </span>
              <span className="w-2 h-2 rounded-full bg-[#24cb71]" />
            </div>
            <p className="font-medium text-xs text-black">Distributed Rate Limiter</p>
            <p className="font-figmaMono text-[11px] text-[#595959] mt-1 leading-snug">
              Token Bucket + Redis Lua Atomic Scripts. 0.8ms p99 latency target.
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#e2e2e2] text-black font-medium">O(1) Memory</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#e4ff97] text-black font-medium">Idempotent</span>
            </div>
          </div>

          {/* Technical Card 2: Interview Rubric Scorecard */}
          <div className="absolute top-10 right-6 sm:right-14 w-72 sm:w-80 rounded-2xl bg-white border border-[#e2e2e2] rotate-[7deg] shadow-md p-5 text-black">
            <div className="flex items-center justify-between border-b border-[#e2e2e2] pb-2 mb-3">
              <span className="font-figmaMono text-[10px] text-[#595959] uppercase tracking-[0.04em]">
                CALIBRATED RUBRIC // L6
              </span>
              <span className="text-xs font-mono font-bold text-[#4d49fc]">94%</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#595959]">
                <span>Technical Rigor & Depth</span>
                <span className="text-black font-medium">96%</span>
              </div>
              <div className="w-full bg-[#e2e2e2] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#4d49fc] h-full w-[96%]" />
              </div>
              <div className="flex justify-between text-[#595959] pt-1">
                <span>Architectural Trade-offs</span>
                <span className="text-black font-medium">92%</span>
              </div>
              <div className="w-full bg-[#e2e2e2] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#000000] h-full w-[92%]" />
              </div>
            </div>
          </div>

          {/* Technical Card 3: Code Execution Snippet */}
          <div className="absolute -bottom-10 left-1/4 w-80 rounded-2xl bg-white border border-[#e2e2e2] rotate-[-2.5deg] shadow-md p-5 text-black hidden sm:block">
            <div className="flex items-center justify-between border-b border-[#e2e2e2] pb-2 mb-3">
              <span className="font-figmaMono text-[10px] text-[#595959]">raft_consensus.go</span>
              <span className="text-[10px] font-mono text-[#24cb71]">✓ Passed 18/18 Tests</span>
            </div>
            <pre className="font-figmaMono text-[11px] text-[#595959] leading-tight">
{`func (rf *Raft) AppendEntries(
  term int, leaderId int,
  entries []LogEntry,
) (bool, int) { ... }`}
            </pre>
          </div>

          {/* Technical Card 4: Resume Match Matrix */}
          <div className="absolute -bottom-8 right-1/4 w-72 rounded-2xl bg-white border border-[#e2e2e2] rotate-[4deg] shadow-md p-4 text-black hidden md:block">
            <div className="flex items-center justify-between text-[11px] font-figmaMono mb-1">
              <span className="text-[#595959]">ATS Semantic Match</span>
              <span className="font-bold text-[#000000]">98.4%</span>
            </div>
            <p className="text-xs text-black">Target: Staff Infrastructure Engineer</p>
            <div className="mt-2 flex gap-1">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#c7f8fb] text-black">Distributed</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#c4baff] text-black">Kubernetes</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#ffc9c1] text-black">gRPC</span>
            </div>
          </div>
        </div>

        {/* Foreground: Hero Floating Card */}
        <div className="relative max-w-[760px] mx-auto z-10 pt-4 sm:pt-8">
          <div className="bg-[#ffffff] rounded-[16px] p-8 sm:p-12 shadow-[0px_24px_70px_0px_rgba(0,0,0,0.1)] border border-[#e2e2e2]/40 transition-all">
            {/* Branded Conic Gradient Ring Accent */}
            <div className="flex items-center gap-3 mb-6">
              <div className="figma-decorative-ring" />
              <div className="inline-flex items-center gap-2">
                <span className="font-figmaMono text-xs tracking-[0.04em] text-[#595959] uppercase">
                  Technical Interview Platform
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#4d49fc]" />
              </div>
            </div>

            {/* Signature 56px ultra-light headline */}
            <h1 className="font-figmaSans font-[320] text-4xl sm:text-[56px] text-[#000000] tracking-[-0.84px] leading-[1.1] mb-6">
              Where top engineers practice for what's next.
            </h1>

            {/* Quiet, authentic body copy */}
            <p className="font-figmaSans text-lg sm:text-[18px] text-[#595959] font-normal leading-[1.4] tracking-[-0.18px] max-w-xl mb-8">
              A quiet, calibrated stage for technical interviews. Practice distributed systems, live coding, and architectural trade-offs with rigorous rubric benchmarks.
            </p>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Primary CTA Button: Electric Indigo (#4d49fc) 50px pill */}
              <button
                onClick={handleStartPracticing}
                className="inline-flex items-center justify-center gap-2 bg-[#4d49fc] text-white font-figmaSans font-[480] text-base rounded-[50px] px-6 py-3 hover:bg-[#433ff0] transition-colors cursor-pointer"
              >
                <span>Start practicing for free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Ghost Button: 1px black border, 8px radius */}
              <button
                onClick={() => setDemoModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-transparent text-[#000000] border border-[#000000] font-figmaSans font-normal text-base rounded-lg px-5 py-3 hover:bg-black/5 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Try live demo</span>
              </button>
            </div>

            {/* Bottom Meta Note */}
            <div className="mt-8 pt-6 border-t border-[#e2e2e2]/60 flex items-center justify-between text-xs text-[#595959]">
              <span>Zero credit card required</span>
              <span className="font-figmaMono">L4 · L5 · L6 · Staff Tracks</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. PRODUCT FEATURE PANEL (The App Canvas as Hero)
          - Full-width white section (80-120px padding)
          - Section headline at 56px weight 320 left-aligned
          - Figma UI rendered with app's own canvas toolbar
          ========================================================================= */}
      <section id="studio" className="max-w-[1200px] mx-auto px-6 sm:px-10 py-20 sm:py-28 space-y-8">
        <div>
          <span className="font-figmaMono text-xs text-[#595959] uppercase tracking-[0.04em]">
            Studio Workspace
          </span>
          <h2 className="font-figmaSans font-[320] text-3xl sm:text-[56px] text-[#000000] tracking-[-0.84px] leading-[1.1] mt-2">
            The interview studio as a creative instrument.
          </h2>
          <p className="font-figmaSans text-lg text-[#595959] font-normal leading-[1.4] tracking-[-0.18px] max-w-[600px] mt-4">
            No mock screenshots or generic device frames. An achromatic workspace designed to evaluate real technical thinking in real time.
          </p>
        </div>

        {/* Product Workspace Canvas with Toolbar */}
        <div className="rounded-[16px] border border-[#e2e2e2] overflow-hidden bg-white shadow-sm">
          {/* Canvas Toolbar */}
          <div className="h-13 bg-white border-b border-[#e2e2e2] px-5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 font-medium text-black">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff7237]" />
                <span>Session 104 // System Design: Sharded Distributed Cache</span>
              </div>
              <span className="font-figmaMono text-[11px] text-[#595959] px-2 py-0.5 rounded bg-[#e2e2e2]">
                TIME: 04:15
              </span>
            </div>

            {/* Right: Zoom controls, multiplayer tags, Share button */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#595959]">
                <div className="w-5 h-5 rounded-full bg-[#4d49fc] text-white flex items-center justify-center text-[10px] font-bold">
                  AK
                </div>
                <span>Candidate (You)</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#595959]">
                <div className="w-5 h-5 rounded-full bg-[#24cb71] text-white flex items-center justify-center text-[10px] font-bold">
                  HP
                </div>
                <span>Rubric Evaluator</span>
              </div>
              <button
                onClick={() => setDemoModalOpen(true)}
                className="bg-[#4d49fc] text-white font-medium text-xs rounded-[50px] px-3.5 py-1.5 hover:bg-[#433ff0] transition-colors"
              >
                Test Scenario
              </button>
            </div>
          </div>

          {/* Studio Canvas Main Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
            {/* Left 7 cols: Problem prompt, candidate answer, audio waveform */}
            <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#e2e2e2] space-y-6">
              <div>
                <span className="font-figmaMono text-[11px] text-[#595959] uppercase tracking-[0.04em]">
                  TECHNICAL PROMPT // DISTRIBUTED CACHING
                </span>
                <h3 className="text-xl font-normal text-black mt-1 leading-snug">
                  "Design a globally distributed rate limiter that handles 500,000 req/sec across 4 regions with zero race conditions."
                </h3>
              </div>

              {/* Spoken candidate response box */}
              <div className="p-4 rounded-xl bg-[#fafafa] border border-[#e2e2e2] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#595959]">
                  <span className="flex items-center gap-1.5 font-medium text-black">
                    <Volume2 className="w-4 h-4 text-[#4d49fc]" />
                    <span>Candidate Spoken Audio Stream</span>
                  </span>
                  <span className="font-figmaMono text-[11px]">44.1 kHz PCM</span>
                </div>

                {/* Simulated Audio Waveform */}
                <div className="flex items-center gap-1 h-8 px-2">
                  {[40, 65, 20, 85, 95, 45, 70, 30, 90, 60, 40, 75, 85, 30, 95, 55, 40, 80, 60, 30, 70, 90, 45, 60].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-full bg-[#000000] transition-all duration-300"
                      style={{ height: `${h}%`, opacity: i % 2 === 0 ? 0.9 : 0.4 }}
                    />
                  ))}
                </div>

                <p className="font-figmaSans text-sm text-[#595959] leading-relaxed">
                  "I would implement a Token Bucket algorithm backed by Redis Cluster. To prevent distributed race conditions under peak concurrency across regions, I would use atomic Lua scripts to evaluate token decrement in a single O(1) trip."
                </p>
              </div>

              {/* Verification checks */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg border border-[#e2e2e2] text-xs">
                  <span className="text-[#595959] block">Algorithm Choice</span>
                  <span className="font-medium text-black mt-0.5 block">Token Bucket vs Leaky Bucket</span>
                </div>
                <div className="p-3 rounded-lg border border-[#e2e2e2] text-xs">
                  <span className="text-[#595959] block">Concurrency Primitive</span>
                  <span className="font-medium text-black mt-0.5 block">Atomic Redis Lua scripts</span>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Live Rubric Analysis Matrix */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#e2e2e2]">
                  <div>
                    <span className="font-figmaMono text-[11px] text-[#595959] uppercase tracking-[0.04em]">
                      EVALUATION MATRIX
                    </span>
                    <h4 className="text-base font-medium text-black">Multi-Dimensional Score</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-light text-[#4d49fc]">94%</span>
                    <span className="block text-[10px] font-mono text-[#595959]">EXCEPTIONAL</span>
                  </div>
                </div>

                {/* Rubric Tab Selectors */}
                <div className="flex gap-1.5 my-4 p-1 rounded-lg bg-[#fafafa] border border-[#e2e2e2]">
                  {[
                    { id: 'depth', label: 'Depth 96%' },
                    { id: 'tradeoffs', label: 'Trade-offs 92%' },
                    { id: 'clarity', label: 'Clarity 94%' },
                    { id: 'edgecases', label: 'Edge 88%' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveRubricTab(tab.id as any)}
                      className={`flex-1 py-1 text-[11px] font-medium rounded-md transition-all ${
                        activeRubricTab === tab.id
                          ? 'bg-white text-black shadow-sm'
                          : 'text-[#595959] hover:text-black'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Active Rubric Detail */}
                <div className="p-4 rounded-xl border border-[#e2e2e2] space-y-2 text-xs">
                  {activeRubricTab === 'depth' && (
                    <>
                      <div className="flex items-center justify-between font-medium text-black">
                        <span>Technical Rigor & Architecture</span>
                        <span className="text-[#24cb71]">L6 Level</span>
                      </div>
                      <p className="text-[#595959] leading-relaxed">
                        Candidate accurately isolated Redis round-trip overhead and proposed localized bucket refreshes to eliminate multi-region cross-WAN latency.
                      </p>
                    </>
                  )}
                  {activeRubricTab === 'tradeoffs' && (
                    <>
                      <div className="flex items-center justify-between font-medium text-black">
                        <span>Scalability & Bottlenecks</span>
                        <span className="text-[#24cb71]">L5+ Level</span>
                      </div>
                      <p className="text-[#595959] leading-relaxed">
                        Weighed centralized consistency vs. local in-memory token estimates with periodic asynchronous reconciliation.
                      </p>
                    </>
                  )}
                  {activeRubricTab === 'clarity' && (
                    <>
                      <div className="flex items-center justify-between font-medium text-black">
                        <span>Delivery & Communication</span>
                        <span className="text-[#24cb71]">Strong</span>
                      </div>
                      <p className="text-[#595959] leading-relaxed">
                        Top-down communication structuring, logical grouping of requirements, and zero filler word drift.
                      </p>
                    </>
                  )}
                  {activeRubricTab === 'edgecases' && (
                    <>
                      <div className="flex items-center justify-between font-medium text-black">
                        <span>Fault Tolerance</span>
                        <span className="text-[#24cb71]">Verified</span>
                      </div>
                      <p className="text-[#595959] leading-relaxed">
                        Addressed clock drift, split-brain network partitions, and fallback circuit-breaker mechanics.
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[#e2e2e2] flex items-center justify-between text-xs text-[#595959]">
                <span>Rubric calibrated against FAANG & Stripe benchmarks</span>
                <span className="font-mono text-black font-medium">L6 Approved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. COMMUNITY GALLERY GRID (4 Columns, 24px Gap, No Shadows)
          - Clean gallery of real interview tracks
          - White surface, no drop shadow, 16px radius, uncropped creative thumbnails
          ========================================================================= */}
      <section id="tracks" className="max-w-[1200px] mx-auto px-6 sm:px-10 py-20 sm:py-28 space-y-8 border-t border-[#e2e2e2]/60">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-figmaMono text-xs text-[#595959] uppercase tracking-[0.04em]">
              Community Gallery
            </span>
            <h2 className="font-figmaSans font-[320] text-3xl sm:text-[56px] text-[#000000] tracking-[-0.84px] leading-[1.1] mt-2">
              Curated technical interview tracks.
            </h2>
          </div>
          <span className="font-figmaMono text-xs text-[#595959]">
            4-Column Gallery · Zero Drop Shadow Discipline
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INTERVIEW_TRACKS.map((track) => (
            <div
              key={track.id}
              onClick={handleStartPracticing}
              className="bg-white rounded-[16px] border border-[#e2e2e2] overflow-hidden hover:border-black/40 transition-colors group cursor-pointer flex flex-col justify-between"
            >
              {/* Uncropped thumbnail artwork */}
              <div
                className="h-44 w-full p-4 flex flex-col justify-between text-white transition-transform duration-300 group-hover:scale-[1.01]"
                style={{ background: track.gradient }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-figmaMono tracking-wider px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm">
                    {track.badge}
                  </span>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: track.color }} />
                </div>
                <div>
                  <span className="text-xs font-figmaMono text-white/70 block">{track.level}</span>
                  <span className="text-base font-medium tracking-tight text-white line-clamp-2">
                    {track.title}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {track.topics.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-[#e2e2e2] text-black font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2.5 pt-3 border-t border-[#e2e2e2]">
                  <div className="w-6 h-6 rounded-full bg-[#000000] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    {track.avatar}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-figmaSans font-normal text-sm text-[#000000] truncate">
                      {track.author}
                    </span>
                    <span className="text-xs text-[#595959] truncate">{track.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. HOW IT WORKS (Three-Step Process)
          - Left-aligned headline at 56px weight 320
          - 3 structured cards, 16px radius, no heavy drop shadows
          ========================================================================= */}
      <section id="how-it-works" className="max-w-[1200px] mx-auto px-6 sm:px-10 py-20 sm:py-28 space-y-12 border-t border-[#e2e2e2]/60">
        <div>
          <span className="font-figmaMono text-xs text-[#595959] uppercase tracking-[0.04em]">
            Methodology
          </span>
          <h2 className="font-figmaSans font-[320] text-3xl sm:text-[56px] text-[#000000] tracking-[-0.84px] leading-[1.1] mt-2">
            Calibrated feedback in three structured steps.
          </h2>
          <p className="font-figmaSans text-lg text-[#595959] font-normal leading-[1.4] tracking-[-0.18px] max-w-[600px] mt-4">
            A quiet loop of practice, automated rubric scoring, and targeted resume optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-[16px] bg-white border border-[#e2e2e2] flex flex-col justify-between space-y-6">
            <div>
              <span className="font-figmaMono text-xs text-[#595959]">STEP 01</span>
              <h3 className="text-2xl font-light text-black mt-3">Live Simulation</h3>
              <p className="text-sm text-[#595959] mt-2 leading-relaxed">
                Connect via low-latency audio or interactive text. Choose specific role tracks ranging from Systems & ML to Frontend and Engineering Management.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#fafafa] border border-[#e2e2e2] text-xs font-figmaMono text-[#595959]">
              → Multi-modal audio & code inputs
            </div>
          </div>

          <div className="p-8 rounded-[16px] bg-white border border-[#e2e2e2] flex flex-col justify-between space-y-6">
            <div>
              <span className="font-figmaMono text-xs text-[#595959]">STEP 02</span>
              <h3 className="text-2xl font-light text-black mt-3">Rubric Calibration</h3>
              <p className="text-sm text-[#595959] mt-2 leading-relaxed">
                Get scored across industry-grade rubric dimensions. Pinpoint architectural trade-off oversights, delivery structure flaws, and edge cases.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#fafafa] border border-[#e2e2e2] text-xs font-figmaMono text-[#595959]">
              → Instant dimensional breakdown & heatmaps
            </div>
          </div>

          <div className="p-8 rounded-[16px] bg-white border border-[#e2e2e2] flex flex-col justify-between space-y-6">
            <div>
              <span className="font-figmaMono text-xs text-[#595959]">STEP 03</span>
              <h3 className="text-2xl font-light text-black mt-3">Resume & Offer Alignment</h3>
              <p className="text-sm text-[#595959] mt-2 leading-relaxed">
                Seamlessly feed your interview evidence back into your ATS resume. Transform weak interview answers into validated accomplishment bullet points.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#fafafa] border border-[#e2e2e2] text-xs font-figmaMono text-[#595959]">
              → 99%+ ATS alignment for top roles
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CAPABILITIES & SUITE (6-Card Clean Matrix)
          ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 py-20 sm:py-28 space-y-12 border-t border-[#e2e2e2]/60">
        <div>
          <span className="font-figmaMono text-xs text-[#595959] uppercase tracking-[0.04em]">
            Capabilities
          </span>
          <h2 className="font-figmaSans font-[320] text-3xl sm:text-[56px] text-[#000000] tracking-[-0.84px] leading-[1.1] mt-2">
            Everything engineered for technical mastery.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                onClick={() => navigate(cap.link)}
                className="p-8 rounded-[16px] bg-white border border-[#e2e2e2] hover:border-black/40 transition-colors group cursor-pointer flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#fafafa] border border-[#e2e2e2] flex items-center justify-center text-black mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-medium text-black">{cap.title}</h3>
                  <p className="text-sm text-[#595959] mt-2 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs pt-4 border-t border-[#e2e2e2]">
                  <span className="font-figmaMono text-[#595959]">{cap.tag}</span>
                  <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          7. PRICING SECTION (Transparent, Museum-meets-Workspace)
          ========================================================================= */}
      <section id="pricing" className="max-w-[1200px] mx-auto px-6 sm:px-10 py-20 sm:py-28 space-y-12 border-t border-[#e2e2e2]/60">
        <div>
          <span className="font-figmaMono text-xs text-[#595959] uppercase tracking-[0.04em]">
            Pricing
          </span>
          <h2 className="font-figmaSans font-[320] text-3xl sm:text-[56px] text-[#000000] tracking-[-0.84px] leading-[1.1] mt-2">
            Transparent plans for engineers and teams.
          </h2>
          <p className="font-figmaSans text-lg text-[#595959] font-normal leading-[1.4] tracking-[-0.18px] max-w-[600px] mt-4">
            Start completely free. Upgrade when you are gearing up for high-stakes on-site loops.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter Plan */}
          <div className="p-8 rounded-[16px] bg-white border border-[#e2e2e2] flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="font-figmaMono text-xs text-[#595959]">STARTER</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-light text-black">$0</span>
                <span className="text-xs text-[#595959]">/ month</span>
              </div>
              <p className="text-xs text-[#595959] leading-relaxed">
                Essential calibration for students and candidates beginning interview preparation.
              </p>
              <ul className="space-y-2.5 text-xs text-black pt-4 border-t border-[#e2e2e2]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-black" />
                  <span>3 Full Mock Interviews / month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-black" />
                  <span>Automated Technical Rubric Score</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-black" />
                  <span>ATS Resume Score Analysis</span>
                </li>
              </ul>
            </div>
            <button
              onClick={handleStartPracticing}
              className="w-full bg-transparent text-black border border-black font-figmaSans font-normal text-sm rounded-lg py-2.5 hover:bg-black/5 transition-colors cursor-pointer"
            >
              Get started free
            </button>
          </div>

          {/* Pro Plan (Highlighted with Electric Indigo CTA) */}
          <div className="p-8 rounded-[16px] bg-white border-2 border-black flex flex-col justify-between space-y-8 relative">
            <div className="absolute -top-3 right-6 bg-[#000000] text-white text-[10px] font-figmaMono uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              Most Popular
            </div>
            <div className="space-y-4">
              <span className="font-figmaMono text-xs text-[#4d49fc]">PRO ENGINEER</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-light text-black">$29</span>
                <span className="text-xs text-[#595959]">/ month</span>
              </div>
              <p className="text-xs text-[#595959] leading-relaxed">
                Full-spectrum practice loops for engineers targeting Staff, Senior, or FAANG loops.
              </p>
              <ul className="space-y-2.5 text-xs text-black pt-4 border-t border-[#e2e2e2]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4d49fc]" />
                  <span>Unlimited Spoken & Coding Sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4d49fc]" />
                  <span>Deep Architectural Trade-off Breakdown</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4d49fc]" />
                  <span>Unlimited Tailored ATS Resume Exports</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4d49fc]" />
                  <span>Verifiable Milestone Certifications</span>
                </li>
              </ul>
            </div>
            {/* The single primary saturated button on the pricing row */}
            <button
              onClick={handleStartPracticing}
              className="w-full bg-[#4d49fc] text-white font-figmaSans font-[480] text-sm rounded-[50px] py-2.5 hover:bg-[#433ff0] transition-colors cursor-pointer"
            >
              Upgrade to Pro
            </button>
          </div>

          {/* Team / Campus Plan */}
          <div className="p-8 rounded-[16px] bg-white border border-[#e2e2e2] flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="font-figmaMono text-xs text-[#595959]">CAMPUS & TEAMS</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-light text-black">$99</span>
                <span className="text-xs text-[#595959]">/ seat / mo</span>
              </div>
              <p className="text-xs text-[#595959] leading-relaxed">
                For university career offices, bootcamps, and engineering hiring cohorts.
              </p>
              <ul className="space-y-2.5 text-xs text-black pt-4 border-t border-[#e2e2e2]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-black" />
                  <span>Centralized Cohort Dashboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-black" />
                  <span>Custom Company Rubric Builder</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-black" />
                  <span>Direct Recruiter Export Pipeline</span>
                </li>
              </ul>
            </div>
            <Link to="/contact">
              <button className="w-full bg-transparent text-black border border-black font-figmaSans font-normal text-sm rounded-lg py-2.5 hover:bg-black/5 transition-colors cursor-pointer">
                Contact Sales
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. FAQ SECTION (Minimalist & Crisp)
          ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 py-20 sm:py-28 space-y-8 border-t border-[#e2e2e2]/60">
        <div>
          <span className="font-figmaMono text-xs text-[#595959] uppercase tracking-[0.04em]">
            Frequently Asked Questions
          </span>
          <h2 className="font-figmaSans font-[320] text-3xl sm:text-[56px] text-[#000000] tracking-[-0.84px] leading-[1.1] mt-2">
            Clear answers to common questions.
          </h2>
        </div>

        <div className="divide-y divide-[#e2e2e2] border-t border-b border-[#e2e2e2] max-w-3xl">
          {[
            {
              q: 'How are HirePilot rubrics calibrated?',
              a: 'Our rubrics are modeled directly after evaluation scorecards utilized by Principal and Staff interviewers across Tier-1 tech companies, focusing on dimensional depth, scalability trade-offs, and edge case resilience rather than trivial syntax memorization.',
            },
            {
              q: 'Can I practice with live voice dialogue?',
              a: 'Yes. HirePilot includes a low-latency speech interface with dynamic audio waveforms, allowing natural back-and-forth conversation, interruption handling, and pacing assessment.',
            },
            {
              q: 'How does the ATS resume tool work?',
              a: 'The resume builder extracts the exact semantic keywords, architectural competencies, and scope indicators required by specific job postings, flagging missing concepts before submitting applications.',
            },
            {
              q: 'Is there a free tier available?',
              a: 'Yes, the Starter plan is completely free and includes 3 full mock interviews every month, automated scoring rubrics, and resume evaluation.',
            },
          ].map((item, idx) => (
            <div key={idx} className="py-6">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-medium text-lg text-black hover:opacity-75 transition-opacity"
              >
                <span>{item.q}</span>
                <span className="font-figmaMono text-sm text-[#595959]">
                  {activeFaq === idx ? '−' : '+'}
                </span>
              </button>
              {activeFaq === idx && (
                <p className="text-sm text-[#595959] leading-relaxed mt-3 max-w-2xl">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          9. FINAL CALL TO ACTION (The Quiet Stage)
          ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 py-24 sm:py-32 text-center space-y-8 border-t border-[#e2e2e2]/60">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="font-figmaSans font-[320] text-4xl sm:text-[64px] text-[#000000] tracking-[-1.44px] leading-[1.1]">
            Make anything possible.
          </h2>
          <p className="font-figmaSans text-lg text-[#595959] font-normal leading-[1.4] tracking-[-0.18px]">
            Master technical interviews with quiet authority. Join thousands of engineers practicing daily.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleStartPracticing}
            className="inline-flex items-center justify-center gap-2 bg-[#4d49fc] text-white font-figmaSans font-[480] text-base rounded-[50px] px-8 py-3.5 hover:bg-[#433ff0] transition-colors cursor-pointer"
          >
            <span>Start practicing for free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <Link to="/contact">
            <button className="inline-flex items-center justify-center font-figmaSans font-normal text-base text-black border border-black rounded-lg px-6 py-3.5 hover:bg-black/5 transition-colors cursor-pointer">
              Schedule team demo
            </button>
          </Link>
        </div>
      </section>

      {/* =========================================================================
          10. FOOTER (Quiet White Gallery Wall)
          ========================================================================= */}
      <footer className="border-t border-[#e2e2e2] py-14 px-6 sm:px-10 bg-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand mark */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-7 flex flex-col justify-between shrink-0">
                <div className="flex h-2.5 w-5">
                  <div className="w-2.5 h-2.5 rounded-l-full bg-[#ff7237]" />
                  <div className="w-2.5 h-2.5 rounded-r-full bg-[#ff7237]" />
                </div>
                <div className="flex h-2.5 w-5">
                  <div className="w-2.5 h-2.5 rounded-l-full bg-[#00b6ff]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#24cb71]" />
                </div>
                <div className="w-2.5 h-2.5 rounded-l-full rounded-br-full bg-[#000000]" />
              </div>
              <span className="font-figmaSans font-extrabold text-lg text-black">
                HirePilot
              </span>
            </div>
            <p className="text-xs text-[#595959] leading-relaxed max-w-sm">
              The precision technical assessment and career copilot platform. Designed as an achromatic gallery stage for engineers.
            </p>
          </div>

          {/* Links 1 */}
          <div className="space-y-3">
            <span className="font-figmaMono text-xs text-black font-medium">PRODUCT</span>
            <ul className="space-y-2 text-xs text-[#595959]">
              <li><button onClick={() => scrollToSection('studio')} className="hover:text-black">Interview Studio</button></li>
              <li><Link to="/resume" className="hover:text-black">ATS Resume Builder</Link></li>
              <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-black">Rubric Matrix</button></li>
              <li><Link to="/history" className="hover:text-black">Performance Reports</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-3">
            <span className="font-figmaMono text-xs text-black font-medium">RESOURCES</span>
            <ul className="space-y-2 text-xs text-[#595959]">
              <li><Link to="/design-system" className="hover:text-black">Figma Style Reference</Link></li>
              <li><button onClick={() => scrollToSection('tracks')} className="hover:text-black">Community Tracks</button></li>
              <li><Link to="/contact" className="hover:text-black">Support & Contact</Link></li>
              <li><a href="https://github.com/faishalxtechno/HirePilot" target="_blank" rel="noreferrer" className="hover:text-black">GitHub</a></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div className="space-y-3">
            <span className="font-figmaMono text-xs text-black font-medium">LEGAL</span>
            <ul className="space-y-2 text-xs text-[#595959]">
              <li><Link to="/privacy" className="hover:text-black">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-black">Terms of Service</Link></li>
              <li><span className="text-[#595959]">SOC2 Type II Ready</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto pt-8 border-t border-[#e2e2e2] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-figmaMono text-[#595959]">
          <span>© 2026 HirePilot Inc. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#24cb71]" />
              <span>Systems Operational</span>
            </span>
            <Link to="/design-system" className="text-black hover:underline">
              Style Reference
            </Link>
          </div>
        </div>
      </footer>

      {/* Interactive Quick Demo Modal */}
      <QuickDemoModal
        visible={demoModalOpen}
        onHide={() => setDemoModalOpen(false)}
      />
    </div>
  );
};

export default Landing;
