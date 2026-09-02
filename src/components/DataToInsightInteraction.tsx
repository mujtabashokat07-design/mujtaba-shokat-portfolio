import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Database, GitBranch, Cpu, Sparkles, ChevronRight } from 'lucide-react';

interface StageConfig {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

const STAGES: StageConfig[] = [
  {
    id: 'raw',
    number: '01',
    title: 'RAW DATA',
    subtitle: 'Unstructured Distribution',
    description: 'Scattered observations, missing bounds, and latent signals distributed across high-dimensional space.',
    icon: <Database className="w-3.5 h-3.5" />
  },
  {
    id: 'pattern',
    number: '02',
    title: 'PATTERN',
    subtitle: 'Statistical Organization',
    description: 'Variance reduction, correlation isolation, and dimensional alignment reveal underlying structures.',
    icon: <GitBranch className="w-3.5 h-3.5" />
  },
  {
    id: 'model',
    number: '03',
    title: 'MODEL',
    subtitle: 'Analytical Transformation',
    description: 'Decision boundaries and feature weights converge to separate signal from environmental noise.',
    icon: <Cpu className="w-3.5 h-3.5" />
  },
  {
    id: 'insight',
    number: '04',
    title: 'INSIGHT',
    subtitle: 'Actionable Artifact',
    description: 'The analytical process resolves into a clear, validated conclusion ready for practical decision-making.',
    icon: <Sparkles className="w-3.5 h-3.5" />
  }
];

// Predefined 24 node coordinates across the 4 conceptual stages (normalized 0..100)
const NODE_COORDINATES = [
  // stage 0 (scattered raw), stage 1 (pattern/curve), stage 2 (model/network), stage 3 (insight/focus)
  { s0: [15, 25], s1: [12, 75], s2: [15, 30], s3: [50, 50] },
  { s0: [28, 80], s1: [18, 70], s2: [15, 50], s3: [50, 50] },
  { s0: [35, 20], s1: [24, 65], s2: [15, 70], s3: [50, 50] },
  { s0: [20, 60], s1: [30, 60], s2: [35, 25], s3: [48, 50] },
  { s0: [45, 85], s1: [36, 56], s2: [35, 45], s3: [52, 50] },
  { s0: [50, 15], s1: [42, 52], s2: [35, 65], s3: [50, 48] },
  { s0: [62, 75], s1: [48, 48], s2: [35, 85], s3: [50, 52] },
  { s0: [70, 30], s1: [54, 45], s2: [65, 35], s3: [50, 50] },
  { s0: [85, 85], s1: [60, 42], s2: [65, 55], s3: [50, 50] },
  { s0: [80, 20], s1: [66, 38], s2: [65, 75], s3: [50, 50] },
  { s0: [90, 60], s1: [72, 34], s2: [85, 40], s3: [50, 50] },
  { s0: [10, 45], s1: [78, 30], s2: [85, 60], s3: [50, 50] },
  { s0: [25, 35], s1: [84, 25], s2: [50, 50], s3: [50, 50] },
  { s0: [40, 50], s1: [90, 20], s2: [50, 50], s3: [50, 50] },
  { s0: [55, 65], s1: [28, 62], s2: [35, 45], s3: [50, 50] },
  { s0: [68, 45], s1: [46, 50], s2: [65, 55], s3: [50, 50] },
  { s0: [75, 70], s1: [62, 40], s2: [50, 50], s3: [50, 50] },
  { s0: [82, 40], s1: [76, 32], s2: [85, 50], s3: [50, 50] }
];

export const DataToInsightInteraction: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<number>(0);
  const prefersReducedMotion = useReducedMotion();

  // Scroll tracking to optionally advance stage naturally as the user scrolls into view
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      setActiveStage(3); // Resolve straight to insight for reduced motion
      return;
    }

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Map scroll progress in the section (0.25 to 0.75) across 4 stages
      if (latest < 0.3) {
        setActiveStage(0);
      } else if (latest < 0.45) {
        setActiveStage(1);
      } else if (latest < 0.6) {
        setActiveStage(2);
      } else {
        setActiveStage(3);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, prefersReducedMotion]);

  const currentConfig = STAGES[activeStage];

  return (
    <section 
      ref={containerRef}
      id="data-to-insight"
      className="relative py-20 sm:py-28 border-t border-white/[0.06] bg-[#07090d] overflow-hidden"
    >
      {/* Ambient background grid */}
      <div className="absolute inset-0 data-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono-data text-[#38bdf8] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
              <span>SIGNATURE METHODOLOGY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-100 leading-tight">
              From Data to Insight
            </h2>
          </div>

          <div className="text-xs font-mono-data text-slate-400 max-w-sm">
            Interactive analytical resolution: observe how raw entropy synthesizes into decisive clarity.
          </div>
        </div>

        {/* The Interactive Resolution Board */}
        <div className="rounded-3xl bg-[#0b0e14] border border-white/[0.08] p-6 sm:p-8 lg:p-10">
          
          {/* Stage Progression Selector / Stepper */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8 pb-6 border-b border-white/[0.06]">
            {STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;
              const isPassed = activeStage >= idx;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`flex flex-col text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#121926] border-[#38bdf8]/40 text-slate-100'
                      : isPassed
                      ? 'bg-[#0e131c] border-white/[0.08] text-slate-300 hover:border-white/15'
                      : 'bg-[#090c12] border-white/[0.04] text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono-data font-bold text-[#38bdf8]">
                      {stage.number}
                    </span>
                    <span className={`text-xs ${isActive ? 'text-[#38bdf8]' : 'text-slate-400'}`}>
                      {stage.icon}
                    </span>
                  </div>
                  <div className="text-xs font-bold font-mono-data tracking-wide truncate">
                    {stage.title}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5 hidden sm:block">
                    {stage.subtitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Visualization Stage & Narrative Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* SVG Visual Stage */}
            <div className="lg:col-span-7 bg-[#07090e] border border-white/[0.06] rounded-2xl p-6 sm:p-8 relative min-h-[300px] sm:min-h-[360px] flex items-center justify-center overflow-hidden">
              
              {/* Coordinate Grid Overlay */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10 pointer-events-none">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="border-r border-b border-white/[0.15]" />
                ))}
              </div>

              {/* Responsive SVG Graphic */}
              <svg 
                className="w-full h-64 sm:h-72 relative z-10" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Subtle Glow for the Insight Point */}
                  <filter id="insight-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Stage 1 Connection Curve */}
                {activeStage === 1 && (
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 0.6 }}
                    d="M 10 75 Q 50 48 90 20"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="0.8"
                    strokeDasharray="2 1.5"
                  />
                )}

                {/* Stage 2 Model Transform Layer Connections */}
                {activeStage === 2 && (
                  <g opacity="0.4">
                    <line x1="15" y1="30" x2="35" y2="45" stroke="#38bdf8" strokeWidth="0.6" />
                    <line x1="15" y1="50" x2="35" y2="45" stroke="#38bdf8" strokeWidth="0.6" />
                    <line x1="15" y1="70" x2="35" y2="65" stroke="#38bdf8" strokeWidth="0.6" />
                    <line x1="35" y1="45" x2="65" y2="55" stroke="#38bdf8" strokeWidth="0.6" />
                    <line x1="35" y1="65" x2="65" y2="55" stroke="#38bdf8" strokeWidth="0.6" />
                    <line x1="65" y1="55" x2="85" y2="50" stroke="#38bdf8" strokeWidth="0.6" />
                    <line x1="35" y1="25" x2="65" y2="35" stroke="#38bdf8" strokeWidth="0.6" />
                    <line x1="65" y1="35" x2="85" y2="40" stroke="#38bdf8" strokeWidth="0.6" />
                  </g>
                )}

                {/* Stage 3 Insight Focal Rings */}
                {activeStage === 3 && (
                  <g>
                    <circle cx="50" cy="50" r="14" fill="none" stroke="#38bdf8" strokeWidth="0.4" opacity="0.3" strokeDasharray="1 1" />
                    <circle cx="50" cy="50" r="8" fill="none" stroke="#38bdf8" strokeWidth="0.6" opacity="0.6" />
                    <circle cx="50" cy="50" r="3.5" fill="#38bdf8" filter="url(#insight-glow)" />
                    <line x1="50" y1="15" x2="50" y2="85" stroke="#38bdf8" strokeWidth="0.3" opacity="0.2" />
                    <line x1="15" y1="50" x2="85" y2="50" stroke="#38bdf8" strokeWidth="0.3" opacity="0.2" />
                  </g>
                )}

                {/* Nodes rendering based on current stage */}
                {NODE_COORDINATES.map((node, i) => {
                  let targetCoord = node.s0;
                  if (activeStage === 1) targetCoord = node.s1;
                  if (activeStage === 2) targetCoord = node.s2;
                  if (activeStage === 3) targetCoord = node.s3;

                  const isMainInsight = activeStage === 3 && i === 0;

                  return (
                    <motion.circle
                      key={i}
                      animate={{
                        cx: targetCoord[0],
                        cy: targetCoord[1],
                        r: isMainInsight ? 3.5 : activeStage === 3 ? 0 : activeStage === 2 ? 1.6 : 1.4,
                        opacity: activeStage === 3 ? (isMainInsight ? 1 : 0) : 0.8
                      }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.6,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      fill={activeStage === 3 ? '#38bdf8' : activeStage === 2 ? '#7dd3fc' : '#cbd5e1'}
                    />
                  );
                })}
              </svg>

              {/* State Label Pin */}
              <div className="absolute bottom-3 left-3 text-[10px] font-mono-data text-slate-400 bg-[#0b0e14]/80 px-2.5 py-1 rounded-md border border-white/[0.06]">
                PHASE: <span className="text-[#38bdf8] font-bold">{currentConfig.title}</span>
              </div>
            </div>

            {/* Right Column: Editorial Explanation for the Stage */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono-data text-[#38bdf8]">
                <span>STAGE {currentConfig.number} OF 04</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
                {currentConfig.subtitle}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {currentConfig.description}
              </p>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs font-mono-data text-slate-400">
                  {activeStage < 3 ? 'Proceed through data pipeline' : 'System in validated insight state'}
                </span>

                <button
                  type="button"
                  onClick={() => setActiveStage((prev) => (prev + 1) % 4)}
                  className="min-h-[44px] inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#141c28] hover:bg-[#1a2536] text-xs font-mono-data text-[#38bdf8] border border-white/10 transition-colors cursor-pointer"
                >
                  <span>{activeStage === 3 ? 'Reset Cycle' : 'Next Stage'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
