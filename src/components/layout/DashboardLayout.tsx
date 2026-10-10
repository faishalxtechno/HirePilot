import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { Menu, X, AlertCircle } from 'lucide-react';
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
    <div className="flex h-screen w-full bg-[#080B14] overflow-hidden font-sans relative text-slate-100">
      {/* Ambient iOS Vision Luminous Glow Spheres */}
      <div className="fixed top-[-10%] left-[15%] w-[550px] h-[550px] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-[15%] right-[5%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[160px] pointer-events-none -z-10" />
      <div className="fixed top-[40%] right-[30%] w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[130px] pointer-events-none -z-10" />

      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block shrink-0 h-full z-40">
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
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer Container */}
          <div className="relative z-10 w-72 max-w-[85vw] h-full bg-[#0D1220] border-r border-white/10 flex flex-col transition-transform duration-300">
            {/* Mobile Close Button Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 shrink-0">
              <Link
                to="/"
                onClick={() => setMobileSidebarOpen(false)}
                className="flex items-center gap-2 focus:outline-none"
                aria-label="HirePilot Home"
              >
                <img
                  src="/assets/hirepilot-logo.png"
                  alt="HirePilot"
                  className="h-8 w-auto object-contain"
                />
                <span className="font-semibold text-lg tracking-tight text-white font-sans">
                  HirePilot
                </span>
              </Link>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
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
        {/* Desktop Top Bar (Apple Vision Glassmorphism Header) */}
        <header className="hidden lg:flex items-center justify-between px-8 h-16 glass-panel border-t-0 border-x-0 border-b border-white/10 shrink-0 z-30 bg-[#080B14]/60 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium px-3 py-1 glass-pill text-cyan-300 rounded-full flex items-center gap-1.5 shadow-[0_0_12px_rgba(54,214,255,0.25)] border border-cyan-500/30">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Live AI Copilot Ready
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/interview/setup"
              className="inline-flex items-center gap-1.5 text-xs font-semibold glass-primary-btn text-white px-4 py-2 rounded-2xl transition-all shadow-[0_4px_18px_rgba(118,87,255,0.4)]"
            >
              <span className="text-sm">▶</span>
              <span>Start Mock Session</span>
            </Link>

            <Link
              to="/profile"
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shrink-0 overflow-hidden border border-white/20 shadow-[0_2px_8px_rgba(118,87,255,0.3)] hover:scale-105 transition-transform"
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

        {/* Mobile Header Bar */}
        <header className="lg:hidden flex items-center justify-between px-4 h-16 glass-panel border-t-0 border-x-0 border-b border-white/10 shrink-0 z-30 bg-[#080B14]/80 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 -ml-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/dashboard" className="flex items-center gap-2 focus:outline-none" aria-label="HirePilot Dashboard">
              <img
                src="/assets/hirepilot-logo.png"
                alt="HirePilot"
                className="h-8 w-auto object-contain"
              />
              <span className="font-semibold text-base tracking-tight text-white font-sans">
                HirePilot
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full glass-pill text-cyan-300 border border-cyan-500/20">
              {quotaInfo.remaining} Left
            </div>

            <Link
              to="/profile"
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-xs font-bold text-white overflow-hidden border border-white/20"
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
          <div className="bg-red-950/40 border-b border-red-500/30 px-4 py-2.5 flex items-center justify-center gap-2 text-xs text-red-300 shrink-0 backdrop-blur-md">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>
              You have reached your 3 free interviews limit for this month. Quota resets on the 1st of next month.
            </span>
          </div>
        )}

        {/* Scrollable Page Body with bottom padding for Mobile Bottom Navigation */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-8 max-w-6xl w-full mx-auto">
          {children}
        </main>

        {/* Fixed Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>
    </div>
  );
};
