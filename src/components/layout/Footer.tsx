import React from 'react';
import { Link } from 'react-router-dom';
import { HirePilotLogo } from '../ui/HirePilotLogo';
import { Shield, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export interface FooterProps {
  theme?: 'light' | 'dark';
}

export const Footer: React.FC<FooterProps> = ({ theme = 'light' }) => {
  if (theme === 'light') {
    return (
      <footer className="relative bg-[#F8FAFC] text-[#111827] pt-16 pb-12 border-t border-[#E5E7EB] transition-colors">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#E5E7EB]">
            {/* Col 1 & 2: Brand */}
            <div className="space-y-4 md:col-span-2">
              <HirePilotLogo
                variant="footer"
                asLink
                to="/"
                className="border-0 shadow-none p-0 bg-transparent"
                imgClassName="max-h-9 max-w-[170px]"
              />
              <p className="text-sm text-[#64748B] leading-relaxed max-w-sm">
                Next-generation AI career preparation platform. Practice realistic mock interviews, optimize your resume for ATS, and track your path to top offers.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium transition-all shadow-xs"
                >
                  <span>Start Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/founder"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[6px] border border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] hover:bg-white text-xs font-medium transition-colors"
                >
                  Meet the Founder
                </Link>
              </div>
            </div>

            {/* Col 3: Core Capabilities */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-[#111827] uppercase tracking-wider">
                Platform Capabilities
              </h4>
              <ul className="space-y-2 text-xs text-[#64748B] font-medium">
                <li>
                  <Link to="/interview/setup" className="hover:text-[#2563EB] transition-colors">
                    AI Mock Interviews
                  </Link>
                </li>
                <li>
                  <a href="#features" className="hover:text-[#2563EB] transition-colors">
                    Smart Resume Builder
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-[#2563EB] transition-colors">
                    ATS Resume Analysis
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-[#2563EB] transition-colors">
                    Job Matching Engine
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-[#2563EB] transition-colors">
                    Application Tracker
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-[#2563EB] transition-colors">
                    Performance Reports
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Navigation */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-[#111827] uppercase tracking-wider">
                Explore HirePilot
              </h4>
              <ul className="space-y-2 text-xs text-[#64748B] font-medium">
                <li>
                  <a href="#problem-solution" className="hover:text-[#2563EB] transition-colors">
                    Why HirePilot
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-[#2563EB] transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-[#2563EB] transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#showcase" className="hover:text-[#2563EB] transition-colors">
                    Product Showcase
                  </a>
                </li>
                <li>
                  <Link to="/founder" className="text-[#2563EB] hover:underline font-semibold">
                    Meet the Founder
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 5: Account & Connect */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-[#111827] uppercase tracking-wider">
                Access & Connect
              </h4>
              <ul className="space-y-2 text-xs text-[#64748B] font-medium">
                <li>
                  <Link to="/login" className="hover:text-[#2563EB] transition-colors">
                    Candidate Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-[#2563EB] transition-colors">
                    Create Account
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-[#2563EB] transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:connectwithfaishal@gmail.com"
                    className="hover:text-[#2563EB] transition-colors"
                  >
                    Contact Founder
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Credits */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
            <p className="flex items-center gap-1.5 flex-wrap">
              <span>© {new Date().getFullYear()} HirePilot. All rights reserved.</span>
              <span>•</span>
              <span>
                Engineered with care by{' '}
                <Link
                  to="/founder"
                  className="font-medium text-[#111827] hover:text-[#2563EB] transition-colors"
                >
                  Faishal Naushad
                </Link>{' '}
                <span className="text-[11px] text-[#64748B] font-normal">
                  (Founder & Developer)
                </span>
              </span>
            </p>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="inline-flex items-center gap-1 text-[#4B5563]">
                <Sparkles className="w-3 h-3 text-[#2563EB]" />
                Powered by Google Gemini AI
              </span>
              <span>•</span>
              <span className="text-[#4B5563]">Supabase Auth</span>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Dark variant
  return (
    <footer className="relative bg-[#030014] text-[#f4f0ff] pt-16 pb-12 transition-colors">
      <div className="aurora-divider mb-14" />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div className="space-y-4 md:col-span-1">
            <HirePilotLogo variant="footer" asLink to="/" />
            <p className="text-xs text-[#918ea0] leading-relaxed font-normal">
              Practice Smarter. Interview Better. Get Hired. A modern AI-powered mock interview observatory for developers and tech career seekers.
            </p>
          </div>

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
            </ul>
          </div>

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
                <Link to="/founder" className="text-[#9382ff] hover:text-[#f4f0ff] transition-colors font-medium">
                  Meet the Founder
                </Link>
              </li>
            </ul>
          </div>

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
        </div>
      </div>
    </footer>
  );
};
