import React, { useState } from 'react';
import { Triangle, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../lib/useScrollReveal';

export const Contact: React.FC = () => {
  useScrollReveal();
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would connect this to an API/email provider.
    setStatus('success');
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <main className="min-h-screen w-full bg-brand-background text-[#d0d0d0] relative flex flex-col font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1000px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Triangle className="w-5 h-5 text-black fill-black" />
            </div>
            <span className="font-display text-white text-xl hidden sm:block">HirePilot</span>
          </Link>
          <Link 
            to="/" 
            className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to HirePilot
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-[600px] mx-auto px-6 pt-32 pb-24 w-full flex-grow flex flex-col justify-center reveal-hidden">
        <h1 className="text-white font-display text-4xl md:text-5xl mb-4 text-center">Contact Us</h1>
        <p className="text-brand-muted text-center mb-10 max-w-md mx-auto">
          Reach out directly for platform inquiries, support, partnerships, or developer feedback.
        </p>

        <div className="bg-[#121212] p-8 rounded-3xl border border-white/10 shadow-xl">
          {status === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center py-16 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white">Thanks!</h4>
              <p className="text-brand-muted text-lg">Your message has been received.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs text-brand-muted uppercase tracking-wider ml-1 font-semibold">Name</label>
                <input 
                  id="name"
                  required 
                  type="text" 
                  className="w-full bg-[#1a1a1c] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30 transition-colors" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs text-brand-muted uppercase tracking-wider ml-1 font-semibold">Email</label>
                <input 
                  id="email"
                  required 
                  type="email" 
                  className="w-full bg-[#1a1a1c] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30 transition-colors" 
                  placeholder="john@example.com" 
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs text-brand-muted uppercase tracking-wider ml-1 font-semibold">Subject</label>
                <input 
                  id="subject"
                  required 
                  type="text" 
                  className="w-full bg-[#1a1a1c] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30 transition-colors" 
                  placeholder="How can we help?" 
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs text-brand-muted uppercase tracking-wider ml-1 font-semibold">Message</label>
                <textarea 
                  id="message"
                  required 
                  rows={5} 
                  className="w-full bg-[#1a1a1c] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30 transition-colors resize-none" 
                  placeholder="Your message here..." 
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-4 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default Contact;
