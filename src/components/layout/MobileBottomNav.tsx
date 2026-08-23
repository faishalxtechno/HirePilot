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
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-black/90 backdrop-blur-xl border-t border-white/5 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto relative pt-1.5 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'group flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all duration-300 relative select-none',
                item.isActive
                  ? 'text-white font-medium'
                  : 'text-brand-muted hover:text-brand-secondary'
              )}
            >
              {/* Active indicator */}
              {item.isActive && (
                <span className="absolute -top-1.5 w-6 h-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              )}

              <div
                className={cn(
                  'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300',
                  item.isActive
                    ? 'bg-white/10 scale-105'
                    : 'group-hover:bg-white/5'
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 transition-transform',
                    item.isActive ? 'text-white' : 'text-brand-muted group-hover:text-brand-secondary'
                  )}
                />
              </div>

              <span
                className={cn(
                  'text-[10px] tracking-tight mt-1 transition-colors',
                  item.isActive ? 'text-white font-semibold' : 'text-brand-muted font-medium'
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
