import React from 'react';
import { Link } from 'react-router-dom';
import { Triangle, Mail, ArrowUpRight, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-black py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Col 1: Brand & Description */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Triangle className="w-4 h-4 text-black fill-black" />
              </div>
              <span className="font-medium text-lg text-white tracking-tight">
                HirePilot
              </span>
            </Link>
            <p className="text-sm text-brand-secondary leading-relaxed">
              AI-powered career assistance platform designed to help professionals discover opportunities, improve resumes, and prepare for interviews.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-brand-muted text-xs font-medium border border-white/10">
                <Code2 className="w-3.5 h-3.5 text-white" />
                <span>Founder — <strong className="text-white">Faishal Naushad</strong></span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-medium text-brand-muted uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm text-brand-secondary">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/interview/setup" className="hover:text-white transition-colors">
                  Mock Interview
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-white transition-colors">
                  Applications
                </Link>
              </li>
              <li>
                <a href="/#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Interview Types */}
          <div className="space-y-4">
            <h4 className="text-xs font-medium text-brand-muted uppercase tracking-wider">
              Practice Modes
            </h4>
            <ul className="space-y-3 text-sm text-brand-secondary">
              <li>
                <Link to="/interview/setup?type=technical" className="hover:text-white transition-colors">
                  Technical Architecture
                </Link>
              </li>
              <li>
                <Link to="/interview/setup?type=dsa" className="hover:text-white transition-colors">
                  Data Structures & Algorithms
                </Link>
              </li>
              <li>
                <Link to="/interview/setup?type=behavioral" className="hover:text-white transition-colors">
                  Behavioral & STAR
                </Link>
              </li>
              <li>
                <Link to="/interview/setup?type=hr" className="hover:text-white transition-colors">
                  HR & Cultural Fit
                </Link>
              </li>
              <li>
                <Link to="/interview/setup?type=mixed" className="hover:text-white transition-colors">
                  Mixed Simulation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Founder */}
          <div className="space-y-4">
            <h4 className="text-xs font-medium text-brand-muted uppercase tracking-wider">
              Official Contact
            </h4>
            <div className="p-5 rounded-2xl bg-[#121212] border border-white/5 space-y-3">
              <p className="text-sm font-medium text-white">
                Have questions or feedback?
              </p>
              <p className="text-xs text-brand-secondary leading-relaxed">
                Reach out directly to the founder:
              </p>
              <a
                href="mailto:connectwithfaishal@gmail.com"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-brand-secondary pt-1 break-all transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>connectwithfaishal@gmail.com</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <p>© {new Date().getFullYear()} HirePilot. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Official Email:</span>
            <a
              href="mailto:connectwithfaishal@gmail.com"
              className="font-medium text-brand-secondary hover:text-white transition-colors"
            >
              connectwithfaishal@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
