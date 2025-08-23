import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import { Search, Mic, Wand2, Camera, Clock, TrendingUp, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateMockProducts } from '../../utils/mockData';
import { Product } from '../../types';
import { PRODUCT_CATEGORIES } from '../../utils/constants';

const useRecentSearches = (limit = 5) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const addRecentSearch = (query: string) => {
    if (!query) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, limit);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  return { recentSearches, addRecentSearch };
};

export const SearchModal: React.FC = () => {
  const { state, dispatch } = useApp();
  const [query, setQuery] = useState('');
  const [products] = useState<Product[]>(() => generateMockProducts(50));
  const { recentSearches, addRecentSearch } = useRecentSearches();
  const navigate = useNavigate();

  const closeSearch = () => {
    dispatch({ type: 'TOGGLE_SEARCH_MODAL' });
  };

  const handleSelect = (callback: () => void) => {
    addRecentSearch(query);
    closeSearch();
    callback();
  };

  const handleSubmit = () => {
    if (query.trim()) {
      handleSelect(() => navigate(`/search?q=${encodeURIComponent(query)}`));
    }
  };

  const filteredProducts = useMemo(() => {
    if (!query) return [];
    return products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 4);
  }, [query, products]);

  const filteredCategories = useMemo(() => {
    if (!query) return [];
    return PRODUCT_CATEGORIES.filter(c => c.toLowerCase().includes(query.toLowerCase())).slice(0, 3);
  }, [query]);

  const trendingSearches = ['AI Hoodie', 'Cyberpunk Jacket', 'Minimalist Watch', 'Summer Collection'];

  if (!state.isSearchModalOpen) {
    return null;
  }

  return (
    <Command.Dialog
      open={state.isSearchModalOpen}
      onOpenChange={() => dispatch({ type: 'TOGGLE_SEARCH_MODAL' })}
      className="fixed inset-0 z-50"
      label="Global Search"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <Command
        className="fixed top-[10vh] left-1/2 w-[90vw] max-w-2xl -translate-x-1/2 rounded-2xl bg-white shadow-luxury"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      >
        <div className="flex items-center border-b px-4">
          <Search className="mr-2 h-5 w-5 shrink-0 text-gray-500" />
          <Command.Input
            value={query}
            onValueChange={setQuery}
            className="flex h-14 w-full rounded-md bg-transparent py-3 text-lg outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search for styles, brands, or AI drops…"
          />
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-primary-black transition-colors" onClick={() => alert('Voice search coming soon!')}><Mic size={20} /></button>
            <button className="p-2 text-gray-500 hover:text-primary-black transition-colors" onClick={() => alert('AI search coming soon!')}><Wand2 size={20} /></button>
            <button className="p-2 text-gray-500 hover:text-primary-black transition-colors" onClick={() => alert('Image search coming soon!')}><Camera size={20} /></button>
            <button className="p-2 text-gray-500 hover:text-primary-black transition-colors md:hidden" onClick={closeSearch}><X size={20} /></button>
          </div>
        </div>
        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-gray-500">No results found.</Command.Empty>
          
          {query === '' && (
            <>
              {recentSearches.length > 0 && (
                <Command.Group heading="Recent Searches" className="p-2 text-xs font-medium text-gray-500">
                  {recentSearches.map(search => (
                    <Command.Item key={search} onSelect={() => handleSelect(() => navigate(`/search?q=${search}`))} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                      <Clock size={16} /> {search}
                    </Command.Item>
                  ))}
                </Command.Group>
              )}
              <Command.Group heading="Trending Now" className="p-2 text-xs font-medium text-gray-500">
                {trendingSearches.map(search => (
                  <Command.Item key={search} onSelect={() => handleSelect(() => navigate(`/search?q=${search}`))} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                    <TrendingUp size={16} /> {search}
                  </Command.Item>
                ))}
              </Command.Group>
            </>
          )}

          {query !== '' && (
            <>
              {filteredProducts.length > 0 && (
                <Command.Group heading="Products" className="p-2 text-xs font-medium text-gray-500">
                  {filteredProducts.map(product => (
                    <Command.Item key={product.id} onSelect={() => handleSelect(() => navigate(`/product/${product.id}`))} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                      <img src={product.image} alt={product.name} className="w-10 h-12 object-cover rounded-md" />
                      <div className="flex-1">
                        <p>{product.name}</p>
                        <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
              )}
              {filteredCategories.length > 0 && (
                <Command.Group heading="Categories" className="p-2 text-xs font-medium text-gray-500">
                  {filteredCategories.map(category => (
                    <Command.Item key={category} onSelect={() => handleSelect(() => navigate(`/shop?category=${category}`))} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                      {category}
                    </Command.Item>
                  ))}
                </Command.Group>
              )}
            </>
          )}
        </Command.List>
      </Command>
    </Command.Dialog>
  );
};
