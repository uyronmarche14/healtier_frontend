import React from 'react'
import { Calendar, Clock } from 'lucide-react'

interface AppointmentTimeDisplayProps {
  date: string
  time: string
  duration: number
  showIcons?: boolean
  className?: string
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

export function AppointmentTimeDisplay({ 
  date, 
  time, 
  duration, 
  showIcons = true,
  className = '' 
}: AppointmentTimeDisplayProps) {
  const today = new Date()
  const appointmentDate = new Date(date)
  const isToday = appointmentDate.toDateString() === today.toDateString()
  const isTomorrow = appointmentDate.toDateString() === new Date(today.getTime() + 86400000).toDateString()
  
  let dateLabel = formatDate(date)
  if (isToday) dateLabel = 'Today'
  if (isTomorrow) dateLabel = 'Tomorrow'
  
  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center gap-1 font-medium">
        {showIcons && <Calendar className="h-3 w-3 text-muted-foreground" />}
        <span>{dateLabel}</span>
      </div>
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        {showIcons && <Clock className="h-3 w-3" />}
        <span>{formatTime(time)} • {duration}min</span>
      </div>
    </div>
  )
}