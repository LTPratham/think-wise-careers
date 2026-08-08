'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function MorphingParticles({ className = "absolute inset-0 z-0 pointer-events-none" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    setMounted(true);

    const scene = new THREE.Scene();
    
    // Use container dimensions instead of window
    const getContainerSize = () => {
      if (!mountRef.current) return { width: window.innerWidth, height: window.innerHeight };
      const { clientWidth, clientHeight } = mountRef.current;
      return { width: clientWidth || window.innerWidth, height: clientHeight || window.innerHeight };
    };

    const { width, height } = getContainerSize();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const particleCount = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.025,
      color: '#6366f1', // Indigo-500, visible on both light and dark backgrounds
      transparent: true,
      opacity: 0.6,
      blending: THREE.NormalBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      particles.rotation.y = time * 0.05;
      particles.rotation.x = time * 0.02;

      const positionAttribute = geometry.attributes.position;
      const array = positionAttribute.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        array[i3 + 1] += Math.sin(time + array[i3]) * 0.003;
      }
      positionAttribute.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const { width, height } = getContainerSize();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef}
      className={`${className} transition-opacity duration-[2000ms] ease-out ${mounted ? 'opacity-100' : 'opacity-0'}`} 
    />
  );
}
