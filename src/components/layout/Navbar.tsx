import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Leaf, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

export function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { user, profile, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Our Farmers', path: '/farmers' },
    { name: 'About', path: '/about' },
    { name: 'Delivery', path: '/delivery' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-earth-50/80 backdrop-blur-md border-b border-earth-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-brand-900 text-earth-50 p-1.5 rounded-sm group-hover:bg-brand-800 transition-colors">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-semibold text-xl tracking-tight text-brand-950">
              Brockley Produce
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-earth-700 hover:text-brand-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            {profile?.role === 'farmer' && (
              <Link
                to="/vendor-dashboard"
                className="text-sm font-medium text-brand-700 hover:text-brand-900 transition-colors border border-brand-200 bg-brand-50 px-3 py-1.5 rounded-md"
              >
                Vendor Dashboard
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <span className="text-sm text-earth-600 font-medium">Hi, {profile?.displayName?.split(' ')[0]}</span>
                <button
                  onClick={signOut}
                  className="text-sm font-medium text-earth-600 hover:text-earth-900 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-2 text-sm font-medium text-earth-700 hover:text-brand-900 transition-colors"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>
            )}

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-earth-800 hover:text-brand-900 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-brand-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2 text-earth-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-earth-50 border-b border-earth-200">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-3 text-base font-medium text-earth-800 hover:bg-earth-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {profile?.role === 'farmer' && (
              <Link
                to="/vendor-dashboard"
                className="block px-3 py-3 text-base font-medium text-brand-700 hover:bg-brand-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Vendor Dashboard
              </Link>
            )}
            {user ? (
              <button
                onClick={() => {
                  signOut();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-3 text-base font-medium text-earth-600 hover:bg-earth-100 rounded-md"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-3 text-base font-medium text-earth-800 hover:bg-earth-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
