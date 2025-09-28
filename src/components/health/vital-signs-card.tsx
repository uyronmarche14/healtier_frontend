import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, TrendingUp, TrendingDown, Activity, Heart, Thermometer, Weight, Wind } from 'lucide-react'
import { VitalSigns } from '@/types/health.types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { format } from 'date-fns'

interface VitalSignsCardProps {
  vitalSigns: VitalSigns[]
  latestVitals?: VitalSigns
  className?: string
  onAddVitals?: () => void
  onViewHistory?: () => void
}

export function VitalSignsCard({ 
  vitalSigns, 
  latestVitals,
  className, 
  onAddVitals, 
  onViewHistory 
}: VitalSignsCardProps) {
  const getVitalStatus = (value: number, type: string) => {
    switch (type) {
      case 'systolic':
        if (value < 120) return { status: 'normal', color: 'text-green-500', bgColor: 'bg-green-100' }
        if (value < 130) return { status: 'elevated', color: 'text-yellow-500', bgColor: 'bg-yellow-100' }
        if (value < 140) return { status: 'high_stage1', color: 'text-orange-500', bgColor: 'bg-orange-100' }
        return { status: 'high_stage2', color: 'text-red-500', bgColor: 'bg-red-100' }
      case 'heartRate':
        if (value >= 60 && value <= 100) return { status: 'normal', color: 'text-green-500', bgColor: 'bg-green-100' }
        return { status: 'abnormal', color: 'text-red-500', bgColor: 'bg-red-100' }
      case 'temperature':
        if (value >= 36.1 && value <= 37.2) return { status: 'normal', color: 'text-green-500', bgColor: 'bg-green-100' }
        if (value < 36.1) return { status: 'low', color: 'text-blue-500', bgColor: 'bg-blue-100' }
        return { status: 'fever', color: 'text-red-500', bgColor: 'bg-red-100' }
      default:
        return { status: 'normal', color: 'text-gray-500', bgColor: 'bg-gray-100' }
    }
  }

  const formatVitalSignsData = () => {
    return vitalSigns.map(vital => ({
      date: format(new Date(vital.measuredAt), 'MMM dd'),
      systolic: vital.bloodPressureSystolic,
      diastolic: vital.bloodPressureDiastolic,
      heartRate: vital.heartRate,
      temperature: vital.temperature,
      weight: vital.weight,
      oxygenSaturation: vital.oxygenSaturation
    }))
  }

  const chartData = formatVitalSignsData()
  const currentVitals = latestVitals || vitalSigns[0]

  if (!currentVitals) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Vital Signs</CardTitle>
          <CardDescription>No vital signs data available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No vital signs recorded</p>
            <Button onClick={onAddVitals} className="mt-3">
              Add Vital Signs
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const bpStatus = getVitalStatus(currentVitals.bloodPressureSystolic, 'systolic')
  const hrStatus = getVitalStatus(currentVitals.heartRate, 'heartRate')
  const tempStatus = getVitalStatus(currentVitals.temperature, 'temperature')

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-lg">Vital Signs</CardTitle>
          <CardDescription>Latest measurements and trends</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button onClick={onAddVitals} size="sm" variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            Add
          </Button>
          <Button onClick={onViewHistory} size="sm" variant="outline">
            History
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current Vitals Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Blood Pressure */}
          <div className={`p-4 rounded-lg ${bpStatus.bgColor}`}>
            <div className="flex items-center justify-between mb-2">
              <Heart className="h-4 w-4" />
              <Badge variant="secondary" className={bpStatus.color}>
                BP
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">
                {currentVitals.bloodPressureSystolic}/{currentVitals.bloodPressureDiastolic}
              </p>
              <p className="text-xs text-muted-foreground">mmHg</p>
            </div>
          </div>

          {/* Heart Rate */}
          <div className={`p-4 rounded-lg ${hrStatus.bgColor}`}>
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-4 w-4" />
              <Badge variant="secondary" className={hrStatus.color}>
                HR
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{currentVitals.heartRate}</p>
              <p className="text-xs text-muted-foreground">bpm</p>
            </div>
          </div>

          {/* Temperature */}
          <div className={`p-4 rounded-lg ${tempStatus.bgColor}`}>
            <div className="flex items-center justify-between mb-2">
              <Thermometer className="h-4 w-4" />
              <Badge variant="secondary" className={tempStatus.color}>
                Temp
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{currentVitals.temperature}°C</p>
              <p className="text-xs text-muted-foreground">Celsius</p>
            </div>
          </div>

          {/* Weight */}
          <div className="p-4 rounded-lg bg-blue-100">
            <div className="flex items-center justify-between mb-2">
              <Weight className="h-4 w-4" />
              <Badge variant="secondary" className="text-blue-700">
                Weight
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{currentVitals.weight}</p>
              <p className="text-xs text-muted-foreground">kg</p>
            </div>
          </div>
        </div>

        {/* Additional Vitals */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-3 border rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Wind className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Oxygen Saturation</span>
            </div>
            <p className="text-lg font-semibold">{currentVitals.oxygenSaturation}%</p>
            <p className="text-xs text-muted-foreground">Normal: 95-100%</p>
          </div>

          <div className="p-3 border rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Respiratory Rate</span>
            </div>
            <p className="text-lg font-semibold">{currentVitals.respiratoryRate}</p>
            <p className="text-xs text-muted-foreground">breaths/min</p>
          </div>

          <div className="p-3 border rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Height</span>
            </div>
            <p className="text-lg font-semibold">{currentVitals.height} cm</p>
            <p className="text-xs text-muted-foreground">BMI: {calculateBMI(currentVitals.weight, currentVitals.height)}</p>
          </div>
        </div>

        {/* Trends Chart */}
        {chartData.length > 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">7-Day Trends</h4>
              <div className="flex gap-2">
                <Badge variant="outline">Blood Pressure</Badge>
                <Badge variant="outline">Heart Rate</Badge>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="systolic" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Systolic BP"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="diastolic" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    name="Diastolic BP"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="heartRate" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Heart Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Measurement Notes */}
        {currentVitals.notes && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Notes:</strong> {currentVitals.notes}
            </p>
          </div>
        )}

        {/* Measurement Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Measured: {format(new Date(currentVitals.createdAt), 'PPp')}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function calculateBMI(weight: number, height: number): string {
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  return bmi.toFixed(1)
}