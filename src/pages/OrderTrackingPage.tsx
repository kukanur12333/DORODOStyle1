import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle } from 'lucide-react';
import { Badge } from '../components/atoms/Badge';

export const OrderTrackingPage: React.FC = () => {
  const orders = [
    {
      id: 'ORD-000001',
      status: 'delivered',
      total: 459.97,
      items: 3,
      date: '2025-01-15',
      estimatedDelivery: '2025-01-18',
      trackingNumber: 'TRK123456789',
    },
    {
      id: 'ORD-000002',
      status: 'shipped',
      total: 299.99,
      items: 2,
      date: '2025-01-20',
      estimatedDelivery: '2025-01-23',
      trackingNumber: 'TRK987654321',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'shipped':
        return <Truck className="text-blue-500" size={20} />;
      default:
        return <Package className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'shipped':
        return 'text-blue-600 bg-blue-50';
      case 'processing':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold font-montserrat text-gray-900 mb-2">
            Order Tracking
          </h1>
          <p className="text-gray-600 font-poppins">
            Track your luxury fashion orders and deliveries
          </p>
        </motion.div>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-luxury p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(order.status)}
                    <h3 className="font-montserrat font-bold text-lg">
                      Order {order.id}
                    </h3>
                    <Badge
                      variant="default"
                      className={getStatusColor(order.status)}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-gray-600 font-poppins">
                    Placed on {order.date} • {order.items} items • ${order.total}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="font-montserrat font-semibold text-gray-900">
                    Tracking: {order.trackingNumber}
                  </p>
                  <p className="text-sm text-gray-600 font-poppins">
                    Est. delivery: {order.estimatedDelivery}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="flex items-center justify-between">
                  {['Order Placed', 'Processing', 'Shipped', 'Delivered'].map((step, stepIndex) => {
                    const isCompleted = stepIndex <= (['processing', 'shipped', 'delivered'].indexOf(order.status) + 1);
                    return (
                      <div key={step} className="flex flex-col items-center relative">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            isCompleted
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {stepIndex + 1}
                        </div>
                        <span className="text-xs text-gray-600 mt-2 text-center">
                          {step}
                        </span>
                        {stepIndex < 3 && (
                          <div
                            className={`absolute top-4 left-8 w-full h-0.5 ${
                              stepIndex < (['processing', 'shipped', 'delivered'].indexOf(order.status) + 1)
                                ? 'bg-green-500'
                                : 'bg-gray-200'
                            }`}
                            style={{ width: 'calc(100% + 2rem)' }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-luxury p-12 text-center">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-bold font-montserrat text-gray-900 mb-2">
              No orders to track
            </h2>
            <p className="text-gray-600 font-poppins">
              Your order history will appear here once you make a purchase.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
