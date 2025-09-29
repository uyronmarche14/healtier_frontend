// app/patients-dashboard/appointments/page.tsx
import { Separator } from "@/components/ui/separator";
import { AppointmentsTable } from "@/components/appointments/appointments-table";
import { AppointmentStats } from "@/components/appointments/appointment-stats-cards";
import { UpcomingAppointments } from "@/components/appointments/upcoming-appointments";
import { HealthSummary } from "@/components/appointments/health-summary";

import {
  mockAppointments,
  mockVitals,
  mockPrescriptions,
} from "@/data/appointments";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Appointments</h2>
        <p className="text-muted-foreground">
          Manage your upcoming appointments and health information.
        </p>
      </div>
      <Separator />
      
      <div className="grid gap-6">
        <AppointmentStats />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <UpcomingAppointments 
            appointments={mockAppointments}
            className="md:col-span-1 lg:col-span-4" 
          />
          <HealthSummary 
            vitals={mockVitals} 
            prescriptions={mockPrescriptions}
            className="md:col-span-1 lg:col-span-3" 
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">All Appointments</h3>
          <AppointmentsTable appointments={mockAppointments} />
        </div>
      </div>
    </div>
  );
}
