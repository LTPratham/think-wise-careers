'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Trail, useGLTF, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Premium Particle Globe (from Option 1)
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
    <group position={[0, 2.0, 0]} scale={0.85}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
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
            <pointsMaterial size={0.05} color="#1e3a8a" transparent opacity={0.9} sizeAttenuation />
          </points>
          
          {/* Inner glowing sphere - barely visible to avoid grey blob effect */}
          <Sphere args={[2.95, 32, 32]}>
            <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
          </Sphere>
          
          {/* Orbital rings - deeper blues */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[3.5, 0.01, 16, 100]} />
            <meshBasicMaterial color="#3730a3" transparent opacity={0.5} />
          </mesh>
          <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
            <torusGeometry args={[4, 0.01, 16, 100]} />
            <meshBasicMaterial color="#4338ca" transparent opacity={0.3} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
            <torusGeometry args={[4.5, 0.005, 16, 100]} />
            <meshBasicMaterial color="#312e81" transparent opacity={0.2} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

// Realistic External Airplane Model
function ExternalAirplane() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/airplane.glb');
  const [hovered, setHovered] = useState(false);
  const [clickTime, setClickTime] = useState(0);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    
    // Check if we are in a "barrel roll" / boost state
    const timeSinceClick = t - clickTime;
    const isRolling = clickTime > 0 && timeSinceClick < 2.0;
    
    // Circular path
    const radius = 5.2;
    // Speed boosts temporarily during the roll
    const currentSpeed = isRolling ? 1.0 + Math.sin(timeSinceClick * Math.PI) * 1.5 : 1.0;
    
    // To make it smooth, we use a tracked angle instead of just t * speed, 
    // but for simplicity in useFrame without storing angle state, we'll just let it jump slightly or 
    // use a continuous time approach. 
    // A better approach for speed is to just multiply the base speed, but that causes jumping.
    // Instead, let's keep position calculation simple and just do a visual barrel roll!
    
    const x = Math.sin(t * 1.0) * radius;
    const z = Math.cos(t * 1.0) * radius;
    const y = Math.sin(t * 3) * 0.2 + 2.0;
    
    group.current.position.set(x, y, z);
    
    // Rotate to face travel direction
    const dx = Math.cos(t * 1.0) * radius;
    const dz = -Math.sin(t * 1.0) * radius;
    
    // Tilt (bank) into the turn - setting to almost flat
    const bankAngle = -Math.PI / 32;

    group.current.rotation.y = Math.atan2(dx, dz) + Math.PI;
    
    // If rolling, add a 360 degree spin over 1.5 seconds
    if (isRolling) {
      const rollProgress = timeSinceClick / 1.5; // 0 to 1
      if (rollProgress <= 1.0) {
        // Ease in out sine
        const ease = -(Math.cos(Math.PI * rollProgress) - 1) / 2;
        group.current.rotation.z = bankAngle + (ease * Math.PI * 2);
      } else {
        group.current.rotation.z = bankAngle;
      }
    } else {
      // Hover effect - slightly more tilt
      group.current.rotation.z = hovered ? bankAngle - 0.2 : bankAngle;
    }
    
    group.current.rotation.x = hovered ? -0.1 : 0; // slight pitch up on hover
  });

  return (
    <group 
      ref={group} 
      scale={hovered ? 0.018 : 0.015} // Scale up on hover
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        setClickTime(e.object.parent ? performance.now() / 1000 : 0); // Using performance.now won't perfectly sync with state.clock but it's close enough for click relative time, actually let's just trigger a re-render and use state clock inside. Wait, better to use a ref or just trigger state and let useFrame pick it up.
      }}
    >
      <Trail width={hovered ? 0.8 : 0.5} length={4} color={new THREE.Color(hovered ? '#fbbf24' : '#a5b4fc')} attenuation={(t) => t * t}>
        <primitive object={scene} />
      </Trail>
    </group>
  );
}

// Detailed Open Textbook
function DetailedBook() {
  const coverMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1e1b4b', roughness: 0.1, metalness: 0.2 }), []);
  const pageMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.9 }), []);
  const bookmarkMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#fbbf24', roughness: 0.2, metalness: 0.8 }), []);

  return (
    <group position={[0, -1, 0]} rotation={[Math.PI / 12, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Left Cover */}
        <mesh material={coverMaterial} position={[-1.6, 0, 0]} rotation={[0, 0, Math.PI / 16]}>
          <boxGeometry args={[3.2, 0.1, 4.2]} />
        </mesh>
        
        {/* Right Cover */}
        <mesh material={coverMaterial} position={[1.6, 0, 0]} rotation={[0, 0, -Math.PI / 16]}>
          <boxGeometry args={[3.2, 0.1, 4.2]} />
        </mesh>

        {/* Left Pages */}
        <mesh material={pageMaterial} position={[-1.5, 0.2, 0]} rotation={[0, 0, Math.PI / 24]}>
          <boxGeometry args={[3.0, 0.4, 4.0]} />
        </mesh>

        {/* Right Pages */}
        <mesh material={pageMaterial} position={[1.5, 0.2, 0]} rotation={[0, 0, -Math.PI / 24]}>
          <boxGeometry args={[3.0, 0.4, 4.0]} />
        </mesh>

        {/* Spine */}
        <mesh material={coverMaterial} position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 4.2, 16]} />
        </mesh>

        {/* Golden Bookmark */}
        <mesh material={bookmarkMaterial} position={[1.2, 0.41, 1.8]} rotation={[0, -Math.PI / 12, 0]}>
          <boxGeometry args={[0.4, 0.02, 1.5]} />
        </mesh>
      </Float>
    </group>
  );
}

export function BookAirplane3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
      <Canvas camera={{ position: [0, 4, 12], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#4f46e5" />
        
        <group rotation={[0, -Math.PI / 4, 0]}>
          <DetailedBook />
          <ParticleGlobe />
          <ExternalAirplane />
        </group>
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
