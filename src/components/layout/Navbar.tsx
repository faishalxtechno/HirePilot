import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Sparkles, Menu, X, ArrowRight, User as UserIcon, LayoutDashboard, LogOut, Mail } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-sm shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight leading-none">
              Hire<span className="text-brand-600 dark:text-brand-400">Pilot</span>
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wider uppercase">
              AI Mock Interviews
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="/#features" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            Features
          </a>
          <a href="/#how-it-works" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            How It Works
          </a>
          <a href="/#interview-types" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            Interview Catalog
          </a>
          <a href="/#pricing" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            Pricing
          </a>
          <a href="/#about" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            About
          </a>
          <a href="/#contact" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            Contact
          </a>
        </nav>

        {/* Right CTA / User Status */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-semibold overflow-hidden">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    profile?.name?.charAt(0).toUpperCase() || 'U'
                  )}
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-200 max-w-[120px] truncate">
                  {profile?.name || user.email?.split('@')[0]}
                </span>
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl py-1.5 z-50 animate-modal-in"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <Link
                    to="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-brand-600" />
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-slate-500" />
                    Profile & Settings
                  </Link>
                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      signOut();
                      navigate('/');
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Start Free
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-3 animate-slide-up">
          <nav className="flex flex-col gap-1 font-medium text-sm text-slate-700 dark:text-slate-300">
            <a href="/#features" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
              Features
            </a>
            <a href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
              How It Works
            </a>
            <a href="/#interview-types" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
              Interview Catalog
            </a>
            <a href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
              Pricing
            </a>
            <a href="/#about" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
              About
            </a>
            <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
              Contact
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
                    Go to Dashboard
                  </Button>
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-xs text-rose-600 font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="md" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
                    Start Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
