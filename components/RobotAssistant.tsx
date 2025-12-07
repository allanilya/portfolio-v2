'use client';

import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Environment } from '@react-three/drei';
import { motion, useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import { RobotState } from '@/lib/useRobotController';

// 3D Robot Model Component with Animations
function Robot3D({ robotState }: { robotState: RobotState }) {
  const { scene } = useGLTF('/wasteland_robot.glb');
  const robotRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Object3D | null>(null);
  const gearsRef = useRef<THREE.Object3D[]>([]);
  const tracksRef = useRef<THREE.Object3D[]>([]);

  // Find robot parts in the scene graph
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      const name = child.name.toLowerCase();

      // Find head/top part
      if (name.includes('head') || name.includes('top') || name.includes('turret')) {
        headRef.current = child;
      }

      // Find gears/wheels
      if (name.includes('gear') || name.includes('wheel') || name.includes('cog')) {
        gearsRef.current.push(child);
      }

      // Find tracks/treads
      if (name.includes('track') || name.includes('tread') || name.includes('belt')) {
        tracksRef.current.push(child);
      }
    });
  }, [scene]);

  // Animate robot parts
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Animate head based on state
    if (headRef.current) {
      if (robotState === 'repairing') {
        // Repairing: focused head movement
        headRef.current.rotation.y = Math.sin(time * 4) * 0.3;
        headRef.current.rotation.x = Math.sin(time * 3) * 0.1;
      } else if (robotState === 'navigating') {
        // Navigating: determined forward look with slight bob
        headRef.current.rotation.y = Math.sin(time * 1.5) * 0.1;
        headRef.current.rotation.x = Math.sin(time * 2) * 0.05;
      } else {
        // Idle: gentle swaying and looking around
        headRef.current.rotation.y = Math.sin(time * 0.5) * 0.3;
        headRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
        headRef.current.rotation.z = Math.sin(time * 0.4) * 0.05; // Slight tilt
      }
    }

    // Animate gears - spin them
    gearsRef.current.forEach((gear, index) => {
      const speed = robotState === 'navigating' ? 0.15 : robotState === 'repairing' ? 0.12 : 0.03;
      gear.rotation.z += speed * (index % 2 === 0 ? 1 : -1);
    });

    // Animate tracks - simulate movement
    tracksRef.current.forEach((track, index) => {
      if (robotState === 'navigating') {
        // Fast movement when navigating
        track.position.x = Math.sin(time * 5 + index) * 0.03;
      } else if (robotState === 'repairing') {
        // Vibration when repairing
        track.position.x = Math.sin(time * 8 + index) * 0.015;
        track.position.y = Math.sin(time * 10 + index) * 0.01;
      } else {
        // Idle fidgeting
        track.position.x = Math.sin(time * 0.7 + index) * 0.005;
      }
    });

    // Overall robot body animation
    if (robotRef.current) {
      if (robotState === 'navigating') {
        // Navigating: forward tilt and slight bounce
        robotRef.current.position.y = Math.sin(time * 6) * 0.03;
        robotRef.current.rotation.z = Math.sin(time * 3) * 0.02;
      } else if (robotState === 'repairing') {
        // Repairing: vibration
        robotRef.current.position.y = Math.sin(time * 10) * 0.02;
        robotRef.current.rotation.z = Math.sin(time * 12) * 0.03;
      } else {
        // Idle: gentle bobbing and swaying
        robotRef.current.position.y = Math.sin(time * 2) * 0.05;
        robotRef.current.rotation.z = Math.sin(time * 1.5) * 0.01;
        // Weight shift
        robotRef.current.rotation.x = Math.sin(time * 0.8) * 0.02;
      }
    }
  });

  return (
    <group ref={robotRef}>
      <primitive object={scene} scale={0.5} rotation={[0, Math.PI / 6, 0]} />
    </group>
  );
}

interface RobotAssistantProps {
  robotState: RobotState;
  position: { x: number; y: number; rotation: number };
}

export default function RobotAssistant({ robotState, position }: RobotAssistantProps) {
  const prefersReducedMotion = useReducedMotion();

  // Don't render if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }

  // Use absolute positioning so robot is grounded on the page
  return (
    <motion.div
      className="absolute pointer-events-none z-50"
      style={{
        width: 250,
        height: 250,
        left: 0,
        top: 0,
      }}
      animate={{
        x: position.x - 125, // Center the robot (250px / 2)
        y: position.y - 125, // Center vertically
        rotate: position.rotation,
      }}
      transition={{
        type: 'spring',
        stiffness: 60,
        damping: 15,
        mass: 0.8,
      }}
    >
      <Canvas shadows style={{ width: '100%', height: '100%' }}>
        <PerspectiveCamera makeDefault position={[0, 1, 6]} fov={45} />

        {/* Enhanced Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <pointLight position={[-3, 2, -3]} intensity={0.4} color="#4080ff" />
        <spotLight position={[0, 5, 0]} angle={0.3} penumbra={1} intensity={0.8} />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* Robot with state-based animations */}
        <Robot3D robotState={robotState} />

        {/* Ground plane for shadows */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.2} />
        </mesh>
      </Canvas>
    </motion.div>
  );
}
