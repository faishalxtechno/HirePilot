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
  Triangle,
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
        'h-full flex flex-col justify-between px-4 py-6 select-none transition-colors',
        isMobileDrawer
          ? 'w-full bg-[#121212]'
          : 'w-64 border-r border-white/10 bg-black'
      )}
    >
      {/* Top Brand & Navigation */}
      <div className="space-y-8">
        {/* Brand (only shown when not in mobile drawer) */}
        {!isMobileDrawer && (
          <Link to="/" className="px-3 flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Triangle className="w-5 h-5 text-black fill-black" />
            </div>
            <span className="font-medium text-xl text-white tracking-tight">
              HirePilot
            </span>
          </Link>
        )}

        {/* Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                cn(
                  'sidebar-link relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 group',
                  isActive
                    ? 'active-link bg-white/10 text-white border border-white/10'
                    : 'text-brand-secondary hover:bg-white/5 hover:text-white border border-transparent'
                )
              }
            >
              <item.icon className="w-4 h-4 shrink-0 sidebar-icon transition-transform duration-300" />
              <span className="sidebar-label transition-transform duration-300">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Profile, Quota & Logout */}
      <div className="space-y-5 pt-5 border-t border-white/10">
        {/* Monthly Quota Indicator */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-brand-secondary flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-white" />
              Monthly Quota
            </span>
            <span className="font-mono text-xs font-medium text-white">
              {monthlyRemaining} / {monthlyMax}
            </span>
          </div>
          <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, (monthlyRemaining / monthlyMax) * 100))}%` }}
            />
          </div>
          <p className="text-xs text-brand-muted">
            {monthlyRemaining === 0 ? 'Monthly limit reached' : `${monthlyRemaining} free mock sessions left`}
          </p>
        </div>

        {/* User Profile Card */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-xs font-bold text-black shrink-0 overflow-hidden border border-white/10">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                profile?.name?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {profile?.name || 'Candidate'}
              </p>
              <p className="text-[11px] text-brand-secondary truncate">
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
            className="p-2 text-brand-muted hover:text-white rounded-full hover:bg-white/5 transition-colors shrink-0 cursor-pointer icon-button"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
