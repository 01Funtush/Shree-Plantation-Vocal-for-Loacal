import React, { memo } from 'react';
import ImageSlider from './ImageSlider';

const Hero = ({ content }) => {
  const images = content?.heroImages?.length > 0 
    ? content.heroImages 
    : (content?.heroImage ? [content.heroImage] : []);

  return (
    <section className="relative pt-[100px] w-full">
      <div className="relative w-full h-[500px] sm:h-[700px] overflow-hidden shadow-sm group">
        
        {/* The Image Slider as Background */}
        <ImageSlider 
          images={images} 
          fallbackImage="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1600"
          className="absolute inset-0 w-full h-full -z-20 object-cover"
          loading="eager"
        />
        
        {/* NO OVERLAYS. Image is 100% visible and untouched. */}
        
        {/* Text Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 p-8 sm:p-12 lg:p-24 w-full lg:max-w-4xl flex flex-col justify-end h-full z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[5rem] font-sans font-extrabold text-white leading-[1.1] mb-6 drop-shadow-[0_4px_12px_rgba(7,14,7,0.8)] tracking-tight">
            {content?.heroHeadline || "Nature's Touch at Your Doorstep"}
          </h1>
          <p className="text-lg sm:text-xl text-gray-50 mb-10 drop-shadow-[0_4px_8px_rgba(7,14,7,0.9)] line-clamp-3 font-normal max-w-2xl leading-relaxed">
            {content?.heroSubhead || "Discover our wide range of Wood, Ayurved, Food, Fruit, and Flower plants, alongside our signature homemade products like authentic Achar and Papad. Cultivated with love, delivered with care."}
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <a href="#products" className="px-8 py-4 rounded-2xl bg-brand-forest text-white font-medium shadow-[0_8px_20px_rgba(7,14,7,0.2)] hover:bg-brand-forest-light hover:shadow-xl transition-all duration-300 text-center hover:-translate-y-1">
              Explore Best Sellers
            </a>
            <a href="#about" className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md text-white font-medium border border-white/30 hover:bg-white hover:text-brand-dark transition-all duration-300 text-center hover:-translate-y-1">
              Our Story
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default memo(Hero);
