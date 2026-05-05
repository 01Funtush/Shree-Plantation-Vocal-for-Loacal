import React, { memo } from 'react';
import { Star } from 'lucide-react';

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.includes('drive.google.com/file/d/')) {
    const match = url.match(/\/d\/(.*?)\//);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }
  return url;
};

const ProductCard = memo(({ product, onClick, onOrderClick, className = "" }) => {

  return (
    <div className={`bg-white rounded-2xl overflow-hidden mindtree-shadow transition-all duration-300 border border-gray-100 group flex flex-col hover:-translate-y-2 hover:shadow-xl ${className}`}>
      <div className="relative h-64 overflow-hidden cursor-pointer shrink-0" onClick={onClick}>
        {product.images && product.images.length > 0 ? (
          <img 
            src={getImageUrl(product.images[0])}
            alt={product.name} 
            loading="lazy"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=400"; }}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-brand-bg flex items-center justify-center text-brand-muted">
            No Image
          </div>
        )}
        {/* Best Seller Badge */}
        {product.isBestSeller && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] px-3 py-1.5 rounded-xl text-[10px] font-extrabold text-[#1A3C1A] shadow-xl flex items-center gap-1 z-10 border border-[#D4AF37]/50 tracking-wider">
            NATURE'S FAVORITE
          </div>
        )}

        {/* Rating Pill on Top Right */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-medium text-brand-dark shadow-sm flex items-center gap-1 z-10 border border-white/50">
          <Star className="w-3.5 h-3.5 text-brand-earth fill-current" />
          {product.rating || "5.0"}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow bg-white">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-sans font-extrabold text-brand-dark truncate pr-2">{product.name}</h3>
          {product.discount > 0 && (
            <span className="shrink-0 bg-[#E2725B]/10 text-[#E2725B] text-[10px] font-extrabold px-2 py-1 rounded-lg border border-[#E2725B]/20 tracking-wide uppercase">
              {product.discount}% Savings
            </span>
          )}
        </div>
        
        <p className="text-gray-800 font-medium text-sm line-clamp-2 mb-6 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            {product.discount > 0 ? (
              <>
                <span className="font-extrabold text-xl text-brand-dark">
                  ₹{(product.price - (product.price * product.discount / 100)).toFixed(2)}
                </span>
                <span className="text-xs text-gray-400 line-through">₹{product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-extrabold text-xl text-brand-dark">₹{product.price.toFixed(2)}</span>
            )}
          </div>
          
          <button 
             onClick={(e) => {
               e.stopPropagation();
               if (onOrderClick) onOrderClick(product);
             }}
             className="px-6 py-3 bg-brand-forest text-white rounded-xl text-sm font-bold hover:bg-brand-forest-light transition-all duration-300 shadow-md hover:shadow-lg active:scale-95">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
