import React from 'react'
import { Stethoscope } from 'lucide-react'

interface AppointmentProviderInfoProps {
  name: string
  specialty: string
  showIcon?: boolean
  className?: string
}

export function AppointmentProviderInfo({ 
  name, 
  specialty, 
  showIcon = true,
  className = '' 
}: AppointmentProviderInfoProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center gap-1 font-medium text-sm">
        {showIcon && <Stethoscope className="h-3 w-3 text-muted-foreground" />}
        <span>{name}</span>
      </div>
      <div className="text-xs text-muted-foreground">
        {specialty}
      </div>
    </div>
  )
}