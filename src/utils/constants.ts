export const BRAND_COLORS = {
  black: '#000000',
  white: '#ffffff',
  gold: '#FFD700',
  red: '#FF0000',
} as const;

export const MEMBERSHIP_TIERS = {
  Bronze: { minPoints: 0, color: '#CD7F32', perks: ['Basic game access', '5% welcome coupon'] },
  Silver: { minPoints: 1000, color: '#C0C0C0', perks: ['Free shipping over $100', 'Birthday discount'] },
  Gold: { minPoints: 2500, color: '#FFD700', perks: ['Free shipping on all orders', '10% member discount', 'Early access to sales'] },
  Platinum: { minPoints: 7500, color: '#E5E4E2', perks: ['15% member discount', 'Free express shipping', 'Exclusive AI features'] },
} as const;

export const PRODUCT_CATEGORIES = [
  'Clothing',
  'Accessories',
  'Shoes',
  'Bags',
  'Jewelry',
  'Beauty',
  'Home & Lifestyle',
  'AI Exclusive',
] as const;

export const AI_STYLES = [
  'Minimalist',
  'Futuristic',
  'Vintage',
  'Streetwear',
  'Luxury',
  'Bohemian',
  'Gothic',
  'Avant-garde',
] as const;

export const FILTER_COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Green', hex: '#008000' },
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Brown', hex: '#A52A2A' },
  { name: 'Beige', hex: '#F5F5DC' },
];
