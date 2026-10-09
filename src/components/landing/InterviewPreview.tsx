import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom';

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
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#8750FF] text-xs font-mono font-semibold tracking-wide uppercase mb-3">
            <i className="pi pi-desktop text-xs" />
            <span>Interactive Practice Studio</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed for Real Interview Simulation
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Experience our adaptive workspace with live audio analysis, dynamic questioning, and immediate rubric evaluations.
          </p>
        </div>

        {/* Ambient Glowing Rim behind Preview */}
        <div className="relative">
          <div className="absolute -inset-2 sm:-inset-4 rounded-[36px] bg-gradient-to-r from-[#8750FF]/15 via-purple-300/10 to-[#38BDF8]/15 blur-2xl -z-10" />

          {/* Main Product Container */}
          <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-[0_25px_70px_rgba(135,80,255,0.08)] overflow-hidden">
            
            {/* Top Workspace Header Bar */}
            <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-50/90 border-b border-slate-200/80 gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                </div>
                <div className="h-4 w-px bg-slate-300 mx-1 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-mono font-semibold text-slate-700 tracking-wider uppercase">
                    AI Session Active
                  </span>
                </div>
              </div>

              {/* Center: Live Timer & Question Counter */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-mono text-slate-700">
                  <i className="pi pi-clock text-[#8750FF] text-xs" />
                  <span>Duration: <strong className="text-slate-900">{formatTime(timerSeconds)}</strong></span>
                </div>
                <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#8750FF] text-xs font-semibold">
                  <span>Question 02 of 05</span>
                </div>
              </div>

              {/* Right: Exit Interview Control */}
              <div className="flex items-center gap-2">
                <Button
                  label="Exit Interview"
                  icon="pi pi-sign-out"
                  onClick={() => navigate('/dashboard')}
                  className="p-button-text p-button-sm !text-slate-500 hover:!text-rose-600 hover:!bg-rose-50 !rounded-full !text-xs !py-1.5 !px-3"
                />
              </div>
            </div>

            {/* Workspace Interior Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
              
              {/* Left Column (7 Cols): Interview Video & Candidate Feed */}
              <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between space-y-5 bg-gradient-to-b from-white to-slate-50/50">
                
                {/* Interviewer Preview Panel (AI Persona) */}
                <div className="rounded-2xl p-4 bg-slate-900 text-white shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#8750FF]/20 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#8750FF] flex items-center justify-center text-white shadow-inner">
                        <i className="pi pi-microchip-ai text-lg font-bold" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white tracking-tight">HirePilot AI Interviewer</h4>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <p className="text-[11px] font-mono text-slate-300">Google Gemini Pro Evaluation Engine</p>
                      </div>
                    </div>

                    {/* Speech Waveform Simulation */}
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/10">
                      <i className="pi pi-volume-up text-xs text-purple-300 mr-1" />
                      <div className="flex items-center gap-0.5 h-3.5">
                        <span className="w-1 bg-[#8750FF] rounded-full animate-pulse h-2" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 bg-purple-300 rounded-full animate-pulse h-3.5" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 bg-[#8750FF] rounded-full animate-pulse h-1.5" style={{ animationDelay: '300ms' }} />
                        <span className="w-1 bg-purple-300 rounded-full animate-pulse h-3" style={{ animationDelay: '450ms' }} />
                        <span className="w-1 bg-[#8750FF] rounded-full animate-pulse h-2" style={{ animationDelay: '200ms' }} />
                      </div>
                    </div>
                  </div>

                  {/* Interview Question Card */}
                  <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-inner space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-bold bg-[#8750FF]/25 px-2 py-0.5 rounded">
                        Distributed Systems • Senior Level
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">Weight: 25 pts</span>
                    </div>
                    <p className="text-sm sm:text-base font-medium text-slate-100 leading-snug">
                      &ldquo;How would you design a distributed rate limiter for a multi-region API gateway, and handle state replication during network partitions?&rdquo;
                    </p>
                  </div>
                </div>

                {/* Candidate Video Preview & Voice Status */}
                <div className="rounded-2xl p-4 bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                        AM
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">Alex Morgan (Candidate)</div>
                        <div className="text-[11px] text-slate-500">Track: Full Stack / Systems Track</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                        <i className="pi pi-check-circle text-[10px]" />
                        <span>Audio 99% clear</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Speech Activity Bar */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
                      <span className="flex items-center gap-1.5 font-medium">
                        <i className={`pi pi-microphone ${isAnswering ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`} />
                        <span>{isAnswering ? 'Transcribing live answer...' : 'Microphone ready'}</span>
                      </span>
                      <span className="font-mono text-[11px] text-slate-500">{isAnswering ? `${micLevel} dB` : 'Ready'}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#8750FF] to-purple-400 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: isAnswering ? `${micLevel}%` : '20%' }}
                      />
                    </div>
                  </div>

                  {/* Action Controls Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2">
                      <Button
                        label={isAnswering ? 'Stop & Submit Answer' : 'Start Answer'}
                        icon={isAnswering ? 'pi pi-stop-circle' : 'pi pi-play'}
                        onClick={() => setIsAnswering(!isAnswering)}
                        className={`!rounded-full !text-xs !font-bold !py-2.5 !px-5 transition-all ${
                          isAnswering
                            ? '!bg-rose-600 !border-rose-600 !text-white hover:!bg-rose-700 animate-pulse'
                            : '!bg-[#8750FF] !border-[#8750FF] !text-white hover:!bg-[#723DE8]'
                        }`}
                      />

                      {onTestDemo && (
                        <button
                          type="button"
                          onClick={onTestDemo}
                          className="px-3.5 py-2 rounded-full text-xs font-semibold text-[#8750FF] bg-purple-50 hover:bg-purple-100 transition-colors"
                        >
                          <i className="pi pi-bolt mr-1" />
                          Simulate AI Result
                        </button>
                      )}
                    </div>

                    <div className="text-[11px] font-mono text-slate-400">
                      Keyboard: <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border text-slate-600">Space</kbd> to record
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column (5 Cols): Real-time Evaluation Criteria Control */}
              <div className="lg:col-span-5 p-4 sm:p-6 bg-slate-50/70 flex flex-col justify-between space-y-5">
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Evaluation Criteria</h4>
                      <p className="text-xs text-slate-500">Live multi-rubric assessment engine</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-purple-100 text-[#8750FF] text-xs font-mono font-bold">
                      Avg: 92/100
                    </span>
                  </div>

                  {/* Criteria Tabs */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setActiveCriteria('depth')}
                      className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all ${
                        activeCriteria === 'depth'
                          ? 'bg-white border-[#8750FF] shadow-sm text-[#8750FF]'
                          : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <div className="text-[11px] opacity-75 font-mono">01. Tech Depth</div>
                      <div className="font-bold text-slate-900 mt-0.5">94% Score</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveCriteria('tradeoffs')}
                      className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all ${
                        activeCriteria === 'tradeoffs'
                          ? 'bg-white border-[#8750FF] shadow-sm text-[#8750FF]'
                          : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <div className="text-[11px] opacity-75 font-mono">02. Trade-offs</div>
                      <div className="font-bold text-slate-900 mt-0.5">88% Score</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveCriteria('clarity')}
                      className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all ${
                        activeCriteria === 'clarity'
                          ? 'bg-white border-[#8750FF] shadow-sm text-[#8750FF]'
                          : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <div className="text-[11px] opacity-75 font-mono">03. Clarity</div>
                      <div className="font-bold text-slate-900 mt-0.5">91% Score</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveCriteria('edgecases')}
                      className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all ${
                        activeCriteria === 'edgecases'
                          ? 'bg-white border-[#8750FF] shadow-sm text-[#8750FF]'
                          : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <div className="text-[11px] opacity-75 font-mono">04. Edge Cases</div>
                      <div className="font-bold text-slate-900 mt-0.5">86% Score</div>
                    </button>
                  </div>

                  {/* Active Criteria Card Detail */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        {criteriaData[activeCriteria].title}
                      </span>
                      <Tag
                        value={criteriaData[activeCriteria].badge}
                        className="!bg-emerald-50 !text-emerald-700 !border-emerald-200 !text-[10px] !px-2 !py-0.5 font-semibold"
                      />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {criteriaData[activeCriteria].summary}
                    </p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>Rubric Weight: 25%</span>
                      <span className="text-[#8750FF] font-semibold">Gemini Certified</span>
                    </div>
                  </div>
                </div>

                {/* Candidate Info & Session Diagnostics */}
                <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs text-slate-700 space-y-2">
                  <div className="flex items-center justify-between font-semibold text-slate-800">
                    <span className="flex items-center gap-1.5 text-[#8750FF]">
                      <i className="pi pi-sparkles text-xs" />
                      <span>HirePilot Smart Diagnostic</span>
                    </span>
                    <span className="text-[11px] font-mono text-purple-700">Live</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="p-2 rounded-lg bg-white/80 border border-purple-100/80">
                      <div className="text-slate-400 font-mono">Speech Rate</div>
                      <div className="font-bold text-slate-800 mt-0.5">138 WPM (Optimal)</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/80 border border-purple-100/80">
                      <div className="text-slate-400 font-mono">Filler Words</div>
                      <div className="font-bold text-emerald-700 mt-0.5">1.2% (Low)</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default InterviewPreview;
