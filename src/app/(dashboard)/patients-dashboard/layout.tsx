import { PatientDashboardLayout } from '@/components/layout/PatientDashboardLayout'

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PatientDashboardLayout userName="Patient User">
      {children}
    </PatientDashboardLayout>
  )
}

// Add metadata for this route group
export const metadata = {
  title: 'Patient Portal - MedGhost',
  description: 'Patient dashboard for MedGhost healthcare platform',
}