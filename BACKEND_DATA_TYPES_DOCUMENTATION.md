# Backend Data Types Documentation

## Overview
This document provides a comprehensive overview of all data types, interfaces, and structures required for the backend development of the Healthier application. This documentation will help ensure seamless integration between frontend and backend systems.

## Core Data Structures

### Base Entity Interface
```typescript
interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}
```

## User Management

### User Types
```typescript
interface User extends BaseEntity {
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  role: 'admin' | 'doctor' | 'patient'
  metadata?: Record<string, any>
}

interface Patient extends User {
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

interface Doctor extends User {
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

interface Admin extends User {
  role: 'admin'
  permissions: string[]
  department: string
}
```

## Medical Data

### Medicine Management
```typescript
interface Medicine extends BaseEntity {
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

interface Prescription extends BaseEntity {
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

interface PrescriptionMedication {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
  quantity: number
  unit: string
  route: string // oral, topical, injection, etc.
}
```

## Appointment Management

### Appointment Types
```typescript
interface Appointment extends BaseEntity {
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

// Enhanced doctor appointment interface
type AppointmentStatus = "scheduled" | "confirmed" | "in-progress" | "completed" | "cancelled" | "no-show"
type AppointmentPriority = "low" | "medium" | "high" | "urgent"
type AppointmentType = "consultation" | "follow-up" | "emergency" | "routine-checkup" | "procedure"

interface DoctorAppointment {
  id: string
  appointmentId: string
  patient: PatientBasicInfo
  date: string // ISO date string
  time: string // HH:MM format
  duration: number // in minutes
  type: AppointmentType
  status: AppointmentStatus
  priority: AppointmentPriority
  reason: string
  notes?: string
  // ... additional fields for medical context, financial, scheduling
}
```

## Subscription Management

### Subscription Types
```typescript
interface SubscriptionPlan extends BaseEntity {
  name: string
  description: string
  type: 'monthly' | 'quarterly' | 'yearly'
  billingCycle: 'monthly' | 'quarterly' | 'yearly'
  price: number
  features: string[]
  medicines: string[] // medicine IDs
  isActive: boolean
}

interface Subscription extends BaseEntity {
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

// Enhanced subscription types
interface SubscriptionPlanWithDetails extends Omit<SubscriptionPlan, 'features'> {
  popular?: boolean
  savings?: {
    monthly: number
    yearly: number
    percentage: number
  }
  consultations: {
    included: number
    type: 'general' | 'specialist' | 'unlimited'
  }
  medicineDiscount: {
    percentage: number
    maxDiscount?: number
  }
  features: SubscriptionFeature[]
}

interface SubscriptionFeature {
  id: string
  name: string
  description: string
  included: boolean
  category: 'consultation' | 'medicine' | 'ai' | 'support' | 'storage'
  icon?: string
  value?: any
}
```

## Billing & Invoices

### Financial Types
```typescript
interface Invoice extends BaseEntity {
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

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
  type: 'medicine' | 'consultation' | 'subscription'
}

interface PaymentRecord {
  id: string
  date: Date
  amount: number
  status: 'success' | 'failed' | 'pending'
  method: 'card' | 'paypal' | 'bank_transfer'
  invoiceUrl?: string
}
```

## Chat & Messaging

### Communication Types
```typescript
interface ChatRoom extends BaseEntity {
  name: string
  type: 'direct' | 'group'
  participants: string[] // user IDs
  lastMessage?: Message
  unreadCount: number
}

interface Message extends BaseEntity {
  roomId: string
  senderId: string
  content: string
  type: 'text' | 'image' | 'file'
  isRead: boolean
  readAt?: Date
}
```

## Health & Medical Records

### Health Data Types
```typescript
interface VitalSigns extends BaseEntity {
  patientId: string
  bloodPressureSystolic: number // mmHg
  bloodPressureDiastolic: number // mmHg
  heartRate: number // bpm
  temperature: number // Celsius
  weight: number // kg
  height: number // cm
  oxygenSaturation: number // percentage
  respiratoryRate: number // breaths per minute
  notes?: string
  measuredAt: Date
  measuredBy?: 'patient' | 'doctor' | 'device'
  deviceId?: string
}

interface LabResult extends BaseEntity {
  patientId: string
  doctorId: string
  appointmentId?: string
  testName: string
  testType: 'blood' | 'urine' | 'imaging' | 'other'
  result: string
  normalRange: string
  unit: string
  isNormal: boolean
  notes?: string
  testedAt: Date
  reviewedBy?: string
  reviewedAt?: Date
}

interface HealthGoal extends BaseEntity {
  patientId: string
  type: 'weight' | 'exercise' | 'medication' | 'water' | 'sleep' | 'blood_pressure' | 'heart_rate'
  target: number
  current: number
  unit: string
  deadline?: Date
  isActive: boolean
  progress: number // percentage 0-100
  streak: number // consecutive days achieving goal
  lastAchievedAt?: Date
}
```

## AI Talks Module

### AI Integration Types
```typescript
interface AITalkMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  type?: 'text' | 'file' | 'image' | 'error'
  tab?: AITalkTab
  metadata?: {
    fileName?: string
    fileSize?: number
    fileType?: string
  }
}

interface AITalkSession {
  id: string
  title: string
  category: 'general' | 'fitness' | 'mental' | 'nutrition'
  messages: AITalkMessage[]
  createdAt: Date
  updatedAt: Date
  status: 'active' | 'archived' | 'deleted'
  patientId: string
}

interface AIInstruction {
  id: string
  name: string
  description: string
  content: string
  category: 'general' | 'fitness' | 'mental' | 'nutrition'
  isActive: boolean
  priority: number
  createdAt: Date
  updatedAt: Date
}
```

## Notifications & Alerts

### Notification Types
```typescript
interface Notification extends BaseEntity {
  userId: string
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  isRead: boolean
  readAt?: Date
  actionUrl?: string
  metadata?: Record<string, any>
}

interface HealthAlert extends BaseEntity {
  patientId: string
  type: 'vital_sign' | 'medication' | 'appointment' | 'goal' | 'emergency'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  message: string
  isRead: boolean
  readAt?: Date
  actionRequired: boolean
  actionUrl?: string
  metadata?: Record<string, any>
}
```

## Analytics & Dashboard

### Analytics Types
```typescript
interface DashboardStats {
  totalPatients: number
  totalDoctors: number
  totalAppointments: number
  totalRevenue: number
  monthlyGrowth: number
  activeSubscriptions: number
  pendingAppointments: number
  recentActivities: Activity[]
}

interface Activity {
  id: string
  type: 'patient_registered' | 'appointment_booked' | 'prescription_approved' | 'payment_received'
  title: string
  description: string
  timestamp: Date
  userId?: string
  metadata?: Record<string, any>
}

interface AppointmentStats {
  totalAppointments: number
  scheduled: number
  confirmed: number
  completed: number
  cancelled: number
  noShow: number
  todayAppointments: number
  thisWeekAppointments: number
  urgentAppointments: number
  newPatients: number
  pendingPayments: number
}
```

## API Response Structures

### Response Types
```typescript
interface ApiResponse<T> {
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

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  metadata: {
    total: number
    page: number
    limit: number
    hasMore: boolean
    totalPages: number
  }
}

interface HealthDataResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  lastSync?: Date
  nextUpdate?: Date
}
```

## Database Schema Requirements

### Required Tables
1. **Users Table** - Stores all user information with role-based access
2. **Patients Table** - Extended user information for patients
3. **Doctors Table** - Extended user information for doctors
4. **Medicines Table** - Product catalog and inventory
5. **Prescriptions Table** - Doctor prescriptions and medication orders
6. **Appointments Table** - Scheduling and appointment management
7. **Subscriptions Table** - Subscription plans and user subscriptions
8. **Invoices Table** - Billing and payment records
9. **ChatRooms Table** - Messaging and communication channels
10. **Messages Table** - Individual chat messages
11. **VitalSigns Table** - Health metrics and measurements
12. **LabResults Table** - Medical test results
13. **HealthGoals Table** - Patient health objectives
14. **Notifications Table** - System notifications and alerts
15. **AITalks Table** - AI conversation sessions and messages

### Foreign Key Relationships
- Users ↔ Patients/Doctors (one-to-one)
- Patients ↔ Prescriptions (one-to-many)
- Doctors ↔ Prescriptions (one-to-many)
- Patients ↔ Appointments (one-to-many)
- Doctors ↔ Appointments (one-to-many)
- Patients ↔ Subscriptions (one-to-many)
- Subscriptions ↔ Invoices (one-to-many)
- Patients ↔ VitalSigns (one-to-many)
- Patients ↔ LabResults (one-to-many)

## API Endpoints Required

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Token refresh
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password` - Password reset

### User Management Endpoints
- `GET /users` - Get all users (admin only)
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user (admin only)
- `GET /patients` - Get all patients
- `GET /patients/:id` - Get patient details
- `GET /doctors` - Get all doctors
- `GET /doctors/:id` - Get doctor details

### Medical Data Endpoints
- `GET /medicines` - Get medicine catalog
- `GET /medicines/:id` - Get medicine details
- `POST /prescriptions` - Create prescription
- `GET /prescriptions` - Get prescriptions
- `GET /prescriptions/:id` - Get prescription details
- `PUT /prescriptions/:id` - Update prescription status

### Appointment Endpoints
- `GET /appointments` - Get appointments
- `POST /appointments` - Create appointment
- `GET /appointments/:id` - Get appointment details
- `PUT /appointments/:id` - Update appointment
- `DELETE /appointments/:id` - Cancel appointment
- `GET /appointments/doctor/:id` - Get doctor appointments
- `GET /appointments/patient/:id` - Get patient appointments

### Subscription Endpoints
- `GET /subscriptions/plans` - Get subscription plans
- `GET /subscriptions` - Get user subscriptions
- `POST /subscriptions` - Create subscription
- `PUT /subscriptions/:id` - Update subscription
- `DELETE /subscriptions/:id` - Cancel subscription
- `GET /subscriptions/:id/usage` - Get subscription usage

### Billing Endpoints
- `GET /invoices` - Get invoices
- `GET /invoices/:id` - Get invoice details
- `POST /invoices` - Create invoice
- `PUT /invoices/:id` - Update invoice status
- `GET /payments` - Get payment history
- `POST /payments` - Process payment

### Health Data Endpoints
- `GET /vitals/:patientId` - Get vital signs
- `POST /vitals` - Record vital signs
- `GET /lab-results/:patientId` - Get lab results
- `POST /lab-results` - Upload lab results
- `GET /health-goals/:patientId` - Get health goals
- `POST /health-goals` - Create health goal

### Chat Endpoints
- `GET /chat/rooms` - Get chat rooms
- `POST /chat/rooms` - Create chat room
- `GET /chat/rooms/:id/messages` - Get messages
- `POST /chat/rooms/:id/messages` - Send message
- `PUT /chat/messages/:id/read` - Mark message as read

### AI Talks Endpoints
- `GET /ai-talks/sessions` - Get AI sessions
- `POST /ai-talks/sessions` - Create AI session
- `GET /ai-talks/sessions/:id/messages` - Get AI messages
- `POST /ai-talks/sessions/:id/messages` - Send AI message
- `POST /ai-talks/analyze` - Analyze health data

### Notification Endpoints
- `GET /notifications` - Get notifications
- `PUT /notifications/:id/read` - Mark notification as read
- `DELETE /notifications/:id` - Delete notification

## Security Considerations

### Row-Level Security (RLS)
- Patients can only access their own data
- Doctors can access their patients' data
- Admins have full access to all data
- Prescription access controlled by patient/doctor relationships
- Appointment visibility based on participant roles

### Data Validation
- All input should be validated using Zod schemas
- Role-based access control for all endpoints
- Input sanitization to prevent XSS attacks
- Rate limiting on authentication endpoints
- CORS configuration for frontend-backend communication

## Environment Variables Required

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/healthier_db

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# OpenAI
OPENAI_API_KEY=sk-...

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Storage
S3_BUCKET_NAME=healthier-storage
S3_REGION=us-east-1
S3_ACCESS_KEY=your-access-key
S3_SECRET_KEY=your-secret-key
```

## Error Handling

### Standard Error Responses
```typescript
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {
    // Additional error details
  }
}
```

### Common Error Codes
- `AUTH_INVALID_CREDENTIALS` - Invalid login credentials
- `AUTH_UNAUTHORIZED` - User not authenticated
- `AUTH_FORBIDDEN` - User lacks permissions
- `VALIDATION_ERROR` - Input validation failed
- `NOT_FOUND` - Resource not found
- `DATABASE_ERROR` - Database operation failed
- `STRIPE_ERROR` - Payment processing error
- `AI_SERVICE_ERROR` - AI service unavailable

## Testing Requirements

### Test Coverage
- Unit tests for all services and utilities
- Integration tests for API endpoints
- E2E tests for critical user flows
- Load testing for high-traffic endpoints
- Security testing for authentication and authorization

### Test Data
- Mock user data for different roles
- Sample medical records and prescriptions
- Test subscription plans and invoices
- Chat message test data
- Health metric test data

## Deployment Checklist

### Backend Requirements
- Node.js 18+ runtime
- PostgreSQL 14+ database
- Redis for caching (optional)
- Proper environment configuration
- SSL certificate for production
- Database backups configured
- Monitoring and logging setup

### Frontend Integration
- CORS properly configured
- API base URL environment variable
- Authentication token handling
- Error handling and retry logic
- Real-time updates via WebSocket
- File upload support for prescriptions

## Versioning

### API Versioning
- Use URL versioning: `/api/v1/endpoint`
- Maintain backward compatibility
- Document breaking changes
- Provide migration guides for major versions

This comprehensive documentation should serve as the foundation for backend development and ensure seamless integration with the existing frontend application.