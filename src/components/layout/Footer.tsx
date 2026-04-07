import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Instagram, Facebook, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-950 text-earth-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-earth-50 text-brand-950 p-1.5 rounded-sm">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-semibold text-xl tracking-tight text-earth-50">
                Brockley Produce
              </span>
            </Link>
            <p className="text-sm text-earth-400 mb-6 max-w-xs">
              Connecting you directly to Tasmania's finest farmers. Know your farmer, know your food.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-earth-400 hover:text-earth-50 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-earth-400 hover:text-earth-50 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="mailto:brockleyestateBSN@outlook.com" className="text-earth-400 hover:text-earth-50 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-earth-50 font-medium mb-4">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/shop?category=meat" className="hover:text-earth-50 transition-colors">Pasture-Raised Meat</Link></li>
              <li><Link to="/shop?category=veg" className="hover:text-earth-50 transition-colors">Organic Vegetables</Link></li>
              <li><Link to="/shop?category=dairy" className="hover:text-earth-50 transition-colors">Dairy & Eggs</Link></li>
              <li><Link to="/shop" className="hover:text-earth-50 transition-colors">All Products</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-earth-50 font-medium mb-4">About</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-earth-50 transition-colors">Our Story</Link></li>
              <li><Link to="/farmers" className="hover:text-earth-50 transition-colors">Meet the Farmers</Link></li>
              <li><Link to="/delivery" className="hover:text-earth-50 transition-colors">Delivery Info</Link></li>
              <li><Link to="/contact" className="hover:text-earth-50 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-earth-50 font-medium mb-4">Newsletter</h3>
            <p className="text-sm text-earth-400 mb-4">
              Subscribe for weekly harvest updates and new farmer announcements.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="bg-brand-900 border border-brand-800 rounded-md px-3 py-2 text-sm text-earth-50 placeholder:text-earth-500 focus:outline-none focus:ring-1 focus:ring-brand-500 w-full"
              />
              <button
                type="submit"
                className="bg-brand-500 hover:bg-brand-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-brand-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-earth-500">
          <p>&copy; {new Date().getFullYear()} Brockley Produce. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-earth-300">Privacy Policy</Link>
            <Link to="#" className="hover:text-earth-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
