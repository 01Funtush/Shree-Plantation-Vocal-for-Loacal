import React, { useState, useEffect } from 'react';
import { Mail, ShoppingBag, Trash2, Clock } from 'lucide-react';

const InboxView = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = { 'Authorization': `Bearer ${token}` };
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const [contactRes, orderRes] = await Promise.all([
        fetch(`${baseUrl}/api/contact`, { headers }),
        fetch(`${baseUrl}/api/orders`, { headers })
      ]);
      
      const contacts = contactRes.ok ? await contactRes.json() : [];
      const orders = orderRes.ok ? await orderRes.json() : [];
      
      const combined = [
        ...contacts.map(c => ({ ...c, type: 'contact' })),
        ...orders.map(o => ({ ...o, type: 'order' }))
      ];
      
      // Sort chronologically (newest first)
      combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setMessages(combined);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const token = localStorage.getItem('adminToken');
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const endpoint = type === 'contact' ? `/api/contact/${id}` : `/api/orders/${id}`;
      
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        fetchMessages();
      } else {
        alert("Failed to delete message.");
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
        <Mail className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-700">Inbox is empty</h3>
        <p className="text-slate-500 mt-2">You don't have any new orders or contact requests yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="divide-y divide-slate-100">
        {messages.map((msg) => (
          <div key={msg._id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row gap-4 relative group">
            <div className="shrink-0 pt-1">
              {msg.type === 'order' ? (
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                <div>
                  <h4 className="text-lg font-bold text-slate-800">
                    {msg.type === 'order' ? 'New Order Request' : 'Contact Form Inquiry'}
                  </h4>
                  <div className="flex items-center gap-4 text-sm font-medium text-slate-600 mt-1">
                    <span>From: {msg.name || msg.userName}</span>
                    <span>Phone: {msg.phone || msg.phoneNumber}</span>
                  </div>
                </div>
                <div className="flex items-center text-xs text-slate-400 font-medium whitespace-nowrap">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </div>
              
              <div className="bg-slate-100 p-4 rounded-xl mt-3 text-sm text-slate-700">
                {msg.productName && (
                  <p className="mb-2"><strong>Product:</strong> {msg.productName}</p>
                )}
                <p><strong>Message:</strong> {msg.message || 'No message provided.'}</p>
              </div>
            </div>
            
            <button 
              onClick={() => handleDelete(msg._id, msg.type)}
              className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
              title="Delete Message"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxView;
