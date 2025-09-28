import { useState, useEffect } from 'react'
import { dataService } from '@/services/data.service'
import { Subscription, SubscriptionPlan, ApiResponse } from '@/types/data.types'

export interface UseSubscriptionsReturn {
  subscriptions: Subscription[]
  subscriptionPlans: SubscriptionPlan[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  getSubscriptionsByPatient: (patientId: string) => Promise<void>
  getSubscriptionsByPlan: (planId: string) => Promise<void>
  getActiveSubscriptions: () => Promise<void>
  getSubscriptionById: (id: string) => Promise<Subscription | null>
}

export const useSubscriptions = (): UseSubscriptionsReturn => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubscriptions = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [subscriptionsResponse, plansResponse] = await Promise.all([
        dataService.getSubscriptions(),
        dataService.getSubscriptionPlans()
      ])
      
      if (subscriptionsResponse.success) {
        setSubscriptions(subscriptionsResponse.data || [])
      } else {
        setError(subscriptionsResponse.message || 'Failed to fetch subscriptions')
      }
      
      if (plansResponse.success) {
        setSubscriptionPlans(plansResponse.data || [])
      } else {
        setError(prev => prev ? `${prev}; ${plansResponse.message}` : plansResponse.message || 'Failed to fetch subscription plans')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getSubscriptionsByPatient = async (patientId: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await dataService.getSubscriptionsByPatient(patientId)
      
      if (response.success) {
        setSubscriptions(response.data || [])
      } else {
        setError(response.message || 'Failed to fetch patient subscriptions')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getSubscriptionsByPlan = async (planId: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await dataService.getSubscriptionsByPlan(planId)
      
      if (response.success) {
        setSubscriptions(response.data || [])
      } else {
        setError(response.message || 'Failed to fetch plan subscriptions')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getActiveSubscriptions = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await dataService.getActiveSubscriptions()
      
      if (response.success) {
        setSubscriptions(response.data || [])
      } else {
        setError(response.message || 'Failed to fetch active subscriptions')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getSubscriptionById = async (id: string): Promise<Subscription | null> => {
    try {
      const response = await dataService.getSubscriptionById(id)
      return response.success && response.data ? response.data : null
    } catch (err) {
      console.error('Error fetching subscription by ID:', err)
      return null
    }
  }

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  return {
    subscriptions,
    subscriptionPlans,
    loading,
    error,
    refetch: fetchSubscriptions,
    getSubscriptionsByPatient,
    getSubscriptionsByPlan,
    getActiveSubscriptions,
    getSubscriptionById
  }
}