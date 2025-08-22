import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, User, CartItem } from '../types';

interface AppState {
  user: User | null;
  cart: CartItem[];
  wishlist: string[];
  products: Product[];
  isLoading: boolean;
  isCommandPaletteOpen: boolean;
}

type AppAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'TOGGLE_WISHLIST'; payload: string }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'TOGGLE_COMMAND_PALETTE' }
  | { type: 'ADD_LOYALTY_POINTS'; payload: number };

const initialState: AppState = {
  user: {
    id: '1',
    name: 'Alexandra Chen',
    email: 'alexandra@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    membershipTier: 'Gold',
    loyaltyPoints: 2450,
    wishlist: ['1', '3', '5'],
    addresses: []
  },
  cart: [
    { productId: '1', quantity: 2, size: 'M', color: 'Black' },
    { productId: '2', quantity: 1, size: 'L', color: 'White' },
    { productId: '4', quantity: 1, size: 'S', color: 'Gold' }
  ],
  wishlist: ['1', '3', '5', '7', '9', '11', '13'],
  products: [],
  isLoading: false,
  isCommandPaletteOpen: false,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return { 
        ...state, 
        cart: state.cart.filter(item => item.productId !== action.payload) 
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'TOGGLE_WISHLIST':
      const isInWishlist = state.wishlist.includes(action.payload);
      return {
        ...state,
        wishlist: isInWishlist
          ? state.wishlist.filter(id => id !== action.payload)
          : [...state.wishlist, action.payload]
      };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'TOGGLE_COMMAND_PALETTE':
      return { ...state, isCommandPaletteOpen: !state.isCommandPaletteOpen };
    case 'ADD_LOYALTY_POINTS':
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          loyaltyPoints: state.user.loyaltyPoints + action.payload,
        },
      };
    default:
      return state;
  }
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
