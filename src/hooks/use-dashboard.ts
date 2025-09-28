import { useState, useEffect } from 'react'
import { dataService } from '@/services/data.service'
import { ApiResponse } from '@/types/data.types'

export interface DashboardStats {
  totalPatients: number
  totalDoctors: number
  totalAppointments: number
  activeSubscriptions: number
  monthlyRevenue: number
  recentPatients: any[]
  recentAppointments: any[]
  topDoctors: any[]
}

export interface Activity {
  type: string
  id: string
  title: string
  description: string
  timestamp: Date
  status: string
}

export interface UseDashboardReturn {
  stats: DashboardStats | null
  activities: Activity[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useDashboard = (): UseDashboardReturn => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [statsResponse, activitiesResponse] = await Promise.all([
        dataService.getDashboardStats(),
        dataService.getRecentActivity(10)
      ])
      
      if (statsResponse.success) {
        setStats(statsResponse.data || null)
      } else {
        setError(statsResponse.message || 'Failed to fetch dashboard stats')
      }
      
      if (activitiesResponse.success) {
        setActivities(activitiesResponse.data || [])
      } else {
        setError(prev => prev ? `${prev}; ${activitiesResponse.message}` : activitiesResponse.message || 'Failed to fetch recent activity')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return {
    stats,
    activities,
    loading,
    error,
    refetch: fetchDashboardData
  }
}