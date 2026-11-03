import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';
import { HirePilotLogo } from '../ui/HirePilotLogo';
import {
  LayoutDashboard,
  PlayCircle,
  History,
  User,
  LogOut,
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
  const { profile, user, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Mock Interviews', path: '/interview/setup', icon: PlayCircle },
    { label: 'Interview History', path: '/history', icon: History },
    { label: 'Profile & Targets', path: '/profile', icon: User },
  ];

  return (
    <aside className="w-64 h-full flex flex-col justify-between border-r border-[#E5E7EB] bg-white px-4 py-5 select-none transition-colors">
      {/* Top Brand & Navigation */}
      <div className="space-y-6">
        {/* Brand */}
        <div className="px-2">
          <HirePilotLogo
            variant="sidebar"
            asLink
            to="/dashboard"
            className="border-0 shadow-none p-0 bg-transparent"
            imgClassName="max-h-9 max-w-[155px]"
          />
        </div>

        {/* Links */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-[6px] text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-blue-50 text-[#2563EB] font-semibold'
                    : 'text-[#64748B] hover:bg-slate-50 hover:text-[#111827]'
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
      <div className="space-y-4 pt-4 border-t border-[#E5E7EB]">
        {/* Monthly Quota Indicator */}
        <div className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#111827] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#2563EB]" />
              Monthly Quota
            </span>
            <span className="font-mono text-[11px] font-bold text-[#2563EB]">
              {monthlyRemaining} / {monthlyMax} Left
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2563EB] rounded-full transition-all duration-300"
              style={{ width: `${(monthlyRemaining / monthlyMax) * 100}%` }}
            />
          </div>
          <p className="text-[11px] text-[#64748B]">
            {monthlyRemaining === 0 ? 'Limit reached this month' : `${monthlyRemaining} free interviews available`}
          </p>
        </div>

        {/* User Profile Card */}
        <div className="flex items-center justify-between px-1 pt-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs font-semibold shrink-0 overflow-hidden shadow-2xs">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                profile?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#111827] truncate">
                {profile?.name || user?.email?.split('@')[0] || 'Candidate'}
              </p>
              <p className="text-[11px] text-[#64748B] truncate">
                {profile?.target_role || 'Software Engineer'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              signOut();
              navigate('/');
            }}
            title="Log Out"
            className="p-1.5 rounded-[5px] text-[#64748B] hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
