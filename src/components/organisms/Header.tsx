import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown, Sparkles, Gamepad2 } from 'lucide-react';
import { Logo } from '../atoms/Logo';
import { useApp } from '../../context/AppContext';
import { MiniCart } from '../molecules/MiniCart';

export const Header: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    {
      label: 'Shop',
      href: '/shop',
      dropdown: [
        { label: 'Men', href: '/shop' },
        { label: 'Women', href: '/shop' },
        { label: 'Kids', href: '/shop' },
        { label: 'Accessories', href: '/shop' },
        { label: 'Streetwear', href: '/shop' },
      ],
    },
    { label: 'AI Studio', href: '/ai-studio', icon: <Sparkles size={16} /> },
    { label: 'Rewards', href: '/rewards', icon: <Gamepad2 size={16} /> },
    { label: 'Promotions', href: '/promotions' },
    { label: 'Community', href: '/community' },
    { label: 'About', href: '/about' },
  ];
  
  const userMenuItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Orders', href: '/orders' },
    { label: 'Wishlist', href: '/wishlist' },
    { label: 'Rewards', href: '/rewards' },
    { label: 'Settings', href: '/dashboard' },
    { label: 'Logout', href: '#' },
  ];

  const authMenuItems = [
    { label: 'Sign In', href: '/login' },
    { label: 'Create Account', href: '/signup' },
  ];

  const finalUserMenuItems = state.user ? userMenuItems : authMenuItems;

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const openCommandPalette = () => {
    dispatch({ type: 'TOGGLE_COMMAND_PALETTE' });
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Logo className="w-8 h-8 text-primary-black group-hover:text-primary-gold transition-colors" />
            <span className="font-montserrat font-bold text-2xl text-gray-800 group-hover:text-primary-black transition-colors hidden sm:inline">
              DORODOStyle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map(item => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={item.dropdown ? () => setIsShopDropdownOpen(true) : undefined}
                onMouseLeave={item.dropdown ? () => setIsShopDropdownOpen(false) : undefined}
              >
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center gap-1 font-poppins font-medium transition-colors ${
                      isActive ? 'text-primary-gold' : 'text-gray-600 hover:text-primary-black'
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                  {item.dropdown && <ChevronDown size={16} />}
                </NavLink>
                <AnimatePresence>
                  {item.dropdown && isShopDropdownOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full mt-2 w-48 bg-white rounded-2xl shadow-luxury p-2"
                    >
                      {item.dropdown.map(subItem => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          className="block px-4 py-2 text-sm font-poppins text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:block">
              <button
                onClick={openCommandPalette}
                className="flex items-center gap-2 text-sm text-gray-500 border rounded-full py-2 px-4 w-48 hover:bg-gray-50 transition-colors"
              >
                <Search size={16} />
                Search...
                <kbd className="ml-auto text-xs font-sans bg-gray-100 rounded px-1.5 py-0.5">⌘K</kbd>
              </button>
            </div>
            
            <div className="relative hidden lg:block"
              onMouseEnter={() => setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <Link to={state.user ? "/dashboard" : "/login"} className="p-2 text-gray-600 hover:text-primary-black transition-colors block">
                <User size={22} />
              </Link>
               <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-luxury p-2"
                    >
                      {finalUserMenuItems.map(subItem => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          className="block px-4 py-2 text-sm font-poppins text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
            
            <Link to="/wishlist" className="p-2 text-gray-600 hover:text-primary-black transition-colors relative hidden lg:block">
              <Heart size={22} />
              {state.wishlist.length > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-primary-red rounded-full"></span>}
            </Link>
            
            <div className="relative hidden lg:block"
                onMouseEnter={() => setIsCartHovered(true)}
                onMouseLeave={() => setIsCartHovered(false)}
            >
                <Link to="/cart" className="p-2 text-gray-600 hover:text-primary-black transition-colors relative block">
                    <ShoppingBag size={22} />
                    {state.cart.length > 0 && <span className="absolute top-0 right-0 w-5 h-5 bg-primary-red text-white text-xs rounded-full flex items-center justify-center">{state.cart.length}</span>}
                </Link>
                <AnimatePresence>
                    {isCartHovered && state.cart.length > 0 && <MiniCart />}
                </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="lg:hidden p-2 text-gray-600" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-white z-50 lg:hidden"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-8">
                <span className="font-montserrat font-bold text-xl">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
              </div>
              <nav className="flex flex-col gap-4">
                {navItems.map(item => (
                  <Link key={item.label} to={item.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-lg font-poppins text-gray-700 p-2 rounded-lg hover:bg-gray-100">
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 border-t pt-8 flex flex-col gap-4">
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-lg font-poppins text-gray-700 p-2 rounded-lg hover:bg-gray-100">
                  <User size={20} /> My Account
                </Link>
                <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-lg font-poppins text-gray-700 p-2 rounded-lg hover:bg-gray-100">
                  <Heart size={20} /> Wishlist
                </Link>
                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-lg font-poppins text-gray-700 p-2 rounded-lg hover:bg-gray-100">
                  <ShoppingBag size={20} /> Cart
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
