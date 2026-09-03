import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Triangle, Menu, X, ArrowRight, User as UserIcon, LayoutDashboard, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    if (loading) return;
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

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
        style={{ transform: 'translateZ(0)', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
        className={`max-w-7xl mx-auto rounded-2xl border transition-all duration-500 card-3d ${
          scrolled
            ? 'bg-black/80 border-white/5 shadow-glass backdrop-blur-2xl py-2.5'
            : 'bg-transparent border-transparent py-3'
        }`}
      >
        <div className="px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Triangle className="w-4 h-4 text-black fill-black" />
            </div>
            <span className="font-medium text-lg text-white tracking-tight leading-none">
              HirePilot
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-secondary">
            <a href="/#product" className="nav-link hover:text-white">
              Product
            </a>
            <a href="/#how-it-works" className="nav-link hover:text-white">
              How It Works
            </a>
            <a href="/#founder" className="nav-link hover:text-white">
              Founder
            </a>
            <a href="/#pricing" className="nav-link hover:text-white">
              Pricing
            </a>
            <Link to="/contact" className="nav-link hover:text-white">
              Contact
            </Link>
          </nav>

          {/* Right CTA / User Status */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1 pr-3 rounded-full border border-white/10 bg-transparent hover:bg-white/5 transition-all duration-200 cursor-pointer"
                  aria-expanded={userDropdownOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold overflow-hidden">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
                    ) : (
                      profile?.name?.charAt(0).toUpperCase() || 'U'
                    )}
                  </div>
                  <span className="text-xs font-medium text-white max-w-[120px] truncate">
                    {profile?.name || user.email?.split('@')[0]}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-2xl border border-white/10 bg-[#121212] backdrop-blur-2xl shadow-glass-lg py-2 z-50 animate-modal-in"
                  >
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-brand-secondary hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-white" />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-brand-secondary hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-white" />
                      Profile & Settings
                    </Link>
                    <div className="h-px bg-white/5 my-1" />
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
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
                  <Button variant="ghost" size="sm" className="text-brand-secondary hover:text-white">
                    Login
                  </Button>
                </Link>
                <button onClick={handleGetStarted}>
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Get Started
                  </Button>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden p-2 rounded-xl text-brand-secondary hover:text-white hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl rounded-2xl border border-white/10 bg-[#121212] backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 animate-slideDown shadow-lg">
          <nav className="flex flex-col gap-1 font-medium text-sm text-brand-secondary">
            <a href="/#product" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 rounded-xl hover:bg-white/5 hover:text-white transition-colors">
              Product
            </a>
            <a href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 rounded-xl hover:bg-white/5 hover:text-white transition-colors">
              How It Works
            </a>
            <a href="/#founder" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 rounded-xl hover:bg-white/5 hover:text-white transition-colors">
              Founder
            </a>
            <a href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 rounded-xl hover:bg-white/5 hover:text-white transition-colors">
              Pricing
            </a>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 rounded-xl hover:bg-white/5 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 mb-2"
                >
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold overflow-hidden shrink-0">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt={profile?.name || 'User'} className="w-full h-full object-cover" />
                    ) : (
                      profile?.name?.charAt(0).toUpperCase() || 'U'
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {profile?.name || user.email?.split('@')[0]}
                    </p>
                    <p className="text-xs text-brand-secondary truncate">
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
                  className="w-full py-3 text-sm text-red-400 font-medium hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
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
                <button onClick={() => { setMobileMenuOpen(false); handleGetStarted(); }} className="w-full">
                  <Button variant="primary" size="md" className="w-full">
                    Get Started
                  </Button>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
