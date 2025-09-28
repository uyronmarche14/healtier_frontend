import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Truck, 
  Download,
  Eye,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample order history data
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  total: number;
  items: OrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const sampleOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 89.97,
    items: [
      {
        id: '1',
        name: 'Vitamin D3 1000IU',
        quantity: 2,
        price: 24.99,
        image: '/api/placeholder/60/60'
      },
      {
        id: '2',
        name: 'Omega-3 Fish Oil',
        quantity: 1,
        price: 34.99,
        image: '/api/placeholder/60/60'
      }
    ],
    shippingAddress: {
      street: '123 Health St',
      city: 'Wellness City',
      state: 'CA',
      zipCode: '90210'
    },
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2024-01-18'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-20',
    status: 'shipped',
    total: 156.98,
    items: [
      {
        id: '3',
        name: 'Probiotic Complex',
        quantity: 3,
        price: 29.99,
        image: '/api/placeholder/60/60'
      },
      {
        id: '4',
        name: 'Multivitamin Complete',
        quantity: 2,
        price: 33.50,
        image: '/api/placeholder/60/60'
      }
    ],
    shippingAddress: {
      street: '456 Wellness Ave',
      city: 'Health Town',
      state: 'NY',
      zipCode: '10001'
    },
    trackingNumber: 'TRK987654321',
    estimatedDelivery: '2024-01-25'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-01-22',
    status: 'processing',
    total: 67.49,
    items: [
      {
        id: '5',
        name: 'Calcium Magnesium',
        quantity: 1,
        price: 22.99,
        image: '/api/placeholder/60/60'
      },
      {
        id: '6',
        name: 'Vitamin C 1000mg',
        quantity: 2,
        price: 21.75,
        image: '/api/placeholder/60/60'
      }
    ],
    shippingAddress: {
      street: '789 Care Blvd',
      city: 'Medical District',
      state: 'TX',
      zipCode: '75001'
    }
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    date: '2024-01-10',
    status: 'cancelled',
    total: 45.99,
    items: [
      {
        id: '7',
        name: 'Iron Supplement',
        quantity: 1,
        price: 18.99,
        image: '/api/placeholder/60/60'
      },
      {
        id: '8',
        name: 'B-Complex Vitamins',
        quantity: 1,
        price: 26.99,
        image: '/api/placeholder/60/60'
      }
    ],
    shippingAddress: {
      street: '321 Health Lane',
      city: 'Supplement Valley',
      state: 'FL',
      zipCode: '33101'
    }
  }
];

const statusConfig = {
  delivered: {
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    label: 'Delivered'
  },
  shipped: {
    icon: Truck,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    label: 'Shipped'
  },
  processing: {
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    label: 'Processing'
  },
  cancelled: {
    icon: XCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    label: 'Cancelled'
  }
};

interface OrderHistoryProps {
  className?: string;
  limit?: number;
  showFilters?: boolean;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ 
  className, 
  limit,
  showFilters = true 
}) => {
  const [orders] = useState<Order[]>(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const displayOrders = limit ? filteredOrders.slice(0, limit) : filteredOrders;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: Order['status']) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <Badge className={cn(config.bgColor, config.color, 'border-0')}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const handleReorder = (order: Order) => {
    console.log('Reordering:', order.orderNumber);
    // Implement reorder logic
  };

  const handleDownloadInvoice = (order: Order) => {
    console.log('Downloading invoice for:', order.orderNumber);
    // Implement invoice download logic
  };

  const handleTrackOrder = (order: Order) => {
    console.log('Tracking order:', order.orderNumber);
    // Implement order tracking logic
  };

  if (selectedOrder) {
    return (
      <Card className={cn("w-full max-w-4xl mx-auto", className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Order Details</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedOrder(null)}
            >
              ← Back to Orders
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Order Header */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <h3 className="font-semibold">{selectedOrder.orderNumber}</h3>
              <p className="text-sm text-muted-foreground">
                Placed on {formatDate(selectedOrder.date)}
              </p>
            </div>
            {getStatusBadge(selectedOrder.status)}
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            <h4 className="font-semibold">Order Items</h4>
            {selectedOrder.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h5 className="font-medium">{item.name}</h5>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          <div className="space-y-2">
            <h4 className="font-semibold">Shipping Address</h4>
            <div className="p-3 border rounded-lg">
              <p>{selectedOrder.shippingAddress.street}</p>
              <p>
                {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-2">
            <h4 className="font-semibold">Order Summary</h4>
            <div className="p-3 border rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${selectedOrder.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(selectedOrder.total * 0.08).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${(selectedOrder.total * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleDownloadInvoice(selectedOrder)}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            {selectedOrder.status === 'delivered' && (
              <Button
                variant="outline"
                onClick={() => handleReorder(selectedOrder)}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reorder
              </Button>
            )}
            {selectedOrder.trackingNumber && (
              <Button
                onClick={() => handleTrackOrder(selectedOrder)}
              >
                <Truck className="h-4 w-4 mr-2" />
                Track Order
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full max-w-4xl mx-auto", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order History
          </CardTitle>
          {showFilters && (
            <div className="flex gap-2">
              <select
                className="px-3 py-1 border rounded-md text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Orders</option>
                <option value="delivered">Delivered</option>
                <option value="shipped">Shipped</option>
                <option value="processing">Processing</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {displayOrders.length === 0 ? (
          <div className="text-center py-8">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground">
              {statusFilter === 'all' 
                ? "You haven't placed any orders yet"
                : `No orders with ${statusFilter} status`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{order.orderNumber}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(order.date)} • {order.items.length} items
                    </p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(order.status)}
                    <p className="text-sm font-medium mt-1">
                      ${(order.total * 1.08).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mb-3">
                  {order.items.slice(0, 3).map((item) => (
                    <img
                      key={item.id}
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">
                        +{order.items.length - 3}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  {order.status === 'delivered' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadInvoice(order)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Invoice
                    </Button>
                  )}
                  {order.trackingNumber && order.status !== 'delivered' && (
                    <Button
                      size="sm"
                      onClick={() => handleTrackOrder(order)}
                    >
                      <Truck className="h-3 w-3 mr-1" />
                      Track
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderHistory;