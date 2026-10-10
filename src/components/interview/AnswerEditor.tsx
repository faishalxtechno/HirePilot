import React, { useState, useEffect, useRef } from 'react';
import { Mic, Code, Lightbulb, Send, Trash2, CheckCircle2 } from 'lucide-react';

interface AnswerEditorProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  disabled?: boolean;
}

export const AnswerEditor: React.FC<AnswerEditorProps> = ({
  value,
  onChange,
  onSubmit,
  isSubmitting,
  disabled = false,
}) => {
  const [activeTab, setActiveTab] = useState<'voice' | 'code'>('voice');
  const [isRecording, setIsRecording] = useState(false);
  const [hintRequested, setHintRequested] = useState(false);
  const recognitionRef = useRef<any>(null);

  const charCount = value.trim().length;

  useEffect(() => {
    // Initialize Web Speech Recognition if available
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' ';
        }
        if (transcript.trim()) {
          onChange(transcript.trim());
        }
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition event:', e.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, [onChange]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not natively supported in this browser. You can type your response directly.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Could not start microphone:', err);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && charCount >= 10 && !isSubmitting && !disabled) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-4 text-slate-100">
      
      {/* Multimodal Tab Mode Selector & Sub-Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 glass-panel p-2 rounded-2xl border border-white/10">
        <div className="flex items-center gap-1 glass-panel-subtle p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('voice')}
            className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'voice'
                ? 'bg-white/15 text-white shadow-sm border border-white/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mic className={`w-4 h-4 ${isRecording ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}`} />
            <span>Live Voice Mode</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-white/15 text-white shadow-sm border border-white/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-4 h-4 text-purple-400" />
            <span>Code / Scratchpad</span>
          </button>
        </div>

        <div className="flex items-center gap-3 px-2 justify-between sm:justify-end">
          <button
            type="button"
            onClick={() => setHintRequested(!hintRequested)}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white glass-pill px-3 py-1.5 rounded-xl transition-all cursor-pointer border border-white/10"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>{hintRequested ? 'Hint: Consider Partitioning' : 'Hint (1 Left)'}</span>
          </button>
          <span className="h-4 w-[1px] bg-white/10 hidden sm:inline" />
          <span className="font-mono text-xs text-slate-400">Language: Python 3 / Markdown</span>
        </div>
      </div>

      {/* Voice Mode View: Live Speech-to-Text Transcription Stream */}
      {activeTab === 'voice' && (
        <div className="glass-panel rounded-3xl p-5 sm:p-6 flex flex-col gap-3 relative overflow-hidden border border-white/10 shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isRecording ? 'bg-rose-400' : 'bg-emerald-400'} opacity-75`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isRecording ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'}`} />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                {isRecording ? 'Dictating Live (Microphone Active)' : 'Live Transcription (You)'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-slate-400 glass-panel-subtle px-2.5 py-0.5 rounded-full border border-white/5">
                Confidence: 98.2%
              </span>
              <button
                type="button"
                onClick={toggleRecording}
                className={`text-xs font-mono px-3 py-1 rounded-xl border transition-all cursor-pointer ${
                  isRecording
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                    : 'glass-pill border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                {isRecording ? 'Stop Mic' : 'Start Mic'}
              </button>
            </div>
          </div>

          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled || isSubmitting}
            placeholder="Speak or type your explanation here... Outline architectural patterns, trade-offs, algorithms, and latency calculations."
            rows={7}
            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 leading-relaxed font-sans resize-y transition-colors"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-0.5 rounded bg-white/10 border border-white/15 font-mono text-[10px] text-white">
                Cmd/Ctrl + Enter
              </kbd>
              <span>to submit quickly</span>
            </div>
            <span className="font-mono text-slate-400">{charCount} / 3000 chars</span>
          </div>
        </div>
      )}

      {/* Code / Scratchpad Mode View: Terminal Style Editor */}
      {activeTab === 'code' && (
        <div className="glass-panel rounded-3xl flex flex-col overflow-hidden relative border border-white/10 shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
          
          {/* Editor Header Bar with Traffic Lights */}
          <div className="flex items-center justify-between px-5 py-3 bg-white/[0.03] border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-80" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-80" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] opacity-80" />
              </div>
              <span className="font-mono text-xs text-cyan-300 font-semibold">system_architecture.py</span>
              <span className="font-mono text-[10px] glass-pill px-2.5 py-0.5 rounded-full text-slate-400 border border-white/10">
                Architectural Prototype
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <span className="hidden sm:inline">Spaces: 4 • UTF-8</span>
              <button
                type="button"
                onClick={() => onChange('')}
                className="hover:text-rose-400 transition-colors glass-pill p-1.5 rounded-lg border border-white/10 cursor-pointer"
                title="Clear Scratchpad"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled || isSubmitting}
            placeholder="# Write your algorithms, data structures, or code prototype here...&#10;class RateLimiter:&#10;    def __init__(self, capacity: int, refill_rate: float):&#10;        self.capacity = capacity&#10;        self.refill_rate = refill_rate"
            rows={10}
            className="w-full bg-[#05070D]/80 p-5 font-mono text-xs sm:text-sm text-cyan-100 placeholder-slate-600 focus:outline-none leading-relaxed resize-y border-none"
          />

          {/* Scratchpad Quick Actions & Feedback Helper */}
          <div className="p-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Syntactic Scratchpad Ready</span>
            </div>
            <span className="font-mono">{charCount} characters</span>
          </div>
        </div>
      )}

      {/* Primary Submit Button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || charCount < 10 || isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full glass-primary-btn text-white text-xs font-semibold transition-all shadow-[0_4px_20px_rgba(118,87,255,0.45)] border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? 'Evaluating Answer...' : 'Submit Answer'}</span>
        </button>
      </div>

    </div>
  );
};
