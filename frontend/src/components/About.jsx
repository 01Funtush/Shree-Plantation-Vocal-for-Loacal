import { Leaf } from 'lucide-react';
import ImageSlider from './ImageSlider';

const About = ({ content }) => {
  const allAboutImages = [
    ...(content?.aboutImages1 || []),
    ...(content?.aboutImages2 || []),
    ...(content?.aboutImage1 ? [content.aboutImage1] : []),
    ...(content?.aboutImage2 ? [content.aboutImage2] : [])
  ].filter((v, i, a) => v && a.indexOf(v) === i); // Unique images

  // Fallbacks if no images
  const displayImages = allAboutImages.length > 0 ? allAboutImages : [
    "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full leaf-pattern -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/0 to-transparent -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-5/12 bg-white/60 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/80 shadow-xl relative overflow-hidden group">
            {/* Decorative Corner */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-brand-forest/5 rounded-br-[5rem] -ml-16 -mt-16 group-hover:bg-brand-forest/10 transition-all duration-700"></div>

            <h2 className="text-4xl font-serif font-extrabold text-brand-forest-deep sm:text-5xl mb-8 leading-tight tracking-tight">
              {content?.aboutHeadline || "About Our Roots"}
            </h2>
            <div className="w-24 h-1.5 bg-brand-terracotta mb-10 rounded-full shadow-sm"></div>
            
            <p className="text-lg text-gray-800 font-medium mb-8 leading-relaxed">
              {content?.aboutText1 || "Shree Plantation began with a simple mission: to bring the purity of nature directly into people's homes. We specialize in cultivating a diverse variety of plants—from towering wood plants to medicinal Ayurved herbs."}
            </p>
            <p className="text-lg text-gray-800 font-medium leading-relaxed mb-10">
              {content?.aboutText2 || "But our roots go deeper than just soil. We believe in preserving traditional culinary arts. Our homemade products, including hand-crafted Achar and naturally dried Papads, are made using generations-old recipes."}
            </p>
            
            <div className="p-6 bg-brand-forest text-white rounded-[2rem] shadow-xl transform group-hover:scale-105 transition-all duration-500 border border-brand-forest-light">
              <p className="font-serif font-bold text-xl leading-snug">
                "Empowering local farmers, using sustainable organic practices, and delivering unmatched quality."
              </p>
            </div>
          </div>
          
          <div className="lg:w-7/12 w-full grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              {displayImages.filter((_, i) => i % 2 === 0).map((img, idx) => (
                <div key={idx} className="relative group overflow-hidden rounded-[2rem] shadow-2xl border-4 border-white hover:border-brand-forest/20 transition-all duration-700">
                  <img 
                    src={img} 
                    alt="Our Roots" 
                    className="w-full object-cover group-hover:scale-110 transition-transform duration-700 h-auto min-h-[300px]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
            <div className="space-y-4 mt-12">
              {displayImages.filter((_, i) => i % 2 !== 0).map((img, idx) => (
                <div key={idx} className="relative group overflow-hidden rounded-[2rem] shadow-2xl border-4 border-white hover:border-brand-forest/20 transition-all duration-700">
                  <img 
                    src={img} 
                    alt="Our Roots" 
                    className="w-full object-cover group-hover:scale-110 transition-transform duration-700 h-auto min-h-[250px]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-terracotta rounded-full flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-all z-10">
                <Leaf className="text-white w-12 h-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
