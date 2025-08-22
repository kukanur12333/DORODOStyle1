export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  description: string;
  isAIGenerated: boolean;
  isLimited: boolean;
  stock: number;
  rating: number;
  reviews: number;
  colors: string[];
  sizes: string[];
  tags: string[];
  sku: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  membershipTier: 'Silver' | 'Gold' | 'Platinum' | 'Elite';
  loyaltyPoints: number;
  wishlist: string[];
  addresses: Address[];
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  trackingNumber?: string;
  shippingAddress: Address;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  readTime: number;
}

export interface AIPrompt {
  id: string;
  userId: string;
  prompt: string;
  style: string;
  generatedImages: string[];
  createdAt: string;
  isPublic: boolean;
  likes: number;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  isVerified: boolean;
  rating: number;
  date: string;
  title: string;
  content: string;
  images: string[];
}
