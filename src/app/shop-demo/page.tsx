'use client';

import React, { useState } from 'react';
import { ShoppingCart, PaymentForm, OrderHistory } from '@/components/shop';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, CreditCard, Package } from 'lucide-react';

export default function ShopDemoPage() {
  const [activeTab, setActiveTab] = useState('cart');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleCheckout = () => {
    setShowPayment(true);
  };

  const handlePaymentSuccess = (paymentData: any) => {
    console.log('Payment successful:', paymentData);
    setPaymentSuccess(true);
    setTimeout(() => {
      setShowPayment(false);
      setPaymentSuccess(false);
      setActiveTab('orders');
    }, 2000);
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
  };

  if (showPayment) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => setShowPayment(false)}
            className="mb-4"
          >
            ← Back to Cart
          </Button>
          <h1 className="text-2xl font-bold">Secure Checkout</h1>
          <p className="text-muted-foreground">
            Complete your payment securely
          </p>
        </div>

        <PaymentForm
          amount={156.95} // Sample amount from cart
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />

        {paymentSuccess && (
          <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
            <p className="text-green-800 font-medium">✅ Payment successful! Redirecting to orders...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Health Shop</h1>
        <p className="text-muted-foreground">
          Manage your cart, payments, and order history
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
          <TabsTrigger value="cart" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Cart
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

        <TabsContent value="cart" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shopping Cart</CardTitle>
            </CardHeader>
            <CardContent>
              <ShoppingCart onCheckout={handleCheckout} />
            </CardContent>
          </Card>
        </TabsContent>

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
                onPaymentSuccess={(data) => {
                  console.log('Demo payment success:', data);
                  alert('Payment processed successfully! (Demo)');
                }}
                onPaymentError={(error) => {
                  console.error('Demo payment error:', error);
                  alert('Payment failed. Please try again.');
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderHistory />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ShoppingBag className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Shopping Cart</h3>
              <p className="text-sm text-muted-foreground">Manage your items</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setActiveTab('cart')}
          >
            View Cart
          </Button>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">Payment</h3>
              <p className="text-sm text-muted-foreground">Secure checkout</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setActiveTab('payment')}
          >
            Make Payment
          </Button>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Orders</h3>
              <p className="text-sm text-muted-foreground">Track purchases</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setActiveTab('orders')}
          >
            View Orders
          </Button>
        </Card>
      </div>
    </div>
  );
}