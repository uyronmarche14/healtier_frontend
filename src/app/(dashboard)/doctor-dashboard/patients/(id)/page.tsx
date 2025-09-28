import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Mail, Phone, User } from 'lucide-react'
import Link from 'next/link'

interface PatientDetailPageProps {
  params: {
    id: string
  }
}

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'
export const dynamicParams = true

export default function PatientDetailPage({ params }: PatientDetailPageProps) {
  const { id } = params

  // For now, this is a placeholder. In a real app, you would fetch patient data based on the ID
  const patient = {
    id: id,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: new Date('1985-03-15'),
    bloodType: 'A+',
    allergies: ['Penicillin', 'Shellfish'],
    medicalHistory: ['Hypertension', 'Diabetes Type 2'],
    status: 'active' as const,
  }

  if (!patient) {
    notFound()
  }

  const calculateAge = (birthDate: Date) => {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/doctor-dashboard/patients">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Patients
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {patient.firstName} {patient.lastName}
            </h1>
            <p className="text-muted-foreground">Patient Details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Appointment
          </Button>
          <Button size="sm" variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Patient contact and demographic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Age: {calculateAge(patient.dateOfBirth)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{patient.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{patient.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Blood Type:</span>
              <span className="text-sm">{patient.bloodType}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
            <CardDescription>Allergies and medical history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Allergies</h4>
              <div className="flex flex-wrap gap-2">
                {patient.allergies.map((allergy, index) => (
                  <span key={index} className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Medical History</h4>
              <div className="space-y-1">
                {patient.medicalHistory.map((condition, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    • {condition}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest appointments, lab results, and prescriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Patient activity data will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}