import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Shop = React.lazy(() => import('./pages/Shop'));
const ProductDetails = React.lazy(() => import('./pages/ProductDetails'));
const FarmerProfile = React.lazy(() => import('./pages/FarmerProfile'));
const Farmers = React.lazy(() => import('./pages/Farmers'));
const About = React.lazy(() => import('./pages/About'));
const Delivery = React.lazy(() => import('./pages/Delivery'));
const Contact = React.lazy(() => import('./pages/Contact'));
const VendorDashboard = React.lazy(() => import('./pages/VendorDashboard'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const Login = React.lazy(() => import('./pages/Login'));

// Placeholder components for pages not yet implemented
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <h1 className="text-3xl font-light text-earth-800">{title}</h1>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <MarketplaceProvider>
        <CartProvider>
          <BrowserRouter>
            <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-brand-600">Loading...</div></div>}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="shop" element={<Shop />} />
                  <Route path="product/:id" element={<ProductDetails />} />
                  <Route path="farmer/:id" element={<FarmerProfile />} />
                  <Route path="farmers" element={<Farmers />} />
                  <Route path="about" element={<About />} />
                  <Route path="delivery" element={<Delivery />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="vendor-dashboard" element={<VendorDashboard />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="login" element={<Login />} />
                </Route>
              </Routes>
            </React.Suspense>
          </BrowserRouter>
        </CartProvider>
      </MarketplaceProvider>
    </AuthProvider>
  );
}




