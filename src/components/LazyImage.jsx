import { useState } from 'react';

const LazyImage = ({ src, alt, className, containerClassName }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className={`relative overflow-hidden bg-neutral-800 ${!isLoaded ? 'animate-pulse' : ''} ${containerClassName || ''}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
        } ${className || ''}`}
      />
    </div>
  );
};

export default LazyImage;
