import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { InterviewReport, Interview, Question, Answer } from '../types';
import { ReportView } from '../components/interview/ReportView';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const InterviewResult: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [report, setReport] = useState<InterviewReport | null>(null);
  const [interview, setInterview] = useState<Interview | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    loadReport(id);
  }, [id]);

  const loadReport = async (interviewId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await api.getInterview(interviewId);
      setInterview(data.interview);
      if (data.questions) setQuestions(data.questions);
      if (data.answers) setAnswers(data.answers);

      if (data.report) {
        setReport(data.report);
      } else {
        // If not completed yet, trigger completion
        const completedData = await api.completeInterview(interviewId);
        setReport(completedData.report);
        if (completedData.interview) setInterview(completedData.interview);
      }
    } catch (err: any) {
      console.error('Error fetching interview report:', err);
      setError(err.message || 'Report not found for this interview session.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="py-24 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#2563EB]" />
          <p className="text-sm font-medium text-[#64748B]">
            Synthesizing final evaluation report with Gemini AI...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !report) {
    return (
      <DashboardLayout>
        <div className="py-24 text-center space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#111827]">Report Unavailable</h2>
          <p className="text-xs text-[#64748B]">{error || 'Could not load interview report.'}</p>
          <Button variant="primary" size="md" onClick={() => navigate('/dashboard')} className="bg-[#2563EB]">
            Back to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ReportView
        report={report}
        interview={interview || undefined}
        questions={questions}
        answers={answers}
      />
    </DashboardLayout>
  );
};

export default InterviewResult;
