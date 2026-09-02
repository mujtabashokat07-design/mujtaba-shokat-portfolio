import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  thumbnailSrc?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatioClass?: string;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  children?: React.ReactNode;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  thumbnailSrc,
  alt,
  className = 'w-full h-full object-contain',
  containerClassName = '',
  aspectRatioClass = 'aspect-[16/10]',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px',
  onLoad,
  children
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // If thumbnailSrc is provided, use it for responsive card loading; otherwise src
  const initialSrc = thumbnailSrc || src;
  const srcSet = thumbnailSrc && thumbnailSrc !== src
    ? `${thumbnailSrc} 800w, ${src} 1280w`
    : undefined;

  return (
    <div className={`relative ${aspectRatioClass} w-full bg-[#080b11] overflow-hidden ${containerClassName}`}>
      {/* Dark Theme Shimmer Skeleton matching visual identity */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-[#0a0e16] flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-pulse" />
          <div className="w-8 h-8 rounded-full border border-white/5 border-t-[#38bdf8]/40 animate-spin opacity-40" />
        </div>
      )}

      {/* Optimized Image */}
      <img
        src={initialSrc}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Overlay child elements like telemetry badges, enlarge buttons, etc. */}
      {children}
    </div>
  );
};
