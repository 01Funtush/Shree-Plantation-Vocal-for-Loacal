import React from 'react';

const Hero = ({ content }) => {
  return (
    <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-light/20 to-transparent -z-10"></div>
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-light/30 blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-8 text-center lg:text-left z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            {content?.heroHeadline || "Nature's Touch at Your Doorstep"}
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
            Discover our wide range of Wood, Ayurved, Food, Fruit, and Flower plants, alongside our signature 
            homemade products like authentic Achar and Papad. Cultivated with love, delivered with care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="#products" className="px-8 py-3 rounded-full bg-brand-green text-white font-semibold shadow-lg hover:bg-brand-light hover:-translate-y-1 transition-all duration-300">
              Explore Products
            </a>
            <a href="#about" className="px-8 py-3 rounded-full bg-white text-brand-green font-semibold border-2 border-brand-green hover:bg-brand-green hover:text-white transition-all duration-300">
              Our Story
            </a>
          </div>
        </div>
        
        <div className="lg:w-1/2 mt-12 lg:mt-0 relative group">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
            <div className="absolute inset-0 bg-brand-green/20 mix-blend-overlay z-10 rounded-2xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800" 
              alt="Lush green plants" 
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
