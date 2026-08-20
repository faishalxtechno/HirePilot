import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { InterviewReport, Interview } from '../types';
import { ReportView } from '../components/interview/ReportView';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const InterviewResult: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [report, setReport] = useState<InterviewReport | null>(null);
  const [interview, setInterview] = useState<Interview | null>(null);
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

      if (data.report) {
        setReport(data.report);
      } else {
        // If not completed yet, trigger completion
        const completedData = await api.completeInterview(interviewId);
        setReport(completedData.report);
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
          <Loader2 className="w-8 h-8 animate-spin text-sky-400" />
          <p className="text-sm font-medium text-slate-400">
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
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Report Unavailable</h2>
          <p className="text-xs text-slate-400">{error || 'Could not load interview report.'}</p>
          <Button variant="primary" size="md" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ReportView report={report} interview={interview || undefined} />
    </DashboardLayout>
  );
};
