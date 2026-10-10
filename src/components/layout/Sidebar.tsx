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
  Zap,
  FileText,
  Briefcase,
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
    { label: 'Resume Analyzer', path: '/resume', icon: FileText },
    { label: 'Jobs', path: '/jobs', icon: Briefcase },
    { label: 'History', path: '/history', icon: History },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <aside
      className={cn(
        'h-full flex flex-col justify-between p-4 select-none transition-colors border-y-0 border-l-0 border-r border-white/10',
        isMobileDrawer
          ? 'w-full bg-[#0D1220]'
          : 'w-64 glass-panel bg-[#080B14]/85 backdrop-blur-2xl'
      )}
    >
      {/* Top Brand & Navigation */}
      <div className="flex flex-col gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3 px-2 py-1">
          <Link to="/" className="flex items-center gap-2.5 group focus:outline-none" aria-label="HirePilot Home">
            <img
              src="/assets/hirepilot-logo.png"
              alt="HirePilot Brand Logo"
              className="h-8 w-auto object-contain drop-shadow-[0_2px_8px_rgba(118,87,255,0.4)] transition-transform duration-200 group-hover:scale-105"
            />
            <span className="font-semibold text-lg tracking-tight text-white font-sans">
              HirePilot
            </span>
          </Link>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[13px] font-medium transition-all duration-200 group',
                  isActive
                    ? 'glass-primary-btn text-white font-semibold shadow-[0_4px_18px_rgba(118,87,255,0.4)]'
                    : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
                )
              }
            >
              <item.icon className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Profile, Copilot Engine & Logout */}
      <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
        {/* Copilot Engine Bento Tile */}
        <div className="p-3.5 glass-card rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Copilot Engine
            </span>
            <span className="text-[11px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              v3.4 Active
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">
              AI Mock credits: <strong className="text-white">{monthlyRemaining}</strong> / {monthlyMax}
            </span>
          </div>

          <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, (monthlyRemaining / monthlyMax) * 100))}%` }}
            />
          </div>

          <Link
            to="/#pricing"
            onClick={onCloseMobile}
            className="block text-center text-xs font-medium glass-btn text-slate-200 hover:text-white py-1.5 rounded-xl transition-all"
          >
            Upgrade Tier
          </Link>
        </div>

        {/* User Profile Card */}
        <div className="flex items-center justify-between px-1">
          <Link
            to="/profile"
            onClick={onCloseMobile}
            className="flex items-center gap-3 min-w-0 group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shrink-0 overflow-hidden border border-white/20 shadow-[0_2px_8px_rgba(118,87,255,0.3)]">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.name || 'User'} className="w-full h-full object-cover" />
              ) : (
                profile?.name?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
                {profile?.name || 'Candidate'}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {profile?.target_role || 'Software Engineer'}
              </p>
            </div>
          </Link>
          <button
            onClick={() => {
              signOut();
              navigate('/');
            }}
            title="Logout"
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
