import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  Database, 
  GitBranch, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Maximize2 
} from 'lucide-react';
import { ImageLightboxModal, LightboxImage } from './ImageLightboxModal';
import { OptimizedImage } from './OptimizedImage';

interface JourneyStage {
  id: string;
  number: string;
  title: string;
  description: string;
  examplePrompt: string;
  takeaway: string;
  icon: React.ComponentType<{ className?: string }>;
}

const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'question',
    number: '01',
    title: 'Question',
    description: 'Define what needs to be answered.',
    examplePrompt: 'What are we trying to predict or understand?',
    takeaway: 'Clarity at the beginning gives every subsequent step purpose.',
    icon: HelpCircle
  },
  {
    id: 'data',
    number: '02',
    title: 'Data',
    description: 'Find, clean, and prepare the right information.',
    examplePrompt: 'Are the records reliable, unbiased, and structured properly?',
    takeaway: 'Raw inputs are gathered, validated, and shaped into a dependable foundation.',
    icon: Database
  },
  {
    id: 'analysis',
    number: '03',
    title: 'Analysis',
    description: 'Explore patterns, relationships, and useful signals.',
    examplePrompt: 'Which variables correlate, and where do anomalies hide?',
    takeaway: 'Isolating genuine signal from noise before touching any algorithms.',
    icon: GitBranch
  },
  {
    id: 'model',
    number: '04',
    title: 'Model',
    description: 'Test a suitable machine-learning approach.',
    examplePrompt: 'Which algorithmic approach provides valid, generalizable predictions?',
    takeaway: 'Testing models that best fit the data structure and problem constraints.',
    icon: Cpu
  },
  {
    id: 'insight',
    number: '05',
    title: 'Insight',
    description: 'Turn the result into something useful.',
    examplePrompt: 'How does this model result guide a real human decision or app?',
    takeaway: 'Data is not the final product. A useful answer is.',
    icon: Sparkles
  }
];

// ----------------------------------------------------------------------------
// REAL PROJECT EVIDENCE MAPPING FOR THE 5 DATA SCIENCE JOURNEY PHASES
// ----------------------------------------------------------------------------
interface StageEvidence extends LightboxImage {
  projectSubtitle: string;
}

const STAGE_EVIDENCE_MAP: Record<string, StageEvidence> = {
  question: {
    url: '/assets/projects/telco-churn-1.webp',
    thumbnailUrl: '/assets/projects/telco-churn-1-thumb.webp',
    projectTitle: 'Telco Customer Churn Prediction Suite',
    projectSubtitle: 'Real Project: Telco Customer Churn',
    badge: '01 · REAL PROBLEM FORMULATION',
    title: 'Business Context & Problem Framing',
    caption: 'Telco Churn: Grounding the inquiry question in 7,043 customer records, 19 predictor features, and a 26.58% baseline churn rate.',
    alt: 'Telco Customer Churn Prediction Suite overview showing 7043 customer records, 19 predictor features, and business problem formulation'
  },
  data: {
    url: '/assets/projects/salary-analysis-1.webp',
    thumbnailUrl: '/assets/projects/salary-analysis-1-thumb.webp',
    projectTitle: 'Global AI/ML Salary Analysis',
    projectSubtitle: 'Real Project: Global AI/ML Salary Analysis',
    badge: '02 · DATASET EXPLORATION & SCHEMA',
    title: 'Dataset Ingestion & Categorical Tiers',
    caption: 'Global AI/ML Salary: Exploring compensation records with salary_in_usd as target, inspecting distribution tiers, and preparing structured variables for modeling.',
    alt: 'Global AI and ML Salary Analysis dashboard overview showing compensation records and dataset schema exploration'
  },
  analysis: {
    url: '/assets/projects/telco-churn-2.webp',
    thumbnailUrl: '/assets/projects/telco-churn-2-thumb.webp',
    projectTitle: 'Telco Customer Churn',
    projectSubtitle: 'Real Project: Telco Customer Churn EDA',
    badge: '03 · SIGNAL ISOLATION & EDA',
    title: 'Exploratory Distribution & Relationship Analysis',
    caption: 'Telco Churn EDA: Isolating genuine customer churn signals across tenure segments and comparing monthly charges across cohort distributions.',
    alt: 'Telco Customer Churn EDA dashboard with churn distribution bar chart and bivariate feature selectors'
  },
  model: {
    url: '/assets/projects/voltsense-3.webp',
    thumbnailUrl: '/assets/projects/voltsense-3-thumb.webp',
    projectTitle: 'VoltSense AI',
    projectSubtitle: 'Real Project: VoltSense AI Model Lab',
    badge: '04 · MODEL BENCHMARK & EVALUATION',
    title: 'Algorithmic Evaluation & Metric Scoring',
    caption: 'VoltSense AI Model Lab: Comparing classification algorithms with Accuracy and F1-Score metrics to validate peak-hour classification.',
    alt: 'VoltSense AI Model Laboratory displaying Accuracy and F1-Score classification metrics and model evaluation table'
  },
  insight: {
    url: '/assets/projects/voltsense-2.webp',
    thumbnailUrl: '/assets/projects/voltsense-2-thumb.webp',
    projectTitle: 'VoltSense AI',
    projectSubtitle: 'Real Project: VoltSense AI Peak Analysis',
    badge: '05 · OPERATIONAL DECISION INSIGHT',
    title: '24-Hour Diurnal Peak Probability Analysis',
    caption: 'VoltSense AI: Translating model predictions into a 24-hour diurnal power consumption curve with peak probability windows.',
    alt: 'VoltSense AI 24-hour diurnal electric power curve displaying hourly consumption and peak-hour classification'
  }
};

export const DataJourneySection: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('question');
  const [journeyLightbox, setJourneyLightbox] = useState<LightboxImage | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const activeIndex = JOURNEY_STAGES.findIndex(s => s.id === activeStageId);
  const currentStage = JOURNEY_STAGES[activeIndex >= 0 ? activeIndex : 0];
  const activeEvidence = STAGE_EVIDENCE_MAP[currentStage.id] || STAGE_EVIDENCE_MAP.question;

  // Scroll observer: smooth progress tracking through the 5 stages as the visitor scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight * 0.55 && rect.bottom >= windowHeight * 0.25) {
        const totalHeight = rect.height - windowHeight * 0.3;
        const progress = Math.max(0, Math.min(1, (-rect.top + windowHeight * 0.3) / totalHeight));
        const stageIndex = Math.min(
          JOURNEY_STAGES.length - 1,
          Math.floor(progress * JOURNEY_STAGES.length)
        );
        if (JOURNEY_STAGES[stageIndex]) {
          setActiveStageId(JOURNEY_STAGES[stageIndex].id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative py-24 sm:py-32 border-t border-white/[0.06] bg-[#080a0e] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================== */}
        {/* SECTION INTRO                                            */}
        {/* ======================================================== */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-data text-[#38bdf8] uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
            <span>HOW I APPROACH A DATA PROBLEM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 mb-4 leading-tight">
            From a question to a useful answer.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Good data work starts with the right question. I work through the data step by step — from understanding the problem to testing a model and turning the result into something useful.
          </p>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP EXPERIENCE: Horizontal Journey & Real Evidence   */}
        {/* ======================================================== */}
        <div className="hidden lg:block">
          
          {/* Continuous Horizontal Path Connecting 5 Stages */}
          <div className="relative mb-12">
            
            {/* Background connecting track line */}
            <div className="absolute top-6 left-10 right-10 h-[2px] bg-white/[0.08] z-0" />
            
            {/* Active progress path line */}
            <div
              className="absolute top-6 left-10 h-[2px] bg-[#38bdf8] z-0 transition-all duration-300 ease-out"
              style={{
                width: `calc(${(activeIndex / (JOURNEY_STAGES.length - 1)) * 100}% * 0.90)`
              }}
            />

            {/* 5 Stage Nodes */}
            <div className="relative z-10 flex items-center justify-between">
              {JOURNEY_STAGES.map((stage, idx) => {
                const isActive = stage.id === activeStageId;
                const isPassed = idx <= activeIndex;
                const Icon = stage.icon;

                return (
                  <button
                    key={stage.id}
                    type="button"
                    id={`journey-node-${stage.id}`}
                    data-cursor="explore"
                    onClick={() => setActiveStageId(stage.id)}
                    className="group flex flex-col items-center cursor-pointer focus:outline-none"
                    aria-label={`Select ${stage.title} stage`}
                  >
                    {/* Node Shape */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 border ${
                        isActive
                          ? 'bg-[#121822] border-[#38bdf8] text-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.25)] scale-110'
                          : isPassed
                          ? 'bg-[#0e1219] border-[#38bdf8]/40 text-[#38bdf8]'
                          : 'bg-[#0e1219] border-white/[0.08] text-slate-400 group-hover:border-white/20 group-hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Stage Label & Number */}
                    <div className="mt-3 text-center">
                      <div className="text-[11px] font-mono-data text-slate-400">
                        {stage.number}
                      </div>
                      <div
                        className={`text-sm font-medium tracking-tight transition-colors ${
                          isActive ? 'text-slate-100 font-semibold' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      >
                        {stage.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Editorial Visual Storytelling Canvas */}
          <div className="rounded-3xl bg-[#0b0e14] border border-white/[0.08] p-8 lg:p-10 shadow-2xl relative overflow-hidden [perspective:1200px]">
            {/* Subtle background ambient hint */}
            <div className="absolute inset-0 data-grid-pattern opacity-15 pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#38bdf8]/[0.04] rounded-full blur-3xl pointer-events-none" />

            {/* Traveling signal pulse line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#38bdf8]/40 to-transparent animate-pulse pointer-events-none" />

            <div className="relative z-10 grid grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Stage Editorial Explanation */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentStage.id}
                  initial={{ opacity: 0, x: -16, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 16, filter: 'blur(4px)' }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="col-span-6 space-y-6"
                >
                  
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121822] border border-[#38bdf8]/30 text-xs font-mono-data text-[#38bdf8]">
                    <span>Stage {currentStage.number}</span>
                    <span>•</span>
                    <span>{currentStage.title}</span>
                  </div>

                  <h3 className="text-3xl font-bold text-slate-100 leading-tight">
                    "{currentStage.description}"
                  </h3>

                  {/* Example Inquiry Box */}
                  <div className="rounded-2xl bg-[#121822]/80 border border-white/[0.06] p-5">
                    <div className="text-xs font-mono-data uppercase text-slate-400 mb-2">
                      TYPICAL PROBLEM INQUIRY
                    </div>
                    <div className="text-slate-200 text-sm font-medium leading-relaxed italic">
                      "{currentStage.examplePrompt}"
                    </div>
                  </div>

                  {/* Core Takeaway / Philosophy */}
                  <div className="flex items-start space-x-3 pt-1 text-xs sm:text-sm text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-2 shrink-0" />
                    <span>{currentStage.takeaway}</span>
                  </div>

                  {/* Project Source Callout */}
                  <div className="pt-2 flex items-center space-x-2 text-xs font-mono-data text-slate-400">
                    <span className="text-[#38bdf8] font-bold">EVIDENCE:</span>
                    <span className="text-slate-300">{activeEvidence.projectSubtitle}</span>
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Right Column: Real Project Visual Screenshot Canvas */}
              <div className="col-span-6">
                <div
                  onClick={() => setJourneyLightbox(activeEvidence)}
                  className="group/journey relative w-full aspect-[16/10] rounded-2xl bg-[#080b10] border border-white/[0.08] hover:border-[#38bdf8]/40 overflow-hidden shadow-2xl cursor-pointer transition-all flex flex-col justify-between"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setJourneyLightbox(activeEvidence);
                    }
                  }}
                  aria-label={`Enlarge screenshot for ${currentStage.title}: ${activeEvidence.title}`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStage.id}
                      initial={{ opacity: 0, scale: 0.9, y: 16, rotateX: 8, rotateY: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 1.05, y: -16, rotateX: -8, rotateY: 4 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full h-full flex items-center justify-center bg-[#07090e]"
                    >
                      <OptimizedImage
                        src={activeEvidence.url}
                        thumbnailSrc={activeEvidence.thumbnailUrl}
                        alt={activeEvidence.alt}
                        aspectRatioClass="aspect-[16/10]"
                        className="w-full h-full object-contain object-top group-hover/journey:scale-[1.02] transition-transform duration-300"
                      >
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/journey:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1.5px] z-10">
                          <span className="px-3.5 py-1.5 rounded-xl bg-[#101622] text-[#38bdf8] border border-[#38bdf8]/40 text-xs font-mono-data font-semibold inline-flex items-center space-x-1.5 shadow-lg">
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>Click to Enlarge Screenshot</span>
                          </span>
                        </div>

                        {/* Stage Tag Badge */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0c1017]/90 border border-white/10 text-[10px] font-mono-data text-[#38bdf8] font-semibold z-10">
                          {activeEvidence.badge}
                        </div>
                      </OptimizedImage>
                    </motion.div>
                  </AnimatePresence>

                  {/* Caption Strip */}
                  <div className="p-3 bg-[#0c1016] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono-data text-slate-300">
                    <span className="truncate max-w-[85%]">{activeEvidence.caption}</span>
                    <span className="text-[#38bdf8] shrink-0 text-[10px]">VERIFIED</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Controls */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono-data text-slate-400">
              <div>
                <span>Phase {activeIndex + 1} of {JOURNEY_STAGES.length}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  disabled={activeIndex === 0}
                  onClick={() => setActiveStageId(JOURNEY_STAGES[activeIndex - 1].id)}
                  className={`px-3.5 py-1.5 rounded-lg border transition-colors flex items-center space-x-1.5 cursor-pointer ${
                    activeIndex === 0
                      ? 'border-white/[0.04] text-slate-600 cursor-not-allowed'
                      : 'border-white/[0.08] text-slate-300 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  disabled={activeIndex === JOURNEY_STAGES.length - 1}
                  onClick={() => setActiveStageId(JOURNEY_STAGES[activeIndex + 1].id)}
                  className={`px-4 py-1.5 rounded-lg border transition-colors flex items-center space-x-1.5 cursor-pointer ${
                    activeIndex === JOURNEY_STAGES.length - 1
                      ? 'border-white/[0.04] text-slate-600 cursor-not-allowed'
                      : 'bg-[#38bdf8]/10 border-[#38bdf8]/40 text-[#38bdf8] hover:bg-[#38bdf8]/20'
                  }`}
                >
                  <span>Next Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* ======================================================== */}
        {/* MOBILE & TABLET EXPERIENCE: Intentional Vertical Stack   */}
        {/* ======================================================== */}
        <div className="block lg:hidden">
          <div className="relative pl-6 sm:pl-8 border-l border-white/[0.1] space-y-12 sm:space-y-14">
            
            {JOURNEY_STAGES.map((stage) => {
              const Icon = stage.icon;
              const evidence = STAGE_EVIDENCE_MAP[stage.id] || STAGE_EVIDENCE_MAP.question;

              return (
                <div
                  key={stage.id}
                  id={`mobile-stage-${stage.id}`}
                  className="relative"
                >
                  {/* Timeline Node Point on Vertical Spine */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#080a0e] border border-[#38bdf8] flex items-center justify-center text-[#38bdf8]">
                    <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                  </div>

                  {/* Stage Card */}
                  <div className="rounded-2xl bg-[#0b0e14] border border-white/[0.08] p-5 sm:p-6 shadow-lg space-y-4">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                      <div className="flex items-center space-x-2.5">
                        <div className="p-1.5 rounded-lg bg-[#121822] text-[#38bdf8] border border-[#38bdf8]/20">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono-data text-[#38bdf8] uppercase">
                          Stage {stage.number}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-slate-100">
                        {stage.title}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-base font-medium text-slate-200">
                      "{stage.description}"
                    </p>

                    {/* Real Project Screenshot Frame */}
                    <div
                      onClick={() => setJourneyLightbox(evidence)}
                      className="group relative w-full aspect-[16/10] rounded-xl bg-[#07090e] border border-white/[0.08] overflow-hidden cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setJourneyLightbox(evidence);
                        }
                      }}
                      aria-label={`Enlarge screenshot: ${evidence.title}`}
                    >
                      <OptimizedImage
                        src={evidence.url}
                        thumbnailSrc={evidence.thumbnailUrl}
                        alt={evidence.alt}
                        aspectRatioClass="aspect-[16/10]"
                        className="w-full h-full object-contain object-top"
                      >
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0c1017]/90 border border-white/10 text-[9px] font-mono-data text-[#38bdf8] z-10">
                          {evidence.badge}
                        </div>
                        <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/70 text-[#38bdf8] border border-[#38bdf8]/30 z-10">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </OptimizedImage>
                    </div>

                    {/* Verified Caption */}
                    <p className="text-xs text-slate-300 leading-relaxed font-mono-data">
                      {evidence.caption}
                    </p>

                    {/* Example & Takeaway */}
                    <div className="space-y-2 text-xs font-mono-data text-slate-400 pt-2 border-t border-white/[0.06]">
                      <div className="p-2.5 rounded-lg bg-[#121822] border border-white/[0.04] text-slate-300 italic">
                        "{stage.examplePrompt}"
                      </div>
                      <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 pt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] shrink-0" />
                        <span>{stage.takeaway}</span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        </div>

      </div>

      {/* Lightbox for Data Journey Screenshots */}
      <ImageLightboxModal
        isOpen={!!journeyLightbox}
        image={journeyLightbox}
        onClose={() => setJourneyLightbox(null)}
      />
    </section>
  );
};
