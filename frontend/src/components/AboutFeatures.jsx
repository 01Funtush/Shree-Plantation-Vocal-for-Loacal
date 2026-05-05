import React, { memo } from 'react';
import { Leaf, Utensils, Recycle, ShieldCheck } from 'lucide-react';
import ImageSlider from './ImageSlider';

const features = [
  {
    name: '100% Organic',
    description: 'Grown and prepared without harmful chemicals or pesticides.',
    icon: Leaf,
  },
  {
    name: 'Homemade Love',
    description: 'Our food products are crafted by hand using traditional recipes.',
    icon: Utensils,
  },
  {
    name: 'Eco-Friendly',
    description: 'Sustainable packaging and farming practices to protect our planet.',
    icon: Recycle,
  },
  {
    name: 'Quality Assured',
    description: 'Every plant and product undergoes strict quality checks before delivery.',
    icon: ShieldCheck,
  },
];

const AboutFeatures = ({ content }) => {
  const finalAboutImages = (content?.aboutImages1?.length > 0)
    ? content.aboutImages1
    : (content?.aboutImage1 ? [content.aboutImage1] : []);

  const cleanedImages = finalAboutImages
    .filter(img => typeof img === 'string' && img.trim() !== '')
    .filter((v, i, a) => a.indexOf(v) === i);

  return (
    <section id="about" className="relative overflow-hidden bg-brand-sage-bg min-h-screen flex items-center pt-24 pb-0">
      {/* Texture Overlays */}
      <div className="absolute inset-0 paper-texture opacity-50 pointer-events-none"></div>
      
      <div className="w-full px-4 sm:px-10 lg:px-[60px] relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-[60px]">
          
          {/* Left Side: About Our Roots Slider */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="relative h-full min-h-[500px] lg:min-h-[700px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/20 group">
              <ImageSlider 
                images={cleanedImages} 
                fallbackImage="/traditional_pickle_making.png" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              {/* Overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-forest-deep/80 via-transparent to-transparent pointer-events-none"></div>
              
              <div className="absolute bottom-0 left-0 p-12 w-full z-10">
                <h2 className="text-4xl sm:text-5xl font-serif font-extrabold text-white mb-6 leading-tight">
                  {content?.aboutHeadline || "About Our Roots"}
                </h2>
                <div className="w-24 h-1.5 bg-brand-terracotta mb-8 rounded-full shadow-lg"></div>
                <p className="text-xl text-white/95 font-medium leading-relaxed max-w-xl">
                  {content?.aboutText1 || "Shree Plantation began with a simple mission: to bring the purity of nature directly into people's homes."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Features Grid */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature) => (
                <div 
                  key={feature.name} 
                  className="bg-white p-8 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-brand-terracotta hover:-translate-y-3 transition-all duration-500 group relative overflow-hidden"
                >
                  {/* Halo Glow */}
                  <div className="absolute inset-0 halo-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  
                  <div className="w-20 h-20 bg-brand-sage-bg/10 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 border border-brand-sage-bg/20">
                    <feature.icon className="h-10 w-10 text-brand-terracotta" strokeWidth={2} />
                  </div>
                  
                  <h3 className="text-2xl font-serif font-bold text-[#1B301B] mb-4 text-center">
                    {feature.name}
                  </h3>
                  
                  <p className="text-[#1B301B]/80 font-medium leading-relaxed text-sm text-center font-sans">
                    {feature.description}
                  </p>
                  
                  {/* Terracotta Accent */}
                  <div className="w-12 h-1 bg-brand-terracotta/20 mx-auto mt-6 rounded-full group-hover:w-20 group-hover:bg-brand-terracotta transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default memo(AboutFeatures);
