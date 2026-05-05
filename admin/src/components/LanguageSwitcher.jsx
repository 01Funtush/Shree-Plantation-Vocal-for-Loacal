import React, { useState, useEffect } from 'react';
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
      const saved = localStorage.getItem('googleLangAdmin');
      if (saved) setCurrentLang(saved);
    }
  }, []);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setCurrentLang(lang);
    localStorage.setItem('googleLangAdmin', lang);

    const cookieValue = lang === 'en' ? '' : `/en/${lang}`;
    
    document.cookie = `googtrans=${cookieValue}; path=/`;
    window.location.reload();
  };

  return (
    <div className="relative flex items-center bg-white rounded-lg border border-slate-200 px-3 py-1.5 shadow-sm">
      <Globe className="w-4 h-4 text-slate-500 mr-2" />
      <select
        value={currentLang}
        onChange={handleLanguageChange}
        className="bg-transparent text-sm font-semibold text-slate-700 outline-none cursor-pointer appearance-none pr-4"
        style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="bn">বাংলা</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-slate-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
