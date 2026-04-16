import React, { useState } from 'react';
import { Search, Leaf } from 'lucide-react';

const Navbar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(inputValue);
    // Smooth scroll to products area
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <Leaf className="h-8 w-8 text-brand-green" />
            <span className="font-bold text-xl text-brand-green tracking-wide">Shree Plantation</span>
          </div>

          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-md mx-8 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search for plants, pickles, etc..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-light bg-white/80"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <button type="submit" className="hidden">Search</button>
          </form>

          <div className="flex space-x-4">
            <a href="#about" className="text-gray-700 hover:text-brand-green transition-colors font-medium">About</a>
            <a href="#products" className="text-gray-700 hover:text-brand-green transition-colors font-medium">Shop</a>
            <a href="#contact" className="text-gray-700 hover:text-brand-green transition-colors font-medium">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
