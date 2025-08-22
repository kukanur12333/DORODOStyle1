import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CreditCard, Lock, MapPin, User, ShieldCheck, ArrowLeft, Bitcoin } from 'lucide-react';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { useApp } from '../context/AppContext';
import { OrderSummary } from '../components/molecules/OrderSummary';
import { Logo } from '../components/atoms/Logo';

export const CheckoutPage: React.FC = () => {
  const { state } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    email: state.user?.email || '',
    firstName: state.user?.name.split(' ')[0] || '',
    lastName: state.user?.name.split(' ')[1] || '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const steps = [
    { id: 1, title: 'Information' },
    { id: 2, title: 'Shipping' },
    { id: 3, title: 'Payment' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle final submission
      console.log('Order submitted!', formData);
      // Here you would typically navigate to an order confirmation page
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const shippingOptions = [
    { id: 'standard', title: 'Standard Shipping', price: 0, eta: '5-7 business days' },
    { id: 'express', title: 'Express Shipping', price: 15, eta: '2-3 business days' },
  ];

  const selectedShippingCost = shippingOptions.find(opt => opt.id === shippingMethod)?.price ?? 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row font-poppins">
      {/* Left side - Form */}
      <div className="w-full lg:w-3/5 p-8 sm:p-12 lg:p-16 overflow-y-auto order-2 lg:order-1">
        <div className="max-w-xl mx-auto">
          <Link to="/" className="flex items-center gap-2 group mb-8">
            <Logo className="w-8 h-8 text-primary-black group-hover:text-primary-gold transition-colors" />
            <span className="font-montserrat font-bold text-2xl text-gray-800">DORODOStyle</span>
          </Link>
          <nav className="flex items-center text-sm mb-10">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <span className={`transition-colors ${currentStep >= step.id ? 'text-primary-black font-semibold' : 'text-gray-500'}`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && <span className="mx-2 text-gray-400">&gt;</span>}
              </React.Fragment>
            ))}
          </nav>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold font-montserrat">Contact Information</h2>
                  <p className="text-sm">
                    Already have an account? <Link to="/login" className="text-primary-gold hover:underline font-semibold">Log in</Link>
                  </p>
                </div>
                <Input label="Email address" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required icon={<User size={16} />} />
                <h2 className="text-xl font-bold font-montserrat pt-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="First name" value={formData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} required />
                  <Input label="Last name" value={formData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} required />
                </div>
                <Input label="Address" value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} required icon={<MapPin size={16} />} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="City" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} required />
                  <Input label="ZIP Code" value={formData.zipCode} onChange={(e) => handleInputChange('zipCode', e.target.value)} required />
                </div>
                <Input label="Country" value={formData.country} onChange={(e) => handleInputChange('country', e.target.value)} required />
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold font-montserrat">Shipping Method</h2>
                <div className="space-y-4">
                  {shippingOptions.map(option => (
                    <label key={option.id} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${shippingMethod === option.id ? 'border-primary-black ring-2 ring-primary-black' : 'border-gray-300'}`}>
                      <input type="radio" name="shippingMethod" value={option.id} checked={shippingMethod === option.id} onChange={(e) => setShippingMethod(e.target.value)} className="w-4 h-4 text-primary-gold focus:ring-primary-gold" />
                      <div className="ml-4 flex-1">
                        <p className="font-semibold">{option.title}</p>
                        <p className="text-sm text-gray-500">{option.eta}</p>
                      </div>
                      <p className="font-semibold">{option.price > 0 ? `$${option.price.toFixed(2)}` : 'Free'}</p>
                    </label>
                  ))}
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold font-montserrat">Payment</h2>
                <p className="text-sm text-gray-500">All transactions are secure and encrypted.</p>
                <div className="flex border border-gray-200 rounded-lg p-1 bg-gray-100">
                  {[{id: 'card', icon: <CreditCard size={16} />, label: 'Card'}, {id: 'paypal', icon: <span className="font-bold italic text-[#003087]">P</span>, label: 'PayPal'}, {id: 'crypto', icon: <Bitcoin size={16} />, label: 'Crypto'}].map(method => (
                    <button key={method.id} onClick={() => setPaymentMethod(method.id)} className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-colors capitalize flex items-center justify-center gap-2 ${paymentMethod === method.id ? 'bg-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>
                      {method.icon}
                      {method.label}
                    </button>
                  ))}
                </div>
                {paymentMethod === 'card' && (
                  <div className="space-y-4 pt-4">
                    <Input label="Card number" value={formData.cardNumber} onChange={(e) => handleInputChange('cardNumber', e.target.value)} placeholder="1234 5678 9012 3456" required icon={<CreditCard size={16} />} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Expiry date" value={formData.expiryDate} onChange={(e) => handleInputChange('expiryDate', e.target.value)} placeholder="MM/YY" required />
                      <Input label="CVV" value={formData.cvv} onChange={(e) => handleInputChange('cvv', e.target.value)} placeholder="123" required icon={<Lock size={16} />} />
                    </div>
                    <Input label="Name on card" value={formData.nameOnCard} onChange={(e) => handleInputChange('nameOnCard', e.target.value)} required />
                  </div>
                )}
                {paymentMethod === 'paypal' && (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Button variant="primary" className="bg-[#0070ba] hover:bg-[#005ea6]">Continue with PayPal</Button>
                  </div>
                )}
                {paymentMethod === 'crypto' && (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Button variant="primary">Pay with Crypto Wallet</Button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
          <div className="flex items-center justify-between mt-10">
            <button onClick={handlePrevStep} className={`flex items-center gap-2 text-sm text-gray-600 hover:text-primary-black transition-opacity ${currentStep === 1 ? 'opacity-0 cursor-default' : 'opacity-100'}`}>
              <ArrowLeft size={16} />
              Return
            </button>
            <Button variant="primary" size="lg" onClick={handleNextStep} className="group">
              {currentStep === 1 ? 'Continue to Shipping' : currentStep === 2 ? 'Continue to Payment' : 'Place Order'}
              {currentStep === 3 && <motion.span whileTap={{ scale: 1.2 }} className="ml-2">🚀</motion.span>}
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-2/5 bg-gray-100 p-8 sm:p-12 lg:p-16 order-1 lg:order-2">
        <OrderSummary shippingCost={selectedShippingCost} />
      </div>
    </div>
  );
};
