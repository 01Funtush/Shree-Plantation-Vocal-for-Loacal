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
      const url = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/contact` : 'http://localhost:5000/api/contact';
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
    <section id="contact" className="py-16 bg-brand-green/5 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-brand-light/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Get in Touch</h2>
          <p className="mt-4 text-gray-600">Interested in placing an order or learning more? Send us a message!</p>
        </div>

        <div className="glass-effect rounded-3xl p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/50 bg-white/60"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/50 bg-white/60"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">Product Interested In (Optional)</label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/50 bg-white/60"
                placeholder="e.g., Organic Lemon Achar"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/50 bg-white/60 resize-none"
                placeholder="How can we help you?"
              />
            </div>
            
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 bg-brand-green text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg hover:bg-brand-light transition-colors disabled:opacity-70"
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
