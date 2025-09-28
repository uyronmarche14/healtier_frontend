// Enhanced subscription types for dashboard visualization
import { SubscriptionPlan, Subscription } from './data.types'

export interface SubscriptionPlanWithDetails extends Omit<SubscriptionPlan, 'features'> {
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

export interface SubscriptionFeature {
  id: string
  name: string
  description: string
  included: boolean
  category: 'consultation' | 'medicine' | 'ai' | 'support' | 'storage'
  icon?: string
  value?: any // Additional value for features (e.g., number of consultations, discount percentage)
}

export interface SubscriptionWithPlan extends Subscription {
  plan: SubscriptionPlanWithDetails
  usage: {
    consultationsUsed: number
    consultationsRemaining: number
    medicineDiscountUsed: number
    totalSavings: number
  }
  paymentHistory: PaymentRecord[]
  nextBillingDate: Date
  canUpgrade: boolean
  canCancel: boolean
  totalSavings?: number
  monthlySavings?: number
}

export interface PaymentRecord {
  id: string
  date: Date
  amount: number
  status: 'success' | 'failed' | 'pending'
  method: 'card' | 'paypal' | 'bank_transfer'
  invoiceUrl?: string
}

export interface SubscriptionComparison {
  plans: SubscriptionPlanWithDetails[]
  currentPlanId?: string
  recommendedPlanId?: string
  savingsAnalysis: {
    currentMonthlyCost: number
    potentialSavings: number
    bestValuePlan: string
  }
}

export interface SubscriptionDashboardData {
  currentSubscription?: SubscriptionWithPlan
  availablePlans: SubscriptionPlanWithDetails[]
  comparison: SubscriptionComparison
  spending: {
    monthly: number
    yearly: number
    averagePerMonth: number
    trend: 'up' | 'down' | 'stable'
  }
  usageStats: {
    totalConsultations: number
    totalSavings: number
    mostUsedFeature: string
    satisfaction: number // 1-5 rating
  }
  paymentHistory?: PaymentRecord[]
  benefits?: SubscriptionBenefit[]
  recommendations?: PlanRecommendation[]
}

export interface SubscriptionBenefit {
  id: string
  title: string
  description: string
  icon: string
  category: 'health' | 'savings' | 'convenience' | 'support'
  value: string // e.g., "Save $200/year", "24/7 Access"
}

export interface PlanRecommendation {
  planId: string
  planName: string
  reason: string
  savings: number
  annualSavings: number
  confidence: 'high' | 'medium' | 'low'
  basedOn: string[] // usage patterns, spending, etc.
  isRecommended?: boolean
  benefits?: string[]
}