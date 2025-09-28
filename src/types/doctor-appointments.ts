// Doctor Appointments Type Definitions
// Enhanced appointment interfaces for doctor dashboard

export type AppointmentStatus = "scheduled" | "confirmed" | "in-progress" | "completed" | "cancelled" | "no-show";
export type AppointmentPriority = "low" | "medium" | "high" | "urgent";
export type AppointmentType = "consultation" | "follow-up" | "emergency" | "routine-checkup" | "procedure";

export interface PatientBasicInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  dateOfBirth: string;
  bloodType?: string;
  allergies: string[];
  medicalHistory: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface DoctorAppointment {
  id: string;
  appointmentId: string;
  patient: PatientBasicInfo;
  
  // Appointment Details
  date: string; // ISO date string
  time: string; // HH:MM format
  duration: number; // in minutes
  type: AppointmentType;
  status: AppointmentStatus;
  priority: AppointmentPriority;
  
  // Medical Context
  reason: string;
  notes?: string;
  previousAppointment?: {
    id: string;
    date: string;
    notes: string;
  };
  
  // Clinical Data
  vitals?: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number;
    height: number;
  };
  
  // Prescriptions & Orders
  pendingPrescriptions: number;
  pendingLabOrders: number;
  pendingImagingOrders: number;
  
  // Financial
  insuranceProvider?: string;
  copay?: number;
  paymentStatus: "pending" | "paid" | "partial" | "waived";
  
  // Scheduling & Resources
  room?: string;
  provider: {
    id: string;
    name: string;
    specialty: string;
  };
  
  // Timestamps
  scheduledAt: string;
  confirmedAt?: string;
  checkedInAt?: string;
  completedAt?: string;
  
  // Flags & Alerts
  flags: {
    isNewPatient: boolean;
    hasOutstandingBalance: boolean;
    requiresFollowUp: boolean;
    hasAlerts: boolean;
    alerts?: string[];
  };
  
  // Metadata
  tags: string[];
  remindersSent: string[]; // Types of reminders sent
}

export interface AppointmentFilters {
  status?: AppointmentStatus[];
  priority?: AppointmentPriority[];
  type?: AppointmentType[];
  dateRange?: {
    start: string;
    end: string;
  };
  provider?: string[];
  searchQuery?: string;
}

export interface AppointmentStats {
  totalAppointments: number;
  scheduled: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  noShow: number;
  todayAppointments: number;
  thisWeekAppointments: number;
  urgentAppointments: number;
  newPatients: number;
  pendingPayments: number;
}

export interface AppointmentTimeSlot {
  time: string;
  available: boolean;
  appointment?: DoctorAppointment;
  reason?: string; // Why unavailable
}

export interface AppointmentSummary {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  duration: number;
  type: AppointmentType;
  status: AppointmentStatus;
  priority: AppointmentPriority;
  reason: string;
  provider: string;
  room?: string;
  flags: {
    isNewPatient: boolean;
    hasAlerts: boolean;
    requiresFollowUp: boolean;
  };
}