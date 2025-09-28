import { 
  SubscriptionPlanWithDetails, 
  SubscriptionWithPlan, 
  SubscriptionDashboardData,
  SubscriptionBenefit,
  PaymentRecord 
} from '../types/subscription.types'

// Sample subscription plans with detailed features
export const subscriptionPlans: SubscriptionPlanWithDetails[] = [
  {
    id: 'plan-basic-001',
    name: 'Basic Care',
    description: 'Essential healthcare for routine needs',
    type: 'monthly',
    billingCycle: 'monthly',
    price: 29,
    consultations: { included: 2, type: 'general' },
    medicineDiscount: { percentage: 10 },
    features: [
      {
        id: 'feat-1',
        name: 'General Consultations',
        description: '2 consultations per month with general physicians',
        included: true,
        category: 'consultation'
      },
      {
        id: 'feat-2',
        name: 'Medicine Discount',
        description: '10% discount on all medicines',
        included: true,
        category: 'medicine'
      },
      {
        id: 'feat-3',
        name: 'Basic AI Health Assistant',
        description: 'Limited access to AI health insights',
        included: true,
        category: 'ai'
      },
      {
        id: 'feat-4',
        name: 'Email Support',
        description: '24-48 hour response time',
        included: true,
        category: 'support'
      },
      {
        id: 'feat-5',
        name: 'Specialist Consultations',
        description: 'Access to specialist doctors',
        included: false,
        category: 'consultation'
      }
    ],
    medicines: ['med-001', 'med-002', 'med-003'],
    isActive: true,
    popular: false,
    savings: {
      monthly: 0,
      yearly: 58,
      percentage: 17
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'plan-standard-001',
    name: 'Standard Care',
    description: 'Comprehensive healthcare for growing needs',
    type: 'monthly',
    billingCycle: 'monthly',
    price: 59,
    consultations: { included: 5, type: 'general' },
    medicineDiscount: { percentage: 20 },
    features: [
      {
        id: 'feat-6',
        name: 'General Consultations',
        description: '5 consultations per month with general physicians',
        included: true,
        category: 'consultation'
      },
      {
        id: 'feat-7',
        name: 'Specialist Consultations',
        description: '2 specialist consultations per month',
        included: true,
        category: 'consultation'
      },
      {
        id: 'feat-8',
        name: 'Medicine Discount',
        description: '20% discount on all medicines',
        included: true,
        category: 'medicine'
      },
      {
        id: 'feat-9',
        name: 'Advanced AI Health Assistant',
        description: 'Full access to AI health insights and recommendations',
        included: true,
        category: 'ai'
      },
      {
        id: 'feat-10',
        name: 'Priority Support',
        description: '12-hour response time',
        included: true,
        category: 'support'
      },
      {
        id: 'feat-11',
        name: 'Health Records Storage',
        description: 'Unlimited health record storage',
        included: true,
        category: 'storage'
      }
    ],
    medicines: ['med-001', 'med-002', 'med-003', 'med-004', 'med-005'],
    isActive: true,
    popular: true,
    savings: {
      monthly: 0,
      yearly: 118,
      percentage: 17
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'plan-premium-001',
    name: 'Premium Care',
    description: 'Complete healthcare solution for families',
    type: 'monthly',
    billingCycle: 'monthly',
    price: 99,
    consultations: { included: 99, type: 'unlimited' },
    medicineDiscount: { percentage: 30 },
    features: [
      {
        id: 'feat-12',
        name: 'Unlimited Consultations',
        description: 'Unlimited consultations with all doctors',
        included: true,
        category: 'consultation'
      },
      {
        id: 'feat-13',
        name: 'Specialist Consultations',
        description: 'Unlimited specialist consultations',
        included: true,
        category: 'consultation'
      },
      {
        id: 'feat-14',
        name: 'Medicine Discount',
        description: '30% discount on all medicines',
        included: true,
        category: 'medicine'
      },
      {
        id: 'feat-15',
        name: 'Premium AI Health Assistant',
        description: 'Advanced AI with predictive health insights',
        included: true,
        category: 'ai'
      },
      {
        id: 'feat-16',
        name: '24/7 Premium Support',
        description: 'Round-the-clock priority support',
        included: true,
        category: 'support'
      },
      {
        id: 'feat-17',
        name: 'Unlimited Health Records',
        description: 'Unlimited storage for all health data',
        included: true,
        category: 'storage'
      },
      {
        id: 'feat-18',
        name: 'Family Coverage',
        description: 'Coverage for up to 4 family members',
        included: true,
        category: 'consultation'
      }
    ],
    medicines: ['med-001', 'med-002', 'med-003', 'med-004', 'med-005', 'med-006'],
    isActive: true,
    popular: false,
    savings: {
      monthly: 0,
      yearly: 198,
      percentage: 17
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
]

// Sample payment history
export const paymentHistory: PaymentRecord[] = [
  {
    id: 'pay-001',
    date: new Date('2024-01-15'),
    amount: 59,
    status: 'success',
    method: 'card',
    invoiceUrl: '/invoices/inv-001.pdf'
  },
  {
    id: 'pay-002',
    date: new Date('2024-02-15'),
    amount: 59,
    status: 'success',
    method: 'card',
    invoiceUrl: '/invoices/inv-002.pdf'
  },
  {
    id: 'pay-003',
    date: new Date('2024-03-15'),
    amount: 59,
    status: 'success',
    method: 'card',
    invoiceUrl: '/invoices/inv-003.pdf'
  }
]

// Sample current subscription (Standard Plan)
export const currentSubscription: SubscriptionWithPlan = {
  id: 'sub-001',
  patientId: 'patient-123',
  planId: 'plan-standard-001',
  status: 'active',
  startDate: new Date('2024-01-15'),
  endDate: new Date('2024-04-15'),
  autoRenew: true,
  paymentMethod: 'card',
  totalAmount: 177,
  billingCycle: 'quarterly',
  price: 59,
  plan: subscriptionPlans[1], // Standard plan
  usage: {
    consultationsUsed: 3,
    consultationsRemaining: 2,
    medicineDiscountUsed: 45.50,
    totalSavings: 89.50
  },
  paymentHistory: paymentHistory,
  nextBillingDate: new Date('2024-04-15'),
  canUpgrade: true,
  canCancel: true,
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-03-10'),
  isActive: true
}

// Sample subscription benefits
export const subscriptionBenefits: SubscriptionBenefit[] = [
  {
    id: 'benefit-1',
    title: 'Save on Healthcare',
    description: 'Up to 30% savings on medicines and consultations',
    icon: '💰',
    category: 'savings',
    value: 'Save $500+/year'
  },
  {
    id: 'benefit-2',
    title: 'Unlimited Doctor Access',
    description: 'Consult with doctors anytime, anywhere',
    icon: '👨‍⚕️',
    category: 'health',
    value: '24/7 Access'
  },
  {
    id: 'benefit-3',
    title: 'AI Health Assistant',
    description: 'Get instant health insights and recommendations',
    icon: '🤖',
    category: 'convenience',
    value: 'Smart Health'
  },
  {
    id: 'benefit-4',
    title: 'Priority Support',
    description: 'Get help when you need it most',
    icon: '🚀',
    category: 'support',
    value: 'Priority Care'
  }
]

// Complete dashboard data
export const subscriptionDashboardData: SubscriptionDashboardData = {
  currentSubscription: currentSubscription,
  availablePlans: subscriptionPlans,
  comparison: {
    plans: subscriptionPlans,
    currentPlanId: 'plan-standard-001',
    recommendedPlanId: 'plan-premium-001',
    savingsAnalysis: {
      currentMonthlyCost: 89.50,
      potentialSavings: 200.00,
      bestValuePlan: 'Premium Care'
    }
  },
  spending: {
    monthly: 59,
    yearly: 708,
    averagePerMonth: 59,
    trend: 'stable'
  },
  usageStats: {
    totalConsultations: 12,
    totalSavings: 89.50,
    mostUsedFeature: 'General Consultations',
    satisfaction: 4.5
  }
}

// Sample data for different user scenarios
export const subscriptionScenarios = {
  // User with no subscription
  noSubscription: {
    currentSubscription: undefined,
    availablePlans: subscriptionPlans,
    recommendedPlan: subscriptionPlans[0], // Basic plan
    reason: 'Start your healthcare journey with essential coverage'
  },
  
  // User with expired subscription
  expiredSubscription: {
    ...currentSubscription,
    status: 'expired' as const,
    endDate: new Date('2024-02-15'),
    canUpgrade: true,
    canCancel: false
  },
  
  // User eligible for upgrade
  upgradeEligible: {
    ...currentSubscription,
    usage: {
      consultationsUsed: 5,
      consultationsRemaining: 0,
      medicineDiscountUsed: 89.50,
      totalSavings: 89.50
    },
    recommendedPlan: subscriptionPlans[2], // Premium plan
    upgradeReason: 'You\'ve used all your consultations this month'
  }
}

// Monthly vs Yearly pricing comparison
export const pricingComparison = {
  monthly: {
    basic: 29,
    standard: 59,
    premium: 99
  },
  yearly: {
    basic: 278, // Save $70
    standard: 566, // Save $118  
    premium: 950 // Save $198
  },
  savings: {
    basic: { amount: 70, percentage: 20 },
    standard: { amount: 118, percentage: 17 },
    premium: { amount: 198, percentage: 17 }
  }
}

// Export all data
export default {
  subscriptionPlans,
  currentSubscription,
  subscriptionBenefits,
  subscriptionDashboardData,
  subscriptionScenarios,
  pricingComparison,
  paymentHistory
}