import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Send, Mic, MicOff, AlertCircle } from 'lucide-react';

interface AnswerEditorProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submittingMessage?: string;
  disabled?: boolean;
}

export const AnswerEditor: React.FC<AnswerEditorProps> = ({
  value,
  onChange,
  onSubmit,
  isSubmitting,
  submittingMessage,
  disabled = false,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const charCount = value.trim().length;
  const isTooShort = charCount > 0 && charCount < 20;

  const valueRef = useRef(value);
  valueRef.current = value;

  useEffect(() => {
    // Check for native browser SpeechRecognition support
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          onChange(valueRef.current ? `${valueRef.current} ${transcript}` : transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone permission was denied.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
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
  }, []);

  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) return;
    setSpeechError(null);

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.warn('Error starting speech recognition:', e);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd + Enter / Ctrl + Enter shortcut
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && charCount >= 10 && !isSubmitting && !disabled) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <Card className="p-6 rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-1">
        <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
          Type Your Answer
        </h3>
        <span className="text-[11px] font-mono text-[#64748B]">
          {charCount} / 3000 characters
        </span>
      </div>

      <div className="relative">
        <textarea
          rows={7}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isSubmitting}
          maxLength={3000}
          placeholder="Type your answer here... Be specific, explain your technical reasoning, design decisions, and practical trade-offs."
          className="w-full p-4 pr-12 text-sm rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all leading-relaxed"
        />

        {/* Voice dictation mic button */}
        {speechSupported && (
          <button
            type="button"
            onClick={toggleListening}
            disabled={disabled || isSubmitting}
            title={isListening ? 'Stop voice recording' : 'Dictate answer with voice'}
            className={`absolute right-3.5 bottom-4 p-2 rounded-full transition-all ${
              isListening
                ? 'bg-rose-500 text-white ring-4 ring-rose-200 animate-pulse'
                : 'bg-white text-[#64748B] hover:text-[#2563EB] border border-[#E5E7EB] shadow-2xs hover:bg-slate-50'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        )}
      </div>

      {speechError && (
        <div className="p-2.5 rounded-[8px] bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{speechError}</span>
        </div>
      )}

      {isTooShort && (
        <p className="text-[11px] text-amber-600">
          Please provide a more substantive answer for accurate AI evaluation.
        </p>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-[#F1F5F9]">
        <div className="text-[11px] text-[#64748B] flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded-[4px] bg-slate-100 border border-[#E5E7EB] font-mono text-[10px] font-semibold text-[#111827]">
            ⌘/Ctrl + Enter
          </kbd>
          <span>to submit</span>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={onSubmit}
          disabled={disabled || charCount < 10 || isSubmitting}
          isLoading={isSubmitting}
          leftIcon={!isSubmitting ? <Send className="w-4 h-4" /> : undefined}
          className="shadow-xs bg-[#2563EB] hover:bg-[#1D4ED8]"
        >
          {isSubmitting ? (submittingMessage || 'Evaluating Answer with Gemini AI...') : 'Submit Answer'}
        </Button>
      </div>
    </Card>
  );
};
