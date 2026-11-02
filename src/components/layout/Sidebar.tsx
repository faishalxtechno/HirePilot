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
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Start Interview', path: '/interview/setup', icon: PlayCircle },
    { label: 'Interview History', path: '/history', icon: History },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <aside className="w-64 h-full flex flex-col justify-between border-r border-white/10 bg-[#060317] px-4 py-5 select-none shadow-[inset_0_0_24px_rgba(255,255,255,0.02)]">
      {/* Top Brand & Navigation */}
      <div className="space-y-6">
        {/* Brand */}
        <div className="px-2">
          <HirePilotLogo variant="sidebar" asLink to="/dashboard" />
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
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-[5px] text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-[#10093a] text-[#f4f0ff] border border-white/10 shadow-[inset_0_0_12px_rgba(255,255,255,0.03)]'
                    : 'text-[#918ea0] hover:bg-white/[0.04] hover:text-[#f4f0ff]'
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
      <div className="space-y-4 pt-4 border-t border-white/10">
        {/* Monthly Quota Indicator */}
        <div className="p-3.5 rounded-[12px] bg-[#030014] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-[#f4f0ff] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#9382ff]" />
              Monthly Quota
            </span>
            <span className="font-mono text-[11px] font-medium text-[#9382ff]">
              {monthlyRemaining} / {monthlyMax}
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#10093a] rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-[#5046e4] rounded-full transition-all duration-300"
              style={{ width: `${(monthlyRemaining / monthlyMax) * 100}%` }}
            />
          </div>
          <p className="text-[11px] text-[#918ea0]">
            {monthlyRemaining === 0 ? 'Limit reached this month' : `${monthlyRemaining} free interviews left this month`}
          </p>
        </div>

        {/* User Profile Card */}
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#10093a] text-[#f4f0ff] border border-white/10 flex items-center justify-center text-xs font-medium shrink-0">
              {profile?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#f4f0ff] truncate">
                {profile?.name || 'Candidate'}
              </p>
              <p className="text-[11px] text-[#918ea0] truncate">
                {profile?.email || 'Logged in'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              signOut();
              navigate('/login');
            }}
            className="p-1.5 rounded-[5px] text-[#918ea0] hover:text-rose-400 hover:bg-white/[0.04] transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
