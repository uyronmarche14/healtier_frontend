import { useState, useEffect } from 'react'
import { Doctor } from '@/types/data.types'
import { dataService } from '@/services/data.service'

export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDoctors = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await dataService.getDoctors()
      if (response.success) {
        setDoctors(response.data || [])
      } else {
        setError(response.message || 'Failed to fetch doctors')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch doctors')
    } finally {
      setLoading(false)
    }
  }

  const searchDoctors = async (query: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await dataService.searchDoctors(query)
      if (response.success) {
        setDoctors(response.data || [])
      } else {
        setError(response.message || 'Failed to search doctors')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search doctors')
    } finally {
      setLoading(false)
    }
  }

  const getDoctorById = (id: string) => {
    return doctors.find(doctor => doctor.id === id) || null
  }

  const getDoctorsBySpecialization = (specialization: string) => {
    return doctors.filter(doctor => doctor.specialization === specialization)
  }

  const getAvailableDoctors = () => {
    return doctors.filter(doctor => doctor.availabilityStatus === 'available')
  }

  const getTopRatedDoctors = (limit: number = 5) => {
    return doctors
      .filter(doctor => (doctor.rating || 0) >= 4.0)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, limit)
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  return {
    doctors,
    loading,
    error,
    fetchDoctors,
    searchDoctors,
    getDoctorById,
    getDoctorsBySpecialization,
    getAvailableDoctors,
    getTopRatedDoctors
  }
}