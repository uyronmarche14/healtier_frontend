// Sample health data for patient dashboard components

import { 
  VitalSigns, 
  HealthGoal, 
  MedicationAdherence, 
  HealthAlert, 
  LabResult, 
  HealthRisk,
  EmergencyMedicalInfo,
  HealthActivity,
  HealthInsight,
  ConnectedDevice,
  HealthReport,
  HealthStatus,
  ChartDataPoint,
  ChartDataset
} from '@/types/health.types'

// Sample Vital Signs Data
export const sampleVitalSigns: VitalSigns[] = [
  {
    id: 'vital-001',
    patientId: 'patient-001',
    bloodPressureSystolic: 125,
    bloodPressureDiastolic: 82,
    heartRate: 72,
    temperature: 36.8,
    weight: 75.5,
    height: 175,
    oxygenSaturation: 98,
    respiratoryRate: 16,
    notes: 'Morning measurement, feeling good',
    measuredAt: new Date('2024-01-15T08:00:00Z'),
    measuredBy: 'patient',
    isActive: true,
    createdAt: new Date('2024-01-15T08:00:00Z'),
    updatedAt: new Date('2024-01-15T08:00:00Z')
  },
  {
    id: 'vital-002',
    patientId: 'patient-001',
    bloodPressureSystolic: 128,
    bloodPressureDiastolic: 85,
    heartRate: 78,
    temperature: 37.1,
    weight: 75.3,
    height: 175,
    oxygenSaturation: 97,
    respiratoryRate: 18,
    notes: 'After light exercise',
    measuredAt: new Date('2024-01-14T18:30:00Z'),
    measuredBy: 'patient',
    isActive: true,
    createdAt: new Date('2024-01-14T18:30:00Z'),
    updatedAt: new Date('2024-01-14T18:30:00Z')
  },
  {
    id: 'vital-003',
    patientId: 'patient-002',
    bloodPressureSystolic: 135,
    bloodPressureDiastolic: 88,
    heartRate: 82,
    temperature: 36.9,
    weight: 68.2,
    height: 165,
    oxygenSaturation: 96,
    respiratoryRate: 20,
    notes: 'Slightly elevated BP, monitor closely',
    measuredAt: new Date('2024-01-15T09:15:00Z'),
    measuredBy: 'doctor',
    isActive: true,
    createdAt: new Date('2024-01-15T09:15:00Z'),
    updatedAt: new Date('2024-01-15T09:15:00Z')
  }
]

// Sample Health Goals
export const sampleHealthGoals: HealthGoal[] = [
  {
    id: 'goal-001',
    patientId: 'patient-001',
    type: 'weight',
    target: 70,
    current: 75.5,
    unit: 'kg',
    deadline: new Date('2024-06-01T00:00:00Z'),
    isActive: true,
    progress: 42,
    streak: 12,
    lastAchievedAt: new Date('2024-01-14T00:00:00Z'),
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-15T00:00:00Z')
  },
  {
    id: 'goal-002',
    patientId: 'patient-001',
    type: 'exercise',
    target: 30,
    current: 25,
    unit: 'minutes',
    deadline: new Date('2024-01-31T00:00:00Z'),
    isActive: true,
    progress: 83,
    streak: 5,
    lastAchievedAt: new Date('2024-01-13T00:00:00Z'),
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-15T00:00:00Z')
  },
  {
    id: 'goal-003',
    patientId: 'patient-001',
    type: 'blood_pressure',
    target: 120,
    current: 125,
    unit: 'mmHg systolic',
    deadline: new Date('2024-03-01T00:00:00Z'),
    isActive: true,
    progress: 75,
    streak: 3,
    lastAchievedAt: new Date('2024-01-12T00:00:00Z'),
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-15T00:00:00Z')
  }
]

// Sample Medication Adherence
export const sampleMedicationAdherence: MedicationAdherence[] = [
  {
    id: 'adherence-001',
    patientId: 'patient-001',
    prescriptionId: 'prescription-001',
    scheduledTime: new Date('2024-01-15T08:00:00Z'),
    takenAt: new Date('2024-01-15T08:05:00Z'),
    status: 'taken',
    notes: 'Taken with breakfast',
    createdAt: new Date('2024-01-15T08:05:00Z'),
    updatedAt: new Date('2024-01-15T08:05:00Z'),
    isActive: true
  },
  {
    id: 'adherence-002',
    patientId: 'patient-001',
    prescriptionId: 'prescription-002',
    scheduledTime: new Date('2024-01-14T20:00:00Z'),
    takenAt: new Date('2024-01-14T21:30:00Z'),
    status: 'taken',
    notes: 'Taken late due to work meeting',
    createdAt: new Date('2024-01-14T21:30:00Z'),
    updatedAt: new Date('2024-01-14T21:30:00Z'),
    isActive: true
  },
  {
    id: 'adherence-003',
    patientId: 'patient-001',
    prescriptionId: 'prescription-001',
    scheduledTime: new Date('2024-01-13T08:00:00Z'),
    status: 'missed',
    notes: 'Forgot to take medication',
    createdAt: new Date('2024-01-13T08:00:00Z'),
    updatedAt: new Date('2024-01-13T08:00:00Z'),
    isActive: true
  }
]

// Sample Health Alerts
export const sampleHealthAlerts: HealthAlert[] = [
  {
    id: 'alert-001',
    patientId: 'patient-001',
    type: 'vital_sign',
    severity: 'medium',
    title: 'Blood Pressure Elevated',
    message: 'Your blood pressure reading of 135/88 is slightly elevated. Consider monitoring more frequently.',
    isRead: false,
    actionRequired: true,
    actionUrl: '/health/vitals',
    metadata: {
      systolic: 135,
      diastolic: 88,
      normalRange: '120-129/80-84'
    },
    createdAt: new Date('2024-01-15T09:15:00Z'),
    updatedAt: new Date('2024-01-15T09:15:00Z'),
    isActive: true
  },
  {
    id: 'alert-002',
    patientId: 'patient-001',
    type: 'medication',
    severity: 'high',
    title: 'Medication Refill Due',
    message: 'Your Lisinopril prescription will run out in 3 days. Please arrange a refill.',
    isRead: false,
    actionRequired: true,
    actionUrl: '/medications',
    metadata: {
      medication: 'Lisinopril',
      daysRemaining: 3,
      prescriptionId: 'prescription-001'
    },
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
    isActive: true
  },
  {
    id: 'alert-003',
    patientId: 'patient-001',
    type: 'appointment',
    severity: 'low',
    title: 'Appointment Reminder',
    message: 'You have an appointment with Dr. Smith tomorrow at 2:00 PM.',
    isRead: true,
    readAt: new Date('2024-01-14T15:30:00Z'),
    actionRequired: false,
    actionUrl: '/appointments',
    metadata: {
      doctor: 'Dr. Smith',
      date: '2024-01-16',
      time: '14:00'
    },
    createdAt: new Date('2024-01-14T15:30:00Z'),
    updatedAt: new Date('2024-01-14T15:30:00Z'),
    isActive: true
  }
]

// Sample Lab Results
export const sampleLabResults: LabResult[] = [
  {
    id: 'lab-001',
    patientId: 'patient-001',
    doctorId: 'doctor-001',
    appointmentId: 'appointment-001',
    testName: 'Complete Blood Count (CBC)',
    testType: 'blood',
    result: 'Normal',
    normalRange: 'Normal',
    unit: 'N/A',
    isNormal: true,
    notes: 'All parameters within normal limits',
    testedAt: new Date('2024-01-10T08:00:00Z'),
    reviewedBy: 'Dr. Smith',
    reviewedAt: new Date('2024-01-12T14:00:00Z'),
    createdAt: new Date('2024-01-10T08:00:00Z'),
    updatedAt: new Date('2024-01-12T14:00:00Z'),
    isActive: true
  },
  {
    id: 'lab-002',
    patientId: 'patient-001',
    doctorId: 'doctor-001',
    testName: 'Cholesterol Panel',
    testType: 'blood',
    result: '225',
    normalRange: '<200 mg/dL',
    unit: 'mg/dL',
    isNormal: false,
    notes: 'Slightly elevated total cholesterol. Recommend dietary changes and recheck in 3 months.',
    testedAt: new Date('2024-01-10T08:30:00Z'),
    reviewedBy: 'Dr. Smith',
    reviewedAt: new Date('2024-01-12T14:15:00Z'),
    createdAt: new Date('2024-01-10T08:30:00Z'),
    updatedAt: new Date('2024-01-12T14:15:00Z'),
    isActive: true
  },
  {
    id: 'lab-003',
    patientId: 'patient-001',
    doctorId: 'doctor-001',
    testName: 'HbA1c',
    testType: 'blood',
    result: '6.8',
    normalRange: '<5.7%',
    unit: '%',
    isNormal: false,
    notes: 'Indicates prediabetes. Recommend lifestyle modifications and monitoring.',
    testedAt: new Date('2024-01-10T09:00:00Z'),
    reviewedBy: 'Dr. Smith',
    reviewedAt: new Date('2024-01-12T14:20:00Z'),
    createdAt: new Date('2024-01-10T09:00:00Z'),
    updatedAt: new Date('2024-01-12T14:20:00Z'),
    isActive: true
  }
]

// Sample Health Risks
export const sampleHealthRisks: HealthRisk[] = [
  {
    id: 'risk-001',
    patientId: 'patient-001',
    category: 'cardiovascular',
    riskLevel: 'moderate',
    factors: ['Family history of heart disease', 'Slightly elevated BP', 'Elevated cholesterol'],
    recommendations: ['Monitor blood pressure weekly', 'Reduce sodium intake', 'Increase aerobic exercise'],
    lastAssessed: new Date('2024-01-15T00:00:00Z'),
    nextAssessment: new Date('2024-04-15T00:00:00Z'),
    createdAt: new Date('2024-01-15T00:00:00Z'),
    updatedAt: new Date('2024-01-15T00:00:00Z'),
    isActive: true
  },
  {
    id: 'risk-002',
    patientId: 'patient-001',
    category: 'diabetes',
    riskLevel: 'high',
    factors: ['HbA1c 6.8%', 'BMI 24.7', 'Family history'],
    recommendations: ['Reduce carbohydrate intake', 'Increase physical activity', 'Monitor blood sugar'],
    lastAssessed: new Date('2024-01-15T00:00:00Z'),
    nextAssessment: new Date('2024-02-15T00:00:00Z'),
    createdAt: new Date('2024-01-15T00:00:00Z'),
    updatedAt: new Date('2024-01-15T00:00:00Z'),
    isActive: true
  }
]

// Sample Emergency Medical Info
export const sampleEmergencyMedicalInfo: EmergencyMedicalInfo = {
  patientId: 'patient-001',
  bloodType: 'A+',
  allergies: ['Penicillin', 'Shellfish'],
  medicalConditions: ['Hypertension', 'Prediabetes'],
  currentMedications: ['Lisinopril 10mg daily', 'Metformin 500mg twice daily'],
  emergencyContacts: [
    {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543',
      isPrimary: true
    },
    {
      name: 'John Doe Sr.',
      relationship: 'Father',
      phone: '+1 (555) 123-4567',
      isPrimary: false
    }
  ],
  primaryPhysician: {
    name: 'Dr. Sarah Smith',
    phone: '+1 (555) 234-5678',
    hospital: 'City General Hospital'
  },
  insuranceInfo: {
    provider: 'Blue Cross Blue Shield',
    policyNumber: 'BC123456789',
    groupNumber: 'GRP001'
  },
  specialInstructions: ['No penicillin-based antibiotics', 'Check blood sugar before procedures'],
  qrCode: 'https://healthapp.com/emergency/patient-001'
}

// Sample Health Activities
export const sampleHealthActivities: HealthActivity[] = [
  {
    id: 'activity-001',
    patientId: 'patient-001',
    type: 'exercise',
    duration: 45,
    intensity: 'moderate',
    caloriesBurned: 320,
    steps: 6500,
    distance: 4.2,
    notes: 'Morning jog in the park',
    startedAt: new Date('2024-01-15T07:00:00Z'),
    endedAt: new Date('2024-01-15T07:45:00Z'),
    syncedFrom: 'apple_health',
    createdAt: new Date('2024-01-15T07:45:00Z'),
    updatedAt: new Date('2024-01-15T07:45:00Z'),
    isActive: true
  },
  {
    id: 'activity-002',
    patientId: 'patient-001',
    type: 'meditation',
    duration: 15,
    intensity: 'low',
    notes: 'Morning mindfulness session',
    startedAt: new Date('2024-01-15T06:30:00Z'),
    endedAt: new Date('2024-01-15T06:45:00Z'),
    syncedFrom: 'manual',
    createdAt: new Date('2024-01-15T06:45:00Z'),
    updatedAt: new Date('2024-01-15T06:45:00Z'),
    isActive: true
  },
  {
    id: 'activity-003',
    patientId: 'patient-001',
    type: 'vital_check',
    notes: 'Evening blood pressure check',
    startedAt: new Date('2024-01-14T20:00:00Z'),
    syncedFrom: 'manual',
    createdAt: new Date('2024-01-14T20:00:00Z'),
    updatedAt: new Date('2024-01-14T20:00:00Z'),
    isActive: true
  }
]

// Sample Health Insights
export const sampleHealthInsights: HealthInsight[] = [
  {
    id: 'insight-001',
    patientId: 'patient-001',
    type: 'trend',
    category: 'vital_signs',
    title: 'Blood Pressure Trending Down',
    description: 'Your average blood pressure has decreased by 5mmHg over the past 2 weeks. Great progress!',
    confidence: 85,
    isRead: false,
    actionItems: ['Continue current medication', 'Maintain low-sodium diet'],
    dataPoints: {
      previousAverage: 130,
      currentAverage: 125,
      improvement: 5
    },
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
    isActive: true
  },
  {
    id: 'insight-002',
    patientId: 'patient-001',
    type: 'recommendation',
    category: 'lifestyle',
    title: 'Increase Water Intake',
    description: 'Based on your activity level and current weather, consider increasing your daily water intake to 2.5 liters.',
    confidence: 78,
    isRead: true,
    readAt: new Date('2024-01-14T16:00:00Z'),
    actionItems: ['Set water reminders every 2 hours', 'Track daily water intake'],
    dataPoints: {
      currentIntake: 1.8,
      recommendedIntake: 2.5,
      activityLevel: 'moderate'
    },
    createdAt: new Date('2024-01-14T16:00:00Z'),
    updatedAt: new Date('2024-01-14T16:00:00Z'),
    isActive: true
  }
]

// Sample Connected Devices
export const sampleConnectedDevices: ConnectedDevice[] = [
  {
    id: 'device-001',
    patientId: 'patient-001',
    deviceType: 'smartwatch',
    deviceName: 'Apple Watch Series 9',
    manufacturer: 'Apple',
    model: 'A2848',
    isConnected: true,
    lastSyncAt: new Date('2024-01-15T08:30:00Z'),
    batteryLevel: 75,
    supportedMetrics: ['heart_rate', 'steps', 'calories', 'sleep', 'blood_oxygen'],
    createdAt: new Date('2023-12-01T00:00:00Z'),
    updatedAt: new Date('2024-01-15T08:30:00Z'),
    isActive: true
  },
  {
    id: 'device-002',
    patientId: 'patient-001',
    deviceType: 'blood_pressure_monitor',
    deviceName: 'Omron HeartGuide',
    manufacturer: 'Omron',
    model: 'BP8000-M',
    isConnected: true,
    lastSyncAt: new Date('2024-01-15T08:05:00Z'),
    batteryLevel: 45,
    supportedMetrics: ['blood_pressure', 'heart_rate'],
    createdAt: new Date('2023-11-15T00:00:00Z'),
    updatedAt: new Date('2024-01-15T08:05:00Z'),
    isActive: true
  },
  {
    id: 'device-003',
    patientId: 'patient-001',
    deviceType: 'scale',
    deviceName: 'Withings Body+',
    manufacturer: 'Withings',
    model: 'WBS05',
    isConnected: false,
    lastSyncAt: new Date('2024-01-10T07:00:00Z'),
    batteryLevel: 15,
    supportedMetrics: ['weight', 'body_fat', 'muscle_mass', 'water_percentage'],
    createdAt: new Date('2023-10-01T00:00:00Z'),
    updatedAt: new Date('2024-01-10T07:00:00Z'),
    isActive: true
  }
]

// Sample Health Report
export const sampleHealthReports: HealthReport[] = [
  {
    id: 'report-001',
    patientId: 'patient-001',
    reportType: 'weekly',
    periodStart: new Date('2024-01-08T00:00:00Z'),
    periodEnd: new Date('2024-01-14T23:59:59Z'),
    summary: {
      vitalSigns: {
        average: {
          systolicBP: 126,
          diastolicBP: 83,
          heartRate: 74,
          temperature: 36.9,
          weight: 75.4
        },
        trends: {
          bloodPressure: 'improving',
          heartRate: 'stable',
          weight: 'stable'
        }
      },
      medications: {
        adherence: 92,
        missedDoses: 1,
        sideEffects: ['Mild nausea']
      },
      activities: {
        totalExercise: 210, // minutes
        averageSteps: 7200,
        activeDays: 6
      },
      goals: {
        achieved: 8,
        total: 10,
        newGoals: 1
      }
    },
    recommendations: [
      'Continue monitoring blood pressure daily',
      'Consider reducing sodium intake',
      'Maintain current exercise routine'
    ],
    generatedAt: new Date('2024-01-15T10:00:00Z'),
    pdfUrl: '/reports/weekly/patient-001-2024-week02.pdf',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
    isActive: true
  }
]

// Sample Chart Data for Visualizations
export const sampleChartData: ChartDataset[] = [
  {
    label: 'Blood Pressure (Systolic)',
    data: [
      { timestamp: new Date('2024-01-08T08:00:00Z'), value: 128, label: 'Jan 8', unit: 'mmHg', status: 'warning' },
      { timestamp: new Date('2024-01-09T08:00:00Z'), value: 125, label: 'Jan 9', unit: 'mmHg', status: 'normal' },
      { timestamp: new Date('2024-01-10T08:00:00Z'), value: 127, label: 'Jan 10', unit: 'mmHg', status: 'warning' },
      { timestamp: new Date('2024-01-11T08:00:00Z'), value: 124, label: 'Jan 11', unit: 'mmHg', status: 'normal' },
      { timestamp: new Date('2024-01-12T08:00:00Z'), value: 123, label: 'Jan 12', unit: 'mmHg', status: 'normal' },
      { timestamp: new Date('2024-01-13T08:00:00Z'), value: 125, label: 'Jan 13', unit: 'mmHg', status: 'normal' },
      { timestamp: new Date('2024-01-14T08:00:00Z'), value: 122, label: 'Jan 14', unit: 'mmHg', status: 'normal' }
    ],
    color: '#ef4444',
    unit: 'mmHg',
    type: 'line'
  },
  {
    label: 'Weight',
    data: [
      { timestamp: new Date('2024-01-08T08:00:00Z'), value: 76.2, label: 'Jan 8', unit: 'kg', status: 'normal' },
      { timestamp: new Date('2024-01-09T08:00:00Z'), value: 76.0, label: 'Jan 9', unit: 'kg', status: 'normal' },
      { timestamp: new Date('2024-01-10T08:00:00Z'), value: 75.8, label: 'Jan 10', unit: 'kg', status: 'normal' },
      { timestamp: new Date('2024-01-11T08:00:00Z'), value: 75.7, label: 'Jan 11', unit: 'kg', status: 'normal' },
      { timestamp: new Date('2024-01-12T08:00:00Z'), value: 75.5, label: 'Jan 12', unit: 'kg', status: 'normal' },
      { timestamp: new Date('2024-01-13T08:00:00Z'), value: 75.4, label: 'Jan 13', unit: 'kg', status: 'normal' },
      { timestamp: new Date('2024-01-14T08:00:00Z'), value: 75.3, label: 'Jan 14', unit: 'kg', status: 'normal' }
    ],
    color: '#3b82f6',
    unit: 'kg',
    type: 'line'
  },
  {
    label: 'Heart Rate',
    data: [
      { timestamp: new Date('2024-01-08T08:00:00Z'), value: 74, label: 'Jan 8', unit: 'bpm', status: 'normal' },
      { timestamp: new Date('2024-01-09T08:00:00Z'), value: 72, label: 'Jan 9', unit: 'bpm', status: 'normal' },
      { timestamp: new Date('2024-01-10T08:00:00Z'), value: 76, label: 'Jan 10', unit: 'bpm', status: 'normal' },
      { timestamp: new Date('2024-01-11T08:00:00Z'), value: 71, label: 'Jan 11', unit: 'bpm', status: 'normal' },
      { timestamp: new Date('2024-01-12T08:00:00Z'), value: 73, label: 'Jan 12', unit: 'bpm', status: 'normal' },
      { timestamp: new Date('2024-01-13T08:00:00Z'), value: 75, label: 'Jan 13', unit: 'bpm', status: 'normal' },
      { timestamp: new Date('2024-01-14T08:00:00Z'), value: 72, label: 'Jan 14', unit: 'bpm', status: 'normal' }
    ],
    color: '#10b981',
    unit: 'bpm',
    type: 'line'
  }
]

// Current Health Status
export const sampleHealthStatus: HealthStatus = {
  overall: 'good',
  lastUpdated: new Date('2024-01-15T10:00:00Z'),
  vitalSignsStatus: 'normal',
  medicationStatus: 'on_track',
  activityStatus: 'active',
  upcomingAppointments: 2,
  unreadAlerts: 2,
  pendingGoals: 1
}

// Helper Functions for Health Data
export const getLatestVitalSigns = (patientId: string) => {
  return sampleVitalSigns
    .filter(vital => vital.patientId === patientId && vital.isActive)
    .sort((a, b) => b.measuredAt.getTime() - a.measuredAt.getTime())[0]
}

export const getPatientHealthGoals = (patientId: string) => {
  return sampleHealthGoals.filter(goal => goal.patientId === patientId && goal.isActive)
}

export const getUnreadHealthAlerts = (patientId: string) => {
  return sampleHealthAlerts.filter(alert => alert.patientId === patientId && !alert.isRead && alert.isActive)
}

export const getMedicationAdherenceRate = (patientId: string, days: number = 30) => {
  const patientAdherence = sampleMedicationAdherence.filter(
    adherence => adherence.patientId === patientId && adherence.isActive
  )
  
  if (patientAdherence.length === 0) return 0
  
  const takenCount = patientAdherence.filter(a => a.status === 'taken').length
  return Math.round((takenCount / patientAdherence.length) * 100)
}

export const calculateBMI = (weight: number, height: number): { value: number; category: string; color: string } => {
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  
  if (bmi < 18.5) return { value: Math.round(bmi * 10) / 10, category: 'Underweight', color: 'blue' }
  if (bmi < 25) return { value: Math.round(bmi * 10) / 10, category: 'Normal', color: 'green' }
  if (bmi < 30) return { value: Math.round(bmi * 10) / 10, category: 'Overweight', color: 'yellow' }
  return { value: Math.round(bmi * 10) / 10, category: 'Obese', color: 'red' }
}

export const getHealthStatusColor = (status: string): string => {
  switch (status) {
    case 'excellent': return 'text-green-600'
    case 'good': return 'text-green-500'
    case 'fair': return 'text-yellow-500'
    case 'poor': return 'text-orange-500'
    case 'critical': return 'text-red-500'
    default: return 'text-gray-500'
  }
}

export const getVitalStatusColor = (status: string): string => {
  switch (status) {
    case 'normal': return 'text-green-500'
    case 'warning': return 'text-yellow-500'
    case 'critical': return 'text-red-500'
    default: return 'text-gray-500'
  }
}

// Data getter functions for dashboard components
export const getVitalSignsData = () => sampleVitalSigns
export const getHealthGoalsData = () => sampleHealthGoals
export const getMedicationAdherenceData = () => sampleMedicationAdherence
export const getHealthAlertsData = () => sampleHealthAlerts
export const getLabResultsData = () => sampleLabResults
export const getHealthReportsData = () => sampleHealthReports
export const getConnectedDevicesData = () => sampleConnectedDevices
export const getEmergencyMedicalInfo = () => sampleEmergencyMedicalInfo
export const getHealthInsightsData = () => sampleHealthInsights
export const getHealthStatusData = () => sampleHealthStatus
export const getChartData = () => sampleChartData
