'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Environment } from '@react-three/drei';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// 3D Robot Model Component with Animations
function Robot3D({ isWorking }: { isWorking: boolean }) {
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

    // Animate head - look around
    if (headRef.current) {
      if (isWorking) {
        // Working: focused head movement
        headRef.current.rotation.y = Math.sin(time * 2) * 0.3;
        headRef.current.rotation.x = Math.sin(time * 1.5) * 0.1;
      } else {
        // Idle: gentle swaying
        headRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
      }
    }

    // Animate gears - spin them
    gearsRef.current.forEach((gear, index) => {
      if (isWorking) {
        gear.rotation.z += 0.1 * (index % 2 === 0 ? 1 : -1);
      } else {
        gear.rotation.z += 0.02 * (index % 2 === 0 ? 1 : -1);
      }
    });

    // Animate tracks - simulate movement
    tracksRef.current.forEach((track, index) => {
      if (isWorking) {
        // Fast movement when working
        track.position.x = Math.sin(time * 3 + index) * 0.02;
      } else {
        // Slight idle vibration
        track.position.x = Math.sin(time * 0.5 + index) * 0.005;
      }
    });

    // Overall robot body animation
    if (robotRef.current) {
      if (isWorking) {
        // Working: slight vibration
        robotRef.current.position.y = Math.sin(time * 8) * 0.02;
        robotRef.current.rotation.z = Math.sin(time * 10) * 0.02;
      } else {
        // Idle: gentle bobbing
        robotRef.current.position.y = Math.sin(time * 2) * 0.05;
      }
    }
  });

  return (
    <group ref={robotRef}>
      <primitive
        object={scene}
        scale={0.5}
        rotation={[0, Math.PI / 6, 0]}
      />
    </group>
  );
}

interface WordState {
  word: string;
  state: 'normal' | 'broken' | 'repairing' | 'repaired';
  index: number;
}

interface RobotTextRepairProps {
  text: string;
  onComplete?: () => void;
}

export default function RobotTextRepair({ text, onComplete }: RobotTextRepairProps) {
  const prefersReducedMotion = useReducedMotion();
  const [words, setWords] = useState<WordState[]>([]);
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Initialize words
  useEffect(() => {
    const wordArray = text.split(' ').map((word, index) => ({
      word,
      state: (prefersReducedMotion ? 'repaired' : 'normal') as WordState['state'],
      index,
    }));
    setWords(wordArray);
  }, [text, prefersReducedMotion]);

  // Zigzag movement pattern
  useEffect(() => {
    if (prefersReducedMotion || words.length === 0) return;

    const wordElements = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (wordElements.length === 0) return;

    let currentIndex = 0;

    const moveToNextWord = () => {
      if (currentIndex >= wordElements.length) {
        // Reset to beginning
        setTimeout(() => {
          setCurrentWordIndex(0);
          currentIndex = 0;
          setWords(prev => prev.map(w => ({ ...w, state: 'normal' })));
          if (onComplete) onComplete();
        }, 1000);
        return;
      }

      const wordEl = wordElements[currentIndex];
      if (!wordEl) return;

      const rect = wordEl.getBoundingClientRect();
      setRobotPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      setCurrentWordIndex(currentIndex);

      // Mark word as broken
      setWords(prev => prev.map((w, i) =>
        i === currentIndex ? { ...w, state: 'broken' } : w
      ));

      setTimeout(() => {
        // Start repairing
        setWords(prev => prev.map((w, i) =>
          i === currentIndex ? { ...w, state: 'repairing' } : w
        ));

        setTimeout(() => {
          // Mark as repaired
          setWords(prev => prev.map((w, i) =>
            i === currentIndex ? { ...w, state: 'repaired' } : w
          ));

          currentIndex++;
          setTimeout(moveToNextWord, 200);
        }, 400);
      }, 300);
    };

    const timer = setTimeout(moveToNextWord, 1000);
    return () => clearTimeout(timer);
  }, [words.length, prefersReducedMotion, onComplete]);

  if (prefersReducedMotion) {
    return (
      <div className="text-4xl md:text-6xl font-bold leading-relaxed">
        {text}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Text with word-by-word animation */}
      <div className="text-4xl md:text-6xl font-bold leading-relaxed relative z-10">
        {words.map((wordState, index) => (
          <span key={index} className="inline-block">
            <motion.span
              ref={el => { wordRefs.current[index] = el; }}
              className={`inline-block transition-all duration-300 ${
                wordState.state === 'broken'
                  ? 'blur-sm opacity-50 text-gray-400'
                  : wordState.state === 'repairing'
                  ? 'blur-[1px] opacity-75'
                  : wordState.state === 'repaired'
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
                  : 'text-gray-300'
              }`}
              animate={{
                y: wordState.state === 'repairing' ? [-2, 2, -2] : 0,
              }}
              transition={{
                duration: 0.2,
                repeat: wordState.state === 'repairing' ? Infinity : 0,
              }}
            >
              {wordState.word}
            </motion.span>
            {index < words.length - 1 && ' '}

            {/* Construction effects */}
            <AnimatePresence>
              {wordState.state === 'repairing' && (
                <motion.span className="absolute inset-0 pointer-events-none">
                  {/* Sparks */}
                  {[...Array(3)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      animate={{
                        opacity: [1, 0],
                        x: [0, (Math.random() - 0.5) * 20],
                        y: [0, (Math.random() - 0.5) * 20],
                        scale: [1, 0],
                      }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.1,
                      }}
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                    />
                  ))}

                  {/* Dust cloud */}
                  <motion.span
                    className="absolute inset-0 bg-gray-400/20 rounded blur-md"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.2, 1.5] }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        ))}
      </div>

      {/* 3D Robot following the text */}
      <motion.div
        className="fixed w-48 h-48 pointer-events-none z-50"
        animate={{
          left: robotPosition.x - 96,
          top: robotPosition.y - 96,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }}
      >
        <Canvas
          shadows
          style={{ width: '100%', height: '100%' }}
        >
          <PerspectiveCamera makeDefault position={[0, 1, 6]} fov={45} />

          {/* Enhanced Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-5, 3, -5]} intensity={0.5} color="#4080ff" />
          <spotLight
            position={[0, 5, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.8}
            castShadow
          />

          {/* Environment for reflections */}
          <Environment preset="city" />

          {/* Robot with working state */}
          <Robot3D isWorking={words.some(w => w.state === 'repairing')} />

          {/* Ground plane for shadows */}
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[10, 10]} />
            <shadowMaterial opacity={0.3} />
          </mesh>
        </Canvas>
      </motion.div>

      {/* Work complete animation */}
      <AnimatePresence>
        {words.length > 0 && words.every(w => w.state === 'repaired') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{ duration: 1 }}
              className="text-6xl"
            >
              ✓
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
