import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { Badge } from '../components/atoms/Badge';
import { useApp } from '../context/AppContext';
import { generateMockProducts } from '../utils/mockData';

export const CartPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const mockProducts = generateMockProducts(20);
  
  // Get full product details for cart items
  const cartItems = state.cart.map(cartItem => {
    const product = mockProducts.find(p => p.id === cartItem.productId);
    return product ? { ...cartItem, product } : null;
  }).filter(Boolean);

  const subtotal = cartItems.reduce((total, item) => {
    return total + (item?.product?.price || 0) * item!.quantity;
  }, 0);

  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const rewardPoints = Math.floor(subtotal);

  const handleRemoveItem = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity } });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-4">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold font-montserrat text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 font-poppins mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/shop">
            <Button variant="primary" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold font-montserrat text-gray-900 mb-8">
          Shopping Cart ({cartItems.length} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={`${item?.product?.id}-${item?.size}-${item?.color}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl shadow-luxury p-4 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <img
                    src={item?.product?.image}
                    alt={item?.product?.name}
                    className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-xl"
                  />
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-montserrat font-semibold text-lg">
                          {item?.product?.name}
                        </h3>
                        <p className="text-sm text-gray-500 font-poppins">
                          {item?.product?.brand}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item?.product?.id!)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 font-poppins mb-4">
                      <span>Size: {item?.size}</span>
                      <span>Color: {item?.color}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => handleUpdateQuantity(item?.product?.id!, item!.quantity - 1)}
                          className="p-2 hover:bg-gray-100 rounded-l-lg"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-4 font-poppins font-semibold w-8 text-center">
                          {item?.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item?.product?.id!, item!.quantity + 1)}
                          className="p-2 hover:bg-gray-100 rounded-r-lg"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold font-montserrat">
                          ${((item?.product?.price || 0) * item!.quantity).toFixed(2)}
                        </p>
                        {item!.quantity > 1 && (
                          <p className="text-sm text-gray-500 font-poppins">
                            ${item?.product?.price?.toFixed(2)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-luxury p-6 sticky top-24">
              <h2 className="text-xl font-bold font-montserrat mb-6 border-b pb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 font-poppins">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping estimate</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax estimate</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6 flex items-center gap-2">
                <Badge variant="gold" size="sm">Points</Badge>
                <p className="text-sm text-yellow-800 font-poppins">
                  You'll earn <span className="font-bold">{rewardPoints}</span> points with this order.
                </p>
              </div>

              <div className="space-y-2 mb-6">
                <label htmlFor="coupon" className="text-sm font-medium font-poppins text-gray-700">Coupon Code</label>
                <div className="flex gap-2">
                  <Input id="coupon" placeholder="Enter code" icon={<Tag size={16} />} />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between text-lg font-bold font-montserrat">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Link to="/checkout">
                  <Button variant="primary" size="lg" className="w-full group">
                    Proceed to Checkout
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
