import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import Robot3D from './Robot3D';
import { useTheme } from '../context/ThemeContext';

const IntroScreen = ({ onStart, onSkip }) => {
  const [isGreeting, setIsGreeting] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isWebGLAvailable, setIsWebGLAvailable] = useState(true);
  const { isDark } = useTheme();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Check WebGL availability
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.error('[IntroScreen] WebGL is not available');
      setIsWebGLAvailable(false);
    } else {
      console.log('[IntroScreen] WebGL is available');
    }
  }, []);

  const handleStart = () => {
    if (isGreeting || isExiting) return;
    setIsGreeting(true);

    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onStart();
      }, 1500);
    }, 1000);
  };

  const handleSkip = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onSkip();
    }, 800);
  };

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 lg:p-8"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)'
              : 'linear-gradient(135deg, #f5f4f1 0%, #e8e6e3 50%, #f5f4f1 100%)',
          }}
        >
          {/* 3D Robot Canvas - Centered above text on all screens */}
          <div className="w-full h-1/2 flex items-center justify-center relative">
            {isWebGLAvailable ? (
              <Canvas
                camera={{ position: [0, 0, 7], fov: 45 }}
                style={{ background: 'transparent' }}
                onCreated={({ gl }) => {
                  console.log('[IntroScreen] Canvas created successfully');
                  console.log('[IntroScreen] WebGL renderer:', gl.getContext().getParameter(gl.getContext().VERSION));
                }}
                onError={(error) => {
                  console.error('[IntroScreen] Canvas error:', error);
                  setIsWebGLAvailable(false);
                }}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <directionalLight
                    position={[5, 5, 5]}
                    intensity={1}
                    color="#ffffff"
                  />
                  <pointLight
                    position={[-5, 5, 5]}
                    intensity={0.5}
                    color={isDark ? '#c58b5b' : '#4a4a4a'}
                  />
                  <Robot3D isGreeting={isGreeting} />
                  <ContactShadows
                    position={[0, -3.5, 0]}
                    opacity={0.4}
                    scale={12}
                    blur={2}
                    far={5}
                    color={isDark ? '#000000' : '#000000'}
                  />
                </Suspense>
              </Canvas>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-lg mb-2" style={{ color: isDark ? '#a1a1aa' : '#5a5a5a' }}>
                    WebGL is not supported in your browser
                  </p>
                  <p className="text-sm" style={{ color: isDark ? '#71717a' : '#8a8a8a' }}>
                    Please use a modern browser with WebGL support
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 px-4 max-w-xl mx-auto text-center mt-4 lg:mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-4 lg:mb-8"
            >
              <h1 className="text-xl md:text-3xl lg:text-5xl font-bold mb-4 lg:mb-6"
                  style={{ color: isDark ? '#ffffff' : '#202124' }}>
                Welcome to My Portfolio
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-row gap-3 justify-center items-center"
            >
              <button
                onClick={handleStart}
                disabled={isGreeting || isExiting}
                className="px-5 py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: isDark ? '#c58b5b' : '#202124',
                  color: '#ffffff',
                }}
              >
                {isGreeting ? 'GREETINGS...' : 'START EXPLORING'}
              </button>

              <button
                onClick={handleSkip}
                disabled={isExiting}
                className="px-4 py-3 rounded-lg font-medium text-xs md:text-sm transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'transparent',
                  color: isDark ? '#a1a1aa' : '#202124',
                  border: `1px solid ${isDark ? '#3a3d42' : '#c8c6c3'}`,
                }}
              >
                Skip
              </button>
            </motion.div>
          </div>

          {/* Cinematic vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
