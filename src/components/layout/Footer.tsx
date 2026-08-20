import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, ArrowUpRight, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.06] bg-[rgba(6,11,24,0.6)] backdrop-blur-xl py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/[0.06]">
          {/* Col 1: Brand & Description */}
          <div className="space-y-3 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Hire<span className="text-sky-400">Pilot</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              AI-powered career assistance platform designed to help students and job seekers discover opportunities, improve resumes, prepare for interviews, and manage applications.
            </p>
            <div className="pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] text-slate-400 text-[11px] font-medium border border-white/[0.08]">
                <Code2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Founder — <strong className="text-slate-300">Faishal Naushad</strong></span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <Link to="/" className="hover:text-sky-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/interview/setup" className="hover:text-sky-400 transition-colors">
                  Mock Interview Catalog
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-sky-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-sky-400 transition-colors">
                  Applications & History
                </Link>
              </li>
              <li>
                <a href="/#about" className="hover:text-sky-400 transition-colors">
                  About HirePilot
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-sky-400 transition-colors">
                  Contact Founder
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Interview Types */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Practice Modes
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <Link to="/interview/setup?type=technical" className="hover:text-sky-400 transition-colors">
                  Technical Architecture
                </Link>
              </li>
              <li>
                <Link to="/interview/setup?type=dsa" className="hover:text-sky-400 transition-colors">
                  Data Structures & Algorithms
                </Link>
              </li>
              <li>
                <Link to="/interview/setup?type=behavioral" className="hover:text-sky-400 transition-colors">
                  Behavioral & STAR
                </Link>
              </li>
              <li>
                <Link to="/interview/setup?type=hr" className="hover:text-sky-400 transition-colors">
                  HR & Cultural Fit
                </Link>
              </li>
              <li>
                <Link to="/interview/setup?type=mixed" className="hover:text-sky-400 transition-colors">
                  Mixed Full-Loop Simulation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Founder */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Official Contact
            </h4>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2.5">
              <p className="text-xs font-semibold text-slate-300">
                Have questions or feedback?
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Reach out directly to the founder & developer:
              </p>
              <a
                href="mailto:connectwithfaishal@gmail.com"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 hover:underline pt-1 break-all"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>connectwithfaishal@gmail.com</span>
                <ArrowUpRight className="w-3 h-3 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} HirePilot. Founder — Faishal Naushad.</p>
          <div className="flex items-center gap-2 text-[11px]">
            <span>Official Email:</span>
            <a
              href="mailto:connectwithfaishal@gmail.com"
              className="font-medium text-slate-400 hover:text-sky-400 underline"
            >
              connectwithfaishal@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
