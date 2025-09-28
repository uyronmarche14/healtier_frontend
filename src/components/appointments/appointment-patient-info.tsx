import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PatientBasicInfo } from '@/types/doctor-appointments'

interface AppointmentPatientInfoProps {
  patient: PatientBasicInfo
  showAvatar?: boolean
  showDetails?: boolean
  className?: string
}

export function AppointmentPatientInfo({ 
  patient, 
  showAvatar = true, 
  showDetails = true,
  className = '' 
}: AppointmentPatientInfoProps) {
  const initials = `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showAvatar && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={patient.avatar} alt={`${patient.firstName} ${patient.lastName}`} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      )}
      <div>
        <div className="font-medium">
          {patient.firstName} {patient.lastName}
        </div>
        {showDetails && (
          <div className="text-sm text-muted-foreground">
            {patient.bloodType} • {patient.allergies?.length || 0} allergies
          </div>
        )}
      </div>
    </div>
  )
}