import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Code2, Users, Cpu, FileText } from 'lucide-react';
import { AssessmentCore3D, AssessmentNodeId } from './AssessmentCore3D';

gsap.registerPlugin(ScrollTrigger);

export const InterviewTypes: React.FC = () => {
  const navigate = useNavigate();
  const [activeNode, setActiveNode] = useState<AssessmentNodeId>('technical');
  const [hoveredNode, setHoveredNode] = useState<AssessmentNodeId | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const displayNode = hoveredNode || activeNode;

  const nodeData = {
    technical: {
      title: 'Technical Interview',
      desc: 'Test coding, DSA, algorithms and problem-solving skills through realistic technical challenges.',
      tags: ['Coding', 'DSA', 'Algorithms', 'Problem Solving'],
      route: '/interview/setup?type=technical',
      accent: 'text-cyan-400',
      bgAccent: 'bg-cyan-500/10',
      borderAccent: 'border-cyan-500/20',
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      visual: (
        <div className="w-full bg-[#0a0a0f] rounded-xl border border-white/10 p-4 font-mono text-[10px] sm:text-xs text-white/70 overflow-hidden relative">
          <div className="text-cyan-400 mb-2">function solve(input) {'{'}</div>
          <div className="pl-4">{'// Implementation'}</div>
          <div className="text-cyan-400 mt-2">{'}'}</div>
          <div className="mt-4 pt-4 border-t border-white/10 flex justify-between">
            <div><span className="text-white/40">Runtime</span> O(n)</div>
            <div><span className="text-white/40">Memory</span> O(1)</div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
        </div>
      )
    },
    hr: {
      title: 'HR & Behavioral',
      desc: 'Practice communication, confidence and behavioral questions in realistic interview scenarios.',
      tags: ['Communication', 'Behavioral', 'Situational', 'Confidence'],
      route: '/interview/setup?type=hr',
      accent: 'text-purple-400',
      bgAccent: 'bg-purple-500/10',
      borderAccent: 'border-purple-500/20',
      icon: <Users className="w-5 h-5 text-purple-400" />,
      visual: (
        <div className="w-full bg-[#0a0a0f] rounded-xl border border-white/10 p-5 flex flex-col gap-4">
          <div className="text-sm text-white font-medium italic">
            "Tell me about a time you solved a difficult problem under pressure."
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] text-white/50 uppercase tracking-wider">Recording Answer...</span>
          </div>
          <div className="flex gap-1 h-4 items-end mt-2 opacity-60">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-1.5 bg-purple-400 rounded-t-sm" style={{ height: `${Math.max(20, Math.random() * 100)}%` }} />
            ))}
          </div>
        </div>
      )
    },
    ai: {
      title: 'AI Interview Simulation',
      desc: 'Experience a realistic AI-powered interview and receive actionable performance insights.',
      tags: ['AI Driven', 'Adaptive', 'Realistic', 'Deep Insights'],
      route: '/interview/setup?type=mixed',
      accent: 'text-rose-400',
      bgAccent: 'bg-rose-500/10',
      borderAccent: 'border-rose-500/20',
      icon: <Cpu className="w-5 h-5 text-rose-400" />,
      visual: (
        <div className="w-full bg-[#0a0a0f] rounded-xl border border-white/10 p-5 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 blur-[50px]" />
          <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center relative">
            <div className="absolute inset-0 border-2 border-rose-400 rounded-full border-t-transparent animate-spin" />
            <Cpu className="w-6 h-6 text-white/70" />
          </div>
          <div className="text-center">
            <div className="text-[10px] font-mono text-rose-400 mb-1">ANALYZING RESPONSE...</div>
            <div className="flex gap-4 text-xs font-medium text-white/80">
              <span>Comm: 91%</span>
              <span>Tech: 94%</span>
            </div>
          </div>
        </div>
      )
    },
    assessment: {
      title: 'Skill Assessment',
      desc: 'Test your knowledge with role-specific assessments designed around the skills companies value.',
      tags: ['Role Specific', 'Multiple Choice', 'Instant Scoring', 'Validation'],
      route: '/interview/setup?type=dsa',
      accent: 'text-emerald-400',
      bgAccent: 'bg-emerald-500/10',
      borderAccent: 'border-emerald-500/20',
      icon: <FileText className="w-5 h-5 text-emerald-400" />,
      visual: (
        <div className="w-full bg-[#0a0a0f] rounded-xl border border-white/10 p-5 space-y-3">
          <div className="flex justify-between items-center text-[10px] font-mono text-white/40 mb-2">
            <span>Question 07 / 20</span>
            <span className="text-emerald-400">Score: 92%</span>
          </div>
          <div className="text-xs text-white/90 font-medium">Which data structure provides average O(1) lookup?</div>
          <div className="space-y-2 mt-3">
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white/60">A. Array</div>
            <div className="px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 flex justify-between">
              <span>B. Hash Table</span>
              <span>✓</span>
            </div>
          </div>
        </div>
      )
    }
  };

  const currentData = nodeData[displayNode];

  useEffect(() => {
    // Animate panel when activeNode changes
    if (panelRef.current) {
      gsap.fromTo(panelRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [displayNode]);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Sticky scroll setup
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=100%',
      pin: true,
      anticipatePin: 1,
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#020204] overflow-hidden flex flex-col" id="types">
      
      {/* Premium Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      {/* Header Area */}
      <div className="w-full pt-16 px-6 lg:px-12 xl:px-20 relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] mb-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/60 font-semibold">
            Assessment Experience
          </span>
        </div>
        
        <h2 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Find the interview that fits your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
            path.
          </span>
        </h2>
        
        <p className="mt-4 text-base sm:text-lg text-white/50 max-w-2xl mx-auto font-light">
          Choose an experience designed to challenge your skills, simulate real interviews, and show you where you stand.
        </p>
      </div>

      {/* Interactive Core & Panel Area */}
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 relative z-10 pb-16 lg:pb-0">
        
        {/* Left: 3D Core */}
        <div className="w-full lg:w-3/5 h-[400px] lg:h-full relative">
           <AssessmentCore3D 
             activeNode={activeNode}
             onNodeHover={setHoveredNode}
             onNodeSelect={setActiveNode}
           />
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/30 uppercase tracking-widest hidden lg:block">
             Interact with nodes
           </div>
        </div>

        {/* Right: Floating UI Panel */}
        <div className="w-full lg:w-2/5 flex justify-end">
          <div 
            ref={panelRef}
            className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col gap-6 transform transition-all"
          >
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${currentData.bgAccent} ${currentData.borderAccent} border`}>
                {currentData.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">{currentData.title}</h3>
            </div>

            {/* Description */}
            <p className="text-sm text-white/60 leading-relaxed">
              {currentData.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {currentData.tags.map(tag => (
                <span key={tag} className="text-[10px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/70 font-mono">
                  {tag}
                </span>
              ))}
            </div>

            {/* Visual Interface Element */}
            <div className="w-full pt-2">
               {currentData.visual}
            </div>

            {/* CTA */}
            <button 
              onClick={() => navigate(currentData.route)}
              className="mt-4 w-full py-4 rounded-xl bg-white text-black font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/90 transition-colors group"
            >
              <span>Start {currentData.title.split(' ')[0]}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
