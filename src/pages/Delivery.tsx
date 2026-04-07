import React from 'react';
import { Truck, MapPin, Calendar, Package, Store } from 'lucide-react';

export default function Delivery() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold text-earth-900 mb-6">Delivery & Pickup</h1>
          <p className="text-xl text-earth-600 font-light">
            Direct from the farm to you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white border border-earth-200 p-8 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6">
              <Store className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-earth-900 mb-3">Farmer-Fulfilled Orders</h2>
            <p className="text-earth-600 mb-4">
              Brockley Produce is a marketplace. This means you are buying directly from independent farmers who manage their own fulfillment.
            </p>
            <p className="text-earth-600 mb-4">
              Because of this, delivery methods, zones, and schedules vary depending on the producer you are purchasing from.
            </p>
          </div>

          <div className="bg-white border border-earth-200 p-8 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-earth-900 mb-3">Fulfillment Options</h2>
            <p className="text-earth-600 mb-4">
              When browsing products, check the "Delivery Info" section on the product page. Farmers typically offer:
            </p>
            <ul className="space-y-3 text-earth-700 text-sm">
              <li className="flex items-start gap-2 border-b border-earth-100 pb-2">
                <Truck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span><strong>Brockley Produce Delivery:</strong> We collect your order from the farm and drop it off directly to your door.</span>
              </li>
              <li className="flex items-start gap-2 border-b border-earth-100 pb-2">
                <Truck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span><strong>Local Delivery:</strong> Direct to your door within their specified zones (e.g., Statewide or specific regions).</span>
              </li>
              <li className="flex items-start gap-2 border-b border-earth-100 pb-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span><strong>Farm-Gate Pickup:</strong> Collect your order directly from the farm and see where your food is grown.</span>
              </li>
              <li className="flex items-start gap-2">
                <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span><strong>Market Pickup:</strong> Collect from the farmer's stall at local weekend farmers' markets.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-earth-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-earth-900 mb-6 text-center">Multi-Farm Orders</h2>
          <div className="text-center max-w-2xl mx-auto">
            <Package className="w-12 h-12 mx-auto text-earth-400 mb-6" />
            <p className="text-earth-700 mb-4">
              If you purchase items from <strong>multiple different farmers</strong> in a single checkout, your items will be fulfilled separately by each farmer. 
            </p>
            <p className="text-earth-700">
              You may receive multiple deliveries on different days, or need to pick up items from different locations, depending on the options you select at checkout for each farm's items.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

