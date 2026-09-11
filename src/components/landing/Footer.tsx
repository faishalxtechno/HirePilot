import React from 'react';
import { Link } from 'react-router-dom';
import { Triangle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full py-16 px-6 sm:px-8 bg-[#000000] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        
        {/* Brand column */}
        <div className="flex flex-col gap-4 max-w-sm">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              <Triangle className="w-3.5 h-3.5 text-black fill-black transform rotate-90" />
            </div>
            <span className="font-sans font-bold text-xl text-white tracking-tight">
              HirePilot
            </span>
          </Link>

          <p className="text-sm text-white/50 leading-relaxed font-light">
            AI-powered recruitment for modern teams. Discover, evaluate and hire the best engineering talent with real-time neural intelligence.
          </p>

          <div className="text-xs font-mono text-white/30 mt-4">
            &copy; {new Date().getFullYear()} HirePilot Inc. All rights reserved.
          </div>
        </div>

        {/* Links matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-16 text-xs sm:text-sm">
          
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-white/40 font-semibold mb-1">
              Platform
            </span>
            <a href="#product" className="text-white/60 hover:text-white transition-colors">Product</a>
            <a href="#pipeline" className="text-white/60 hover:text-white transition-colors">How it Works</a>
            <a href="#features" className="text-white/60 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-white/60 hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-white/40 font-semibold mb-1">
              Company
            </span>
            <a href="#founder" className="text-white/60 hover:text-white transition-colors">Founder</a>
            <Link to="/contact" className="text-white/60 hover:text-white transition-colors">Contact</Link>
            <Link to="/privacy" className="text-white/60 hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-white/60 hover:text-white transition-colors">Terms</Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-white/40 font-semibold mb-1">
              Connect
            </span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              X (Twitter)
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              GitHub
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};
