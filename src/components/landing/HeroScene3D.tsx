import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroScene3DProps {
  className?: string;
}

export const HeroScene3D: React.FC<HeroScene3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect mobile or low power
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 250 : 600;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for mouse parallax
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Core - Translucent Glass Sphere
    const sphereGeo = new THREE.SphereGeometry(1.6, 64, 64);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x050a14,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 1.2,
      transparent: true,
      opacity: 0.85,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
    mainGroup.add(coreSphere);

    // 2. Inner Glowing Energy Mesh (Icosahedron wireframe)
    const innerGeo = new THREE.IcosahedronGeometry(1.1, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerCore);

    // 2b. Pulsing Point Light inside Core
    const innerLight = new THREE.PointLight(0x00f0ff, 4, 15);
    innerLight.position.set(0, 0, 0);
    mainGroup.add(innerLight);

    const violetLight = new THREE.PointLight(0x8a2be2, 3, 12);
    violetLight.position.set(2, -1, 1);
    mainGroup.add(violetLight);

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight.position.set(5, 5, 4);
    scene.add(dirLight);

    // 3. Orbital Rings (Torus)
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.015, 16, 100), ringMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.012, 16, 100), ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 5;
    mainGroup.add(ring2);

    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(3.3, 0.01, 16, 100), ringMat3);
    ring3.rotation.z = Math.PI / 6;
    ring3.rotation.y = -Math.PI / 3;
    mainGroup.add(ring3);

    // 4. Floating Data Particles
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x00f0ff);
    const color2 = new THREE.Color(0xa855f7);
    const color3 = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // distribute spherical shell around core
      const radius = 2.0 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);

      const mixedColor = Math.random() > 0.6 ? color1 : (Math.random() > 0.5 ? color2 : color3);
      colorArray[i] = mixedColor.r;
      colorArray[i + 1] = mixedColor.g;
      colorArray[i + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.035 : 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // 5. Orbiting Nodes (Floating AI Stage Spheres)
    const stageNodes: THREE.Mesh[] = [];
    const stageColors = [0x00f0ff, 0x10b981, 0xa855f7, 0x38bdf8, 0xf43f5e];
    for (let i = 0; i < 5; i++) {
      const nodeGeo = new THREE.SphereGeometry(0.09, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: stageColors[i],
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      mainGroup.add(node);
      stageNodes.push(node);
    }

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      mainGroup.rotation.y = mouseX * 0.6 + elapsedTime * 0.08;
      mainGroup.rotation.x = -mouseY * 0.4 + Math.sin(elapsedTime * 0.3) * 0.05;

      // Inner wireframe counter-rotation and subtle pulse
      innerCore.rotation.y = -elapsedTime * 0.25;
      innerCore.rotation.x = elapsedTime * 0.15;
      const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.04;
      innerCore.scale.set(pulse, pulse, pulse);

      // Rings rotation
      ring1.rotation.z = elapsedTime * 0.1;
      ring2.rotation.x = -elapsedTime * 0.12;
      ring3.rotation.y = elapsedTime * 0.08;

      // Orbiting Stage Nodes
      stageNodes.forEach((node, idx) => {
        const speed = 0.4 + idx * 0.05;
        const radius = 2.4 + (idx % 2) * 0.5;
        const angle = elapsedTime * speed + (idx * (Math.PI * 2)) / 5;
        node.position.x = Math.cos(angle) * radius;
        node.position.z = Math.sin(angle) * radius;
        node.position.y = Math.sin(angle * 2) * 0.5;
      });

      // Slowly rotate particle field
      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full pointer-events-none ${className}`}
      style={{ minHeight: '420px' }}
    />
  );
};
