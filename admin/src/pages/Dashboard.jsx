import React, { useState, useEffect } from 'react';
import { Leaf, LogOut, Plus, Search } from 'lucide-react';
import ProductTable from '../components/ProductTable';
import ProductFormModal from '../components/ProductFormModal';
import SettingsModal from '../components/SettingsModal';

const Dashboard = ({ onLogout }) => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/products` : 'http://localhost:5000/api/products';
      const res = await fetch(url);
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
      const url = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/products/${id}` : `http://localhost:5000/api/products/${id}`;
      const token = localStorage.getItem('adminToken');
      await fetch(url, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center z-10 sticky top-0 shadow-sm">
        <div className="flex items-center space-x-2 text-emerald-600">
          <Leaf className="w-8 h-8" />
          <span className="font-bold text-xl tracking-tight">Admin Center</span>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center space-x-2 text-slate-600 hover:text-emerald-700 transition-colors bg-slate-100 hover:bg-emerald-50 px-4 py-2 rounded-lg font-medium"
          >
            <span>Settings</span>
          </button>
          <button 
            onClick={onLogout}
            className="flex items-center space-x-2 text-slate-600 hover:text-red-600 transition-colors bg-slate-100 hover:bg-red-50 px-4 py-2 rounded-lg font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">Inventory Management</h1>
            <p className="text-slate-500 mt-1">Add, edit, or remove your plants and homemade products.</p>
          </div>
          <button 
            onClick={handleAdd}
            className="flex items-center space-x-2 bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
            <ProductTable 
              products={products} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          )}
        </div>
      </main>

      {/* Modals */}
      {isModalOpen && (
        <ProductFormModal 
          product={editingProduct} 
          onClose={() => setIsModalOpen(false)} 
          onSave={onSave} 
        />
      )}
      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard;
