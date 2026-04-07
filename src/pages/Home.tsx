import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Truck, ShieldCheck, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMarketplace } from '../context/MarketplaceContext';

export default function Home() {
  const { addItem } = useCart();
  const { products, farmers, loading } = useMarketplace();
  const featuredProducts = products.slice(0, 4);
  const featuredFarmers = farmers.slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-brand-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=2000" 
            alt="Tasmanian farmland" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-earth-950/40 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-earth-50/10 backdrop-blur-md border border-earth-50/20 text-earth-50 text-sm font-medium tracking-wide mb-6">
            Tasmania-Wide
          </span>
          <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tight mb-6 leading-tight">
            Farm-direct food from <br className="hidden md:block" />
            <span className="text-brand-200">Tasmanian producers</span>
          </h1>
          <p className="text-lg md:text-xl text-earth-100 mb-10 max-w-2xl mx-auto font-light">
            Know your farmer. Know your food. We connect you directly with the people growing the finest produce in Tasmania.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/shop" 
              className="bg-brand-500 hover:bg-brand-400 text-white px-8 py-4 rounded-md font-medium text-lg transition-colors flex items-center justify-center gap-2"
            >
              Shop Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/farmers" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-md font-medium text-lg transition-colors flex items-center justify-center"
            >
              Meet the Farmers
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-earth-900 mb-4">How it works</h2>
            <p className="text-earth-600 max-w-2xl mx-auto">A true marketplace connecting you directly with the source.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-earth-900 mb-3">1. Farmers List</h3>
              <p className="text-earth-600">Independent Tasmanian farmers set up their own shops, list their fresh produce, and set their own prices.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-earth-900 mb-3">2. You Shop</h3>
              <p className="text-earth-600">Browse offerings from multiple local farms and purchase directly through our secure platform.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-earth-900 mb-3">3. Farmers Deliver</h3>
              <p className="text-earth-600">The farmers themselves pack and fulfill your order, offering direct delivery or local farm-gate pickup.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-earth-900 mb-4">Fresh this week</h2>
              <p className="text-earth-600">Seasonal highlights from our producers.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-brand-700 font-medium hover:text-brand-800 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => {
              const farmer = farmers.find(f => f.id === product.farmerId);
              return (
                <div key={product.id} className="group flex flex-col">
                  <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden rounded-lg mb-4 bg-earth-100">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
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
                        className="bg-earth-100 hover:bg-brand-100 text-brand-900 p-2 rounded-full transition-colors"
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
          
          <div className="mt-10 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center gap-2 text-brand-700 font-medium hover:text-brand-800 transition-colors">
              View all products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Meet the Farmers */}
      <section className="py-24 bg-earth-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-earth-900 mb-4">Meet the Farmers</h2>
            <p className="text-earth-600 max-w-2xl mx-auto">The dedicated people behind your food.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredFarmers.map(farmer => (
              <Link key={farmer.id} to={`/farmer/${farmer.id}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={farmer.image} 
                    alt={farmer.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-950/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-semibold text-white mb-1">{farmer.farmName}</h3>
                    <p className="text-earth-200 text-sm">{farmer.location}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-earth-600 text-sm line-clamp-2 mb-4">{farmer.shortStory}</p>
                  <span className="text-brand-700 text-sm font-medium group-hover:underline flex items-center gap-1">
                    Read their story <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Need to import Plus icon at the top
