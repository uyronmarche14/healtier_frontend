import { Badge } from '@/components/ui/badge';
import { DoctorPrescription } from '@/types/prescription-doctor';

interface PrescriptionStatusBadgeProps {
  status: DoctorPrescription['status'];
  showIcon?: boolean;
}

export function PrescriptionStatusBadge({ status, showIcon = true }: PrescriptionStatusBadgeProps) {
  return (
    <Badge className={status.color} variant="secondary">
      {showIcon && (
        <span className="mr-1">
          {status.name === 'draft' && '📝'}
          {status.name === 'pending' && '⏳'}
          {status.name === 'filled' && '✅'}
          {status.name === 'partially_filled' && '🔄'}
          {status.name === 'cancelled' && '❌'}
          {status.name === 'expired' && '⚠️'}
        </span>
      )}
      {status.label}
    </Badge>
  );
}