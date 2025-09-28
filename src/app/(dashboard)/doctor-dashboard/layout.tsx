import { DoctorDashboardLayout } from '@/components/layout/DoctorDashboardLayout'

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DoctorDashboardLayout userName="Dr. Smith">
      {children}
    </DoctorDashboardLayout>
  )
}

// Add metadata for this route group
export const metadata = {
  title: 'Doctor Portal - MedGhost',
  description: 'Doctor dashboard for MedGhost healthcare platform',
}