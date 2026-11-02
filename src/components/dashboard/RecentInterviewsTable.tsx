import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Interview } from '../../types';
import { formatDate, getScoreBadgeBg, getScoreColor } from '../../lib/utils';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Play } from 'lucide-react';

export const RecentInterviewsTable: React.FC<{ interviews: Interview[] }> = ({ interviews }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Interviews</CardTitle>
          <CardDescription>Your latest mock sessions and evaluation scores</CardDescription>
        </div>
        <Link to="/history">
          <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {interviews.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#10093a] text-[#9382ff] border border-white/10 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#f4f0ff]">No interviews completed yet</p>
              <p className="text-xs text-[#a8a6b7] mt-0.5">Start your first AI mock interview to generate reports and track progress.</p>
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
              <thead className="bg-[#030014] text-[#918ea0] border-b border-white/10 uppercase tracking-wider font-medium">
                <tr>
                  <th className="px-6 py-3.5">Role</th>
                  <th className="px-6 py-3.5">Type</th>
                  <th className="px-6 py-3.5">Difficulty</th>
                  <th className="px-6 py-3.5">Score</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-[#a8a6b7]">
                {interviews.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-medium text-[#f4f0ff]">
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
                        <span className={`font-mono font-medium px-2 py-0.5 rounded-[5px] border text-xs ${getScoreBadgeBg(item.score)}`}>
                          {item.score}%
                        </span>
                      ) : (
                        <Badge variant="default" size="sm">In Progress</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-[#918ea0]">
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
