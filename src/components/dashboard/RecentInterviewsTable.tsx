import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Interview } from '../../types';
import { formatDate, getScoreBadgeBg } from '../../lib/utils';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Play } from 'lucide-react';

export const RecentInterviewsTable: React.FC<{ interviews: Interview[] }> = ({ interviews }) => {
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <CardTitle>Recent Interviews</CardTitle>
          <CardDescription>Your latest mock sessions and evaluation scores</CardDescription>
        </div>
        <Link to="/history" className="self-start sm:self-auto">
          <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {interviews.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">No interviews completed yet</p>
              <p className="text-xs text-slate-500 mt-0.5">Start your first AI mock interview to generate reports and track progress.</p>
            </div>
            <Link to="/interview/setup">
              <Button variant="primary" size="sm" leftIcon={<Play className="w-3.5 h-3.5" />}>
                Start New Interview
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.02] text-slate-400 border-b border-white/[0.06] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-6 py-3.5">Role</th>
                  <th className="px-6 py-3.5">Type</th>
                  <th className="px-6 py-3.5">Difficulty</th>
                  <th className="px-6 py-3.5">Score</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-slate-300">
                {interviews.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.04] transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">
                      {item.role}
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize">{item.interview_type}</span>
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
                        <Badge variant="default" size="sm">In Progress</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {formatDate(item.started_at)}
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
  );
};
