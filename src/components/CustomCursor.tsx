import React, { useEffect, useState, useRef } from 'react';

type CursorVariant = 'default' | 'button' | 'link' | 'project' | 'explore' | 'hidden';

export const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // Position references for smooth lerping
  const pos = useRef({
    targetX: -100,
    targetY: -100,
    dotX: -100,
    dotY: -100,
    ringX: -100,
    ringY: -100,
    magneticX: 0,
    magneticY: 0
  });

  useEffect(() => {
    // Enable on desktop fine pointer devices
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      pos.current.targetX = e.clientX;
      pos.current.targetY = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        pos.current.dotX = e.clientX;
        pos.current.dotY = e.clientY;
        pos.current.ringX = e.clientX;
        pos.current.ringY = e.clientY;
      }

      // Detect hovered target variant
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isExplore = target.closest(
        '[data-cursor="explore"], #journey, #skills, #problems, .explore-node'
      );
      const isProject = target.closest(
        '[data-cursor="project"], .project-card, [role="button"][aria-label*="case study"], [aria-label*="Enlarge screenshot"]'
      );
      const buttonElem = target.closest('button, [role="button"], input[type="submit"]') as HTMLElement | null;
      const isLink = target.closest('a');

      // Subtle magnetic pull for buttons
      if (buttonElem) {
        const rect = buttonElem.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        if (dist < 60) {
          pos.current.magneticX = (e.clientX - centerX) * 0.25;
          pos.current.magneticY = (e.clientY - centerY) * 0.25;
        } else {
          pos.current.magneticX = 0;
          pos.current.magneticY = 0;
        }
      } else {
        pos.current.magneticX = 0;
        pos.current.magneticY = 0;
      }

      if (isProject) {
        setVariant('project');
      } else if (isExplore) {
        setVariant('explore');
      } else if (buttonElem) {
        setVariant('button');
      } else if (isLink) {
        setVariant('link');
      } else {
        setVariant('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    let animationFrameId: number;

    const loop = () => {
      const p = pos.current;

      // Smooth lerp
      p.dotX += (p.targetX + p.magneticX * 0.5 - p.dotX) * 0.75;
      p.dotY += (p.targetY + p.magneticY * 0.5 - p.dotY) * 0.75;

      p.ringX += (p.targetX + p.magneticX - p.ringX) * 0.2;
      p.ringY += (p.targetY + p.magneticY - p.ringY) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${p.dotX}px, ${p.dotY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${p.ringX}px, ${p.ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isEnabled) return null;

  const getRingStyles = () => {
    switch (variant) {
      case 'project':
        return 'w-14 h-14 -ml-7 -mt-7 border-[#38bdf8] bg-[#38bdf8]/[0.12] shadow-[0_0_24px_rgba(56,189,248,0.3)] backdrop-blur-[1px]';
      case 'explore':
        return 'w-16 h-16 -ml-8 -mt-8 border-[#38bdf8]/80 bg-[#38bdf8]/[0.1] shadow-[0_0_20px_rgba(56,189,248,0.25)]';
      case 'button':
        return 'w-9 h-9 -ml-4.5 -mt-4.5 border-[#38bdf8]/70 bg-[#38bdf8]/[0.08] shadow-[0_0_12px_rgba(56,189,248,0.2)]';
      case 'link':
        return 'w-8 h-8 -ml-4 -mt-4 border-[#38bdf8]/60 bg-[#38bdf8]/[0.04]';
      case 'default':
      default:
        return 'w-6 h-6 -ml-3 -mt-3 border-[#38bdf8]/35 bg-[#38bdf8]/[0.02]';
    }
  };

  const getDotStyles = () => {
    switch (variant) {
      case 'project':
      case 'explore':
        return 'w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-[#38bdf8] scale-125';
      case 'button':
        return 'w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-[#38bdf8]';
      default:
        return 'w-1 h-1 -ml-[2px] -mt-[2px] bg-[#38bdf8]';
    }
  };

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Outer ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-solid transition-[width,height,margin,background-color,border-color,box-shadow] duration-200 ease-out will-change-transform flex items-center justify-center ${getRingStyles()}`}
      >
        {variant === 'project' && (
          <span className="text-[9px] font-mono-data font-bold tracking-widest text-[#38bdf8] uppercase animate-in fade-in duration-150">
            VIEW
          </span>
        )}
        {variant === 'explore' && (
          <span className="text-[8px] font-mono-data font-bold tracking-widest text-[#38bdf8] uppercase animate-in fade-in duration-150">
            EXPLORE
          </span>
        )}
      </div>

      {/* Central dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full transition-transform duration-150 ease-out will-change-transform ${getDotStyles()}`}
      />
    </div>
  );
};
