export interface Farmer {
  id: string;
  name: string;
  farmName: string;
  location: string;
  image: string;
  coverImage: string;
  shortStory: string;
  fullStory: string;
  practices: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: 'meat' | 'veg' | 'dairy' | 'eggs' | 'pantry' | 'more';
  images: string[];
  farmerId: string;
  productionDetails: string[];
  inStock: boolean;
  deliveryOptions?: string[];
  brockleyDeliveryFee?: number;
}

export const farmers: Farmer[] = [];

export const products: Product[] = [];
