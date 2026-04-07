import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { cn } from '../lib/utils';

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'meat', label: 'Pasture-Raised Meat' },
  { id: 'veg', label: 'Fresh Vegetables' },
  { id: 'dairy', label: 'Dairy' },
  { id: 'eggs', label: 'Eggs' },
  { id: 'more', label: 'More' },
];

export default function Shop() {
  const { addItem } = useCart();
  const { products, farmers, loading } = useMarketplace();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Update URL when category changes
  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory, products]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-brand-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-semibold text-earth-900 mb-4">Shop Local Produce</h1>
          <p className="text-earth-600 max-w-2xl">
            Browse our selection of fresh, seasonal produce sourced directly from Tasmanian farms.
          </p>
        </div>
        
        {/* Mobile Filter Toggle */}
        <button 
          className="md:hidden flex items-center gap-2 text-earth-700 font-medium border border-earth-300 rounded-md px-4 py-2"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className={cn(
          "md:w-64 flex-shrink-0",
          isFilterOpen ? "block" : "hidden md:block"
        )}>
          <div className="sticky top-28">
            <h3 className="text-lg font-medium text-earth-900 mb-4">Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.map(category => (
                <li key={category.id}>
                  <button
                    onClick={() => handleCategoryChange(category.id)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                      activeCategory === category.id 
                        ? "bg-brand-100 text-brand-900 font-medium" 
                        : "text-earth-600 hover:bg-earth-100 hover:text-earth-900"
                    )}
                  >
                    {category.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <h3 className="text-lg font-medium text-earth-900 mb-4">Farms</h3>
              <ul className="space-y-2">
                {farmers.map(farmer => (
                  <li key={farmer.id}>
                    <label className="flex items-center gap-3 text-sm text-earth-600 cursor-pointer">
                      <input type="checkbox" className="rounded border-earth-300 text-brand-600 focus:ring-brand-500" />
                      {farmer.farmName}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="mb-6 text-sm text-earth-500">
            Showing {filteredProducts.length} products
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-earth-50 rounded-lg border border-earth-200">
              <p className="text-earth-600">No products found in this category.</p>
              <button 
                onClick={() => handleCategoryChange('all')}
                className="mt-4 text-brand-600 font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => {
                const farmer = farmers.find(f => f.id === product.farmerId);
                return (
                  <div key={product.id} className="group flex flex-col">
                    <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden rounded-lg mb-4 bg-earth-100">
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {!product.inStock && (
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-medium text-earth-900 rounded">
                          Sold Out
                        </div>
                      )}
                    </Link>
                    <div className="flex-1 flex flex-col">
                      <Link to={`/farmer/${farmer?.id}`} className="text-xs font-medium text-brand-600 mb-1 hover:underline">
                        {farmer?.farmName}
                      </Link>
                      <Link to={`/product/${product.id}`} className="text-lg font-medium text-earth-900 mb-2 hover:text-brand-700 transition-colors">
                        {product.name}
                      </Link>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-earth-900 font-medium">${(product.price || 0).toFixed(2)} <span className="text-sm text-earth-500 font-normal">/ {product.unit}</span></span>
                        <button 
                          onClick={() => addItem(product)}
                          disabled={!product.inStock}
                          className="bg-earth-100 hover:bg-brand-100 text-brand-900 p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Add to cart"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
