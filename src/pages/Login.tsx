import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, Store } from 'lucide-react';

export default function Login() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignIn = async (role: 'consumer' | 'farmer') => {
    try {
      setIsProcessing(true);
      await signIn(role);
      navigate('/');
    } catch (error) {
      console.error("Failed to sign in", error);
      alert("Failed to sign in. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-earth-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm border border-earth-200">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-semibold text-earth-900">Welcome to Brockley Produce</h2>
          <p className="mt-2 text-sm text-earth-600">
            Sign in or create an account to continue.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <button
              onClick={() => handleSignIn('consumer')}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-3 px-4 py-4 border border-earth-300 rounded-md shadow-sm bg-white text-base font-medium text-earth-700 hover:bg-earth-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors disabled:opacity-50"
            >
              <Leaf className="w-5 h-5 text-brand-600" />
              Sign in as a Shopper
            </button>

            <button
              onClick={() => handleSignIn('farmer')}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-3 px-4 py-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors disabled:opacity-50"
            >
              <Store className="w-5 h-5 text-white" />
              Sign in as a Farmer
            </button>
          </div>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-earth-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-earth-500">
                  Powered by Google
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
