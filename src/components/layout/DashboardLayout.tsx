import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { Menu, X, Triangle, AlertCircle } from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [quotaInfo, setQuotaInfo] = useState<{ remaining: number; max: number }>({ remaining: 3, max: 3 });

  useEffect(() => {
    api.getDashboardData()
      .then((data) => {
        if (data?.stats) {
          setQuotaInfo({
            remaining: data.stats.monthlyRemaining,
            max: data.stats.monthlyMax,
          });
        }
      })
      .catch((err) => console.warn('Could not refresh quota in layout:', err));
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileSidebarOpen]);

  return (
    <div className="flex h-screen w-full bg-black overflow-hidden font-sans">
      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block shrink-0 h-full">
        <Sidebar
          monthlyRemaining={quotaInfo.remaining}
          monthlyMax={quotaInfo.max}
        />
      </div>

      {/* Mobile Drawer with Backdrop */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer Container */}
          <div className="relative z-10 w-72 max-w-[85vw] h-full bg-[#121212] border-r border-white/10 flex flex-col transition-transform duration-300">
            {/* Mobile Close Button Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/5 shrink-0">
              <Link
                to="/"
                onClick={() => setMobileSidebarOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <Triangle className="w-4 h-4 text-black fill-black" />
                </div>
                <span className="font-medium text-lg text-white">
                  HirePilot
                </span>
              </Link>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-2 rounded-full text-brand-muted hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto">
              <Sidebar
                monthlyRemaining={quotaInfo.remaining}
                monthlyMax={quotaInfo.max}
                onCloseMobile={() => setMobileSidebarOpen(false)}
                isMobileDrawer
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* Mobile Header Bar */}
        <header className="lg:hidden flex items-center justify-between px-4 h-16 bg-black/80 border-b border-white/5 backdrop-blur-xl shrink-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 -ml-2 rounded-full text-brand-secondary hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                <Triangle className="w-3.5 h-3.5 text-black fill-black" />
              </div>
              <span className="font-medium text-base text-white">
                HirePilot
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-white/5 text-white border border-white/10">
              {quotaInfo.remaining} Left
            </div>

            <Link
              to="/profile"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-black overflow-hidden border border-white/10"
              title="Profile"
            >
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.name || 'User'} className="w-full h-full object-cover" />
              ) : (
                profile?.name?.charAt(0).toUpperCase() || 'U'
              )}
            </Link>
          </div>
        </header>

        {/* Quota Exhausted Warning Notice */}
        {quotaInfo.remaining === 0 && (
          <div className="bg-[#1a0505] border-b border-red-500/20 px-4 py-2.5 flex items-center justify-center gap-2 text-xs text-red-400 shrink-0">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              You have reached your 3 free interviews limit for this month. Quota resets on the 1st of next month.
            </span>
          </div>
        )}

        {/* Scrollable Page Body with bottom padding for Mobile Bottom Navigation */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-8 max-w-5xl w-full mx-auto">
          {children}
        </main>

        {/* Fixed Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>
    </div>
  );
};
