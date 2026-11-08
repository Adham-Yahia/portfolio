import React, { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef(null);
  const timeRef = useRef(0);
  const frameCountRef = useRef(0);

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  console.log('[AnimatedBackground] Component mounted');
  console.log('[AnimatedBackground] isMobile:', isMobile);
  console.log('[AnimatedBackground] prefersReducedMotion:', prefersReducedMotion);
  console.log('[AnimatedBackground] isDark:', isDark);

  const getParticleCount = () => {
    if (isMobile) return 30;
    return 80;
  };

  const getColors = useCallback(() => {
    if (isDark) {
      return {
        particle: 'rgba(197, 139, 91, 0.4)',
        particleHover: 'rgba(212, 154, 106, 0.6)',
        line: 'rgba(197, 139, 91, 0.08)',
        lineHover: 'rgba(212, 154, 106, 0.15)',
      };
    }
    return {
      particle: 'rgba(74, 74, 74, 0.3)',
      particleHover: 'rgba(42, 42, 42, 0.5)',
      line: 'rgba(74, 74, 74, 0.06)',
      lineHover: 'rgba(42, 42, 42, 0.12)',
    };
  }, [isDark]);

  const initParticles = useCallback((width, height) => {
    const count = getParticleCount();
    const particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        baseX: 0,
        baseY: 0,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.5 + 0.2,
      });
    }

    particlesRef.current = particles;
    console.log('[AnimatedBackground] Particles initialized:', particles.length);
    console.log('[AnimatedBackground] Canvas dimensions:', width, 'x', height);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('[AnimatedBackground] ERROR: Canvas ref is null');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('[AnimatedBackground] ERROR: Could not get 2D context');
      return;
    }

    const width = canvas.width;
    const height = canvas.height;
    const particles = particlesRef.current;
    const colors = getColors();
    const mouse = mouseRef.current;

    ctx.clearRect(0, 0, width, height);

    timeRef.current += 0.005;
    frameCountRef.current++;

    if (frameCountRef.current === 1) {
      console.log('[AnimatedBackground] First frame rendered - particles:', particles.length);
    }

    if (frameCountRef.current === 60) {
      console.log('[AnimatedBackground] 60 frames rendered - animation is running');
    }

    particles.forEach((particle, i) => {
      particle.angle += 0.005;

      particle.baseX = Math.cos(particle.angle) * particle.speed * 2;
      particle.baseY = Math.sin(particle.angle) * particle.speed * 2;

      particle.vx += (Math.random() - 0.5) * 0.01;
      particle.vy += (Math.random() - 0.5) * 0.01;

      particle.vx *= 0.99;
      particle.vy *= 0.99;

      particle.x += particle.vx + particle.baseX * 0.1;
      particle.y += particle.vy + particle.baseY * 0.1;

      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      const dx = particle.x - mouse.x;
      const dy = particle.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 150;

      let particleColor = colors.particle;
      let lineColor = colors.line;

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        particle.x += (dx / distance) * force * 2;
        particle.y += (dy / distance) * force * 2;
        particleColor = colors.particleHover;
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];
        const dx2 = particle.x - other.x;
        const dy2 = particle.y - other.y;
        const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        if (distance2 < 120) {
          const opacity = (1 - distance2 / 120) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(197, 139, 91, ${opacity})`;
          if (isDark) {
            ctx.strokeStyle = `rgba(197, 139, 91, ${opacity})`;
          } else {
            ctx.strokeStyle = `rgba(74, 74, 74, ${opacity})`;
          }
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [getColors, isDark]);

  useEffect(() => {
    if (prefersReducedMotion) {
      console.log('[AnimatedBackground] Animation disabled due to prefers-reduced-motion');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('[AnimatedBackground] ERROR: Canvas element not found in DOM');
      return;
    }

    console.log('[AnimatedBackground] useEffect - Canvas element found');
    console.log('[AnimatedBackground] Canvas computed style:', window.getComputedStyle(canvas));

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);

      initParticles(rect.width, rect.height);
      console.log('[AnimatedBackground] Canvas resized - dpr:', dpr, 'rect:', rect.width, 'x', rect.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    console.log('[AnimatedBackground] Starting animation loop');
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave, initParticles, animate, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 1,
        opacity: 0.4,
      }}
    />
  );
};

export default AnimatedBackground;
