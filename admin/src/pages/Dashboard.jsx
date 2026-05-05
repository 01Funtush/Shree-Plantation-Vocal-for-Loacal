import React, { useState, useEffect } from 'react';
import { Leaf, LogOut, Plus, Search } from 'lucide-react';
import ProductTable from '../components/ProductTable';
import ProductFormModal from '../components/ProductFormModal';
import SettingsModal from '../components/SettingsModal';
import InboxView from '../components/InboxView';
import LanguageSwitcher from '../components/LanguageSwitcher';


const Dashboard = ({ onLogout }) => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('inventory');

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const url = `${baseUrl}/api/products`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Server responded with status: ${res.status}`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const url = `${baseUrl}/api/products/${id}`;
      const token = localStorage.getItem('adminToken');
      const res = await fetch(url, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.status === 401) {
        alert("Session expired. Please log in again.");
        return onLogout();
      }
      if (!res.ok) throw new Error(`Failed to delete product: ${res.status}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const onSave = () => {
    setIsModalOpen(false);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-[#0B240B]/10 px-8 py-4 flex justify-between items-center z-10 sticky top-0 shadow-sm h-[90px]">
        <div className="flex items-center gap-4">
          <div className="h-16 w-auto">
            <img src="/logo.png" alt="Shree Plantation" className="h-full w-auto object-contain" />
          </div>
          <div className="h-10 w-[2px] bg-[#D4AF37]/30 hidden sm:block"></div>
          <div className="hidden sm:flex flex-col">
            <span className="font-extrabold text-lg text-[#1A3C1A] tracking-tighter leading-none">ADMIN PANEL</span>
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mt-1">Management Hub</span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <LanguageSwitcher />
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center space-x-2 text-[#0B240B] hover:text-white transition-all bg-[#1A3C1A]/5 hover:bg-[#1A3C1A] px-5 py-2.5 rounded-xl font-bold border border-[#1A3C1A]/10 text-sm"
          >
            <span>CMS Settings</span>
          </button>
          <button 
            onClick={onLogout}
            className="flex items-center space-x-2 text-red-600 hover:text-white transition-all bg-red-50 hover:bg-red-600 px-5 py-2.5 rounded-xl font-bold border border-red-100 text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Exit Hub</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
          <div className="flex items-center bg-[#1A3C1A]/5 p-1.5 rounded-2xl border border-[#1A3C1A]/10">
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`px-8 py-3 rounded-xl font-extrabold text-xs uppercase tracking-widest transition-all ${activeTab === 'inventory' ? 'bg-[#1A3C1A] text-white shadow-lg' : 'text-[#0B240B]/50 hover:text-[#0B240B]'}`}
            >
              Curation Space
            </button>
            <button 
              onClick={() => setActiveTab('inbox')}
              className={`px-8 py-3 rounded-xl font-extrabold text-xs uppercase tracking-widest transition-all ${activeTab === 'inbox' ? 'bg-[#1A3C1A] text-white shadow-lg' : 'text-[#0B240B]/50 hover:text-[#0B240B]'}`}
            >
              Audience Feed
            </button>
          </div>
          
          {activeTab === 'inventory' && (
          <button 
            onClick={handleAdd}
            className="flex items-center space-x-3 bg-[#1A3C1A] text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-[#1A3C1A]/20 hover:bg-[#0B240B] hover:-translate-y-1 transition-all active:scale-95 border-b-4 border-[#0B240B]/30"
          >
            <Plus className="w-5 h-5" />
            <span className="uppercase tracking-[0.1em] text-xs">Add New Treasure</span>
          </button>
          )}
        </div>

        {activeTab === 'inventory' ? (
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-[#0B240B]/10 overflow-hidden">
            {loading ? (
            <div className="flex justify-center items-center h-80">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#1A3C1A] border-b-4 border-transparent"></div>
            </div>
          ) : (
            <ProductTable 
              products={products} 
              onEdit={handleEdit} 
              onDelete={handleDelete}
            />
          )}
        </div>
        ) : (
          <InboxView />
        )}
      </main>

      {/* Modals */}
      {isModalOpen && (
        <ProductFormModal 
          product={editingProduct} 
          onClose={() => setIsModalOpen(false)} 
          onSave={onSave} 
          onLogout={onLogout}
        />
      )}
      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard;
