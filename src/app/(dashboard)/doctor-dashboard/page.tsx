'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Calendar,
  FileText,
  MessageSquare,
  Clock,
  Plus
} from 'lucide-react'
import { useDoctors } from '@/hooks/use-doctors'
import { useAppointments } from '@/hooks/use-appointments'
import { usePatients } from '@/hooks/use-patients'
import { formatDate, formatTime, getStatusColor } from '@/lib/utils'

export default function DoctorDashboard() {
  const { doctors, loading: doctorsLoading, error: doctorsError } = useDoctors()
  const { appointments, loading: appointmentsLoading, error: appointmentsError } = useAppointments()
  const { patients, loading: patientsLoading, error: patientsError } = usePatients()

  // Get current doctor data (in a real app, this would come from auth context)
  const currentDoctorId = 'doctor-001'
  const currentDoctor = doctors.find(d => d.id === currentDoctorId)

  // Filter data for current doctor
  const doctorAppointments = appointments.filter(apt => apt.doctorId === currentDoctorId)
  
  // Get today's appointments
  const today = new Date()
  const todayAppointments = doctorAppointments.filter(apt => {
    const appointmentDate = new Date(apt.date)
    return appointmentDate.toDateString() === today.toDateString()
  })
  
  const activePatients = new Set(doctorAppointments.map(apt => apt.patientId)).size

  const loading = doctorsLoading || appointmentsLoading || patientsLoading

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (doctorsError || appointmentsError || patientsError) {
    return (
      <div className="text-center text-red-600">
        <p>Error loading doctor data: {doctorsError || appointmentsError || patientsError}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doctor Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your patients and appointments
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

    {/* Stats Grid */}
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activePatients}</div>
          <p className="text-xs text-muted-foreground">
            +2 this week
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{todayAppointments.length}</div>
          <p className="text-xs text-muted-foreground">
            {todayAppointments.length > 0 ? 
              `Next: ${formatTime(todayAppointments[0].date)}` : 
              'No appointments today'
            }
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Scheduled Appointments</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{doctorAppointments.filter(apt => apt.status === 'scheduled').length}</div>
          <p className="text-xs text-muted-foreground">
            Need review
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{doctorAppointments.filter(apt => apt.status === 'confirmed').length}</div>
          <p className="text-xs text-muted-foreground">
            3 unread
          </p>
        </CardContent>
      </Card>
    </div>

    {/* Recent Activity */}
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>
            Your appointments for today
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
              {todayAppointments.length > 0 ? (
                todayAppointments.map((appointment, index) => {
                  const patient = patients.find(p => p.id === appointment.patientId)
                  return (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="text-sm font-medium">{formatTime(appointment.date)}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient'}</p>
                        <p className="text-xs text-muted-foreground">{appointment.type}</p>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground">No appointments scheduled for today</p>
              )}
            </div>
          </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
          <CardDescription>
            Patient communications
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
              {doctorAppointments.slice(0, 3).map((appointment, index) => {
                const patient = patients.find(p => p.id === appointment.patientId)
                return (
                  <div key={index} className="flex items-start gap-4 p-3 border rounded-lg">
                    <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient'}</p>
                      <p className="text-xs text-muted-foreground">
                        {appointment.type} appointment - {formatDate(appointment.date)}
                      </p>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                )
              })}
              {doctorAppointments.length === 0 && (
                <p className="text-sm text-muted-foreground">No recent patient communications</p>
              )}
            </div>
          </CardContent>
      </Card>
    </div>
    </div>
  )
}