import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  PlayCircle,
  FileText,
  Briefcase,
  User,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      label: 'Home',
      path: '/dashboard',
      icon: LayoutDashboard,
      isActive: location.pathname === '/dashboard',
    },
    {
      label: 'Interview',
      path: '/interview/setup',
      icon: PlayCircle,
      isActive: location.pathname.startsWith('/interview'),
    },
    {
      label: 'Resume',
      path: '/resume',
      icon: FileText,
      isActive: location.pathname === '/resume',
    },
    {
      label: 'Jobs',
      path: '/jobs',
      icon: Briefcase,
      isActive: location.pathname === '/jobs',
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: User,
      isActive: location.pathname === '/profile',
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[rgba(6,11,24,0.92)] backdrop-blur-2xl border-t border-white/[0.08] shadow-[0_-8px_32px_rgba(0,0,0,0.6)] px-2 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'group flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all duration-200 relative select-none',
                item.isActive
                  ? 'text-sky-400 font-semibold'
                  : 'text-slate-500 hover:text-slate-300'
              )}
            >
              {/* Active glow pill */}
              {item.isActive && (
                <span className="absolute -top-1 w-8 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full shadow-[0_0_10px_rgba(56,171,248,0.8)] animate-fade-in" />
              )}

              <div
                className={cn(
                  'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200',
                  item.isActive
                    ? 'bg-sky-500/15 border border-sky-500/30 shadow-[0_0_12px_rgba(56,171,248,0.25)] scale-105'
                    : 'group-hover:bg-white/[0.04]'
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 transition-transform',
                    item.isActive ? 'text-sky-300' : 'text-slate-400 group-hover:text-slate-200'
                  )}
                />
              </div>

              <span
                className={cn(
                  'text-[10px] tracking-tight mt-0.5 transition-colors',
                  item.isActive ? 'text-sky-300 font-bold' : 'text-slate-400 font-medium'
                )}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
