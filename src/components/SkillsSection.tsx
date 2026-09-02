import React, { useState } from 'react';
import { 
  Terminal, 
  Database, 
  Cpu, 
  CheckCircle2, 
  Layout, 
  Server, 
  Wrench, 
  Sparkles, 
  ArrowUpRight, 
  Info 
} from 'lucide-react';
import { STRUCTURED_SKILL_GROUPS, CURRENTLY_LEARNING } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getGroupIcon = (number: string) => {
    switch (number) {
      case '01':
        return <Terminal className="w-4 h-4 text-[#38bdf8]" />;
      case '02':
        return <Database className="w-4 h-4 text-[#38bdf8]" />;
      case '03':
        return <Cpu className="w-4 h-4 text-[#38bdf8]" />;
      case '04':
        return <CheckCircle2 className="w-4 h-4 text-[#38bdf8]" />;
      case '05':
        return <Layout className="w-4 h-4 text-[#38bdf8]" />;
      case '06':
        return <Server className="w-4 h-4 text-[#38bdf8]" />;
      default:
        return <Wrench className="w-4 h-4 text-[#38bdf8]" />;
    }
  };

  return (
    <section 
      id="skills" 
      className="relative py-24 sm:py-32 border-t border-white/[0.06] bg-[#080a0e] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 data-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ======================================================== */}
        {/* SECTION HEADER                                           */}
        {/* ======================================================== */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-data text-[#38bdf8] uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
            <span>SKILLS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 mb-4 leading-tight">
            Tools I use to turn data into working projects.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Grouped by how they are applied in practice — from data wrangling and algorithm training to interface deployment.
          </p>

          <div className="mt-4 inline-flex items-center space-x-2 text-xs font-mono-data text-[#38bdf8]">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>These skills are demonstrated across the projects above.</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* GROUPED SKILL SECTIONS                                   */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STRUCTURED_SKILL_GROUPS.map((group) => (
            <div
              key={group.number}
              id={`skill-group-${group.number}`}
              className="rounded-3xl bg-[#0b0e14] border border-white/[0.08] hover:border-white/15 p-6 sm:p-7 flex flex-col justify-between transition-colors space-y-6"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-1.5 rounded-lg bg-[#121822] border border-white/[0.06]">
                      {getGroupIcon(group.number)}
                    </div>
                    <h3 className="text-base font-bold text-slate-100">
                      {group.category}
                    </h3>
                  </div>

                  <span className="text-xs font-mono-data text-[#38bdf8]">
                    {group.number}
                  </span>
                </div>

                {/* Skills Pill List with Project Evidence */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => {
                    const isDirectlyHovered = hoveredSkill === skill.name;
                    
                    // Connected illumination: check if this skill shares any project ref with hovered skill
                    let isConnected = false;
                    if (hoveredSkill && !isDirectlyHovered) {
                      const hoveredObj = STRUCTURED_SKILL_GROUPS.flatMap(g => g.skills).find(s => s.name === hoveredSkill);
                      if (hoveredObj && hoveredObj.projectRefs && skill.projectRefs) {
                        isConnected = hoveredObj.projectRefs.some(pr => skill.projectRefs?.includes(pr));
                      }
                    }

                    return (
                      <div
                        key={skill.name}
                        data-cursor="explore"
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="group relative"
                      >
                        <span
                          className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-mono-data transition-all duration-200 cursor-default ${
                            isDirectlyHovered
                              ? 'bg-[#182332] text-[#38bdf8] border border-[#38bdf8]/60 shadow-[0_0_12px_rgba(56,189,248,0.25)] scale-105'
                              : isConnected
                              ? 'bg-[#121c2a] text-[#38bdf8]/90 border border-[#38bdf8]/30 shadow-[0_0_8px_rgba(56,189,248,0.12)]'
                              : 'bg-[#101520] text-slate-200 border border-white/[0.06] hover:border-white/20'
                          }`}
                        >
                          <span>{skill.name}</span>
                          {skill.projectRefs && skill.projectRefs.length > 0 && (
                            <span className="text-[10px] text-slate-400 group-hover:text-[#38bdf8]">
                              •
                            </span>
                          )}
                        </span>

                        {/* Subtle Project Connection Tooltip / Reference */}
                        {skill.projectRefs && skill.projectRefs.length > 0 && isDirectlyHovered && (
                          <div className="absolute z-20 bottom-full left-0 mb-2 w-56 p-2.5 rounded-xl bg-[#090d14] border border-[#38bdf8]/30 shadow-2xl text-[11px] font-mono-data text-slate-300 pointer-events-none">
                            <div className="text-[10px] text-[#38bdf8] uppercase mb-1 font-bold">
                              DEMONSTRATED IN:
                            </div>
                            <ul className="space-y-0.5 text-slate-200">
                              {skill.projectRefs.map((proj, pIdx) => (
                                <li key={pIdx} className="flex items-center space-x-1 truncate">
                                  <span className="text-[#38bdf8]">→</span>
                                  <span className="truncate">{proj}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Group Footer Note */}
              <div className="pt-3 border-t border-white/[0.04] text-[11px] font-mono-data text-slate-400">
                Applied in reproducible notebooks & scripts
              </div>
            </div>
          ))}

          {/* ======================================================== */}
          {/* CURRENTLY LEARNING CARD                                   */}
          {/* ======================================================== */}
          <div
            id="currently-learning-card"
            className="rounded-3xl bg-gradient-to-br from-[#0b0e14] to-[#0e141f] border border-[#38bdf8]/20 p-6 sm:p-7 flex flex-col justify-between space-y-6 md:col-span-2 lg:col-span-2"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-lg bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-100">
                    Currently Learning
                  </h3>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[11px] font-mono-data text-[#38bdf8]">
                  ACTIVE STUDY
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="px-3.5 py-1.5 rounded-xl bg-[#162232] border border-[#38bdf8]/40 text-sm font-mono-data text-[#38bdf8] font-bold">
                    {CURRENTLY_LEARNING.skill}
                  </span>
                  <span className="text-xs font-mono-data text-slate-300">
                    Structured Query Language (Relational Databases)
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                  {CURRENTLY_LEARNING.note}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.04] text-[11px] font-mono-data text-slate-400">
              Expanding backend query competence to complement Python data wrangling.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
