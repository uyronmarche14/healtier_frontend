"use client"
import React from 'react'
import { Pie, PieChart, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, TrendingUp } from 'lucide-react'

interface PatientDemographics {
  name: string
  value: number
  color: string
}

interface PatientDemographicsChartProps {
  data: PatientDemographics[]
  title?: string
  className?: string
}

const defaultData: PatientDemographics[] = [
  { name: '18-30', value: 45, color: '#3B82F6' },
  { name: '31-45', value: 78, color: '#10B981' },
  { name: '46-60', value: 62, color: '#F59E0B' },
  { name: '60+', value: 34, color: '#EF4444' }
]

export function PatientDemographicsChart({ 
  data = defaultData, 
  title = "Patient Demographics",
  className 
}: PatientDemographicsChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const maxCategory = data.reduce((max, item) => item.value > max.value ? item : max)

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Users className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <span>{total} total patients</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data as any}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} patients`, 'Count']}
                labelFormatter={(label) => `Age ${label}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">
                {item.name}: {item.value} ({Math.round((item.value / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Largest group:</span> {maxCategory.name} years 
            with {maxCategory.value} patients ({Math.round((maxCategory.value / total) * 100)}%)
          </p>
        </div>
      </CardContent>
    </Card>
  )
}