import { faker } from '@faker-js/faker';
import { Product, User, Order, BlogPost, Review } from '../types';
import { MEMBERSHIP_TIERS } from './constants';

export function generateMockProducts(count: number): Product[] {
  const categories = ['Coats', 'Clothing', 'Accessories', 'Shoes', 'Bags', 'Jewelry', 'Beauty'];
  const brands = ['DORODOStyle', 'LuxeAI', 'EliteWear', 'PremiumCraft', 'ArtisanLux'];
  const colors = ['#5C4033', '#90EE90', '#FF0000', '#0000FF']; // Brown, Green, Red, Blue
  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  return Array.from({ length: count }, (_, index) => {
    const price = faker.number.float({ min: 50, max: 2000, fractionDigits: 2 });
    const originalPrice = Math.random() > 0.7 ? price * faker.number.float({ min: 1.2, max: 2 }) : undefined;
    
    return {
      id: (index + 1).toString(),
      name: faker.commerce.productName(),
      price,
      originalPrice,
      sku: `GHFT${faker.string.alphanumeric(8).toUpperCase()}`,
      image: 'https://images.unsplash.com/photo-1572804013427-4d7ca726b655?w=500&h=600&fit=crop',
      images: [
          'https://images.unsplash.com/photo-1572804013427-4d7ca726b655?w=500&h=600&fit=crop',
          'https://images.unsplash.com/photo-1572804013427-4d7ca726b655?w=500&h=600&fit=crop&q=80&sat=-100',
          'https://images.unsplash.com/photo-1572804013427-4d7ca726b655?w=500&h=600&fit=crop&q=80&hue=30',
          'https://images.unsplash.com/photo-1572804013427-4d7ca726b655?w=500&h=600&fit=crop&q=80&bri=50',
      ],
      category: faker.helpers.arrayElement(categories),
      brand: faker.helpers.arrayElement(brands),
      description: faker.lorem.paragraph(),
      isAIGenerated: Math.random() > 0.6,
      isLimited: Math.random() > 0.8,
      stock: faker.number.int({ min: 0, max: 50 }),
      rating: faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }),
      reviews: faker.number.int({ min: 10, max: 500 }),
      colors: faker.helpers.arrayElements(colors, { min: 2, max: 4 }),
      sizes: faker.helpers.arrayElements(sizes, { min: 4, max: 6 }),
      tags: faker.helpers.arrayElements(['Women', 'Coat', 'Fashion', 'Jacket'], { min: 2, max: 4 }),
    };
  });
}

export function generateMockReviews(count: number): Review[] {
  return Array.from({ length: count }, (_, index) => ({
    id: (index + 1).toString(),
    author: faker.person.fullName(),
    avatar: faker.image.avatar(),
    isVerified: faker.datatype.boolean(),
    rating: faker.number.float({ min: 4, max: 5, fractionDigits: 1 }),
    date: `${faker.number.int({min: 1, max: 12})} months ago`,
    title: faker.lorem.sentence({ min: 3, max: 7 }),
    content: faker.lorem.paragraph(),
    images: faker.datatype.boolean(0.5) ? Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => `https://images.unsplash.com/photo-1572804013427-4d7ca726b655?w=200&h=200&fit=crop&seed=${faker.string.uuid()}`) : [],
  }));
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  points: number;
  tier: keyof typeof MEMBERSHIP_TIERS;
}

export function generateMockLeaderboardUsers(count: number): LeaderboardUser[] {
  const tierKeys = Object.keys(MEMBERSHIP_TIERS) as (keyof typeof MEMBERSHIP_TIERS)[];
  
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    rank: 0, // Will be set after sorting
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    points: faker.number.int({ min: 1000, max: 25000 }),
    tier: faker.helpers.arrayElement(tierKeys),
  }))
  .sort((a, b) => b.points - a.points)
  .map((user, index) => ({ ...user, rank: index + 1 }));
}
