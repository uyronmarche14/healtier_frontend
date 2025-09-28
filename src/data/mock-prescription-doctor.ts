import { DoctorPrescription, PrescriptionStatus, PrescriptionStats } from '@/types/prescription-doctor';

export const prescriptionStatuses: PrescriptionStatus[] = [
  { id: '1', name: 'draft', color: 'bg-gray-100 text-gray-800', label: 'Draft' },
  { id: '2', name: 'pending', color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
  { id: '3', name: 'filled', color: 'bg-green-100 text-green-800', label: 'Filled' },
  { id: '4', name: 'partially_filled', color: 'bg-blue-100 text-blue-800', label: 'Partially Filled' },
  { id: '5', name: 'cancelled', color: 'bg-red-100 text-red-800', label: 'Cancelled' },
  { id: '6', name: 'expired', color: 'bg-purple-100 text-purple-800', label: 'Expired' },
];

export const mockPrescriptions: DoctorPrescription[] = [
  {
    id: '1',
    patientId: 'patient-1',
    patientName: 'John Smith',
    patientEmail: 'john.smith@email.com',
    patientPhone: '+1 (555) 123-4567',
    doctorId: 'doctor-1',
    doctorName: 'Dr. Sarah Johnson',
    appointmentId: 'apt-1',
    medications: [
      {
        id: 'med-1',
        name: 'Amoxicillin',
        dosage: '500mg',
        frequency: '3 times daily',
        duration: '7 days',
        instructions: 'Take with food',
        quantity: 21,
        unit: 'capsules',
        route: 'oral'
      },
      {
        id: 'med-2',
        name: 'Ibuprofen',
        dosage: '400mg',
        frequency: 'As needed for pain',
        duration: '5 days',
        instructions: 'Take with food, max 3 times daily',
        quantity: 15,
        unit: 'tablets',
        route: 'oral'
      }
    ],
    status: prescriptionStatuses[1], // pending
    notes: 'Patient has mild fever and sore throat. Prescribed antibiotics for suspected bacterial infection.',
    instructions: 'Complete the full course of antibiotics even if feeling better. Return if symptoms worsen.',
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    totalItems: 2,
    priority: 'routine'
  },
  {
    id: '2',
    patientId: 'patient-2',
    patientName: 'Emily Davis',
    patientEmail: 'emily.davis@email.com',
    patientPhone: '+1 (555) 987-6543',
    doctorId: 'doctor-1',
    doctorName: 'Dr. Sarah Johnson',
    appointmentId: 'apt-2',
    medications: [
      {
        id: 'med-3',
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '30 days',
        instructions: 'Take in the morning',
        quantity: 30,
        unit: 'tablets',
        route: 'oral'
      }
    ],
    status: prescriptionStatuses[2], // filled
    notes: 'Routine blood pressure medication refill. Patient reports good BP control.',
    instructions: 'Monitor blood pressure weekly. Return for follow-up in 3 months.',
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    filledAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    filledBy: 'Pharmacy Central',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    totalItems: 1,
    priority: 'routine'
  },
  {
    id: '3',
    patientId: 'patient-3',
    patientName: 'Michael Brown',
    patientEmail: 'michael.brown@email.com',
    patientPhone: '+1 (555) 456-7890',
    doctorId: 'doctor-1',
    doctorName: 'Dr. Sarah Johnson',
    appointmentId: 'apt-3',
    medications: [
      {
        id: 'med-4',
        name: 'Albuterol Inhaler',
        dosage: '90mcg',
        frequency: 'As needed for breathing difficulty',
        duration: '30 days',
        instructions: 'Shake well before use',
        quantity: 1,
        unit: 'inhaler',
        route: 'inhalation'
      },
      {
        id: 'med-5',
        name: 'Prednisone',
        dosage: '20mg',
        frequency: 'Twice daily for 5 days, then once daily for 5 days',
        duration: '10 days',
        instructions: 'Take with food in the morning',
        quantity: 15,
        unit: 'tablets',
        route: 'oral'
      }
    ],
    status: prescriptionStatuses[0], // draft
    notes: 'Acute asthma exacerbation. Patient reports increased wheezing and shortness of breath.',
    instructions: 'Use inhaler as needed. Complete prednisone taper as prescribed. Seek immediate care if symptoms worsen.',
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    totalItems: 2,
    priority: 'urgent'
  },
  {
    id: '4',
    patientId: 'patient-4',
    patientName: 'Sarah Wilson',
    patientEmail: 'sarah.wilson@email.com',
    patientPhone: '+1 (555) 321-0987',
    doctorId: 'doctor-1',
    doctorName: 'Dr. Sarah Johnson',
    appointmentId: 'apt-4',
    medications: [
      {
        id: 'med-6',
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily with meals',
        duration: '60 days',
        instructions: 'Take with food to reduce stomach upset',
        quantity: 120,
        unit: 'tablets',
        route: 'oral'
      }
    ],
    status: prescriptionStatuses[3], // partially_filled
    notes: 'Type 2 diabetes management. Patient reports good glucose control with current regimen.',
    instructions: 'Continue monitoring blood glucose. Return for HbA1c check in 3 months.',
    validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    filledAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    filledBy: 'Local Pharmacy',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    totalItems: 1,
    priority: 'routine'
  },
  {
    id: '5',
    patientId: 'patient-5',
    patientName: 'David Martinez',
    patientEmail: 'david.martinez@email.com',
    patientPhone: '+1 (555) 654-3210',
    doctorId: 'doctor-1',
    doctorName: 'Dr. Sarah Johnson',
    appointmentId: 'apt-5',
    medications: [
      {
        id: 'med-7',
        name: 'Azithromycin',
        dosage: '250mg',
        frequency: 'Once daily for 5 days',
        duration: '5 days',
        instructions: 'Take on empty stomach 1 hour before or 2 hours after meals',
        quantity: 6,
        unit: 'tablets',
        route: 'oral'
      }
    ],
    status: prescriptionStatuses[4], // cancelled
    notes: 'Prescription cancelled due to patient allergy to macrolide antibiotics.',
    instructions: 'Alternative antibiotic prescribed. Patient educated about allergy.',
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    totalItems: 1,
    priority: 'routine'
  }
];

export const mockPrescriptionStats: PrescriptionStats = {
  total: mockPrescriptions.length,
  pending: mockPrescriptions.filter(p => p.status.name === 'pending').length,
  filled: mockPrescriptions.filter(p => p.status.name === 'filled').length,
  cancelled: mockPrescriptions.filter(p => p.status.name === 'cancelled').length,
  expired: mockPrescriptions.filter(p => p.status.name === 'expired').length,
  urgent: mockPrescriptions.filter(p => p.priority === 'urgent').length
};