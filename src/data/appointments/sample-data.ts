import { Appointment } from '@/types/data.types'

export const sampleAppointments: Appointment[] = [
  {
    id: 'appointment-001',
    patientId: 'patient-001',
    doctorId: 'doctor-001',
    date: new Date('2024-01-16T09:00:00Z'),
    time: '09:00',
    duration: 30,
    type: 'routine',
    status: 'scheduled',
    notes: 'Annual checkup, review blood pressure medication',
    symptoms: ['Occasional headaches', 'Mild fatigue'],
    createdAt: new Date('2024-01-10T14:30:00Z'),
    updatedAt: new Date('2024-01-10T14:30:00Z'),
    isActive: true
  },
  {
    id: 'appointment-002',
    patientId: 'patient-002',
    doctorId: 'doctor-002',
    date: new Date('2024-01-16T10:30:00Z'),
    time: '10:30',
    duration: 45,
    type: 'consultation',
    status: 'confirmed',
    notes: 'Cardiology consultation, review test results',
    symptoms: ['Chest discomfort', 'Shortness of breath'],
    createdAt: new Date('2024-01-08T11:15:00Z'),
    updatedAt: new Date('2024-01-12T16:20:00Z'),
    isActive: true
  },
  {
    id: 'appointment-003',
    patientId: 'patient-003',
    doctorId: 'doctor-001',
    date: new Date('2024-01-16T14:00:00Z'),
    time: '14:00',
    duration: 30,
    type: 'follow-up',
    status: 'scheduled',
    notes: 'Follow-up on cholesterol medication',
    symptoms: ['No new symptoms'],
    createdAt: new Date('2024-01-12T09:45:00Z'),
    updatedAt: new Date('2024-01-12T09:45:00Z'),
    isActive: true
  },
  {
    id: 'appointment-004',
    patientId: 'patient-004',
    doctorId: 'doctor-003',
    date: new Date('2024-01-17T11:00:00Z'),
    time: '11:00',
    duration: 30,
    type: 'routine',
    status: 'confirmed',
    notes: 'Pediatric checkup, vaccination review',
    symptoms: ['Seasonal allergies acting up'],
    createdAt: new Date('2024-01-11T13:20:00Z'),
    updatedAt: new Date('2024-01-13T15:10:00Z'),
    isActive: true
  },
  {
    id: 'appointment-005',
    patientId: 'patient-001',
    doctorId: 'doctor-002',
    date: new Date('2024-01-17T15:30:00Z'),
    time: '15:30',
    duration: 60,
    type: 'emergency',
    status: 'scheduled',
    notes: 'Urgent consultation - chest pain',
    symptoms: ['Severe chest pain', 'Radiating to left arm'],
    createdAt: new Date('2024-01-15T16:45:00Z'),
    updatedAt: new Date('2024-01-15T16:45:00Z'),
    isActive: true
  },
  {
    id: 'appointment-006',
    patientId: 'patient-005',
    doctorId: 'doctor-004',
    date: new Date('2024-01-18T08:30:00Z'),
    time: '08:30',
    duration: 45,
    type: 'consultation',
    status: 'cancelled',
    notes: 'Orthopedic consultation - knee pain',
    symptoms: ['Knee pain', 'Difficulty walking'],
    createdAt: new Date('2024-01-13T10:30:00Z'),
    updatedAt: new Date('2024-01-14T14:20:00Z'),
    isActive: false
  },
  {
    id: 'appointment-007',
    patientId: 'patient-002',
    doctorId: 'doctor-001',
    date: new Date('2024-01-18T13:00:00Z'),
    time: '13:00',
    duration: 30,
    type: 'follow-up',
    status: 'completed',
    notes: 'Post-treatment follow-up',
    symptoms: ['Improved symptoms'],
    diagnosis: 'Hypertension well controlled',
    treatment: 'Continue current medication',
    createdAt: new Date('2024-01-11T11:15:00Z'),
    updatedAt: new Date('2024-01-18T13:30:00Z'),
    isActive: true
  },
  {
    id: 'appointment-008',
    patientId: 'patient-003',
    doctorId: 'doctor-003',
    date: new Date('2024-01-19T10:00:00Z'),
    time: '10:00',
    duration: 30,
    type: 'routine',
    status: 'confirmed',
    notes: 'Annual physical exam',
    symptoms: ['Feeling well'],
    createdAt: new Date('2024-01-14T08:20:00Z'),
    updatedAt: new Date('2024-01-15T12:45:00Z'),
    isActive: true
  }
]

// Helper functions for appointment data manipulation
export const getActiveAppointments = () => sampleAppointments.filter(appointment => appointment.isActive)

export const getAppointmentsByDate = (date: Date) => 
  sampleAppointments.filter(appointment => 
    appointment.date.toDateString() === date.toDateString()
  )

export const getAppointmentsByPatient = (patientId: string) => 
  sampleAppointments.filter(appointment => appointment.patientId === patientId)

export const getAppointmentsByDoctor = (doctorId: string) => 
  sampleAppointments.filter(appointment => appointment.doctorId === doctorId)

export const getAppointmentsByStatus = (status: string) => 
  sampleAppointments.filter(appointment => appointment.status === status)

export const getAppointmentsByType = (type: string) => 
  sampleAppointments.filter(appointment => appointment.type === type)

export const getTodayAppointments = () => {
  const today = new Date()
  return getAppointmentsByDate(today)
}

export const getUpcomingAppointments = (days: number = 7) => {
  const today = new Date()
  const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000)
  
  return sampleAppointments.filter(appointment => {
    const appointmentDate = appointment.date
    return appointmentDate >= today && appointmentDate <= futureDate && appointment.isActive
  })
}

export const getPendingAppointments = () => 
  sampleAppointments.filter(appointment => 
    appointment.status === 'scheduled' || appointment.status === 'confirmed'
  )

export const searchAppointments = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return sampleAppointments.filter(appointment => 
    appointment.notes?.toLowerCase().includes(lowercaseQuery) ||
    appointment.symptoms?.some(symptom => symptom.toLowerCase().includes(lowercaseQuery)) ||
    appointment.diagnosis?.toLowerCase().includes(lowercaseQuery) ||
    appointment.treatment?.toLowerCase().includes(lowercaseQuery)
  )
}

export const getAppointmentById = (id: string) => 
  sampleAppointments.find(appointment => appointment.id === id)

export const getRecentAppointments = (limit: number = 5) => 
  sampleAppointments
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit)

export const getAppointmentsForDateRange = (startDate: Date, endDate: Date) => 
  sampleAppointments.filter(appointment => 
    appointment.date >= startDate && appointment.date <= endDate && appointment.isActive
  )

export const getAppointmentStats = () => {
  const total = sampleAppointments.length
  const active = sampleAppointments.filter(a => a.isActive).length
  const completed = sampleAppointments.filter(a => a.status === 'completed').length
  const cancelled = sampleAppointments.filter(a => a.status === 'cancelled').length
  const pending = sampleAppointments.filter(a => a.status === 'scheduled' || a.status === 'confirmed').length
  
  return {
    total,
    active,
    completed,
    cancelled,
    pending,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
  }
}