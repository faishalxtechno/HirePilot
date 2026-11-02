import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { HirePilotLogo } from '../ui/HirePilotLogo';
import { Menu, X, AlertCircle } from 'lucide-react';
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
    <div className="flex h-screen w-full bg-[#030014] text-[#f4f0ff] overflow-hidden font-sans">
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
            className="fixed inset-0 bg-[#030014]/80 backdrop-blur-md"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-64 h-full animate-fade-in shadow-2xl">
            <Sidebar
              monthlyRemaining={quotaInfo.remaining}
              monthlyMax={quotaInfo.max}
              onCloseMobile={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#030014] starfield-bg">
        {/* Mobile Top Bar */}
        <header className="lg:hidden flex items-center justify-between px-4 h-14 bg-[#060317] border-b border-white/10 shrink-0">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-1.5 rounded-[5px] text-[#918ea0] hover:text-[#f4f0ff] hover:bg-white/[0.04]"
          >
            <Menu className="w-5 h-5" />
          </button>
          <HirePilotLogo variant="mobile" asLink to="/dashboard" />
          <div className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-[5px] bg-[#10093a] text-[#9382ff] border border-white/10">
            {quotaInfo.remaining} Left
          </div>
        </header>

        {/* Quota Exhausted Warning Notice */}
        {quotaInfo.remaining === 0 && (
          <div className="bg-[#060317] border-b border-amber-500/30 px-4 py-2 flex items-center justify-center gap-2 text-xs text-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
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
