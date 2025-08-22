import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, Sparkles } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Badge } from '../atoms/Badge';

interface NavigationProps {
  cartCount?: number;
  wishlistCount?: number;
  onSearch?: (query: string) => void;
  isLoggedIn?: boolean;
  userTier?: 'Silver' | 'Gold' | 'Platinum' | 'Elite';
}

export const Navigation: React.FC<NavigationProps> = ({
  cartCount = 0,
  wishlistCount = 0,
  onSearch,
  isLoggedIn = false,
  userTier = 'Silver',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'Shop', href: '/shop' },
    { label: 'AI Studio', href: '/ai-studio', icon: <Sparkles size={16} /> },
    { label: 'Orders', href: '/orders' },
    { label: 'Community', href: '/community' },
  ];

  const MotionLink = motion(Link);

  return (
    <nav className="bg-white shadow-luxury sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-primary-gold to-primary-black rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span className="font-montserrat font-bold text-xl text-primary-black">
                  DORODOStyle
                </span>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <MotionLink
                key={item.label}
                to={item.href}
                className="flex items-center gap-1 text-gray-700 hover:text-primary-black font-montserrat font-medium transition-colors"
                whileHover={{ y: -2 }}
              >
                {item.icon}
                {item.label}
              </MotionLink>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <Input
              placeholder="Search luxury fashion..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* User Profile */}
            <Link to="/dashboard">
              <div className="flex items-center gap-2">
                {isLoggedIn && (
                  <Badge variant="membership" size="sm">
                    {userTier}
                  </Badge>
                )}
                <motion.button
                  className="p-2 text-gray-700 hover:text-primary-black transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <User size={20} />
                </motion.button>
              </div>
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist">
              <motion.button
                className="relative p-2 text-gray-700 hover:text-primary-black transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </motion.button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <motion.button
                className="relative p-2 text-gray-700 hover:text-primary-black transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.button>
            </Link>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="md:hidden p-2 text-gray-700 hover:text-primary-black transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <Input
            placeholder="Search luxury fashion..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={18} />}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white border-t"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center gap-2 py-3 text-gray-700 hover:text-primary-black font-montserrat font-medium transition-colors"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};
