import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderGit2, 
  ExternalLink, 
  ArrowUpRight, 
  FileText, 
  CheckCircle2, 
  Layers, 
  Sparkles 
} from 'lucide-react';
import { ProjectData, ProjectFilterCategory } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';
import { 
  VoltSenseAIVisual, 
  TelcoChurnVisual, 
  SalaryAnalysisVisual, 
  FIFAPerformanceVisual, 
  AICompaniesVisual 
} from './ProjectVisuals';
import { ProjectDetailModal } from './ProjectDetailModal';
import { ImageLightboxModal, LightboxImage } from './ImageLightboxModal';

// ----------------------------------------------------------------------------
// SUBTLE PHYSICAL 3D TILT CARD WRAPPER FOR PROJECT SCREENSHOTS
// ----------------------------------------------------------------------------
interface ProjectCard3DTiltProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

const ProjectCard3DTilt: React.FC<ProjectCard3DTiltProps> = ({ 
  children, 
  className, 
  onClick, 
  ariaLabel 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [isActive, setIsActive] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5; // Capped at +/- 5 deg for crisp readability
    const rotateY = ((x - centerX) / centerX) * 5;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseEnter = () => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: isActive ? 'transform 0.1s ease-out, border-color 0.2s' : 'transform 0.5s ease-out, border-color 0.2s',
        transformStyle: 'preserve-3d',
      }}
      className={className}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
};

export const SelectedWorkSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [previewImage, setPreviewImage] = useState<LightboxImage | null>(null);

  const filterTabs: { id: ProjectFilterCategory; label: string }[] = [
    { id: 'all', label: 'All Work' },
    { id: 'ml', label: 'Machine Learning' },
    { id: 'analysis', label: 'Data Analysis & EDA' },
    { id: 'apps', label: 'Applications' }
  ];

  const filteredProjects = PROJECTS_DATA.filter((proj) =>
    proj.filterCategories.includes(activeFilter)
  );

  const renderProjectVisual = (id: string, isFirstVisible: boolean = false) => {
    const handleExpand = (img: LightboxImage) => setPreviewImage(img);

    switch (id) {
      case 'voltsense-ai':
        return <VoltSenseAIVisual onExpand={handleExpand} priority={isFirstVisible} />;
      case 'telco-churn':
        return <TelcoChurnVisual onExpand={handleExpand} priority={isFirstVisible} />;
      case 'salary-analysis':
        return <SalaryAnalysisVisual onExpand={handleExpand} priority={isFirstVisible} />;
      case 'fifa-performance':
        return <FIFAPerformanceVisual onExpand={handleExpand} priority={isFirstVisible} />;
      case '500-ai-companies':
        return <AICompaniesVisual onExpand={handleExpand} priority={isFirstVisible} />;
      default:
        return <VoltSenseAIVisual onExpand={handleExpand} priority={isFirstVisible} />;
    }
  };

  return (
    <section
      id="work"
      className="relative py-24 sm:py-32 border-t border-white/[0.06] bg-[#080a0e] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 data-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ======================================================== */}
        {/* SECTION HEADER                                           */}
        {/* ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-mono-data text-[#38bdf8] uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
              <span>SELECTED WORK</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 mb-4 leading-tight">
              Questions I've explored with data.
            </h2>
            
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Each project starts with a question and ends with an analysis, model, or working application that can be explored.
            </p>
          </div>

          {/* Minimal Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#0e131b] border border-white/[0.08] shrink-0 self-start md:self-end">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  id={`work-filter-tab-${tab.id}`}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-data font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#182230] text-[#38bdf8] border border-[#38bdf8]/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                  aria-label={`Filter by ${tab.label}`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* CURATED EDITORIAL PROJECT LIST WITH 3D TILT & SIGNAL     */}
        {/* ======================================================== */}
        <div className="space-y-12 sm:space-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isEven = index % 2 === 1;
              const isFeatured = project.isFeatured;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {/* Signal handoff line between consecutive project chambers */}
                  {index > 0 && (
                    <div className="flex items-center justify-center my-4 py-2">
                      <div className="w-full max-w-xs h-[1px] bg-gradient-to-r from-transparent via-[#38bdf8]/30 to-transparent relative">
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#080a0e] border border-[#38bdf8]/30 text-[9px] font-mono-data text-[#38bdf8]/80 uppercase">
                          SIGNAL PIPELINE
                        </div>
                      </div>
                    </div>
                  )}

                  <article
                    id={`project-card-${project.id}`}
                    data-cursor="project"
                    className={`rounded-3xl border transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 ${
                      isFeatured
                        ? 'bg-[#0b0e14] border-[#38bdf8]/45 shadow-[0_8px_32px_rgba(56,189,248,0.1)] hover:border-[#38bdf8]/70 hover:shadow-[0_16px_48px_rgba(56,189,248,0.18)]'
                        : 'bg-[#0b0e14]/90 border-white/[0.08] hover:border-[#38bdf8]/40 hover:shadow-[0_12px_40px_rgba(56,189,248,0.12)]'
                    }`}
                  >
                    {/* Subtle Top Accent for Featured Case Study */}
                    {isFeatured && (
                      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent" />
                    )}

                    <div className="p-6 sm:p-8 lg:p-10">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        
                        {/* ==================================================== */}
                        {/* PROJECT VISUAL (Physical 3D Tilt Wrapper)            */}
                        {/* ==================================================== */}
                        <div
                          className={`lg:col-span-5 ${
                            isEven ? 'lg:order-2' : 'lg:order-1'
                          }`}
                        >
                          <ProjectCard3DTilt
                            onClick={() => setSelectedProject(project)}
                            ariaLabel={`Open case study for ${project.title}`}
                            className="w-full aspect-[16/10] sm:h-64 rounded-2xl bg-[#0b0e14] border border-white/[0.08] relative overflow-hidden shadow-lg cursor-pointer group-hover:border-[#38bdf8]/40 transition-colors"
                          >
                            {/* Inner Visual Component */}
                            {renderProjectVisual(project.id, index === 0)}

                            {/* Overlay Hint on Visual Hover */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] z-10">
                              <span className="px-4 py-2 rounded-xl bg-[#121822] text-[#38bdf8] border border-[#38bdf8]/40 text-xs font-mono-data font-semibold inline-flex items-center space-x-1.5 shadow-lg">
                                <FileText className="w-3.5 h-3.5" />
                                <span>View Case Study</span>
                              </span>
                            </div>
                          </ProjectCard3DTilt>
                        </div>

                        {/* ==================================================== */}
                        {/* PROJECT INFORMATION & PROBLEM HIERARCHY             */}
                        {/* ==================================================== */}
                        <div
                          className={`lg:col-span-7 flex flex-col justify-between ${
                            isEven ? 'lg:order-1' : 'lg:order-2'
                          }`}
                        >
                          <div>
                            {/* Meta Category & Project Number */}
                            <div className="flex items-center justify-between gap-3 text-xs font-mono-data mb-3">
                              <span className="text-[#38bdf8] font-medium uppercase tracking-wider">
                                {project.category}
                              </span>
                              <span className="text-slate-400">
                                NO. {project.number}
                              </span>
                            </div>

                            {/* Primary Question / Problem Framing */}
                            <div className="mb-3">
                              <p className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight leading-snug group-hover:text-[#38bdf8] transition-colors">
                                "{project.problemQuestion}"
                              </p>
                            </div>

                            {/* Project Title */}
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-200 mb-3">
                              {project.title}
                            </h3>

                            {/* Concise Narrative Description */}
                            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-normal">
                              {project.description}
                            </p>

                            {/* Methods / Technical Evidence Pill List */}
                            <div className="mb-8">
                              <div className="text-[11px] font-mono-data uppercase text-slate-400 mb-2">
                                METHODS & TECHNICAL EVIDENCE
                              </div>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {project.methods.map((method, mIdx) => (
                                  <span
                                    key={mIdx}
                                    className="px-2.5 py-1 rounded-md bg-[#121822] border border-white/[0.06] text-xs font-mono-data text-slate-300"
                                  >
                                    {method}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Action Proof Row: GitHub, Live Demo & Case Study */}
                          <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                            
                            {/* Case Study Trigger */}
                            <button
                              type="button"
                              id={`read-case-study-${project.id}`}
                              onClick={() => setSelectedProject(project)}
                              className="inline-flex items-center space-x-1.5 text-xs font-mono-data text-slate-200 hover:text-[#38bdf8] transition-colors cursor-pointer py-2"
                            >
                              <FileText className="w-4 h-4 text-[#38bdf8]" />
                              <span className="underline underline-offset-4">Read full case study</span>
                              <span className="text-[#38bdf8]">→</span>
                            </button>

                            {/* Direct Verification Links */}
                            <div className="flex items-center flex-wrap gap-2.5">
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                id={`project-github-${project.id}`}
                                className="min-h-[44px] inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#141b24] hover:bg-[#1a2330] text-slate-200 hover:text-white border border-white/10 text-xs font-mono-data font-medium transition-colors cursor-pointer"
                                aria-label={`View ${project.title} on GitHub`}
                              >
                                <FolderGit2 className="w-4 h-4 text-slate-400" />
                                <span>GitHub</span>
                                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                              </a>

                              <a
                                href={project.liveDemoUrl}
                                target="_blank"
                                rel="noreferrer"
                                id={`project-live-demo-${project.id}`}
                                className="min-h-[44px] inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#38bdf8] hover:bg-[#0284c7] text-[#080a0e] font-semibold text-xs font-mono-data transition-colors shadow-[0_2px_12px_rgba(56,189,248,0.2)] cursor-pointer"
                                aria-label={`Launch Live Demo for ${project.title}`}
                              >
                                <span>Live Demo</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </a>
                            </div>

                          </div>

                        </div>

                      </div>
                    </div>
                  </article>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* Case Study Deep Dive Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* Direct Screenshot Preview Lightbox Modal */}
      <ImageLightboxModal
        isOpen={!!previewImage}
        image={previewImage}
        onClose={() => setPreviewImage(null)}
      />
    </section>
  );
};
