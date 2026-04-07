import React from 'react';

export default function About() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold text-earth-900 mb-6">Our Story</h1>
          <p className="text-xl text-earth-600 font-light">
            Empowering farmers. Reconnecting consumers.
          </p>
        </div>

        <div className="aspect-video rounded-2xl overflow-hidden mb-16">
          <img 
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=2000" 
            alt="Tasmanian landscape" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg prose-earth mx-auto">
          <h2 className="text-2xl font-semibold text-earth-900 mb-4">The Disconnect</h2>
          <p className="text-earth-700 mb-8">
            In the modern supermarket era, we've lost touch with where our food comes from. Farmers are often squeezed by middlemen, and consumers are left with produce that has traveled thousands of kilometers. Brockley Produce was founded to break this cycle.
          </p>

          <h2 className="text-2xl font-semibold text-earth-900 mb-4">Our Platform</h2>
          <p className="text-earth-700 mb-8">
            We are a digital marketplace—think of us as an online farmers' market. We don't buy and resell produce. Instead, we provide the platform for independent Tasmanian farmers to set up their own digital farm-gates, list their produce, set their own prices, and sell directly to you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
            <div className="bg-earth-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-earth-900 mb-2">Direct Connection</h3>
              <p className="text-earth-600 text-sm">When you buy on Brockley Produce, your money goes directly to the person who grew your food.</p>
            </div>
            <div className="bg-earth-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-earth-900 mb-2">Farmer Autonomy</h3>
              <p className="text-earth-600 text-sm">Farmers control their inventory, pricing, and fulfillment, empowering them to run sustainable businesses.</p>
            </div>
            <div className="bg-earth-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-earth-900 mb-2">Total Transparency</h3>
              <p className="text-earth-600 text-sm">You always know exactly which farm your food is coming from and how it was produced.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

