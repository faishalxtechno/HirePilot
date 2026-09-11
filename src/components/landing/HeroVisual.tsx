import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, CheckCircle2, Cpu, ArrowUpRight, ShieldCheck, Zap, Layers, Award } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeCandidate, setActiveCandidate] = useState<number>(0);

  const candidates = [
    {
      name: 'Sarah Jenkins',
      role: 'Staff Full-Stack Engineer',
      match: 98,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      tags: ['React 19', 'TypeScript', 'Distributed Systems'],
      experience: '7+ yrs exp',
      status: 'Top 1% Candidate',
    },
    {
      name: 'David Zhao',
      role: 'Lead AI / ML Systems Engineer',
      match: 95,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      tags: ['LLM Orchestration', 'PyTorch', 'Vector Search'],
      experience: '6+ yrs exp',
      status: 'Fast-track Interview',
    },
    {
      name: 'Elena Rostova',
      role: 'Principal Cloud Architect',
      match: 93,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      tags: ['Kubernetes', 'GCP / AWS', 'Terraform'],
      experience: '8+ yrs exp',
      status: 'Culture Champion',
    }
  ];

  // Rotate active candidate highlighted every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCandidate((prev) => (prev + 1) % candidates.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [candidates.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-5xl mx-auto mt-12 lg:mt-16 px-4 py-8 perspective-1000 select-none"
    >
      {/* Background Neural Grid & Atmospheric Glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[350px] bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-violet-500/10 blur-[100px] rounded-full" />
      </div>

      {/* Main Perspective Container */}
      <div
        style={{
          transform: `perspective(1200px) rotateX(${-mousePos.y * 0.4}deg) rotateY(${mousePos.x * 0.4}deg)`,
          transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
        }}
        className="relative w-full rounded-3xl border border-white/[0.09] bg-gradient-to-b from-[#0e0e14]/90 to-[#060608]/95 p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden"
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        {/* Top Control Bar Mockup */}
        <div className="flex flex-wrap items-center justify-between pb-6 border-b border-white/[0.06] gap-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
            <div className="h-4 w-[1px] bg-white/10 mx-1" />
            <span className="text-xs uppercase tracking-widest font-mono text-white/50 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              AI Matching Engine v4.2 &bull; Active Analysis
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-white/60">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Latency: 140ms</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
              <Zap className="w-3.5 h-3.5" />
              <span>Semantic Fit: 98.4%</span>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
          
          {/* Left: Role Specification Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/20">
                  Target Role
                </span>
                <span className="text-xs text-white/40 font-mono">ID: REQ-4092</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Staff / Principal Engineer</h3>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                Building multi-agent distributed systems with high-concurrency event-driven architecture.
              </p>

              <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-2">
                <div className="flex justify-between text-xs text-white/70">
                  <span>Talent Pool Screened</span>
                  <span className="font-mono text-white font-semibold">1,248 profiles</span>
                </div>
                <div className="flex justify-between text-xs text-white/70">
                  <span>AI Shortlist Selected</span>
                  <span className="font-mono text-emerald-400 font-semibold">3 candidates</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full w-[94%] rounded-full animate-pulse" />
                </div>
              </div>
            </div>

            {/* AI Reasoning Summary Chip */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 text-xs flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white/90">Autonomous Copilot Synthesis:</span>
                <p className="text-white/60 text-[11px] mt-0.5">
                  Filtered out 99.2% irrelevant resumes. Candidates ranked below have verified experience in high-throughput node topologies.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Ranked Candidate Stream */}
          <div className="lg:col-span-7 space-y-3">
            {candidates.map((candidate, idx) => {
              const isSelected = activeCandidate === idx;
              return (
                <div
                  key={candidate.name}
                  onClick={() => setActiveCandidate(idx)}
                  className={`relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white/[0.08] border-cyan-400/40 shadow-[0_10px_30px_rgba(6,182,212,0.12)] -translate-y-1'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative">
                        <img
                          src={candidate.avatar}
                          alt={candidate.name}
                          className="w-11 h-11 rounded-full object-cover ring-2 ring-white/10"
                        />
                        {isSelected && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-black">
                            <CheckCircle2 className="w-3 h-3 text-black" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm sm:text-base font-semibold text-white">
                            {candidate.name}
                          </h4>
                          <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                            {candidate.status}
                          </span>
                        </div>
                        <p className="text-xs text-white/50">{candidate.role} &bull; {candidate.experience}</p>
                      </div>
                    </div>

                    {/* Match Score Gauge */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-xs text-white/40 uppercase font-mono tracking-wider">Fit Score</div>
                        <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400">
                          {candidate.match}%
                        </div>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/60 group-hover:text-white">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.04]">
                    {candidate.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.04] text-white/70 border border-white/[0.05]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Live bottom indicator status */}
        <div className="mt-8 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between text-xs text-white/40 font-mono gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
            <span>AI Automated Pipeline: Ready for Interview Schedule</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Accuracy: 99.1%</span>
            <span>Bias Audited: Passed</span>
          </div>
        </div>

      </div>
    </div>
  );
};
