import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export default function Farmers() {
  const { farmers, loading } = useMarketplace();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-brand-600">Loading farmers...</div>
      </div>
    );
  }

  return (

    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold text-earth-900 mb-6">Meet Our Farmers</h1>
          <p className="text-lg text-earth-600">
            We partner with independent Tasmanian farmers who share our commitment to quality, sustainability, and ethical production. Get to know the people growing your food.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {farmers.map(farmer => (
            <Link key={farmer.id} to={`/farmer/${farmer.id}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-earth-100">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={farmer.coverImage} 
                  alt={farmer.farmName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-950/80 via-earth-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 flex items-end gap-4 w-full">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white flex-shrink-0">
                    <img src={farmer.image} alt={farmer.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-1">{farmer.farmName}</h2>
                    <p className="text-earth-200 text-sm">{farmer.location}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-earth-600 text-sm mb-6 flex-1">{farmer.shortStory}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {farmer.practices.slice(0, 2).map((practice, idx) => (
                    <span key={idx} className="bg-earth-100 text-earth-700 px-2.5 py-1 rounded-md text-xs font-medium">
                      {practice}
                    </span>
                  ))}
                  {farmer.practices.length > 2 && (
                    <span className="bg-earth-100 text-earth-700 px-2.5 py-1 rounded-md text-xs font-medium">
                      +{farmer.practices.length - 2} more
                    </span>
                  )}
                </div>
                <span className="text-brand-700 text-sm font-medium group-hover:underline flex items-center gap-1 mt-auto">
                  View Profile & Products <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
