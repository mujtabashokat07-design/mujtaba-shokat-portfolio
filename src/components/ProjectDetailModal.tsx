import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  FolderGit2, 
  ArrowLeft, 
  ArrowRight, 
  Database, 
  GitBranch, 
  Cpu, 
  Award, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  ArrowUpRight,
  Terminal,
  Grid
} from 'lucide-react';
import { ProjectData } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';
import { ProjectEvidenceGallery } from './ProjectVisuals';
import { ImageLightboxModal, LightboxImage } from './ImageLightboxModal';

interface ProjectDetailModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onSelectProject: (project: ProjectData) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ 
  project, 
  onClose, 
  onSelectProject 
}) => {
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState<LightboxImage | null>(null);
  const [lightboxAllImages, setLightboxAllImages] = useState<LightboxImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Close on Escape key or navigate with Left/Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === 'Escape') {
        if (activeLightboxImage) {
          setActiveLightboxImage(null);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft' && !activeLightboxImage) {
        handlePrev();
      } else if (e.key === 'ArrowRight' && !activeLightboxImage) {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, activeLightboxImage, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      // Reset scroll position to top whenever active project changes
      if (contentContainerRef.current) {
        contentContainerRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  // Compute previous and next projects for bottom navigation
  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? PROJECTS_DATA[currentIndex - 1] : PROJECTS_DATA[PROJECTS_DATA.length - 1];
  const nextProject = currentIndex < PROJECTS_DATA.length - 1 ? PROJECTS_DATA[currentIndex + 1] : PROJECTS_DATA[0];

  const handlePrev = () => {
    onSelectProject(prevProject);
  };

  const handleNext = () => {
    onSelectProject(nextProject);
  };

  return (
    <>
      <AnimatePresence>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 bg-black/85 backdrop-blur-md overflow-hidden"
          id="project-detail-modal-overlay"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.98, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 14 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            ref={contentContainerRef}
            className="relative w-full max-w-4xl bg-[#080b10] border border-white/[0.12] rounded-2xl sm:rounded-3xl shadow-2xl my-auto max-h-[92vh] overflow-y-auto focus:outline-none custom-scrollbar"
            id="project-detail-modal-content"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            {/* ======================================================== */}
            {/* STICKY TOP BAR                                           */}
            {/* ======================================================== */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-4 bg-[#080b10]/95 backdrop-blur-md border-b border-white/[0.08]">
              <div className="flex items-center space-x-2 text-xs font-mono-data text-slate-400">
                <span className="text-[#38bdf8] font-bold">CASE STUDY {project.number}</span>
                <span>/</span>
                <span className="text-slate-300 truncate max-w-[200px] sm:max-w-xs">{project.title}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  id="close-case-study-top-button"
                  onClick={onClose}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 text-xs font-mono-data transition-colors cursor-pointer"
                  aria-label="Close case study (ESC)"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Close (ESC)</span>
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-10 lg:p-12 space-y-12">
              
              {/* ======================================================== */}
              {/* CASE STUDY OPENING                                       */}
              {/* ======================================================== */}
              <header className="space-y-4 border-b border-white/[0.08] pb-10">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121822] border border-[#38bdf8]/30 text-xs font-mono-data text-[#38bdf8]">
                  <span>PROJECT {project.number}</span>
                  <span>•</span>
                  <span>{project.category}</span>
                </div>

                <h1
                  id="case-study-title"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 leading-[1.15]"
                >
                  {project.title}
                </h1>

                {/* Problem / Inquiry Question */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#0e131b] border border-[#38bdf8]/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#38bdf8]" />
                  <div className="text-[11px] font-mono-data uppercase tracking-wider text-[#38bdf8] mb-1.5 flex items-center space-x-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>PRIMARY INQUIRY QUESTION</span>
                  </div>
                  <p className="text-base sm:text-lg text-slate-100 font-semibold italic leading-relaxed">
                    "{project.problemQuestion}"
                  </p>
                </div>

                {/* Narrative Summary */}
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal pt-2">
                  {project.caseStudy.openingSummary}
                </p>

                {/* Visual Flow Indicator */}
                <div className="pt-4">
                  <div className="text-[11px] font-mono-data uppercase tracking-wider text-slate-400 mb-2.5">
                    ANALYTICAL WORKFLOW PIPELINE
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] font-mono-data text-slate-300">
                    {['PROBLEM', 'DATA', 'APPROACH', 'MODEL', 'EVALUATION', 'APPLICATION'].map((step, idx, arr) => (
                      <React.Fragment key={step}>
                        <span className="px-2.5 py-1 rounded-md bg-[#121822] border border-white/[0.08] text-slate-200">
                          {step}
                        </span>
                        {idx < arr.length - 1 && (
                          <span className="text-slate-400 font-bold">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </header>

              {/* ======================================================== */}
              {/* PROJECT EVIDENCE AREA (3 REAL SCREENSHOTS)               */}
              {/* ======================================================== */}
              <section id="case-study-project-evidence" className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-1 rounded bg-[#16202e] border border-[#38bdf8]/30 text-xs font-mono-data font-bold text-[#38bdf8]">
                    00
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100">
                    PROJECT EVIDENCE &amp; VISUAL TELEMETRY
                  </h2>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-[#0c1017] border border-white/[0.06]">
                  <ProjectEvidenceGallery
                    project={project}
                    onImageClick={(img, allImages, index) => {
                      setActiveLightboxImage(img);
                      if (allImages) setLightboxAllImages(allImages);
                      if (index !== undefined) setLightboxIndex(index);
                    }}
                  />
                </div>
              </section>

            {/* ======================================================== */}
            {/* 01 — THE PROBLEM                                         */}
            {/* ======================================================== */}
            <section id="case-study-01-problem" className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded bg-[#16202e] border border-[#38bdf8]/30 text-xs font-mono-data font-bold text-[#38bdf8]">
                  01
                </span>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100">
                  THE PROBLEM
                </h2>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#0c1017] border border-white/[0.06] space-y-3">
                <h3 className="text-base font-semibold text-slate-200">
                  {project.caseStudy.section01Problem.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {project.caseStudy.section01Problem.description}
                </p>
              </div>
            </section>

            {/* ======================================================== */}
            {/* 02 — THE DATA                                            */}
            {/* ======================================================== */}
            <section id="case-study-02-data" className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded bg-[#16202e] border border-[#38bdf8]/30 text-xs font-mono-data font-bold text-[#38bdf8]">
                  02
                </span>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100">
                  THE DATA
                </h2>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#0c1017] border border-white/[0.06] space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-[#38bdf8]" />
                    <span className="text-sm font-semibold text-slate-200 font-mono-data">
                      {project.caseStudy.section02Data.datasetName}
                    </span>
                  </div>

                  {project.caseStudy.section02Data.isSynthetic ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono-data text-amber-400 inline-flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>SYNTHETIC DATASET</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono-data text-emerald-400">
                      PUBLIC RESEARCH BENCHMARK
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.caseStudy.section02Data.description}
                </p>

                {/* Data Pipeline Diagram: Raw Records -> Prepared Features -> Model Input */}
                <div>
                  <div className="text-[11px] font-mono-data uppercase text-slate-400 mb-2">
                    DATA TRANSFORMATION PIPELINE
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {project.caseStudy.section02Data.pipeline.map((stepDesc, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#111722] border border-white/[0.06] flex flex-col justify-between space-y-2 relative"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono-data text-[#38bdf8]">
                          <span>STAGE 0{idx + 1}</span>
                          <span>
                            {idx === 0 ? 'Raw Records' : idx === 1 ? 'Prepared Features' : 'Model Input'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-normal">
                          {stepDesc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ======================================================== */}
            {/* 03 — THE APPROACH                                        */}
            {/* ======================================================== */}
            <section id="case-study-03-approach" className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded bg-[#16202e] border border-[#38bdf8]/30 text-xs font-mono-data font-bold text-[#38bdf8]">
                  03
                </span>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100">
                  THE APPROACH
                </h2>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#0c1017] border border-white/[0.06] space-y-5">
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {project.caseStudy.section03Approach.description}
                </p>

                {/* Key Method Highlight */}
                <div className="p-3.5 rounded-xl bg-[#101622] border border-[#38bdf8]/20">
                  <div className="text-[11px] font-mono-data uppercase text-[#38bdf8] mb-1">
                    KEY METHODOLOGICAL FORMULATION
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-mono-data">
                    {project.caseStudy.section03Approach.keyMethod}
                  </p>
                </div>

                {/* Workflow Step Sequence */}
                <div>
                  <div className="text-[11px] font-mono-data uppercase text-slate-400 mb-2">
                    SEQUENTIAL EXECUTION WORKFLOW
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.caseStudy.section03Approach.workflowSteps.map((wf, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#111722] border border-white/[0.08] text-xs font-mono-data text-slate-200"
                      >
                        <span className="text-[#38bdf8] font-bold">{idx + 1}.</span>
                        <span>{wf}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ======================================================== */}
            {/* 04 — THE MODEL / METHODS                                 */}
            {/* ======================================================== */}
            <section id="case-study-04-model" className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded bg-[#16202e] border border-[#38bdf8]/30 text-xs font-mono-data font-bold text-[#38bdf8]">
                  04
                </span>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100">
                  THE MODEL & METHODS
                </h2>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#0c1017] border border-white/[0.06] space-y-4">
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {project.caseStudy.section04Model.description}
                </p>

                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-mono-data uppercase text-slate-400 mb-1">
                    APPLIED ALGORITHMS & IMPLEMENTATIONS
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.caseStudy.section04Model.modelsUsed.map((modelName, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[#111722] border border-white/[0.06] flex items-center space-x-2.5 text-xs sm:text-sm font-mono-data text-slate-200"
                      >
                        <Cpu className="w-4 h-4 text-[#38bdf8] shrink-0" />
                        <span>{modelName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ======================================================== */}
            {/* 05 — THE EVALUATION                                      */}
            {/* ======================================================== */}
            <section id="case-study-05-evaluation" className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded bg-[#16202e] border border-[#38bdf8]/30 text-xs font-mono-data font-bold text-[#38bdf8]">
                  05
                </span>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100">
                  THE EVALUATION
                </h2>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#0c1017] border border-white/[0.06] space-y-5">
                <div>
                  <div className="text-[11px] font-mono-data uppercase text-slate-400 mb-2">
                    EVALUATION FRAMEWORK & METRICS
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.caseStudy.section05Evaluation.concepts.map((concept, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-[#111722] border border-[#38bdf8]/30 text-xs font-mono-data text-[#38bdf8] font-medium"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Real Project Evaluation Benchmark Artifact */}
                <div className="p-3.5 rounded-xl bg-[#111722] border border-white/[0.06] flex items-center justify-between gap-3 text-xs font-mono-data">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                    <span>Evaluation telemetry &amp; confusion matrix captured in Section 00 above</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (project.evidenceImages && project.evidenceImages[1]) {
                        setActiveLightboxImage({ ...project.evidenceImages[1], projectTitle: project.title });
                      }
                    }}
                    className="text-[#38bdf8] hover:underline cursor-pointer text-[11px]"
                  >
                    View Evaluation Screenshot →
                  </button>
                </div>

                {/* Honest Evaluation Grounding */}
                <div className="p-4 rounded-xl bg-[#0f141d] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-mono-data text-slate-300 font-medium">
                      {project.caseStudy.section05Evaluation.note}
                    </div>
                    <p className="text-xs text-slate-400 leading-normal">
                      Full benchmarking scripts, metric plots, and validation logs are published directly in the repository.
                    </p>
                  </div>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    id={`eval-repo-link-${project.id}`}
                    className="shrink-0 inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#161f2c] hover:bg-[#1e2a3b] text-slate-200 hover:text-white border border-white/10 text-xs font-mono-data transition-colors"
                  >
                    <FolderGit2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>View Evaluation Code</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              </div>
            </section>

            {/* ======================================================== */}
            {/* 06 — WHAT I BUILT (APPLICATION ARCHITECTURE)             */}
            {/* ======================================================== */}
            <section id="case-study-06-what-i-built" className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded bg-[#16202e] border border-[#38bdf8]/30 text-xs font-mono-data font-bold text-[#38bdf8]">
                  06
                </span>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100">
                  WHAT I BUILT
                </h2>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#0c1017] border border-white/[0.06] space-y-6">
                
                {/* Visual Architecture Flow Diagram */}
                <div>
                  <div className="text-[11px] font-mono-data uppercase text-slate-400 mb-3">
                    SYSTEM ARCHITECTURE PIPELINE
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    {project.caseStudy.section06WhatIBuilt.architectureSteps.map((step, idx, arr) => (
                      <React.Fragment key={step}>
                        <div className="flex-1 p-3.5 rounded-xl bg-[#111722] border border-white/[0.08] text-center">
                          <div className="text-[10px] font-mono-data text-[#38bdf8] uppercase tracking-wider mb-1">
                            LAYER 0{idx + 1}
                          </div>
                          <div className="text-xs sm:text-sm font-bold font-mono-data text-slate-100">
                            {step}
                          </div>
                        </div>
                        {idx < arr.length - 1 && (
                          <div className="hidden sm:flex items-center justify-center text-slate-400 font-mono-data font-bold">
                            →
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Architecture Details Breakdown */}
                <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
                  <div className="text-[11px] font-mono-data uppercase text-slate-400 mb-1">
                    DELIVERABLE BREAKDOWN
                  </div>
                  {project.caseStudy.section06WhatIBuilt.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ======================================================== */}
            {/* 07 — EXPLORE THE PROJECT                                 */}
            {/* ======================================================== */}
            <section id="case-study-07-explore" className="space-y-4 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded bg-[#16202e] border border-[#38bdf8]/30 text-xs font-mono-data font-bold text-[#38bdf8]">
                  07
                </span>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100">
                  EXPLORE THE PROJECT
                </h2>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0e141e] to-[#0a0d13] border border-white/[0.1] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-slate-100">
                    Verify Implementation & Test Live Interface
                  </div>
                  <p className="text-xs text-slate-400 max-w-md">
                    Explore the complete source code on GitHub or interact with the deployed prototype application in real time.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    id={`case-study-github-btn-${project.id}`}
                    className="min-h-[44px] inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-[#141b24] hover:bg-[#1c2633] text-slate-200 hover:text-white border border-white/10 text-xs font-mono-data font-medium transition-colors"
                  >
                    <FolderGit2 className="w-4 h-4 text-slate-400" />
                    <span>GitHub Repository</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>

                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    id={`case-study-demo-btn-${project.id}`}
                    className="min-h-[44px] inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-[#38bdf8] hover:bg-[#0284c7] text-[#080a0e] font-semibold text-xs font-mono-data transition-colors shadow-[0_2px_14px_rgba(56,189,248,0.25)]"
                  >
                    <span>Launch Live Demo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>

            {/* ======================================================== */}
            {/* NAVIGATION BETWEEN PROJECTS (BOTTOM)                     */}
            {/* ======================================================== */}
            <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Previous Project */}
              <button
                type="button"
                id="case-study-prev-project-btn"
                onClick={handlePrev}
                className="w-full sm:w-auto inline-flex items-center justify-start sm:justify-start space-x-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-xs font-mono-data transition-colors cursor-pointer"
                aria-label={`Previous project: ${prevProject.title}`}
              >
                <ArrowLeft className="w-4 h-4 text-[#38bdf8]" />
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 uppercase">PREVIOUS ({prevProject.number})</div>
                  <div className="font-semibold text-slate-200 truncate max-w-[140px]">{prevProject.title}</div>
                </div>
              </button>

              {/* Back to Selected Work button */}
              <button
                type="button"
                id="case-study-back-to-work-btn"
                onClick={onClose}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#121822] hover:bg-[#182230] text-slate-200 hover:text-[#38bdf8] border border-white/10 text-xs font-mono-data font-medium transition-colors cursor-pointer"
              >
                <Grid className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Back to Selected Work</span>
              </button>

              {/* Next Project */}
              <button
                type="button"
                id="case-study-next-project-btn"
                onClick={handleNext}
                className="w-full sm:w-auto inline-flex items-center justify-end sm:justify-end space-x-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-xs font-mono-data transition-colors cursor-pointer"
                aria-label={`Next project: ${nextProject.title}`}
              >
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase">NEXT ({nextProject.number})</div>
                  <div className="font-semibold text-slate-200 truncate max-w-[140px]">{nextProject.title}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#38bdf8]" />
              </button>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>

    {/* Lightbox Modal for High-Resolution Screenshot Zooming */}
    <ImageLightboxModal
      isOpen={!!activeLightboxImage}
      image={activeLightboxImage}
      allImages={lightboxAllImages}
      currentIndex={lightboxIndex}
      onNavigate={(idx) => {
        setLightboxIndex(idx);
        setActiveLightboxImage(lightboxAllImages[idx]);
      }}
      onClose={() => setActiveLightboxImage(null)}
    />
  </>
);
};
