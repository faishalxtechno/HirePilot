import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface HeroSectionProps {
  onExploreClick?: () => void;
  onOpenDemo?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onOpenDemo }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartPracticing = () => {
    if (user) {
      navigate('/interview/setup');
    } else {
      navigate('/signup');
    }
  };

  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('features');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="home" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 lg:pt-44 pb-16 lg:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Hero Copy & Actions */}
        <div className="lg:col-span-6 flex flex-col items-start gap-5 sm:gap-6">
          {/* Glass Pill Announcement */}
          <div className="glass-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[#36D6FF] text-xs font-medium hover:border-white/25 transition-all shadow-sm animate-hero-badge">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#36D6FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#36D6FF] shadow-sm" />
            </span>
            <span className="tracking-wide">Your AI-Powered Career Copilot</span>
            <i className="pi pi-arrow-right text-[10px] text-[#9AA4B7]" />
          </div>

          {/* Main Headline */}
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.12] animate-hero-headline">
            Land Your{' '}
            <span className="bg-gradient-to-r from-[#c9beff] via-[#6eddff] to-[#69fcbe] bg-clip-text text-transparent drop-shadow-sm">
              Dream Job
            </span>
            .<br />
            One Interview at a Time.
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-[#9AA4B7] max-w-xl font-normal leading-relaxed animate-hero-desc">
            Practice real-world interviews, sharpen your resume, and turn your career goals into actionable results with your personal AI career copilot.
          </p>

          {/* Action CTAs with Apple Glass Depth */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto pt-1 animate-hero-cta">
            <button
              type="button"
              onClick={handleStartPracticing}
              className="relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-medium text-sm sm:text-base bg-gradient-to-b from-[#8367FF] to-[#6340F5] text-white border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_12px_24px_-6px_rgba(118,87,255,0.45)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
            >
              <i className="pi pi-bolt text-sm" />
              <span>Start Practicing Free</span>
            </button>

            <button
              type="button"
              onClick={handleExplore}
              className="glass-pill inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-medium text-sm sm:text-base text-white hover:bg-white/10 active:scale-[0.98] transition-all cursor-pointer"
            >
              <i className="pi pi-compass text-sm text-[#9AA4B7]" />
              <span>Explore Features</span>
            </button>

            {onOpenDemo && (
              <button
                type="button"
                onClick={onOpenDemo}
                className="glass-pill inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-medium text-xs sm:text-sm text-[#36D6FF] hover:bg-white/10 active:scale-[0.98] transition-all cursor-pointer"
              >
                <i className="pi pi-play text-xs" />
                <span>Interactive Demo</span>
              </button>
            )}
          </div>

          {/* Trust Subtext & Avatars */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
            <div className="flex -space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7657FF] to-[#36D6FF] flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-white/20 shadow-md">
                AK
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00c3eb] to-[#00865d] flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-white/20 shadow-md">
                SR
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f59e0b] to-[#ec4899] flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-white/20 shadow-md">
                MP
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md text-[#36D6FF] text-[10px] font-mono font-bold flex items-center justify-center ring-2 ring-white/20 shadow-inner">
                +4k
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-white uppercase tracking-wider font-semibold">
                Trusted by 4,000+ Job Seekers
              </span>
              <p className="text-[12px] text-[#9AA4B7]">
                Built for students, graduates, and ambitious engineers.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Apple Frosted Glass Cockpit Card */}
        <div className="lg:col-span-6 relative">
          <div className="glass-card-prominent rounded-3xl p-5 sm:p-7 flex flex-col gap-4 relative overflow-hidden">
            {/* Top Specular Sheen Effect */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

            {/* Cockpit Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* iOS Traffic Lights */}
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] border border-black/20 shadow-sm" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] border border-black/20 shadow-sm" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] border border-black/20 shadow-sm" />
                </div>
                <div className="h-3.5 w-px bg-white/10 mx-0.5" />
                <span className="px-2 py-0.5 rounded-full glass-pill text-white font-mono text-[11px]">
                  SESSION #4829
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#7657FF]/25 border border-[#7657FF]/40 text-[#c9beff] text-[11px] font-medium flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7657FF] animate-ping" />
                  Live L4 Systems Engineer
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#9AA4B7] font-mono text-xs glass-pill px-2.5 py-0.5 rounded-full">
                <i className="pi pi-clock text-[#36D399] text-[11px]" />
                <span>18:24</span>
              </div>
            </div>

            {/* Question Glass Box */}
            <div className="glass-card rounded-2xl p-4 sm:p-5 space-y-2 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#36D6FF] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <i className="pi pi-sparkles text-[11px]" /> AI Interviewer
                </span>
                <span className="font-mono text-xs text-[#9AA4B7]">Question 4 of 6</span>
              </div>
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                “Explain the trade-offs between SQL and NoSQL databases for large-scale transaction processing, and how you would architect eventual consistency under partitioned network conditions.”
              </p>
            </div>

            {/* Voice Activity Spectrum + Realtime Stream Indicator */}
            <div className="glass-inset p-3.5 sm:p-4 rounded-2xl flex items-center justify-between gap-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#7657FF] to-[#5e3be7] flex items-center justify-center text-white shadow-md border border-white/20 shrink-0">
                  <i className="pi pi-microphone text-xs" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Candidate Voice Feed</div>
                  <div className="font-mono text-[11px] text-[#36D399]">Transcribing (Low Latency 12ms)</div>
                </div>
              </div>

              {/* Simulated Tactile Waveform Bars */}
              <div className="flex items-center gap-1 h-7 px-3 py-1 bg-white/[0.04] rounded-full border border-white/[0.08]">
                <span className="w-1 bg-[#36D6FF] rounded-full h-2 animate-pulse" />
                <span className="w-1 bg-[#36D6FF] rounded-full h-4" />
                <span className="w-1 bg-[#7657FF] rounded-full h-6 animate-pulse" />
                <span className="w-1 bg-[#c9beff] rounded-full h-3" />
                <span className="w-1 bg-[#36D6FF] rounded-full h-5 animate-pulse" />
                <span className="w-1 bg-[#36D399] rounded-full h-2" />
                <span className="w-1 bg-[#7657FF] rounded-full h-4 animate-pulse" />
              </div>
            </div>

            {/* Real-time Score Breakdown Bento Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="glass-card p-3 rounded-2xl flex flex-col hover:border-white/20 transition-all">
                <span className="text-[10px] uppercase font-semibold text-[#9AA4B7]">Overall Match</span>
                <span className="text-xl sm:text-2xl text-[#36D399] font-bold mt-1 font-mono">
                  94<span className="text-xs text-[#9AA4B7] font-normal">/100</span>
                </span>
                <span className="text-[10px] text-[#47dfa4] mt-auto flex items-center gap-0.5 pt-1">
                  <i className="pi pi-arrow-up text-[8px]" />+6% benchmark
                </span>
              </div>

              <div className="glass-card p-3 rounded-2xl flex flex-col hover:border-white/20 transition-all">
                <span className="text-[10px] uppercase font-semibold text-[#9AA4B7]">Communication</span>
                <span className="text-xl sm:text-2xl text-white font-bold mt-1 font-mono">
                  92<span className="text-xs text-[#9AA4B7] font-normal">%</span>
                </span>
                <span className="text-[10px] text-[#9AA4B7] mt-auto pt-1">Clarity & Pacing</span>
              </div>

              <div className="glass-card p-3 rounded-2xl flex flex-col hover:border-white/20 transition-all">
                <span className="text-[10px] uppercase font-semibold text-[#9AA4B7]">Tech Depth</span>
                <span className="text-xl sm:text-2xl text-[#36D6FF] font-bold mt-1 font-mono">
                  96<span className="text-xs text-[#9AA4B7] font-normal">%</span>
                </span>
                <span className="text-[10px] text-[#6eddff] mt-auto pt-1">High precision</span>
              </div>

              <div className="glass-card p-3 rounded-2xl flex flex-col hover:border-white/20 transition-all">
                <span className="text-[10px] uppercase font-semibold text-[#9AA4B7]">ATS Match</span>
                <span className="text-xl sm:text-2xl text-[#c9beff] font-bold mt-1 font-mono">
                  88<span className="text-xs text-[#9AA4B7] font-normal">%</span>
                </span>
                <span className="text-[10px] text-[#9AA4B7] mt-auto pt-1">Keywords synced</span>
              </div>
            </div>

            {/* Inset Performance Trend Visualizer */}
            <div className="glass-inset p-3.5 sm:p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#9AA4B7] uppercase tracking-wider block font-semibold">
                  Career Readiness Trend
                </span>
                <span className="text-sm font-medium text-white">Top 3.8% of Candidates</span>
              </div>
              <div className="w-32 h-9">
                <svg className="w-full h-full stroke-current text-[#36D399] fill-none" viewBox="0 0 128 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 35 Q 20 30, 40 22 T 80 18 T 110 8 L 128 4" strokeLinecap="round" strokeWidth="2.5" />
                  <path d="M 0 35 Q 20 30, 40 22 T 80 18 T 110 8 L 128 4 L 128 40 L 0 40 Z" fill="currentColor" fillOpacity="0.12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof & Metric Metadata Strip */}
      <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="glass-card glass-card-interactive p-5 sm:p-6 rounded-3xl flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[#9AA4B7]">
            <span className="text-xs uppercase tracking-wider font-semibold">AI Mock Interviews</span>
            <div className="w-8 h-8 rounded-full bg-[#7657FF]/10 border border-[#7657FF]/20 flex items-center justify-center text-[#c9beff]">
              <i className="pi pi-microphone text-xs" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl text-white font-bold tracking-tight font-mono">120,000+</div>
          <p className="text-xs text-[#9AA4B7]">Sessions Simulated • Real-time AI Critique</p>
        </div>

        <div className="glass-card glass-card-interactive p-5 sm:p-6 rounded-3xl flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[#9AA4B7]">
            <span className="text-xs uppercase tracking-wider font-semibold">Personalized Feedback</span>
            <div className="w-8 h-8 rounded-full bg-[#36D6FF]/10 border border-[#36D6FF]/20 flex items-center justify-center text-[#36D6FF]">
              <i className="pi pi-bolt text-xs" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl text-white font-bold tracking-tight font-mono">&lt;15s</div>
          <p className="text-xs text-[#9AA4B7]">Instant Rubric & Tone Generation Speed</p>
        </div>

        <div className="glass-card glass-card-interactive p-5 sm:p-6 rounded-3xl flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[#9AA4B7]">
            <span className="text-xs uppercase tracking-wider font-semibold">Resume Optimization</span>
            <div className="w-8 h-8 rounded-full bg-[#36D399]/10 border border-[#36D399]/20 flex items-center justify-center text-[#36D399]">
              <i className="pi pi-check-circle text-xs" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl text-white font-bold tracking-tight font-mono">99%</div>
          <p className="text-xs text-[#9AA4B7]">ATS Parsability & Keyword Match Rate</p>
        </div>

        <div className="glass-card glass-card-interactive p-5 sm:p-6 rounded-3xl flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[#9AA4B7]">
            <span className="text-xs uppercase tracking-wider font-semibold">Career Tracks</span>
            <div className="w-8 h-8 rounded-full bg-[#c9beff]/10 border border-[#c9beff]/20 flex items-center justify-center text-[#c9beff]">
              <i className="pi pi-briefcase text-xs" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl text-white font-bold tracking-tight font-mono">45+</div>
          <p className="text-xs text-[#9AA4B7]">Engineering, Product, & Design Tracks</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
