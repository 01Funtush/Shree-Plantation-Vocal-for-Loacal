import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, X, KeySquare, Globe, MessageSquarePlus, Trash2, Plus, ArrowUp, ArrowDown, ExternalLink } from 'lucide-react';

const SettingsModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('cms');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('adminToken');
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // CMS State
  const [siteContent, setSiteContent] = useState({
    heroHeadline: '',
    heroSubhead: '',
    aboutHeadline: '',
    aboutText1: '',
    aboutText2: '',
    productsHeadline: '',
    contactAddress: '',
    contactPhone: '',
    contactEmail: '',
    ownerName: '',
    heroImagesUrls: '',
    aboutImages1Urls: '',
    aboutImages2Urls: '',
    testimonials: []
  });

  const [files, setFiles] = useState({
    heroImagesFiles: null,
    aboutImages1Files: null,
    aboutImages2Files: null
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
        if(data) {
          setSiteContent({
            heroHeadline: data.heroHeadline || '',
            heroSubhead: data.heroSubhead || '',
            aboutHeadline: data.aboutHeadline || '',
            aboutText1: data.aboutText1 || '',
            aboutText2: data.aboutText2 || '',
            productsHeadline: data.productsHeadline || '',
            contactAddress: data.contactAddress || '',
            contactPhone: data.contactPhone || '',
            contactEmail: data.contactEmail || '',
            ownerName: data.ownerName || '',
            heroImagesUrls: (data.heroImages?.length ? data.heroImages : (data.heroImage ? [data.heroImage] : [])).join('\n'),
            aboutImages1Urls: (data.aboutImages1?.length ? data.aboutImages1 : (data.aboutImage1 ? [data.aboutImage1] : [])).join('\n'),
            aboutImages2Urls: (data.aboutImages2?.length ? data.aboutImages2 : (data.aboutImage2 ? [data.aboutImage2] : [])).join('\n'),
            testimonials: data.testimonials || []
          });
        }
      })
      .catch(console.error);
  }, []);

  const handleContentSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(siteContent).forEach(key => {
        if (key !== 'testimonials') {
          formData.append(key, siteContent[key]);
        }
      });
      formData.append('testimonials', JSON.stringify(siteContent.testimonials));
      
      if (files.heroImagesFiles) {
        for (let i = 0; i < files.heroImagesFiles.length; i++) formData.append('heroImagesFiles', files.heroImagesFiles[i]);
      }
      if (files.aboutImages1Files) {
        for (let i = 0; i < files.aboutImages1Files.length; i++) formData.append('aboutImages1Files', files.aboutImages1Files[i]);
      }
      if (files.aboutImages2Files) {
        for (let i = 0; i < files.aboutImages2Files.length; i++) formData.append('aboutImages2Files', files.aboutImages2Files[i]);
      }

      const res = await fetch(`${baseUrl}/api/content`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if(res.ok) {
        alert('Website content updated successfully! Live on site.');
        const updatedData = await res.json();
        setSiteContent(prev => ({
          ...prev, 
          heroImagesUrls: updatedData.heroImages?.join('\n') || prev.heroImagesUrls,
          aboutImages1Urls: updatedData.aboutImages1?.join('\n') || prev.aboutImages1Urls,
          aboutImages2Urls: updatedData.aboutImages2?.join('\n') || prev.aboutImages2Urls,
          testimonials: updatedData.testimonials || prev.testimonials
        }));
        setFiles({ heroImagesFiles: null, aboutImages1Files: null, aboutImages2Files: null });
      } else alert('Failed to update content.');
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
        <div className="px-6 py-4 border-b border-[#0B240B]/10 flex justify-between items-center bg-[#F8FAF8]">
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-[#1A3C1A]" />
            <h2 className="text-xl font-bold text-[#0B240B]">Store Management Control</h2>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.open('/', '_blank')}
              className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 rounded-xl font-bold hover:bg-[#D4AF37]/20 transition-all text-sm"
            >
              <ExternalLink className="w-4 h-4" /> Live Preview
            </button>
            <button onClick={onClose} className="p-2 text-slate-500 hover:text-red-500 hover:bg-slate-200 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row h-full overflow-hidden">
          {/* Tabs Sidebar */}
          <div className="w-full md:w-64 bg-[#F8FAF8] border-r border-[#0B240B]/10 p-4 shrink-0 flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('cms')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'cms' ? 'bg-[#1A3C1A] text-white shadow-lg shadow-[#1A3C1A]/20' : 'text-[#0B240B]/70 hover:bg-[#1A3C1A]/5'}`}
            >
              <Globe className="w-5 h-5" /> Website Content
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'security' ? 'bg-[#1A3C1A] text-white shadow-lg shadow-[#1A3C1A]/20' : 'text-[#0B240B]/70 hover:bg-[#1A3C1A]/5'}`}
            >
              <KeySquare className="w-5 h-5" /> Security
            </button>
            <button 
              onClick={() => setActiveTab('system')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'system' ? 'bg-[#1A3C1A] text-white shadow-lg shadow-[#1A3C1A]/20' : 'text-[#0B240B]/70 hover:bg-[#1A3C1A]/5'}`}
            >
              <SettingsIcon className="w-5 h-5" /> System & Language
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
                    <textarea rows="3" value={siteContent.heroSubhead} onChange={e => setSiteContent({...siteContent, heroSubhead: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1A3C1A] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#0B240B] mb-1">Best Sellers Section Title</label>
                    <input type="text" value={siteContent.productsHeadline} onChange={e => setSiteContent({...siteContent, productsHeadline: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1A3C1A] outline-none font-bold" placeholder="e.g. Nature's Favorites" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Hero Images (Local)</label>
                    <input type="file" multiple accept="image/*" onChange={e => setFiles({...files, heroImagesFiles: e.target.files})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
                    <p className="text-xs text-slate-500 mt-2">Select multiple files from your computer.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Or Paste External Image URLs</label>
                    <textarea rows="3" value={siteContent.heroImagesUrls} onChange={e => setSiteContent({...siteContent, heroImagesUrls: e.target.value})} placeholder="https://...&#10;https://..." className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none resize-none text-sm"></textarea>
                    <p className="text-xs text-slate-500 mt-2">Put each link on a NEW LINE.</p>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#0B240B] border-b border-[#0B240B]/10 pb-2 mt-8 mb-4">About Our Roots (Gallery Style)</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#0B240B] mb-1">Headline</label>
                      <input type="text" value={siteContent.aboutHeadline} onChange={e => setSiteContent({...siteContent, aboutHeadline: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1A3C1A] outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#0B240B] mb-1">Paragraph 1</label>
                      <textarea rows="4" value={siteContent.aboutText1} onChange={e => setSiteContent({...siteContent, aboutText1: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1A3C1A] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#0B240B] mb-1">Paragraph 2</label>
                      <textarea rows="4" value={siteContent.aboutText2} onChange={e => setSiteContent({...siteContent, aboutText2: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1A3C1A] outline-none" />
                    </div>
                  </div>
                  
                  <div className="bg-[#F8FAF8] p-6 rounded-2xl border border-[#1A3C1A]/10">
                    <h4 className="font-bold text-[#0B240B] mb-4 flex items-center gap-2">About Image Gallery (Multiple)</h4>
                    <div className="flex flex-wrap gap-4 mb-6">
                      {siteContent.aboutImages1Urls.split('\n').filter(u => u).map((url, idx, arr) => (
                        <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-[#1A3C1A]/20 group">
                          <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                            <button type="button" 
                              disabled={idx === 0}
                              onClick={() => {
                                const urls = [...arr];
                                [urls[idx-1], urls[idx]] = [urls[idx], urls[idx-1]];
                                setSiteContent({...siteContent, aboutImages1Urls: urls.join('\n')});
                              }}
                              className="p-1 bg-white/20 hover:bg-white/40 text-white rounded disabled:opacity-30"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button type="button" 
                              disabled={idx === arr.length - 1}
                              onClick={() => {
                                const urls = [...arr];
                                [urls[idx+1], urls[idx]] = [urls[idx], urls[idx+1]];
                                setSiteContent({...siteContent, aboutImages1Urls: urls.join('\n')});
                              }}
                              className="p-1 bg-white/20 hover:bg-white/40 text-white rounded disabled:opacity-30"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                            <button type="button" 
                              onClick={() => {
                                const urls = arr.filter((_, i) => i !== idx);
                                setSiteContent({...siteContent, aboutImages1Urls: urls.join('\n')});
                              }}
                              className="p-1 bg-red-500/80 hover:bg-red-500 text-white rounded"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="w-24 h-24 rounded-lg border-2 border-dashed border-[#1A3C1A]/20 flex items-center justify-center text-[#1A3C1A]/40">
                        <Globe className="w-6 h-6" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0B240B] mb-1">Add to Gallery (Paste URLs - One per line)</label>
                        <textarea rows="3" value={siteContent.aboutImages1Urls} onChange={e => setSiteContent({...siteContent, aboutImages1Urls: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1A3C1A] outline-none text-xs resize-none"></textarea>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0B240B] mb-1">Upload More (Local Files)</label>
                        <input type="file" multiple accept="image/*" onChange={e => setFiles({...files, aboutImages1Files: e.target.files})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1A3C1A] outline-none text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#1A3C1A]/10 file:text-[#1A3C1A] file:font-bold" />
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mt-8 mb-4 flex items-center gap-2"><MessageSquarePlus className="w-5 h-5 text-emerald-600"/> Testimonials</h3>
                <div className="space-y-4">
                  {siteContent.testimonials.map((t, idx) => (
                    <div key={t.id || idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 relative group">
                      <button type="button" onClick={() => setSiteContent({...siteContent, testimonials: siteContent.testimonials.filter((_, i) => i !== idx)})} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 hover:bg-red-100 rounded transition-colors">
                        <Trash2 className="w-4 h-4"/>
                      </button>
                      <div className="mb-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Name</label>
                        <input type="text" value={t.name} onChange={e => {
                          const newT = [...siteContent.testimonials];
                          newT[idx].name = e.target.value;
                          setSiteContent({...siteContent, testimonials: newT});
                        }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm bg-white" placeholder="e.g. John Doe" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Feedback Message</label>
                        <textarea rows="2" value={t.message} onChange={e => {
                          const newT = [...siteContent.testimonials];
                          newT[idx].message = e.target.value;
                          setSiteContent({...siteContent, testimonials: newT});
                        }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none resize-none text-sm bg-white" placeholder="Great service..." />
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => setSiteContent({...siteContent, testimonials: [...siteContent.testimonials, {name:'', message:'', id: Date.now().toString()}]})} className="flex items-center justify-center w-full py-3 border-2 border-dashed border-emerald-200 text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors">
                    <Plus className="w-5 h-5 mr-1"/> Add New Feedback
                  </button>
                </div>

                <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mt-8 mb-4">Footer & Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Owner Name</label>
                    <input type="text" value={siteContent.ownerName} onChange={e => setSiteContent({...siteContent, ownerName: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
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

                <button type="submit" disabled={loading} className="w-full py-4 mt-6 bg-[#1A3C1A] text-white rounded-2xl font-bold hover:bg-[#0B240B] shadow-xl shadow-[#1A3C1A]/20 flex justify-center items-center gap-2 transition-all active:scale-95">
                  <Save className="w-5 h-5" /> {loading ? 'Syncing Changes...' : 'Save & Publish to Website'}
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
            {activeTab === 'system' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-[#0B240B] border-b pb-2 mb-4">System Settings</h3>
                <div>
                  <label className="block text-sm font-bold text-[#0B240B] mb-2 uppercase tracking-wide">Global Site Language</label>
                  <div className="p-6 bg-[#F8FAF8] rounded-2xl border border-[#1A3C1A]/10">
                    <p className="text-xs text-[#0B240B]/60 mb-4">Select the primary language for the automated translation engine.</p>
                    <div className="grid grid-cols-3 gap-4">
                      {['en', 'hi', 'bn'].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            const cookieValue = lang === 'en' ? '' : `/en/${lang}`;
                            document.cookie = `googtrans=${cookieValue}; path=/`;
                            window.location.reload();
                          }}
                          className={`py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all border-2 ${
                            (document.cookie.includes(`/en/${lang}`) || (lang === 'en' && !document.cookie.includes('googtrans=')))
                            ? 'bg-[#1A3C1A] text-white border-[#1A3C1A]'
                            : 'bg-white text-[#1A3C1A] border-[#1A3C1A]/10 hover:bg-[#1A3C1A]/5'
                          }`}
                        >
                          {lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi' : 'Bengali'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-[#D4AF37]/5 border border-[#D4AF37]/20">
                  <h4 className="font-bold text-[#0B240B] mb-2">Remote Control Hub</h4>
                  <p className="text-sm text-[#0B240B]/70">Your changes are synchronized in real-time with the frontend every 5 seconds. Use the "Live Preview" button at the top to audit your store's appearance.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
