'use client'

import React, { useState } from 'react'
import {FileText, Calendar} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/dataTable/data-table'
import { DataTableColumnHeader } from '@/components/ui/dataTable/data-table-column-header'
import { 
  mockDoctorAppointments, 
  mockAppointmentStats 
} from '@/data/doctor-appointments'
import { DoctorAppointment } from '@/types/doctor-appointments'
import {
  AppointmentStatusBadge,
  AppointmentPriorityBadge,
  AppointmentTimeDisplay,
  AppointmentPatientInfo,
  AppointmentProviderInfo,
  AppointmentPendingBadge,
  AppointmentRowActions,
} from '@/components/appointments'

// Action handlers
const handleViewDetails = (appointment: DoctorAppointment) => {
  console.log('View appointment details:', appointment.id)
  // Navigate to appointment details page
}

const handleSendMessage = (patientId: string) => {
  console.log('Send message to patient:', patientId)
  // Open messaging interface
}

const handleCheckIn = (patientId: string) => {
  console.log('Check in patient:', patientId)
  // Check in patient and update status
}

const handleCancel = (appointmentId: string) => {
  console.log('Cancel appointment:', appointmentId)
  // Cancel appointment with confirmation dialog
}



// Column definitions
import { ColumnDef } from '@tanstack/react-table'

const columns: ColumnDef<DoctorAppointment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
        aria-label="Select all"
        className="rounded border-gray-300"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(!!e.target.checked)}
        aria-label="Select row"
        className="rounded border-gray-300"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'appointmentId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Appointment ID" />
    ),
    cell: ({ row }) => {
      const appointmentId = row.getValue('appointmentId') as string
      return (
        <div className="font-mono text-sm font-medium">
          {appointmentId}
        </div>
      )
    },
  },
  {
    accessorKey: 'patient',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Patient" />
    ),
    cell: ({ row }) => {
      const appointment = row.original
      return (
        <AppointmentPatientInfo 
          patient={appointment.patient}
          showAvatar={true}
          showDetails={true}
        />
      )
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date & Time" />
    ),
    cell: ({ row }) => {
      const appointment = row.original
      return (
        <AppointmentTimeDisplay
          date={appointment.date}
          time={appointment.time}
          duration={appointment.duration}
          showIcons={true}
        />
      )
    },
  },
  {
    accessorKey: 'reason',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reason for Visit" />
    ),
    cell: ({ row }) => {
      const reason = row.getValue('reason') as string
      const notes = row.original.notes
      
      return (
        <div className="max-w-xs">
          <div className="font-medium text-sm line-clamp-2">
            {reason}
          </div>
          {notes && (
            <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {notes}
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),

    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <AppointmentStatusBadge
          status={status as any}
          showIcon={true}
        />
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = row.getValue('priority') as string
      return (
        <AppointmentPriorityBadge
          priority={priority as any}
        />
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'provider',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider" />
    ),
    cell: ({ row }) => {
      const provider = row.original.provider
      return (
        <AppointmentProviderInfo
          {...provider}
          showIcon={false}
        />
      )
    },
  },
  {
    accessorKey: 'room',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Room" />
    ),
    cell: ({ row }) => {
      const room = row.getValue('room') as string
      return (
        <Badge variant="outline" className="font-mono text-xs">
          {room}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'pendingPrescriptions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pending" />
    ),
    cell: ({ row }) => {
      const appointment = row.original
      return (
        <AppointmentPendingBadge
          prescriptions={appointment.pendingPrescriptions}
          labOrders={appointment.pendingLabOrders}
          imagingOrders={appointment.pendingImagingOrders}
          showIcon={true}
        />
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const appointment = row.original
      return (
        <AppointmentRowActions
          appointment={appointment}
          onViewDetails={(id) => console.log('View appointment:', id)}
          onSendMessage={(patientId) => console.log('Message patient:', patientId)}
          onCheckIn={(id) => console.log('Check in:', id)}
          onCancel={(id) => console.log('Cancel appointment:', id)}
        />
      )
    },
  },
]

export default function DoctorAppointmentsPage() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<DoctorAppointment[]>(mockDoctorAppointments)

  // Filter functions for toolbar
  const statusOptions = [
    { value: 'scheduled', label: 'Scheduled', icon: '⏰' },
    { value: 'confirmed', label: 'Confirmed', icon: '✅' },
    { value: 'in-progress', label: 'In Progress', icon: '🔄' },
    { value: 'completed', label: 'Completed', icon: '✅' },
    { value: 'cancelled', label: 'Cancelled', icon: '❌' },
    { value: 'no-show', label: 'No Show', icon: '⚠️' }
  ]

  const priorityOptions = [
    { value: 'urgent', label: 'Urgent', icon: '🔴' },
    { value: 'high', label: 'High', icon: '🟡' },
    { value: 'medium', label: 'Medium', icon: '🟢' },
    { value: 'low', label: 'Low', icon: '⚪' }
  ]

  const toolbarActions = (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm">
        <FileText className="mr-2 h-4 w-4" />
        Export Schedule
      </Button>
      <Button size="sm">
        <Calendar className="mr-2 h-4 w-4" />
        New Appointment
      </Button>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">
            Manage your daily schedule and patient appointments
          </p>
        </div>
      </div>

      {/* Stats Cards */}

      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        searchPlaceholder="Search appointments by patient name, ID, or reason..."
        searchKey="patient"
        toolbarActions={toolbarActions}
        onRowClick={(appointment) => console.log('Clicked appointment:', appointment.id)}
        pageSize={10}
        selectable={true}
      />
    </div>
  )
}