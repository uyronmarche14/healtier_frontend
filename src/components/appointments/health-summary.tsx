import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Vitals, Prescription } from "@/types/appoinments"
import { Activity, Pill } from "lucide-react"

interface HealthSummaryProps {
  vitals: Vitals
  prescriptions: Prescription[]
  className?: string
}

export function HealthSummary({ vitals, prescriptions, className = "" }: HealthSummaryProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Health Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center">
            <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
            Vital Signs
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Blood Pressure</p>
              <p className="text-sm font-medium">{vitals.bloodPressure}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Heart Rate</p>
              <p className="text-sm font-medium">{vitals.heartRate} bpm</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Weight</p>
              <p className="text-sm font-medium">{vitals.weight} kg</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center">
            <Pill className="h-4 w-4 mr-2 text-muted-foreground" />
            Current Medications
          </h4>
          <div className="space-y-2">
            {prescriptions.map((prescription) => (
              <div 
                key={prescription.id}
                className="flex items-center justify-between rounded-md border p-2"
              >
                <div>
                  <p className="text-sm font-medium">{prescription.name}</p>
                  <p className="text-xs text-muted-foreground">{prescription.dosage}</p>
                </div>
                <div className="h-2 w-2 rounded-full bg-primary"></div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}