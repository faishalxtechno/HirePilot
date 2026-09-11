import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import * as THREE from 'three';
import { useAuth } from '../../context/AuthContext';

export const FinalCTA: React.FC = () => {
  const navigate = useNavigate();
  const canvasMountRef = useRef<HTMLDivElement>(null);

  const handleStartInterview = () => {
    navigate('/interview/setup');
  };

  const handleExploreCompanies = () => {
    navigate('/jobs');
  };

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // AI Core Wireframe
    const geo = new THREE.IcosahedronGeometry(1.5, 2);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const core = new THREE.Mesh(geo, mat);
    scene.add(core);

    // Subtle Torus Ring
    const ringGeo = new THREE.TorusGeometry(2.2, 0.015, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Particles
    const pGeo = new THREE.BufferGeometry();
    const pCount = 180;
    const pArray = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      const r = 2.0 + Math.random() * 2.5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(Math.random() * 2 - 1);
      pArray[i] = r * Math.sin(ph) * Math.cos(th);
      pArray[i + 1] = r * Math.sin(ph) * Math.sin(th);
      pArray[i + 2] = r * Math.cos(ph);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pArray, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      core.rotation.y = elapsed * 0.15;
      core.rotation.x = elapsed * 0.1;
      ring.rotation.z = elapsed * 0.08;
      particles.rotation.y = elapsed * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="relative w-full py-32 sm:py-48 px-6 bg-[#020204] border-t border-white/[0.06] overflow-hidden text-center">
      
      {/* 3D Rotating AI Core Background */}
      <div
        ref={canvasMountRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-40 flex items-center justify-center"
      />

      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-8">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs uppercase tracking-widest font-mono font-medium text-white/70">
            Practice. Perform. Get Discovered.
          </span>
        </div>

        {/* Huge Headline */}
        <h2 className="font-sans font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.06] mb-6">
          Ready to see what <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-indigo-300">
            you can do?
          </span>
        </h2>

        {/* Supporting text */}
        <p className="max-w-xl text-base sm:text-lg text-white/60 leading-relaxed font-light mb-10">
          Take your next interview. Understand your strengths. Discover where they can take you.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={handleStartInterview}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-white text-black font-semibold text-sm tracking-wide shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Start Your Interview</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            onClick={handleExploreCompanies}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-white/20 font-medium text-sm tracking-wide transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Explore Companies</span>
          </button>
        </div>

        {/* Bullet points */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-white/50">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI-powered feedback</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Realistic scenarios</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Free to start</span>
          </div>
        </div>

      </div>
    </section>
  );
};
