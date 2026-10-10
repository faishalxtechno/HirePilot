import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom';

import { ScrollReveal } from '../ui/ScrollReveal';

interface InterviewPreviewProps {
  onTestDemo?: () => void;
}

export const InterviewPreview: React.FC<InterviewPreviewProps> = ({ onTestDemo }) => {
  const navigate = useNavigate();
  const [isAnswering, setIsAnswering] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(255); // 04:15
  const [activeCriteria, setActiveCriteria] = useState<'depth' | 'tradeoffs' | 'clarity' | 'edgecases'>('depth');
  const [micLevel, setMicLevel] = useState(60);

  // Live timer effect when answering
  useEffect(() => {
    let interval: any;
    if (isAnswering) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
        setMicLevel(Math.floor(40 + Math.random() * 50));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnswering]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const criteriaData = {
    depth: {
      title: 'Technical Depth & Architecture',
      score: '94%',
      badge: 'Exceptional',
      summary: 'Accurately articulated Token Bucket vs. Leaky Bucket algorithms with distributed Redis state synchronization.',
    },
    tradeoffs: {
      title: 'Trade-off & Scalability Analysis',
      score: '88%',
      badge: 'Strong',
      summary: 'Effectively weighed centralized cache bottlenecks against memory footprints in edge gateways.',
    },
    clarity: {
      title: 'Communication & Structuring',
      score: '91%',
      badge: 'High Impact',
      summary: 'Clear top-down methodology with logical modularization and structured bullet points.',
    },
    edgecases: {
      title: 'Edge Case & Fault Tolerance',
      score: '86%',
      badge: 'Verified',
      summary: 'Addressed clock drift across regions and graceful degradation during cache outages.',
    },
  };

  return (
    <section id="product" className="relative w-full pt-4 sm:pt-6 pb-16 sm:pb-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="glass-pill inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[#36D6FF] text-xs font-mono font-semibold tracking-wide uppercase mb-3 border border-white/10">
            <i className="pi pi-desktop text-xs" />
            <span>Interactive Practice Studio</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed for Real Interview Simulation
          </h2>
          <p className="mt-2 text-[#9AA4B7] text-sm sm:text-base">
            Experience our adaptive workspace with live audio analysis, dynamic questioning, and immediate rubric evaluations.
          </p>
        </ScrollReveal>

        {/* Ambient Glowing Rim behind Preview */}
        <ScrollReveal delayMs={100} className="relative">
          <div className="absolute -inset-2 sm:-inset-4 rounded-[36px] bg-gradient-to-r from-[#7657FF]/20 via-[#36D6FF]/15 to-[#36D399]/15 blur-2xl -z-10" />

          {/* Main Product Container */}
          <div className="glass-card-prominent rounded-2xl sm:rounded-3xl border border-white/15 overflow-hidden">
            
            {/* Top Workspace Header Bar */}
            <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 bg-black/40 border-b border-white/[0.08] gap-3 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] inline-block shadow-sm" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] inline-block shadow-sm" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] inline-block shadow-sm" />
                </div>
                <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#36D399] animate-ping" />
                  <span className="text-xs font-mono font-semibold text-white tracking-wider uppercase">
                    AI Session Active
                  </span>
                </div>
              </div>

              {/* Center: Live Timer & Question Counter */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill border border-white/10 text-xs font-mono text-white">
                  <i className="pi pi-clock text-[#36D6FF] text-xs" />
                  <span>Duration: <strong className="text-white">{formatTime(timerSeconds)}</strong></span>
                </div>
                <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7657FF]/20 text-[#c9beff] border border-[#7657FF]/30 text-xs font-semibold">
                  <span>Question 02 of 05</span>
                </div>
              </div>

              {/* Right: Exit Interview Control */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="glass-pill px-3 py-1 rounded-full text-xs text-[#9AA4B7] hover:text-[#ffb4ab] hover:bg-rose-500/10 border border-white/10 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <i className="pi pi-sign-out text-xs" />
                  <span>Exit Session</span>
                </button>
              </div>
            </div>

            {/* Workspace Interior Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
              
              {/* Left Column (7 Cols): Interview Video & Candidate Feed */}
              <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between space-y-5 bg-[#0D1220]/70">
                
                {/* Interviewer Preview Panel (AI Persona) */}
                <div className="rounded-2xl p-4 sm:p-5 glass-card text-white relative overflow-hidden border border-white/10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#7657FF]/15 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between mb-3.5 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#7657FF] to-[#5e3be7] flex items-center justify-center text-white shadow-md border border-white/20">
                        <i className="pi pi-microchip-ai text-lg font-bold" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white tracking-tight">HirePilot AI Interviewer</h4>
                          <span className="w-2 h-2 rounded-full bg-[#36D399] animate-pulse" />
                        </div>
                        <p className="text-[11px] font-mono text-[#9AA4B7]">Google Gemini Pro Evaluation Engine</p>
                      </div>
                    </div>

                    {/* Speech Waveform Simulation */}
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/15">
                      <i className="pi pi-volume-up text-xs text-[#36D6FF] mr-1" />
                      <div className="flex items-center gap-0.5 h-3.5">
                        <span className="w-1 bg-[#7657FF] rounded-full animate-pulse h-2" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 bg-[#36D6FF] rounded-full animate-pulse h-3.5" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 bg-[#7657FF] rounded-full animate-pulse h-1.5" style={{ animationDelay: '300ms' }} />
                        <span className="w-1 bg-[#36D399] rounded-full animate-pulse h-3" style={{ animationDelay: '450ms' }} />
                        <span className="w-1 bg-[#7657FF] rounded-full animate-pulse h-2" style={{ animationDelay: '200ms' }} />
                      </div>
                    </div>
                  </div>

                  {/* Interview Question Card */}
                  <div className="p-4 rounded-xl glass-inset border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#36D6FF] font-bold bg-[#36D6FF]/15 px-2 py-0.5 rounded border border-[#36D6FF]/25">
                        Distributed Systems • Senior Level
                      </span>
                      <span className="text-[11px] text-[#9AA4B7] font-mono">Weight: 25 pts</span>
                    </div>
                    <p className="text-sm sm:text-base font-medium text-white leading-snug">
                      &ldquo;How would you design a distributed rate limiter for a multi-region API gateway, and handle state replication during network partitions?&rdquo;
                    </p>
                  </div>
                </div>

                {/* Candidate Video Preview & Voice Status */}
                <div className="rounded-2xl p-4 sm:p-5 glass-card border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7657FF] to-[#36D6FF] flex items-center justify-center text-white text-xs font-bold ring-1 ring-white/20">
                        AM
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Alex Morgan (Candidate)</div>
                        <div className="text-[11px] text-[#9AA4B7]">Track: Full Stack / Systems Track</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#36D399]/15 text-[#36D399] text-[11px] font-semibold border border-[#36D399]/25">
                        <i className="pi pi-check-circle text-[10px]" />
                        <span>Audio 99% clear</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Speech Activity Bar */}
                  <div className="p-3.5 rounded-xl glass-inset border border-white/5">
                    <div className="flex items-center justify-between text-xs text-[#9AA4B7] mb-1.5">
                      <span className="flex items-center gap-1.5 font-medium text-white">
                        <i className={`pi pi-microphone ${isAnswering ? 'text-rose-400 animate-pulse' : 'text-[#36D6FF]'}`} />
                        <span>{isAnswering ? 'Transcribing live answer...' : 'Microphone ready'}</span>
                      </span>
                      <span className="font-mono text-[11px] text-[#36D399]">{isAnswering ? `${micLevel} dB` : 'Ready'}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#7657FF] via-[#36D6FF] to-[#36D399] h-1.5 rounded-full transition-all duration-300"
                        style={{ width: isAnswering ? `${micLevel}%` : '20%' }}
                      />
                    </div>
                  </div>

                  {/* Action Controls Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setIsAnswering(!isAnswering)}
                        className={`rounded-full text-xs font-bold py-2.5 px-5 transition-all flex items-center gap-1.5 cursor-pointer ${
                          isAnswering
                            ? 'bg-rose-600 text-white hover:bg-rose-700 animate-pulse shadow-[0_0_15px_rgba(225,29,72,0.5)]'
                            : 'bg-gradient-to-b from-[#8367FF] to-[#6340F5] text-white hover:brightness-110 shadow-md border border-white/20'
                        }`}
                      >
                        <i className={isAnswering ? 'pi pi-stop-circle' : 'pi pi-play'} />
                        <span>{isAnswering ? 'Stop & Submit Answer' : 'Start Answer'}</span>
                      </button>

                      {onTestDemo && (
                        <button
                          type="button"
                          onClick={onTestDemo}
                          className="glass-pill px-3.5 py-2 rounded-full text-xs font-semibold text-[#36D6FF] hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <i className="pi pi-bolt text-xs" />
                          <span>Simulate AI Result</span>
                        </button>
                      )}
                    </div>

                    <div className="text-[11px] font-mono text-[#9AA4B7]">
                      Keyboard: <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-white">Space</kbd> to record
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column (5 Cols): Real-time Evaluation Criteria Control */}
              <div className="lg:col-span-5 p-4 sm:p-6 bg-[#080B14]/80 flex flex-col justify-between space-y-5">
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">Evaluation Criteria</h4>
                      <p className="text-xs text-[#9AA4B7]">Live multi-rubric assessment engine</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full glass-pill text-[#36D399] border border-[#36D399]/30 text-xs font-mono font-bold">
                      Avg: 92/100
                    </span>
                  </div>

                  {/* Criteria Tabs */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setActiveCriteria('depth')}
                      className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                        activeCriteria === 'depth'
                          ? 'glass-card-prominent border-[#7657FF] text-white shadow-md'
                          : 'glass-card border-white/5 text-[#9AA4B7] hover:border-white/15'
                      }`}
                    >
                      <div className="text-[11px] opacity-75 font-mono">01. Tech Depth</div>
                      <div className="font-bold text-white mt-0.5">94% Score</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveCriteria('tradeoffs')}
                      className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                        activeCriteria === 'tradeoffs'
                          ? 'glass-card-prominent border-[#7657FF] text-white shadow-md'
                          : 'glass-card border-white/5 text-[#9AA4B7] hover:border-white/15'
                      }`}
                    >
                      <div className="text-[11px] opacity-75 font-mono">02. Trade-offs</div>
                      <div className="font-bold text-white mt-0.5">88% Score</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveCriteria('clarity')}
                      className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                        activeCriteria === 'clarity'
                          ? 'glass-card-prominent border-[#7657FF] text-white shadow-md'
                          : 'glass-card border-white/5 text-[#9AA4B7] hover:border-white/15'
                      }`}
                    >
                      <div className="text-[11px] opacity-75 font-mono">03. Clarity</div>
                      <div className="font-bold text-white mt-0.5">91% Score</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveCriteria('edgecases')}
                      className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                        activeCriteria === 'edgecases'
                          ? 'glass-card-prominent border-[#7657FF] text-white shadow-md'
                          : 'glass-card border-white/5 text-[#9AA4B7] hover:border-white/15'
                      }`}
                    >
                      <div className="text-[11px] opacity-75 font-mono">04. Edge Cases</div>
                      <div className="font-bold text-white mt-0.5">86% Score</div>
                    </button>
                  </div>

                  {/* Active Criteria Card Detail */}
                  <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        {criteriaData[activeCriteria].title}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#36D399]/20 text-[#36D399] border border-[#36D399]/30 text-[10px] font-semibold">
                        {criteriaData[activeCriteria].badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#9AA4B7] leading-relaxed">
                      {criteriaData[activeCriteria].summary}
                    </p>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#9AA4B7] font-mono">
                      <span>Rubric Weight: 25%</span>
                      <span className="text-[#c9beff] font-semibold">Gemini Certified</span>
                    </div>
                  </div>
                </div>

                {/* Candidate Info & Session Diagnostics */}
                <div className="p-3.5 rounded-2xl glass-inset border border-white/5 text-xs text-[#9AA4B7] space-y-2">
                  <div className="flex items-center justify-between font-semibold text-white">
                    <span className="flex items-center gap-1.5 text-[#36D6FF]">
                      <i className="pi pi-sparkles text-xs" />
                      <span>HirePilot Smart Diagnostic</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#36D399]">Live</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="p-2 rounded-lg glass-panel-subtle border border-white/5">
                      <div className="text-[#9AA4B7] font-mono">Speech Rate</div>
                      <div className="font-bold text-white mt-0.5">138 WPM (Optimal)</div>
                    </div>
                    <div className="p-2 rounded-lg glass-panel-subtle border border-white/5">
                      <div className="text-[#9AA4B7] font-mono">Filler Words</div>
                      <div className="font-bold text-[#36D399] mt-0.5">1.2% (Low)</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default InterviewPreview;
