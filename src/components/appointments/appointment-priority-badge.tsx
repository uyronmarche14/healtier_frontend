import React from 'react'
import { Badge } from '@/components/ui/badge'
import { AppointmentPriority } from '@/types/doctor-appointments'

interface AppointmentPriorityBadgeProps {
  priority: AppointmentPriority
  className?: string
}

const getPriorityBadgeVariant = (priority: AppointmentPriority) => {
  switch (priority) {
    case 'urgent':
      return 'destructive'
    case 'high':
      return 'warning'
    case 'medium':
      return 'default'
    case 'low':
      return 'secondary'
    default:
      return 'default'
  }
}

export function AppointmentPriorityBadge({ 
  priority, 
  className = '' 
}: AppointmentPriorityBadgeProps) {
  const variant = getPriorityBadgeVariant(priority)
  
  return (
    <Badge variant="default" className={`capitalize ${className}`}>
      {priority}
    </Badge>
  )
}