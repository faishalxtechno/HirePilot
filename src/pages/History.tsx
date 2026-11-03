import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { Interview } from '../types';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { formatDate } from '../lib/utils';
import {
  History as HistoryIcon,
  Search,
  Filter,
  PlusCircle,
  FileText,
  Play,
  RotateCcw,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    setIsLoading(true);
    try {
      const data = await api.getInterviews();
      setInterviews(data);
    } catch (err) {
      console.error('Error loading history:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter logic
  const filteredInterviews = interviews.filter((item) => {
    const matchesSearch = item.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.interview_type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'all' || item.difficulty === selectedDifficulty;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesType && matchesDifficulty && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              Interview History
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              Review past AI evaluations, inspect transcripts, and track your performance trends over time.
            </p>
          </div>

          <Link to="/interview/setup">
            <Button variant="primary" size="md" className="bg-[#2563EB] hover:bg-[#1D4ED8]" leftIcon={<PlusCircle className="w-4 h-4" />}>
              Start New Interview
            </Button>
          </Link>
        </div>

        {/* Filter Toolbar */}
        <Card className="p-4 sm:p-5 rounded-[12px] bg-white border border-[#E5E7EB] shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Role */}
            <Input
              placeholder="Search by role title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />

            {/* Type */}
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              options={[
                { value: 'all', label: 'All Interview Formats' },
                { value: 'technical', label: 'Technical' },
                { value: 'dsa', label: 'DSA' },
                { value: 'behavioral', label: 'Behavioral' },
                { value: 'hr', label: 'HR' },
                { value: 'mixed', label: 'Mixed Loop' },
              ]}
            />

            {/* Difficulty */}
            <Select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              options={[
                { value: 'all', label: 'All Difficulties' },
                { value: 'easy', label: 'Easy' },
                { value: 'medium', label: 'Medium' },
                { value: 'hard', label: 'Hard' },
              ]}
            />

            {/* Status */}
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'completed', label: 'Completed' },
                { value: 'in_progress', label: 'In Progress' },
              ]}
            />
          </div>
        </Card>

        {/* Interviews Table Card */}
        <Card className="rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs overflow-hidden">
          <div className="p-5 pb-3 border-b border-[#F1F5F9] flex flex-row items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#111827]">
                Recorded Mock Sessions
              </h3>
              <p className="text-xs text-[#64748B]">
                Showing {filteredInterviews.length} of {interviews.length} mock sessions
              </p>
            </div>
          </div>

          <div className="p-0">
            {filteredInterviews.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto border border-blue-200">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">
                    No matching interviews found
                  </p>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Adjust your filter criteria or start a new mock interview session.
                  </p>
                </div>
                <Link to="/interview/setup" className="inline-block pt-1">
                  <Button variant="primary" size="sm" className="bg-[#2563EB]">
                    Launch First Session
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FAFC] text-[#64748B] border-b border-[#E5E7EB] uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="px-6 py-3.5">Date</th>
                      <th className="px-6 py-3.5">Target Role</th>
                      <th className="px-6 py-3.5">Format</th>
                      <th className="px-6 py-3.5">Difficulty</th>
                      <th className="px-6 py-3.5">Score</th>
                      <th className="px-6 py-3.5">Status</th>
                      <th className="px-6 py-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9] text-[#111827]">
                    {filteredInterviews.map((item) => {
                      const scoreNum = Number(item.score);
                      const isCompleted = item.status === 'completed';

                      return (
                        <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-6 py-4 text-[#64748B] font-mono">
                            {formatDate(item.started_at)}
                          </td>
                          <td className="px-6 py-4 font-semibold text-[#111827]">
                            {item.role}
                          </td>
                          <td className="px-6 py-4 capitalize text-[#64748B]">
                            {item.interview_type}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-[#64748B] border border-[#E5E7EB]">
                              {item.difficulty}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {isCompleted && item.score != null ? (
                              <span
                                className={`font-mono font-bold px-2.5 py-0.5 rounded-full text-xs border ${
                                  scoreNum >= 80
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : scoreNum >= 65
                                    ? 'bg-blue-50 text-[#2563EB] border-blue-200'
                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                                }`}
                              >
                                {scoreNum}%
                              </span>
                            ) : (
                              <span className="text-slate-400 italic">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                                isCompleted
                                  ? 'bg-emerald-50 text-[#16A34A] border-emerald-200'
                                  : 'bg-blue-50 text-[#2563EB] border-blue-200'
                              }`}
                            >
                              {isCompleted ? 'Completed' : 'In Progress'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {isCompleted ? (
                              <Link to={`/interview/${item.id}/result`}>
                                <button
                                  type="button"
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8]"
                                >
                                  <span>View Report</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </Link>
                            ) : (
                              <Link to={`/interview/${item.id}`}>
                                <button
                                  type="button"
                                  className="inline-flex items-center gap-1 px-3 py-1 rounded-[6px] bg-[#2563EB] text-white text-xs font-medium hover:bg-[#1D4ED8]"
                                >
                                  <span>Resume</span>
                                </button>
                              </Link>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HistoryPage;
