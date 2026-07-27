import { useState, useMemo } from 'react';

const LazyImage = ({ src, alt, className, containerClassName, objectFit = "object-cover", duration = "duration-1000", skeletonDuration = "duration-700" }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Automatically optimize Cloudinary URLs to serve compressed WebP/AVIF at max 800px width
  const optimizedSrc = useMemo(() => {
    if (typeof src === 'string' && src.includes('res.cloudinary.com')) {
      if (!src.includes('/upload/f_auto') && !src.includes('/upload/q_auto')) {
        return src.replace('/upload/', '/upload/f_auto,q_auto,w_800,c_limit/');
      }
    }
    return src;
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-neutral-900 ${containerClassName || ''}`}>
      {/* Skeleton Overlay - Fades out smoothly on load */}
      <div 
        className={`absolute inset-0 bg-neutral-800 z-10 transition-opacity ease-in-out ${skeletonDuration} ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100 animate-pulse'
        }`}
      />
      
      {/* Actual Image - Fades in smoothly. Uses async decoding to prevent main thread jank on scroll */}
      <img
        src={optimizedSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full transition-opacity ease-in-out ${objectFit} ${duration} ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className || ''}`}
      />
    </div>
  );
};

export default LazyImage;
