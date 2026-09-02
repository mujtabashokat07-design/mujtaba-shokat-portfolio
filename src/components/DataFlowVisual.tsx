import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Database, GitBranch, Cpu, Sparkles, ArrowRight } from 'lucide-react';

interface Stage {
  id: string;
  number: string;
  name: string;
  explanation: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STAGES: Stage[] = [
  {
    id: 'question',
    number: '01',
    name: 'Question',
    explanation: 'Define what needs to be answered.',
    icon: HelpCircle
  },
  {
    id: 'data',
    number: '02',
    name: 'Data',
    explanation: 'Find and prepare the right information.',
    icon: Database
  },
  {
    id: 'analysis',
    number: '03',
    name: 'Analysis',
    explanation: 'Explore patterns and relationships.',
    icon: GitBranch
  },
  {
    id: 'model',
    number: '04',
    name: 'Model',
    explanation: 'Test a suitable machine-learning approach.',
    icon: Cpu
  },
  {
    id: 'insight',
    number: '05',
    name: 'Insight',
    explanation: 'Turn the result into something useful.',
    icon: Sparkles
  }
];

export const DataFlowVisual: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('data');
  const [hoveredStageId, setHoveredStageId] = useState<string | null>(null);

  const displayedStageId = hoveredStageId || activeStageId;
  const currentStage = STAGES.find(s => s.id === displayedStageId) || STAGES[1];

  return (
    <div
      id="hero-data-flow-visual"
      className="relative w-full max-w-lg mx-auto lg:max-w-none select-none"
    >
      {/* Outer Editorial Visual Canvas */}
      <div className="relative rounded-2xl bg-[#0b0e14]/90 border border-white/[0.08] p-6 sm:p-8 backdrop-blur-md shadow-2xl transition-all duration-300">
        
        {/* Subtle background ambient glow & grid hint */}
        <div className="absolute inset-0 data-grid-pattern opacity-20 rounded-2xl pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#38bdf8]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Minimal Editorial Header */}
        <div className="relative z-10 flex items-center justify-between pb-5 mb-6 border-b border-white/[0.06]">
          <div className="flex items-center space-x-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
            <span className="text-xs font-mono-data uppercase tracking-wider text-slate-400">
              The Analytical Flow
            </span>
          </div>
          <span className="text-[11px] font-mono-data text-slate-400">
            Phase {currentStage.number} of 05
          </span>
        </div>

        {/* Flow Stage Sequence */}
        <div className="relative z-10 space-y-2.5 mb-7">
          {/* Continuous vertical connector line behind all nodes */}
          <div className="absolute left-[29px] top-6 bottom-6 w-px bg-white/[0.08] z-0 overflow-hidden pointer-events-none">
            {/* Subtle animated signal traveling through the flow */}
            <motion.div
              animate={{ y: ['-100%', '300%'] }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 0.8
              }}
              className="w-full h-12 bg-gradient-to-b from-transparent via-[#38bdf8] to-transparent opacity-80 shadow-[0_0_8px_#38bdf8]"
            />
          </div>

          {STAGES.map((stage) => {
            const isSelected = stage.id === displayedStageId;
            const isHovered = stage.id === hoveredStageId;
            const anyHovered = hoveredStageId !== null;
            const isDimmed = anyHovered && !isHovered;
            const Icon = stage.icon;

            return (
              <div key={stage.id} className="relative">
                <button
                  type="button"
                  id={`stage-item-${stage.id}`}
                  data-cursor="explore"
                  onMouseEnter={() => setHoveredStageId(stage.id)}
                  onMouseLeave={() => setHoveredStageId(null)}
                  onClick={() => setActiveStageId(stage.id)}
                  onFocus={() => setHoveredStageId(stage.id)}
                  onBlur={() => setHoveredStageId(null)}
                  className={`group relative z-10 w-full flex items-center justify-between p-3 sm:px-4 sm:py-3 rounded-xl transition-all duration-200 text-left cursor-pointer border ${
                    isSelected
                      ? 'bg-[#121822] border-[#38bdf8]/45 shadow-[0_0_24px_rgba(56,189,248,0.14)] translate-x-1'
                      : 'bg-[#0e1219]/60 border-transparent hover:bg-[#121822]/70 hover:border-white/10 hover:translate-x-1'
                  } ${isDimmed ? 'opacity-55 scale-[0.99]' : 'opacity-100'}`}
                  aria-label={`Inspect ${stage.name} phase: ${stage.explanation}`}
                >
                  <div className="flex items-center space-x-3.5">
                    {/* Node Icon Indicator */}
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/35 shadow-[0_0_10px_rgba(56,189,248,0.25)]'
                          : 'bg-[#141b24] text-slate-400 border border-white/[0.05] group-hover:text-slate-200 group-hover:border-white/10'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-[-3deg]" />
                    </div>

                    {/* Stage Name */}
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs font-mono-data transition-colors ${isSelected ? 'text-[#38bdf8]' : 'text-slate-400'}`}>
                        {stage.number}
                      </span>
                      <span
                        className={`text-sm font-medium tracking-tight transition-colors ${
                          isSelected ? 'text-slate-100 font-semibold' : 'text-slate-300 group-hover:text-white'
                        }`}
                      >
                        {stage.name}
                      </span>
                    </div>
                  </div>

                  {/* Flow Progression Arrow / Active Indicator */}
                  <div className="flex items-center space-x-2">
                    {isSelected ? (
                      <span className="text-xs font-mono-data text-[#38bdf8] flex items-center space-x-1 animate-in fade-in duration-150">
                        <span className="hidden sm:inline text-[11px] opacity-85">Selected</span>
                        <ArrowRight className="w-3.5 h-3.5 translate-x-0.5 transition-transform duration-200" />
                      </span>
                    ) : (
                      <span className="text-slate-500 text-xs font-mono-data opacity-40 group-hover:opacity-80 group-hover:text-[#38bdf8] group-hover:translate-x-0.5 transition-all duration-200">
                        →
                      </span>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Dynamic Editorial Explanation Card */}
        <div className="relative z-10 rounded-xl bg-[#121822] border border-white/[0.08] p-4 sm:p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono-data uppercase tracking-wider text-[#38bdf8]">
                  {currentStage.name} Phase
                </span>
                <span className="text-[11px] font-mono-data text-slate-400">
                  Step {currentStage.number}
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                "{currentStage.explanation}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtle Bottom Caption */}
        <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono-data text-slate-400">
          <span>Question → Insight Sequence</span>
          <span className="text-slate-400">Hover or click to inspect</span>
        </div>

      </div>
    </div>
  );
};
