import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, ShieldCheck, Truck, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMarketplace } from '../context/MarketplaceContext';

export default function Checkout() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();
  const { farmers, loading } = useMarketplace();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [deliverySelections, setDeliverySelections] = useState<Record<string, string>>({});

  // Initialize delivery selections
  useEffect(() => {
    const initialSelections: Record<string, string> = {};
    items.forEach(item => {
      if (!deliverySelections[item.product.id] && item.product.deliveryOptions && item.product.deliveryOptions.length > 0) {
        initialSelections[item.product.id] = item.product.deliveryOptions[0];
      }
    });
    if (Object.keys(initialSelections).length > 0) {
      setDeliverySelections(prev => ({ ...prev, ...initialSelections }));
    }
  }, [items]);

  const handleDeliveryChange = (productId: string, option: string) => {
    setDeliverySelections(prev => ({ ...prev, [productId]: option }));
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-brand-600">Loading checkout...</div>
      </div>
    );
  }

  // Group items by farmer to show fulfillment options per farm
  const itemsByFarmer = items.reduce((acc, item) => {
    if (!acc[item.product.farmerId]) {
      acc[item.product.farmerId] = [];
    }
    acc[item.product.farmerId].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  // Calculate delivery fees
  const deliveryFeesByFarmer: Record<string, number> = {};
  let totalDeliveryFee = 0;

  Object.entries(itemsByFarmer).forEach(([farmerId, farmerItems]: [string, any[]]) => {
    // If any item from this farmer has Brockley Produce Delivery selected, apply the fee once for this farmer
    const hasBrockleyDelivery = farmerItems.some(item => 
      deliverySelections[item.product.id] === 'Brockley Produce Delivery'
    );
    
    if (hasBrockleyDelivery) {
      // Find the fee (assuming all products from the same farmer have the same fee, or just take the max)
      const fee = Math.max(...farmerItems.map(item => item.product.brockleyDeliveryFee || 0));
      if (fee > 0) {
        deliveryFeesByFarmer[farmerId] = fee;
        totalDeliveryFee += fee;
      }
    }
  });

  const orderTotal = total + totalDeliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-6">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-semibold text-earth-900 mb-4">Order Confirmed!</h1>
        <p className="text-earth-600 text-center max-w-md mb-8">
          Thank you for supporting local Tasmanian farmers. We've sent a confirmation email with your order details and fulfillment instructions.
        </p>
        <Link to="/shop" className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 rounded-md font-medium transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-semibold text-earth-900 mb-4">Your cart is empty</h1>
        <p className="text-earth-600 mb-8">Looks like you haven't added any fresh produce yet.</p>
        <Link to="/shop" className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 rounded-md font-medium transition-colors">
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-earth-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center text-earth-600 hover:text-brand-700 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Link>

        <h1 className="text-3xl font-semibold text-earth-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-7 space-y-6">
            {Object.entries(itemsByFarmer).map(([farmerId, farmerItems]: [string, any[]]) => {
              const farmer = farmers.find(f => f.id === farmerId);
              return (
                <div key={farmerId} className="bg-white rounded-xl shadow-sm border border-earth-200 overflow-hidden">
                  <div className="bg-earth-100 px-6 py-4 border-b border-earth-200 flex justify-between items-center">
                    <h2 className="font-medium text-earth-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-earth-500" />
                      From: {farmer?.farmName || 'Unknown Farm'}
                    </h2>
                    {deliveryFeesByFarmer[farmerId] > 0 && (
                      <span className="text-sm font-medium text-brand-700 bg-brand-50 px-2 py-1 rounded-md">
                        Delivery: +${(deliveryFeesByFarmer[farmerId] || 0).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <ul className="space-y-6">
                      {farmerItems.map((item) => (
                        <li key={item.product.id} className="flex gap-4">
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name} 
                            className="w-20 h-20 object-cover rounded-md bg-earth-100"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium text-earth-900">{item.product.name}</h3>
                              <p className="font-medium text-earth-900">${((item.product.price || 0) * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="text-sm text-earth-500 mb-2">${(item.product.price || 0).toFixed(2)} / {item.product.unit}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center border border-earth-300 rounded-md">
                                <button 
                                  onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                  className="px-3 py-1 text-earth-600 hover:bg-earth-100 transition-colors"
                                >
                                  -
                                </button>
                                <span className="px-3 py-1 text-sm font-medium text-earth-900 border-x border-earth-300">
                                  {item.quantity}
                                </span>
                                <button 
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="px-3 py-1 text-earth-600 hover:bg-earth-100 transition-colors"
                                >
                                  +
                                </button>
                              </div>
                              <button 
                                onClick={() => removeItem(item.product.id)}
                                className="text-red-500 hover:text-red-700 p-1"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            
                            {/* Delivery Options per product */}
                            {item.product.deliveryOptions && item.product.deliveryOptions.length > 0 && (
                              <div className="mt-3 text-sm">
                                <p className="text-earth-700 font-medium mb-1 flex items-center gap-1">
                                  <Truck className="w-3 h-3" /> Fulfillment Options:
                                </p>
                                <select 
                                  value={deliverySelections[item.product.id] || ''}
                                  onChange={(e) => handleDeliveryChange(item.product.id, e.target.value)}
                                  className="w-full text-sm border border-earth-300 rounded-md p-1.5 bg-white outline-none focus:border-brand-500"
                                >
                                  {item.product.deliveryOptions.map((opt: string) => (
                                    <option key={opt} value={opt}>
                                      {opt} {opt === 'Brockley Produce Delivery' && item.product.brockleyDeliveryFee ? `(+$${(item.product.brockleyDeliveryFee || 0).toFixed(2)} per farm)` : ''}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-sm border border-earth-200 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-earth-900 mb-6">Payment Details</h2>
              
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Email Address</label>
                  <input required type="email" className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="you@example.com" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1">First Name</label>
                    <input required type="text" className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1">Last Name</label>
                    <input required type="text" className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Shipping Address</label>
                  <input required type="text" className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none mb-2" placeholder="Street Address" />
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="text" className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="City / Suburb" />
                    <input required type="text" className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="Postcode" />
                  </div>
                </div>

                <div className="pt-4 border-t border-earth-200 mt-6">
                  <div className="flex justify-between text-earth-600 mb-2">
                    <span>Subtotal</span>
                    <span>${(total || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-earth-600 mb-4 text-sm">
                    <span>Delivery Fees</span>
                    <span>{totalDeliveryFee > 0 ? `+$${(totalDeliveryFee || 0).toFixed(2)}` : 'Free / Pickup'}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-earth-900 mb-6">
                    <span>Total</span>
                    <span>${(orderTotal || 0).toFixed(2)}</span>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isProcessing}
                    className="w-full bg-brand-600 hover:bg-brand-500 disabled:bg-brand-400 text-white font-medium py-3 px-4 rounded-md transition-colors flex justify-center items-center"
                  >
                    {isProcessing ? (
                      <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                  <p className="text-xs text-earth-500 text-center mt-4 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Secure checkout powered by Stripe
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
