import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Robot3D = ({ isGreeting = false }) => {
  const groupRef = useRef();
  const headRef = useRef();
  const neckRef = useRef();
  const torsoRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const leftPupilRef = useRef();
  const rightPupilRef = useRef();
  const mouthRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();

  const mousePosition = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Breathing animation
    if (torsoRef.current) {
      const breathScale = 1 + Math.sin(time * 1.2) * 0.015;
      torsoRef.current.scale.set(breathScale, breathScale, breathScale);
    }

    // Body lean/rotation based on mouse position
    if (groupRef.current) {
      const targetBodyRotationY = mousePosition.current.x * 0.15;
      const targetBodyRotationZ = -mousePosition.current.x * 0.05;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetBodyRotationY,
        0.08
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetBodyRotationZ,
        0.08
      );
    }

    // Head tracking - faster and more responsive
    if (headRef.current) {
      const targetRotationY = mousePosition.current.x * 0.7;
      const targetRotationX = -mousePosition.current.y * 0.5;

      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotationY,
        0.75
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotationX,
        0.75
      );
    }

    // Eye tracking - faster and more responsive
    if (leftPupilRef.current && rightPupilRef.current) {
      const eyeOffsetX = mousePosition.current.x * 0.12;
      const eyeOffsetY = -mousePosition.current.y * 0.09;

      leftPupilRef.current.position.x = THREE.MathUtils.lerp(
        leftPupilRef.current.position.x,
        eyeOffsetX,
        0.85
      );
      leftPupilRef.current.position.y = THREE.MathUtils.lerp(
        leftPupilRef.current.position.y,
        eyeOffsetY,
        0.85
      );

      rightPupilRef.current.position.x = THREE.MathUtils.lerp(
        rightPupilRef.current.position.x,
        eyeOffsetX,
        0.85
      );
      rightPupilRef.current.position.y = THREE.MathUtils.lerp(
        rightPupilRef.current.position.y,
        eyeOffsetY,
        0.85
      );
    }

    // Blinking animation
    if (leftEyeRef.current && rightEyeRef.current) {
      const blinkCycle = Math.sin(time * 0.8) * 0.5 + 0.5;
      const blinkScale = blinkCycle > 0.98 ? 0.1 : 1;

      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(
        leftEyeRef.current.scale.y,
        blinkScale,
        0.3
      );
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(
        rightEyeRef.current.scale.y,
        blinkScale,
        0.3
      );
    }

    // Enhanced arm sway - more noticeable and responsive
    if (leftArmRef.current && rightArmRef.current) {
      const sway = Math.sin(time * 0.7) * 0.05;
      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, sway, 0.2);
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -sway, 0.2);
    }

    // Enhanced leg movement
    if (leftLegRef.current && rightLegRef.current) {
      const legSway = Math.sin(time * 0.4) * 0.01;
      leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, legSway, 0.15);
      rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, -legSway, 0.15);
    }

    // Greeting animation
    if (isGreeting && mouthRef.current) {
      const smileCurve = Math.sin(time * 5) * 0.5 + 0.5;
      mouthRef.current.scale.y = THREE.MathUtils.lerp(
        mouthRef.current.scale.y,
        smileCurve,
        0.2
      );
    }
  });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePosition.current.x = x;
      mousePosition.current.y = y;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = -(touch.clientY / window.innerHeight) * 2 + 1;
        mousePosition.current.x = x;
        mousePosition.current.y = y;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const materials = useMemo(() => ({
    body: new THREE.MeshStandardMaterial({
      color: '#1e1e1e',
      metalness: 0.85,
      roughness: 0.25,
    }),
    head: new THREE.MeshStandardMaterial({
      color: '#151515',
      metalness: 0.9,
      roughness: 0.2,
    }),
    face: new THREE.MeshStandardMaterial({
      color: '#0a0a0a',
      metalness: 0.95,
      roughness: 0.15,
    }),
    eye: new THREE.MeshStandardMaterial({
      color: '#ffffff',
      metalness: 0.0,
      roughness: 0.0,
      emissive: '#ffffff',
      emissiveIntensity: 0.4,
    }),
    pupil: new THREE.MeshStandardMaterial({
      color: '#00d4ff',
      metalness: 0.6,
      roughness: 0.15,
      emissive: '#00d4ff',
      emissiveIntensity: 1.0,
    }),
    accent: new THREE.MeshStandardMaterial({
      color: '#c58b5b',
      metalness: 0.75,
      roughness: 0.3,
      emissive: '#c58b5b',
      emissiveIntensity: 0.3,
    }),
    joint: new THREE.MeshStandardMaterial({
      color: '#2a2a2a',
      metalness: 0.8,
      roughness: 0.25,
    }),
  }), []);

  return (
    <group ref={groupRef} position={isMobile ? [0, 0.5, 0] : [0, 0.2, 0]} scale={isMobile ? 1.3 : 2.25}>
      {/* Legs */}
      <group ref={leftLegRef} position={[-0.25, -1.8, 0]}>
        <mesh material={materials.body}>
          <cylinderGeometry args={[0.12, 0.1, 1.2, 24]} />
        </mesh>
        <mesh position={[0, -0.65, 0]} material={materials.joint}>
          <sphereGeometry args={[0.12, 24, 24]} />
        </mesh>
        <mesh position={[0, -0.65, 0.08]} material={materials.body}>
          <boxGeometry args={[0.2, 0.08, 0.25]} />
        </mesh>
      </group>

      <group ref={rightLegRef} position={[0.25, -1.8, 0]}>
        <mesh material={materials.body}>
          <cylinderGeometry args={[0.12, 0.1, 1.2, 24]} />
        </mesh>
        <mesh position={[0, -0.65, 0]} material={materials.joint}>
          <sphereGeometry args={[0.12, 24, 24]} />
        </mesh>
        <mesh position={[0, -0.65, 0.08]} material={materials.body}>
          <boxGeometry args={[0.2, 0.08, 0.25]} />
        </mesh>
      </group>

      {/* Hips */}
      <mesh position={[0, -1.2, 0]} material={materials.body}>
        <cylinderGeometry args={[0.35, 0.3, 0.3, 24]} />
      </mesh>

      {/* Torso */}
      <mesh ref={torsoRef} position={[0, -0.3, 0]} material={materials.body}>
        <cylinderGeometry args={[0.4, 0.35, 1.4, 24]} />
      </mesh>

      {/* Chest panel */}
      <mesh position={[0, -0.2, 0.42]} material={materials.face}>
        <boxGeometry args={[0.5, 0.4, 0.02]} />
      </mesh>
      <mesh position={[0, -0.2, 0.43]} material={materials.accent}>
        <circleGeometry args={[0.1, 32]} />
      </mesh>

      {/* Shoulders */}
      <mesh position={[-0.55, 0.4, 0]} material={materials.joint}>
        <sphereGeometry args={[0.15, 24, 24]} />
      </mesh>
      <mesh position={[0.55, 0.4, 0]} material={materials.joint}>
        <sphereGeometry args={[0.15, 24, 24]} />
      </mesh>

      {/* Arms */}
      <group ref={leftArmRef} position={[-0.55, 0.4, 0]}>
        <mesh material={materials.body}>
          <cylinderGeometry args={[0.1, 0.08, 1.0, 24]} rotation={[0, 0, 0.2]} />
        </mesh>
        <mesh position={[0, -0.55, 0]} material={materials.joint}>
          <sphereGeometry args={[0.1, 24, 24]} />
        </mesh>
        <mesh position={[0, -0.85, 0]} material={materials.body}>
          <cylinderGeometry args={[0.08, 0.06, 0.5, 24]} rotation={[0, 0, -0.3]} />
        </mesh>
        <mesh position={[0, -1.12, 0]} material={materials.accent}>
          <sphereGeometry args={[0.1, 24, 24]} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.55, 0.4, 0]}>
        <mesh material={materials.body}>
          <cylinderGeometry args={[0.1, 0.08, 1.0, 24]} rotation={[0, 0, -0.2]} />
        </mesh>
        <mesh position={[0, -0.55, 0]} material={materials.joint}>
          <sphereGeometry args={[0.1, 24, 24]} />
        </mesh>
        <mesh position={[0, -0.85, 0]} material={materials.body}>
          <cylinderGeometry args={[0.08, 0.06, 0.5, 24]} rotation={[0, 0, 0.3]} />
        </mesh>
        <mesh position={[0, -1.12, 0]} material={materials.accent}>
          <sphereGeometry args={[0.1, 24, 24]} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh ref={neckRef} position={[0, 0.45, 0]} material={materials.joint}>
        <cylinderGeometry args={[0.12, 0.15, 0.25, 24]} />
      </mesh>

      {/* Head Group */}
      <group ref={headRef} position={[0, 0.65, 0]}>
        {/* Main head */}
        <mesh material={materials.head}>
          <cylinderGeometry args={[0.25, 0.28, 0.45, 24]} />
        </mesh>

        {/* Face plate */}
        <mesh position={[0, 0, 0.28]} material={materials.face}>
          <boxGeometry args={[0.5, 0.35, 0.015]} />
        </mesh>

        {/* Eye display */}
        <mesh position={[0, 0.05, 0.29]} material={materials.body}>
          <boxGeometry args={[0.45, 0.18, 0.008]} />
        </mesh>

        {/* Left Eye */}
        <group position={[-0.12, 0.08, 0.3]}>
          <mesh ref={leftEyeRef} material={materials.eye}>
            <sphereGeometry args={[0.07, 32, 32]} />
          </mesh>
          <mesh ref={leftPupilRef} position={[0, 0, 0.05]} material={materials.pupil}>
            <sphereGeometry args={[0.035, 32, 32]} />
          </mesh>
        </group>

        {/* Right Eye */}
        <group position={[0.12, 0.08, 0.3]}>
          <mesh ref={rightEyeRef} material={materials.eye}>
            <sphereGeometry args={[0.07, 32, 32]} />
          </mesh>
          <mesh ref={rightPupilRef} position={[0, 0, 0.05]} material={materials.pupil}>
            <sphereGeometry args={[0.035, 32, 32]} />
          </mesh>
        </group>

        {/* Mouth */}
        <mesh ref={mouthRef} position={[0, -0.08, 0.3]} material={materials.accent}>
          <boxGeometry args={[0.18, 0.025, 0.012]} />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 0.28, 0]} material={materials.joint}>
          <cylinderGeometry args={[0.015, 0.015, 0.18, 12]} />
        </mesh>
        <mesh position={[0, 0.38, 0]} material={materials.pupil}>
          <sphereGeometry args={[0.03, 32, 32]} />
        </mesh>

        {/* Ear modules */}
        <mesh position={[-0.28, 0, 0]} material={materials.joint}>
          <cylinderGeometry args={[0.04, 0.04, 0.15, 12]} rotation={[0, 0, Math.PI / 2]} />
        </mesh>
        <mesh position={[0.28, 0, 0]} material={materials.joint}>
          <cylinderGeometry args={[0.04, 0.04, 0.15, 12]} rotation={[0, 0, Math.PI / 2]} />
        </mesh>
      </group>
    </group>
  );
};

export default Robot3D;
