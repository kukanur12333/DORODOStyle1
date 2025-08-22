import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { generateMockProducts } from '../../utils/mockData';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { Award } from 'lucide-react';

interface OrderSummaryProps {
  shippingCost: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ shippingCost }) => {
  const { state } = useApp();
  const mockProducts = generateMockProducts(20);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const cartItems = state.cart.map(cartItem => {
    const product = mockProducts.find(p => p.id === cartItem.productId);
    return product ? { ...cartItem, product } : null;
  }).filter(Boolean);

  const subtotal = cartItems.reduce((total, item) => {
    return total + (item?.product?.price || 0) * item!.quantity;
  }, 0);

  const handleApplyCoupon = () => {
    // Mock coupon logic
    if (coupon.toUpperCase() === 'SAVE20') {
      setDiscount(subtotal * 0.2);
    } else {
      setDiscount(0);
    }
  };

  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shippingCost + tax;
  const rewardPointsToEarn = Math.floor(subtotal);

  return (
    <div className="bg-white rounded-2xl shadow-luxury p-8 sticky top-24">
      <h2 className="text-xl font-bold font-montserrat mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
        {cartItems.map(item => (
          <div key={`${item?.product.id}-${item?.size}-${item?.color}`} className="flex items-center gap-4">
            <div className="relative">
              <img src={item?.product.image} alt={item?.product.name} className="w-16 h-16 object-cover rounded-lg" />
              <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{item?.quantity}</span>
            </div>
            <div className="flex-1">
              <p className="font-poppins font-semibold text-sm line-clamp-1">{item?.product.name}</p>
              <p className="text-xs text-gray-500">{item?.size} / {item?.color}</p>
            </div>
            <p className="font-montserrat font-semibold">${item?.product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-6">
        <Input placeholder="Discount code" value={coupon} onChange={(e) => setCoupon(e.target.value)} className="flex-1" />
        <Button variant="outline" onClick={handleApplyCoupon}>Apply</Button>
      </div>

      <div className="space-y-3 font-poppins">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount (SAVE20)</span>
            <span className="font-medium">-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium text-gray-900">{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between text-lg font-bold font-montserrat">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-6 flex items-center gap-2">
        <Award size={18} className="text-yellow-600" />
        <p className="text-sm text-yellow-800 font-poppins">
          You'll earn <span className="font-bold">{rewardPointsToEarn}</span> loyalty points with this order.
        </p>
      </div>
    </div>
  );
};
