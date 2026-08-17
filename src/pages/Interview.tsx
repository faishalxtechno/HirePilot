import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../lib/api';
import { Interview as IInterview, Question, AnswerEvaluation } from '../types';
import { InterviewHeader } from '../components/interview/InterviewHeader';
import { QuestionCard } from '../components/interview/QuestionCard';
import { AnswerEditor } from '../components/interview/AnswerEditor';
import { EvaluationFeedback } from '../components/interview/EvaluationFeedback';
import { Skeleton } from '../components/ui/Skeleton';
import { AlertCircle, Loader2 } from 'lucide-react';
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
  const [isLoadingNext, setIsLoadingNext] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
    if (!id || !currentQuestion || !userAnswer.trim()) return;

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
    if (!id || !interview) return;

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
          // Scroll up smoothly
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Preparing your AI mock interview room...
        </p>
      </div>
    );
  }

  if (error && !interview) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Interview Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm">{error}</p>
        <Button variant="primary" size="md" onClick={() => navigate('/dashboard')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  const isLastQuestion = (currentQuestion?.question_number || 1) >= (interview?.total_questions || 10);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Sticky/Fixed Header */}
        {interview && currentQuestion && (
          <InterviewHeader
            currentQuestion={currentQuestion.question_number}
            totalQuestions={interview.total_questions}
            role={interview.role}
            difficulty={interview.difficulty}
            interviewType={interview.interview_type}
          />
        )}

        {/* Global Error Notice */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* AI Interviewer Question Card */}
        {currentQuestion && <QuestionCard question={currentQuestion} />}

        {/* Answer Textarea (Shown if not yet evaluated) */}
        {!evaluation && (
          <AnswerEditor
            value={userAnswer}
            onChange={setUserAnswer}
            onSubmit={handleSubmitAnswer}
            isSubmitting={isSubmitting}
            disabled={isSubmitting}
          />
        )}

        {/* Answer Evaluation Breakdown (Shown after submission) */}
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
  );
};
