import React, { memo } from 'react';

const Testimonials = ({ content }) => {
  const testimonials = content?.testimonials || [];

  if (testimonials.length === 0) return null;

  // Duplicate for seamless infinite scrolling
  const duplicatedData = [...testimonials, ...testimonials, ...testimonials]; // Tripled to ensure wide screens don't run out

  return (
    <section className="py-24 relative overflow-hidden bg-[#020617] perspective-[1500px]">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Nature</span> Enthusiasts
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Discover what our community is saying about our premium collection.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden flex pb-12 group">
        {/* Left/Right Fade Overlays */}
        <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-[#020617] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-[#020617] to-transparent z-20 pointer-events-none"></div>

        <div className="flex gap-6 animate-carousel group-hover:[animation-play-state:paused] w-fit">
          {duplicatedData.map((t, idx) => (
            <div 
              key={idx} 
              className="testimonial-card w-[350px] shrink-0 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative transition-all duration-500 hover:bg-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] group/card flex flex-col justify-between"
            >
              <div className="absolute top-6 right-6 opacity-10">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              </div>
              
              <div>
                <div className="flex items-center gap-1 mb-6 text-emerald-400">
                  {'★'.repeat(5)}
                </div>
                <p className="text-slate-300 text-base leading-relaxed mb-8 font-medium z-10 relative">
                  "{t.message}"
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-900 font-bold shadow-lg text-lg">
                  {t.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-wide">{t.name}</h4>
                  <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Verified Customer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes carousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-33.333333%)); }
        }
        .animate-carousel {
          animation: carousel 40s linear infinite;
        }
        .testimonial-card {
           transform: rotateX(15deg) rotateY(-10deg) translateZ(0);
           transform-style: preserve-3d;
        }
        .group\\/card:hover {
           transform: rotateX(0deg) rotateY(0deg) translateZ(20px) scale(1.05);
           z-index: 50;
        }
      `}} />
    </section>
  );
};

export default memo(Testimonials);
