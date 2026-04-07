import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Truck, ShieldCheck, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { ReviewSection } from '../components/ReviewSection';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { products, farmers, loading } = useMarketplace();
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-brand-600">Loading product details...</div>
      </div>
    );
  }

  const product = products.find(p => p.id === id);
  const farmer = product ? farmers.find(f => f.id === product.farmerId) : null;

  if (!product || !farmer) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-medium text-earth-900 mb-4">Product not found</h2>
        <button onClick={() => navigate('/shop')} className="text-brand-600 hover:underline">
          Return to shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-earth-500 hover:text-earth-900 transition-colors mb-8 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Product Image */}
        <div className="aspect-square rounded-2xl overflow-hidden bg-earth-100">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <Link to={`/farmer/${farmer.id}`} className="text-sm font-medium text-brand-600 hover:underline mb-2">
            {farmer.farmName}
          </Link>
          <h1 className="text-3xl md:text-4xl font-semibold text-earth-900 mb-4">
            {product.name}
          </h1>
          <p className="text-2xl font-medium text-earth-900 mb-6">
            ${(product.price || 0).toFixed(2)} <span className="text-base font-normal text-earth-500">/ {product.unit}</span>
          </p>

          <p className="text-earth-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Add to Cart */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center border border-earth-300 rounded-md h-12">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 h-full text-earth-600 hover:bg-earth-100 rounded-l-md transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 h-full text-earth-600 hover:bg-earth-100 rounded-r-md transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button 
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 bg-brand-600 hover:bg-brand-500 text-white h-12 rounded-md font-medium transition-colors disabled:bg-earth-300 disabled:cursor-not-allowed"
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>

          {/* Details */}
          <div className="border-t border-earth-200 pt-8 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-earth-900 mb-3 uppercase tracking-wider">Production Details</h3>
              <ul className="space-y-2">
                {product.productionDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-earth-600 text-sm">
                    <Check className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-earth-200">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-earth-400 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-earth-900">Local Delivery</h4>
                  <p className="text-xs text-earth-500 mt-1">Delivered fresh across Tasmania</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-earth-400 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-earth-900">100% Traceable</h4>
                  <p className="text-xs text-earth-500 mt-1">Direct from {farmer.farmName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet the Farmer Section */}
      <div className="mt-24 pt-16 border-t border-earth-200">
        <div className="bg-earth-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-sm">
            <img src={farmer.image} alt={farmer.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-earth-900 mb-2">Grown by {farmer.name}</h2>
            <p className="text-brand-600 font-medium mb-4">{farmer.farmName} &bull; {farmer.location}</p>
            <p className="text-earth-600 mb-6 max-w-2xl">
              {farmer.shortStory}
            </p>
            <Link 
              to={`/farmer/${farmer.id}`}
              className="inline-flex items-center gap-2 text-brand-700 font-medium hover:text-brand-800 transition-colors"
            >
              Read full story <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewSection farmerId={farmer.id} />
    </div>
  );
}
