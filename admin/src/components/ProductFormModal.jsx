import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

const categories = ["Wood Plant", "Ayurved Plant", "Food Plant", "Fruit Plant", "Flower Plant", "Homemade Product"];

const ProductFormModal = ({ product, onClose, onSave }) => {
  const isEditing = !!product;
  const [loading, setLoading] = useState(false);
  const [fileFiles, setFileFiles] = useState(null);
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || categories[0],
    price: product?.price || '',
    description: product?.description || '',
    rating: product?.rating || 5,
    images: product?.images?.join(', ') || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('category', formData.category);
    payload.append('price', Number(formData.price));
    payload.append('description', formData.description);
    payload.append('rating', Number(formData.rating));
    if (formData.images) payload.append('images', formData.images);
    
    if (fileFiles) {
      for (let i = 0; i < fileFiles.length; i++) {
        payload.append('imageFiles', fileFiles[i]);
      }
    }

    try {
      const baseUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/products` : 'http://localhost:5000/api/products';
      const url = isEditing ? `${baseUrl}/${product._id}` : baseUrl;
      const method = isEditing ? 'PUT' : 'POST';
      
      const token = localStorage.getItem('adminToken');
      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: payload
      });
      
      if (res.ok) {
        onSave();
      } else {
        alert("Failed to save product");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-red-500 hover:bg-slate-200 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-grow">
          <form id="productForm" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
                <input 
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                <select 
                  name="category" value={formData.category} onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Price (₹)</label>
                <input 
                  type="number" step="0.01" name="price" required value={formData.price} onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Rating (1-5)</label>
                <input 
                  type="number" step="0.1" min="1" max="5" name="rating" required value={formData.rating} onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
              <textarea 
                name="description" required rows="3" value={formData.description} onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Images</label>
              <input 
                type="file" multiple accept="image/*"
                onChange={(e) => setFileFiles(e.target.files)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
              <p className="text-xs text-slate-500 mt-2">You can select multiple files at once. Drop them here! {formData.images ? 'Current remote images are bounded.' : ''}</p>
            </div>
          </form>
        </div>
        
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors">
            Cancel
          </button>
          <button type="submit" form="productForm" disabled={loading} className="px-5 py-2.5 rounded-xl font-bold bg-emerald-600 text-white flex items-center gap-2 hover:bg-emerald-700 shadow-md transition-colors disabled:opacity-70">
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save className="w-5 h-5" />}
            <span>Save Product</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
