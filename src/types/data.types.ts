// Base interfaces for scalable data structure

export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

// User interfaces
export interface User extends BaseEntity {
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  role: 'admin' | 'doctor' | 'patient'
  metadata?: Record<string, any>
}

export interface Patient extends User {
  role: 'patient'
  dateOfBirth: Date
  bloodType?: string
  allergies?: string[]
  medicalHistory?: string[]
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
  insurance?: {
    provider: string
    policyNumber: string
    groupNumber?: string
  }
}

export interface Doctor extends User {
  role: 'doctor'
  specialization: string
  licenseNumber: string
  yearsOfExperience: number
  education: string[]
  certifications: string[]
  availability: {
    days: string[]
    hours: {
      start: string
      end: string
    }
  }
  rating: number
  totalReviews: number
  availabilityStatus?: 'available' | 'busy' | 'unavailable'
}

export interface Admin extends User {
  role: 'admin'
  permissions: string[]
  department: string
}

// Medical interfaces
export interface Medicine extends BaseEntity {
  name: string
  genericName: string
  brand: string
  category: string
  description: string
  dosage: string
  form: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'topical'
  strength: string
  price: number
  stock: number
  requiresPrescription: boolean
  sideEffects?: string[]
  contraindications?: string[]
  image?: string
  isAvailable: boolean
}

export interface Prescription extends BaseEntity {
  patientId: string
  doctorId: string
  medicineId: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  refillsRemaining: number
}

// Appointment interfaces
export interface Appointment extends BaseEntity {
  patientId: string
  doctorId: string
  date: Date
  time: string
  duration: number // in minutes
  type: 'consultation' | 'follow-up' | 'emergency' | 'routine'
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
  notes?: string
  symptoms?: string[]
  diagnosis?: string
  treatment?: string
}

// Subscription interfaces
export interface SubscriptionPlan extends BaseEntity {
  name: string
  description: string
  type: 'monthly' | 'quarterly' | 'yearly'
  billingCycle: 'monthly' | 'quarterly' | 'yearly'
  price: number
  features: string[]
  medicines: string[] // medicine IDs
  isActive: boolean
}

export interface Subscription extends BaseEntity {
  patientId: string
  planId: string
  status: 'active' | 'paused' | 'cancelled' | 'expired'
  startDate: Date
  endDate: Date
  autoRenew: boolean
  paymentMethod: string
  totalAmount: number
  billingCycle: 'monthly' | 'quarterly' | 'yearly'
  stripeSubscriptionId?: string
  stripeCustomerId?: string
  price: number
  cancelledAt?: Date
}

// Billing interfaces
export interface Invoice extends BaseEntity {
  patientId: string
  subscriptionId?: string
  appointmentId?: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  status: 'pending' | 'paid' | 'overdue' | 'cancelled'
  dueDate: Date
  paidDate?: Date
  paymentMethod?: string
  stripeInvoiceId?: string
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
  type: 'medicine' | 'consultation' | 'subscription'
}

// Chat interfaces
export interface ChatRoom extends BaseEntity {
  name: string
  type: 'direct' | 'group'
  participants: string[] // user IDs
  lastMessage?: Message
  unreadCount: number
}

export interface Message extends BaseEntity {
  roomId: string
  senderId: string
  content: string
  type: 'text' | 'image' | 'file'
  isRead: boolean
  readAt?: Date
}

// Notification interfaces
export interface Notification extends BaseEntity {
  userId: string
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  isRead: boolean
  readAt?: Date
  actionUrl?: string
  metadata?: Record<string, any>
}

// Analytics interfaces
export interface DashboardStats {
  totalPatients: number
  totalDoctors: number
  totalAppointments: number
  totalRevenue: number
  monthlyGrowth: number
  activeSubscriptions: number
  pendingAppointments: number
  recentActivities: Activity[]
}

export interface Activity {
  id: string
  type: 'patient_registered' | 'appointment_booked' | 'prescription_approved' | 'payment_received'
  title: string
  description: string
  timestamp: Date
  userId?: string
  metadata?: Record<string, any>
}

// API Response interfaces
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  metadata?: {
    total?: number
    page?: number
    limit?: number
    hasMore?: boolean
  }
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  metadata: {
    total: number
    page: number
    limit: number
    hasMore: boolean
    totalPages: number
  }
}