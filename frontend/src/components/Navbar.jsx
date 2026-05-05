import React, { useState, useEffect, memo } from 'react';
import { Search, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';


const Navbar = ({ searchQuery, onSearch }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['about', 'products', 'contact'];
          const current = sections.find(section => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 100 && rect.bottom >= 100;
            }
            return false;
          });
          if (current) setActiveSection(current);
          else if (window.scrollY < 100) setActiveSection('home');
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const productSection = document.getElementById('products');
    if (productSection) productSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // w-full और left-0 से गैप खत्म हो जाएगा
    <nav className="fixed w-full z-[100] top-0 left-0 transition-all duration-500">
      <div className="w-full">
        {/* h-[90px] और rounded-none से कोनों का खालीपन खत्म */}
        <div className="bg-[#B2C2A2]/95 backdrop-blur-xl border-b-2 border-[#1A3C1A]/20 shadow-lg h-[100px] px-6 lg:px-12 flex justify-between items-center relative overflow-hidden">

          {/* Background Texture */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/recycled-paper.png")' }}></div>

          {/* 1. NEW LOGO - Integrated Image */}
          <div
            className="flex items-center cursor-pointer group relative z-10 py-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative h-[80px] lg:h-[90px] w-auto transition-transform duration-500 group-hover:scale-105">
              <img src="/logo.png" alt="Shree Plantation Logo" className="h-full w-auto object-contain drop-shadow-md" />
            </div>
          </div>

          {/* 2. SEARCH BAR - Dynamic Width & Clear Text */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xl mx-8 h-[45px] relative z-10">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search our collection..."
              className="w-full h-full pl-12 pr-10 rounded-full border-2 border-[#1A3C1A]/20 bg-white/90 focus:bg-white focus:border-[#D4AF37] focus:outline-none transition-all text-sm text-[#333333] font-bold placeholder-[#666666] shadow-inner"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1A3C1A] stroke-[2.5]" />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => onSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </form>

          {/* Language Switcher and NAV BUTTONS - 120x45 Solid Contrast */}
          <div className="hidden md:flex items-center space-x-3 z-10">
            <LanguageSwitcher />
            {[
              { id: 'about', label: 'About' },
              { id: 'products', label: 'Shop' },
              { id: 'contact', label: 'Contact' }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="w-[120px] h-[45px] flex items-center justify-center rounded-full text-[16px] font-bold tracking-wide transition-all duration-300 bg-[#1A3C1A] text-white hover:bg-[#D2691E] hover:scale-105 shadow-md active:scale-95"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-20 w-12 h-12 bg-[#1A3C1A] rounded-full flex items-center justify-center text-white"
          >
            <div className="space-y-1">
              <span className={`block w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div className={`md:hidden absolute w-full bg-white shadow-2xl transition-all duration-300 ${isMenuOpen ? 'top-[90px] opacity-100' : 'top-[-300px] opacity-0'}`}>
          <div className="p-6 space-y-4">
            <div className="flex justify-center mb-4">
              <LanguageSwitcher />
            </div>
            {['About', 'Shop', 'Contact'].map((label) => (
              <a key={label} href={`#${label.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}
                className="block w-full py-4 text-center text-xl font-bold text-[#1A3C1A] border-b border-gray-100">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);