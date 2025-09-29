'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Pill, 
  MessageSquare, 
  Activity,
  ArrowRight,
  Plus
} from 'lucide-react'

interface QuickOverviewStatsProps {
  stats: {
    nextAppointment: string
    pendingMeds: number
    unreadMessages: number
    healthScore: number
  }
  onQuickAction: (action: string) => void
}

export default function QuickOverviewStats({ stats, onQuickAction }: QuickOverviewStatsProps) {
  const quickStats = [
    {
      id: 'appointment',
      label: 'Next Appointment',
      value: stats.nextAppointment,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: 'View Appointments'
    },
    {
      id: 'medications',
      label: 'Pending Medications',
      value: stats.pendingMeds.toString(),
      icon: Pill,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: 'Take Medication'
    },
    {
      id: 'messages',
      label: 'Unread Messages',
      value: stats.unreadMessages.toString(),
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      action: 'Read Messages'
    },
    {
      id: 'health',
      label: 'Health Score',
      value: `${stats.healthScore}%`,
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      action: 'View Details'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickStats.map((stat) => (
        <Card key={stat.id} className="border-0 shadow-sm hover:shadow-md transition-shadow group">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onQuickAction(stat.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
              >
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onQuickAction(stat.id)}
              className="w-full mt-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {stat.action}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}