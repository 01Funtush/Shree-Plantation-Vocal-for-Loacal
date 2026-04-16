import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import ProductList from './components/ProductList';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [siteContent, setSiteContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const url = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/content` : 'http://localhost:5000/api/content';
        const res = await fetch(url);
        const data = await res.json();
        setSiteContent(data);
      } catch (err) {
        console.error('Failed to load site content', err);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={setSearchQuery} />
      <main className="flex-grow">
        <Hero content={siteContent} />
        <About content={siteContent} />
        <Features />
        <ProductList searchQuery={searchQuery} />
        <ContactForm />
      </main>
      <Footer content={siteContent} />
    </div>
  );
}

export default App;
