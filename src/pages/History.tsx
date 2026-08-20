import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { Interview } from '../types';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { formatDate, getScoreBadgeBg } from '../lib/utils';
import {
  Search,
  PlusCircle,
  FileText,
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Interview History
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Review past AI evaluations, track your score progression, and inspect detailed question feedback.
            </p>
          </div>

          <Link to="/interview/setup" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full sm:w-auto shadow-md shadow-sky-500/25" leftIcon={<PlusCircle className="w-4 h-4" />}>
              Start New Interview
            </Button>
          </Link>
        </div>

        {/* Filter Toolbar */}
        <Card className="p-4 sm:p-5">
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
                { value: 'all', label: 'All Interview Types' },
                { value: 'technical', label: 'Technical' },
                { value: 'dsa', label: 'DSA' },
                { value: 'behavioral', label: 'Behavioral' },
                { value: 'hr', label: 'HR' },
                { value: 'mixed', label: 'Mixed' },
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle>Completed & Active Sessions</CardTitle>
              <CardDescription>
                Showing {filteredInterviews.length} of {interviews.length} recorded mock interviews
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filteredInterviews.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 mx-auto">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    No matching interviews found
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Try adjusting your filters or launch a new mock interview session.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/[0.02] text-slate-400 border-b border-white/[0.06] uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="px-6 py-3.5">Date</th>
                      <th className="px-6 py-3.5">Role</th>
                      <th className="px-6 py-3.5">Type</th>
                      <th className="px-6 py-3.5">Difficulty</th>
                      <th className="px-6 py-3.5">Score</th>
                      <th className="px-6 py-3.5">Status</th>
                      <th className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04] text-slate-300">
                    {filteredInterviews.map((item) => (
                      <tr key={item.id} className="hover:bg-white/[0.04] transition-colors">
                        <td className="px-6 py-4 text-slate-400 font-mono">
                          {formatDate(item.started_at)}
                        </td>
                        <td className="px-6 py-4 font-bold text-white">
                          {item.role}
                        </td>
                        <td className="px-6 py-4 capitalize font-medium">
                          {item.interview_type}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={
                              item.difficulty === 'hard'
                                ? 'danger'
                                : item.difficulty === 'medium'
                                ? 'warning'
                                : 'success'
                            }
                            size="sm"
                            className="capitalize"
                          >
                            {item.difficulty}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          {item.score != null ? (
                            <span className={`font-mono font-bold px-2 py-0.5 rounded-md border text-xs ${getScoreBadgeBg(item.score)}`}>
                              {item.score}%
                            </span>
                          ) : (
                            <span className="text-slate-500 italic">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={item.status === 'completed' ? 'success' : 'default'}
                            size="sm"
                            className="capitalize"
                          >
                            {item.status === 'completed' ? 'Completed' : 'In Progress'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {item.status === 'completed' ? (
                            <Link to={`/interview/${item.id}/result`}>
                              <Button variant="outline" size="sm">
                                View Report
                              </Button>
                            </Link>
                          ) : (
                            <Link to={`/interview/${item.id}`}>
                              <Button variant="primary" size="sm">
                                Resume
                              </Button>
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};
