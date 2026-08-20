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
  isMobileDrawer?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  monthlyRemaining = 3,
  monthlyMax = 3,
  onCloseMobile,
  isMobileDrawer = false,
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
    <aside
      className={cn(
        'h-full flex flex-col justify-between px-4 py-5 select-none transition-colors',
        isMobileDrawer
          ? 'w-full bg-[rgba(12,20,37,0.98)]'
          : 'w-64 border-r border-white/[0.06] bg-[rgba(6,11,24,0.6)] backdrop-blur-xl'
      )}
    >
      {/* Top Brand & Navigation */}
      <div className="space-y-6">
        {/* Brand (only shown when not in mobile drawer) */}
        {!isMobileDrawer && (
          <Link to="/" className="px-3 flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              Hire<span className="text-sky-400">Pilot</span>
            </span>
          </Link>
        )}

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
                    ? 'bg-sky-500/10 text-sky-300 font-semibold border border-sky-500/15 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-sky-400 before:rounded-r-full'
                    : 'text-slate-500 hover:bg-white/[0.04] hover:text-slate-300'
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
      <div className="space-y-4 pt-4 border-t border-white/[0.06]">
        {/* Monthly Quota Indicator */}
        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              Monthly Quota
            </span>
            <span className="font-mono text-[11px] font-bold text-sky-400">
              {monthlyRemaining} / {monthlyMax}
            </span>
          </div>
          <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(56,171,248,0.3)]"
              style={{ width: `${Math.min(100, Math.max(0, (monthlyRemaining / monthlyMax) * 100))}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500">
            {monthlyRemaining === 0 ? 'Monthly limit reached' : `${monthlyRemaining} free mock sessions left this month`}
          </p>
        </div>

        {/* User Profile Card */}
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400/80 to-blue-600/80 flex items-center justify-center text-xs font-bold text-white shrink-0 overflow-hidden">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                profile?.name?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {profile?.name || 'Candidate'}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
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
            className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
