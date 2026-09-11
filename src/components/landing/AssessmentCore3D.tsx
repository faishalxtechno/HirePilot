import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type AssessmentNodeId = 'technical' | 'hr' | 'ai' | 'assessment';

interface AssessmentCore3DProps {
  activeNode: AssessmentNodeId | null;
  onNodeHover: (node: AssessmentNodeId | null) => void;
  onNodeSelect: (node: AssessmentNodeId) => void;
  className?: string;
}

export const AssessmentCore3D: React.FC<AssessmentCore3DProps> = ({
  activeNode,
  onNodeHover,
  onNodeSelect,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeNodeRef = useRef<AssessmentNodeId | null>(activeNode);

  useEffect(() => {
    activeNodeRef.current = activeNode;
  }, [activeNode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = isMobile ? 10 : 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central AI Core Sphere
    const coreGeo = new THREE.SphereGeometry(1.2, 64, 64);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x050a14,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 1.5,
      transparent: true,
      opacity: 0.8,
    });
    const coreSphere = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreSphere);

    // Inner wireframe for core
    const innerGeo = new THREE.IcosahedronGeometry(0.8, 2);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.4 });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerCore);

    // Ambient light
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const pointLight = new THREE.PointLight(0x00f0ff, 3, 10);
    mainGroup.add(pointLight);

    // Nodes definition
    const nodeDefs = [
      { id: 'technical' as const, angle: 0, color: 0x00f0ff, yOffset: 0.5 },
      { id: 'hr' as const, angle: Math.PI / 2, color: 0xa855f7, yOffset: -0.2 },
      { id: 'ai' as const, angle: Math.PI, color: 0xf43f5e, yOffset: 0.3 },
      { id: 'assessment' as const, angle: (3 * Math.PI) / 2, color: 0x10b981, yOffset: -0.4 }
    ];

    const nodes: { mesh: THREE.Mesh; id: AssessmentNodeId; baseAngle: number; radius: number; yOffset: number; color: number }[] = [];
    
    // Orbital path (thin lines)
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 });
    const orbitGeometry = new THREE.BufferGeometry();
    const orbitPoints = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      orbitPoints.push(new THREE.Vector3(Math.cos(theta) * 3.5, 0, Math.sin(theta) * 3.5));
    }
    orbitGeometry.setFromPoints(orbitPoints);
    const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
    orbitLine.rotation.x = 0.2;
    mainGroup.add(orbitLine);

    nodeDefs.forEach((def) => {
      const geo = new THREE.SphereGeometry(0.15, 32, 32);
      const mat = new THREE.MeshBasicMaterial({ color: def.color });
      const mesh = new THREE.Mesh(geo, mat);
      
      // Add a glow ring to each node
      const ringGeo = new THREE.TorusGeometry(0.25, 0.02, 16, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: def.color, transparent: true, opacity: 0.5 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      mesh.add(ring);

      // We add UserData to identify it in Raycasting
      mesh.userData = { id: def.id };

      mainGroup.add(mesh);
      nodes.push({ mesh, id: def.id, baseAngle: def.angle, radius: 3.5, yOffset: def.yOffset, color: def.color });
    });

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-2, -2);
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodes.map(n => n.mesh));
      if (intersects.length > 0) {
        const id = intersects[0].object.userData.id as AssessmentNodeId;
        onNodeSelect(id);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let animId: number;
    let hoveredNodeId: AssessmentNodeId | null = null;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow rotation for the entire group
      mainGroup.rotation.y = elapsedTime * 0.05;

      // Pulse the inner core
      const pulse = 1 + Math.sin(elapsedTime * 2) * 0.05;
      innerCore.scale.set(pulse, pulse, pulse);
      innerCore.rotation.y -= 0.01;
      innerCore.rotation.x += 0.01;

      // Update nodes positions (orbiting)
      nodes.forEach((n) => {
        // counteract main group rotation so nodes don't spin wildly, or let them spin
        const angle = n.baseAngle + elapsedTime * 0.2; 
        
        // Target scales and opacities based on active state
        const isActive = activeNodeRef.current === n.id;
        
        let targetScale = 1;
        if (isActive) {
          targetScale = 1.5;
        }

        // Apply smooth scaling
        n.mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        n.mesh.position.x = Math.cos(angle) * n.radius;
        n.mesh.position.z = Math.sin(angle) * n.radius;
        n.mesh.position.y = n.yOffset + Math.sin(elapsedTime * 1.5 + n.baseAngle) * 0.2;
      });

      // Handle hover state
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodes.map(n => n.mesh));
      
      let currentHover: AssessmentNodeId | null = null;
      if (intersects.length > 0) {
        currentHover = intersects[0].object.userData.id as AssessmentNodeId;
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = 'default';
      }

      if (currentHover !== hoveredNodeId) {
        hoveredNodeId = currentHover;
        onNodeHover(hoveredNodeId);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      document.body.style.cursor = 'default';
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full ${className}`}
      style={{ minHeight: '500px' }}
    />
  );
};
