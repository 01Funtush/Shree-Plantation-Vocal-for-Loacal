import React from 'react';
import { Star } from 'lucide-react';

const ProductCard = ({ product, onClick }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      <div className="relative h-64 overflow-hidden cursor-pointer" onClick={onClick}>
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0]} 
            alt={product.name} 
            onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=400"; }}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-brand-green shadow-sm">
          {product.category}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 truncate pr-2">{product.name}</h3>
          <span className="font-bold text-brand-green">₹{product.price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-700">{product.rating || 5.0}</span>
          </div>
          
          <a href={`#contact`} 
             onClick={() => {
               // A hacky way to prefill the contact form for simplicity
               window.sessionStorage.setItem('prefillProduct', product.name);
             }}
             className="px-4 py-2 bg-brand-light/20 text-brand-green rounded-lg text-sm font-semibold hover:bg-brand-green hover:text-white transition-colors">
            Order Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
