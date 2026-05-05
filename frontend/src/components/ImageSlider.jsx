import React, { useState, useEffect, memo } from 'react';

const ImageSlider = memo(({ images, fallbackImage, className = "", loading = "lazy" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback to empty array if undefined/null
  const finalImages = (Array.isArray(images) ? images : [])
    .filter(img => typeof img === 'string' && img.trim() !== '')
    .filter((v, i, a) => a.indexOf(v) === i); 
  
  const displayImages = finalImages.length > 0 ? finalImages : (fallbackImage ? [fallbackImage] : []);

  // Defensive index: Ensure we never render an out-of-bounds index even for one frame
  const safeIndex = currentIndex >= displayImages.length ? 0 : currentIndex;

  useEffect(() => {
    if (currentIndex >= displayImages.length) {
      setCurrentIndex(0);
    }
  }, [displayImages.length, currentIndex]);

  useEffect(() => {
    if (displayImages.length <= 1) return; 

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % displayImages.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, [displayImages.length]);

  if (displayImages.length === 0) {
    return (
      <div className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}>
        <span className="text-gray-400">No Image Available</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden group ${className}`}>
      {displayImages.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="Shree Plantation Roots"
          loading={loading}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === safeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}

      {/* Navigation Dots */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-md ${
                index === safeIndex 
                  ? 'bg-white w-6 opacity-100' 
                  : 'bg-white/50 hover:bg-white/80 opacity-70'
              }`}
              aria-label="Navigate to gallery image"
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default ImageSlider;
