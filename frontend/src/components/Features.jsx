import React from 'react';
import { Leaf, Heart, Sun, ShieldCheck } from 'lucide-react';

const Features = () => {
  const features = [
    {
      name: '100% Organic',
      description: 'Grown and prepared without harmful chemicals or pesticides.',
      icon: Leaf,
    },
    {
      name: 'Homemade Love',
      description: 'Our food products are crafted by hand using traditional recipes.',
      icon: Heart,
    },
    {
      name: 'Eco-Friendly',
      description: 'Sustainable packaging and farming practices to protect our planet.',
      icon: Sun,
    },
    {
      name: 'Quality Assured',
      description: 'Every plant and product undergoes strict quality checks before delivery.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-bg via-brand-cream to-white -z-20"></div>
      <div className="absolute top-0 left-0 w-full h-full leaf-pattern -z-10"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-forest/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-terracotta/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature) => (
            <div 
              key={feature.name} 
              className="glass-effect p-10 rounded-[2rem] hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 border border-white/50 group text-center relative overflow-hidden"
            >
              {/* Accent Glow */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-brand-terracotta/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-brand-terracotta/20 transition-colors"></div>
              
              <div className="w-20 h-20 bg-white shadow-inner rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <feature.icon className="h-10 w-10 text-brand-forest group-hover:text-brand-terracotta transition-colors" strokeWidth={2} />
              </div>
              
              <h3 className="text-2xl font-serif font-extrabold text-brand-forest-deep mb-4 tracking-tight leading-tight">
                {feature.name}
              </h3>
              
              <p className="text-gray-700 font-medium leading-relaxed text-sm">
                {feature.description}
              </p>
              
              {/* Subtle accent bar */}
              <div className="w-12 h-1 bg-brand-terracotta/30 mx-auto mt-6 rounded-full group-hover:w-20 group-hover:bg-brand-terracotta transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
