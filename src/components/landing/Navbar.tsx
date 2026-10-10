import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onNavigateSection?: (id: string) => void;
  isDarkTheme?: boolean;
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateSection,
  isDarkTheme = false,
  onToggleTheme,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', isRoute: false },
    { label: 'Product', href: '#product', isRoute: false },
    { label: 'How It Works', href: '#how-it-works', isRoute: false },
    { label: 'Pricing', href: '#pricing', isRoute: false },
    { label: 'Founder', href: '#founder', isRoute: false },
    { label: 'Contact', href: '/contact', isRoute: true },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { label: string; href: string; isRoute: boolean }) => {
    if (item.isRoute) {
      setMobileMenuOpen(false);
      return; // React Router Link handles navigation
    }

    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = item.href.replace('#', '');
    if (onNavigateSection) {
      onNavigateSection(targetId);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleGetStarted = () => {
    setMobileMenuOpen(false);
    if (user) {
      navigate('/interview/setup');
    } else {
      navigate('/signup');
    }
  };

  const handleSignIn = () => {
    setMobileMenuOpen(false);
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 sm:pt-4 animate-navbar-enter transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <nav
          className={`flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-[#080B14]/80 backdrop-blur-2xl border border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)]'
              : 'bg-[#080B14]/60 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]'
          }`}
          aria-label="Main Navigation"
        >
          {/* Left: Brand Logo & Glass Pill */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, { label: 'Home', href: '#home', isRoute: false })}
              className="flex items-center group cursor-pointer focus:outline-none shrink-0"
              aria-label="HirePilot Home"
            >
              <img
                src="/assets/hirepilot-logo.png"
                alt="HirePilot"
                className="h-8 sm:h-9 md:h-9 w-auto max-h-9 object-contain transition-transform duration-standard-fast-effects ease-standard-spatial group-hover:scale-105"
              />
            </a>
            <span className="hidden md:inline-flex text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-white/10 text-[#36D6FF] border border-white/10 shadow-inner">
              Copilot 2.0
            </span>
          </div>

          {/* Center: Segmented iOS Glass Navbar Pill */}
          <div className="hidden lg:flex items-center gap-1 px-1.5 py-1 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-inner">
            {navItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium text-[#9AA4B7] hover:text-[#F7F8FC] hover:bg-white/[0.08] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item)}
                  className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium text-[#9AA4B7] hover:text-[#F7F8FC] hover:bg-white/[0.08] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  {item.label}
                </a>
              )
            ))}
          </div>

          {/* Right: Actions & CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme / Mode Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              title={isDarkTheme ? 'Clean Dark Glass Mode' : 'Toggle Mode'}
              aria-label="Toggle Theme"
              className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-[#9AA4B7] hover:text-white hover:bg-white/10 transition-all duration-300 hover:rotate-12 active:scale-95 focus:outline-none cursor-pointer"
            >
              <i className={`pi ${isDarkTheme ? 'pi-moon text-[#7657FF]' : 'pi-sun text-[#36D6FF]'} text-xs transition-transform duration-300`} />
            </button>

            {/* Sign In Button */}
            <button
              type="button"
              onClick={handleSignIn}
              className="px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-medium text-[#9AA4B7] hover:text-white glass-pill hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none cursor-pointer"
            >
              {user ? 'Dashboard' : 'Sign In'}
            </button>

            {/* Get Started Primary CTA (Apple Glass Specular Button) */}
            <button
              type="button"
              onClick={handleGetStarted}
              className="relative inline-flex items-center justify-center gap-1.5 font-medium text-xs sm:text-[13px] bg-gradient-to-b from-[#8367FF] to-[#6340F5] text-white px-4 sm:px-5 py-2 rounded-full border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_16px_rgba(118,87,255,0.3)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{user ? 'Practice Now' : 'Get Started Free'}</span>
              <i className="pi pi-arrow-right text-[11px]" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              aria-expanded={mobileMenuOpen}
              className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-[#9AA4B7] hover:text-white hover:bg-white/10 active:scale-95 transition-all duration-200 focus:outline-none"
            >
              <i className={`pi ${mobileMenuOpen ? 'pi-times' : 'pi-bars'} text-sm transition-transform duration-200`} />
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 p-4 rounded-3xl glass-panel border border-white/15 shadow-2xl animate-slideDown">
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 rounded-2xl text-sm font-medium text-[#9AA4B7] hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item)}
                    className="px-4 py-2.5 rounded-2xl text-sm font-medium text-[#9AA4B7] hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {item.label}
                  </a>
                )
              ))}

              <div className="h-px bg-white/10 my-2" />

              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="w-full text-center py-2.5 rounded-2xl text-sm font-semibold text-white glass-pill hover:bg-white/15 transition-colors"
                >
                  {user ? 'Go to Dashboard' : 'Sign In'}
                </button>

                <button
                  type="button"
                  onClick={handleGetStarted}
                  className="w-full text-center py-2.5 rounded-2xl text-sm font-semibold bg-gradient-to-b from-[#8367FF] to-[#6340F5] text-white border border-white/20 shadow-md hover:brightness-110 transition-all"
                >
                  {user ? 'Practice Now' : 'Get Started Free'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
