import { useState, useEffect } from 'react'
import { dataService } from '@/services/data.service'
import { Patient, ApiResponse } from '@/types/data.types'

export interface UsePatientsReturn {
  patients: Patient[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  searchPatients: (query: string) => Promise<void>
  getPatientById: (id: string) => Promise<Patient | null>
}

export const usePatients = (): UsePatientsReturn => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPatients = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await dataService.getPatients()
      
      if (response.success) {
        setPatients(response.data || [])
      } else {
        setError(response.message || 'Failed to fetch patients')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const searchPatients = async (query: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await dataService.searchPatients(query)
      
      if (response.success) {
        setPatients(response.data || [])
      } else {
        setError(response.message || 'Failed to search patients')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getPatientById = async (id: string): Promise<Patient | null> => {
    try {
      const response = await dataService.getPatientById(id)
      return response.success && response.data ? response.data : null
    } catch (err) {
      console.error('Error fetching patient by ID:', err)
      return null
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  return {
    patients,
    loading,
    error,
    refetch: fetchPatients,
    searchPatients,
    getPatientById
  }
}