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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-brand-light/20 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-brand-green" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.name}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
