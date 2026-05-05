import React, { memo } from 'react';
import { Leaf, MapPin, Phone, Mail, User } from 'lucide-react';

const Footer = ({ content }) => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t-[8px] border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div>
            <div className="flex items-center mb-6">
              <img src="/logo.png" alt="Shree Plantation" className="h-20 w-auto brightness-0 invert opacity-90" />
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Delivering nature's finest plants and authentic homemade delicacies directly to your doorstep.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#products" className="hover:text-emerald-400 transition-colors">Shop Products</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-slate-300">
                <User className="w-5 h-5 text-emerald-500" />
                <span>{content?.ownerName || "Monu Manish"}</span>
              </li>
              <li className="flex items-start space-x-3 text-slate-300">
                <MapPin className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span>{content?.contactAddress || "Fulbari, Kishanganj"}</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-300">
                <Phone className="w-5 h-5 text-emerald-500" />
                <span>{content?.contactPhone || "8409966393/9635329770"}</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-300">
                <Mail className="w-5 h-5 text-emerald-500" />
                <span>{content?.contactEmail || "monumanish345@gmail.com"}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Shree Plantation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
