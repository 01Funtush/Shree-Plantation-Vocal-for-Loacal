import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy load components that are not immediately visible
const AboutFeatures = lazy(() => import('./components/AboutFeatures'));
const ProductList = lazy(() => import('./components/ProductList'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [siteContent, setSiteContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const url = `${baseUrl}/api/content`;
        const res = await fetch(url);
        const data = await res.json();
        setSiteContent(data);
      } catch (err) {
        console.error('Failed to load site content', err);
      }
    };
    fetchContent();
    const interval = setInterval(fetchContent, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar searchQuery={searchQuery} onSearch={setSearchQuery} />
      <main className="flex-grow">
        <Hero content={siteContent} />
        <Suspense fallback={<div className="h-20" />}>
          <ProductList content={siteContent} searchQuery={searchQuery} onCategorySelect={() => setSearchQuery('')} />
          <AboutFeatures content={siteContent} />
          <ContactForm />
          <Testimonials content={siteContent} />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-10" />}>
        <Footer content={siteContent} />
      </Suspense>
    </div>
  );
}

export default App;
