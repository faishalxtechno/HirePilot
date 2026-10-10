import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../lib/api';
import { Interview as IInterview, Question, AnswerEvaluation } from '../types';
import { InterviewHeader } from '../components/interview/InterviewHeader';
import { QuestionCard } from '../components/interview/QuestionCard';
import { AnswerEditor } from '../components/interview/AnswerEditor';
import { EvaluationFeedback } from '../components/interview/EvaluationFeedback';
import {
  AlertCircle,
  Loader2,
  Mic,
  Pause,
  Play,
  Settings,
  ArrowRight,
  AlertTriangle,
  X,
  Sparkles,
} from 'lucide-react';

export const Interview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [interview, setInterview] = useState<IInterview | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [evaluation, setEvaluation] = useState<AnswerEvaluation | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoadingNext, setIsLoadingNext] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Timer & Dock State
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [isMicActive, setIsMicActive] = useState<boolean>(true);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);

  // Stopwatch timer
  useEffect(() => {
    if (isLoading || isTimerPaused) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isLoading, isTimerPaused]);

  useEffect(() => {
    if (!id) return;
    loadInterviewData(id);
  }, [id]);

  const loadInterviewData = async (interviewId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if first question was passed via navigation state
      const passedFirstQuestion = (location.state as any)?.firstQuestion;

      const data = await api.getInterview(interviewId);
      setInterview(data.interview);

      if (data.interview.status === 'completed') {
        navigate(`/interview/${interviewId}/result`, { replace: true });
        return;
      }

      if (passedFirstQuestion) {
        setCurrentQuestion(passedFirstQuestion);
      } else if (data.questions && data.questions.length > 0) {
        const lastQ = data.questions[data.questions.length - 1];
        setCurrentQuestion(lastQ);
      }
    } catch (err: any) {
      console.error('Error fetching interview:', err);
      setError(err.message || 'Interview session not found');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!id || !currentQuestion || !userAnswer.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const evalResult = await api.submitAnswer(id, {
        question_id: currentQuestion.id,
        user_answer: userAnswer.trim(),
      });
      setEvaluation(evalResult);
    } catch (err: any) {
      console.error('Error evaluating answer:', err);
      setError(err.message || 'Failed to evaluate answer. Please try submitting again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = async () => {
    if (!id || !interview || isLoadingNext) return;

    setIsLoadingNext(true);
    setError(null);

    const isLast = (currentQuestion?.question_number || 1) >= interview.total_questions;

    try {
      if (isLast) {
        // Complete interview and generate report
        await api.completeInterview(id);
        navigate(`/interview/${id}/result`);
      } else {
        // Fetch next adaptive question
        const res = await api.getNextQuestion(id);
        if (res.finished || !res.question) {
          await api.completeInterview(id);
          navigate(`/interview/${id}/result`);
        } else {
          setCurrentQuestion(res.question);
          setUserAnswer('');
          setEvaluation(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    } catch (err: any) {
      console.error('Error advancing question:', err);
      setError(err.message || 'Failed to proceed to next question.');
    } finally {
      setIsLoadingNext(false);
    }
  };

  const handleExitConfirm = async () => {
    if (id) {
      try {
        await api.completeInterview(id);
        navigate(`/interview/${id}/result`);
      } catch {
        navigate('/dashboard');
      }
    } else {
      navigate('/dashboard');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080B14] p-6 flex flex-col items-center justify-center space-y-4 text-slate-100 font-sans">
        <div className="relative w-14 h-14 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-purple-400" />
          <span className="w-4 h-4 rounded-full bg-cyan-400 absolute animate-ping" />
        </div>
        <p className="text-sm font-medium text-slate-300">
          Preparing your Apple Glassmorphism mock interview room...
        </p>
      </div>
    );
  }

  if (error && !interview) {
    return (
      <div className="min-h-screen bg-[#080B14] p-6 flex flex-col items-center justify-center text-center space-y-4 text-slate-100 font-sans">
        <div className="w-12 h-12 rounded-2xl glass-card border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(244,63,94,0.3)]">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white">Interview Session Unavailable</h2>
        <p className="text-xs text-slate-400 max-w-sm">{error}</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="glass-primary-btn text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const isLastQuestion = (currentQuestion?.question_number || 1) >= (interview?.total_questions || 5);

  return (
    <div className="min-h-screen bg-[#080B14] text-slate-100 py-6 px-4 sm:px-6 lg:px-8 font-sans relative overflow-x-hidden pb-36">
      
      {/* Ambient Specular & Siri-style Glow Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[620px] h-[520px] rounded-full bg-purple-600/10 blur-[150px]" />
        <div className="absolute top-1/3 -right-24 w-[540px] h-[540px] rounded-full bg-cyan-500/10 blur-[160px]" />
        <div className="absolute -bottom-36 left-1/3 w-[680px] h-[500px] rounded-full bg-emerald-500/10 blur-[170px]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        
        {/* Top Session Bar / HUD Navigation (Frosted Dynamic Island Style) */}
        {interview && currentQuestion && (
          <InterviewHeader
            currentQuestion={currentQuestion.question_number}
            totalQuestions={interview.total_questions}
            role={interview.role}
            difficulty={interview.difficulty}
            interviewType={interview.interview_type}
            elapsedSeconds={elapsedSeconds}
            onExit={() => setShowExitModal(true)}
          />
        )}

        {/* Global Error Notice */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2 backdrop-blur-md">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Primary Split Workspace: AI Interviewer (5 cols) vs Candidate Workspace (7 cols) */}
        {currentQuestion && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT PANEL: AI Interviewer Stream & Dynamic Question Module (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <QuestionCard question={currentQuestion} />
            </div>

            {/* RIGHT PANEL: Candidate Multimodal Response Workspace & Evaluation (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {!evaluation ? (
                <AnswerEditor
                  value={userAnswer}
                  onChange={setUserAnswer}
                  onSubmit={handleSubmitAnswer}
                  isSubmitting={isSubmitting}
                  disabled={isSubmitting}
                />
              ) : (
                <EvaluationFeedback
                  evaluation={evaluation}
                  onNext={handleNextQuestion}
                  isLoadingNext={isLoadingNext}
                  isLastQuestion={isLastQuestion}
                />
              )}
            </div>

          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* FLOATING IOS GLASSMORPHIC CONTROL DOCK (STICKY HUD AT BOTTOM)             */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 inset-x-0 flex justify-center items-center pointer-events-none z-40 px-4 sm:px-6">
        <div className="glass-dock rounded-full px-4 py-2.5 flex items-center justify-between gap-3 sm:gap-4 pointer-events-auto max-w-3xl w-full border border-white/20 shadow-2xl">
          
          {/* Audio Input & Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMicActive(!isMicActive)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill transition-all cursor-pointer ${
                isMicActive ? 'text-emerald-400 border-emerald-500/30' : 'text-slate-400'
              }`}
              title="Toggle Microphone"
            >
              <Mic className={`w-4 h-4 ${isMicActive ? 'animate-pulse text-emerald-400' : 'text-slate-400'}`} />
              <span className="text-xs font-mono font-medium hidden sm:inline">
                {isMicActive ? 'Mic Active' : 'Mic Muted'}
              </span>
            </button>

            <button
              onClick={() => setIsTimerPaused(!isTimerPaused)}
              className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              title={isTimerPaused ? 'Resume Session Timer' : 'Pause Session Timer'}
            >
              {isTimerPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Center Waveform Pill Indicator */}
          <div className="hidden md:flex items-center gap-2 glass-panel-subtle px-3 py-1 rounded-full border border-white/10 text-slate-300 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Stream Stable • 48kHz</span>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2">
            {!evaluation ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={isSubmitting || userAnswer.trim().length < 10}
                className="flex items-center gap-2 text-xs font-semibold glass-primary-btn text-white px-5 py-2 rounded-full shadow-[0_4px_18px_rgba(118,87,255,0.45)] border border-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>{isSubmitting ? 'Evaluating...' : 'Submit Answer'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                disabled={isLoadingNext}
                className="flex items-center gap-2 text-xs font-semibold glass-primary-btn text-white px-5 py-2 rounded-full shadow-[0_4px_18px_rgba(118,87,255,0.45)] border border-white/20 transition-all cursor-pointer disabled:opacity-50"
              >
                <span>{isLoadingNext ? 'Loading...' : isLastQuestion ? 'View Final Report' : 'Continue'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* EXIT INTERVIEW CONFIRMATION MODAL                                         */}
      {/* ========================================================================= */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border border-white/15 animate-slide-up text-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl glass-pill text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30 shadow-[0_0_16px_rgba(251,191,36,0.2)]">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Leave Mock Interview?</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Your session progress up to Question {currentQuestion?.question_number || 1} will be saved.
                </p>
              </div>
            </div>

            <div className="p-3.5 glass-panel-subtle rounded-2xl text-xs text-slate-300 space-y-1.5 border border-white/5">
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Current Question:</span>
                <span className="text-white font-mono font-semibold">
                  {currentQuestion?.question_number || 1} of {interview?.total_questions || 5}
                </span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Time Elapsed:</span>
                <span className="text-white font-mono font-semibold">
                  {Math.floor(elapsedSeconds / 60)}m {elapsedSeconds % 60}s
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowExitModal(false)}
                className="px-4 py-2 rounded-full text-xs font-medium text-slate-300 hover:bg-white/10 transition-colors cursor-pointer"
              >
                Cancel & Continue Session
              </button>
              <button
                onClick={handleExitConfirm}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-rose-600/90 hover:bg-rose-600 text-white shadow-lg transition-all cursor-pointer"
              >
                Exit & Generate Report
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Interview;
