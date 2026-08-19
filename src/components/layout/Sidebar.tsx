import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  PlayCircle,
  History,
  User,
  LogOut,
  Sparkles,
  Zap,
} from 'lucide-react';

interface SidebarProps {
  monthlyRemaining?: number;
  monthlyMax?: number;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  monthlyRemaining = 3,
  monthlyMax = 3,
  onCloseMobile,
}) => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Start Interview', path: '/interview/setup', icon: PlayCircle },
    { label: 'Interview History', path: '/history', icon: History },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <aside className="w-64 h-full flex flex-col justify-between border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-5 select-none transition-colors">
      {/* Top Brand & Navigation */}
      <div className="space-y-6">
        {/* Brand */}
        <Link to="/" className="px-3 flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-sm shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
            Hire<span className="text-brand-600">Pilot</span>
          </span>
        </Link>

        {/* Links */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                cn(
                  'relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-semibold shadow-xs before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-brand-600 before:rounded-r-full'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                )
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Profile, Quota & Logout */}
      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        {/* Monthly Quota Indicator */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Monthly Quota
            </span>
            <span className="font-mono text-[11px] font-bold text-brand-600 dark:text-brand-400">
              {monthlyRemaining} / {monthlyMax}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, (monthlyRemaining / monthlyMax) * 100))}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {monthlyRemaining === 0 ? 'Monthly limit reached' : `${monthlyRemaining} free mock sessions left this month`}
          </p>
        </div>

        {/* User Profile Card */}
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-200 shrink-0 overflow-hidden">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                profile?.name?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                {profile?.name || 'Candidate'}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {profile?.target_role || 'Software Engineer'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              signOut();
              navigate('/');
            }}
            title="Logout"
            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
