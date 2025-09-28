import { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertCircle, TrendingUp, Heart, Activity, Target, Pill, FileText, Smartphone } from 'lucide-react'
import { HealthStatus } from '@/types/health.types'

interface HealthDashboardLayoutProps {
  children: ReactNode
  patientId: string
  healthStatus?: HealthStatus
  onTabChange?: (tab: string) => void
  activeTab?: string
}

export function HealthDashboardLayout({ 
  children, 
  patientId, 
  healthStatus,
  onTabChange,
  activeTab = 'overview' 
}: HealthDashboardLayoutProps) {
  const getStatusBadge = (status: string) => {
    const statusColors = {
      excellent: 'bg-green-100 text-green-800',
      good: 'bg-green-50 text-green-700',
      fair: 'bg-yellow-50 text-yellow-700',
      poor: 'bg-orange-50 text-orange-700',
      critical: 'bg-red-50 text-red-700'
    }
    
    return (
      <Badge className={statusColors[status as keyof typeof statusColors] || 'bg-gray-50 text-gray-700'}>
        Health: {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'vitals', label: 'Vital Signs', icon: Heart },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'devices', label: 'Devices', icon: Smartphone }
  ]

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Health Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your health metrics and track your wellness journey
          </p>
        </div>
        
        {healthStatus && (
          <div className="flex items-center gap-3">
            {getStatusBadge(healthStatus.overall)}
            {healthStatus.unreadAlerts > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                <AlertCircle className="h-3 w-3 mr-1" />
                {healthStatus.unreadAlerts} New Alerts
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Quick Stats Cards */}
      {healthStatus && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vital Signs</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{healthStatus.vitalSignsStatus}</div>
              <p className="text-xs text-muted-foreground">Last checked: 2 hours ago</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Medications</CardTitle>
              <Pill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{healthStatus.medicationStatus}</div>
              <p className="text-xs text-muted-foreground">92% adherence this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{healthStatus.upcomingAppointments}</div>
              <p className="text-xs text-muted-foreground">Appointments this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Goals</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{healthStatus.pendingGoals}</div>
              <p className="text-xs text-muted-foreground">Pending goals</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content with Tabs */}
      <Tabs 
        value={activeTab} 
        onValueChange={onTabChange}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>
        
        <div className="space-y-4">
          {children}
        </div>
      </Tabs>
    </div>
  )
}