'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

// The Realistic Parrot Model (Placeholder for an Airplane)
function FlyingParrot() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/Parrot.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Play the flying animation (the parrot has a built-in flap animation)
    const actionName = Object.keys(actions)[0];
    if (actionName && actions[actionName]) {
      actions[actionName].play();
    }
  }, [actions]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    
    // Circular path around the book
    const radius = 3.5;
    const speed = 1.0;
    const x = Math.sin(t * speed) * radius;
    const z = Math.cos(t * speed) * radius;
    const y = Math.sin(t * 3) * 0.5 + 1.5;
    
    group.current.position.set(x, y, z);
    
    // Rotate to face travel direction
    const dx = Math.cos(t * speed) * radius;
    const dz = -Math.sin(t * speed) * radius;
    group.current.rotation.y = Math.atan2(dx, dz) + Math.PI;
    group.current.rotation.z = Math.sin(t * 3) * 0.2; 
  });

  return (
    <group ref={group} scale={0.02}>
      <primitive object={scene} />
    </group>
  );
}

// A simple literal book platform
function BookBase() {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Book Cover */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[4, 0.4, 5.5]} />
        <meshStandardMaterial color="#312e81" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Book Pages */}
      <mesh position={[0, 0.21, 0]}>
        <boxGeometry args={[3.8, 0.05, 5.3]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.8} />
      </mesh>
      {/* Golden Bookmark */}
      <mesh position={[0, 0.25, 2.7]}>
        <boxGeometry args={[0.5, 0.02, 1]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function RealisticModelHero() {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
      <Canvas camera={{ position: [0, 4, 12], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
        <group rotation={[0, -Math.PI / 4, 0]}>
          <BookBase />
          <FlyingParrot />
        </group>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
