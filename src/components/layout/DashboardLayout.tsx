import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Menu, X, Sparkles, AlertCircle } from 'lucide-react';
import { api } from '../../lib/api';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans">
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
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-64 h-full animate-fade-in">
            <Sidebar
              monthlyRemaining={quotaInfo.remaining}
              monthlyMax={quotaInfo.max}
              onCloseMobile={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Mobile Top Bar */}
        <header className="lg:hidden flex items-center justify-between px-4 h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand-600 flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-sm text-slate-900 dark:text-white">
              Hire<span className="text-brand-600">Pilot</span>
            </span>
          </div>
          <div className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
            {quotaInfo.remaining} Left
          </div>
        </header>

        {/* Quota Exhausted Warning Notice */}
        {quotaInfo.remaining === 0 && (
          <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900 px-4 py-2 flex items-center justify-center gap-2 text-xs text-amber-800 dark:text-amber-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>
              You have reached your 3 free interviews limit for this month. Quota resets on the 1st of next month.
            </span>
          </div>
        )}

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
