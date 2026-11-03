import React from 'react';
import { cn } from '../../lib/utils';
import { CountUp } from '../motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  accentColor?: 'brand' | 'emerald' | 'amber' | 'purple';
  actionLink?: {
    label: string;
    to: string;
  };
  sparklineData?: number[]; // relative bar heights 0..100
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  accentColor = 'brand',
  actionLink,
  sparklineData = [35, 45, 60, 50, 75, 65, 85, 90],
}) => {
  const accentColors = {
    brand: {
      bg: 'bg-blue-50',
      text: 'text-[#2563EB]',
      border: 'border-blue-200',
      bar: 'bg-[#2563EB]',
      barMuted: 'bg-blue-100',
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-[#16A34A]',
      border: 'border-emerald-200',
      bar: 'bg-[#16A34A]',
      barMuted: 'bg-emerald-100',
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-[#D97706]',
      border: 'border-amber-200',
      bar: 'bg-[#D97706]',
      barMuted: 'bg-amber-100',
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-[#7C3AED]',
      border: 'border-purple-200',
      bar: 'bg-[#7C3AED]',
      barMuted: 'bg-purple-100',
    },
  };

  const currentTheme = accentColors[accentColor];

  return (
    <div className="p-5 rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between group">
      {/* Top Header: Title & Action Link / Icon */}
      <div>
        <div className="flex items-center justify-between gap-2 pb-2">
          <p className="text-xs font-medium text-[#64748B] tracking-wide">{title}</p>
          {actionLink ? (
            <Link
              to={actionLink.to}
              className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors group-hover:translate-x-0.5"
            >
              <span>{actionLink.label}</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          ) : (
            <div className={cn('p-1.5 rounded-[6px]', currentTheme.bg, currentTheme.text)}>
              {icon}
            </div>
          )}
        </div>

        {/* Main Metric Value & Trend Badge */}
        <div className="flex items-baseline justify-between gap-2 mt-1">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight font-mono">
            <CountUp value={value} duration={1100} />
          </h3>

          {trend && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border',
                trend.isPositive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              )}
            >
              {trend.isPositive ? (
                <ArrowUpRight className="w-3 h-3 text-emerald-600" />
              ) : (
                <ArrowDownRight className="w-3 h-3 text-rose-600" />
              )}
              <span>{trend.value}</span>
            </span>
          )}
        </div>
      </div>

      {/* Mini Sparkline Bar Chart & Helper Text (Inspired by Image 1 & 4) */}
      <div className="mt-4 pt-3 border-t border-[#F1F5F9] space-y-2">
        <div className="flex items-end gap-1.5 h-6">
          {sparklineData.map((height, idx) => {
            const isLast = idx === sparklineData.length - 1;
            return (
              <div
                key={idx}
                className={cn(
                  'flex-1 rounded-[2px] transition-all duration-300',
                  isLast ? currentTheme.bar : currentTheme.barMuted,
                  'hover:opacity-80'
                )}
                style={{ height: `${Math.max(15, Math.min(100, height))}%` }}
                title={`Period ${idx + 1}: ${height}%`}
              />
            );
          })}
        </div>

        {subtitle && (
          <p className="text-[11px] text-[#64748B] leading-tight line-clamp-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
