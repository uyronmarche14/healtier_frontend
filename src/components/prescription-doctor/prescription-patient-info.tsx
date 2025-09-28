import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DoctorPrescription } from '@/types/prescription-doctor';

interface PrescriptionPatientInfoProps {
  patient: {
    name: string;
    email: string;
    phone?: string;
  };
  showAvatar?: boolean;
  showDetails?: boolean;
}

export function PrescriptionPatientInfo({ 
  patient, 
  showAvatar = true, 
  showDetails = true 
}: PrescriptionPatientInfoProps) {
  const initials = patient.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex items-center space-x-3">
      {showAvatar && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-blue-100 text-blue-800 text-xs font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{patient.name}</p>
        {showDetails && (
          <div className="text-xs text-muted-foreground">
            <p>{patient.email}</p>
            {patient.phone && <p>{patient.phone}</p>}
          </div>
        )}
      </div>
    </div>
  );
}