import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Package, Heart, Star, MapPin, CreditCard, Settings } from 'lucide-react';
import { Badge } from '../components/atoms/Badge';
import { Button } from '../components/atoms/Button';
import { useApp } from '../context/AppContext';

export const UserDashboard: React.FC = () => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <User size={18} /> },
    { id: 'orders', label: 'Orders', icon: <Package size={18} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={18} /> },
    { id: 'reviews', label: 'Reviews', icon: <Star size={18} /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin size={18} /> },
    { id: 'payment', label: 'Payment', icon: <CreditCard size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-luxury p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <img
              src={state.user?.avatar}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold font-montserrat text-gray-900 mb-2">
                Welcome back, {state.user?.name}
              </h1>
              <p className="text-gray-600 font-poppins mb-4">
                Manage your account, orders, and preferences
              </p>
              <div className="flex items-center gap-4">
                <Badge variant="membership">
                  {state.user?.membershipTier} Member
                </Badge>
                <span className="text-sm text-gray-600">
                  {state.user?.loyaltyPoints} Loyalty Points
                </span>
              </div>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-luxury p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gray-100 text-gray-900 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-luxury p-8">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-xl font-bold font-montserrat mb-6">Account Overview</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-montserrat font-semibold text-gray-900 mb-2">Total Orders</h3>
                      <p className="text-2xl font-bold text-primary-gold">24</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-montserrat font-semibold text-gray-900 mb-2">Wishlist Items</h3>
                      <p className="text-2xl font-bold text-primary-gold">{state.wishlist.length}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-montserrat font-semibold text-gray-900 mb-2">Loyalty Points</h3>
                      <p className="text-2xl font-bold text-primary-gold">{state.user?.loyaltyPoints}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="font-montserrat font-semibold text-gray-900 mb-4">Recent Orders</h3>
                    <div className="space-y-4">
                      {[1, 2, 3].map((order) => (
                        <div key={order} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-montserrat font-medium">Order #ORD-{order.toString().padStart(6, '0')}</p>
                              <p className="text-sm text-gray-600 font-poppins">Placed on Jan {15 + order}, 2025</p>
                            </div>
                            <Badge variant="default">Delivered</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-montserrat font-semibold text-gray-900 mb-4">Membership Benefits</h3>
                    <div className="bg-gradient-to-r from-primary-gold/10 to-primary-gold/5 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="membership">{state.user?.membershipTier}</Badge>
                        <span className="font-montserrat font-semibold">Member Benefits</span>
                      </div>
                      <ul className="space-y-2 text-sm font-poppins text-gray-700">
                        <li>• Free shipping on all orders</li>
                        <li>• 15% member discount</li>
                        <li>• Early access to AI collections</li>
                        <li>• Priority customer support</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-xl font-bold font-montserrat mb-6">Order History</h2>
                  <p className="text-gray-600 font-poppins">Your order history will appear here.</p>
                </motion.div>
              )}

              {/* Add other tab content as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
