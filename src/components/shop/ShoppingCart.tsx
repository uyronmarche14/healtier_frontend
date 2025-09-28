import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample cart data
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  prescription?: boolean;
  dosage?: string;
  manufacturer: string;
}

interface ShoppingCartProps {
  className?: string;
  onCheckout?: () => void;
}

const sampleCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Vitamin D3 1000IU',
    price: 24.99,
    quantity: 2,
    image: '/api/placeholder/80/80',
    dosage: '1000 IU',
    manufacturer: 'HealthCorp'
  },
  {
    id: '2',
    name: 'Omega-3 Fish Oil',
    price: 34.99,
    quantity: 1,
    image: '/api/placeholder/80/80',
    prescription: true,
    dosage: '1000mg',
    manufacturer: 'PharmaCare'
  },
  {
    id: '3',
    name: 'Probiotic Complex',
    price: 29.99,
    quantity: 3,
    image: '/api/placeholder/80/80',
    dosage: '10 Billion CFU',
    manufacturer: 'BioHealth'
  }
];

export const ShoppingCart: React.FC<ShoppingCartProps> = ({ className, onCheckout }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(sampleCartItems);
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onCheckout?.();
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Card className={cn("w-full max-w-2xl mx-auto", className)}>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground text-center mb-4">
            Add some health products to get started
          </p>
          <Button>Browse Products</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Shopping Cart ({cartItems.length} items)
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            
            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.manufacturer} • {item.dosage}
                  </p>
                  {item.prescription && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      Rx Required
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        <Separator />
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          {shipping > 0 && (
            <p className="text-xs text-muted-foreground">
              Add ${(50 - subtotal).toFixed(2)} more for free shipping
            </p>
          )}
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full"
          size="lg"
          onClick={handleCheckout}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4 mr-2" />
              Proceed to Checkout
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingCart;