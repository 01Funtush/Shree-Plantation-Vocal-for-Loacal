import React from 'react';

const About = ({ content }) => {
  return (
    <section id="about" className="py-20 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
              {content?.aboutHeadline || "About Our Roots"}
            </h2>
            <div className="w-20 h-1 bg-brand-green mb-8 rounded-full"></div>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {content?.aboutText1 || "Shree Plantation began with a simple mission: to bring the purity of nature directly into people's homes. We specialize in cultivating a diverse variety of plants—from towering wood plants to medicinal Ayurved herbs."}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {content?.aboutText2 || "But our roots go deeper than just soil. We believe in preserving traditional culinary arts. Our homemade products, including hand-crafted Achar and naturally dried Papads, are made using generations-old recipes, ensuring authentic taste and premium quality without artificial preservatives."}
            </p>
            <p className="font-semibold text-brand-green mt-6">
              Empowering local farmers, using sustainable organic practices, and delivering unmatched quality.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=400" alt="Planting" className="rounded-xl shadow-md" />
            <img src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80&w=400" alt="Homemade Achar" className="rounded-xl shadow-md mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
