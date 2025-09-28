import React from 'react'
import { Badge } from '@/components/ui/badge'
import { AppointmentStatus } from '@/types/doctor-appointments'
import { CheckCircle, Clock3, Activity, XCircle, AlertTriangle } from 'lucide-react'

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus
  showIcon?: boolean
  className?: string
}

const getStatusBadgeVariant = (status: AppointmentStatus) => {
  switch (status) {
    case 'confirmed':
      return 'success'
    case 'scheduled':
      return 'default'
    case 'in-progress':
      return 'destructive'
    case 'completed':
      return 'secondary'
    case 'cancelled':
      return 'outline'
    case 'no-show':
      return 'destructive'
    default:
      return 'default'
  }
}

const getStatusIcon = (status: AppointmentStatus) => {
  switch (status) {
    case 'confirmed':
      return <CheckCircle className="h-4 w-4" />
    case 'scheduled':
      return <Clock3 className="h-4 w-4" />
    case 'in-progress':
      return <Activity className="h-4 w-4" />
    case 'completed':
      return <CheckCircle className="h-4 w-4" />
    case 'cancelled':
      return <XCircle className="h-4 w-4" />
    case 'no-show':
      return <AlertTriangle className="h-4 w-4" />
    default:
      return <Clock3 className="h-4 w-4" />
  }
}

export function AppointmentStatusBadge({ 
  status, 
  showIcon = true, 
  className = '' 
}: AppointmentStatusBadgeProps) {
  const variant = getStatusBadgeVariant(status)
  const icon = showIcon ? getStatusIcon(status) : null
  
  return (
    <Badge variant="default" className={`capitalize ${className}`}>
      {icon}
      {showIcon && <span className="ml-1">{status.replace('-', ' ')}</span>}
      {!showIcon && status.replace('-', ' ')}
    </Badge>
  )
}