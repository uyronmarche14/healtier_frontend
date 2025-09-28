// app/patients-dashboard/data/sampleData.ts
import {
  Appointment,
  Subscription,
  Invoice,
  Vitals,
  Prescription,
  Notification,
  Reminder,
  HealthTip,
} from "@/types/appoinments";

export const mockAppointment: Appointment = {
  id: "appt1",
  date: "2025-10-01T10:00:00Z",
  doctor: "Dr. Maria Santos",
  specialty: "Cardiology",
};

// Exported list of appointments (scalable for multiple)
export const mockAppointments: Appointment[] = [
  mockAppointment,
  {
    id: "appt2",
    date: "2025-11-15T09:30:00Z",
    doctor: "Dr. John Cruz",
    specialty: "Dermatology",
  },
];

export const mockSubscription: Subscription = {
  id: "sub1",
  name: "Heart Wellness Package",
  status: "active",
};

export const mockInvoice: Invoice = {
  id: "inv1",
  amount: 1200,
  dueDate: "2025-10-15",
  status: "unpaid",
};

export const mockVitals: Vitals = {
  bloodPressure: "120/80",
  heartRate: 72,
  weight: 70,
};

export const mockPrescriptions: Prescription[] = [
  { id: "rx1", name: "Atorvastatin", dosage: "10mg daily" },
  { id: "rx2", name: "Metformin", dosage: "500mg twice daily" },
];

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    message: "Upcoming appointment with Dr. Maria Santos tomorrow.",
    type: "appointment",
    date: "2025-09-29",
  },
  {
    id: "n2",
    message: "Your invoice #inv1 is due soon.",
    type: "billing",
    date: "2025-09-28",
  },
];

export const mockReminders: Reminder[] = [
  { id: "r1", message: "Take your morning pill", time: "08:00 AM" },
  { id: "r2", message: "Evening walk for 30 minutes", time: "07:00 PM" },
];

export const mockHealthTips: HealthTip[] = [
  {
    id: "tip1",
    title: "Stay Hydrated",
    content: "Drink at least 8 glasses of water daily to stay healthy.",
  },
];
