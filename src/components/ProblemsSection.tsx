import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  TrendingUp, 
  AlertTriangle, 
  GitCompare, 
  ArrowRight, 
  ArrowUpRight, 
  Layers, 
  CheckCircle2,
  FolderGit2
} from 'lucide-react';

interface RelevantProject {
  name: string;
  categoryTag: string;
  contextNote: string;
}

interface ProblemItemData {
  id: string;
  number: string;
  title: string;
  quote: string;
  description: string;
  flowSteps: string[];
  relevantProjects: RelevantProject[];
  icon: React.ComponentType<{ className?: string }>;
}

const PROBLEMS_DATA: ProblemItemData[] = [
  {
    id: 'understand',
    number: '01',
    title: 'Understand',
    quote: 'I have data, but I don\'t know what it\'s telling me.',
    description: 'Find patterns, relationships, distributions, and useful signals hidden inside a dataset.',
    flowSteps: ['Question', 'Data', 'Exploration', 'Pattern'],
    icon: Compass,
    relevantProjects: [
      {
        name: 'Global AI/ML Salary Analysis',
        categoryTag: 'EDA & Statistical Analysis',
        contextNote: 'Investigating compensation distributions, experience curves, and geographic factors.'
      },
      {
        name: '500 AI Companies Analysis',
        categoryTag: 'Industry Data Exploration',
        contextNote: 'Analyzing AI adoption patterns, maturity metrics, ROI trends, and multi-sector distributions.'
      }
    ]
  },
  {
    id: 'predict',
    number: '02',
    title: 'Predict',
    quote: 'I want to estimate what might happen.',
    description: 'Use historical data to estimate an outcome and evaluate how well a model performs.',
    flowSteps: ['Question', 'Data', 'Model', 'Prediction'],
    icon: TrendingUp,
    relevantProjects: [
      {
        name: 'Telco Customer Churn',
        categoryTag: 'Classification Pipeline',
        contextNote: 'Supervised classification to estimate churn probability based on customer tenure and usage patterns.'
      },
      {
        name: 'VoltSense AI',
        categoryTag: 'Applied Machine Learning',
        contextNote: 'Classifying electricity peak-hour periods and 24-hour peak probability from consumption logs.'
      },
      {
        name: 'FIFA 2026 Player Performance',
        categoryTag: 'Regression & Evaluation',
        contextNote: 'Estimating player rating trajectories and performance outcomes from multi-season metrics.'
      }
    ]
  },
  {
    id: 'detect-risk',
    number: '03',
    title: 'Detect Risk',
    quote: 'I want to identify patterns or customers that need attention.',
    description: 'Identify patterns or signals that can help highlight customers, situations, or outcomes that may need attention.',
    flowSteps: ['Question', 'Signals', 'Evaluation', 'Risk Flag'],
    icon: AlertTriangle,
    relevantProjects: [
      {
        name: 'Telco Customer Churn',
        categoryTag: 'Customer Retention Signal',
        contextNote: 'Highlighting accounts exhibiting high risk of cancellation before service termination.'
      },
      {
        name: 'VoltSense AI',
        categoryTag: 'Peak-Hour Classification',
        contextNote: 'Classifying and signaling high-load electricity consumption periods for balanced power management.'
      }
    ]
  },
  {
    id: 'compare-decide',
    number: '04',
    title: 'Compare & Decide',
    quote: 'I want to compare approaches and make a clearer decision.',
    description: 'Compare analytical or machine-learning approaches and use evaluation results to understand which approach is more suitable.',
    flowSteps: ['Question', 'Candidates', 'Benchmark', 'Decision'],
    icon: GitCompare,
    relevantProjects: [
      {
        name: 'FIFA 2026 Player Performance',
        categoryTag: 'Model Benchmarking',
        contextNote: 'Comparing baseline linear models against tree-based ensembles to determine prediction stability.'
      },
      {
        name: 'Global AI/ML Salary Analysis',
        categoryTag: 'Comparative Analytics',
        contextNote: 'Contrasting global vs. regional salary tiers across remote, hybrid, and on-site roles.'
      }
    ]
  }
];

// ----------------------------------------------------
// ABSTRACT VISUAL METAPHORS (NO FAKE CHARTS / NO FAKE METRICS)
// ----------------------------------------------------

const UnderstandVisualMetaphor: React.FC = () => (
  <svg
    className="w-full h-full max-w-[340px] max-h-[190px]"
    viewBox="0 0 320 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Scattered points becoming a visible pattern"
  >
    {/* Left: Scattered initial points */}
    <g opacity="0.6">
      <circle cx="35" cy="45" r="3" fill="#94a3b8" />
      <circle cx="65" cy="30" r="2.5" fill="#94a3b8" />
      <circle cx="48" cy="80" r="3" fill="#94a3b8" />
      <circle cx="28" cy="115" r="2.5" fill="#94a3b8" />
      <circle cx="72" cy="130" r="3" fill="#94a3b8" />
      <circle cx="40" cy="155" r="2" fill="#94a3b8" />
    </g>

    {/* Center transition vector */}
    <path
      d="M95 90 L135 90"
      stroke="rgba(56, 189, 248, 0.4)"
      strokeWidth="1.5"
      strokeDasharray="4 4"
    />

    {/* Right: Discovered organized pattern & smooth curve */}
    <g transform="translate(140, 10)">
      {/* Pattern curve */}
      <path
        d="M10 130 C45 120, 75 75, 110 65 C135 58, 155 35, 170 25"
        stroke="#38bdf8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Aligned points along discovered signal */}
      <circle cx="35" cy="122" r="3.5" fill="#38bdf8" />
      <circle cx="75" cy="82" r="4" fill="#38bdf8" />
      <circle cx="110" cy="65" r="4" fill="#38bdf8" />
      <circle cx="145" cy="42" r="4.5" fill="#38bdf8" />
      <circle cx="145" cy="42" r="10" stroke="#38bdf8" strokeWidth="1" opacity="0.4" className="animate-pulse" />
    </g>
  </svg>
);

const PredictVisualMetaphor: React.FC = () => (
  <svg
    className="w-full h-full max-w-[340px] max-h-[190px]"
    viewBox="0 0 320 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Historical points leading toward a predicted point"
  >
    {/* Baseline Coordinate Line */}
    <line x1="30" y1="145" x2="290" y2="145" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />

    {/* Historical Solid Trajectory */}
    <path
      d="M40 125 L90 110 L140 85 L190 70"
      stroke="#64748b"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="40" cy="125" r="4" fill="#94a3b8" />
    <circle cx="90" cy="110" r="4" fill="#94a3b8" />
    <circle cx="140" cy="85" r="4" fill="#94a3b8" />
    <circle cx="190" cy="70" r="4" fill="#94a3b8" />

    {/* Transition dashed boundary / Evaluation Horizon */}
    <line x1="205" y1="30" x2="205" y2="150" stroke="rgba(255, 255, 255, 0.12)" strokeDasharray="3 3" strokeWidth="1" />

    {/* Predicted Trajectory & Confidence Horizon */}
    <path
      d="M190 70 L260 40"
      stroke="#38bdf8"
      strokeWidth="2"
      strokeDasharray="4 4"
    />
    
    {/* Future Predicted Target Node */}
    <circle cx="260" cy="40" r="6" fill="#38bdf8" />
    <circle cx="260" cy="40" r="14" stroke="#38bdf8" strokeWidth="1.2" opacity="0.5" className="animate-ping origin-center" />
  </svg>
);

const DetectRiskVisualMetaphor: React.FC = () => (
  <svg
    className="w-full h-full max-w-[340px] max-h-[190px]"
    viewBox="0 0 320 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="One signal becoming highlighted among many"
  >
    {/* Grid of normal baseline signals */}
    <g opacity="0.4">
      {/* Row 1 */}
      <circle cx="60" cy="45" r="4" fill="#64748b" />
      <circle cx="110" cy="45" r="4" fill="#64748b" />
      <circle cx="160" cy="45" r="4" fill="#64748b" />
      <circle cx="210" cy="45" r="4" fill="#64748b" />
      <circle cx="260" cy="45" r="4" fill="#64748b" />

      {/* Row 2 */}
      <circle cx="60" cy="90" r="4" fill="#64748b" />
      <circle cx="110" cy="90" r="4" fill="#64748b" />
      <circle cx="210" cy="90" r="4" fill="#64748b" />
      <circle cx="260" cy="90" r="4" fill="#64748b" />

      {/* Row 3 */}
      <circle cx="60" cy="135" r="4" fill="#64748b" />
      <circle cx="110" cy="135" r="4" fill="#64748b" />
      <circle cx="160" cy="135" r="4" fill="#64748b" />
      <circle cx="210" cy="135" r="4" fill="#64748b" />
      <circle cx="260" cy="135" r="4" fill="#64748b" />
    </g>

    {/* The Highlighted Risk Signal at Center */}
    <g transform="translate(160, 90)">
      {/* Attention Ring */}
      <circle cx="0" cy="0" r="24" stroke="#38bdf8" strokeWidth="1" opacity="0.25" strokeDasharray="3 3" />
      <circle cx="0" cy="0" r="14" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" className="animate-pulse" />
      <circle cx="0" cy="0" r="6" fill="#38bdf8" />
      
      {/* Vector Flag */}
      <line x1="0" y1="-14" x2="0" y2="-28" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="0" cy="-28" r="2" fill="#38bdf8" />
    </g>
  </svg>
);

const CompareDecideVisualMetaphor: React.FC = () => (
  <svg
    className="w-full h-full max-w-[340px] max-h-[190px]"
    viewBox="0 0 320 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Two paths being evaluated side-by-side"
  >
    {/* Origin point */}
    <circle cx="45" cy="90" r="5" fill="#94a3b8" />
    <line x1="50" y1="90" x2="90" y2="90" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />

    {/* Path A (Baseline candidate) */}
    <path
      d="M90 90 C120 90, 140 50, 180 50 L250 50"
      stroke="rgba(148, 163, 184, 0.4)"
      strokeWidth="1.5"
      strokeDasharray="4 4"
    />
    <circle cx="180" cy="50" r="3.5" fill="#64748b" />
    <circle cx="250" cy="50" r="4" fill="#64748b" />

    {/* Path B (Selected / Suitable candidate) */}
    <path
      d="M90 90 C120 90, 140 130, 180 130 L250 130"
      stroke="#38bdf8"
      strokeWidth="2.5"
    />
    <circle cx="180" cy="130" r="4" fill="#38bdf8" />
    <circle cx="250" cy="130" r="6" fill="#38bdf8" />
    <circle cx="250" cy="130" r="12" stroke="#38bdf8" strokeWidth="1" opacity="0.4" className="animate-pulse" />

    {/* Decision marker */}
    <path
      d="M246 130 L249 133 L255 127"
      stroke="#080a0e"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ProblemsSection: React.FC = () => {
  const [activeProblemId, setActiveProblemId] = useState<string>('understand');

  const activeProblem = PROBLEMS_DATA.find((p) => p.id === activeProblemId) || PROBLEMS_DATA[0];

  const handleScrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const workElem = document.querySelector('#work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderVisualMetaphor = (id: string) => {
    switch (id) {
      case 'understand':
        return <UnderstandVisualMetaphor />;
      case 'predict':
        return <PredictVisualMetaphor />;
      case 'detect-risk':
        return <DetectRiskVisualMetaphor />;
      case 'compare-decide':
        return <CompareDecideVisualMetaphor />;
      default:
        return <UnderstandVisualMetaphor />;
    }
  };

  return (
    <section
      id="problems"
      className="relative py-24 sm:py-32 border-t border-white/[0.06] bg-[#080a0e] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================== */}
        {/* SECTION INTRO                                            */}
        {/* ======================================================== */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-data text-[#38bdf8] uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
            <span>PROBLEM FIRST</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 mb-4 leading-tight">
            Start with the problem, not the model.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Different questions need different approaches. I use data analysis and machine learning where they can turn a real question into a clearer answer.
          </p>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP INTERFACE: Selectable Items + Dynamic Canvas     */}
        {/* ======================================================== */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 4 Selectable Problem Categories (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {PROBLEMS_DATA.map((problem) => {
              const isActive = problem.id === activeProblemId;
              const Icon = problem.icon;

              return (
                <button
                  key={problem.id}
                  type="button"
                  id={`problem-select-${problem.id}`}
                  data-cursor="explore"
                  onClick={() => setActiveProblemId(problem.id)}
                  onMouseEnter={() => setActiveProblemId(problem.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                    isActive
                      ? 'bg-[#121822] border-[#38bdf8]/50 shadow-[0_4px_24px_rgba(56,189,248,0.12)]'
                      : 'bg-[#0b0e14]/80 border-white/[0.07] hover:bg-[#101520] hover:border-white/15'
                  }`}
                  aria-label={`Select problem category: ${problem.title}`}
                >
                  {/* Active Indicator Accent Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#38bdf8]" />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center space-x-3.5">
                      {/* Icon */}
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30'
                            : 'bg-[#141b24] text-slate-400 border border-white/[0.05] group-hover:text-slate-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Number & Title */}
                      <div>
                        <div className="text-[11px] font-mono-data text-slate-400">
                          {problem.number}
                        </div>
                        <div
                          className={`text-lg font-bold tracking-tight transition-colors ${
                            isActive ? 'text-slate-100' : 'text-slate-300 group-hover:text-slate-100'
                          }`}
                        >
                          {problem.title}
                        </div>
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 mt-2 transition-all ${
                        isActive
                          ? 'text-[#38bdf8] translate-x-1 opacity-100'
                          : 'text-slate-400 opacity-40 group-hover:opacity-80 group-hover:translate-x-0.5'
                      }`}
                    />
                  </div>

                  {/* One-Line Inquiry Quote */}
                  <p
                    className={`mt-3 text-xs font-medium leading-relaxed italic transition-colors ${
                      isActive ? 'text-slate-200' : 'text-slate-400'
                    }`}
                  >
                    "{problem.quote}"
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Problem Deep Dive Canvas (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#0b0e14] border border-white/[0.08] p-8 lg:p-9 shadow-2xl relative overflow-hidden">
              
              {/* Subtle background ambient glow & grid */}
              <div className="absolute inset-0 data-grid-pattern opacity-15 pointer-events-none" />
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#38bdf8]/[0.03] rounded-full blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProblem.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="relative z-10 space-y-7"
                >
                  {/* Active Header & Problem Quote */}
                  <div>
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121822] border border-[#38bdf8]/30 text-xs font-mono-data text-[#38bdf8] mb-3">
                      <span>Problem {activeProblem.number}</span>
                      <span>•</span>
                      <span>{activeProblem.title}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2 leading-snug">
                      "{activeProblem.quote}"
                    </h3>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                      {activeProblem.description}
                    </p>
                  </div>

                  {/* Visual Transformation Sequence: QUESTION → DATA → MODEL → PREDICTION */}
                  <div className="p-3.5 rounded-xl bg-[#101520] border border-white/[0.06]">
                    <div className="text-[10px] font-mono-data uppercase text-slate-400 mb-2">
                      ANALYTICAL TRANSFORMATION
                    </div>
                    <div className="flex items-center flex-wrap gap-2 text-xs font-mono-data text-slate-300">
                      {activeProblem.flowSteps.map((step, idx) => (
                        <React.Fragment key={idx}>
                          <span className="px-2.5 py-1 rounded-md bg-[#161e2b] border border-white/[0.06] text-slate-200 font-medium">
                            {step}
                          </span>
                          {idx < activeProblem.flowSteps.length - 1 && (
                            <span className="text-[#38bdf8] font-bold">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Abstract Visual Metaphor */}
                  <div className="w-full h-44 rounded-2xl bg-[#101520] border border-white/[0.06] flex items-center justify-center p-3 shadow-inner">
                    {renderVisualMetaphor(activeProblem.id)}
                  </div>

                  {/* Relevant Work */}
                  <div className="pt-2 border-t border-white/[0.06]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs font-mono-data uppercase tracking-wider text-slate-400">
                        RELEVANT WORK & CASE STUDIES
                      </div>
                      <a
                        href="#work"
                        onClick={handleScrollToWork}
                        className="text-xs font-mono-data text-[#38bdf8] hover:underline inline-flex items-center space-x-1"
                      >
                        <span>Explore work</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="space-y-2.5">
                      {activeProblem.relevantProjects.map((proj, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-3.5 rounded-xl bg-[#121822] border border-white/[0.05] flex items-start justify-between gap-3 group hover:border-[#38bdf8]/30 transition-colors"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold text-slate-100 group-hover:text-[#38bdf8] transition-colors">
                                {proj.name}
                              </span>
                              <span className="text-[10px] font-mono-data px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                                {proj.categoryTag}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {proj.contextNote}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* MOBILE EXPERIENCE: Clean Interactive Vertical List       */}
        {/* ======================================================== */}
        <div className="block lg:hidden space-y-4">
          {PROBLEMS_DATA.map((problem) => {
            const isSelected = problem.id === activeProblemId;
            const Icon = problem.icon;

            return (
              <div
                key={problem.id}
                id={`mobile-problem-item-${problem.id}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isSelected
                    ? 'bg-[#0b0e14] border-[#38bdf8]/50 shadow-lg'
                    : 'bg-[#0b0e14]/60 border-white/[0.08]'
                }`}
              >
                {/* Clickable Card Header / Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => setActiveProblemId(problem.id)}
                  className="w-full text-left p-5 flex items-start justify-between gap-3 cursor-pointer"
                  aria-expanded={isSelected}
                  aria-label={`Toggle ${problem.title}`}
                >
                  <div className="flex items-start space-x-3.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30'
                          : 'bg-[#141b24] text-slate-400 border border-white/[0.05]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div>
                      <div className="text-[11px] font-mono-data text-slate-400">
                        {problem.number}
                      </div>
                      <div className="text-base font-bold text-slate-100">
                        {problem.title}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 italic">
                        "{problem.quote}"
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-mono-data transition-transform duration-200 ${
                      isSelected ? 'text-[#38bdf8] rotate-90' : 'text-slate-400'
                    }`}
                  >
                    →
                  </span>
                </button>

                {/* Expanded Details when Selected */}
                {isSelected && (
                  <div className="px-5 pb-5 pt-1 space-y-5 border-t border-white/[0.06]">
                    
                    {/* Description */}
                    <p className="text-sm text-slate-300 leading-relaxed font-normal">
                      {problem.description}
                    </p>

                    {/* Workflow Path */}
                    <div className="p-3 rounded-xl bg-[#101520] border border-white/[0.05]">
                      <div className="text-[10px] font-mono-data uppercase text-slate-400 mb-1.5">
                        ANALYTICAL TRANSFORMATION
                      </div>
                      <div className="flex items-center flex-wrap gap-1.5 text-xs font-mono-data text-slate-300">
                        {problem.flowSteps.map((step, idx) => (
                          <React.Fragment key={idx}>
                            <span className="px-2 py-0.5 rounded bg-[#161e2b] text-slate-200 text-[11px]">
                              {step}
                            </span>
                            {idx < problem.flowSteps.length - 1 && (
                              <span className="text-[#38bdf8] text-xs">→</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Abstract Mini Graphic */}
                    <div className="w-full h-36 rounded-xl bg-[#101520] border border-white/[0.06] flex items-center justify-center p-2">
                      {renderVisualMetaphor(problem.id)}
                    </div>

                    {/* Relevant Work */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono-data text-slate-400 uppercase">
                        <span>RELEVANT WORK</span>
                        <a
                          href="#work"
                          onClick={handleScrollToWork}
                          className="text-[#38bdf8] lowercase hover:underline"
                        >
                          explore work →
                        </a>
                      </div>

                      {problem.relevantProjects.map((proj, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-3 rounded-xl bg-[#121822] border border-white/[0.04]"
                        >
                          <div className="text-xs font-semibold text-slate-200 mb-0.5">
                            {proj.name}
                          </div>
                          <div className="text-[11px] text-slate-400 leading-normal">
                            {proj.contextNote}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
