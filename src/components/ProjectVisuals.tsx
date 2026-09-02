import React from 'react';
import { Maximize2, Layers } from 'lucide-react';
import { ProjectData } from '../types';
import { LightboxImage } from './ImageLightboxModal';
import { OptimizedImage } from './OptimizedImage';

interface ProjectVisualCardProps {
  onExpand?: (image: LightboxImage) => void;
  priority?: boolean;
}

// ============================================================================
// 01. SELECTED WORK PRIMARY CARD VISUALS (REAL OPTIMIZED WEBP SCREENSHOTS)
// ============================================================================

/**
 * 01 - VoltSense AI: Primary Visual
 * Real screenshot: Electricity Peak-Hour Classification Dashboard
 */
export const VoltSenseAIVisual: React.FC<ProjectVisualCardProps> = ({ onExpand, priority = false }) => {
  const image: LightboxImage = {
    url: '/assets/projects/voltsense-1.webp',
    thumbnailUrl: '/assets/projects/voltsense-1-thumb.webp',
    title: 'Electricity Peak-Hour Classification Dashboard',
    caption: 'VoltSense AI overview displaying peak-hour classification telemetry, MongoDB connection status, and consumption metrics.',
    alt: 'VoltSense AI peak-hour classification dashboard with MongoDB connection status and consumption metrics',
    projectTitle: 'VoltSense AI',
    badge: 'PEAK CLASSIFIER'
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0a0d13] border border-white/[0.08] group/img select-none">
      <OptimizedImage
        src={image.url}
        thumbnailSrc={image.thumbnailUrl}
        alt={image.alt}
        priority={priority}
        aspectRatioClass="aspect-auto h-full"
        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/img:scale-[1.02]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a0e]/90 via-transparent to-black/20 pointer-events-none" />

        {/* Top Telemetry Tag */}
        <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-[#0b0e14]/90 border border-white/10 text-[10px] font-mono-data text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
          <span>PEAK CLASSIFICATION</span>
        </div>

        {/* Expand Icon */}
        {onExpand && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExpand(image);
            }}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white border border-white/10 opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer z-10"
            title="Expand screenshot"
            aria-label="Expand VoltSense AI screenshot"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Bottom Caption Pill */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono-data text-slate-300">
          <span className="truncate">Peak-Hour Classification · MongoDB Connected</span>
          <span className="text-[#38bdf8] text-[9px] shrink-0 ml-1">SCREENSHOT</span>
        </div>
      </OptimizedImage>
    </div>
  );
};

/**
 * 02 - Telco Customer Churn: Primary Visual
 * Real screenshot: Telco Customer Churn Prediction Suite Overview
 */
export const TelcoChurnVisual: React.FC<ProjectVisualCardProps> = ({ onExpand, priority = false }) => {
  const image: LightboxImage = {
    url: '/assets/projects/telco-churn-1.webp',
    thumbnailUrl: '/assets/projects/telco-churn-1-thumb.webp',
    title: 'Telco Customer Churn Prediction Suite Overview',
    caption: 'Executive business context view showing 7,043 customer records, 19 predictor features, 26.58% churn rate, and 29.0 months median tenure.',
    alt: 'Telco Customer Churn Prediction Suite overview displaying 7043 customer records, 19 predictor features, and 26.58% churn rate',
    projectTitle: 'Telco Customer Churn',
    badge: 'SUITE OVERVIEW'
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0a0d13] border border-white/[0.08] group/img select-none">
      <OptimizedImage
        src={image.url}
        thumbnailSrc={image.thumbnailUrl}
        alt={image.alt}
        priority={priority}
        aspectRatioClass="aspect-auto h-full"
        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/img:scale-[1.02]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a0e]/90 via-transparent to-black/20 pointer-events-none" />

        {/* Top Telemetry Tag */}
        <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-[#0b0e14]/90 border border-white/10 text-[10px] font-mono-data text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
          <span>7,043 CUSTOMER COHORT</span>
        </div>

        {/* Expand Icon */}
        {onExpand && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExpand(image);
            }}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white border border-white/10 opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer z-10"
            title="Expand screenshot"
            aria-label="Expand Telco Churn screenshot"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Bottom Caption Pill */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono-data text-slate-300">
          <span className="truncate">19 Features · 26.58% Churn Rate</span>
          <span className="text-[#38bdf8] text-[9px] shrink-0 ml-1">SCREENSHOT</span>
        </div>
      </OptimizedImage>
    </div>
  );
};

/**
 * 03 - Global AI/ML Salary Analysis: Primary Visual
 * Real screenshot: Global AI & ML Salary Analysis Dashboard Overview
 */
export const SalaryAnalysisVisual: React.FC<ProjectVisualCardProps> = ({ onExpand, priority = false }) => {
  const image: LightboxImage = {
    url: '/assets/projects/salary-analysis-1.webp',
    thumbnailUrl: '/assets/projects/salary-analysis-1-thumb.webp',
    title: 'Global AI & ML Salary Analysis Dashboard Overview',
    caption: 'Dataset overview interface analyzing compensation records across job roles, experience levels, and salary_in_usd tiers.',
    alt: 'Global AI and ML Salary Analysis dashboard overview showing dataset schema and average salary telemetry',
    projectTitle: 'Global AI/ML Salary Analysis',
    badge: 'OVERVIEW DASHBOARD'
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0a0d13] border border-white/[0.08] group/img select-none">
      <OptimizedImage
        src={image.url}
        thumbnailSrc={image.thumbnailUrl}
        alt={image.alt}
        priority={priority}
        aspectRatioClass="aspect-auto h-full"
        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/img:scale-[1.02]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a0e]/90 via-transparent to-black/20 pointer-events-none" />

        {/* Top Telemetry Tag */}
        <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-[#0b0e14]/90 border border-white/10 text-[10px] font-mono-data text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
          <span>SALARY_IN_USD REGRESSION</span>
        </div>

        {/* Expand Icon */}
        {onExpand && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExpand(image);
            }}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white border border-white/10 opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer z-10"
            title="Expand screenshot"
            aria-label="Expand Salary Analysis screenshot"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Bottom Caption Pill */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono-data text-slate-300">
          <span className="truncate">salary_in_usd Modeling & Regression</span>
          <span className="text-[#38bdf8] text-[9px] shrink-0 ml-1">SCREENSHOT</span>
        </div>
      </OptimizedImage>
    </div>
  );
};

/**
 * 04 - FIFA 2026 Player Performance: Primary Visual
 * Real screenshot: FIFA 2026 AI Performance Dashboard Overview
 */
export const FIFAPerformanceVisual: React.FC<ProjectVisualCardProps> = ({ onExpand, priority = false }) => {
  const image: LightboxImage = {
    url: '/assets/projects/fifa-2026-1.webp',
    thumbnailUrl: '/assets/projects/fifa-2026-1-thumb.webp',
    title: 'FIFA 2026 AI Performance Dashboard Overview',
    caption: 'Tournament telemetry tracking 1,248 players across 48 nations with performance by nation rankings and squad position distributions.',
    alt: 'FIFA 2026 AI Performance Dashboard showing 1,248 players across 48 nations with performance by nation rankings',
    projectTitle: 'FIFA 2026 Player Performance',
    badge: 'TOURNAMENT OVERVIEW'
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0a0d13] border border-white/[0.08] group/img select-none">
      <OptimizedImage
        src={image.url}
        thumbnailSrc={image.thumbnailUrl}
        alt={image.alt}
        priority={priority}
        aspectRatioClass="aspect-auto h-full"
        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/img:scale-[1.02]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a0e]/90 via-transparent to-black/20 pointer-events-none" />

        {/* Top Telemetry Tag */}
        <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-[#0b0e14]/90 border border-white/10 text-[10px] font-mono-data text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
          <span>1,248 PLAYERS · 48 NATIONS</span>
        </div>

        {/* Expand Icon */}
        {onExpand && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExpand(image);
            }}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white border border-white/10 opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer z-10"
            title="Expand screenshot"
            aria-label="Expand FIFA 2026 screenshot"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Bottom Caption Pill */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono-data text-slate-300">
          <span className="truncate">Player Benchmarking & Attribute Scoring</span>
          <span className="text-[#38bdf8] text-[9px] shrink-0 ml-1">SCREENSHOT</span>
        </div>
      </OptimizedImage>
    </div>
  );
};

/**
 * 05 - 500 AI Companies Analysis: Primary Visual
 * Real screenshot: Enterprise AI Adoption Intelligence Grid
 */
export const AICompaniesVisual: React.FC<ProjectVisualCardProps> = ({ onExpand, priority = false }) => {
  const image: LightboxImage = {
    url: '/assets/projects/500-ai-companies-1.webp',
    thumbnailUrl: '/assets/projects/500-ai-companies-1-thumb.webp',
    title: 'Enterprise AI Adoption Intelligence Grid',
    caption: 'Executive diagnostic telemetry evaluating 6,000 corporate cohorts with mean ROI index (20.25%), organizational maturity, and sector filters.',
    alt: 'Enterprise AI Adoption Intelligence Grid showing corporate cohorts count of 6000, mean ROI index of 20.25%, and maturity scale',
    projectTitle: '500 AI Companies Analysis',
    badge: 'ENTERPRISE GRID'
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0a0d13] border border-white/[0.08] group/img select-none">
      <OptimizedImage
        src={image.url}
        thumbnailSrc={image.thumbnailUrl}
        alt={image.alt}
        priority={priority}
        aspectRatioClass="aspect-auto h-full"
        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/img:scale-[1.02]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a0e]/90 via-transparent to-black/20 pointer-events-none" />

        {/* Top Telemetry Tag */}
        <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-[#0b0e14]/90 border border-white/10 text-[10px] font-mono-data text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
          <span>6,000 CORPORATE COHORTS</span>
        </div>

        {/* Expand Icon */}
        {onExpand && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExpand(image);
            }}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white border border-white/10 opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer z-10"
            title="Expand screenshot"
            aria-label="Expand 500 AI Companies screenshot"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Bottom Caption Pill */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono-data text-slate-300">
          <span className="truncate">Adoption, ROI & Maturity Metrics</span>
          <span className="text-[#38bdf8] text-[9px] shrink-0 ml-1">SCREENSHOT</span>
        </div>
      </OptimizedImage>
    </div>
  );
};

// ============================================================================
// 02. CASE STUDY RESPONSIVE EVIDENCE GALLERIES (3 REAL OPTIMIZED SCREENSHOTS)
// Desktop: 1 strong primary image + 2 supporting images
// Mobile: Vertical stack
// Clickable to open in Lightbox with keyboard navigation & high-res view
// ============================================================================

interface ProjectEvidenceGalleryProps {
  project: ProjectData;
  onImageClick?: (image: LightboxImage, allImages?: LightboxImage[], index?: number) => void;
}

export const ProjectEvidenceGallery: React.FC<ProjectEvidenceGalleryProps> = ({
  project,
  onImageClick
}) => {
  const images = project.evidenceImages;
  if (!images || images.length === 0) return null;

  const allLightboxImages: LightboxImage[] = images.map((img, i) => ({
    ...img,
    projectTitle: project.title,
    badge: img.isPrimary
      ? 'PRIMARY DASHBOARD VIEW'
      : i === 1
      ? 'ANALYSIS VIEW'
      : 'MODEL / INFERENCE VIEW'
  }));

  const primaryImage = images[0];
  const supportingImages = images.slice(1);

  return (
    <div className="space-y-4 font-sans select-none">
      {/* Header bar */}
      <div className="flex items-center justify-between text-xs font-mono-data text-slate-400 pb-1">
        <div className="flex items-center space-x-2">
          <Layers className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span className="text-slate-200 font-semibold uppercase tracking-wider">
            PROJECT EVIDENCE ({images.length} VERIFIED SCREENSHOTS)
          </span>
        </div>
        <span className="text-[11px] text-slate-400">Click any image to enlarge</span>
      </div>

      {/* DESKTOP & TABLET LAYOUT */}
      <div className="hidden sm:block space-y-4">
        {/* Strong Primary Image - Loaded Eagerly / First */}
        {primaryImage && (
          <div
            onClick={() => onImageClick?.(allLightboxImages[0], allLightboxImages, 0)}
            className="group relative rounded-2xl bg-[#0b0e14] border border-white/[0.08] hover:border-[#38bdf8]/40 overflow-hidden shadow-xl transition-all cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onImageClick?.(allLightboxImages[0], allLightboxImages, 0);
              }
            }}
            aria-label={`Enlarge primary screenshot: ${primaryImage.title}`}
          >
            <OptimizedImage
              src={primaryImage.url}
              thumbnailSrc={primaryImage.thumbnailUrl}
              alt={primaryImage.alt}
              priority={true}
              aspectRatioClass="aspect-[16/9]"
              className="w-full h-full object-contain object-top group-hover:scale-[1.015] transition-transform duration-300"
            >
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1.5px] z-10">
                <span className="px-3.5 py-1.5 rounded-xl bg-[#101622] text-[#38bdf8] border border-[#38bdf8]/40 text-xs font-mono-data font-semibold inline-flex items-center space-x-1.5 shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to Enlarge (High Res)</span>
                </span>
              </div>
              {/* Primary badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0c1017]/90 border border-white/10 text-[10px] font-mono-data text-[#38bdf8] font-semibold z-10">
                PRIMARY DASHBOARD VIEW
              </div>
            </OptimizedImage>

            {/* Caption */}
            <div className="p-3.5 sm:p-4 bg-[#0d121a] border-t border-white/[0.06] flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-slate-200 font-mono-data">
                  {primaryImage.title}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {primaryImage.caption}
                </p>
              </div>
              <span className="text-[10px] font-mono-data text-slate-400 shrink-0 mt-0.5">
                01 of {images.length}
              </span>
            </div>
          </div>
        )}

        {/* Two Supporting Images Side-by-Side - Lazy Loaded */}
        <div className="grid grid-cols-2 gap-4">
          {supportingImages.map((img, idx) => (
            <div
              key={img.url}
              onClick={() => onImageClick?.(allLightboxImages[idx + 1], allLightboxImages, idx + 1)}
              className="group relative rounded-2xl bg-[#0b0e14] border border-white/[0.08] hover:border-[#38bdf8]/40 overflow-hidden shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onImageClick?.(allLightboxImages[idx + 1], allLightboxImages, idx + 1);
                }
              }}
              aria-label={`Enlarge supporting screenshot: ${img.title}`}
            >
              <OptimizedImage
                src={img.url}
                thumbnailSrc={img.thumbnailUrl}
                alt={img.alt}
                priority={false}
                aspectRatioClass="aspect-[16/10]"
                className="w-full h-full object-contain object-top group-hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1.5px] z-10">
                  <span className="px-3 py-1.5 rounded-lg bg-[#101622] text-[#38bdf8] border border-[#38bdf8]/40 text-[11px] font-mono-data font-semibold inline-flex items-center space-x-1 shadow-lg">
                    <Maximize2 className="w-3 h-3" />
                    <span>Enlarge</span>
                  </span>
                </div>
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#0c1017]/90 border border-white/10 text-[9px] font-mono-data text-slate-300 z-10">
                  {idx === 0 ? 'ANALYSIS VIEW' : 'MODEL / INFERENCE VIEW'}
                </div>
              </OptimizedImage>

              <div className="p-3 bg-[#0d121a] border-t border-white/[0.06] space-y-0.5">
                <div className="text-[11.5px] font-semibold text-slate-200 font-mono-data truncate">
                  {img.title}
                </div>
                <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE EXPERIENCE: Vertical Stack - Lazy Loaded */}
      <div className="block sm:hidden space-y-4">
        {images.map((img, idx) => (
          <div
            key={img.url}
            onClick={() => onImageClick?.(allLightboxImages[idx], allLightboxImages, idx)}
            className="group relative rounded-xl bg-[#0b0e14] border border-white/[0.08] hover:border-[#38bdf8]/40 overflow-hidden shadow-lg transition-all cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onImageClick?.(allLightboxImages[idx], allLightboxImages, idx);
              }
            }}
            aria-label={`Enlarge screenshot: ${img.title}`}
          >
            <OptimizedImage
              src={img.url}
              thumbnailSrc={img.thumbnailUrl}
              alt={img.alt}
              priority={idx === 0}
              aspectRatioClass="aspect-[16/10]"
              className="w-full h-full object-contain object-top"
            >
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0c1017]/90 border border-white/10 text-[9px] font-mono-data text-slate-300 z-10">
                SCREENSHOT 0{idx + 1}
              </div>
              <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/70 text-[#38bdf8] border border-[#38bdf8]/30 z-10">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </OptimizedImage>

            <div className="p-3 bg-[#0d121a] border-t border-white/[0.06] space-y-1">
              <div className="text-xs font-semibold text-slate-200 font-mono-data">
                {img.title}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {img.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export individual components for backward compatibility
export const VoltSenseEvidenceVisual: React.FC<{ onImageClick?: (img: LightboxImage) => void }> = () => (
  <div className="w-full" />
);

export const TelcoChurnEvidenceVisual: React.FC<{ onImageClick?: (img: LightboxImage) => void }> = () => (
  <div className="w-full" />
);

export const SalaryAnalysisEvidenceVisual: React.FC<{ onImageClick?: (img: LightboxImage) => void }> = () => (
  <div className="w-full" />
);

export const FIFAPerformanceEvidenceVisual: React.FC<{ onImageClick?: (img: LightboxImage) => void }> = () => (
  <div className="w-full" />
);

export const AICompaniesEvidenceVisual: React.FC<{ onImageClick?: (img: LightboxImage) => void }> = () => (
  <div className="w-full" />
);
