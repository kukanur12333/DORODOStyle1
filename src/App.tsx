import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Preloader } from './components/organisms/Preloader';
import { CommandPalette } from './components/organisms/CommandPalette';
import { MainLayout } from './components/layouts/MainLayout';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AIStudioPage } from './pages/AIStudioPage';
import { UserDashboard } from './pages/UserDashboard';
import { WishlistPage } from './pages/WishlistPage';
import { CommunityPage } from './pages/CommunityPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { MembershipPage } from './pages/MembershipPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { PromotionsPage } from './pages/PromotionsPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { PlayToEarnPage } from './pages/PlayToEarnPage';

// Context
import { AppProvider, useApp } from './context/AppContext';

const AppContent: React.FC = () => {
  const { dispatch } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Simulate loading for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        dispatch({ type: 'TOGGLE_COMMAND_PALETTE' });
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [dispatch]);

  return (
    <>
      <CommandPalette />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" />
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white">
              <Routes>
                {/* Routes with Main Layout */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/ai-studio" element={<AIStudioPage />} />
                  <Route path="/rewards" element={<PlayToEarnPage />} />
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/orders" element={<OrderTrackingPage />} />
                  <Route path="/membership" element={<MembershipPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/promotions" element={<PromotionsPage />} />
                </Route>
                
                {/* Routes without Main Layout */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
