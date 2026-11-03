import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Calendar, ChevronDown, ListTodo } from 'lucide-react';

interface PrepTask {
  id: string;
  day: string;
  title: string;
  category: string;
  completed: boolean;
}

const STORAGE_KEY = 'hirepilot_weekly_prep_tasks';

const DEFAULT_TASKS: PrepTask[] = [
  {
    id: 'task-mon',
    day: 'Monday',
    title: 'Practice behavioral STAR questions',
    category: 'Behavioral',
    completed: true,
  },
  {
    id: 'task-tue',
    day: 'Tuesday',
    title: 'Technical system architecture & coding',
    category: 'Technical',
    completed: true,
  },
  {
    id: 'task-wed',
    day: 'Wednesday',
    title: 'Resume & portfolio ATS alignment',
    category: 'Profile',
    completed: false,
  },
  {
    id: 'task-thu',
    day: 'Thursday',
    title: 'Full simulation AI mock interview',
    category: 'Simulation',
    completed: false,
  },
  {
    id: 'task-fri',
    day: 'Friday',
    title: 'Review scorecard & answer calibration',
    category: 'Review',
    completed: false,
  },
  {
    id: 'task-sat',
    day: 'Weekend',
    title: 'Target companies & job application outreach',
    category: 'Outreach',
    completed: false,
  },
];

export const WeeklyPrepPlan: React.FC = () => {
  const [tasks, setTasks] = useState<PrepTask[]>(DEFAULT_TASKS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTasks(JSON.parse(stored));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TASKS));
      }
    } catch {
      // fallback
    }
  }, []);

  const toggleTask = (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // fallback
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="h-full rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
        <div>
          <h3 className="text-sm font-semibold text-[#111827] flex items-center gap-1.5">
            <span>Our Plans</span>
            <ListTodo className="w-3.5 h-3.5 text-[#2563EB]" />
          </h3>
          <p className="text-[11px] text-[#64748B]">
            Weekly interview preparation cadence
          </p>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-slate-50 border border-[#E5E7EB] text-[11px] font-medium text-[#111827]">
          <span>Weekly</span>
          <ChevronDown className="w-3 h-3 text-[#64748B]" />
        </div>
      </div>

      {/* Task List (Image 4 MockAI Style) */}
      <div className="my-3 space-y-2 overflow-y-auto max-h-[220px] pr-1">
        {tasks.map((task) => (
          <button
            key={task.id}
            type="button"
            onClick={() => toggleTask(task.id)}
            className={`w-full text-left p-2.5 rounded-[8px] border transition-all duration-150 flex items-start gap-2.5 group ${
              task.completed
                ? 'bg-emerald-50/60 border-emerald-200/80 text-emerald-900'
                : 'bg-white border-[#E5E7EB] hover:bg-slate-50 text-[#111827]'
            }`}
          >
            {task.completed ? (
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] fill-emerald-100 shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-4 h-4 text-[#94A3B8] group-hover:text-[#2563EB] shrink-0 mt-0.5" />
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span
                  className={`text-[11px] font-semibold ${
                    task.completed ? 'text-emerald-800' : 'text-[#64748B]'
                  }`}
                >
                  {task.day}
                </span>
                <span className="text-[9px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-[#64748B]">
                  {task.category}
                </span>
              </div>
              <p
                className={`text-xs mt-0.5 leading-snug ${
                  task.completed ? 'line-through text-emerald-700/80' : 'text-[#111827]'
                }`}
              >
                {task.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Footer Progress */}
      <div className="pt-3 border-t border-[#F1F5F9] space-y-1.5">
        <div className="flex items-center justify-between text-xs text-[#64748B]">
          <span>Weekly Completion</span>
          <span className="font-semibold text-[#111827] font-mono">
            {completedCount} of {tasks.length} ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#16A34A] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

