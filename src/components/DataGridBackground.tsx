import React, { useEffect, useRef } from 'react';

interface DataPacket {
  lineIndex: number;
  xRatio: number; // 0.0 to 1.0 along screen width
  speed: number;
  size: number;
  alpha: number;
}

interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
}

interface MathGlyph {
  lineIndex: number;
  xRatio: number;
  symbol: string;
  alpha: number;
}

const GLYPH_LIST = ['f(x)', '∑', 'λ', 'μ', 'σ', '∂y', '01', '01.01', 'R²', 'p-val', '∇'];

export const DataGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Section weight states for smooth morphing transitions
    const weights = {
      hero: 1,
      journey: 0,
      problems: 0,
      work: 0,
      about: 0,
      experience: 0,
      skills: 0,
      contact: 0,
    };

    const targetWeights = { ...weights };

    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let currentMouseX = -1000;
    let currentMouseY = -1000;
    let mouseActive = false;
    let mouseAlpha = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect active section bounds to calculate exact section blend weights
    const updateSectionWeights = () => {
      const vh = window.innerHeight;
      const centerY = vh * 0.45; // Center target focus line

      const sectionIds = [
        { id: 'hero', key: 'hero' },
        { id: 'journey', key: 'journey' },
        { id: 'problems', key: 'problems' },
        { id: 'work', key: 'work' },
        { id: 'about', key: 'about' },
        { id: 'experience', key: 'experience' },
        { id: 'skills', key: 'skills' },
        { id: 'contact', key: 'contact' },
      ] as const;

      let closestKey = 'hero';
      let minDistance = Infinity;

      const dists: Record<string, number> = {};

      sectionIds.forEach(({ id, key }) => {
        const elem = document.getElementById(id);
        if (elem) {
          const rect = elem.getBoundingClientRect();
          const elemCenter = rect.top + rect.height * 0.35;
          const dist = Math.abs(elemCenter - centerY);
          dists[key] = dist;

          if (dist < minDistance) {
            minDistance = dist;
            closestKey = key;
          }
        } else {
          dists[key] = Infinity;
        }
      });

      // Reset target weights
      (Object.keys(targetWeights) as (keyof typeof targetWeights)[]).forEach((k) => {
        targetWeights[k] = k === closestKey ? 1 : 0;
      });

      // Handle intermediate soft blending for adjacent sections
      sectionIds.forEach(({ key }) => {
        const dist = dists[key];
        if (dist !== undefined && dist < vh * 0.8) {
          const w = Math.pow(1 - dist / (vh * 0.8), 2);
          if (w > targetWeights[key]) {
            targetWeights[key] = w;
          }
        }
      });

      // Normalize weights so sum is 1.0
      let sum = 0;
      (Object.keys(targetWeights) as (keyof typeof targetWeights)[]).forEach((k) => {
        sum += targetWeights[k];
      });
      if (sum > 0) {
        (Object.keys(targetWeights) as (keyof typeof targetWeights)[]).forEach((k) => {
          targetWeights[k] /= sum;
        });
      }
    };

    const handleScroll = () => {
      updateSectionWeights();
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      mouseActive = true;
    };

    const handleMouseLeave = () => {
      mouseActive = false;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    updateSectionWeights();

    // Data structures for various section environments
    const isMobile = () => width < 768;
    const getLineCount = () => (isMobile() ? 12 : 22);

    let packets: DataPacket[] = [];
    let glyphs: MathGlyph[] = [];
    let networkNodes: NetworkNode[] = [];

    const initEntities = () => {
      packets = [];
      glyphs = [];
      networkNodes = [];

      const lineCount = getLineCount();
      const packetCount = isMobile() ? 8 : 18;

      for (let i = 0; i < packetCount; i++) {
        packets.push({
          lineIndex: Math.floor(Math.random() * lineCount),
          xRatio: Math.random(),
          speed: 0.0008 + Math.random() * 0.0014,
          size: 1.2 + Math.random() * 1.6,
          alpha: 0.25 + Math.random() * 0.35,
        });
      }

      const glyphCount = isMobile() ? 4 : 10;
      for (let i = 0; i < glyphCount; i++) {
        glyphs.push({
          lineIndex: Math.floor(Math.random() * lineCount),
          xRatio: 0.1 + Math.random() * 0.8,
          symbol: GLYPH_LIST[i % GLYPH_LIST.length],
          alpha: 0.04 + Math.random() * 0.04,
        });
      }

      // Network nodes for Skills section
      const nodeCount = isMobile() ? 16 : 35;
      for (let i = 0; i < nodeCount; i++) {
        networkNodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: 1.5 + Math.random() * 1.8,
          baseAlpha: 0.15 + Math.random() * 0.25,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initEntities();
      updateSectionWeights();
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    // Core heightfield equation blending topographic, tunnel, radar, depth layers, quiet waves, and converging lines
    const getPointY = (x: number, lineIndex: number, totalLines: number, t: number): number => {
      const lineRatio = (lineIndex + 0.5) / totalLines;
      const baseY = height * (0.04 + lineRatio * 0.92);

      // 1. HERO — Topographic Living Data Field
      const heroW1 = Math.sin(x * 0.0025 + t * 0.4 + lineIndex * 0.35) * 22;
      const heroW2 = Math.cos(x * 0.005 - t * 0.3 + lineIndex * 0.5) * 14;
      const yHero = baseY + heroW1 + heroW2;

      // 2. DATA JOURNEY — Perspective Data Tunnel
      // Lines converge toward center vanishing point (width * 0.5, height * 0.5)
      const tunnelVanishingX = width * 0.5;
      const tunnelVanishingY = height * 0.5;
      const dxTunnel = x - tunnelVanishingX;
      const perspectiveFactor = Math.abs(lineRatio - 0.5) * 2;
      const tunnelCurve = Math.sin((dxTunnel / width) * Math.PI) * 45 * perspectiveFactor;
      const yJourney = tunnelVanishingY + (baseY - tunnelVanishingY) * 0.85 + tunnelCurve;

      // 3. PROBLEMS — Interactive Radar Field
      const centerX = width * 0.5;
      const distFromCenter = Math.abs(x - centerX);
      const radarWave = Math.sin(distFromCenter * 0.015 - t * 1.2) * 18 * Math.exp(-distFromCenter * 0.0015);
      const yProblems = baseY + radarWave;

      // 4. SELECTED WORK — Floating Data Layers
      const layerStep = (lineIndex % 3 - 1) * 16;
      const depthArch = Math.cos(((x - width * 0.5) / width) * Math.PI) * 28;
      const yWork = baseY + layerStep + depthArch;

      // 5. ABOUT — Quiet Signal Field
      const yAbout = baseY + Math.sin(x * 0.0015 + t * 0.2) * 6;

      // 6. EXPERIENCE — Signal Timeline
      const timelineLine = Math.abs(x - width * 0.25) < 30 ? Math.sin(x * 0.1) * 8 : 0;
      const yExperience = baseY + timelineLine;

      // 7. SKILLS — Grid Mesh
      const ySkills = baseY + (Math.sin(x * 0.01) > 0 ? 4 : -4);

      // 8. CONTACT — Converging Data Funnel
      const pullToCenter = (width * 0.5 - x) * 0.18 * (lineRatio - 0.5);
      const yContact = baseY + pullToCenter;

      // Weighted combination across all section environments
      let finalY =
        yHero * weights.hero +
        yJourney * weights.journey +
        yProblems * weights.problems +
        yWork * weights.work +
        yAbout * weights.about +
        yExperience * weights.experience +
        ySkills * weights.skills +
        yContact * weights.contact;

      // Cursor Reactive Distortion Field
      if (mouseActive && currentMouseX > -500 && !isMobile()) {
        const dx = x - currentMouseX;
        const dy = finalY - currentMouseY;
        const distSq = dx * dx + dy * dy;
        const radius = 220;

        if (distSq < radius * radius && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const force = Math.pow(1 - dist / radius, 2) * 26;
          const pushDir = dy >= 0 ? 1 : -1;
          finalY += pushDir * force;
        }
      }

      return finalY;
    };

    const render = () => {
      if (!prefersReducedMotion) {
        time += 0.012;
      }

      // Interpolate section weights smoothly
      (Object.keys(weights) as (keyof typeof weights)[]).forEach((k) => {
        weights[k] += (targetWeights[k] - weights[k]) * 0.08;
      });

      // Lerp mouse
      if (targetMouseX > -500) {
        if (currentMouseX < -500) {
          currentMouseX = targetMouseX;
          currentMouseY = targetMouseY;
        } else {
          currentMouseX += (targetMouseX - currentMouseX) * 0.08;
          currentMouseY += (targetMouseY - currentMouseY) * 0.08;
        }
      }

      const targetAlpha = mouseActive ? 0.85 : 0.0;
      mouseAlpha += (targetAlpha - mouseAlpha) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Interactive Mouse Light Spot
      if (mouseAlpha > 0.01 && currentMouseX > -500 && !isMobile()) {
        const rad = ctx.createRadialGradient(
          currentMouseX,
          currentMouseY,
          0,
          currentMouseX,
          currentMouseY,
          280
        );
        rad.addColorStop(0, `rgba(56, 189, 248, ${0.045 * mouseAlpha})`);
        rad.addColorStop(0.5, `rgba(56, 189, 248, ${0.015 * mouseAlpha})`);
        rad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.fillStyle = rad;
        ctx.beginPath();
        ctx.arc(currentMouseX, currentMouseY, 280, 0, Math.PI * 2);
        ctx.fill();
      }

      const lineCount = getLineCount();
      const xStep = isMobile() ? 24 : 14;

      // 2. Render Section-Morphed Isolines & Environments
      for (let i = 0; i < lineCount; i++) {
        const isKeyContour = i % 4 === 0;
        const isMidground = i % 2 === 1;

        let baseAlpha = isKeyContour ? 0.12 : isMidground ? 0.07 : 0.045;

        // Adjust intensity based on section weights
        if (weights.about > 0.3) {
          baseAlpha *= 0.55; // Quiet field
        } else if (weights.work > 0.3) {
          baseAlpha *= 1.3; // Deeper floating layers
        } else if (weights.contact > 0.3) {
          baseAlpha *= 1.2; // Convergence intensity
        }

        ctx.strokeStyle = `rgba(56, 189, 248, ${baseAlpha})`;
        ctx.lineWidth = isKeyContour ? 1.2 : 0.75;

        ctx.beginPath();
        let first = true;

        for (let x = 0; x <= width + xStep; x += xStep) {
          const y = getPointY(x, i, lineCount, time);
          if (first) {
            ctx.moveTo(x, y);
            first = false;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // 3. Render DATA TUNNEL Perspective Rays when in Data Journey
      if (weights.journey > 0.05) {
        const tunnelAlpha = weights.journey * 0.15;
        ctx.strokeStyle = `rgba(56, 189, 248, ${tunnelAlpha})`;
        ctx.lineWidth = 0.6;

        const rayCount = isMobile() ? 8 : 16;
        const cx = width * 0.5;
        const cy = height * 0.5;

        for (let r = 0; r < rayCount; r++) {
          const angle = (r / rayCount) * Math.PI * 2 + time * 0.05;
          const ex = cx + Math.cos(angle) * Math.max(width, height);
          const ey = cy + Math.sin(angle) * Math.max(width, height);

          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(ex, ey);
          ctx.stroke();
        }
      }

      // 4. Render RADAR RINGS when in Problems Section
      if (weights.problems > 0.05) {
        const radarAlpha = weights.problems * 0.18;
        const cx = currentMouseX > 0 && !isMobile() ? currentMouseX : width * 0.5;
        const cy = currentMouseY > 0 && !isMobile() ? currentMouseY : height * 0.5;

        const ringCount = 4;
        for (let r = 1; r <= ringCount; r++) {
          const radius = ((time * 40 + r * 60) % 240) + 20;
          const alphaFactor = Math.max(0, 1 - radius / 260) * radarAlpha;

          ctx.strokeStyle = `rgba(56, 189, 248, ${alphaFactor})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 5. Render LIVING DATA NETWORK Constellation when in Skills Section
      if (weights.skills > 0.05 && !prefersReducedMotion) {
        const skillAlpha = weights.skills * 0.85;

        for (let i = 0; i < networkNodes.length; i++) {
          const n = networkNodes[i];
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          ctx.fillStyle = `rgba(56, 189, 248, ${n.baseAlpha * skillAlpha})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fill();

          // Connect nearby nodes
          for (let j = i + 1; j < networkNodes.length; j++) {
            const n2 = networkNodes[j];
            const dx = n.x - n2.x;
            const dy = n.y - n2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < 110 * 110) {
              const dist = Math.sqrt(distSq);
              const lineAlpha = (1 - dist / 110) * 0.12 * skillAlpha;
              ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();
            }
          }
        }
      }

      // 6. Render Data Packet Streams along Isolines
      if (!prefersReducedMotion) {
        for (let p of packets) {
          p.xRatio += p.speed;
          if (p.xRatio > 1.0) {
            p.xRatio = 0.0;
            p.lineIndex = Math.floor(Math.random() * lineCount);
          }

          const px = p.xRatio * width;
          const py = getPointY(px, p.lineIndex, lineCount, time);

          ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fill();

          if (p.size > 2.0) {
            ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha * 0.35})`;
            ctx.beginPath();
            ctx.arc(px, py, p.size * 2.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 7. Render Subtle Mathematical Textures
      ctx.font = '10px "JetBrains Mono", monospace';
      for (let g of glyphs) {
        const gx = g.xRatio * width;
        const gy = getPointY(gx, g.lineIndex, lineCount, time) - 6;

        ctx.fillStyle = `rgba(56, 189, 248, ${g.alpha})`;
        ctx.fillText(g.symbol, gx, gy);
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      render();
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle analytical grid pattern layer */}
      <div className="absolute inset-0 data-grid-pattern opacity-[0.12]" />

      {/* Living Data Field Topographic & Morphing Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
};
