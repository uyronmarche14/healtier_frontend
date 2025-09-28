// app/patients-dashboard/data/interfaces.ts
export interface Appointment {
    id: string;
    date: string;
    doctor: string;
    specialty: string;
  }
  
  export interface Subscription {
    id: string;
    name: string;
    status: "active" | "expired" | "pending";
  }
  
  export interface Invoice {
    id: string;
    amount: number;
    dueDate: string;
    status: "paid" | "unpaid" | "overdue";
  }
  
  export interface Vitals {
    bloodPressure: string;
    heartRate: number;
    weight: number;
  }
  
  export interface Prescription {
    id: string;
    name: string;
    dosage: string;
  }
  
  export interface Notification {
    id: string;
    message: string;
    type: "appointment" | "billing" | "system";
    date: string;
  }
  
  export interface Reminder {
    id: string;
    message: string;
    time: string;
  }
  
  export interface HealthTip {
    id: string;
    title: string;
    content: string;
  }
  