import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, X, KeySquare, Globe } from 'lucide-react';

const SettingsModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('cms');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('adminToken');
  const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : 'http://localhost:5000';

  // CMS State
  const [siteContent, setSiteContent] = useState({
    heroHeadline: '',
    heroSubhead: '',
    aboutHeadline: '',
    aboutText1: '',
    aboutText2: '',
    contactAddress: '',
    contactPhone: '',
    contactEmail: ''
  });

  // Password State
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetch(`${baseUrl}/api/content`)
      .then(res => res.json())
      .then(data => {
        if(data) setSiteContent(data);
      })
      .catch(console.error);
  }, []);

  const handleContentSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(siteContent)
      });
      if(res.ok) alert('Website content updated successfully! Live on site.');
      else alert('Failed to update content.');
    } catch {
      alert('Error saving content.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if(passwords.newPassword !== passwords.confirmPassword){
      return alert("New passwords do not match!");
    }
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/auth/change-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ oldPassword: passwords.oldPassword, newPassword: passwords.newPassword })
      });
      if(res.ok) {
        alert('Password changed successfully!');
        setPasswords({oldPassword: '', newPassword: '', confirmPassword: ''});
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to change password.');
      }
    } catch {
      alert('Error changing password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-800">Admin Settings</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-red-500 hover:bg-slate-200 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row h-full overflow-hidden">
          {/* Tabs Sidebar */}
          <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4 shrink-0 flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('cms')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'cms' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-200'}`}
            >
              <Globe className="w-5 h-5" /> Website Content
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'security' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-200'}`}
            >
              <KeySquare className="w-5 h-5" /> Security
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'cms' && (
              <form onSubmit={handleContentSave} className="space-y-6">
                <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Hero Section Homepage</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Hero Headline</label>
                    <input type="text" value={siteContent.heroHeadline} onChange={e => setSiteContent({...siteContent, heroHeadline: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Hero Subtext</label>
                    <textarea rows="3" value={siteContent.heroSubhead} onChange={e => setSiteContent({...siteContent, heroSubhead: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mt-8 mb-4">About Us Section</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">About Headline</label>
                    <input type="text" value={siteContent.aboutHeadline} onChange={e => setSiteContent({...siteContent, aboutHeadline: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Paragraph 1</label>
                    <textarea rows="3" value={siteContent.aboutText1} onChange={e => setSiteContent({...siteContent, aboutText1: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Paragraph 2</label>
                    <textarea rows="3" value={siteContent.aboutText2} onChange={e => setSiteContent({...siteContent, aboutText2: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mt-8 mb-4">Footer & Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Address</label>
                    <input type="text" value={siteContent.contactAddress} onChange={e => setSiteContent({...siteContent, contactAddress: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Phone</label>
                    <input type="text" value={siteContent.contactPhone} onChange={e => setSiteContent({...siteContent, contactPhone: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                    <input type="email" value={siteContent.contactEmail} onChange={e => setSiteContent({...siteContent, contactEmail: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full py-3 mt-6 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 flex justify-center items-center gap-2">
                  <Save className="w-5 h-5" /> {loading ? 'Saving...' : 'Save Website Content'}
                </button>
              </form>
            )}

            {activeTab === 'security' && (
              <form onSubmit={handlePasswordSave} className="space-y-6 max-w-md">
                <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Change Admin Password</h3>
                <p className="text-sm text-slate-500 mb-6">Enter your old password to set a new secure password.</p>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Old Password</label>
                  <input required type="password" value={passwords.oldPassword} onChange={e => setPasswords({...passwords, oldPassword: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">New Password</label>
                  <input required type="password" value={passwords.newPassword} onChange={e => setPasswords({...passwords, newPassword: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Confirm New Password</label>
                  <input required type="password" value={passwords.confirmPassword} onChange={e => setPasswords({...passwords, confirmPassword: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>

                <button type="submit" disabled={loading} className="w-full py-3 mt-6 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 flex justify-center items-center gap-2">
                  <Save className="w-5 h-5" /> {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
