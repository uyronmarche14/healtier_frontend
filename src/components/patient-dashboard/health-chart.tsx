'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, TrendingUp } from 'lucide-react'

interface HealthChartProps {
  onViewDetails?: () => void
}

export default function HealthChart({ onViewDetails }: HealthChartProps) {
  // Simple health data for the week
  const weekData = [
    { day: 'Mon', value: 85, label: 'M' },
    { day: 'Tue', value: 78, label: 'T' },
    { day: 'Wed', value: 92, label: 'W' },
    { day: 'Thu', value: 88, label: 'T' },
    { day: 'Fri', value: 95, label: 'F' },
    { day: 'Sat', value: 82, label: 'S' },
    { day: 'Sun', value: 90, label: 'S' }
  ]

  const maxValue = Math.max(...weekData.map(d => d.value))
  const avgValue = Math.round(weekData.reduce((sum, d) => sum + d.value, 0) / weekData.length)

  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-gray-900">Health Score Trend</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewDetails}
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Simple Bar Chart */}
        <div className="space-y-4">
          <div className="flex items-end justify-between h-24 gap-2">
            {weekData.map((day, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <div 
                  className="w-full bg-gray-200 rounded-t transition-all duration-300 hover:bg-gray-300 min-h-[4px]"
                  style={{ height: `${(day.value / maxValue) * 80}px` }}
                  title={`${day.day}: ${day.value}%`}
                />
                <span className="text-xs text-gray-500 font-medium">{day.label}</span>
              </div>
            ))}
          </div>
          
          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-600">Average: {avgValue}%</span>
            </div>
            <span className="text-sm font-medium text-green-600">+3% this week</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}