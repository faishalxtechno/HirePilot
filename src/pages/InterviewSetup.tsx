import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { api } from '../lib/api';
import { InterviewType, DifficultyLevel } from '../types';
import {
  Play,
  Code2,
  Binary,
  MessageSquare,
  Users,
  Layers,
  AlertCircle,
  Check,
} from 'lucide-react';

const STANDARD_ROLES = [
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Scientist',
  'Machine Learning Engineer',
  'Java Developer',
  'Python Developer',
  'Custom Role',
];

const INTERVIEW_TYPES = [
  {
    id: 'technical',
    title: 'Technical',
    desc: 'Core architecture, design patterns, framework internals, edge cases',
    icon: Code2,
  },
  {
    id: 'dsa',
    title: 'DSA',
    desc: 'Data structures, algorithms, complexity trade-offs, optimization',
    icon: Binary,
  },
  {
    id: 'behavioral',
    title: 'Behavioral',
    desc: 'STAR method, handling conflicts, teamwork, high-stress scenarios',
    icon: MessageSquare,
  },
  {
    id: 'hr',
    title: 'HR',
    desc: 'Motivation, career goals, cultural alignment, communication style',
    icon: Users,
  },
  {
    id: 'mixed',
    title: 'Mixed',
    desc: 'Full loop simulation blending technical, DSA, and leadership topics',
    icon: Layers,
  },
];

const DIFFICULTIES: Array<{ id: DifficultyLevel; title: string; desc: string; color: string }> = [
  { id: 'easy', title: 'Easy', desc: 'Fundamentals, basic syntax, and definitions', color: 'text-white' },
  { id: 'medium', title: 'Medium', desc: 'Real-world scenarios, architectural trade-offs', color: 'text-brand-secondary' },
  { id: 'hard', title: 'Hard', desc: 'Complex edge cases, distributed scaling, nuances', color: 'text-white/60' },
];

const QUESTION_COUNTS = [5, 10, 15];

export const InterviewSetup: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialRole = searchParams.get('role') || 'Software Engineer';
  const initialType = (searchParams.get('type') as InterviewType) || 'technical';

  const [selectedRole, setSelectedRole] = useState<string>(
    STANDARD_ROLES.includes(initialRole) ? initialRole : 'Custom Role'
  );
  const [customRoleInput, setCustomRoleInput] = useState<string>(
    STANDARD_ROLES.includes(initialRole) ? '' : initialRole
  );

  const [selectedType, setSelectedType] = useState<InterviewType>(initialType);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('medium');
  const [totalQuestions, setTotalQuestions] = useState<number>(10);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [quotaExhausted, setQuotaExhausted] = useState<boolean>(false);

  useEffect(() => {
    // Check user quota on load
    api.getDashboardData().then((data) => {
      if (data?.stats?.monthlyRemaining === 0) {
        setQuotaExhausted(true);
      }
    }).catch(() => {});
  }, []);

  const handleStartInterview = async () => {
    const finalRole = selectedRole === 'Custom Role' ? customRoleInput.trim() : selectedRole;
    if (!finalRole) {
      setError('Please provide a target role name.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await api.createInterview({
        role: finalRole,
        interview_type: selectedType,
        difficulty: selectedDifficulty,
        total_questions: totalQuestions,
      });

      // Navigate to the interview screen
      navigate(`/interview/${result.interview.id}`, {
        state: { firstQuestion: result.firstQuestion },
      });
    } catch (err: any) {
      if (err.message && err.message.includes('monthly interview limit')) {
        setQuotaExhausted(true);
        setError("You've reached your free interview limit for this month.");
      } else {
        setError(err.message || 'Failed to start interview session. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
        {/* Page Header */}
        <div className="space-y-1 pb-4 border-b border-white/10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Create Your Interview
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted">
            Configure your role, interview format, and difficulty to start an AI-guided mock session.
          </p>
        </div>

        {/* Quota Exceeded Warning */}
        {quotaExhausted && (
          <div className="p-4 rounded-2xl bg-[#1f1a0a] border border-amber-500/20 text-xs text-amber-400 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium">You've reached your free interview limit for this month.</p>
              <p className="leading-relaxed text-brand-muted">
                Free accounts have a limit of 3 mock interviews per month. Your quota will reset on the 1st of next month. You can still review all past reports and transcripts in your History.
              </p>
            </div>
          </div>
        )}

        {error && !quotaExhausted && (
          <div className="p-4 rounded-xl bg-[#1f0a0a] border border-rose-500/20 text-xs text-rose-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Target Role */}
        <Card className="p-5 sm:p-6 space-y-4 bg-[#121212] border-white/10">
          <div>
            <h3 className="text-sm font-medium text-white uppercase tracking-wider">
              1. Select Job Role
            </h3>
            <p className="text-xs text-brand-muted mt-0.5">
              Select your target profession or enter a custom title.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {STANDARD_ROLES.map((role) => {
              const isSelected = selectedRole === role;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`p-3 min-h-[44px] rounded-xl border text-left text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-white bg-white text-black'
                      : 'border-white/10 bg-black text-brand-muted hover:border-white/30 hover:text-white'
                  }`}
                >
                  <span className="truncate pr-2">{role}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-black shrink-0" />}
                </button>
              );
            })}
          </div>

          {selectedRole === 'Custom Role' && (
            <div className="pt-2 animate-fade-in">
              <Input
                label="Custom Role Title"
                placeholder="e.g. Cloud Security Architect, iOS Engineer, DevOps Specialist"
                value={customRoleInput}
                onChange={(e) => setCustomRoleInput(e.target.value)}
                required
              />
            </div>
          )}
        </Card>

        {/* Step 2: Interview Type */}
        <Card className="p-6 space-y-4 bg-[#121212] border-white/10">
          <div>
            <h3 className="text-sm font-medium text-white uppercase tracking-wider">
              2. Choose Interview Type
            </h3>
            <p className="text-xs text-brand-muted mt-0.5">
              The AI interviewer will adapt its questions strictly to this domain.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {INTERVIEW_TYPES.map((type) => {
              const isSelected = selectedType === type.id;
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id as InterviewType)}
                  className={`p-4 rounded-xl border text-left transition-colors flex flex-col justify-between space-y-3 cursor-pointer ${
                    isSelected
                      ? 'border-white bg-white text-black'
                      : 'border-white/10 bg-black hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-black text-white' : 'bg-white/5 text-brand-muted'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-black" />}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isSelected ? 'text-black' : 'text-white'}`}>{type.title}</h4>
                    <p className={`text-[11px] mt-1 leading-snug ${isSelected ? 'text-black/70' : 'text-brand-muted'}`}>{type.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Step 3: Difficulty & Question Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Difficulty */}
          <Card className="p-6 space-y-4 bg-[#121212] border-white/10">
            <div>
              <h3 className="text-sm font-medium text-white uppercase tracking-wider">
                3. Difficulty Level
              </h3>
              <p className="text-xs text-brand-muted mt-0.5">
                Sets the baseline complexity for the first question.
              </p>
            </div>

            <div className="space-y-2">
              {DIFFICULTIES.map((diff) => {
                const isSelected = selectedDifficulty === diff.id;
                return (
                  <button
                    key={diff.id}
                    type="button"
                    onClick={() => setSelectedDifficulty(diff.id)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-white bg-white text-black'
                        : 'border-white/10 bg-black hover:border-white/30'
                    }`}
                  >
                    <div>
                      <span className={`font-bold ${isSelected ? 'text-black' : diff.color}`}>{diff.title}</span>
                      <p className={`text-[11px] mt-0.5 ${isSelected ? 'text-black/70' : 'text-brand-muted'}`}>{diff.desc}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-black shrink-0" />}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Number of Questions */}
          <Card className="p-6 space-y-4 flex flex-col justify-between bg-[#121212] border-white/10">
            <div>
              <h3 className="text-sm font-medium text-white uppercase tracking-wider">
                4. Total Questions
              </h3>
              <p className="text-xs text-brand-muted mt-0.5">
                Default is 10 questions for standard interview loops.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 my-auto py-2">
              {QUESTION_COUNTS.map((count) => {
                const isSelected = totalQuestions === count;
                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setTotalQuestions(count)}
                    className={`p-4 rounded-xl border text-center font-mono font-bold transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-white bg-white text-black'
                        : 'border-white/10 bg-black text-white hover:border-white/30'
                    }`}
                  >
                    <span className="text-xl block">{count}</span>
                    <span className={`text-[10px] uppercase tracking-wider font-sans font-normal opacity-80 ${isSelected ? 'text-black/70' : 'text-brand-muted'}`}>Questions</span>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-brand-muted">
              Estimated duration: ~{totalQuestions * 2.5} minutes
            </p>
          </Card>
        </div>

        {/* Start Button */}
        <div className="pt-2 flex justify-end">
          <Button
            variant="primary"
            size="lg"
            onClick={handleStartInterview}
            disabled={isLoading || quotaExhausted}
            isLoading={isLoading}
            className="w-full sm:w-auto px-8"
            rightIcon={<Play className="w-4 h-4" />}
          >
            {isLoading ? 'Generating First Question...' : 'Start Interview'}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};
