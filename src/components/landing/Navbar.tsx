import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Triangle, Menu, X, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavProps {
  onNavigateSection?: (id: string) => void;
}

export const Navbar: React.FC<NavProps> = ({ onNavigateSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Exact navigation links requested
  const navItems = [
    { label: 'Product', href: '#product' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Assessments', href: '#assessments' },
    { label: 'Companies', href: '#companies' },
    { label: 'Founder', href: '#founder' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    if (onNavigateSection) {
      onNavigateSection(targetId);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleAction = () => {
    navigate('/interview/setup');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-8 ${
          scrolled
            ? 'py-3 bg-[#000000]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-105">
              <Triangle className="w-4 h-4 text-black fill-black transform rotate-90" />
            </div>
            <span className="font-sans text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              HirePilot
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 px-6 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="text-xs tracking-wider uppercase font-medium text-white/60 hover:text-white transition-colors duration-200 relative group py-1"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-cyan-400 to-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handleAction}
              className="relative group overflow-hidden rounded-full px-5 py-2.5 text-xs uppercase tracking-wider font-bold text-black bg-white hover:bg-white/95 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Take Interview
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/85 backdrop-blur-2xl transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`absolute top-20 left-4 right-4 bg-[#0a0a0e] border border-white/10 rounded-3xl p-6 flex flex-col gap-5 shadow-2xl transition-all duration-300 ${
            mobileMenuOpen ? 'translate-y-0 scale-100' : '-translate-y-4 scale-95'
          }`}
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="py-3 px-4 rounded-xl text-base font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleAction();
              }}
              className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-center text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Take Interview
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
