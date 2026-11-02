import React from 'react';
import { Link } from 'react-router-dom';
import { HirePilotLogo } from '../ui/HirePilotLogo';
import { Shield, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#030014] text-[#f4f0ff] pt-16 pb-12 transition-colors">
      {/* Aurora Divider */}
      <div className="aurora-divider mb-14" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <HirePilotLogo variant="footer" asLink to="/" />
            <p className="text-xs text-[#918ea0] leading-relaxed font-normal">
              Practice Smarter. Interview Better. Get Hired. A modern AI-powered mock interview observatory for developers and tech career seekers.
            </p>
          </div>

          {/* Col 2: Practice Types */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-[#f4f0ff] uppercase tracking-wider">
              Interview Catalog
            </h4>
            <ul className="space-y-2 text-xs text-[#918ea0] font-normal">
              <li>
                <Link to="/interview/setup" className="hover:text-[#f4f0ff] transition-colors">
                  Technical Coding
                </Link>
              </li>
              <li>
                <Link to="/interview/setup" className="hover:text-[#f4f0ff] transition-colors">
                  System Design & Architecture
                </Link>
              </li>
              <li>
                <Link to="/interview/setup" className="hover:text-[#f4f0ff] transition-colors">
                  Data Structures & Algorithms
                </Link>
              </li>
              <li>
                <Link to="/interview/setup" className="hover:text-[#f4f0ff] transition-colors">
                  Behavioral & STAR Questions
                </Link>
              </li>
              <li>
                <Link to="/interview/setup" className="hover:text-[#f4f0ff] transition-colors">
                  HR & Cultural Alignment
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-[#f4f0ff] uppercase tracking-wider">
              Observatory
            </h4>
            <ul className="space-y-2 text-xs text-[#918ea0] font-normal">
              <li>
                <a href="/#how-it-works" className="hover:text-[#f4f0ff] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#features" className="hover:text-[#f4f0ff] transition-colors">
                  Core Features
                </a>
              </li>
              <li>
                <a href="/#pricing" className="hover:text-[#f4f0ff] transition-colors">
                  Monthly Quota & Free Tier
                </a>
              </li>
              <li>
                <Link to="/founder" className="text-[#9382ff] hover:text-[#f4f0ff] transition-colors font-medium">
                  Meet the Founder
                </Link>
              </li>
              <li>
                <a href="/#faq" className="hover:text-[#f4f0ff] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Limits */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-[#f4f0ff] uppercase tracking-wider">
              Free Community Quota
            </h4>
            <div className="p-4 rounded-[16px] bg-[#060317] border border-white/10 shadow-[inset_0_0_24px_rgba(255,255,255,0.04)] text-xs text-[#918ea0] space-y-2">
              <div className="flex items-center gap-1.5 font-medium text-[#f4f0ff]">
                <Shield className="w-3.5 h-3.5 text-[#9382ff]" />
                <span>Monthly Allowance</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#a8a6b7]">
                3 high-caliber mock interviews each month with up to 15 adaptive questions and multi-rubric scoring.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#918ea0]">
          <p className="flex items-center gap-1.5 flex-wrap">
            <span>© {new Date().getFullYear()} HirePilot.</span>
            <span>•</span>
            <span>
              Engineered with care by{' '}
              <Link
                to="/founder"
                className="font-medium text-[#f4f0ff] hover:text-[#9382ff] transition-colors"
              >
                Faishal Naushad
              </Link>{' '}
              <span className="text-[11px] text-[#918ea0] font-normal">
                (Founder & Developer)
              </span>
            </span>
          </p>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1 text-[#a8a6b7]">
              <Sparkles className="w-3 h-3 text-[#9382ff]" />
              Powered by Google Gemini AI
            </span>
            <span>&</span>
            <span className="text-[#a8a6b7]">Supabase Auth</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
