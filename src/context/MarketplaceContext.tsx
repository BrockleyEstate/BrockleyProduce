import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Product, Farmer } from '../data/mockData';
import { useAuth } from './AuthContext';

interface MarketplaceContextType {
  products: Product[];
  farmers: Farmer[];
  addProduct: (product: Omit<Product, 'id' | 'farmerId'>) => Promise<void>;
  loading: boolean;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, profile } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users (farmers)
        const usersSnap = await getDocs(collection(db, 'users'));
        const fetchedFarmers: Farmer[] = [];
        usersSnap.forEach(doc => {
          const data = doc.data();
          if (data.role === 'farmer') {
            fetchedFarmers.push({
              id: doc.id,
              name: data.displayName,
              farmName: data.farmName || data.displayName + "'s Farm",
              location: data.location || 'Tasmania',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
              coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600',
              shortStory: 'Selling fresh produce directly to the community.',
              fullStory: data.fullStory || 'We are a local farm dedicated to providing the best quality produce directly to consumers.',
              practices: ['Locally Grown', 'Fresh']
            });
          }
        });
        setFarmers(fetchedFarmers);

        // Fetch products
        const productsSnap = await getDocs(collection(db, 'products'));
        const fetchedProducts: Product[] = [];
        productsSnap.forEach(doc => {
          fetchedProducts.push({ id: doc.id, ...doc.data() } as Product);
        });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching marketplace data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addProduct = async (productData: Omit<Product, 'id' | 'farmerId'>) => {
    if (!user || profile?.role !== 'farmer') {
      throw new Error("Only farmers can add products");
    }

    const newProduct = {
      ...productData,
      farmerId: user.uid,
      createdAt: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(collection(db, 'products'), newProduct);
      setProducts(prev => [...prev, { id: docRef.id, ...newProduct } as Product]);
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

  return (
    <MarketplaceContext.Provider value={{ products, farmers, addProduct, loading }}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}

