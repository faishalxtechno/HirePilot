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
    <Card className="p-5 sm:p-6 space-y-4 bg-[#121212] border-white/10 shadow-2xl">
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
          className="min-h-[180px] font-sans text-white placeholder-brand-muted"
          helperText={isTooShort ? 'Please provide a more detailed answer for better AI evaluation.' : undefined}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <div className="text-[11px] text-brand-muted flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-white">
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
        >
          {isSubmitting ? 'Evaluating your answer...' : 'Submit Answer'}
        </Button>
      </div>
    </Card>
  );
};
