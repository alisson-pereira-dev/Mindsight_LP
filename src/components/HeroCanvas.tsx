import React, { useEffect, useRef } from 'react';

interface Particle {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  density: number;
  isAccent: boolean;
}

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let mouse = {
      x: -1000,
      y: -1000,
      radius: 120,
      isActive: false,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isActive = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let particles: Particle[] = [];

    // Generate points representing the "M" logo with rising bars & upward arrow
    const initParticles = () => {
      particles = [];
      const centerX = width > 1024 ? width * 0.72 : width * 0.5;
      const centerY = height * 0.5;
      const scale = Math.min(width * 0.38, 240);

      const targets: { x: number; y: number; isAccent: boolean; size?: number }[] = [];

      // 1. Left leg of M: x = -0.7, y from -0.3 to 0.7
      for (let y = -0.3; y <= 0.7; y += 0.05) {
        targets.push({ x: -0.7, y, isAccent: false });
        targets.push({ x: -0.65, y, isAccent: false });
      }

      // 2. Rising Bar 1 (Lowest bar): x = -0.35, y from 0.3 to 0.7
      for (let y = 0.3; y <= 0.7; y += 0.05) {
        targets.push({ x: -0.38, y, isAccent: true });
        targets.push({ x: -0.32, y, isAccent: true });
      }

      // 3. Rising Bar 2 (Mid bar): x = 0.0, y from 0.05 to 0.7
      for (let y = 0.05; y <= 0.7; y += 0.05) {
        targets.push({ x: -0.03, y, isAccent: true });
        targets.push({ x: 0.03, y, isAccent: true });
      }

      // 4. Rising Bar 3 (High bar): x = 0.35, y from -0.25 to 0.7
      for (let y = -0.25; y <= 0.7; y += 0.05) {
        targets.push({ x: 0.32, y, isAccent: true });
        targets.push({ x: 0.38, y, isAccent: true });
      }

      // 5. Right leg of M: x = 0.7, y from -0.55 to 0.7
      for (let y = -0.55; y <= 0.7; y += 0.05) {
        targets.push({ x: 0.68, y, isAccent: false });
        targets.push({ x: 0.73, y, isAccent: false });
      }

      // 6. Upward surge arrow connecting the bars to the top-right apex
      // Diagonal trajectory from (-0.35, 0.3) -> (0.0, 0.05) -> (0.35, -0.25) -> (0.65, -0.6)
      for (let t = 0; t <= 1; t += 0.04) {
        const x = -0.35 + t * 1.0;
        const y = 0.3 - t * 0.9;
        targets.push({ x, y, isAccent: true, size: 2.8 });
      }

      // Arrow head at (0.65, -0.6)
      targets.push({ x: 0.65, y: -0.6, isAccent: true, size: 3.5 });
      targets.push({ x: 0.53, y: -0.6, isAccent: true, size: 2.5 });
      targets.push({ x: 0.65, y: -0.48, isAccent: true, size: 2.5 });

      // Ambient background particles for subtle depth
      const ambientCount = 80;
      for (let i = 0; i < ambientCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 50 + Math.random() * scale * 1.5;
        targets.push({
          x: (Math.cos(angle) * dist) / scale,
          y: (Math.sin(angle) * dist) / scale,
          isAccent: Math.random() > 0.6,
          size: Math.random() * 1.5 + 0.8,
        });
      }

      // Convert target coords to particle objects
      targets.forEach((pt) => {
        const tx = centerX + pt.x * scale;
        const ty = centerY + pt.y * scale;
        const spreadOffset = (Math.random() - 0.5) * 8;

        particles.push({
          baseX: tx + spreadOffset,
          baseY: ty + spreadOffset,
          x: tx + (Math.random() - 0.5) * 120,
          y: ty + (Math.random() - 0.5) * 120,
          vx: 0,
          vy: 0,
          size: pt.size || (Math.random() * 1.6 + 1.2),
          color: pt.isAccent ? '#0DC0E0' : '#0AA9D1',
          alpha: Math.random() * 0.5 + 0.45,
          density: Math.random() * 20 + 8,
          isAccent: pt.isAccent,
        });
      });
    };

    initParticles();

    let frameCount = 0;

    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, width, height);

      // Subtle ambient glow center
      const gradient = ctx.createRadialGradient(
        width > 1024 ? width * 0.72 : width * 0.5,
        height * 0.5,
        10,
        width > 1024 ? width * 0.72 : width * 0.5,
        height * 0.5,
        280
      );
      gradient.addColorStop(0, 'rgba(13, 192, 224, 0.08)');
      gradient.addColorStop(0.5, 'rgba(13, 192, 224, 0.02)');
      gradient.addColorStop(1, 'rgba(13, 192, 224, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Connect close particles with subtle cyan lines for data graph vibe
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 1400) {
            const lineAlpha = (1 - Math.sqrt(distSq) / 38) * 0.18;
            ctx.strokeStyle = `rgba(13, 192, 224, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw each particle
      particles.forEach((p, idx) => {
        // Natural subtle floating idle motion
        const floatOffset = Math.sin(frameCount * 0.02 + idx) * 1.5;
        const targetX = p.baseX;
        const targetY = p.baseY + floatOffset;

        // Interaction with mouse cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = (dx / distance) * force * p.density;
          const directionY = (dy / distance) * force * p.density;
          // Repel from cursor
          p.x -= directionX * 2.5;
          p.y -= directionY * 2.5;
        } else {
          // Spring back to base position smoothly
          p.x += (targetX - p.x) * 0.08;
          p.y += (targetY - p.y) * 0.08;
        }

        // Render particle dot
        ctx.fillStyle = p.isAccent
          ? `rgba(13, 192, 224, ${p.alpha})`
          : `rgba(10, 169, 209, ${p.alpha * 0.8})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra glow for key apex particles
        if (p.isAccent && p.size > 2.2) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#0DC0E0';
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto w-full h-full opacity-90 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
