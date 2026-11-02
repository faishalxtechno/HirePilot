import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HirePilotLogo } from '../ui/HirePilotLogo';
import { Menu, X, ArrowRight, User as UserIcon, LayoutDashboard, LogOut } from 'lucide-react';

export interface NavbarProps {
  /** Visual variant: 'floating' (Reflect Notes style) or 'standard' */
  variant?: 'floating' | 'standard';
}

export const Navbar: React.FC<NavbarProps> = ({ variant = 'floating' }) => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  if (variant === 'floating') {
    return (
      <header className="sticky top-4 z-50 w-full px-3 sm:px-6 pointer-events-none flex flex-col items-center">
        {/* Floating Navigation Pill */}
        <div className="pointer-events-auto w-full max-w-[1120px] rounded-full bg-[#060317]/90 backdrop-blur-md border border-white/10 shadow-[inset_0_0_24px_rgba(255,255,255,0.04)] px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all">
          {/* Brand Logo */}
          <div className="flex items-center shrink-0">
            <HirePilotLogo variant="navbar" asLink to="/" imgClassName="max-h-7 sm:max-h-8 max-w-[130px] sm:max-w-[150px]" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-[14px] font-normal text-[#f4f0ff]/80">
            <a href="/#features" className="hover:text-[#9382ff] transition-colors">
              Features
            </a>
            <a href="/#how-it-works" className="hover:text-[#9382ff] transition-colors">
              How It Works
            </a>
            <a href="/#interview-types" className="hover:text-[#9382ff] transition-colors">
              Interview Types
            </a>
            <a href="/#pricing" className="hover:text-[#9382ff] transition-colors">
              Pricing
            </a>
            <Link to="/founder" className="hover:text-[#9382ff] transition-colors">
              Founder
            </Link>
            <a href="/#faq" className="hover:text-[#9382ff] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right Action / Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-white/10 bg-[#10093a]/60 hover:bg-[#10093a] text-[#f4f0ff] transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-[#5046e4] text-white flex items-center justify-center text-xs font-medium overflow-hidden">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
                    ) : (
                      profile?.name?.charAt(0).toUpperCase() || 'U'
                    )}
                  </div>
                  <span className="text-xs font-medium max-w-[110px] truncate text-[#f4f0ff]">
                    {profile?.name || user.email?.split('@')[0]}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-[#060317] rounded-[16px] border border-white/10 shadow-[inset_0_0_24px_rgba(255,255,255,0.04)] py-2 z-50 animate-slide-up"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#f4f0ff] hover:bg-[#10093a]/70 hover:text-[#9382ff] transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#9382ff]" />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#f4f0ff] hover:bg-[#10093a]/70 hover:text-[#9382ff] transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-[#918ea0]" />
                      Profile & Settings
                    </Link>
                    <div className="h-px bg-white/10 my-1.5" />
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-400 hover:bg-rose-950/30 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[14px] font-normal text-[#918ea0] hover:text-[#f4f0ff] px-2 py-1.5 transition-colors rounded-[5px]"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[5px] bg-[#5046e4] hover:bg-[#10093a] text-white text-[14px] font-medium transition-all shadow-[0_0_16px_rgba(80,70,228,0.35)]"
                >
                  <span>Start Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#f4f0ff] hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto w-full max-w-[1120px] mt-2 rounded-[16px] bg-[#060317]/95 backdrop-blur-md border border-white/10 shadow-[inset_0_0_24px_rgba(255,255,255,0.04)] p-4 space-y-4 animate-slide-up">
            <nav className="flex flex-col gap-1 text-[14px] font-normal text-[#f4f0ff]/90">
              <a
                href="/#features"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-[5px] hover:bg-[#10093a] hover:text-[#9382ff] transition-colors"
              >
                Features
              </a>
              <a
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-[5px] hover:bg-[#10093a] hover:text-[#9382ff] transition-colors"
              >
                How It Works
              </a>
              <a
                href="/#interview-types"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-[5px] hover:bg-[#10093a] hover:text-[#9382ff] transition-colors"
              >
                Interview Types
              </a>
              <a
                href="/#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-[5px] hover:bg-[#10093a] hover:text-[#9382ff] transition-colors"
              >
                Pricing
              </a>
              <Link
                to="/founder"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-[5px] hover:bg-[#10093a] hover:text-[#9382ff] transition-colors"
              >
                Founder
              </Link>
              <a
                href="/#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-[5px] hover:bg-[#10093a] hover:text-[#9382ff] transition-colors"
              >
                FAQ
              </a>
            </nav>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-4 rounded-[5px] bg-[#5046e4] text-white text-center text-sm font-medium hover:bg-[#10093a] transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 text-xs text-rose-400 font-medium text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2 px-4 rounded-[5px] border border-white/10 text-center text-sm font-normal text-[#f4f0ff] hover:bg-white/5 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-4 rounded-[5px] bg-[#5046e4] text-white text-center text-sm font-medium hover:bg-[#10093a] transition-colors shadow-[0_0_16px_rgba(80,70,228,0.35)]"
                  >
                    Start Free
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    );
  }

  // Standard navbar fallback
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <HirePilotLogo variant="navbar" asLink to="/" />
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="/#features" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Features</a>
          <a href="/#how-it-works" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">How It Works</a>
          <a href="/#interview-types" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Interview Types</a>
          <a href="/#pricing" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Pricing</a>
          <Link to="/founder" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Founder</Link>
          <a href="/#faq" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">FAQ</a>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link to="/dashboard" className="px-4 py-2 rounded-[5px] bg-[#5046e4] text-white text-xs font-medium">Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1.5 text-xs text-[#918ea0] hover:text-[#f4f0ff]">Login</Link>
              <Link to="/signup" className="px-4 py-2 rounded-[5px] bg-[#5046e4] text-white text-xs font-medium">Start Free</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
