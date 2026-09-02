import React, { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  currentAlpha: number;
  phase: number;
  phaseSpeed: number;
  offsetX: number;
  offsetY: number;
}

export const HeroDataEnvironment: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let isMouseOverHero = false;

    // Mouse coordinates relative to hero container
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let spotlightOpacity = 0;
    let targetSpotlightOpacity = 0;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initNodes();
    };

    // Responsive node count: 28 desktop, 16 tablet, 8 mobile
    const getNodeCount = () => {
      if (width < 640) return 8;
      if (width < 1024) return 16;
      return 28;
    };

    let nodes: Node[] = [];

    const initNodes = () => {
      const count = getNodeCount();
      nodes = [];

      for (let i = 0; i < count; i++) {
        // Bias nodes toward right/ambient areas to keep text area quiet
        const isRightBiased = Math.random() > 0.35;
        const x = isRightBiased
          ? width * (0.35 + Math.random() * 0.62)
          : width * (0.05 + Math.random() * 0.4);
        const y = height * (0.08 + Math.random() * 0.84);

        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          // Extremely slow drift
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          radius: 1.2 + Math.random() * 1.2,
          baseAlpha: 0.22 + Math.random() * 0.28,
          currentAlpha: 0.2,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.008 + Math.random() * 0.012,
          offsetX: 0,
          offsetY: 0
        });
      }
    };

    resizeCanvas();

    // Mouse event handlers on hero container
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
      targetSpotlightOpacity = 0.9;
      isMouseOverHero = true;
    };

    const handleMouseEnter = () => {
      isMouseOverHero = true;
      targetSpotlightOpacity = 0.9;
    };

    const handleMouseLeave = () => {
      isMouseOverHero = false;
      targetSpotlightOpacity = 0;
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    // Debounced window resize
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 150);
    };

    // Intersection observer to pause rAF when hero is off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const parentHero = container.closest('#hero') || container;
    parentHero.addEventListener('mousemove', handleMouseMove as EventListener, { passive: true });
    parentHero.addEventListener('mouseenter', handleMouseEnter as EventListener);
    parentHero.addEventListener('mouseleave', handleMouseLeave as EventListener);
    window.addEventListener('resize', handleResize);

    // Max distance for connecting lines
    const maxConnectDist = 135;
    const maxConnectDistSq = maxConnectDist * maxConnectDist;

    // Text protection zone: left column area where headline sits
    const checkQuietZoneFactor = (x: number, y: number) => {
      // If on desktop and x is in the left 52%, apply subtle dampening
      if (width >= 1024 && x < width * 0.52 && y > height * 0.12 && y < height * 0.85) {
        return 0.35; // 65% quieter behind headline
      }
      return 1.0;
    };

    // Render loop
    const render = () => {
      if (!isVisible || document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth spotlight cursor position interpolation (lerp)
      if (isMouseOverHero && targetMouseX > -500) {
        if (mouseX < -500) {
          mouseX = targetMouseX;
          mouseY = targetMouseY;
        } else {
          mouseX += (targetMouseX - mouseX) * 0.08;
          mouseY += (targetMouseY - mouseY) * 0.08;
        }
      }
      spotlightOpacity += (targetSpotlightOpacity - spotlightOpacity) * 0.06;

      // Draw subtle mouse spotlight
      if (spotlightOpacity > 0.01 && mouseX > -500) {
        const spotlightRadius = 240;
        const gradient = ctx.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          spotlightRadius
        );
        gradient.addColorStop(0, `rgba(56, 189, 248, ${0.055 * spotlightOpacity})`);
        gradient.addColorStop(0.45, `rgba(56, 189, 248, ${0.02 * spotlightOpacity})`);
        gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, spotlightRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update and draw nodes
      const shouldAnimate = !prefersReducedMotion;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (shouldAnimate) {
          // Slow drift
          node.x += node.vx;
          node.y += node.vy;

          // Gentle bounds bounce
          if (node.x < width * 0.02 || node.x > width * 0.98) node.vx *= -1;
          if (node.y < height * 0.05 || node.y > height * 0.95) node.vy *= -1;

          // Breathing phase
          node.phase += node.phaseSpeed;
          node.currentAlpha = node.baseAlpha + Math.sin(node.phase) * 0.1;

          // Mouse proximity shift: nodes shift slightly away or respond to cursor
          if (isMouseOverHero && mouseX > -500) {
            const dx = node.x - mouseX;
            const dy = node.y - mouseY;
            const distSq = dx * dx + dy * dy;
            const proximityRadius = 140;

            if (distSq < proximityRadius * proximityRadius && distSq > 1) {
              const dist = Math.sqrt(distSq);
              const force = (1 - dist / proximityRadius) * 8; // Max 8px shift
              const angle = Math.atan2(dy, dx);
              const targetOffsetX = Math.cos(angle) * force;
              const targetOffsetY = Math.sin(angle) * force;

              node.offsetX += (targetOffsetX - node.offsetX) * 0.1;
              node.offsetY += (targetOffsetY - node.offsetY) * 0.1;
            } else {
              node.offsetX += (0 - node.offsetX) * 0.06;
              node.offsetY += (0 - node.offsetY) * 0.06;
            }
          } else {
            node.offsetX += (0 - node.offsetX) * 0.06;
            node.offsetY += (0 - node.offsetY) * 0.06;
          }
        }

        const renderX = node.x + node.offsetX;
        const renderY = node.y + node.offsetY;
        const quietFactor = checkQuietZoneFactor(renderX, renderY);
        const finalAlpha = Math.max(0.06, node.currentAlpha * quietFactor);

        // Draw node
        ctx.fillStyle = `rgba(56, 189, 248, ${finalAlpha})`;
        ctx.beginPath();
        ctx.arc(renderX, renderY, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow halo for selected nodes
        if (i % 4 === 0 && finalAlpha > 0.15) {
          ctx.fillStyle = `rgba(56, 189, 248, ${finalAlpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(renderX, renderY, node.radius * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        const ax = nodeA.x + nodeA.offsetX;
        const ay = nodeA.y + nodeA.offsetY;

        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const bx = nodeB.x + nodeB.offsetX;
          const by = nodeB.y + nodeB.offsetY;

          const dx = bx - ax;
          const dy = by - ay;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectDistSq) {
            const dist = Math.sqrt(distSq);
            const quietFactor = Math.min(
              checkQuietZoneFactor(ax, ay),
              checkQuietZoneFactor(bx, by)
            );

            // Subtle line alpha
            const baseLineAlpha = Math.pow(1 - dist / maxConnectDist, 1.4) * 0.16 * quietFactor;

            // Slight line boost if near cursor
            let lineAlpha = baseLineAlpha;
            if (isMouseOverHero && mouseX > -500) {
              const midX = (ax + bx) / 2;
              const midY = (ay + by) / 2;
              const cursorDistSq = (midX - mouseX) ** 2 + (midY - mouseY) ** 2;
              if (cursorDistSq < 120 * 120) {
                lineAlpha = Math.min(0.32, baseLineAlpha * 1.8);
              }
            }

            if (lineAlpha > 0.015) {
              ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
              ctx.lineWidth = 0.75;
              ctx.beginPath();
              ctx.moveTo(ax, ay);
              ctx.lineTo(bx, by);
              ctx.stroke();
            }
          }
        }
      }

      if (shouldAnimate) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      render(); // Single static render
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      observer.disconnect();
      parentHero.removeEventListener('mousemove', handleMouseMove as EventListener);
      parentHero.removeEventListener('mouseenter', handleMouseEnter as EventListener);
      parentHero.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Very subtle analytical grid layer */}
      <div className="absolute inset-0 data-grid-pattern opacity-15" />

      {/* Atmospheric depth lighting: soft cyan/blue radial wash */}
      <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-[#38bdf8]/[0.03] rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-10 w-[420px] h-[420px] bg-[#0284c7]/[0.025] rounded-full blur-[160px]" />

      {/* Interactive canvas layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
      />
    </div>
  );
};
