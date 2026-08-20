import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Sparkles, Menu, X, ArrowRight, User as UserIcon, LayoutDashboard, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 pt-4">
      <div
        className={`max-w-7xl mx-auto rounded-2xl border transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(6,11,24,0.85)] border-white/[0.08] shadow-glass backdrop-blur-2xl py-2.5'
            : 'bg-transparent border-transparent py-3'
        }`}
      >
        <div className="px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:shadow-lg group-hover:shadow-sky-500/30 group-hover:scale-105 transition-all duration-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight leading-none">
              Hire<span className="text-sky-400">Pilot</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="/#features" className="hover:text-white transition-colors duration-200">
              Features
            </a>
            <a href="/#how-it-works" className="hover:text-white transition-colors duration-200">
              How It Works
            </a>
            <a href="/#ai-interview" className="hover:text-white transition-colors duration-200">
              AI Interview
            </a>
            <a href="/#pricing" className="hover:text-white transition-colors duration-200">
              Pricing
            </a>
            <a href="/#about" className="hover:text-white transition-colors duration-200">
              About
            </a>
          </nav>

          {/* Right CTA / User Status */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
                  aria-expanded={userDropdownOpen}
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center text-xs font-semibold overflow-hidden">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
                    ) : (
                      profile?.name?.charAt(0).toUpperCase() || 'U'
                    )}
                  </div>
                  <span className="text-xs font-medium text-slate-300 max-w-[120px] truncate">
                    {profile?.name || user.email?.split('@')[0]}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-2xl border border-white/[0.1] bg-[rgba(12,20,37,0.95)] backdrop-blur-2xl shadow-glass-lg py-1.5 z-50 animate-modal-in"
                  >
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-sky-400" />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-slate-500" />
                      Profile & Settings
                    </Link>
                    <div className="h-px bg-white/[0.06] my-1" />
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors text-left cursor-pointer"
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
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl rounded-2xl border border-white/[0.08] bg-[rgba(6,11,24,0.95)] backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 animate-slide-up shadow-glass-lg">
          <nav className="flex flex-col gap-1 font-medium text-sm text-slate-400">
            <a href="/#features" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded-xl hover:bg-white/[0.06] hover:text-white transition-colors">
              Features
            </a>
            <a href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded-xl hover:bg-white/[0.06] hover:text-white transition-colors">
              How It Works
            </a>
            <a href="/#ai-interview" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded-xl hover:bg-white/[0.06] hover:text-white transition-colors">
              AI Interview
            </a>
            <a href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded-xl hover:bg-white/[0.06] hover:text-white transition-colors">
              Pricing
            </a>
            <a href="/#about" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded-xl hover:bg-white/[0.06] hover:text-white transition-colors">
              About
            </a>
          </nav>

          <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] mb-1"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center text-xs font-semibold overflow-hidden shrink-0">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt={profile?.name || 'User'} className="w-full h-full object-cover" />
                    ) : (
                      profile?.name?.charAt(0).toUpperCase() || 'U'
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">
                      {profile?.name || user.email?.split('@')[0]}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {profile?.target_role || 'Software Engineer'}
                    </p>
                  </div>
                </Link>
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
                  className="w-full py-2.5 text-xs text-rose-400 font-semibold cursor-pointer"
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
                    Get Started
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
