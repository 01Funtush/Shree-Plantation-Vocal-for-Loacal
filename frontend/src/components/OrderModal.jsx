import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Loader2 } from 'lucide-react';

const OrderModal = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    userName: '',
    phoneNumber: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const url = `${baseUrl}/api/orders`;
      const payload = {
        ...formData,
        productName: product.name,
        productId: product._id
      };
      
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => onClose(), 2000); // Close after 2 seconds
      } else {
        alert("Failed to submit order. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting order.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 pt-28">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Order Received!</h2>
          <p className="text-slate-500">We will contact you shortly to confirm your order of <strong>{product?.name}</strong>.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 pt-28">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[85vh]">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-brand-forest">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Order Now
          </h2>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          <div className="mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-sm text-emerald-800 font-medium">You are ordering:</p>
            <h3 className="text-lg font-extrabold text-emerald-950 mt-1">{product?.name}</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Your Name</label>
              <input 
                type="text" required name="userName" value={formData.userName} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-forest focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
              <input 
                type="tel" required name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-forest focus:outline-none"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Message (Optional)</label>
              <textarea 
                name="message" rows="3" value={formData.message} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-forest focus:outline-none resize-none"
                placeholder="Any specific requests?"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-brand-forest text-white rounded-xl font-bold hover:bg-brand-forest-light transition-all shadow-md mt-6 flex justify-center items-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Order Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
