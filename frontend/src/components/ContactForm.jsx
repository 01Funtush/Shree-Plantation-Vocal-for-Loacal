import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    productName: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  useEffect(() => {
    // Check if there is a prefill item in session storage
    const prefill = window.sessionStorage.getItem('prefillProduct');
    if (prefill) {
      setFormData(prev => ({ ...prev, productName: prefill }));
      window.sessionStorage.removeItem('prefillProduct');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const url = `${baseUrl}/api/contact`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', productName: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-brand-sage-bg">
      {/* Texture Overlays - Seamless from AboutFeatures */}
      <div className="absolute inset-0 paper-texture opacity-50 pointer-events-none"></div>
      
      <div className="absolute top-20 right-0 w-64 h-64 bg-brand-forest-deep/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-brand-terracotta/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-extrabold text-white sm:text-6xl tracking-tight drop-shadow-sm">Get in Touch</h2>
          <div className="w-24 h-1.5 bg-brand-terracotta mx-auto mt-6 rounded-full shadow-lg"></div>
          <p className="mt-8 text-white/90 font-medium text-xl max-w-xl mx-auto">Interested in placing an order? Send us a message and we'll get back to you!</p>
        </div>

        <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-[3rem] p-10 md:p-16 border-8 border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-brand-dark mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-forest focus:border-brand-forest transition-all text-brand-dark font-medium placeholder-gray-400"
                  placeholder="Deepu Thakur"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-brand-dark mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-forest focus:border-brand-forest transition-all text-brand-dark font-medium placeholder-gray-400"
                  placeholder="+916201551640"
                />
              </div>
            </div>

            <div>
              <label htmlFor="productName" className="block text-sm font-bold text-brand-dark mb-2">Product Interested In (Optional)</label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-forest focus:border-brand-forest transition-all text-brand-dark font-medium placeholder-gray-400"
                placeholder="e.g., Organic Lemon Achar"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold text-brand-dark mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-forest focus:border-brand-forest transition-all resize-none text-brand-dark font-medium placeholder-gray-400"
                placeholder="How can we help you? Apko kya chahiye btaye?"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 bg-brand-forest text-white rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-[0_8px_20px_rgba(7,14,7,0.2)] hover:bg-brand-forest-light hover:shadow-xl transition-all duration-300 disabled:opacity-70 hover:-translate-y-1 mt-8"
            >
              {status === 'submitting' ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>

            {status === 'success' && (
              <div className="p-4 bg-green-100 text-green-700 rounded-xl text-center font-medium">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="p-4 bg-red-100 text-red-700 rounded-xl text-center font-medium">
                Oops! Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
