// Health-specific data types for patient dashboard

import { BaseEntity } from './data.types'

// Vital Signs and Health Metrics
export interface VitalSigns extends BaseEntity {
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

// BMI is calculated from weight and height
export interface BMICalculation {
  value: number
  category: 'underweight' | 'normal' | 'overweight' | 'obese'
  color: 'blue' | 'green' | 'yellow' | 'red'
}

// Health Goals and Tracking
export interface HealthGoal extends BaseEntity {
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

// Medication Adherence
export interface MedicationAdherence extends BaseEntity {
  patientId: string
  prescriptionId: string
  scheduledTime: Date
  takenAt?: Date
  status: 'pending' | 'taken' | 'missed' | 'skipped'
  notes?: string
  sideEffects?: string[]
}

// Health Alerts and Notifications
export interface HealthAlert extends BaseEntity {
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

// Lab Results and Medical Records
export interface LabResult extends BaseEntity {
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

// Health Categories for Risk Assessment
export interface HealthRisk extends BaseEntity {
  patientId: string
  category: 'cardiovascular' | 'diabetes' | 'respiratory' | 'mental_health' | 'nutritional'
  riskLevel: 'low' | 'moderate' | 'high' | 'critical'
  factors: string[]
  recommendations: string[]
  lastAssessed: Date
  nextAssessment: Date
}

// Emergency Medical Information
export interface EmergencyMedicalInfo {
  patientId: string
  bloodType?: string
  allergies: string[]
  medicalConditions: string[]
  currentMedications: string[]
  emergencyContacts: EmergencyContact[]
  primaryPhysician?: {
    name: string
    phone: string
    hospital: string
  }
  insuranceInfo?: {
    provider: string
    policyNumber: string
    groupNumber?: string
  }
  specialInstructions?: string[]
  qrCode?: string
}

export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
  isPrimary: boolean
}

// Health Activity and Exercise
export interface HealthActivity extends BaseEntity {
  patientId: string
  type: 'exercise' | 'meditation' | 'sleep' | 'meal' | 'medication' | 'vital_check'
  duration?: number // minutes
  intensity?: 'low' | 'moderate' | 'high'
  caloriesBurned?: number
  steps?: number
  distance?: number // km
  notes?: string
  startedAt: Date
  endedAt?: Date
  syncedFrom?: 'manual' | 'fitbit' | 'apple_health' | 'google_fit'
}

// Health Insights from AI
export interface HealthInsight extends BaseEntity {
  patientId: string
  type: 'trend' | 'anomaly' | 'recommendation' | 'prediction' | 'reminder'
  category: 'vital_signs' | 'medication' | 'lifestyle' | 'nutrition' | 'exercise'
  title: string
  description: string
  confidence: number // 0-100
  isRead: boolean
  readAt?: Date
  actionItems?: string[]
  dataPoints?: Record<string, any>
}

// Health Device Integration
export interface ConnectedDevice extends BaseEntity {
  patientId: string
  deviceType: 'smartwatch' | 'fitness_tracker' | 'blood_pressure_monitor' | 'thermometer' | 'scale'
  deviceName: string
  manufacturer: string
  model: string
  isConnected: boolean
  lastSyncAt?: Date
  batteryLevel?: number
  supportedMetrics: string[]
}

// Health Report Summary
export interface HealthReport extends BaseEntity {
  patientId: string
  reportType: 'weekly' | 'monthly' | 'quarterly' | 'annual'
  periodStart: Date
  periodEnd: Date
  summary: {
    vitalSigns: {
      average: Record<string, number>
      trends: Record<string, 'improving' | 'stable' | 'declining'>
    }
    medications: {
      adherence: number
      missedDoses: number
      sideEffects: string[]
    }
    activities: {
      totalExercise: number
      averageSteps: number
      activeDays: number
    }
    goals: {
      achieved: number
      total: number
      newGoals: number
    }
  }
  recommendations: string[]
  generatedAt: Date
  pdfUrl?: string
}

// Health Status for Dashboard
export interface HealthStatus {
  overall: 'excellent' | 'good' | 'fair' | 'poor' | 'critical'
  lastUpdated: Date
  vitalSignsStatus: 'normal' | 'warning' | 'critical'
  medicationStatus: 'on_track' | 'behind' | 'critical'
  activityStatus: 'active' | 'moderate' | 'sedentary'
  upcomingAppointments: number
  unreadAlerts: number
  pendingGoals: number
}

// Chart Data Types for Visualizations
export interface ChartDataPoint {
  timestamp: Date
  value: number
  label: string
  unit: string
  status?: 'normal' | 'warning' | 'critical'
}

export interface ChartDataset {
  label: string
  data: ChartDataPoint[]
  color: string
  unit: string
  type: 'line' | 'bar' | 'area'
}

// Form Input Types for Health Components
export interface VitalSignsInput {
  bloodPressureSystolic?: number
  bloodPressureDiastolic?: number
  heartRate?: number
  temperature?: number
  weight?: number
  height?: number
  oxygenSaturation?: number
  respiratoryRate?: number
  notes?: string
}

export interface HealthGoalInput {
  type: HealthGoal['type']
  target: number
  unit: string
  deadline?: Date
}

// API Response Types for Health Data
export interface HealthDataResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  lastSync?: Date
  nextUpdate?: Date
}

// Risk Assessment Types
export interface RiskFactor {
  name: string
  value: string | number
  normalRange?: string
  riskContribution: number // 0-100
  recommendation?: string
}

export interface RiskAssessment {
  patientId: string
  overallRisk: number // 0-100
  riskLevel: HealthRisk['riskLevel']
  factors: RiskFactor[]
  recommendations: string[]
  nextAssessment: Date
  assessedBy: 'ai' | 'doctor' | 'system'
}