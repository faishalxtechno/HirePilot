import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Home, ArrowLeft, Compass } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080B14] px-4 py-12 relative overflow-hidden text-white font-sans">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#7657FF]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-[#36D6FF]/10 rounded-full blur-[140px]" />
      </div>

      <div className="w-full max-w-md text-center space-y-6 relative z-10 animate-fade-in">
        <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto shadow-2xl">
          <Compass className="w-10 h-10 text-cyan-400 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-400 glass-pill px-3 py-1 rounded-full border border-cyan-500/20">
            Error 404
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-white mt-3">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
            The page you're looking for doesn't exist, has been moved, or the link has expired.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full" leftIcon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
