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
  if (score >= 85) return 'text-emerald-400';
  if (score >= 70) return 'text-sky-400';
  if (score >= 50) return 'text-amber-400';
  return 'text-rose-400';
}

export function getScoreBadgeBg(score: number): string {
  if (score >= 85) return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25';
  if (score >= 70) return 'bg-sky-500/15 text-sky-300 border-sky-500/25';
  if (score >= 50) return 'bg-amber-500/15 text-amber-300 border-amber-500/25';
  return 'bg-rose-500/15 text-rose-300 border-rose-500/25';
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
