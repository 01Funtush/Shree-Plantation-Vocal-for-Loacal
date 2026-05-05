import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

const ProductDetailModal = ({ product, onClose, onOrderClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

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

  if (!product) return null;

  const nextImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 sm:p-8 pt-28"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row relative max-h-[85vh]">


        {/* Image Gallery Side */}
        <div className="w-full md:w-1/2 bg-slate-100 relative min-h-[300px] md:min-h-full">
          {product.images && product.images.length > 0 ? (
            <div className="w-full h-full relative group">
              <img 
                src={getImageUrl(product.images[currentImageIndex])} 
                alt={product.name} 
                className="w-full h-full object-cover absolute inset-0"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800"; }}
              />
              {product.images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/70 hover:bg-white rounded-full shadow-md text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/70 hover:bg-white rounded-full shadow-md text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {product.images.map((_, idx) => (
                      <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'} transition-all`}></div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-emerald-50 absolute inset-0">
              <span className="text-emerald-300">No Image Available</span>
            </div>
          )}
        </div>

        {/* Product Info Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white flex flex-col">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
                {product.category}
              </span>
              {product.isBestSeller && (
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                  BEST SELLER
                </span>
              )}
              {product.discount > 0 && (
                <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  -{product.discount}% OFF
                </span>
              )}
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight mb-2">
              {product.name}
            </h2>
            <div className="flex items-center gap-2 mb-6 text-yellow-500">
              {'★'.repeat(Math.round(product.rating || 5))}{'☆'.repeat(5 - Math.round(product.rating || 5))}
              <span className="text-slate-500 text-sm ml-2">({product.rating} / 5)</span>
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              {product.discount > 0 ? (
                <>
                  <p className="text-4xl font-extrabold text-brand-green">
                    ₹{(product.price - (product.price * product.discount / 100)).toFixed(2)}
                  </p>
                  <p className="text-xl font-bold text-slate-400 line-through mt-2">
                    ₹{product.price.toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-4xl font-extrabold text-brand-green">
                  ₹{product.price.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          <div className="prose prose-slate prose-emerald mb-10 flex-grow">
            <h4 className="text-lg font-bold text-slate-800 mb-2">Description</h4>
            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
              {product.description}
            </p>
          </div>

          <div className="mt-auto">
            <button 
              onClick={() => {
                if (onOrderClick) onOrderClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-4 px-8 bg-brand-green text-white font-bold rounded-2xl hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-[0.98] transition-all text-lg"
            >
              <ShoppingBag className="w-6 h-6" />
              Order Now
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">
              We process orders manually to guarantee quality.
            </p>
          </div>
        </div>
        {/* Improved Close Button - Positioned at the end to ensure it's on top */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 z-[60] p-3 bg-brand-forest text-white hover:bg-brand-forest-light rounded-full transition-all shadow-xl hover:scale-110 active:scale-95 group"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-brand-dark text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest font-bold">
            Close (Esc)
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetailModal;
