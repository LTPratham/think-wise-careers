'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function ParticleGlobe() {
  const ref = useRef<THREE.Group>(null);
  
  // Generate random points on a sphere
  const count = 1500;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 3;
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={ref}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#4f46e5" transparent opacity={0.6} sizeAttenuation />
      </points>
      
      {/* Inner glowing sphere */}
      <Sphere args={[2.95, 32, 32]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
      </Sphere>
      
      {/* Orbital rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[4, 0.01, 16, 100]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[4.5, 0.005, 16, 100]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export default function InteractiveGlobe() {
  return (
    <div className="w-full h-full min-h-[600px]">
      <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <ParticleGlobe />
        </Float>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
