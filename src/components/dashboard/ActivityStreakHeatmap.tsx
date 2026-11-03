import React from 'react';
import { Flame, Clock, Calendar } from 'lucide-react';

interface ActivityStreakHeatmapProps {
  currentStreak: number;
  interviewsCompleted: number;
}

export const ActivityStreakHeatmap: React.FC<ActivityStreakHeatmapProps> = ({
  currentStreak,
  interviewsCompleted,
}) => {
  // 7 days of the week: Sun to Sat
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // 6 intensity/hour buckets: 4.5h, 3.5h, 2.5h, 1.5h, 0.5h, 0h
  const hoursLabels = ['4h', '3h', '2h', '1h', '0h'];

  // Simulated dynamic matrix based on streak & interview history
  // Shading classes for purple cells
  const getCellClass = (colIdx: number, rowIdx: number) => {
    // Determine active cells based on current streak and day
    const todayDayOfWeek = new Date().getDay(); // 0 is Sun, 6 is Sat
    const isActiveDay = (todayDayOfWeek - colIdx + 7) % 7 < Math.max(1, currentStreak);

    if (isActiveDay && rowIdx >= 2) {
      if (rowIdx === 2) return 'bg-[#7C3AED] shadow-2xs'; // darkest purple
      if (rowIdx === 3) return 'bg-[#9382FF]';
      return 'bg-[#C4B5FD]';
    }

    if (colIdx % 2 === 0 && rowIdx === 4 && interviewsCompleted > 0) {
      return 'bg-[#EDE9FE]';
    }

    return 'bg-slate-100/90';
  };

  const estimatedHours = (interviewsCompleted * 0.75 + currentStreak * 0.5).toFixed(1);

  return (
    <div className="h-full rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
        <div>
          <h3 className="text-sm font-semibold text-[#111827] flex items-center gap-1.5">
            <span>Activity Streak</span>
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          </h3>
          <p className="text-[11px] text-[#64748B]">
            Weekly practice intensity heat grid
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[10px] text-[#64748B]">
          <span>Less</span>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-[3px] bg-slate-100" />
            <span className="w-2.5 h-2.5 rounded-[3px] bg-[#C4B5FD]" />
            <span className="w-2.5 h-2.5 rounded-[3px] bg-[#9382FF]" />
            <span className="w-2.5 h-2.5 rounded-[3px] bg-[#7C3AED]" />
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Grid */}
      <div className="my-3 flex items-stretch gap-2.5">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between text-[10px] text-[#94A3B8] font-mono pr-1 select-none py-1">
          {hoursLabels.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>

        {/* Matrix columns */}
        <div className="flex-1 grid grid-cols-7 gap-1.5">
          {days.map((day, colIdx) => (
            <div key={day} className="flex flex-col gap-1.5 items-center">
              {hoursLabels.map((_, rowIdx) => (
                <div
                  key={rowIdx}
                  className={`w-full aspect-square rounded-[5px] transition-all duration-200 ${getCellClass(
                    colIdx,
                    rowIdx
                  )} hover:ring-2 hover:ring-[#7C3AED]/40 cursor-default`}
                  title={`${day}: Activity logged`}
                />
              ))}
              <span className="text-[9px] font-semibold text-[#94A3B8] mt-1">
                {day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer metric */}
      <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Practice logged</span>
        </span>
        <span className="font-semibold text-[#111827] font-mono">
          {estimatedHours} hrs this cycle
        </span>
      </div>
    </div>
  );
};

