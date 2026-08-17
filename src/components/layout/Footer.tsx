import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100 dark:border-slate-800">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                Hire<span className="text-brand-600">Pilot</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Practice Smarter. Interview Better. Get Hired. An AI-powered mock interview platform for developers and job seekers.
            </p>
          </div>

          {/* Col 2: Practice Types */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Interview Types
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link to="/interview/setup" className="hover:text-brand-600">Technical Coding</Link></li>
              <li><Link to="/interview/setup" className="hover:text-brand-600">System Design</Link></li>
              <li><Link to="/interview/setup" className="hover:text-brand-600">Data Structures & Algorithms</Link></li>
              <li><Link to="/interview/setup" className="hover:text-brand-600">Behavioral & STAR</Link></li>
              <li><Link to="/interview/setup" className="hover:text-brand-600">HR & Leadership</Link></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><a href="/#how-it-works" className="hover:text-brand-600">How It Works</a></li>
              <li><a href="/#features" className="hover:text-brand-600">Features</a></li>
              <li><a href="/#pricing" className="hover:text-brand-600">Pricing & Limits</a></li>
              <li><a href="/#faq" className="hover:text-brand-600">FAQ</a></li>
            </ul>
          </div>

          {/* Col 4: Trust & Limits */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Trust & Limits
            </h4>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                Free Tier Allowance
              </div>
              <p className="text-[11px] leading-snug">
                3 high-quality AI interviews per month with up to 15 adaptive questions & detailed analytics.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} HirePilot. Built for career excellence.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Powered by</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">Gemini AI</span>
            <span>&</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">Supabase</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
