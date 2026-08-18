import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, Shield, ArrowUpRight, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100 dark:border-slate-800">
          {/* Col 1: Brand & Description */}
          <div className="space-y-3 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-sm shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                Hire<span className="text-brand-600">Pilot</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              AI-powered career assistance platform designed to help students and job seekers discover opportunities, improve resumes, prepare for interviews, and manage applications.
            </p>
            <div className="pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium border border-slate-200/60 dark:border-slate-700">
                <Code2 className="w-3.5 h-3.5 text-brand-600" />
                <span>Founded & Developed by <strong>Mr. Faishal Naushad</strong></span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/interview/setup" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Mock Interview Catalog
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Applications & History
                </Link>
              </li>
              <li>
                <a href="/#about" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  About HirePilot
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Contact Founder
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Interview Types */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Practice Modes
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/interview/setup?type=technical" className="hover:text-brand-600 transition-colors">
                  Technical Architecture
                </Link>
              </li>
              <li>
                <Link to="/interview/setup?type=dsa" className="hover:text-brand-600 transition-colors">
                  Data Structures & Algorithms
                </Link>
              </li>
              <li>
                <Link to="/interview/setup?type=behavioral" className="hover:text-brand-600 transition-colors">
                  Behavioral & STAR
                </Link>
              </li>
              <li>
                <Link to="/interview/setup?type=hr" className="hover:text-brand-600 transition-colors">
                  HR & Cultural Fit
                </Link>
              </li>
              <li>
                <Link to="/interview/setup?type=mixed" className="hover:text-brand-600 transition-colors">
                  Mixed Full-Loop Simulation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Founder */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Official Contact
            </h4>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Have questions or feedback?
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Reach out directly to the founder & developer:
              </p>
              <a
                href="mailto:connectwithfaishal@gmail.com"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 hover:underline pt-1 break-all"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>connectwithfaishal@gmail.com</span>
                <ArrowUpRight className="w-3 h-3 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} HirePilot. Founded & Developed by Mr. Faishal Naushad.</p>
          <div className="flex items-center gap-2 text-[11px]">
            <span>Official Email:</span>
            <a
              href="mailto:connectwithfaishal@gmail.com"
              className="font-medium text-slate-700 dark:text-slate-300 hover:text-brand-600 underline"
            >
              connectwithfaishal@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
