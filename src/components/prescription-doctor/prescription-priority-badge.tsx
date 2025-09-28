import { Badge } from '@/components/ui/badge';
import { DoctorPrescription } from '@/types/prescription-doctor';

interface PrescriptionPriorityBadgeProps {
  priority: DoctorPrescription['priority'];
  showIcon?: boolean;
}

export function PrescriptionPriorityBadge({ priority, showIcon = true }: PrescriptionPriorityBadgeProps) {
  const getPriorityInfo = () => {
    switch (priority) {
      case 'routine':
        return { color: 'bg-blue-100 text-blue-800', icon: '📋', label: 'Routine' };
      case 'urgent':
        return { color: 'bg-orange-100 text-orange-800', icon: '⚡', label: 'Urgent' };
      case 'stat':
        return { color: 'bg-red-100 text-red-800', icon: '🚨', label: 'STAT' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: '📋', label: 'Routine' };
    }
  };

  const { color, icon, label } = getPriorityInfo();

  return (
    <Badge className={color} variant="secondary">
      {showIcon && <span className="mr-1">{icon}</span>}
      {label}
    </Badge>
  );
}