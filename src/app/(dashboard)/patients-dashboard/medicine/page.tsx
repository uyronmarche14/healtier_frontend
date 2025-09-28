'use client';

import React, { useState } from 'react';
import ProductCard from '@/components/shop/productCard';
import { ShoppingCart } from '@/components/shop/ShoppingCart';
import { PaymentForm } from '@/components/shop/PaymentForm';
import { OrderHistory } from '@/components/shop/OrderHistory';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, CreditCard, Package, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  prescription: boolean;
  dosage: string;
  manufacturer: string;
}



export default function MedicineShopPage() {
  const [activeTab, setActiveTab] = useState('products');
  const [showCartModal, setShowCartModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Enhanced sample medicine data
  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'Paracetamol 500mg',
      description: 'Pain relief and fever reducer tablets. Suitable for adults and children over 12 years.',
      price: 12.99,
      originalPrice: 15.99,
      image: 'https://via.placeholder.com/300x300?text=Paracetamol',
      category: 'Pain Relief',
      inStock: true,
      prescription: false,
      dosage: '500mg tablets',
      manufacturer: 'PharmaCorp',
    },
    {
      id: '2',
      name: 'Amoxicillin 250mg',
      description: 'Antibiotic medication for bacterial infections. Prescription required.',
      price: 28.50,
      image: 'https://via.placeholder.com/300x300?text=Amoxicillin',
      category: 'Antibiotics',
      inStock: true,
      prescription: true,
      dosage: '250mg capsules',
      manufacturer: 'MediPharm',
    },
    {
      id: '3',
      name: 'Vitamin D3 1000 IU',
      description: 'Daily vitamin supplement to support bone health and immune system.',
      price: 18.99,
      originalPrice: 24.99,
      image: 'https://via.placeholder.com/300x300?text=Vitamin+D3',
      category: 'Vitamins',
      inStock: false,
      prescription: false,
      dosage: '1000 IU soft gels',
      manufacturer: 'VitaLife',
    },
    {
      id: '4',
      name: 'Ibuprofen 400mg',
      description: 'Anti-inflammatory pain reliever for headaches, muscle pain, and arthritis.',
      price: 16.75,
      image: 'https://via.placeholder.com/300x300?text=Ibuprofen',
      category: 'Pain Relief',
      inStock: true,
      prescription: false,
      dosage: '400mg tablets',
      manufacturer: 'HealthPlus',
    },
    {
      id: '5',
      name: 'Lisinopril 10mg',
      description: 'ACE inhibitor for treating high blood pressure and heart failure.',
      price: 24.99,
      originalPrice: 29.99,
      image: 'https://via.placeholder.com/300x300?text=Lisinopril',
      category: 'Heart Health',
      inStock: true,
      prescription: true,
      dosage: '10mg tablets',
      manufacturer: 'CardioMed',
    },
    {
      id: '6',
      name: 'Multivitamin Complex',
      description: 'Complete daily multivitamin with essential nutrients and minerals.',
      price: 22.50,
      image: 'https://via.placeholder.com/300x300?text=Multivitamin',
      category: 'Vitamins',
      inStock: true,
      prescription: false,
      dosage: 'Daily tablets',
      manufacturer: 'VitaLife',
    },
    {
      id: '7',
      name: 'Metformin 500mg',
      description: 'Diabetes medication to help control blood sugar levels.',
      price: 32.99,
      image: 'https://via.placeholder.com/300x300?text=Metformin',
      category: 'Diabetes',
      inStock: true,
      prescription: true,
      dosage: '500mg tablets',
      manufacturer: 'DiabetesCare',
    },
    {
      id: '8',
      name: 'Omeprazole 20mg',
      description: 'Proton pump inhibitor for acid reflux and stomach ulcers.',
      price: 19.99,
      originalPrice: 25.99,
      image: 'https://via.placeholder.com/300x300?text=Omeprazole',
      category: 'Digestive Health',
      inStock: true,
      prescription: false,
      dosage: '20mg capsules',
      manufacturer: 'GastroMed',
    },
  ];

  // Filter and sort products
  const filteredProducts = sampleProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // Cart functions
  const addToCart = (product: Product) => {
    // Open the cart modal when adding items
    setShowCartModal(true);
  };



  const categories = ['all', ...Array.from(new Set(sampleProducts.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Medicine Shop</h1>
              <p className="text-gray-600 mt-2">Browse our selection of quality medicines and health products</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowCartModal(true)}
              className="relative"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Orders
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Search & Filter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search medicines..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                      <SelectItem value="price-low">Price (Low to High)</SelectItem>
                      <SelectItem value="price-high">Price (High to Low)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  category={product.category}
                  inStock={product.inStock}
                  prescription={product.prescription}
                  dosage={product.dosage}
                  manufacturer={product.manufacturer}
                  onAddToCart={() => addToCart(product)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Demo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  This is a demo of the payment form. In a real application, 
                  this would integrate with Stripe or another payment processor.
                </p>
                <PaymentForm
                  amount={99.99}
                  onPaymentSuccess={() => {
                    console.log('Payment successful');
                    setActiveTab('orders');
                  }}
                  onPaymentError={(error) => {
                    console.error('Payment failed:', error);
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <OrderHistory />
          </TabsContent>
        </Tabs>
      </div>

      {/* Shopping Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Shopping Cart</h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowCartModal(false)}
                  className="p-1"
                >
                  ×
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <ShoppingCart
                onCheckout={() => {
                  setShowCartModal(false);
                  setShowPaymentModal(true);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Secure Checkout</h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowPaymentModal(false)}
                  className="p-1"
                >
                  ×
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <PaymentForm
                amount={99.99}
                onPaymentSuccess={() => {
                  console.log('Payment successful');
                  setShowPaymentModal(false);
                  setActiveTab('orders');
                }}
                onPaymentError={(error) => {
                  console.error('Payment failed:', error);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
