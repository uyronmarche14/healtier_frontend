import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';

interface PrescriptionTimeDisplayProps {
  createdAt: Date;
  validUntil: Date;
  filledAt?: Date;
  showIcons?: boolean;
}

export function PrescriptionTimeDisplay({ 
  createdAt, 
  validUntil, 
  filledAt, 
  showIcons = true 
}: PrescriptionTimeDisplayProps) {
  const isExpired = validUntil < new Date();
  const daysUntilExpiry = Math.ceil((validUntil.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const getExpiryColor = () => {
    if (isExpired) return 'text-red-600';
    if (daysUntilExpiry <= 3) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center space-x-2">
        {showIcons && <Calendar className="h-4 w-4 text-muted-foreground" />}
        <span className="text-muted-foreground">Created:</span>
        <span className="font-medium">{format(createdAt, 'MMM d, yyyy')}</span>
      </div>
      
      <div className="flex items-center space-x-2">
        {showIcons && <Clock className="h-4 w-4 text-muted-foreground" />}
        <span className="text-muted-foreground">Valid until:</span>
        <span className={`font-medium ${getExpiryColor()}`}>
          {format(validUntil, 'MMM d, yyyy')}
          {isExpired ? ' (Expired)' : ` (${daysUntilExpiry} days)`}
        </span>
      </div>
      
      {filledAt && (
        <div className="flex items-center space-x-2">
          {showIcons && <div className="h-4 w-4 bg-green-500 rounded-full" />}
          <span className="text-muted-foreground">Filled:</span>
          <span className="font-medium text-green-600">{format(filledAt, 'MMM d, yyyy')}</span>
        </div>
      )}
    </div>
  );
}