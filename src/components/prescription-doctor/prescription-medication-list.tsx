import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DoctorPrescription } from '@/types/prescription-doctor';
import { Pill, Droplets, Syringe } from 'lucide-react';

interface PrescriptionMedicationListProps {
  medications: DoctorPrescription['medications'];
  compact?: boolean;
}

export function PrescriptionMedicationList({ medications, compact = false }: PrescriptionMedicationListProps) {
  const getRouteIcon = (route: string) => {
    switch (route.toLowerCase()) {
      case 'oral':
        return <Pill className="h-4 w-4" />;
      case 'topical':
        return <Droplets className="h-4 w-4" />;
      case 'injection':
      case 'intramuscular':
      case 'intravenous':
        return <Syringe className="h-4 w-4" />;
      default:
        return <Pill className="h-4 w-4" />;
    }
  };

  if (compact) {
    return (
      <div className="space-y-1">
        {medications.slice(0, 2).map((medication) => (
          <div key={medication.id} className="flex items-center space-x-2 text-sm">
            {getRouteIcon(medication.route)}
            <span className="font-medium">{medication.name}</span>
            <span className="text-muted-foreground">{medication.dosage}</span>
          </div>
        ))}
        {medications.length > 2 && (
          <Badge variant="outline" className="text-xs">
            +{medications.length - 2} more
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {medications.map((medication) => (
        <Card key={medication.id} className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  {getRouteIcon(medication.route)}
                  <h4 className="font-semibold text-sm">{medication.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {medication.dosage}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Frequency:</span> {medication.frequency}
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span> {medication.duration}
                  </div>
                  <div>
                    <span className="font-medium">Quantity:</span> {medication.quantity} {medication.unit}
                  </div>
                  <div>
                    <span className="font-medium">Route:</span> {medication.route}
                  </div>
                </div>
                
                {medication.instructions && (
                  <div className="text-sm">
                    <span className="font-medium">Instructions:</span>
                    <p className="text-muted-foreground mt-1">{medication.instructions}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}