import React from 'react';
import { Card } from '../ui/Card';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Send } from 'lucide-react';

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
  const charCount = value.trim().length;
  const isTooShort = charCount > 0 && charCount < 20;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd + Enter / Ctrl + Enter shortcut
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && charCount >= 10 && !isSubmitting && !disabled) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <Card className="p-5 sm:p-6 space-y-4 bg-[rgba(12,20,37,0.7)] backdrop-blur-2xl border-white/[0.08] shadow-glass">
      <div className="space-y-2">
        <Textarea
          label="Your Answer"
          placeholder="Type your answer here... Be specific, explain your reasoning, and mention relevant concepts or architectural trade-offs."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          showCount
          maxLength={3000}
          disabled={disabled || isSubmitting}
          className="min-h-[180px] font-sans text-white placeholder-slate-500"
          helperText={isTooShort ? 'Please provide a more detailed answer for better AI evaluation.' : undefined}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.1] font-mono text-[10px] text-slate-300">
            Cmd/Ctrl + Enter
          </kbd>
          <span>to submit quickly</span>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={onSubmit}
          disabled={disabled || charCount < 10 || isSubmitting}
          isLoading={isSubmitting}
          leftIcon={!isSubmitting ? <Send className="w-4 h-4" /> : undefined}
          className="shadow-md shadow-sky-500/20"
        >
          {isSubmitting ? 'Evaluating your answer...' : 'Submit Answer'}
        </Button>
      </div>
    </Card>
  );
};
