import React from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  FolderGit2, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Award 
} from 'lucide-react';
import { EXPERIENCE_DATA, EDUCATION_TIMELINE } from '../data/portfolioData';

export const ExperienceEducationSection: React.FC = () => {
  return (
    <section 
      id="experience" 
      className="relative py-24 sm:py-32 border-t border-white/[0.06] bg-[#080a0e] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 data-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* ======================================================== */}
        {/* SECTION 02 — EXPERIENCE                                  */}
        {/* ======================================================== */}
        <div>
          {/* Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 text-xs font-mono-data text-[#38bdf8] uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
              <span>EXPERIENCE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 mb-4 leading-tight">
              Learning by building.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Practical application through project-based internship tasks, hands-on dataset exploration, and reproducible machine learning workflows.
            </p>
          </div>

          {/* Experience Timeline Card */}
          <div className="space-y-6">
            {EXPERIENCE_DATA.map((exp, idx) => (
              <div
                key={idx}
                id={`experience-item-${idx}`}
                className="rounded-3xl bg-[#0b0e14] border border-white/[0.08] hover:border-white/15 p-6 sm:p-8 lg:p-10 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                  <div>
                    <div className="flex items-center space-x-2.5 mb-1.5">
                      <div className="p-2 rounded-xl bg-[#121822] text-[#38bdf8] border border-[#38bdf8]/20">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
                          {exp.role}
                        </h3>
                        <div className="text-sm font-mono-data text-[#38bdf8]">
                          {exp.company} <span className="text-slate-400 font-normal">· {exp.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#101520] border border-white/[0.06] text-xs font-mono-data text-slate-300 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>{exp.dates}</span>
                  </div>
                </div>

                <div className="pt-6 space-y-6">
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-3xl">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  {exp.highlights && (
                    <div className="space-y-2.5">
                      <div className="text-[11px] font-mono-data uppercase tracking-wider text-slate-400">
                        PRACTICAL FOCUS & TASKS
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {exp.highlights.map((highlight, hIdx) => (
                          <div
                            key={hIdx}
                            className="p-4 rounded-xl bg-[#101622] border border-white/[0.05] text-xs text-slate-300 leading-relaxed flex items-start space-x-2"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* GitHub Task Repo Link */}
                  {exp.githubUrl && (
                    <div className="pt-4 flex items-center justify-between flex-wrap gap-4 border-t border-white/[0.04]">
                      <span className="text-xs font-mono-data text-slate-400">
                        PROJECT-BASED LEARNING ARTIFACTS
                      </span>

                      <a
                        href={exp.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        id="codealpha-tasks-github-link"
                        className="min-h-[44px] inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#141b24] hover:bg-[#1a2330] text-slate-200 hover:text-white border border-white/10 text-xs font-mono-data font-medium transition-colors cursor-pointer"
                        aria-label="View CodeAlpha tasks repository on GitHub"
                      >
                        <FolderGit2 className="w-4 h-4 text-slate-400" />
                        <span>View Internship Tasks on GitHub</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 03 — EDUCATION                                   */}
        {/* ======================================================== */}
        <div id="education">
          {/* Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 text-xs font-mono-data text-[#38bdf8] uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
              <span>EDUCATION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 mb-4 leading-tight">
              Building the foundation.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Academic groundwork in mathematics, analytical reasoning, and scientific inquiry supporting quantitative machine learning.
            </p>
          </div>

          {/* Education Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATION_TIMELINE.map((item, idx) => (
              <div
                key={idx}
                id={`education-card-${idx}`}
                className="rounded-3xl bg-[#0b0e14] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono-data pb-4 mb-4 border-b border-white/[0.06]">
                    <div className="flex items-center space-x-2 text-[#38bdf8]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="font-semibold">{item.period}</span>
                    </div>

                    {item.isPending ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono-data text-amber-400 inline-flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Completed · Result Pending</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono-data text-emerald-400 inline-flex items-center space-x-1">
                        <Award className="w-3 h-3" />
                        <span>{item.statusOrScore}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <div className="p-2.5 rounded-xl bg-[#121822] text-[#38bdf8] border border-white/[0.06] mt-0.5">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-1">
                        {item.degree}
                      </h3>
                      <div className="text-sm text-slate-300 font-medium">
                        {item.institution}
                      </div>
                      {item.location && (
                        <div className="text-xs font-mono-data text-slate-400 mt-1 flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-[#38bdf8]" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.04] text-xs font-mono-data text-slate-400">
                  {item.isPending ? (
                    <span className="text-slate-300">
                      Pre-Engineering discipline with focus on Mathematics, Physics, and analytical problem-solving.
                    </span>
                  ) : (
                    <span className="text-slate-300">
                      Pre-Medical matriculation foundation completed with an academic score of <span className="text-emerald-400 font-semibold">{item.score}</span>.
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
