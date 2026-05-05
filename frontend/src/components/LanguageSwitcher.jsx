import React, { useState, useEffect, memo } from 'react';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const googtrans = getCookie('googtrans');
    if (googtrans) {
      const lang = googtrans.split('/').pop();
      if (['en', 'hi', 'bn'].includes(lang)) {
        setCurrentLang(lang);
      }
    } else {
      const saved = localStorage.getItem('googleLang');
      if (saved) setCurrentLang(saved);
    }
  }, []);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setCurrentLang(lang);
    localStorage.setItem('googleLang', lang);

    const cookieValue = lang === 'en' ? '' : `/en/${lang}`;
    
    // Set cookie for current domain and subdomains
    document.cookie = `googtrans=${cookieValue}; path=/`;
    
    // If we're on localhost, the above is enough. For production, we might need more specific domain settings.
    // window.location.reload() ensures Google Translate picks up the new cookie.
    window.location.reload();
  };

  return (
    <div className="relative flex items-center bg-white/90 rounded-full border-2 border-[#1A3C1A]/20 px-3 py-1.5 shadow-inner hover:bg-white transition-colors h-[45px]">
      <Globe className="w-5 h-5 text-[#1A3C1A] mr-2" />
      <select
        value={currentLang}
        onChange={handleLanguageChange}
        className="bg-transparent text-sm font-bold text-[#333333] outline-none cursor-pointer appearance-none pr-4"
        style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="bn">বাংলা</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#1A3C1A]">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  );
};

export default memo(LanguageSwitcher);
