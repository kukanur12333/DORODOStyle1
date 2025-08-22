import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Plus, Minus, Share2, Award, Truck, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../components/atoms/Button';
import { Badge } from '../components/atoms/Badge';
import { LoadingSpinner } from '../components/atoms/LoadingSpinner';
import { ProductImageGallery } from '../components/organisms/ProductImageGallery';
import { ProductReviews } from '../components/organisms/ProductReviews';
import { RelatedProducts } from '../components/organisms/RelatedProducts';
import { Breadcrumb } from '../components/molecules/Breadcrumb';
import { useApp } from '../context/AppContext';
import { generateMockProducts } from '../utils/mockData';
import { Product } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useApp();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockProduct = generateMockProducts(1)[0];
      setProduct(mockProduct);
      setSelectedSize(mockProduct.sizes[0]);
      setSelectedColor(mockProduct.colors[0]);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { productId: product.id, quantity, size: selectedSize, color: selectedColor }
      });
    }
  };

  const handleToggleWishlist = () => {
    if (product) dispatch({ type: 'TOGGLE_WISHLIST', payload: product.id });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center"><p>Product not found</p></div>;
  }

  const isWishlisted = state.wishlist.includes(product.id);
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: product.category, href: '/shop' },
    { label: product.name },
  ];
  
  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'shipping', label: 'Shipping & Returns' },
  ];
  
  if (product.isAIGenerated) {
    tabs.push({ id: 'ai_story', label: 'AI Story' });
  }

  const rewardPoints = Math.floor(product.price * 0.5);

  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <ProductImageGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <div className="space-y-6">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="text-4xl font-bold font-montserrat text-gray-900 flex items-center gap-3">
              {product.name}
              {product.isAIGenerated && <Badge variant="ai">AI</Badge>}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className={i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />)}
              </div>
              <span className="text-sm text-gray-600">({product.reviews} Reviews)</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
              {product.originalPrice && <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>}
            </div>
            <p className="text-gray-600 font-poppins leading-relaxed">{product.description}</p>
            
            {/* Color Selector */}
            <div>
              <h3 className="font-montserrat font-semibold mb-2">Color: <span className="font-normal capitalize">{selectedColor}</span></h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button key={color} onClick={() => setSelectedColor(color)} className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color ? 'ring-2 ring-offset-2 ring-primary-black' : 'border-gray-300'}`} style={{ backgroundColor: color.toLowerCase() }} />
                ))}
              </div>
            </div>
            
            {/* Size Selector */}
            <div>
              <h3 className="font-montserrat font-semibold mb-2">Size: <span className="font-normal">{selectedSize}</span></h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 border rounded-lg text-sm font-poppins transition-colors ${selectedSize === size ? 'bg-primary-black text-white border-primary-black' : 'border-gray-300 hover:border-primary-black'}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center border rounded-lg">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 hover:bg-gray-100 rounded-l-lg"><Minus size={16} /></button>
                <span className="px-4 font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-3 hover:bg-gray-100 rounded-r-lg"><Plus size={16} /></button>
              </div>
              <Button variant="primary" size="lg" onClick={handleAddToCart} className="flex-1">Add To Cart</Button>
              <Button variant="outline" size="lg" onClick={handleToggleWishlist}>
                <Heart size={18} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
              </Button>
            </div>

            {/* Rewards Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-2">
              <Award size={18} className="text-yellow-600" />
              <p className="text-sm text-yellow-800 font-poppins">
                Earn <span className="font-bold">{rewardPoints}</span> loyalty points with this purchase!
              </p>
            </div>

            {/* Meta */}
            <div className="border-t pt-6 space-y-3 text-sm text-gray-600">
                <p><strong>SKU:</strong> {product.sku}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
                <div className="flex items-center gap-3">
                    <strong>Share:</strong>
                    <div className="flex items-center gap-2">
                        <a href="#" className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900"><Share2 size={16} /></a>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-20">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-4 px-1 border-b-2 font-montserrat font-medium capitalize ${activeTab === tab.id ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="py-8 prose max-w-none font-poppins">
            {activeTab === 'description' && <p>{product.description}</p>}
            {activeTab === 'reviews' && <ProductReviews productId={product.id} />}
            {activeTab === 'shipping' && (
              <div>
                <h3 className="font-montserrat font-bold text-lg mb-4">Shipping & Returns</h3>
                <p className="mb-4">We offer complimentary standard shipping on all orders over $100. Expedited and international shipping options are available at checkout.</p>
                <p>Returns are accepted within 30 days of purchase for a full refund. Items must be in original condition. Custom AI-generated pieces are final sale.</p>
              </div>
            )}
            {activeTab === 'ai_story' && (
              <div>
                <h3 className="font-montserrat font-bold text-lg mb-4 flex items-center gap-2"><Sparkles size={20} className="text-purple-500" /> The AI Story</h3>
                <p className="mb-4">This piece was uniquely generated by our advanced fashion AI. The prompt that brought this design to life was: <em className="text-gray-800">"{product.name} in a futuristic style with flowing lines and metallic accents."</em></p>
                <p>Our AI analyzed thousands of design patterns, color theories, and material properties to create a one-of-a-kind garment that blends classic elegance with futuristic vision. Each AI-generated piece is a testament to the power of human-machine collaboration in the world of luxury fashion.</p>
              </div>
            )}
          </div>
        </div>
        
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </div>
    </div>
  );
};
