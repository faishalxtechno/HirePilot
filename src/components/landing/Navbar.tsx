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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 sm:pt-5 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        <nav
          className={`flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
              : 'bg-white/80 backdrop-blur-lg border border-slate-200/70 shadow-[0_4px_20px_rgb(0,0,0,0.03)]'
          }`}
          aria-label="Main Navigation"
        >
          {/* Left: Brand Logo & Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, { label: 'Home', href: '#home', isRoute: false })}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
            aria-label="HirePilot Home"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8750FF] to-[#A855F7] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(135,80,255,0.35)] transition-transform duration-300 group-hover:scale-105">
              <i className="pi pi-compass text-sm font-bold" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-sans text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
                HirePilot
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8750FF] animate-pulse" />
            </div>
          </a>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 px-3 py-1 rounded-full bg-slate-50/80 border border-slate-200/50">
            {navItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium text-slate-600 hover:text-[#8750FF] hover:bg-white transition-all duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item)}
                  className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium text-slate-600 hover:text-[#8750FF] hover:bg-white transition-all duration-200 cursor-pointer"
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
              title={isDarkTheme ? 'Switch to Light Theme' : 'Clean Light SaaS Mode'}
              aria-label="Toggle Theme"
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-[#8750FF] hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#8750FF]/40"
            >
              <i className={`pi ${isDarkTheme ? 'pi-moon text-[#8750FF]' : 'pi-sun text-amber-500'} text-sm`} />
            </button>

            {/* Sign In Button */}
            <button
              type="button"
              onClick={handleSignIn}
              className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
            >
              {user ? 'Dashboard' : 'Sign In'}
            </button>

            {/* Get Started Primary CTA */}
            <Button
              label={user ? 'Practice Now' : 'Get Started'}
              icon="pi pi-arrow-right"
              iconPos="right"
              onClick={handleGetStarted}
              className="p-button-sm !rounded-full !bg-[#8750FF] !border-[#8750FF] !text-white !font-semibold !px-4 !py-2 !text-xs sm:!text-[13px] hover:!bg-[#723DE8] hover:!border-[#723DE8] !shadow-[0_4px_14px_rgba(135,80,255,0.35)] transition-all duration-200 hover:!shadow-[0_6px_20px_rgba(135,80,255,0.45)] hover:scale-[1.02]"
            />
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              aria-expanded={mobileMenuOpen}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              <i className={`pi ${mobileMenuOpen ? 'pi-times' : 'pi-bars'} text-base`} />
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 p-4 rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-2xl animate-fade-up">
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 rounded-2xl text-sm font-medium text-slate-700 hover:text-[#8750FF] hover:bg-[#F5EFFF] transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item)}
                    className="px-4 py-2.5 rounded-2xl text-sm font-medium text-slate-700 hover:text-[#8750FF] hover:bg-[#F5EFFF] transition-colors"
                  >
                    {item.label}
                  </a>
                )
              ))}

              <div className="h-px bg-slate-100 my-2" />

              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs text-slate-500 font-medium">Display Mode</span>
                  <button
                    type="button"
                    onClick={onToggleTheme}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700"
                  >
                    <i className={`pi ${isDarkTheme ? 'pi-moon' : 'pi-sun text-amber-500'} text-xs`} />
                    <span>{isDarkTheme ? 'Dark' : 'Light'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSignIn}
                  className="w-full text-center py-2.5 rounded-2xl text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  {user ? 'Go to Dashboard' : 'Sign In'}
                </button>

                <Button
                  label={user ? 'Practice Now' : 'Get Started Free'}
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  onClick={handleGetStarted}
                  className="w-full !rounded-2xl !bg-[#8750FF] !border-[#8750FF] !text-white !font-semibold !py-2.5 hover:!bg-[#723DE8]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
