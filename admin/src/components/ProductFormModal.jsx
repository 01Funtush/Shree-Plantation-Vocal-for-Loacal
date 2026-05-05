import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

const categories = ["Wood Plant", "Ayurved Plant", "Food Plant", "Fruit Plant", "Flower Plant", "Homemade Product"];

const ProductFormModal = ({ product, onClose, onSave, onLogout }) => {
  const isEditing = !!product;
  const [loading, setLoading] = useState(false);
  const [fileFiles, setFileFiles] = useState(null);
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || categories[0],
    price: product?.price || '',
    discount: product?.discount || 0,
    isBestSeller: product?.isBestSeller || false,
    description: product?.description || '',
    rating: product?.rating || 5,
    images: product?.images?.join('\n') || ''
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('category', formData.category);
    payload.append('price', Number(formData.price));
    payload.append('discount', Number(formData.discount));
    payload.append('isBestSeller', formData.isBestSeller);
    payload.append('description', formData.description);
    payload.append('rating', Number(formData.rating));
    if (formData.images) payload.append('images', formData.images);
    
    if (fileFiles) {
      for (let i = 0; i < fileFiles.length; i++) {
        payload.append('imageFiles', fileFiles[i]);
      }
    }

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const url = `${baseUrl}/api/products${product ? `/${product._id}` : ''}`;
      const method = isEditing ? 'PUT' : 'POST';
      
      const token = localStorage.getItem('adminToken');
      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: payload
      });
      
      if (res.status === 401) {
        alert("Session expired. Please log in again.");
        if (typeof onLogout === 'function') onLogout();
        return;
      }

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      
      onSave();
    } catch (error) {
      console.error(error);
      alert("Error saving product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0B240B]/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] border border-[#1A3C1A]/20">
        <div className="px-8 py-6 border-b border-[#0B240B]/10 flex justify-between items-center bg-[#F8FAF8]">
          <h2 className="text-2xl font-bold text-[#0B240B]">
            {isEditing ? 'Refine Product' : 'Add New Treasure'}
          </h2>
          <button onClick={onClose} className="p-2 text-[#0B240B]/40 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-grow">
          <form id="productForm" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#0B240B] mb-2 uppercase tracking-wide">Product Name</label>
                <input 
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#1A3C1A] focus:border-transparent outline-none bg-slate-50/50 transition-all"
                  placeholder="e.g. Alphonso Mango"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0B240B] mb-2 uppercase tracking-wide">Category</label>
                <select 
                  name="category" value={formData.category} onChange={handleChange}
                  className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#1A3C1A] outline-none bg-white transition-all appearance-none cursor-pointer"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#0B240B] mb-2 uppercase tracking-wide">Base Price (₹)</label>
                <input 
                  type="number" step="0.01" name="price" required value={formData.price} onChange={handleChange}
                  className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#1A3C1A] outline-none bg-slate-50/50 transition-all font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0B240B] mb-2 uppercase tracking-wide text-[#E2725B]">Special Discount (%)</label>
                <input 
                  type="number" min="0" max="100" name="discount" required value={formData.discount} onChange={handleChange}
                  className="w-full px-5 py-3 rounded-2xl border-[#E2725B]/30 border focus:ring-2 focus:ring-[#E2725B] outline-none bg-[#E2725B]/5 transition-all font-mono font-bold text-[#E2725B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#0B240B] mb-2 uppercase tracking-wide">Quality Rating (1-5)</label>
                <input 
                  type="number" step="0.1" min="1" max="5" name="rating" required value={formData.rating} onChange={handleChange}
                  className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#1A3C1A] outline-none bg-slate-50/50 transition-all font-mono font-bold"
                />
              </div>
              <div className="flex items-center mt-8">
                <label className="flex items-center gap-4 cursor-pointer group w-full p-4 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl hover:bg-[#D4AF37]/10 transition-all">
                  <div className="relative">
                    <input 
                      type="checkbox" name="isBestSeller" checked={formData.isBestSeller} onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-12 h-6 rounded-full transition-colors ${formData.isBestSeller ? 'bg-[#D4AF37]' : 'bg-slate-300'}`}></div>
                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${formData.isBestSeller ? 'translate-x-6' : ''}`}></div>
                  </div>
                  <span className="text-sm font-bold text-[#0B240B] uppercase tracking-wide">Nature's Favorite Item</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
              <textarea 
                name="description" required rows="3" value={formData.description} onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Images (Local)</label>
                <input 
                  type="file" multiple accept="image/*"
                  onChange={(e) => setFileFiles(e.target.files)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
                <p className="text-xs text-slate-500 mt-2">Select files from your computer.</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Or Paste External Image URLs</label>
                <textarea 
                  name="images" rows="2" value={formData.images} onChange={handleChange}
                  placeholder="https://example.com/img1.jpg&#10;https://example.com/img2.jpg&#10;data:image/jpeg;base64,..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none text-sm"
                ></textarea>
                <p className="text-xs text-slate-500 mt-2">Put each link on a NEW LINE (Supports base64 data URIs).</p>
              </div>
            </div>
          </form>
        </div>
        
        <div className="px-8 py-6 border-t border-[#0B240B]/10 bg-[#F8FAF8] flex justify-end gap-4">
          <button type="button" onClick={onClose} className="px-8 py-3 rounded-2xl font-bold text-[#0B240B]/60 hover:bg-[#0B240B]/5 transition-all uppercase tracking-widest text-xs">
            Discard
          </button>
          <button type="submit" form="productForm" disabled={loading} className="px-8 py-3 rounded-2xl font-bold bg-[#1A3C1A] text-white flex items-center gap-3 hover:bg-[#0B240B] shadow-xl shadow-[#1A3C1A]/20 transition-all disabled:opacity-70 active:scale-95 uppercase tracking-widest text-xs">
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save className="w-5 h-5" />}
            <span>{isEditing ? 'Publish Updates' : 'Add to Collection'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
