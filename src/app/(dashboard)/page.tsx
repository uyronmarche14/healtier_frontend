'use client'

import { DashboardLayout } from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Calendar, DollarSign, TrendingUp, Activity, Plus, RefreshCw } from 'lucide-react'
import { useDashboard } from '@/hooks/use-dashboard'
import { usePatients } from '@/hooks/use-patients'
import { useAppointments } from '@/hooks/use-appointments'
import { formatCurrency, formatNumber } from '@/lib/utils'

export default function DashboardPage() {
  const { stats, activities, loading, error, refetch } = useDashboard()
  const { patients } = usePatients()
  const { appointments } = useAppointments()

  if (loading) {
    return (
      <DashboardLayout userRole="admin" userName="Dr. Sarah Johnson">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout userRole="admin" userName="Dr. Sarah Johnson">
        <div className="text-center text-red-600">
          <p>Error loading dashboard data: {error}</p>
          <Button onClick={refetch} className="mt-4">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="admin" userName="Dr. Sarah Johnson">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={refetch}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(stats?.monthlyRevenue || 0)}
              </div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNumber(stats?.totalPatients || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                {patients.length > 0 ? `${patients.filter(p => p.isActive).length} active` : 'Loading...'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNumber(stats?.totalAppointments || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                {appointments.length > 0 ? `${appointments.filter(a => a.status === 'scheduled').length} scheduled` : 'Loading...'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNumber(stats?.activeSubscriptions || 0)}
              </div>
              <p className="text-xs text-muted-foreground">+8.2% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.length > 0 ? (
                  activities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <Activity className={`h-4 w-4 ${
                        activity.type === 'appointment' ? 'text-blue-500' :
                        activity.type === 'subscription' ? 'text-green-500' :
                        'text-purple-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent activity</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Schedule Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Add New Patient
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}