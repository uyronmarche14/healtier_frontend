"use client"
import React, { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, TrendingUp, Activity } from 'lucide-react'

interface HealthMetric {
  date: string
  heartRate: number
  bloodPressureSystolic: number
  bloodPressureDiastolic: number
  temperature: number
  weight: number
  steps: number
}

interface HealthMetricsChartProps {
  data?: HealthMetric[]
  title?: string
  className?: string
}

const defaultData: HealthMetric[] = [
  { date: 'Mon', heartRate: 72, bloodPressureSystolic: 120, bloodPressureDiastolic: 80, temperature: 98.6, weight: 150, steps: 8500 },
  { date: 'Tue', heartRate: 75, bloodPressureSystolic: 118, bloodPressureDiastolic: 78, temperature: 98.4, weight: 149.8, steps: 9200 },
  { date: 'Wed', heartRate: 68, bloodPressureSystolic: 122, bloodPressureDiastolic: 82, temperature: 98.8, weight: 150.2, steps: 7800 },
  { date: 'Thu', heartRate: 74, bloodPressureSystolic: 119, bloodPressureDiastolic: 79, temperature: 98.5, weight: 149.9, steps: 8900 },
  { date: 'Fri', heartRate: 71, bloodPressureSystolic: 121, bloodPressureDiastolic: 81, temperature: 98.7, weight: 150.1, steps: 9500 },
  { date: 'Sat', heartRate: 69, bloodPressureSystolic: 117, bloodPressureDiastolic: 77, temperature: 98.3, weight: 149.7, steps: 10200 },
  { date: 'Sun', heartRate: 73, bloodPressureSystolic: 120, bloodPressureDiastolic: 80, temperature: 98.6, weight: 150, steps: 8200 }
]

export function HealthMetricsChart({ 
  data = defaultData, 
  title = "Patient Health Metrics",
  className 
}: HealthMetricsChartProps) {
  const [selectedMetric, setSelectedMetric] = useState<'heartRate' | 'bloodPressure' | 'temperature' | 'weight' | 'steps'>('heartRate')
  const [chartType, setChartType] = useState<'area' | 'line' | 'bar'>('area')

  const metrics = [
    { key: 'heartRate' as const, label: 'Heart Rate', unit: 'bpm', color: '#EF4444', icon: Heart },
    { key: 'bloodPressure' as const, label: 'Blood Pressure', unit: 'mmHg', color: '#3B82F6', icon: Activity },
    { key: 'temperature' as const, label: 'Temperature', unit: '°F', color: '#F59E0B', icon: TrendingUp },
    { key: 'weight' as const, label: 'Weight', unit: 'lbs', color: '#10B981', icon: TrendingUp },
    { key: 'steps' as const, label: 'Steps', unit: 'steps', color: '#8B5CF6', icon: Activity }
  ]

  const currentMetric = metrics.find(m => m.key === selectedMetric)!
  const Icon = currentMetric.icon

  const getChartData = () => {
    return data.map(item => ({
      date: item.date,
      value: selectedMetric === 'bloodPressure' 
        ? item.bloodPressureSystolic 
        : item[selectedMetric as keyof HealthMetric] as number
    }))
  }

  const averageValue = Math.round(
    getChartData().reduce((sum, item) => sum + item.value, 0) / getChartData().length
  )

  const latestValue = getChartData()[getChartData().length - 1]?.value || 0
  const previousValue = getChartData()[getChartData().length - 2]?.value || 0
  const trend = latestValue > previousValue ? 'up' : latestValue < previousValue ? 'down' : 'stable'

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          <p style={{ color: currentMetric.color }}>
            {currentMetric.label}: {payload[0].value} {currentMetric.unit}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold" style={{ color: currentMetric.color }}>
              {latestValue}
            </span>
            <span className="text-muted-foreground">{currentMetric.unit}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className={`h-4 w-4 ${
              trend === 'up' ? 'text-green-500' : 
              trend === 'down' ? 'text-red-500' : 'text-gray-500'
            }`} />
            <span className={
              trend === 'up' ? 'text-green-500' : 
              trend === 'down' ? 'text-red-500' : 'text-gray-500'
            }>
              {trend === 'up' ? 'Increasing' : trend === 'down' ? 'Decreasing' : 'Stable'}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Metric Selection */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {metrics.map((metric) => {
            const MetricIcon = metric.icon
            return (
              <Button
                key={metric.key}
                variant={selectedMetric === metric.key ? 'default' : 'outline'}
                size="sm"
                className="h-12 flex flex-col items-center gap-1"
                onClick={() => setSelectedMetric(metric.key)}
              >
                <MetricIcon className="h-4 w-4" />
                <span className="text-xs">{metric.label}</span>
              </Button>
            )
          })}
        </div>

        {/* Chart Type Selection */}
        <div className="flex gap-2 mb-4">
          {['area', 'line', 'bar'].map((type) => (
            <Button
              key={type}
              variant={chartType === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType(type as any)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>

        {/* Chart */}
        <div className="h-64 flex flex-col">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' && (
              <AreaChart data={getChartData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={currentMetric.color} 
                  fill={currentMetric.color} 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            )}
            {chartType === 'line' && (
              <LineChart data={getChartData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={currentMetric.color} 
                  strokeWidth={3}
                  dot={{ r: 4, fill: currentMetric.color }}
                />
              </LineChart>
            )}
            {chartType === 'bar' && (
              <BarChart data={getChartData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill={currentMetric.color} radius={[2, 2, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-lg font-bold" style={{ color: currentMetric.color }}>
              {averageValue}
            </p>
            <p className="text-xs text-gray-500">Average</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">
              {Math.max(...getChartData().map(d => d.value))}
            </p>
            <p className="text-xs text-gray-500">Highest</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-blue-600">
              {Math.min(...getChartData().map(d => d.value))}
            </p>
            <p className="text-xs text-gray-500">Lowest</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}