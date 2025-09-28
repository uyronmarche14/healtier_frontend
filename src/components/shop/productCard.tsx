import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  prescription?: boolean;
  dosage?: string;
  manufacturer?: string;
  onAddToCart?: (product: Omit<ProductCardProps, 'onAddToCart'>) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  originalPrice,
  image,
  category,
  inStock,
  prescription = false,
  dosage,
  manufacturer,
  onAddToCart,
}) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden transition-all duration-200 hover:shadow-lg">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {!inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="destructive" className="text-white">
              Out of Stock
            </Badge>
          </div>
        )}
        {discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            {discount}% OFF
          </Badge>
        )}
        {prescription && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2 bg-blue-100 text-blue-800 hover:bg-blue-200"
          >
            Rx Required
          </Badge>
        )}
      </div>

      {/* Product Header */}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-semibold line-clamp-2 flex-1">
            {name}
          </CardTitle>
          <Badge variant="outline" className="text-xs shrink-0">
            {category}
          </Badge>
        </div>
        {manufacturer && (
          <p className="text-sm text-muted-foreground">by {manufacturer}</p>
        )}
      </CardHeader>

      {/* Product Content */}
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {description}
        </p>
        {dosage && (
          <p className="text-xs text-muted-foreground mb-2">
            <span className="font-medium">Dosage:</span> {dosage}
          </p>
        )}
        
        {/* Price Section */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>

      {/* Product Footer */}
      <CardFooter className="pt-2">
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            disabled={!inStock}
          >
            View Details
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            disabled={!inStock}
            onClick={() => onAddToCart?.({
              id,
              name,
              description,
              price,
              originalPrice,
              image,
              category,
              inStock,
              prescription,
              dosage,
              manufacturer
            })}
          >
            {prescription ? 'Upload Prescription' : 'Add to Cart'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
