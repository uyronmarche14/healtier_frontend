'use client'

import React, { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { DataTable } from '@/components/ui/dataTable/data-table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  User, 
  Calendar, 
  Phone, 
  Mail, 
  FileText,
  MoreHorizontal,
  Eye,
  MessageSquare,
  Edit,
  Trash2
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/ui/dataTable/data-table-column-header'

// Sample patient data for demonstration
interface Patient {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  avatar?: string
  dateOfBirth: Date
  bloodType?: string
  allergies?: string[]
  medicalHistory?: string[]
  lastVisit?: Date
  nextAppointment?: Date
  status: 'active' | 'inactive' | 'new'
  totalAppointments: number
  pendingPrescriptions: number
}

const samplePatients: Patient[] = [
  {
    id: 'patient-001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: new Date('1985-03-15'),
    bloodType: 'A+',
    allergies: ['Penicillin', 'Shellfish'],
    medicalHistory: ['Hypertension', 'Diabetes Type 2'],
    lastVisit: new Date('2024-01-15'),
    nextAppointment: new Date('2024-02-15'),
    status: 'active',
    totalAppointments: 12,
    pendingPrescriptions: 2
  },
  {
    id: 'patient-002',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: new Date('1992-07-22'),
    bloodType: 'O-',
    allergies: ['Latex'],
    medicalHistory: ['Asthma'],
    lastVisit: new Date('2024-01-20'),
    nextAppointment: new Date('2024-02-20'),
    status: 'active',
    totalAppointments: 8,
    pendingPrescriptions: 0
  },
  {
    id: 'patient-003',
    firstName: 'Michael',
    lastName: 'Williams',
    email: 'michael.williams@email.com',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: new Date('1978-11-08'),
    bloodType: 'B+',
    allergies: [],
    medicalHistory: ['High Cholesterol'],
    lastVisit: new Date('2024-01-10'),
    nextAppointment: new Date('2024-02-10'),
    status: 'active',
    totalAppointments: 15,
    pendingPrescriptions: 1
  },
  {
    id: 'patient-004',
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily.brown@email.com',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: new Date('1995-05-30'),
    bloodType: 'A-',
    allergies: ['Pollen', 'Dust'],
    medicalHistory: ['Seasonal Allergies'],
    lastVisit: new Date('2024-01-25'),
    nextAppointment: undefined,
    status: 'new',
    totalAppointments: 3,
    pendingPrescriptions: 0
  },
  {
    id: 'patient-005',
    firstName: 'David',
    lastName: 'Davis',
    email: 'david.davis@email.com',
    phone: '+1 (555) 567-8901',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: new Date('1982-09-14'),
    bloodType: 'AB+',
    allergies: ['Sulfa Drugs'],
    medicalHistory: ['Arthritis', 'Gout'],
    lastVisit: new Date('2023-12-20'),
    nextAppointment: new Date('2024-02-05'),
    status: 'active',
    totalAppointments: 20,
    pendingPrescriptions: 3
  },
  {
    id: 'patient-006',
    firstName: 'Lisa',
    lastName: 'Miller',
    email: 'lisa.miller@email.com',
    phone: '+1 (555) 678-9012',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: new Date('1988-12-03'),
    bloodType: 'O+',
    allergies: ['Bee Stings'],
    medicalHistory: ['Anxiety', 'Depression'],
    lastVisit: new Date('2024-01-18'),
    nextAppointment: new Date('2024-02-18'),
    status: 'inactive',
    totalAppointments: 6,
    pendingPrescriptions: 1
  }
]

// Utility functions
const formatDate = (date: Date | undefined) => {
  if (!date) return 'N/A'
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
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

// Row actions component
const RowActions = ({ patient }: { patient: Patient }) => {
  const handleViewProfile = () => {
    console.log('View profile:', patient.id)
    // Navigate to patient profile
  }

  const handleSendMessage = () => {
    console.log('Send message to:', patient.id)
    // Open messaging interface
  }

  const handleEditPatient = () => {
    console.log('Edit patient:', patient.id)
    // Open edit patient modal
  }

  const handleDeletePatient = () => {
    console.log('Delete patient:', patient.id)
    // Show confirmation dialog
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
        <DropdownMenuItem onClick={handleViewProfile}>
          <Eye className="mr-2 h-4 w-4" />
          View Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSendMessage}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Send Message
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleEditPatient}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Patient
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeletePatient} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Patient
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Column definitions
const columns: ColumnDef<Patient>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Patient" />
    ),
    cell: ({ row }) => {
      const patient = row.original
      const initials = `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`
      
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={patient.avatar} alt={`${patient.firstName} ${patient.lastName}`} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">
              {patient.firstName} {patient.lastName}
            </div>
            <div className="text-sm text-muted-foreground">
              Age {calculateAge(patient.dateOfBirth)}
            </div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
    cell: ({ row }) => {
      const patient = row.original
      return (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm">
            <Mail className="h-3 w-3 text-muted-foreground" />
            <span>{patient.email}</span>
          </div>
          {patient.phone && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Phone className="h-3 w-3" />
              <span>{patient.phone}</span>
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'bloodType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Blood Type" />
    ),
    cell: ({ row }) => {
      const bloodType = row.getValue('bloodType') as string
      return bloodType ? (
        <Badge variant="outline" className="font-mono text-xs">
          {bloodType}
        </Badge>
      ) : (
        <span className="text-muted-foreground">N/A</span>
      )
    },
  },
  {
    accessorKey: 'lastVisit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Visit" />
    ),
    cell: ({ row }) => {
      const lastVisit = row.getValue('lastVisit') as Date
      return (
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{formatDate(lastVisit)}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'nextAppointment',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Next Appointment" />
    ),
    cell: ({ row }) => {
      const nextAppointment = row.getValue('nextAppointment') as Date | undefined
      const today = new Date()
      const isOverdue = nextAppointment && nextAppointment < today
      
      return (
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : ''}`}>
            {formatDate(nextAppointment)}
          </span>
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
      const variant = {
        active: 'success',
        inactive: 'secondary',
        new: 'default'
      }[status] as any
      
      return (
        <Badge variant={variant} className="capitalize">
          {status}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'totalAppointments',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Visits" />
    ),
    cell: ({ row }) => {
      const total = row.getValue('totalAppointments') as number
      return (
        <div className="flex items-center gap-1">
          <FileText className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm font-medium">{total}</span>
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <RowActions patient={row.original} />,
  },
]

export default function DoctorPatientsPage() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Patient[]>(samplePatients)

  // Filter functions for toolbar
  const statusOptions = [
    { value: 'active', label: 'Active', icon: '✅' },
    { value: 'inactive', label: 'Inactive', icon: '⚪' },
    { value: 'new', label: 'New', icon: '🆕' }
  ]

  const toolbarActions = (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm">
        <FileText className="mr-2 h-4 w-4" />
        Export
      </Button>
      <Button size="sm">
        <User className="mr-2 h-4 w-4" />
        Add Patient
      </Button>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Patients</h1>
          <p className="text-muted-foreground">
            Manage your patient list and medical records
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        searchPlaceholder="Search patients by name, email, or phone..."
        searchKey="name"
        toolbarActions={toolbarActions}
        onRowClick={(patient) => console.log('Clicked patient:', patient.id)}
        pageSize={10}
        selectable={true}
      />
    </div>
  )
}