import { Patient, DashboardStats, Activity } from '@/types/data.types'

export const samplePatients: Patient[] = [
  {
    id: 'patient-001',
    email: 'john.doe@email.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'patient',
    createdAt: new Date('2023-01-15T10:30:00Z'),
    updatedAt: new Date('2024-01-10T14:20:00Z'),
    isActive: true,
    dateOfBirth: new Date('1985-03-15T00:00:00Z'),
    bloodType: 'A+',
    allergies: ['Penicillin', 'Shellfish'],
    medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
    emergencyContact: {
      name: 'Jane Doe',
      phone: '+1 (555) 987-6543',
      relationship: 'Spouse'
    },
    insurance: {
      provider: 'Blue Cross Blue Shield',
      policyNumber: 'BC123456789',
      groupNumber: 'GRP001'
    }
  },
  {
    id: 'patient-002',
    email: 'sarah.johnson@email.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face',
    role: 'patient',
    createdAt: new Date('2023-02-20T09:15:00Z'),
    updatedAt: new Date('2024-01-12T16:45:00Z'),
    isActive: true,
    dateOfBirth: new Date('1990-07-22T00:00:00Z'),
    bloodType: 'O-',
    allergies: ['Latex'],
    medicalHistory: ['Asthma'],
    emergencyContact: {
      name: 'Michael Johnson',
      phone: '+1 (555) 876-5432',
      relationship: 'Brother'
    },
    insurance: {
      provider: 'Aetna',
      policyNumber: 'AET987654321',
      groupNumber: 'GRP002'
    }
  },
  {
    id: 'patient-003',
    email: 'robert.brown@email.com',
    firstName: 'Robert',
    lastName: 'Brown',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'patient',
    createdAt: new Date('2023-03-10T14:20:00Z'),
    updatedAt: new Date('2024-01-08T11:30:00Z'),
    isActive: true,
    dateOfBirth: new Date('1978-11-08T00:00:00Z'),
    bloodType: 'B+',
    allergies: [],
    medicalHistory: ['High Cholesterol'],
    emergencyContact: {
      name: 'Mary Brown',
      phone: '+1 (555) 765-4321',
      relationship: 'Wife'
    },
    insurance: {
      provider: 'UnitedHealthcare',
      policyNumber: 'UHC567890123',
      groupNumber: 'GRP003'
    }
  },
  {
    id: 'patient-004',
    email: 'emily.davis@email.com',
    firstName: 'Emily',
    lastName: 'Davis',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'patient',
    createdAt: new Date('2023-04-05T11:45:00Z'),
    updatedAt: new Date('2024-01-14T13:20:00Z'),
    isActive: true,
    dateOfBirth: new Date('1995-12-03T00:00:00Z'),
    bloodType: 'AB+',
    allergies: ['Pollen', 'Dust'],
    medicalHistory: ['Seasonal Allergies'],
    emergencyContact: {
      name: 'David Davis',
      phone: '+1 (555) 654-3210',
      relationship: 'Father'
    },
    insurance: {
      provider: 'Kaiser Permanente',
      policyNumber: 'KP1122334455',
      groupNumber: 'GRP004'
    }
  },
  {
    id: 'patient-005',
    email: 'michael.wilson@email.com',
    firstName: 'Michael',
    lastName: 'Wilson',
    phone: '+1 (555) 567-8901',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    role: 'patient',
    createdAt: new Date('2023-05-12T08:30:00Z'),
    updatedAt: new Date('2024-01-11T15:10:00Z'),
    isActive: false, // Inactive patient for testing
    dateOfBirth: new Date('1982-06-15T00:00:00Z'),
    bloodType: 'O+',
    allergies: ['Sulfa drugs'],
    medicalHistory: ['Gout'],
    emergencyContact: {
      name: 'Lisa Wilson',
      phone: '+1 (555) 543-2109',
      relationship: 'Sister'
    },
    insurance: {
      provider: 'Cigna',
      policyNumber: 'CIG9988776655',
      groupNumber: 'GRP005'
    }
  }
]

export const sampleDashboardStats: DashboardStats = {
  totalPatients: 1247,
  totalDoctors: 23,
  totalAppointments: 156,
  totalRevenue: 45231,
  monthlyGrowth: 12.5,
  activeSubscriptions: 89,
  pendingAppointments: 24,
  recentActivities: [
    {
      id: 'activity-001',
      type: 'patient_registered',
      title: 'New Patient Registered',
      description: 'John Doe registered as a new patient',
      timestamp: new Date('2024-01-15T10:30:00Z')
    },
    {
      id: 'activity-002',
      type: 'appointment_booked',
      title: 'Appointment Booked',
      description: 'Sarah Johnson booked an appointment with Dr. Smith',
      timestamp: new Date('2024-01-15T09:15:00Z')
    },
    {
      id: 'activity-003',
      type: 'prescription_approved',
      title: 'Prescription Approved',
      description: 'Dr. Brown approved prescription for Robert Wilson',
      timestamp: new Date('2024-01-15T08:45:00Z')
    },
    {
      id: 'activity-004',
      type: 'payment_received',
      title: 'Payment Received',
      description: 'Payment of $245 received from Emily Davis',
      timestamp: new Date('2024-01-15T07:20:00Z')
    }
  ]
}

// Helper functions for data manipulation
export const getActivePatients = () => samplePatients.filter(patient => patient.isActive)

export const getPatientsByBloodType = (bloodType: string) => 
  samplePatients.filter(patient => patient.bloodType === bloodType)

export const getPatientsWithAllergies = () => 
  samplePatients.filter(patient => patient.allergies && patient.allergies.length > 0)

export const searchPatients = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return samplePatients.filter(patient => 
    patient.firstName.toLowerCase().includes(lowercaseQuery) ||
    patient.lastName.toLowerCase().includes(lowercaseQuery) ||
    patient.email.toLowerCase().includes(lowercaseQuery) ||
    patient.phone?.includes(query)
  )
}

export const getPatientById = (id: string) => 
  samplePatients.find(patient => patient.id === id)

export const getRecentPatients = (limit: number = 5) => 
  samplePatients
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit)