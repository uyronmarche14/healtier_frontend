import { SubscriptionPlan, Subscription } from '@/types/data.types'

export const sampleSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'plan-001',
    name: 'Basic Health Plan',
    description: 'Essential healthcare services and consultations',
    price: 29.99,
    billingCycle: 'monthly',
    type: 'monthly',
    medicines: ['med-001', 'med-002'],
    features: [
      '2 Doctor consultations per month',
      'Basic health monitoring',
      '24/7 nurse hotline',
      'Discount on prescription medications (10%)'
    ],
    isActive: true,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  },
  {
    id: 'plan-002',
    name: 'Premium Health Plan',
    description: 'Comprehensive healthcare with additional benefits',
    price: 79.99,
    billingCycle: 'monthly',
    type: 'monthly',
    medicines: ['med-003', 'med-004'],
    features: [
      'Unlimited doctor consultations',
      'Priority appointment booking',
      'Annual comprehensive health checkup',
      'Discount on prescription medications (20%)',
      'Mental health consultations (2 per month)',
      'Nutritionist consultation (1 per month)'
    ],
    isActive: true,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  },
  {
    id: 'plan-003',
    name: 'Family Health Plan',
    description: 'Complete healthcare coverage for your entire family',
    price: 149.99,
    billingCycle: 'monthly',
    type: 'monthly',
    medicines: ['med-005', 'med-006'],
    features: [
      'Unlimited consultations for up to 4 family members',
      'Priority appointment booking for all family members',
      'Annual comprehensive health checkups for all',
      'Discount on prescription medications (25%)',
      'Pediatric consultations included',
      'Mental health consultations (4 per month family-wide)',
      '24/7 family health hotline'
    ],
    isActive: true,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  },
  {
    id: 'plan-004',
    name: 'Senior Care Plan',
    description: 'Specialized healthcare for seniors (65+)',
    price: 99.99,
    billingCycle: 'monthly',
    type: 'monthly',
    medicines: ['med-007', 'med-008'],
    features: [
      'Unlimited geriatric consultations',
      'Monthly health monitoring',
      'Annual comprehensive senior health checkup',
      'Discount on prescription medications (30%)',
      'Home visit option (2 per month)',
      '24/7 senior health hotline',
      'Medication management assistance'
    ],
    isActive: true,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  }
]

export const sampleSubscriptions: Subscription[] = [
  {
    id: 'sub-005',
    patientId: 'patient-005',
    planId: 'plan-004',
    startDate: new Date('2024-01-01T00:00:00Z'),
    endDate: new Date('2024-01-31T23:59:59Z'),
    status: 'active',
    autoRenew: true,
    paymentMethod: 'stripe',
    totalAmount: 99.99,
    stripeSubscriptionId: 'sub_stripe_33333',
    stripeCustomerId: 'cus_stripe_33333',
    price: 99.99,
    billingCycle: 'monthly',
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-12T11:30:00Z'),
    isActive: true
  },
  {
    id: 'sub-002',
    patientId: 'patient-002',
    planId: 'plan-003',
    startDate: new Date('2024-01-15T00:00:00Z'),
    endDate: new Date('2024-01-14T23:59:59Z'),
    status: 'active',
    autoRenew: true,
    paymentMethod: 'stripe',
    totalAmount: 199.99,
    stripeSubscriptionId: 'sub_stripe_67890',
    stripeCustomerId: 'cus_stripe_67890',
    price: 199.99,
    billingCycle: 'quarterly',
    createdAt: new Date('2024-01-15T00:00:00Z'),
    updatedAt: new Date('2024-01-20T14:15:00Z'),
    isActive: true
  },
  {
    id: 'sub-003',
    patientId: 'patient-003',
    planId: 'plan-003',
    startDate: new Date('2023-12-01T00:00:00Z'),
    endDate: new Date('2024-11-30T23:59:59Z'),
    status: 'active',
    autoRenew: true,
    paymentMethod: 'stripe',
    totalAmount: 149.99,
    stripeSubscriptionId: 'sub_stripe_11111',
    stripeCustomerId: 'cus_stripe_11111',
    price: 149.99,
    billingCycle: 'monthly',
    createdAt: new Date('2023-12-01T00:00:00Z'),
    updatedAt: new Date('2024-01-10T09:15:00Z'),
    isActive: true
  },
  {
    id: 'sub-004',
    patientId: 'patient-004',
    planId: 'plan-001',
    startDate: new Date('2024-01-01T00:00:00Z'),
    endDate: new Date('2024-01-31T23:59:59Z'),
    status: 'cancelled',
    autoRenew: false,
    paymentMethod: 'stripe',
    totalAmount: 29.99,
    stripeSubscriptionId: 'sub_stripe_22222',
    stripeCustomerId: 'cus_stripe_22222',
    price: 29.99,
    billingCycle: 'monthly',
    cancelledAt: new Date('2024-01-10T16:45:00Z'),
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-10T16:45:00Z'),
    isActive: false
  },
  {
    id: 'sub-005',
    patientId: 'patient-004',
    planId: 'plan-001',
    startDate: new Date('2024-01-01T00:00:00Z'),
    endDate: new Date('2024-01-31T23:59:59Z'),
    status: 'cancelled',
    autoRenew: false,
    paymentMethod: 'stripe',
    totalAmount: 29.99,
    stripeSubscriptionId: 'sub_stripe_22222',
    stripeCustomerId: 'cus_stripe_22222',
    price: 29.99,
    billingCycle: 'monthly',
    cancelledAt: new Date('2024-01-10T16:45:00Z'),
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-10T16:45:00Z'),
    isActive: false
  }
]

// Helper functions for subscription data manipulation
export const getActiveSubscriptions = () => sampleSubscriptions.filter(sub => sub.isActive)

export const getSubscriptionsByPatient = (patientId: string) => 
  sampleSubscriptions.filter(subscription => subscription.patientId === patientId)

export const getSubscriptionsByPlan = (planId: string) => 
  sampleSubscriptions.filter(subscription => subscription.planId === planId)

export const getSubscriptionsByStatus = (status: string) => 
  sampleSubscriptions.filter(subscription => subscription.status === status)

export const getSubscriptionById = (id: string) => 
  sampleSubscriptions.find(subscription => subscription.id === id)

export const getActivePlans = () => sampleSubscriptionPlans.filter(plan => plan.isActive)

export const getPlanById = (id: string) => 
  sampleSubscriptionPlans.find(plan => plan.id === id)

export const getSubscriptionsExpiringSoon = (days: number = 7) => {
  const today = new Date()
  const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000)
  
  return sampleSubscriptions.filter(subscription => {
    const endDate = subscription.endDate
    return endDate >= today && endDate <= futureDate && subscription.status === 'active'
  })
}

export const getMonthlyRevenue = () => {
  return sampleSubscriptions
    .filter(sub => sub.status === 'active')
    .reduce((total, sub) => total + sub.price, 0)
}

export const getSubscriptionStats = () => {
  const total = sampleSubscriptions.length
  const active = sampleSubscriptions.filter(s => s.status === 'active').length
  const cancelled = sampleSubscriptions.filter(s => s.status === 'cancelled').length
  const expired = sampleSubscriptions.filter(s => s.status === 'expired').length
  
  return {
    total,
    active,
    cancelled,
    expired,
    activeRate: total > 0 ? Math.round((active / total) * 100) : 0,
    monthlyRevenue: getMonthlyRevenue()
  }
}

export const searchSubscriptions = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return sampleSubscriptions.filter(subscription => 
    subscription.id.toLowerCase().includes(lowercaseQuery) ||
    subscription.stripeSubscriptionId?.toLowerCase().includes(lowercaseQuery)
  )
}

export const getRecentSubscriptions = (limit: number = 5) => 
  sampleSubscriptions
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit)