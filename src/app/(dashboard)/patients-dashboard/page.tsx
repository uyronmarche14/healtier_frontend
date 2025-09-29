'use client'

import MinimalPatientDashboard from '@/components/patient-dashboard/minimal-patient-dashboard'

export default function PatientDashboardPage() {
  const handleNavigation = (path: string) => {
    // In a real app, you would use Next.js router here
    // router.push(path)
    console.log(`Navigate to: ${path}`)
  }

  return (
    <MinimalPatientDashboard 
      patientId="patient-001"
      onNavigate={handleNavigation}
    />
  )
}