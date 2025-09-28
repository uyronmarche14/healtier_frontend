'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  Pill, 
  DollarSign, 
  CreditCard, 
  Clock, 
  User,
  TrendingUp,
  Package,
  Plus,
  RefreshCw
} from 'lucide-react'
import { usePatients } from '@/hooks/use-patients'
import { useAppointments } from '@/hooks/use-appointments'
import { useSubscriptions } from '@/hooks/use-subscriptions'
import { formatCurrency, formatDate, formatTime, getStatusColor } from '@/lib/utils'

export default function Page() {
  const { patients, loading: patientsLoading, error: patientsError } = usePatients()
  const { appointments, loading: appointmentsLoading, getAppointmentsByPatient } = useAppointments()
  const { subscriptions, loading: subscriptionsLoading, getSubscriptionsByPatient } = useSubscriptions()
  const fullName = (patient: any) => `${patient.firstName} ${patient.lastName}`


  // Get current patient data (in a real app, this would come from auth context)
  const currentPatientId = 'patient-001'
  const currentPatient = patients.find(p => p.id === currentPatientId)

  // Filter data for current patient
  const patientAppointments = appointments.filter(apt => apt.patientId === currentPatientId)
  const patientSubscriptions = subscriptions.filter(sub => sub.patientId === currentPatientId)
  const activeSubscriptions = patientSubscriptions.filter(sub => sub.status === 'active')

  const loading = patientsLoading || appointmentsLoading || subscriptionsLoading

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (patientsError) {
    return (
      <div className="text-center text-red-600">
        <p>Error loading patient data: {patientsError}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Book Appointment
        </Button>
      </div>

    {/* Stats Grid */}
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeSubscriptions.length}</div>
          <p className="text-xs text-muted-foreground">
            {activeSubscriptions.length > 0 ? activeSubscriptions[0].planId : 'No active plans'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(patientSubscriptions.reduce((sum, sub) => sum + sub.price, 0))}
          </div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {patientAppointments.filter(apt => 
              apt.status === 'scheduled' || apt.status === 'confirmed'
            ).length}
          </div>
          <p className="text-xs text-muted-foreground">
            {patientAppointments.length > 0 ? 
              `Next: ${formatDate(patientAppointments[0].date)}` : 
              'No upcoming appointments'
            }
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{patientAppointments.length}</div>
          <p className="text-xs text-muted-foreground">
            {patientAppointments.length > 0 ? 'Total appointments' : 'No appointments'}
          </p>
        </CardContent>
      </Card>
    </div>

    {/* Recent Activity */}
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Active Subscriptions</CardTitle>
          <CardDescription>
            Your current medication plans
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
              {patientAppointments.length > 0 ? (
                patientAppointments.slice(0, 3).map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Dr. {appointment.doctorId}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(appointment.date)} at {formatTime(appointment.date)}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No upcoming appointments</p>
              )}
            </div>
          </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            Your recent medication purchases
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
              {activeSubscriptions.length > 0 ? (
                activeSubscriptions.map((subscription, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">{subscription.planId}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(subscription.price)} / {subscription.billingCycle}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(subscription.status)}>
                      {subscription.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No active subscriptions</p>
              )}
            </div>
          </CardContent>
      </Card>
    </div>
    </div>
  )
}