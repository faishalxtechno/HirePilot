import React, { useState } from 'react';
import { Bot, Volume2, Sparkles, Brain, History } from 'lucide-react';
import { Question } from '../../types';

export const QuestionCard: React.FC<{ question: Question }> = ({ question }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<'1.0x' | '1.25x' | '1.5x'>('1.0x');

  const toggleAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(question.question_text);
        const rate = audioSpeed === '1.0x' ? 1.0 : audioSpeed === '1.25x' ? 1.25 : 1.5;
        utterance.rate = rate;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    } else {
      setIsPlayingAudio(!isPlayingAudio);
    }
  };

  const cycleSpeed = () => {
    if (audioSpeed === '1.0x') setAudioSpeed('1.25x');
    else if (audioSpeed === '1.25x') setAudioSpeed('1.5x');
    else setAudioSpeed('1.0x');
  };

  return (
    <div className="flex flex-col gap-5 text-slate-100">
      
      {/* AI Persona & Visual Audio Stream Node */}
      <div className="relative glass-panel rounded-3xl p-5 sm:p-6 overflow-hidden group border border-white/10 shadow-2xl">
        {/* Specular Accent Light Reflection */}
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-gradient-to-br from-purple-600/30 to-cyan-500/20 blur-2xl pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-700 via-indigo-600 to-cyan-600 flex items-center justify-center text-white ring-2 ring-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.5)] overflow-hidden">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-[#080B14] shadow-[0_0_8px_#34d399]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base text-white tracking-tight">Elena Vance</span>
                <span className="text-[11px] font-mono text-white glass-primary-btn px-2 py-0.5 rounded-full border border-white/20 shadow-sm font-semibold">
                  AI Lead
                </span>
              </div>
              <span className="text-xs text-slate-400">Principal Infrastructure Architect</span>
            </div>
          </div>

          {/* Audio Stream State Chip (Siri Live Capsule) */}
          <div className="flex items-center gap-2 glass-pill px-3 py-1 rounded-full border border-cyan-500/40 shadow-[0_0_12px_rgba(54,214,255,0.25)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-widest font-bold">
              Listening
            </span>
          </div>
        </div>

        {/* Dynamic Animated SVG Waveform Visualizer with iOS Gradient & Siri Glow */}
        <div className="glass-panel-subtle rounded-2xl p-4 flex flex-col items-center justify-center gap-3 relative overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-600/5 pointer-events-none" />
          <div className="w-full flex items-center justify-center h-16 px-4 siri-glow relative z-10">
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 320 60">
              <defs>
                <linearGradient id="siriWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#36D6FF" />
                  <stop offset="50%" stopColor="#7657FF" />
                  <stop offset="100%" stopColor="#36D399" />
                </linearGradient>
              </defs>
              <g stroke="url(#siriWaveGrad)" strokeLinecap="round" strokeWidth="3">
                <line className="animate-pulse" style={{ animationDuration: '0.8s' }} x1="10" x2="10" y1="20" y2="40" />
                <line className="animate-pulse" style={{ animationDuration: '1.2s' }} x1="25" x2="25" y1="12" y2="48" />
                <line className="animate-pulse" style={{ animationDuration: '0.6s' }} x1="40" x2="40" y1="26" y2="34" />
                <line className="animate-pulse" style={{ animationDuration: '1.4s' }} x1="55" x2="55" y1="16" y2="44" />
                <line className="animate-pulse" style={{ animationDuration: '0.9s' }} x1="70" x2="70" y1="8" y2="52" />
                <line className="animate-pulse" style={{ animationDuration: '1.1s' }} x1="85" x2="85" y1="22" y2="38" />
                <line className="animate-pulse" style={{ animationDuration: '0.7s' }} x1="100" x2="100" y1="5" y2="55" />
                <line className="animate-pulse" style={{ animationDuration: '1.3s' }} x1="115" x2="115" y1="14" y2="46" />
                <line className="animate-pulse" style={{ animationDuration: '0.5s' }} x1="130" x2="130" y1="25" y2="35" />
                <line className="animate-pulse" style={{ animationDuration: '1.0s' }} x1="145" x2="145" y1="10" y2="50" />
                <line className="animate-pulse" style={{ animationDuration: '0.8s' }} x1="160" x2="160" y1="4" y2="56" />
                <line className="animate-pulse" style={{ animationDuration: '1.2s' }} x1="175" x2="175" y1="15" y2="45" />
                <line className="animate-pulse" style={{ animationDuration: '0.6s' }} x1="190" x2="190" y1="22" y2="38" />
                <line className="animate-pulse" style={{ animationDuration: '1.5s' }} x1="205" x2="205" y1="8" y2="52" />
                <line className="animate-pulse" style={{ animationDuration: '0.9s' }} x1="220" x2="220" y1="18" y2="42" />
                <line className="animate-pulse" style={{ animationDuration: '1.1s' }} x1="235" x2="235" y1="6" y2="54" />
                <line className="animate-pulse" style={{ animationDuration: '0.7s' }} x1="250" x2="250" y1="24" y2="36" />
                <line className="animate-pulse" style={{ animationDuration: '1.3s' }} x1="265" x2="265" y1="12" y2="48" />
                <line className="animate-pulse" style={{ animationDuration: '0.8s' }} x1="280" x2="280" y1="18" y2="42" />
                <line className="animate-pulse" style={{ animationDuration: '1.4s' }} x1="295" x2="295" y1="26" y2="34" />
                <line className="animate-pulse" style={{ animationDuration: '0.5s' }} x1="310" x2="310" y1="28" y2="32" />
              </g>
            </svg>
          </div>
          <div className="flex items-center justify-between w-full px-1 font-mono text-[11px] text-slate-400 relative z-10">
            <span>Input Gain: +3.2 dB</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Speech Stream Active • 99.4%
            </span>
          </div>
        </div>
      </div>

      {/* Question Card & Active Prompt Container */}
      <div className="glass-panel rounded-3xl p-5 sm:p-6 flex flex-col gap-4 relative overflow-hidden border border-white/10 shadow-2xl">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-cyan-400" />
            Active Prompt
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleAudio}
              className="p-1.5 rounded-xl glass-pill text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={isPlayingAudio ? 'Stop Reading' : 'Read Question Aloud'}
            >
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'text-cyan-400 animate-bounce' : 'text-slate-300'}`} />
            </button>
            <button
              onClick={cycleSpeed}
              className="px-2.5 py-1 rounded-xl glass-pill font-mono text-[11px] text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
              title="Playback Speed"
            >
              {audioSpeed}
            </button>
          </div>
        </div>

        <blockquote className="text-base sm:text-lg font-semibold text-white leading-relaxed tracking-tight">
          &ldquo;{question.question_text}&rdquo;
        </blockquote>

        {/* Evaluation Dimension Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {question.category && (
            <span className="text-xs px-3 py-1 glass-pill text-purple-300 rounded-full border border-purple-500/30 font-medium">
              Category: {question.category}
            </span>
          )}
          <span className="text-xs px-3 py-1 glass-pill text-slate-300 rounded-full border border-white/10">
            System Design & Tradeoffs
          </span>
          <span className="text-xs px-3 py-1 glass-pill text-slate-300 rounded-full border border-white/10">
            Edge Cases & Failovers
          </span>
        </div>
      </div>

      {/* Rubric Tracker Module */}
      <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono text-cyan-300 uppercase font-bold tracking-wider">
            Rubric Evaluation Focus
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-slate-200 mb-1 font-medium">
              <span>Technical Architecture & Tradeoffs</span>
              <span className="font-mono text-emerald-400 text-[11px]">Key Focus</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden p-[1px] border border-white/10">
              <div
                className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full shadow-[0_0_8px_rgba(118,87,255,0.5)]"
                style={{ width: '80%' }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-200 mb-1 font-medium">
              <span>Clarity, Structure & Communication</span>
              <span className="font-mono text-slate-400 text-[11px]">Evaluating</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden p-[1px] border border-white/10">
              <div
                className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full shadow-[0_0_8px_rgba(54,214,255,0.4)]"
                style={{ width: '45%' }}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
