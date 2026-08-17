import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { api } from '../lib/api';
import { RoleType, InterviewType, DifficultyLevel } from '../types';
import {
  Sparkles,
  Play,
  Code2,
  Binary,
  MessageSquare,
  Users,
  Layers,
  AlertCircle,
  Check,
  Zap,
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
  { id: 'easy', title: 'Easy', desc: 'Fundamentals, basic syntax, and definitions', color: 'text-emerald-600' },
  { id: 'medium', title: 'Medium', desc: 'Real-world scenarios, architectural trade-offs', color: 'text-amber-600' },
  { id: 'hard', title: 'Hard', desc: 'Complex edge cases, distributed scaling, nuances', color: 'text-rose-600' },
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
        <div className="space-y-1 pb-4 border-b border-slate-200/80 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Create Your Interview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Configure your role, interview format, and difficulty to start an AI-guided mock session.
          </p>
        </div>

        {/* Quota Exceeded Warning */}
        {quotaExhausted && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">You've reached your free interview limit for this month.</p>
              <p className="leading-relaxed">
                Free accounts have a limit of 3 mock interviews per month. Your quota will reset on the 1st of next month. You can still review all past reports and transcripts in your History.
              </p>
            </div>
          </div>
        )}

        {error && !quotaExhausted && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Target Role */}
        <Card className="p-6 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              1. Select Job Role
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select your target profession or enter a custom title.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {STANDARD_ROLES.map((role) => {
              const isSelected = selectedRole === role;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all duration-150 flex items-center justify-between ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50/80 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span className="truncate">{role}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-brand-600 shrink-0" />}
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
        <Card className="p-6 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              2. Choose Interview Type
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
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
                  className={`p-4 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50/80 dark:bg-brand-950/60 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-brand-600" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{type.title}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{type.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Step 3: Difficulty & Question Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Difficulty */}
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                3. Difficulty Level
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
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
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all duration-150 flex items-center justify-between ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/80 dark:bg-brand-950/60 ring-2 ring-brand-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <span className={`font-bold ${diff.color}`}>{diff.title}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">{diff.desc}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-brand-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Number of Questions */}
          <Card className="p-6 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                4. Total Questions
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
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
                    className={`p-4 rounded-xl border text-center font-mono font-bold transition-all duration-150 ${
                      isSelected
                        ? 'border-brand-600 bg-brand-600 text-white shadow-sm ring-2 ring-brand-500/30'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xl block">{count}</span>
                    <span className="text-[10px] uppercase tracking-wider font-sans font-normal opacity-80">Questions</span>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-slate-400">
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
            className="w-full sm:w-auto shadow-lg shadow-brand-500/25 px-8"
            rightIcon={<Play className="w-4 h-4 fill-white" />}
          >
            {isLoading ? 'Generating First Question...' : 'Start Interview'}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};
