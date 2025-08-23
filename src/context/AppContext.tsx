import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product, User, CartItem } from '../types';
import { supabase, fetchUserProfile } from '../lib/supabase';

interface DailyReward {
  points: number;
  streak: number;
}

interface AppState {
  user: User | null;
  cart: CartItem[];
  wishlist: string[];
  products: Product[];
  isLoading: boolean;
  isCommandPaletteOpen: boolean;
  isSearchModalOpen: boolean;
  dailyReward: DailyReward | null;
}

type AppAction = 
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'LOGOUT' }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'TOGGLE_WISHLIST'; payload: string }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'TOGGLE_COMMAND_PALETTE' }
  | { type: 'TOGGLE_SEARCH_MODAL' }
  | { type: 'ADD_LOYALTY_POINTS'; payload: number }
  | { type: 'SHOW_DAILY_REWARD'; payload: DailyReward }
  | { type: 'HIDE_DAILY_REWARD' };

const initialState: AppState = {
  user: null,
  cart: [],
  wishlist: [],
  products: [],
  isLoading: true,
  isCommandPaletteOpen: false,
  isSearchModalOpen: false,
  dailyReward: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isLoading: false };
    case 'LOGOUT':
      return { ...state, user: null };
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
    case 'TOGGLE_SEARCH_MODAL':
      return { ...state, isSearchModalOpen: !state.isSearchModalOpen };
    case 'ADD_LOYALTY_POINTS':
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          loyaltyPoints: state.user.loyaltyPoints + action.payload,
        },
      };
    case 'SHOW_DAILY_REWARD':
      return { ...state, dailyReward: action.payload };
    case 'HIDE_DAILY_REWARD':
      return { ...state, dailyReward: null };
    default:
      return state;
  }
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const userProfile = await fetchUserProfile(session.user);
        dispatch({ type: 'SET_USER', payload: userProfile });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const userProfile = await fetchUserProfile(session.user);
          dispatch({ type: 'SET_USER', payload: userProfile });
        } else if (event === 'SIGNED_OUT') {
          dispatch({ type: 'LOGOUT' });
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

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
