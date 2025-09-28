// app/patients-dashboard/page.tsx
import OverviewCards from "@/components/appointments/OverviewCards";
import HealthSnapshot from "@/components/appointments/HealthSnapshot";
import QuickActions from "@/components/appointments/QuickActions";
import Notifications from "@/components/appointments/notifications";
import Reminders from "@/components/appointments/Reminders";
import HealthTips from "@/components/appointments/HealthTips";

import {
  mockAppointment,
  mockSubscription,
  mockInvoice,
  mockVitals,
  mockPrescriptions,
  mockNotifications,
  mockReminders,
  mockHealthTips,
} from "@/data/appointments";

export default function PatientDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Patient Dashboard</h1>

      <OverviewCards
        appointment={mockAppointment}
        invoice={mockInvoice}
      />

      <HealthSnapshot vitals={mockVitals} prescriptions={mockPrescriptions} />

      <QuickActions />

      <Notifications notifications={mockNotifications} />

      <Reminders reminders={mockReminders} />

      <HealthTips tips={mockHealthTips} />
    </div>
  );
}
