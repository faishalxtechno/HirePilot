import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../lib/api';
import { Interview as IInterview, Question, AnswerEvaluation } from '../types';
import { InterviewHeader } from '../components/interview/InterviewHeader';
import { QuestionCard } from '../components/interview/QuestionCard';
import { AnswerEditor } from '../components/interview/AnswerEditor';
import { EvaluationFeedback } from '../components/interview/EvaluationFeedback';
import { HirePilotLogo } from '../components/ui/HirePilotLogo';
import { AlertCircle, Loader2, Check, RotateCcw, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

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
  const [submittingStatus, setSubmittingStatus] = useState<string>('Evaluating Answer with Gemini AI...');
  const [isLoadingNext, setIsLoadingNext] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [retryAction, setRetryAction] = useState<'submit' | 'next' | null>(null);

  useEffect(() => {
    if (!id) return;
    loadInterviewData(id);
  }, [id]);

  const loadInterviewData = async (interviewId: string) => {
    setIsLoading(true);
    setError(null);

    try {
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
      setError(err.message || 'Interview session not found or access denied.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!id || !currentQuestion || !userAnswer.trim()) return;

    setIsSubmitting(true);
    setError(null);
    setRetryAction(null);
    setSubmittingStatus('Evaluating Answer with Gemini AI...');

    try {
      const evalResult = await api.submitAnswer(
        id,
        {
          question_id: currentQuestion.id,
          user_answer: userAnswer.trim(),
        },
        (statusText) => {
          setSubmittingStatus(statusText);
        }
      );
      setEvaluation(evalResult);
    } catch (err: any) {
      console.error('Error evaluating answer:', err);
      const isBusy = err.message?.includes('busy') || err.message?.includes('503') || err.message?.includes('429');
      setError(
        isBusy
          ? 'AI evaluation is temporarily busy. Your answer is preserved; please click Retry below.'
          : (err.message || 'Failed to evaluate answer. Your response is saved below; click Retry.')
      );
      setRetryAction('submit');
    } finally {
      setIsSubmitting(false);
      setSubmittingStatus('Evaluating Answer with Gemini AI...');
    }
  };

  const handleNextQuestion = async () => {
    if (!id || !interview) return;

    setIsLoadingNext(true);
    setError(null);
    setRetryAction(null);

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
          // Scroll up smoothly
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    } catch (err: any) {
      console.error('Error advancing question:', err);
      setError(err.message || 'Failed to generate next question with AI. Please retry.');
      setRetryAction('next');
    } finally {
      setIsLoadingNext(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-8 flex flex-col items-center justify-center space-y-4">
        <HirePilotLogo variant="loading" />
        <div className="flex items-center gap-2 text-sm font-medium text-[#64748B]">
          <Loader2 className="w-4 h-4 animate-spin text-[#2563EB]" />
          <span>Calibrating your AI mock interview room...</span>
        </div>
      </div>
    );
  }

  if (error && !interview) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-8 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-[#111827]">Interview Not Found</h2>
        <p className="text-xs text-[#64748B] max-w-sm">{error}</p>
        <Button variant="primary" size="md" onClick={() => navigate('/dashboard')} className="bg-[#2563EB]">
          Return to Dashboard
        </Button>
      </div>
    );
  }

  const currentQNum = currentQuestion?.question_number || 1;
  const totalQ = interview?.total_questions || 10;
  const isLastQuestion = currentQNum >= totalQ;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Sticky/Fixed Header */}
        {interview && currentQuestion && (
          <InterviewHeader
            currentQuestion={currentQNum}
            totalQuestions={totalQ}
            role={interview.role}
            difficulty={interview.difficulty}
            interviewType={interview.interview_type}
          />
        )}

        {/* Global Error Notice with Retry */}
        {error && (
          <div className="p-4 rounded-[10px] bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
            {retryAction && (
              <button
                type="button"
                onClick={retryAction === 'submit' ? handleSubmitAnswer : handleNextQuestion}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-[6px] bg-rose-600 hover:bg-rose-700 text-white font-medium transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retry</span>
              </button>
            )}
          </div>
        )}

        {/* Stepper & Content Grid (Image 1 Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Vertical Stepper Rail (Desktop) */}
          <div className="hidden lg:block lg:col-span-1 pt-4">
            <div className="flex flex-col items-center gap-2 relative">
              {Array.from({ length: totalQ }, (_, i) => i + 1).map((num) => {
                const isCurrent = num === currentQNum;
                const isCompleted = num < currentQNum || (num === currentQNum && Boolean(evaluation));

                return (
                  <div key={num} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-[#1E3A8A] text-white shadow-sm ring-4 ring-blue-100 scale-105'
                          : isCompleted
                          ? 'bg-[#16A34A] text-white'
                          : 'bg-slate-100 text-[#94A3B8] border border-[#E5E7EB]'
                      }`}
                      title={`Question ${num}`}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5" /> : num}
                    </div>

                    {/* Connecting line */}
                    {num < totalQ && (
                      <div
                        className={`w-0.5 h-4 my-1 transition-colors ${
                          num < currentQNum ? 'bg-[#16A34A]' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Question & Answer Column */}
          <div className="lg:col-span-11 space-y-6">
            {/* AI Interviewer Question Card */}
            {currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                questionNumber={currentQNum}
                totalQuestions={totalQ}
              />
            )}

            {/* Answer Editor (Shown if not yet evaluated) */}
            {!evaluation && (
              <AnswerEditor
                value={userAnswer}
                onChange={setUserAnswer}
                onSubmit={handleSubmitAnswer}
                isSubmitting={isSubmitting}
                submittingMessage={submittingStatus}
                disabled={isSubmitting}
              />
            )}

            {/* Answer Evaluation Breakdown & Suggested Answer */}
            {evaluation && (
              <EvaluationFeedback
                evaluation={evaluation}
                onNext={handleNextQuestion}
                isLoadingNext={isLoadingNext}
                isLastQuestion={isLastQuestion}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
