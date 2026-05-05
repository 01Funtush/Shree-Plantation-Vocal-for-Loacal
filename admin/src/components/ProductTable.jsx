import React from 'react';
import { Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

const ProductTable = ({ products, onEdit, onDelete }) => {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500">
        No products found. Add a new product to get started.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#F8FAF8] text-[#0B240B]/60 text-xs py-4 uppercase border-b border-[#0B240B]/10 tracking-widest">
            <th className="px-6 py-5 font-bold">Nature's Bounty</th>
            <th className="px-6 py-5 font-bold">Essence</th>
            <th className="px-6 py-5 font-bold">Value</th>
            <th className="px-6 py-5 font-bold text-right">Curation</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-[#1A3C1A]/5 transition-all group">
              <td className="px-6 py-5">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-white overflow-hidden flex-shrink-0 border-2 border-[#1A3C1A]/10 group-hover:border-[#D4AF37]/40 shadow-sm transition-all">
                    {product.images && product.images[0] ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=400"; }}
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <ImageIcon className="w-5 h-5 mx-auto mt-3.5 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-[#0B240B] text-lg">{product.name}</p>
                    <p className="text-xs text-[#0B240B]/50 truncate max-w-[200px] font-medium">{product.description}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <span className="inline-block px-3 py-1 bg-[#1A3C1A]/10 text-[#1A3C1A] rounded-lg text-[10px] font-extrabold uppercase tracking-wide border border-[#1A3C1A]/10">
                  {product.category}
                </span>
              </td>
              <td className="px-6 py-5 font-bold text-[#0B240B] font-mono">
                ₹{product.price.toFixed(2)}
              </td>
              <td className="px-6 py-5 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onEdit(product)}
                    className="p-2.5 text-[#1A3C1A] bg-[#1A3C1A]/5 hover:bg-[#1A3C1A] hover:text-white rounded-xl transition-all"
                    title="Edit Item"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onDelete(product._id)}
                    className="p-2.5 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                    title="Remove Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
