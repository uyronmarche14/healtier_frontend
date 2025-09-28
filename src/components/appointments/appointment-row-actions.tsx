import React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Eye, MessageSquare, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react'
import { DoctorAppointment, AppointmentStatus } from '@/types/doctor-appointments'

interface AppointmentRowActionsProps {
  appointment: DoctorAppointment
  onViewDetails?: (appointment: DoctorAppointment) => void
  onSendMessage?: (patientId: string) => void
  onCheckIn?: (patientId: string) => void
  onCancel?: (appointmentId: string) => void
}

export function AppointmentRowActions({ 
  appointment, 
  onViewDetails,
  onSendMessage,
  onCheckIn,
  onCancel
}: AppointmentRowActionsProps) {
  const handleViewDetails = () => {
    console.log('View appointment details:', appointment.id)
    onViewDetails?.(appointment)
  }

  const handleSendMessage = () => {
    console.log('Send message to patient:', appointment.patient.id)
    onSendMessage?.(appointment.patient.id)
  }

  const handleCheckIn = () => {
    console.log('Check in patient:', appointment.patient.id)
    onCheckIn?.(appointment.patient.id)
  }

  const handleCancel = () => {
    console.log('Cancel appointment:', appointment.id)
    onCancel?.(appointment.id)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleViewDetails}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSendMessage}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Message Patient
        </DropdownMenuItem>
        {appointment.status === 'scheduled' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleCheckIn}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Check In
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCancel} className="text-red-600">
              <XCircle className="mr-2 h-4 w-4" />
              Cancel
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}