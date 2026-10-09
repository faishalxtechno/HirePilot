import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full py-16 px-4 sm:px-8 bg-slate-50 border-t border-slate-200/90 text-slate-600">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        
        {/* Brand column */}
        <div className="flex flex-col gap-4 max-w-sm">
          <Link to="/" className="flex items-center group focus:outline-none" aria-label="HirePilot Home">
            <img
              src="/assets/hirepilot-logo.png"
              alt="HirePilot"
              className="h-10 w-auto max-h-12 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            AI-powered interview preparation and career copilot. Practice real interview scenarios, get instant rubric feedback, and build standout resumes.
          </p>

          <div className="text-xs font-mono text-slate-400 mt-2">
            &copy; {new Date().getFullYear()} HirePilot Inc. All rights reserved.
          </div>
        </div>

        {/* Links matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-14 text-xs sm:text-sm">
          
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-900 font-bold mb-1">
              Platform
            </span>
            <a href="#product" className="text-slate-600 hover:text-[#8750FF] transition-colors">Product Studio</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-[#8750FF] transition-colors">How It Works</a>
            <a href="#features" className="text-slate-600 hover:text-[#8750FF] transition-colors">Core Features</a>
            <a href="#pricing" className="text-slate-600 hover:text-[#8750FF] transition-colors">Pricing Plans</a>
            <a href="#faq" className="text-slate-600 hover:text-[#8750FF] transition-colors">FAQs</a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-900 font-bold mb-1">
              Company
            </span>
            <a href="#founder" className="text-slate-600 hover:text-[#8750FF] transition-colors">Meet the Founder</a>
            <Link to="/contact" className="text-slate-600 hover:text-[#8750FF] transition-colors">Contact Support</Link>
            <Link to="/privacy" className="text-slate-600 hover:text-[#8750FF] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-slate-600 hover:text-[#8750FF] transition-colors">Terms of Service</Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-900 font-bold mb-1">
              Connect
            </span>
            <a
              href="https://www.linkedin.com/in/faishal-naushad-b28807273/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#8750FF] transition-colors flex items-center gap-1.5"
            >
              <i className="pi pi-linkedin text-xs" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/techifyfaishal?stkn=MWE1ZGo1cmEzYWw3eA=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-pink-600 transition-colors flex items-center gap-1.5"
            >
              <i className="pi pi-instagram text-xs" />
              <span>Instagram</span>
            </a>
            <a
              href="https://github.com/faishalxtechno/HirePilot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5"
            >
              <i className="pi pi-github text-xs" />
              <span>GitHub</span>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
