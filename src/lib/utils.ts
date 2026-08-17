import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString?: string): string {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatTimeAgo(dateString?: string): string {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(dateString);
}

export function getScoreColor(score: number): string {
  if (score >= 85) return 'text-emerald-600 dark:text-emerald-400';
  if (score >= 70) return 'text-brand-600 dark:text-brand-400';
  if (score >= 50) return 'text-amber-600 dark:text-amber-400';
  return 'text-rose-600 dark:text-rose-400';
}

export function getScoreBadgeBg(score: number): string {
  if (score >= 85) return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';
  if (score >= 70) return 'bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-950/40 dark:text-brand-300 dark:border-brand-800';
  if (score >= 50) return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';
  return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800';
}

export function getScoreVerdict(score: number): { label: string; desc: string; color: string } {
  if (score >= 85) {
    return {
      label: 'Strong Hire',
      desc: 'Outstanding performance. Strong technical foundations, clear articulation, and deep problem-solving skills.',
      color: 'emerald',
    };
  }
  if (score >= 70) {
    return {
      label: 'Hire',
      desc: 'Solid performance. Demonstrates good competence with minor areas for refinement in advanced scenarios.',
      color: 'brand',
    };
  }
  if (score >= 55) {
    return {
      label: 'Leaning Hire',
      desc: 'Good fundamentals demonstrated. Needs more concrete examples, edge-case analysis, and structured practice.',
      color: 'amber',
    };
  }
  return {
    label: 'Needs Practice',
    desc: 'Foundational concepts require review. Focus on core topics, STAR method responses, and fundamental problem-solving.',
    color: 'rose',
  };
}
