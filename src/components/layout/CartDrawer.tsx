import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-earth-950/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-earth-50 shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between p-6 border-b border-earth-200">
          <h2 className="text-lg font-semibold text-earth-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-earth-500 hover:text-earth-900 transition-colors rounded-full hover:bg-earth-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-earth-500 space-y-4">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p>Your cart is empty</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-brand-600 font-medium hover:text-brand-700"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-earth-200 flex-shrink-0">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-earth-900 line-clamp-2">
                          {item.product.name}
                        </h3>
                        <button 
                          onClick={() => removeItem(item.product.id)}
                          className="text-earth-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-earth-500 mt-1">${(item.product.price || 0).toFixed(2)} / {item.product.unit}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-earth-300 rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-earth-600 hover:bg-earth-100 rounded-l-md transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-earth-600 hover:bg-earth-100 rounded-r-md transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-medium text-earth-900">
                        ${((item.product.price || 0) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-earth-200 bg-earth-100/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-earth-600">Subtotal</span>
              <span className="text-lg font-semibold text-earth-900">${(cartTotal || 0).toFixed(2)}</span>
            </div>
            <p className="text-xs text-earth-500 mb-6">Shipping and taxes calculated at checkout.</p>
            <Link 
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full bg-brand-900 text-white py-3 px-4 rounded-md font-medium text-center hover:bg-brand-800 transition-colors flex justify-center"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
