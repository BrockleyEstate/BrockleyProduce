import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Check, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { ReviewSection } from '../components/ReviewSection';

export default function FarmerProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { products, farmers, loading } = useMarketplace();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-brand-600">Loading farmer profile...</div>
      </div>
    );
  }

  const farmer = farmers.find(f => f.id === id);
  const farmerProducts = products.filter(p => p.farmerId === id);


  if (!farmer) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-medium text-earth-900 mb-4">Farmer not found</h2>
        <button onClick={() => navigate('/farmers')} className="text-brand-600 hover:underline">
          View all farmers
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Cover Image */}
      <div className="relative h-[40vh] min-h-[300px] w-full">
        <img 
          src={farmer.coverImage} 
          alt={farmer.farmName} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-earth-950/30" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-8 left-4 sm:left-8 flex items-center gap-2 text-white hover:text-earth-200 transition-colors text-sm font-medium z-10 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-16">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden flex-shrink-0 border-4 border-white shadow-md -mt-16 md:-mt-24 bg-earth-100">
              <img src={farmer.image} alt={farmer.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-semibold text-earth-900 mb-2">{farmer.farmName}</h1>
                  <p className="text-lg text-earth-600 font-medium">{farmer.name}</p>
                </div>
                <div className="flex items-center gap-2 text-earth-500 bg-earth-50 px-4 py-2 rounded-full text-sm font-medium">
                  <MapPin className="w-4 h-4" />
                  {farmer.location}
                </div>
              </div>

              <div className="prose prose-earth max-w-none mb-8">
                <p className="text-earth-700 leading-relaxed text-lg">
                  {farmer.fullStory}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-earth-900 mb-4 uppercase tracking-wider">Farming Practices</h3>
                <div className="flex flex-wrap gap-3">
                  {farmer.practices.map((practice, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-800 px-3 py-1.5 rounded-full text-sm font-medium">
                      <Check className="w-3.5 h-3.5" />
                      {practice}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Farmer's Products */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-earth-900">Shop {farmer.farmName}</h2>
          </div>

          {farmerProducts.length === 0 ? (
            <p className="text-earth-500">No products currently available from this farm.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {farmerProducts.map(product => (
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
              ))}
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <ReviewSection farmerId={farmer.id} />
      </div>
    </div>
  );
}
