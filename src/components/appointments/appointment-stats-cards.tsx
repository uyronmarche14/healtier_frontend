import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  CheckCircle, 
  Clock3, 
  AlertTriangle,
  Users,
  TrendingUp,
  Activity
} from 'lucide-react'
import { AppointmentStats } from '@/types/doctor-appointments'

interface AppointmentStatsCardsProps {
  stats: AppointmentStats
  className?: string
}

export function AppointmentStatsCards({ stats, className = '' }: AppointmentStatsCardsProps) {
  const statsData = [
    {
      title: "Today's Appointments",
      value: stats.todayAppointments,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      trend: stats.todayAppointments > 0 ? `+${stats.todayAppointments}` : "0"
    },
    {
      title: "Confirmed",
      value: stats.confirmed,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      trend: `${Math.round((stats.confirmed / stats.todayAppointments) * 100)}%`
    },
    {
      title: "Scheduled",
      value: stats.scheduled,
      icon: Clock3,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
      trend: `${Math.round((stats.scheduled / stats.todayAppointments) * 100)}%`
    },
    {
      title: "Urgent Cases",
      value: stats.urgentAppointments,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950",
      trend: stats.urgentAppointments > 0 ? "High" : "Normal"
    }
  ]

  return (
    <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {statsData.map((stat, index) => (
        <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {stat.trend}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}