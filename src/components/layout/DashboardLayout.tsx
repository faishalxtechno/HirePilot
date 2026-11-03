import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { HirePilotLogo } from '../ui/HirePilotLogo';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  X,
  AlertCircle,
  Search,
  Bell,
  Sparkles,
  Play,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { api } from '../../lib/api';
import { Link } from 'react-router-dom';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile, user } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [quotaInfo, setQuotaInfo] = useState<{ remaining: number; max: number }>({ remaining: 3, max: 3 });
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const displayName = profile?.name || user?.email?.split('@')[0] || 'Candidate';
  const targetRole = profile?.target_role || 'Software Engineer';

  const notifications = [
    {
      id: 'notif-1',
      title: 'Free Community Tier Active',
      message: '3 full AI mock interview evaluations ready each month.',
      time: 'Just now',
      unread: true,
    },
    {
      id: 'notif-2',
      title: 'STAR Method Evaluator Calibrated',
      message: 'Gemini AI rubric updated for behavioral & system design.',
      time: '2h ago',
      unread: false,
    },
    {
      id: 'notif-3',
      title: 'Application Pipeline Synced',
      message: 'Track hiring loops, technical rounds, and feedback.',
      time: '1d ago',
      unread: false,
    },
  ];

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] text-[#111827] overflow-hidden font-sans">
      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block shrink-0 h-full">
        <Sidebar
          monthlyRemaining={quotaInfo.remaining}
          monthlyMax={quotaInfo.max}
        />
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-64 h-full animate-fade-in shadow-2xl bg-white">
            <Sidebar
              monthlyRemaining={quotaInfo.remaining}
              monthlyMax={quotaInfo.max}
              onCloseMobile={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#F8FAFC]">
        {/* Mobile Top Bar */}
        <header className="lg:hidden flex items-center justify-between px-4 h-16 bg-white border-b border-[#E5E7EB] shrink-0">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-1.5 rounded-[6px] text-[#64748B] hover:text-[#111827] hover:bg-slate-50 transition-colors"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
          <HirePilotLogo variant="mobile" asLink to="/dashboard" className="border-0 shadow-none p-0 bg-transparent" />
          <div className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
            {quotaInfo.remaining} Left
          </div>
        </header>

        {/* Desktop Top Bar (Inspired by Image 1, 3, 4) */}
        <header className="hidden lg:flex items-center justify-between px-8 h-16 bg-white border-b border-[#E5E7EB] shrink-0">
          {/* Quick Search Bar */}
          <div className="relative w-80">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search interviews, companies, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-12 py-2 text-xs rounded-[8px] bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-[#94A3B8] bg-white border border-[#E5E7EB] rounded-[4px] shadow-2xs">
              ⌘K
            </kbd>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-3.5">
            {/* Quick Practice Pill */}
            <Link to="/interview/setup">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-[#2563EB] border border-blue-200 text-xs font-semibold transition-all shadow-2xs hover:shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>AI Interviewer</span>
              </button>
            </Link>

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2 rounded-[8px] text-[#64748B] hover:text-[#111827] hover:bg-[#F8FAFC] border border-transparent hover:border-[#E5E7EB] transition-all relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>

              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-[12px] border border-[#E5E7EB] shadow-lg p-3 z-50 animate-fade-in space-y-2 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
                    <span className="font-semibold text-[#111827]">Notifications</span>
                    <span className="text-[11px] text-[#2563EB] cursor-pointer hover:underline">
                      Mark all as read
                    </span>
                  </div>
                  <div className="space-y-2">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-2 rounded-[8px] bg-[#F8FAFC] border border-[#E5E7EB]/60 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#111827] text-[11px]">
                            {n.title}
                          </span>
                          <span className="text-[10px] text-[#94A3B8]">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                          {n.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill */}
            <Link
              to="/profile"
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-[8px] bg-[#F8FAFC] border border-[#E5E7EB] hover:bg-slate-50 transition-colors"
            >
              <div className="relative">
                <div className="w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs font-semibold overflow-hidden shadow-2xs">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    displayName.charAt(0).toUpperCase()
                  )}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#16A34A] ring-2 ring-white" />
              </div>

              <div className="text-left hidden xl:block">
                <p className="text-xs font-semibold text-[#111827] leading-none">
                  {displayName}
                </p>
                <p className="text-[10px] text-[#64748B] mt-0.5 leading-none truncate max-w-[120px]">
                  {targetRole}
                </p>
              </div>
            </Link>
          </div>
        </header>

        {/* Quota Exhausted Warning Notice */}
        {quotaInfo.remaining === 0 && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex items-center justify-center gap-2 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>
              You have reached your 3 free interviews limit for this month. Quota resets on the 1st of next month.
            </span>
          </div>
        )}

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
};
