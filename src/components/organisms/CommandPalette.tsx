import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import {
  File,
  Home,
  ShoppingBag,
  Sparkles,
  Heart,
  User,
  LogOut,
  Settings,
  Tag,
  MessageCircle,
  Info,
  HelpCircle,
  Package,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateMockProducts } from '../../utils/mockData';
import { Product } from '../../types';

export const CommandPalette: React.FC = () => {
  const { state, dispatch } = useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(generateMockProducts(10));
  }, []);

  const runCommand = (command: () => void) => {
    dispatch({ type: 'TOGGLE_COMMAND_PALETTE' });
    command();
  };

  if (!state.isCommandPaletteOpen) {
    return null;
  }

  return (
    <Command.Dialog
      open={state.isCommandPaletteOpen}
      onOpenChange={() => dispatch({ type: 'TOGGLE_COMMAND_PALETTE' })}
      label="Global Command Menu"
      className="fixed inset-0 z-50"
    >
      <div className="fixed inset-0 bg-black/50" />
      <div className="fixed top-1/2 left-1/2 w-full max-w-xl -translate-x-1/2 -translate-y-1/2">
        <Command
          className="mx-auto w-full max-w-xl transform divide-y divide-gray-500/20 rounded-2xl bg-black/80 text-white backdrop-blur-md shadow-2xl ring-1 ring-white/10"
        >
          <Command.Input
            className="h-14 w-full border-0 bg-transparent px-4 text-lg text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-0"
            placeholder="What do you need?"
          />
          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-gray-400">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="p-2 text-xs font-medium text-gray-400">
              <Command.Item onSelect={() => runCommand(() => navigate('/'))} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                <Home size={16} /> Home
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => navigate('/shop'))} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                <ShoppingBag size={16} /> Shop
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => navigate('/ai-studio'))} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                <Sparkles size={16} /> AI Studio
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => navigate('/wishlist'))} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                <Heart size={16} /> Wishlist
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => navigate('/dashboard'))} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                <User size={16} /> My Account
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Products" className="p-2 text-xs font-medium text-gray-400">
              {products.map((product) => (
                <Command.Item
                  key={product.id}
                  onSelect={() => runCommand(() => navigate(`/product/${product.id}`))}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                >
                  <img src={product.image} alt={product.name} className="w-8 h-8 rounded-md object-cover" />
                  <div className="flex-1">
                    <p>{product.name}</p>
                    <p className="text-xs text-gray-400">${product.price.toFixed(2)}</p>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Actions" className="p-2 text-xs font-medium text-gray-400">
              <Command.Item onSelect={() => runCommand(() => navigate('/cart'))} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                <ShoppingBag size={16} /> View Cart
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => navigate('/orders'))} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                <Package size={16} /> Track Orders
              </Command.Item>
              {state.user && (
                <Command.Item onSelect={() => runCommand(() => console.log('Logging out...'))} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                  <LogOut size={16} /> Logout
                </Command.Item>
              )}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </Command.Dialog>
  );
};
