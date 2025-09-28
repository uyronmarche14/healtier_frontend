// Doctor Appointments Mock Data
// Comprehensive mock data for doctor appointments dashboard

import { 
  DoctorAppointment, 
  AppointmentStats, 
  AppointmentStatus, 
  AppointmentPriority, 
  AppointmentType 
} from '@/types/doctor-appointments';

// Sample patients data (extended from existing patient data)
const patients = [
  {
    id: 'patient-001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: '1985-03-15',
    bloodType: 'A+',
    allergies: ['Penicillin', 'Shellfish'],
    medicalHistory: ['Hypertension', 'Diabetes Type 2'],
    emergencyContact: {
      name: 'Jane Doe',
      phone: '+1 (555) 123-4568',
      relationship: 'Spouse'
    }
  },
  {
    id: 'patient-002',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: '1992-07-22',
    bloodType: 'O-',
    allergies: ['Latex'],
    medicalHistory: ['Asthma'],
    emergencyContact: {
      name: 'Robert Johnson',
      phone: '+1 (555) 234-5679',
      relationship: 'Father'
    }
  },
  {
    id: 'patient-003',
    firstName: 'Michael',
    lastName: 'Williams',
    email: 'michael.williams@email.com',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: '1978-11-08',
    bloodType: 'B+',
    allergies: [],
    medicalHistory: ['High Cholesterol'],
    emergencyContact: {
      name: 'Lisa Williams',
      phone: '+1 (555) 345-6790',
      relationship: 'Wife'
    }
  },
  {
    id: 'patient-004',
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily.brown@email.com',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: '1995-05-30',
    bloodType: 'A-',
    allergies: ['Pollen', 'Dust'],
    medicalHistory: ['Seasonal Allergies'],
    emergencyContact: {
      name: 'David Brown',
      phone: '+1 (555) 456-7891',
      relationship: 'Brother'
    }
  },
  {
    id: 'patient-005',
    firstName: 'David',
    lastName: 'Davis',
    email: 'david.davis@email.com',
    phone: '+1 (555) 567-8901',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: '1982-09-14',
    bloodType: 'AB+',
    allergies: ['Sulfa Drugs'],
    medicalHistory: ['Arthritis', 'Gout'],
    emergencyContact: {
      name: 'Maria Davis',
      phone: '+1 (555) 567-8902',
      relationship: 'Wife'
    }
  },
  {
    id: 'patient-006',
    firstName: 'Lisa',
    lastName: 'Miller',
    email: 'lisa.miller@email.com',
    phone: '+1 (555) 678-9012',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: '1988-12-03',
    bloodType: 'O+',
    allergies: ['Bee Stings'],
    medicalHistory: ['Anxiety', 'Depression'],
    emergencyContact: {
      name: 'James Miller',
      phone: '+1 (555) 678-9013',
      relationship: 'Husband'
    }
  },
  {
    id: 'patient-007',
    firstName: 'Robert',
    lastName: 'Wilson',
    email: 'robert.wilson@email.com',
    phone: '+1 (555) 789-0123',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: '1975-02-18',
    bloodType: 'A+',
    allergies: ['Peanuts'],
    medicalHistory: ['Heart Disease'],
    emergencyContact: {
      name: 'Susan Wilson',
      phone: '+1 (555) 789-0124',
      relationship: 'Wife'
    }
  },
  {
    id: 'patient-008',
    firstName: 'Jennifer',
    lastName: 'Taylor',
    email: 'jennifer.taylor@email.com',
    phone: '+1 (555) 890-1234',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: '1990-08-25',
    bloodType: 'B-',
    allergies: ['Shellfish', 'Tree Nuts'],
    medicalHistory: ['Migraine'],
    emergencyContact: {
      name: 'Kevin Taylor',
      phone: '+1 (555) 890-1235',
      relationship: 'Husband'
    }
  }
];

// Mock appointments data
export const mockDoctorAppointments: DoctorAppointment[] = [
  // Today's Appointments
  {
    id: 'appt-001',
    appointmentId: 'APT-2024-001',
    patient: patients[0],
    date: '2024-02-15',
    time: '09:00',
    duration: 30,
    type: 'follow-up',
    status: 'confirmed',
    priority: 'medium',
    reason: 'Diabetes management review - 3 month follow-up',
    notes: 'Patient reports good adherence to medication. A1C improved from 8.2 to 7.1. Continue current regimen.',
    previousAppointment: {
      id: 'appt-prev-001',
      date: '2023-11-15',
      notes: 'A1C elevated at 8.2%, adjusted metformin dosage'
    },
    vitals: {
      bloodPressure: '130/85',
      heartRate: 72,
      temperature: 98.6,
      weight: 185,
      height: 70
    },
    pendingPrescriptions: 1,
    pendingLabOrders: 2,
    pendingImagingOrders: 0,
    insuranceProvider: 'Blue Cross Blue Shield',
    copay: 25,
    paymentStatus: 'paid',
    room: 'Room 101',
    provider: {
      id: 'dr-smith',
      name: 'Dr. Sarah Smith',
      specialty: 'Internal Medicine'
    },
    scheduledAt: '2024-01-20T10:30:00Z',
    confirmedAt: '2024-02-14T08:15:00Z',
    tags: ['diabetes', 'follow-up', 'chronic'],
    remindersSent: ['email', 'sms'],
    flags: {
      isNewPatient: false,
      hasOutstandingBalance: false,
      requiresFollowUp: true,
      hasAlerts: false,
      alerts: []
    }
  },
  {
    id: 'appt-002',
    appointmentId: 'APT-2024-002',
    patient: patients[1],
    date: '2024-02-15',
    time: '09:30',
    duration: 45,
    type: 'consultation',
    status: 'scheduled',
    priority: 'high',
    reason: 'Severe asthma exacerbation - urgent consultation',
    notes: 'Patient experiencing increased wheezing and shortness of breath. Peak flow decreased.',
    pendingPrescriptions: 2,
    pendingLabOrders: 1,
    pendingImagingOrders: 1,
    insuranceProvider: 'Aetna',
    copay: 35,
    paymentStatus: 'pending',
    room: 'Room 102',
    provider: {
      id: 'dr-johnson',
      name: 'Dr. Michael Johnson',
      specialty: 'Pulmonology'
    },
    scheduledAt: '2024-02-13T14:20:00Z',
    tags: ['asthma', 'urgent', 'respiratory'],
    remindersSent: ['email'],
    flags: {
      isNewPatient: false,
      hasOutstandingBalance: false,
      requiresFollowUp: true,
      hasAlerts: true,
      alerts: ['High priority appointment', 'Respiratory symptoms']
    }
  },
  {
    id: 'appt-003',
    appointmentId: 'APT-2024-003',
    patient: patients[2],
    date: '2024-02-15',
    time: '10:15',
    duration: 20,
    type: 'routine-checkup',
    status: 'confirmed',
    priority: 'low',
    reason: 'Annual cholesterol screening and wellness check',
    notes: 'Routine follow-up for cholesterol management. Patient reports good compliance with statin therapy.',
    previousAppointment: {
      id: 'appt-prev-003',
      date: '2023-08-15',
      notes: 'LDL slightly elevated at 135 mg/dL, increased simvastatin to 40mg daily'
    },
    pendingPrescriptions: 0,
    pendingLabOrders: 1,
    pendingImagingOrders: 0,
    insuranceProvider: 'United Healthcare',
    copay: 0,
    paymentStatus: 'paid',
    room: 'Room 103',
    provider: {
      id: 'dr-williams',
      name: 'Dr. Jennifer Williams',
      specialty: 'Family Medicine'
    },
    scheduledAt: '2024-01-25T09:45:00Z',
    confirmedAt: '2024-02-14T16:30:00Z',
    tags: ['cholesterol', 'routine', 'wellness'],
    remindersSent: ['email', 'sms', 'phone'],
    flags: {
      isNewPatient: false,
      hasOutstandingBalance: false,
      requiresFollowUp: false,
      hasAlerts: false,
      alerts: []
    }
  },
  // Tomorrow's Appointments
  {
    id: 'appt-004',
    appointmentId: 'APT-2024-004',
    patient: patients[3],
    date: '2024-02-16',
    time: '08:00',
    duration: 60,
    type: 'consultation',
    status: 'scheduled',
    priority: 'medium',
    reason: 'New patient consultation - seasonal allergy management',
    notes: 'New patient referral from urgent care for persistent allergy symptoms.',
    pendingPrescriptions: 0,
    pendingLabOrders: 0,
    pendingImagingOrders: 0,
    insuranceProvider: 'Cigna',
    copay: 30,
    paymentStatus: 'pending',
    room: 'Room 104',
    provider: {
      id: 'dr-brown',
      name: 'Dr. Patricia Brown',
      specialty: 'Allergy & Immunology'
    },
    scheduledAt: '2024-02-10T11:00:00Z',
    tags: ['new-patient', 'allergies', 'consultation'],
    remindersSent: ['email', 'sms'],
    flags: {
      isNewPatient: true,
      hasOutstandingBalance: false,
      requiresFollowUp: false,
      hasAlerts: false,
      alerts: []
    }
  },
  {
    id: 'appt-005',
    appointmentId: 'APT-2024-005',
    patient: patients[4],
    date: '2024-02-16',
    time: '11:30',
    duration: 30,
    type: 'follow-up',
    status: 'confirmed',
    priority: 'high',
    reason: 'Arthritis flare-up management and gout prevention',
    notes: 'Increased joint pain in hands and knees. Uric acid levels elevated.',
    previousAppointment: {
      id: 'appt-prev-005',
      date: '2024-01-20',
      notes: 'Started on allopurinol 100mg daily, NSAID for flare management'
    },
    vitals: {
      bloodPressure: '145/90',
      heartRate: 85,
      temperature: 99.1,
      weight: 195,
      height: 68
    },
    pendingPrescriptions: 3,
    pendingLabOrders: 2,
    pendingImagingOrders: 1,
    insuranceProvider: 'Medicare',
    copay: 20,
    paymentStatus: 'paid',
    room: 'Room 105',
    provider: {
      id: 'dr-davis',
      name: 'Dr. Robert Davis',
      specialty: 'Rheumatology'
    },
    scheduledAt: '2024-01-30T14:15:00Z',
    confirmedAt: '2024-02-13T10:45:00Z',
    tags: ['arthritis', 'gout', 'pain-management', 'chronic'],
    remindersSent: ['email'],
    flags: {
      isNewPatient: false,
      hasOutstandingBalance: false,
      requiresFollowUp: true,
      hasAlerts: true,
      alerts: ['High inflammatory markers', 'Pain level increased']
    }
  },
  // Next Week Appointments
  {
    id: 'appt-006',
    appointmentId: 'APT-2024-006',
    patient: patients[5],
    date: '2024-02-20',
    time: '14:00',
    duration: 45,
    type: 'consultation',
    status: 'scheduled',
    priority: 'medium',
    reason: 'Anxiety and depression medication review',
    notes: 'Patient reports increased anxiety symptoms. Current SSRI may need adjustment.',
    pendingPrescriptions: 1,
    pendingLabOrders: 0,
    pendingImagingOrders: 0,
    insuranceProvider: 'Blue Cross Blue Shield',
    copay: 25,
    paymentStatus: 'pending',
    room: 'Room 201',
    provider: {
      id: 'dr-miller',
      name: 'Dr. Susan Miller',
      specialty: 'Psychiatry'
    },
    scheduledAt: '2024-02-05T09:30:00Z',
    tags: ['mental-health', 'anxiety', 'depression', 'medication-review'],
    remindersSent: ['email'],
    flags: {
      isNewPatient: false,
      hasOutstandingBalance: true,
      requiresFollowUp: true,
      hasAlerts: false,
      alerts: []
    }
  },
  // Emergency/Urgent Cases
  {
    id: 'appt-007',
    appointmentId: 'APT-2024-007',
    patient: patients[6],
    date: '2024-02-15',
    time: '15:30',
    duration: 60,
    type: 'emergency',
    status: 'in-progress',
    priority: 'urgent',
    reason: 'Chest pain and shortness of breath - emergency evaluation',
    notes: 'URGENT: 67-year-old male with chest pain radiating to left arm. BP 160/95, HR 110.',
    vitals: {
      bloodPressure: '160/95',
      heartRate: 110,
      temperature: 99.8,
      weight: 180,
      height: 70
    },
    pendingPrescriptions: 2,
    pendingLabOrders: 4,
    pendingImagingOrders: 2,
    insuranceProvider: 'Medicare',
    copay: 0,
    paymentStatus: 'waived',
    room: 'Emergency Room',
    provider: {
      id: 'dr-wilson',
      name: 'Dr. James Wilson',
      specialty: 'Emergency Medicine'
    },
    scheduledAt: '2024-02-15T15:25:00Z',
    checkedInAt: '2024-02-15T15:28:00Z',
    tags: ['emergency', 'cardiac', 'urgent', 'chest-pain'],
    remindersSent: [],
    flags: {
      isNewPatient: false,
      hasOutstandingBalance: false,
      requiresFollowUp: true,
      hasAlerts: true,
      alerts: ['CARDIAC EMERGENCY', 'High BP', 'Elevated HR', 'Chest pain']
    }
  },
  // Cancelled Appointments
  {
    id: 'appt-008',
    appointmentId: 'APT-2024-008',
    patient: patients[7],
    date: '2024-02-17',
    time: '10:00',
    duration: 30,
    type: 'consultation',
    status: 'cancelled',
    priority: 'medium',
    reason: 'Migraine consultation and treatment plan',
    notes: 'Patient called to cancel due to severe migraine episode. Rescheduled for next week.',
    pendingPrescriptions: 0,
    pendingLabOrders: 0,
    pendingImagingOrders: 0,
    insuranceProvider: 'Aetna',
    copay: 35,
    paymentStatus: 'waived',
    room: 'Room 106',
    provider: {
      id: 'dr-taylor',
      name: 'Dr. Maria Rodriguez',
      specialty: 'Neurology'
    },
    scheduledAt: '2024-02-01T11:00:00Z',
    tags: ['cancelled', 'migraine', 'neurology'],
    remindersSent: ['email', 'sms'],
    flags: {
      isNewPatient: false,
      hasOutstandingBalance: false,
      requiresFollowUp: false,
      hasAlerts: false,
      alerts: []
    }
  },
  // No-Show Appointments
  {
    id: 'appt-009',
    appointmentId: 'APT-2024-009',
    patient: patients[0],
    date: '2024-02-14',
    time: '11:00',
    duration: 30,
    type: 'follow-up',
    status: 'no-show',
    priority: 'medium',
    reason: 'Diabetes follow-up (MISSED)',
    notes: 'Patient did not show up for appointment. No call received. Will reschedule.',
    pendingPrescriptions: 1,
    pendingLabOrders: 2,
    pendingImagingOrders: 0,
    insuranceProvider: 'Blue Cross Blue Shield',
    copay: 25,
    paymentStatus: 'pending',
    room: 'Room 101',
    provider: {
      id: 'dr-smith',
      name: 'Dr. Sarah Smith',
      specialty: 'Internal Medicine'
    },
    scheduledAt: '2024-01-15T09:00:00Z',
    tags: ['no-show', 'diabetes', 'missed'],
    remindersSent: ['email', 'sms', 'phone'],
    flags: {
      isNewPatient: false,
      hasOutstandingBalance: false,
      requiresFollowUp: true,
      hasAlerts: true,
      alerts: ['No-show appointment']
    }
  },
  // Completed Appointments
  {
    id: 'appt-010',
    appointmentId: 'APT-2024-010',
    patient: patients[3],
    date: '2024-02-13',
    time: '14:30',
    duration: 45,
    type: 'consultation',
    status: 'completed',
    priority: 'low',
    reason: 'Allergy testing results review and treatment plan',
    notes: 'Allergy testing positive for dust mites and pollen. Started immunotherapy.',
    previousAppointment: {
      id: 'appt-prev-010',
      date: '2024-01-30',
      notes: 'Performed comprehensive allergy testing panel'
    },
    pendingPrescriptions: 1,
    pendingLabOrders: 0,
    pendingImagingOrders: 0,
    insuranceProvider: 'Cigna',
    copay: 30,
    paymentStatus: 'paid',
    room: 'Room 104',
    provider: {
      id: 'dr-brown',
      name: 'Dr. Patricia Brown',
      specialty: 'Allergy & Immunology'
    },
    scheduledAt: '2024-01-25T10:15:00Z',
    confirmedAt: '2024-02-12T08:30:00Z',
    checkedInAt: '2024-02-13T14:25:00Z',
    completedAt: '2024-02-13T15:15:00Z',
    tags: ['completed', 'allergies', 'immunotherapy'],
    remindersSent: ['email', 'sms'],
    flags: {
      isNewPatient: false,
      hasOutstandingBalance: false,
      requiresFollowUp: true,
      hasAlerts: false,
      alerts: []
    }
  }
];

// Appointment statistics
export const mockAppointmentStats: AppointmentStats = {
  totalAppointments: 156,
  scheduled: 45,
  confirmed: 32,
  completed: 67,
  cancelled: 8,
  noShow: 4,
  todayAppointments: 12,
  thisWeekAppointments: 45,
  urgentAppointments: 3,
  newPatients: 8,
  pendingPayments: 23
};

// Time slots for scheduling (example for one day)
export const mockTimeSlots = [
  { time: '08:00', available: true },
  { time: '08:30', available: true },
  { time: '09:00', available: false, appointment: mockDoctorAppointments[0] },
  { time: '09:30', available: false, appointment: mockDoctorAppointments[1] },
  { time: '10:00', available: true },
  { time: '10:30', available: false, appointment: mockDoctorAppointments[2] },
  { time: '11:00', available: true },
  { time: '11:30', available: true },
  { time: '12:00', available: true, reason: 'Lunch break' },
  { time: '12:30', available: true, reason: 'Lunch break' },
  { time: '13:00', available: true },
  { time: '13:30', available: true },
  { time: '14:00', available: false, appointment: mockDoctorAppointments[5] },
  { time: '14:30', available: true },
  { time: '15:00', available: true },
  { time: '15:30', available: false, appointment: mockDoctorAppointments[6] },
  { time: '16:00', available: true },
  { time: '16:30', available: true },
  { time: '17:00', available: true }
];

// Provider availability
export const mockProviderAvailability = {
  'dr-smith': {
    name: 'Dr. Sarah Smith',
    specialty: 'Internal Medicine',
    workingHours: {
      monday: ['08:00-12:00', '13:00-17:00'],
      tuesday: ['08:00-12:00', '13:00-17:00'],
      wednesday: ['08:00-12:00', '13:00-17:00'],
      thursday: ['08:00-12:00', '13:00-17:00'],
      friday: ['08:00-12:00', '13:00-16:00']
    }
  },
  'dr-johnson': {
    name: 'Dr. Michael Johnson',
    specialty: 'Pulmonology',
    workingHours: {
      monday: ['09:00-12:00', '14:00-17:00'],
      tuesday: ['09:00-12:00', '14:00-17:00'],
      wednesday: ['09:00-12:00', '14:00-17:00'],
      thursday: ['09:00-12:00', '14:00-17:00'],
      friday: ['09:00-12:00', '14:00-16:00']
    }
  }
};

// Mock data is already exported at declaration - no need for duplicate exports