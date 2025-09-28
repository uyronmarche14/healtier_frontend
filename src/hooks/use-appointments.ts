import { useState, useEffect } from 'react'
import { dataService } from '@/services/data.service'
import { Appointment, ApiResponse } from '@/types/data.types'

export interface UseAppointmentsReturn {
  appointments: Appointment[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  getAppointmentsByPatient: (patientId: string) => Promise<void>
  getAppointmentsByDoctor: (doctorId: string) => Promise<void>
  getTodayAppointments: () => Promise<void>
  getUpcomingAppointments: (days?: number) => Promise<void>
  getAppointmentsByStatus: (status: string) => Promise<void>
}

export const useAppointments = (): UseAppointmentsReturn => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await dataService.getAppointments()
      
      if (response.success) {
        setAppointments(response.data || [])
      } else {
        setError(response.message || 'Failed to fetch appointments')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getAppointmentsByPatient = async (patientId: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await dataService.getAppointmentsByPatient(patientId)
      
      if (response.success) {
        setAppointments(response.data || [])
      } else {
        setError(response.message || 'Failed to fetch patient appointments')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getAppointmentsByDoctor = async (doctorId: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await dataService.getAppointmentsByDoctor(doctorId)
      
      if (response.success) {
        setAppointments(response.data || [])
      } else {
        setError(response.message || 'Failed to fetch doctor appointments')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getTodayAppointments = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await dataService.getTodayAppointments()
      
      if (response.success) {
        setAppointments(response.data || [])
      } else {
        setError(response.message || 'Failed to fetch today appointments')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getUpcomingAppointments = async (days: number = 7) => {
    try {
      setLoading(true)
      setError(null)
      const response = await dataService.getUpcomingAppointments(days)
      
      if (response.success) {
        setAppointments(response.data || [])
      } else {
        setError(response.message || 'Failed to fetch upcoming appointments')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getAppointmentsByStatus = async (status: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await dataService.getAppointmentsByStatus(status)
      
      if (response.success) {
        setAppointments(response.data || [])
      } else {
        setError(response.message || 'Failed to fetch appointments by status')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  return {
    appointments,
    loading,
    error,
    refetch: fetchAppointments,
    getAppointmentsByPatient,
    getAppointmentsByDoctor,
    getTodayAppointments,
    getUpcomingAppointments,
    getAppointmentsByStatus
  }
}