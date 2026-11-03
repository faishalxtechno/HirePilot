import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
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
  GraduationCap,
  Clock,
  FileText,
  Terminal,
} from 'lucide-react';

const STANDARD_ROLES = [
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Analyst',
  'AI/ML Engineer',
  'Data Scientist',
  'DevOps / Cloud Engineer',
  'Python Developer',
  'Java Developer',
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
    title: 'Mixed Loop',
    desc: 'Full loop simulation blending technical architecture and behavioral questions',
    icon: Layers,
  },
];

const EXPERIENCE_LEVELS: Array<{ id: 'beginner' | 'intermediate' | 'advanced'; label: string; desc: string }> = [
  { id: 'beginner', label: 'Beginner / Entry', desc: '0 - 2 years (Core syntax, fundamentals & logic)' },
  { id: 'intermediate', label: 'Intermediate / Mid', desc: '2 - 5 years (Practical trade-offs & production workflows)' },
  { id: 'advanced', label: 'Senior / Staff', desc: '5+ years (System scaling, architectural judgment & leadership)' },
];

const DIFFICULTIES: Array<{ id: DifficultyLevel; title: string; desc: string; color: string }> = [
  { id: 'easy', title: 'Easy', desc: 'Foundations & definitions', color: 'text-emerald-600' },
  { id: 'medium', title: 'Medium', desc: 'Real-world scenarios & design trade-offs', color: 'text-amber-600' },
  { id: 'hard', title: 'Hard', desc: 'Edge cases, scale & distributed nuances', color: 'text-rose-600' },
];

const PROGRAMMING_LANGUAGES = [
  'Language Agnostic',
  'TypeScript / JavaScript',
  'Python',
  'Java',
  'Go',
  'C++',
  'Rust',
  'SQL',
];

const QUESTION_CONFIGS = [
  { count: 5, label: 'Quick Sprint', duration: '~15 mins' },
  { count: 10, label: 'Standard Loop', duration: '~30 mins' },
  { count: 15, label: 'Full Simulation', duration: '~45 mins' },
];

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
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('medium');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Language Agnostic');
  const [totalQuestions, setTotalQuestions] = useState<number>(10);
  const [jobDescription, setJobDescription] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [quotaExhausted, setQuotaExhausted] = useState<boolean>(false);

  useEffect(() => {
    api.getDashboardData().then((data) => {
      if (data?.stats?.monthlyRemaining === 0) {
        setQuotaExhausted(true);
      }
    }).catch(() => {});
  }, []);

  const handleStartInterview = async () => {
    const finalRole = selectedRole === 'Custom Role' ? customRoleInput.trim() : selectedRole;
    if (!finalRole) {
      setError('Please specify a target role name.');
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
        experience_level: selectedLevel,
        programming_language: selectedLanguage !== 'Language Agnostic' ? selectedLanguage : undefined,
        job_description: jobDescription.trim() || undefined,
      });

      // Navigate to the interview room
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
        <div className="space-y-1 pb-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-semibold">
              Interview Engine 4.0
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Configure Your Mock Interview
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Set your target role, experience level, and optional focus areas for realistic Gemini AI simulation.
          </p>
        </div>

        {/* Quota Exceeded Warning */}
        {quotaExhausted && (
          <div className="p-4 rounded-[12px] bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">You have reached your free interview allowance for this month.</p>
              <p className="leading-relaxed text-[#64748B]">
                Free community tier includes 3 mock sessions each calendar month. Quota resets on the 1st of next month. You can still review past session reports and transcripts anytime in your Interview History.
              </p>
            </div>
          </div>
        )}

        {error && !quotaExhausted && (
          <div className="p-4 rounded-[10px] bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Target Role */}
        <Card className="p-6 space-y-4 rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs">
          <div>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
              1. Target Job Role
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Select your career track or provide a custom title.
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
                  className={`p-3 rounded-[8px] border text-left text-xs font-semibold transition-all duration-150 flex items-center justify-between ${
                    isSelected
                      ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] ring-2 ring-blue-100 shadow-2xs'
                      : 'border-[#E5E7EB] bg-white text-[#111827] hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate">{role}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />}
                </button>
              );
            })}
          </div>

          {selectedRole === 'Custom Role' && (
            <div className="pt-2 animate-fade-in">
              <Input
                label="Custom Role Title"
                placeholder="e.g. Distributed Systems Engineer, iOS Architect, Staff SRE"
                value={customRoleInput}
                onChange={(e) => setCustomRoleInput(e.target.value)}
                required
              />
            </div>
          )}
        </Card>

        {/* Step 2: Experience Level & Difficulty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Experience Level */}
          <Card className="p-6 space-y-4 rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs">
            <div>
              <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#2563EB]" />
                <span>2. Experience Level</span>
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Calibrates depth of system design, nuances, and leadership scope.
              </p>
            </div>

            <div className="space-y-2">
              {EXPERIENCE_LEVELS.map((lvl) => {
                const isSelected = selectedLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setSelectedLevel(lvl.id)}
                    className={`w-full p-3 rounded-[8px] border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] ring-2 ring-blue-100 shadow-2xs'
                        : 'border-[#E5E7EB] bg-white text-[#111827] hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold">{lvl.label}</p>
                      <p className="text-[11px] text-[#64748B] mt-0.5">{lvl.desc}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#2563EB] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Difficulty Setting */}
          <Card className="p-6 space-y-4 rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs">
            <div>
              <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>3. Question Difficulty</span>
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Base challenge level for the opening questions.
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
                    className={`w-full p-3 rounded-[8px] border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] ring-2 ring-blue-100 shadow-2xs'
                        : 'border-[#E5E7EB] bg-white text-[#111827] hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold">{diff.title}</p>
                      <p className="text-[11px] text-[#64748B] mt-0.5">{diff.desc}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#2563EB] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Step 3: Interview Type */}
        <Card className="p-6 space-y-4 rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs">
          <div>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
              4. Interview Format
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              The AI interviewer will adapt questions strictly to this domain.
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
                  className={`p-4 rounded-[10px] border text-left transition-all flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] ring-2 ring-blue-100 shadow-2xs'
                      : 'border-[#E5E7EB] bg-white hover:bg-slate-50 text-[#111827]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`w-8 h-8 rounded-[6px] flex items-center justify-center ${isSelected ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-[#64748B]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#2563EB]" />}
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold">{type.title}</h4>
                    <p className="text-[11px] text-[#64748B] mt-0.5 line-clamp-2 leading-relaxed">
                      {type.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Step 4: Programming Language & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Programming Language */}
          <Card className="p-6 space-y-4 rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs">
            <div>
              <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#2563EB]" />
                <span>5. Language / Stack (Optional)</span>
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Tailor technical coding and syntax questions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {PROGRAMMING_LANGUAGES.map((lang) => {
                const isSelected = selectedLanguage === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSelectedLanguage(lang)}
                    className={`p-2 rounded-[6px] border text-center text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-semibold'
                        : 'border-[#E5E7EB] bg-white text-[#64748B] hover:bg-slate-50'
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Session Length */}
          <Card className="p-6 space-y-4 rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs">
            <div>
              <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#2563EB]" />
                <span>6. Session Length</span>
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Select question count and estimated duration.
              </p>
            </div>

            <div className="space-y-2">
              {QUESTION_CONFIGS.map((cfg) => {
                const isSelected = totalQuestions === cfg.count;
                return (
                  <button
                    key={cfg.count}
                    type="button"
                    onClick={() => setTotalQuestions(cfg.count)}
                    className={`w-full p-3 rounded-[8px] border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] ring-2 ring-blue-100 shadow-2xs'
                        : 'border-[#E5E7EB] bg-white text-[#111827] hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold">{cfg.count} Questions</p>
                      <p className="text-[11px] text-[#64748B] mt-0.5">{cfg.label} ({cfg.duration})</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#2563EB] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Step 5: Optional Job Description Context */}
        <Card className="p-6 space-y-3 rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs">
          <div>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#2563EB]" />
              <span>7. Target Job Description / Custom Focus (Optional)</span>
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Paste requirements from a specific job posting to simulate an interview tailored directly to your target company.
            </p>
          </div>

          <textarea
            rows={3}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="e.g. We are looking for a Senior React Engineer experienced in WebSockets, micro-frontends, high-throughput caching, and distributed state management..."
            className="w-full p-3 text-xs rounded-[8px] bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all"
          />
        </Card>

        {/* Submit Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#64748B]">
            Estimated session duration: <span className="font-semibold text-[#111827] font-mono">{totalQuestions * 3} mins</span>
          </p>

          <Button
            variant="primary"
            size="lg"
            onClick={handleStartInterview}
            disabled={isLoading || quotaExhausted}
            isLoading={isLoading}
            leftIcon={!isLoading ? <Play className="w-4 h-4 fill-white" /> : undefined}
            className="w-full sm:w-auto shadow-xs bg-[#2563EB] hover:bg-[#1D4ED8]"
          >
            {isLoading ? 'Calibrating AI Interview Room...' : 'Start Mock Interview'}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewSetup;
