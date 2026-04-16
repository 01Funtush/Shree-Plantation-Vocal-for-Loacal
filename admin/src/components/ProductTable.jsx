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
          <tr className="bg-slate-50 text-slate-500 text-sm py-4 uppercase border-b border-slate-200">
            <th className="px-6 py-4 font-medium">Product Name</th>
            <th className="px-6 py-4 font-medium">Category</th>
            <th className="px-6 py-4 font-medium">Price</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
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
                    <p className="font-bold text-slate-800">{product.name}</p>
                    <p className="text-sm text-slate-500 truncate max-w-[200px]">{product.description}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                  {product.category}
                </span>
              </td>
              <td className="px-6 py-4 font-bold text-slate-700">
                ₹{product.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-right">
                <button 
                  onClick={() => onEdit(product)}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-2"
                  title="Edit"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onDelete(product._id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
