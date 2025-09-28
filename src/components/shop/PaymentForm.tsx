import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Lock, User, Calendar, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentFormProps {
  className?: string;
  amount: number;
  onPaymentSuccess?: (paymentData: any) => void;
  onPaymentError?: (error: any) => void;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple-pay';
  name: string;
  icon: string;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    type: 'card',
    name: 'Credit/Debit Card',
    icon: '💳',
    description: 'Secure card payment'
  },
  {
    id: 'paypal',
    type: 'paypal',
    name: 'PayPal',
    icon: '🅿️',
    description: 'Pay with PayPal'
  },
  {
    id: 'apple-pay',
    type: 'apple-pay',
    name: 'Apple Pay',
    icon: '🍎',
    description: 'Pay with Apple Pay'
  }
];

export const PaymentForm: React.FC<PaymentFormProps> = ({
  className,
  amount,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    email: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBillingChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      billingAddress: {
        ...prev.billingAddress,
        [field]: value
      }
    }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const paymentResult = {
        transactionId: 'TXN' + Date.now(),
        amount: amount,
        method: selectedMethod,
        timestamp: new Date().toISOString(),
        status: 'success'
      };

      onPaymentSuccess?.(paymentResult);
    } catch (error) {
      onPaymentError?.(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Secure Payment
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>256-bit SSL encryption</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Payment Method Selection */}
        <div className="space-y-3">
          <Label>Payment Method</Label>
          <div className="grid grid-cols-1 gap-2">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                  selectedMethod === method.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50"
                )}
                onClick={() => setSelectedMethod(method.id)}
              >
                <span className="text-2xl">{method.icon}</span>
                <div className="flex-1">
                  <p className="font-medium">{method.name}</p>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2",
                    selectedMethod === method.id
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Payment Amount */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Amount to Pay</span>
            <span className="text-2xl font-bold text-primary">${amount.toFixed(2)}</span>
          </div>
        </div>

        {/* Card Payment Form */}
        {selectedMethod === 'card' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                  maxLength={19}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                  maxLength={5}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                  maxLength={4}
                  required
                />
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  value={formData.cardName}
                  onChange={(e) => handleInputChange('cardName', e.target.value)}
                  required
                />
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Billing Address</Label>
              <Input
                placeholder="Street Address"
                value={formData.billingAddress.street}
                onChange={(e) => handleBillingChange('street', e.target.value)}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="City"
                  value={formData.billingAddress.city}
                  onChange={(e) => handleBillingChange('city', e.target.value)}
                  required
                />
                <Input
                  placeholder="State"
                  value={formData.billingAddress.state}
                  onChange={(e) => handleBillingChange('state', e.target.value)}
                  required
                />
              </div>
              <Input
                placeholder="ZIP Code"
                value={formData.billingAddress.zipCode}
                onChange={(e) => handleBillingChange('zipCode', e.target.value)}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              size="lg"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Pay ${amount.toFixed(2)}
                </>
              )}
            </Button>
          </form>
        )}

        {/* PayPal and Apple Pay Placeholders */}
        {selectedMethod !== 'card' && (
          <div className="text-center py-8">
            <div className="bg-muted/20 rounded-lg p-8">
              <p className="text-muted-foreground mb-4">
                {selectedMethod === 'paypal' 
                  ? 'You will be redirected to PayPal to complete your payment'
                  : 'Apple Pay integration will be available soon'
                }
              </p>
              <Button 
                className="w-full max-w-sm"
                size="lg"
                disabled={isProcessing}
                onClick={handleSubmit}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Pay ${amount.toFixed(2)}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentForm;