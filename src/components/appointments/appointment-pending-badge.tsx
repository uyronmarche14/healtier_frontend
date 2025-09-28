import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Pill } from 'lucide-react'

interface AppointmentPendingBadgeProps {
  prescriptions: number
  labOrders: number
  imagingOrders: number
  showIcon?: boolean
  className?: string
}

export function AppointmentPendingBadge({ 
  prescriptions, 
  labOrders, 
  imagingOrders, 
  showIcon = true,
  className = '' 
}: AppointmentPendingBadgeProps) {
  const totalPending = prescriptions + labOrders + imagingOrders
  
  if (totalPending === 0) {
    return (
      <Badge variant="secondary" className={`text-xs ${className}`}>
        All Clear
      </Badge>
    )
  }
  
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {showIcon && <Pill className="h-3 w-3 text-muted-foreground" />}
      <Badge variant={totalPending > 3 ? 'destructive' : 'default'} className="text-xs">
        {totalPending} pending
      </Badge>
    </div>
  )
}