import React, { useState, useEffect } from 'react';
import { Triangle, Sparkles, Briefcase, Target, X, Bot, Zap, Brain, BarChart3, History, CheckCircle2, Send, Mail } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const HERO_VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4";

const NAV_LINKS = [
  { label: 'Home', id: 'home', isExternal: false },
  { label: 'Product', id: 'product', isExternal: false },
  { label: 'How It Works', id: 'how-it-works', isExternal: false },
  { label: 'Founder', id: 'founder', isExternal: false },
  { label: 'Pricing', id: 'pricing', isExternal: false },
  { label: 'Contact', id: 'contact', path: '/contact', isExternal: true }
];

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.pushState(null, '', `#${id}`);
};

function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('home');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [sectionIds]);
  return activeSection;
}

function Header({ activeSection }: { activeSection: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && setIsMobileMenuOpen(false);
    const handleResize = () => window.innerWidth >= 768 && setIsMobileMenuOpen(false);
    window.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent, link: typeof NAV_LINKS[0]) => {
    if (link.isExternal) {
      // Allow default navigation to the external link
      return;
    }
    e.preventDefault();
    setIsMobileMenuOpen(false);
    scrollToSection(link.id);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 animate-slideDown">
        <div className="max-w-[800px] mx-auto px-6 py-6 flex items-center justify-between">
          <div 
            role="button" tabIndex={0}
            onClick={(e) => handleNavClick(e, NAV_LINKS[0])}
            onKeyDown={(e) => e.key === 'Enter' && handleNavClick(e as any, NAV_LINKS[0])}
            className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.16)] hover:scale-105 transition-transform cursor-pointer shrink-0"
          >
            <Triangle className="w-5 h-5 md:w-6 md:h-6 text-black fill-black" />
          </div>

          <nav className="hidden md:flex items-center gap-6 bg-brand-dark/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
            {NAV_LINKS.map(link => (
              link.isExternal ? (
                <Link 
                  key={link.id} 
                  to={link.path!} 
                  className={`text-sm font-medium transition-colors relative group text-white/50 hover:text-white/75`}
                >
                  {link.label}
                </Link>
              ) : (
                <a 
                  key={link.id} 
                  href={`#${link.id}`} 
                  onClick={(e) => handleNavClick(e, link)} 
                  className={`text-sm font-medium transition-colors relative group ${activeSection === link.id ? 'text-white' : 'text-white/50 hover:text-white/75'}`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-[2px]">
                      <div className="w-[3px] h-[3px] rounded-full bg-white/80"></div>
                      <div className="w-[3px] h-[3px] rounded-full bg-white/80"></div>
                      <div className="w-[3px] h-[3px] rounded-full bg-white/80"></div>
                    </div>
                  )}
                </a>
              )
            ))}
          </nav>

          <button onClick={() => navigate('/signup')} className="hidden md:flex items-center px-5 py-2.5 bg-brand-dark text-brand-secondary text-sm font-medium rounded-full hover:bg-[#323234] hover:text-white hover:-translate-y-[1px] transition-all">
            Get Started
          </button>

          <button
            className={`md:hidden w-12 h-12 rounded-full flex flex-col justify-center items-center relative z-50 shrink-0 transition-colors duration-300 ${isMobileMenuOpen ? 'bg-white' : 'bg-brand-dark'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {!isMobileMenuOpen ? (
              <>
                <span className="absolute w-5 h-[2px] bg-white rounded transition-all duration-300 -translate-y-1.5" />
                <span className="absolute w-5 h-[2px] bg-white rounded transition-all duration-300 opacity-100" />
                <span className="absolute w-5 h-[2px] bg-white rounded transition-all duration-300 translate-y-1.5" />
              </>
            ) : <X className="w-6 h-6 text-black" />}
          </button>
        </div>
      </header>

      <div className={`md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={(e) => e.target === e.currentTarget && setIsMobileMenuOpen(false)}>
        <div className={`absolute bottom-0 left-0 right-0 bg-[#121212] rounded-t-3xl p-8 flex flex-col gap-6 transition-transform duration-300 delay-100 ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          {NAV_LINKS.map(link => (
            link.isExternal ? (
              <Link key={link.id} to={link.path!} className={`text-xl font-medium text-white/60 hover:text-white transition-colors`} onClick={() => setIsMobileMenuOpen(false)}>
                {link.label}
              </Link>
            ) : (
              <a key={link.id} href={`#${link.id}`} className={`text-xl font-medium ${activeSection === link.id ? 'text-white' : 'text-white/60'}`} onClick={(e) => handleNavClick(e, link)}>
                {link.label}
              </a>
            )
          ))}
          <button className="mt-4 w-full py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90" onClick={() => { setIsMobileMenuOpen(false); navigate('/signup'); }}>
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 z-10 w-full relative">
      <div className="max-w-[900px] mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center gap-4 mb-8 animate-fade-up stagger-1">
          <div className="flex -space-x-3">
            {[Sparkles, Briefcase, Target].map((Icon, i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-brand-dark border border-white/40 flex items-center justify-center relative overflow-hidden z-[1]">
                <div className="absolute inset-[2px] rounded-full bg-white flex items-center justify-center">
                  <Icon className="w-4 h-4 text-black" />
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-brand-muted font-medium">Trusted by ambitious job seekers</p>
        </div>

        <h1 className="text-brand-primary font-display text-[clamp(32px,6.2vw,80px)] leading-[1.1] tracking-[-0.04em] mb-6 flex flex-col items-center">
          <span className="animate-fade-up stagger-2">Your AI Copilot</span>
          <span className="animate-fade-up stagger-3">For Your Next Career Move</span>
        </h1>

        <p className="text-[#d0d0d0]/80 max-w-[500px] text-base md:text-lg leading-[1.55] mb-10 animate-fade-up stagger-4">
          Discover opportunities, build better applications, and prepare for interviews with one intelligent career copilot.
        </p>

        <div className="animate-fade-up stagger-5">
          <button onClick={() => navigate('/signup')} className="px-8 py-4 bg-white text-black font-semibold rounded-full transition-all duration-300 hover:-translate-y-[2px] hover:scale-[1.02] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_22px_rgba(255,255,255,0.32),0_0_44px_rgba(255,255,255,0.12)]">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}

function Product() {
  const features = [
    { icon: Bot, title: 'AI Mock Interviews', desc: 'Practice realistic technical, behavioral, and HR questions powered by Google Gemini AI.' },
    { icon: Zap, title: 'Instant Evaluation', desc: 'Receive immediate multi-criteria scoring across Relevance, Accuracy, Completeness, and Clarity.' },
    { icon: Brain, title: 'Adaptive Questions', desc: 'Question difficulty and depth dynamically adjust based on how well you answer previous questions.' },
    { icon: BarChart3, title: 'Performance Analytics', desc: 'Deep-dive into your strengths, weakness radar, and communication mastery over time.' },
    { icon: History, title: 'Interview History', desc: 'Track your growth and review detailed past transcripts, feedback points, and recommendations.' },
    { icon: Target, title: 'Personalized Practice', desc: 'Get tailored practice recommendations targeted specifically to your weakest interview categories.' },
  ];
  return (
    <section id="product" className="relative z-10 w-full py-24 md:py-32 px-6 bg-brand-background/95 backdrop-blur-2xl border-t border-white/5 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <p className="text-[11px] font-bold tracking-[0.2em] text-brand-muted uppercase">Product Capabilities</p>
          <h2 className="text-white font-display text-3xl md:text-5xl leading-tight tracking-tight">Engineered for realistic interview preparation</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><f.icon className="w-5 h-5" /></div>
              <h4 className="text-xl font-display text-white mb-3">{f.title}</h4>
              <p className="text-brand-muted leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { step: '01', title: 'Choose your role', desc: 'Select from Software Engineer, Frontend, Backend, ML, DSA, HR, or specify your custom job title and target difficulty.' },
    { step: '02', title: 'Start your interview', desc: 'Enter a clean, focused interview room designed to simulate genuine hiring manager interactions without distractions.' },
    { step: '03', title: 'Answer AI questions', desc: 'Type your detailed explanations in text format and receive instant structured evaluations after each response.' },
    { step: '04', title: 'Get your performance report', desc: 'Review a comprehensive final score, categorical strengths, weak points, and actionable next topics to master.' },
  ];
  return (
    <section id="how-it-works" className="relative z-10 w-full py-24 md:py-32 px-6 bg-brand-background/95 backdrop-blur-2xl border-t border-white/5 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <p className="text-[11px] font-bold tracking-[0.2em] text-brand-muted uppercase">Simple 4-Step Process</p>
          <h2 className="text-white font-display text-3xl md:text-5xl leading-tight tracking-tight">How HirePilot Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="p-8 rounded-2xl bg-[#1a1a1c] border border-white/5 hover:border-white/20 transition-colors">
              <div className="font-mono text-4xl font-black text-white/10 mb-6">{s.step}</div>
              <h4 className="text-lg font-bold text-white mb-3">{s.title}</h4>
              <p className="text-brand-muted leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section id="founder" className="relative z-10 w-full py-24 md:py-32 px-6 bg-brand-background/95 backdrop-blur-2xl border-t border-white/5 scroll-mt-20">
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start md:items-center">
        <div className="flex flex-col">
          <p className="text-[11px] font-bold tracking-[0.2em] text-brand-muted uppercase mb-4 md:mb-6">The Founder</p>
          <h2 className="text-white font-display text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-[-0.02em] hidden md:block">Built by someone who understands the job search.</h2>
        </div>
        <div className="flex flex-col mt-[-1rem] md:mt-0">
          <h3 className="md:hidden text-3xl font-display text-white mb-6">Faishal Naushad</h3>
          <div className="group relative rounded-2xl overflow-hidden mb-6 md:mb-8 aspect-square bg-[#28282A]">
            <img src="/faishal-founder.png" alt="Faishal Naushad" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 border border-white/10 rounded-2xl z-10 pointer-events-none"></div>
          </div>
          <div>
            <h3 className="hidden md:block text-2xl md:text-3xl font-display text-white mb-1">Faishal Naushad</h3>
            <p className="text-brand-muted text-sm tracking-wide uppercase mb-6 md:mb-8">Founder / CEO</p>
            <p className="text-[#C8C8C8] text-lg md:text-xl leading-relaxed font-light">"Building a smarter way to navigate your career."</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const navigate = useNavigate();

  const PRICING_CONFIG = {
    free: { basePrice: 0, gstRate: 0, gstAmount: 0, total: 0 },
    pro: { basePrice: 249, gstRate: 18, gstAmount: 44.82, total: 293.82 },
    career: { basePrice: 599, gstRate: 18, gstAmount: 107.82, total: 706.82 }
  };

  const plans = [
    {
      id: "free",
      name: "Free",
      priceDisplay: `₹${PRICING_CONFIG.free.total}`,
      priceDetails: null,
      interviews: "3 interviews",
      description: "Start exploring HirePilot",
      cta: "Start Free",
      features: [
        '3 Free Full Interviews',
        'Instant Multi-Criteria Scoring',
        'Lifetime Interview History'
      ]
    },
    {
      id: "pro",
      name: "Pro",
      priceDisplay: `₹${PRICING_CONFIG.pro.total}`,
      priceDetails: `Includes 18% GST\nBase price ₹${PRICING_CONFIG.pro.basePrice} + ₹${PRICING_CONFIG.pro.gstAmount} GST`,
      interviews: "15 interviews",
      description: "For active job seekers",
      cta: "Choose Pro",
      popular: true,
      features: [
        '15 Full Interviews per month',
        'Advanced Analytics',
        'Priority AI Processing',
        'Custom Job Titles'
      ]
    },
    {
      id: "career",
      name: "Career",
      priceDisplay: `₹${PRICING_CONFIG.career.total}`,
      priceDetails: `Includes 18% GST\nBase price ₹${PRICING_CONFIG.career.basePrice} + ₹${PRICING_CONFIG.career.gstAmount} GST`,
      interviews: "Unlimited interviews",
      description: "For serious job seekers",
      cta: "Choose Career",
      features: [
        'Unlimited Interviews',
        'All Pro Features',
        'Unlimited Adaptive Questions',
        'Early Access to New Features'
      ]
    }
  ];

  return (
    <section id="pricing" className="relative z-10 w-full py-24 md:py-32 px-6 bg-brand-background/95 backdrop-blur-2xl border-t border-white/5 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <p className="text-[11px] font-bold tracking-[0.2em] text-brand-muted uppercase">Pricing & Quota</p>
          <h2 className="text-white font-display text-3xl md:text-5xl leading-tight tracking-tight">Simple, transparent pricing</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.id} className={`p-8 rounded-3xl bg-[#121212] border ${plan.popular ? 'border-white/30' : 'border-white/10'} hover:border-white/20 transition-all flex flex-col relative`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h4 className="text-2xl font-display text-white mb-2">{plan.name}</h4>
                <p className="text-brand-muted text-sm min-h-[40px]">{plan.description}</p>
                <div className="mt-6 flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-display text-white">{plan.priceDisplay}</span>
                    <span className="text-brand-muted text-sm">/ month</span>
                  </div>
                  {plan.priceDetails && (
                    <p className="text-brand-muted text-xs whitespace-pre-line mt-1">{plan.priceDetails}</p>
                  )}
                </div>
                <div className="mt-2 text-brand-secondary text-sm font-semibold">
                  {plan.interviews}
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#d0d0d0]">
                    <CheckCircle2 className="w-5 h-5 text-white/50 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate(`/signup?plan=${plan.id}`)} 
                className={`w-full py-4 rounded-xl font-semibold transition-colors ${plan.popular ? 'bg-white text-black hover:bg-white/90' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



function Footer() {
  return (
    <footer className="relative z-10 w-full py-16 px-6 bg-[#121212] border-t border-white/10">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-12 md:justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
              <Triangle className="w-5 h-5 text-black fill-black" />
            </div>
            <span className="font-display text-white text-2xl">HirePilot</span>
          </div>
          <p className="text-brand-muted text-sm">Your AI-powered career copilot.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
          <div className="flex flex-col gap-4">
            <h5 className="text-white font-bold mb-1">Navigation</h5>
            {NAV_LINKS.filter(l => !l.isExternal).map(link => (
              <a key={link.id} href={`#${link.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }} className="text-sm text-brand-muted hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
            <Link to="/contact" className="text-sm text-brand-muted hover:text-white transition-colors">Contact</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h5 className="text-white font-bold mb-1">Legal</h5>
            <Link to="/privacy" className="text-sm text-brand-muted hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-brand-muted hover:text-white transition-colors">Terms & Conditions</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h5 className="text-white font-bold mb-1">Contact</h5>
            <Link to="/contact" className="text-sm text-brand-muted hover:text-white transition-colors">Contact HirePilot</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const Landing: React.FC = () => {
  const { hash } = useLocation();
  const activeSection = useActiveSection(['home', 'product', 'how-it-works', 'founder', 'pricing']);

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        scrollToSection(hash.replace('#', ''));
      }, 100);
    }
  }, [hash]);

  return (
    <main className="min-h-screen w-full bg-brand-background relative flex flex-col overflow-x-hidden">
      <video src={HERO_VIDEO_URL} autoPlay muted loop playsInline className="fixed inset-0 z-0 w-full h-full object-cover pointer-events-none" />
      <div className="fixed inset-0 z-[1] bg-black/40" />
      <Header activeSection={activeSection} />
      <div className="relative z-10 flex flex-col w-full w-full">
        <Hero />
        <Product />
        <HowItWorks />
        <Founder />
        <Pricing />
        <Footer />
      </div>
    </main>
  );
};
