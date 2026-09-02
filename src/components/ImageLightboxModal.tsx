import React, { useEffect, useCallback, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export interface LightboxImage {
  url: string;
  thumbnailUrl?: string;
  title: string;
  caption?: string;
  alt: string;
  projectTitle?: string;
  badge?: string;
}

interface ImageLightboxModalProps {
  isOpen: boolean;
  image: LightboxImage | null;
  allImages?: LightboxImage[];
  currentIndex?: number;
  onNavigate?: (index: number) => void;
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  image,
  allImages,
  currentIndex,
  onNavigate,
  onClose
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Reset image loaded state when image changes
  useEffect(() => {
    setImageLoaded(false);
  }, [image?.url]);

  const hasMultiple = allImages && allImages.length > 1 && typeof currentIndex === 'number';

  const handlePrev = useCallback(() => {
    if (!hasMultiple || !onNavigate || currentIndex === undefined) return;
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    onNavigate(prevIndex);
  }, [hasMultiple, onNavigate, currentIndex, allImages]);

  const handleNext = useCallback(() => {
    if (!hasMultiple || !onNavigate || currentIndex === undefined) return;
    const nextIndex = (currentIndex + 1) % allImages.length;
    onNavigate(nextIndex);
  }, [hasMultiple, onNavigate, currentIndex, allImages]);

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight, Tab Focus Trap
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Tab') {
        // Simple focus trap
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [onClose, handlePrev, handleNext]
  );

  // Background scroll locking and focus management
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      // Focus close button on open
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !image) return null;

  return (
    <AnimatePresence>
      <div
        ref={modalRef}
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-8"
        role="dialog"
        aria-modal="true"
        aria-label={image.title || 'Image Preview'}
        id="image-lightbox-dialog"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
          aria-hidden="true"
        />

        {/* Content Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-[#0b0e14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Lightbox Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/[0.08] bg-[#0d1219] shrink-0">
            <div className="flex items-center space-x-3 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] shrink-0" />
              <div className="truncate">
                <div className="flex items-center space-x-2">
                  {image.projectTitle && (
                    <span className="text-[11px] font-mono-data text-[#38bdf8] uppercase tracking-wider block truncate">
                      {image.projectTitle}
                    </span>
                  )}
                  {hasMultiple && (
                    <span className="text-[10px] font-mono-data text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      {currentIndex + 1} / {allImages.length}
                    </span>
                  )}
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-100 truncate">
                  {image.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              {/* Previous / Next buttons in header if multi-image */}
              {hasMultiple && (
                <div className="flex items-center space-x-1 mr-1">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.06] transition-colors cursor-pointer"
                    aria-label="Previous screenshot (Left Arrow)"
                    title="Previous screenshot (Left Arrow)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.06] transition-colors cursor-pointer"
                    aria-label="Next screenshot (Right Arrow)"
                    title="Next screenshot (Right Arrow)"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              <a
                href={image.url}
                target="_blank"
                rel="noreferrer"
                className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.06] transition-colors"
                title="Open image in new tab"
                aria-label="Open full original screenshot in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                id="lightbox-close-button"
                className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Close image preview (Escape)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Screenshot Display Frame */}
          <div className="relative flex-1 overflow-auto bg-[#07090d] flex items-center justify-center p-2 sm:p-4 min-h-[260px]">
            {/* Loading Skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#07090d] text-slate-400 space-y-2 z-0">
                <Loader2 className="w-6 h-6 animate-spin text-[#38bdf8]" />
                <span className="text-xs font-mono-data text-slate-400">Loading High-Resolution Screenshot...</span>
              </div>
            )}

            {/* Previous navigation arrow overlay */}
            {hasMultiple && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 hidden sm:flex min-w-[44px] min-h-[44px] items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 hover:border-[#38bdf8]/40 transition-all cursor-pointer backdrop-blur-sm"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Next navigation arrow overlay */}
            {hasMultiple && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 hidden sm:flex min-w-[44px] min-h-[44px] items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 hover:border-[#38bdf8]/40 transition-all cursor-pointer backdrop-blur-sm"
                aria-label="Next screenshot"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            <img
              key={image.url}
              src={image.url}
              alt={image.alt}
              decoding="async"
              loading="eager"
              onLoad={() => setImageLoaded(true)}
              className={`max-w-full max-h-[68vh] object-contain rounded-lg border border-white/[0.06] shadow-md select-none transition-opacity duration-300 z-10 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          {/* Caption & Metadata Footer */}
          {image.caption && (
            <div className="px-4 sm:px-6 py-3 border-t border-white/[0.08] bg-[#0d1219] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                {image.caption}
              </p>
              {image.badge && (
                <span className="self-start sm:self-auto text-[10px] font-mono-data px-2.5 py-1 rounded bg-[#16202e] text-[#38bdf8] border border-[#38bdf8]/30 shrink-0">
                  {image.badge}
                </span>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
