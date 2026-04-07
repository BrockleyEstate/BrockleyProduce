import React, { useState } from 'react';
import { Package, DollarSign, ShoppingBag, Settings, Plus, LayoutDashboard } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { products, addProduct, loading: marketplaceLoading } = useMarketplace();
  const { user, profile, updateProfile, loading: authLoading } = useAuth();
  
  const myProducts = products.filter(p => p.farmerId === user?.uid);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', unit: '', category: 'veg', image: '',
    deliveryOptions: [] as string[],
    location: ''
  });

  const handleDeliveryOptionChange = (option: string) => {
    setFormData(prev => {
      const options = prev.deliveryOptions.includes(option)
        ? prev.deliveryOptions.filter(o => o !== option)
        : [...prev.deliveryOptions, option];
      return { ...prev, deliveryOptions: options };
    });
  };

  const calculateFee = (location: string) => {
    if (!location) return 0;
    const lowerLoc = location.toLowerCase();
    if (lowerLoc.includes('hobart')) return 15;
    if (lowerLoc.includes('launceston')) return 20;
    return 25; // Base fee for other locations
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fee = formData.deliveryOptions.includes('Brockley Produce Delivery') 
      ? calculateFee(formData.location) 
      : undefined;

    try {
      await addProduct({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        unit: formData.unit,
        category: formData.category as any,
        images: [formData.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800'],
        productionDetails: ['Locally Grown'],
        inStock: true,
        deliveryOptions: formData.deliveryOptions,
        brockleyDeliveryFee: fee
      });
      setIsAdding(false);
      setFormData({ name: '', description: '', price: '', unit: '', category: 'veg', image: '', deliveryOptions: [], location: '' });
    } catch (error) {
      console.error("Failed to add product", error);
      alert("Failed to add product. Please try again.");
    }
  };

  if (authLoading || marketplaceLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-brand-600">Loading dashboard...</div>
      </div>
    );
  }

  if (!user || profile?.role !== 'farmer') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-earth-900 mb-2">Access Denied</h2>
          <p className="text-earth-600">You must be signed in as a farmer to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earth-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-earth-200 p-4">
              <div className="mb-6 px-3">
                <h2 className="text-lg font-semibold text-earth-900">Farmer Portal</h2>
                <p className="text-sm text-earth-500">Manage your farm</p>
              </div>
              <nav className="space-y-1">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-brand-50 text-brand-700' : 'text-earth-600 hover:bg-earth-100 hover:text-earth-900'}`}
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </button>
                <button 
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'products' ? 'bg-brand-50 text-brand-700' : 'text-earth-600 hover:bg-earth-100 hover:text-earth-900'}`}
                >
                  <Package className="w-4 h-4" /> My Products
                </button>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-brand-50 text-brand-700' : 'text-earth-600 hover:bg-earth-100 hover:text-earth-900'}`}
                >
                  <ShoppingBag className="w-4 h-4" /> Orders
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-brand-50 text-brand-700' : 'text-earth-600 hover:bg-earth-100 hover:text-earth-900'}`}
                >
                  <Settings className="w-4 h-4" /> Farm Profile
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-semibold text-earth-900">Welcome back!</h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-earth-200">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="p-2 bg-brand-100 text-brand-700 rounded-lg">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-medium text-earth-600">Total Sales</h3>
                    </div>
                    <p className="text-2xl font-semibold text-earth-900">$0.00</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-earth-200">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="p-2 bg-brand-100 text-brand-700 rounded-lg">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-medium text-earth-600">Active Orders</h3>
                    </div>
                    <p className="text-2xl font-semibold text-earth-900">0</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-earth-200">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="p-2 bg-brand-100 text-brand-700 rounded-lg">
                        <Package className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-medium text-earth-600">Active Listings</h3>
                    </div>
                    <p className="text-2xl font-semibold text-earth-900">{myProducts.length}</p>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-earth-200 text-center">
                  <Package className="w-12 h-12 text-earth-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-earth-900 mb-2">Ready to start selling?</h3>
                  <p className="text-earth-600 mb-6">Create your first product listing to start receiving orders directly from consumers.</p>
                  <button 
                    onClick={() => {
                      setActiveTab('products');
                      setIsAdding(true);
                    }}
                    className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2.5 rounded-md font-medium transition-colors inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Product
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-semibold text-earth-900">My Products</h1>
                  {!isAdding && (
                    <button 
                      onClick={() => setIsAdding(true)}
                      className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center gap-2 text-sm"
                    >
                      <Plus className="w-4 h-4" /> New Listing
                    </button>
                  )}
                </div>
                
                {isAdding ? (
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-earth-200">
                    <h2 className="text-lg font-medium text-earth-900 mb-4">Create New Listing</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-earth-700 mb-1">Product Name</label>
                        <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="e.g. Organic Carrots" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-earth-700 mb-1">Price ($)</label>
                          <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="4.50" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-earth-700 mb-1">Unit</label>
                          <input required type="text" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="e.g. bunch, kg" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-earth-700 mb-1">Category</label>
                        <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border border-earth-300 rounded-md bg-white focus:ring-brand-500 focus:border-brand-500 outline-none">
                          <option value="veg">Vegetables</option>
                          <option value="meat">Meat</option>
                          <option value="dairy">Dairy</option>
                          <option value="eggs">Eggs</option>
                          <option value="pantry">Pantry</option>
                          <option value="more">More</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-earth-700 mb-1">Image URL (optional)</label>
                        <input type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="https://..." />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-earth-700 mb-1">Description</label>
                        <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border border-earth-300 rounded-md resize-none focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="Describe your product..."></textarea>
                      </div>
                      
                      <div className="pt-4 border-t border-earth-200">
                        <h3 className="text-sm font-medium text-earth-900 mb-3">Delivery & Fulfillment</h3>
                        
                        <div className="space-y-3">
                          <label className="flex items-start gap-3">
                            <input 
                              type="checkbox" 
                              className="mt-1 rounded border-earth-300 text-brand-600 focus:ring-brand-500"
                              checked={formData.deliveryOptions.includes('Brockley Produce Delivery')}
                              onChange={() => handleDeliveryOptionChange('Brockley Produce Delivery')}
                            />
                            <div>
                              <span className="block text-sm font-medium text-earth-900">Brockley Produce Delivery</span>
                              <span className="block text-sm text-earth-500">We collect and deliver for you.</span>
                            </div>
                          </label>
                          
                          {formData.deliveryOptions.includes('Brockley Produce Delivery') && (
                            <div className="ml-7 mb-3">
                              <label className="block text-sm font-medium text-earth-700 mb-1">Pickup Location (for fee calculation)</label>
                              <input 
                                required 
                                type="text" 
                                value={formData.location} 
                                onChange={e => setFormData({...formData, location: e.target.value})} 
                                className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none text-sm" 
                                placeholder="e.g. Full address or region" 
                              />
                              {formData.location && (
                                <p className="text-sm text-brand-600 mt-1">
                                  Estimated Brockley Delivery Fee: ${(calculateFee(formData.location) || 0).toFixed(2)}
                                </p>
                              )}
                            </div>
                          )}

                          <label className="flex items-start gap-3">
                            <input 
                              type="checkbox" 
                              className="mt-1 rounded border-earth-300 text-brand-600 focus:ring-brand-500"
                              checked={formData.deliveryOptions.includes('Local Delivery')}
                              onChange={() => handleDeliveryOptionChange('Local Delivery')}
                            />
                            <div>
                              <span className="block text-sm font-medium text-earth-900">Local Delivery</span>
                              <span className="block text-sm text-earth-500">You deliver directly to the customer.</span>
                            </div>
                          </label>

                          <label className="flex items-start gap-3">
                            <input 
                              type="checkbox" 
                              className="mt-1 rounded border-earth-300 text-brand-600 focus:ring-brand-500"
                              checked={formData.deliveryOptions.includes('Farm-Gate Pickup')}
                              onChange={() => handleDeliveryOptionChange('Farm-Gate Pickup')}
                            />
                            <div>
                              <span className="block text-sm font-medium text-earth-900">Farm-Gate Pickup</span>
                              <span className="block text-sm text-earth-500">Customers collect from your farm.</span>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button type="submit" className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2 rounded-md font-medium transition-colors">List Product</button>
                        <button type="button" onClick={() => setIsAdding(false)} className="bg-earth-100 hover:bg-earth-200 text-earth-700 px-6 py-2 rounded-md font-medium transition-colors">Cancel</button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-earth-200 overflow-hidden">
                    {myProducts.length === 0 ? (
                      <div className="p-12 text-center">
                        <p className="text-earth-500">You haven't listed any products yet.</p>
                      </div>
                    ) : (
                      <ul className="divide-y divide-earth-200">
                        {myProducts.map(p => (
                          <li key={p.id} className="p-4 flex items-center gap-4">
                            <img src={p.images[0]} alt={p.name} className="w-16 h-16 rounded-md object-cover bg-earth-100" />
                            <div className="flex-1">
                              <h3 className="font-medium text-earth-900">{p.name}</h3>
                              <p className="text-sm text-earth-500">${(p.price || 0).toFixed(2)} / {p.unit}</p>
                            </div>
                            <span className="px-3 py-1 bg-brand-100 text-brand-800 rounded-full text-xs font-medium">Active</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-semibold text-earth-900">Orders</h1>
                <div className="bg-white rounded-xl shadow-sm border border-earth-200 overflow-hidden">
                  <div className="p-12 text-center">
                    <p className="text-earth-500">No orders yet. They will appear here once customers start buying your produce.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-semibold text-earth-900">Farm Profile</h1>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-earth-200">
                  <form className="space-y-6" onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const farmName = (form.elements.namedItem('farmName') as HTMLInputElement).value;
                    const location = (form.elements.namedItem('location') as HTMLInputElement).value;
                    const fullStory = (form.elements.namedItem('fullStory') as HTMLTextAreaElement).value;
                    
                    try {
                      await updateProfile({ farmName, location, fullStory });
                      alert('Profile updated successfully!');
                    } catch (error) {
                      console.error("Failed to update profile", error);
                      alert('Failed to update profile.');
                    }
                  }}>
                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-1">Farm Name</label>
                      <input name="farmName" type="text" defaultValue={profile?.farmName} className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="e.g. Huon Valley Pastures" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-1">Location</label>
                      <input name="location" type="text" defaultValue={profile?.location} className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="e.g. Huon Valley, TAS" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-1">Our Story</label>
                      <textarea name="fullStory" rows={4} defaultValue={profile?.fullStory} className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none resize-none" placeholder="Tell customers about your farm and practices..."></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-1">Fulfillment Methods</label>
                      <div className="space-y-2 mt-2">
                        <label className="flex items-center gap-2 text-sm text-earth-700">
                          <input type="checkbox" defaultChecked className="rounded border-earth-300 text-brand-600 focus:ring-brand-500" />
                          Brockley Produce Delivery
                        </label>
                        <label className="flex items-center gap-2 text-sm text-earth-700">
                          <input type="checkbox" defaultChecked className="rounded border-earth-300 text-brand-600 focus:ring-brand-500" />
                          Local Delivery
                        </label>
                        <label className="flex items-center gap-2 text-sm text-earth-700">
                          <input type="checkbox" defaultChecked className="rounded border-earth-300 text-brand-600 focus:ring-brand-500" />
                          Farm-Gate Pickup
                        </label>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-earth-200">
                      <button type="submit" className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2 rounded-md font-medium transition-colors">
                        Save Profile
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

