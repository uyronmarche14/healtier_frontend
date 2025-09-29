'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Activity, 
  Heart, 
  Target, 
  Pill, 
  FileText, 
  Smartphone, 
  Thermometer,
  Weight,
  Wind,
  Brain,
  AlertCircle,
  Plus
} from "lucide-react"
import { 
  sampleVitalSigns, 
  sampleHealthGoals, 
  sampleMedicationAdherence, 
  sampleHealthAlerts, 
  sampleLabResults,
  sampleEmergencyMedicalInfo,
  sampleConnectedDevices,
  sampleHealthInsights
} from '@/data/health/sample-data'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar
} from 'recharts'

// Import existing health components
import { VitalSignsCard } from '@/components/health/vital-signs-card'
import { HealthGoalsCard } from '@/components/health/health-goals-card'
import { MedicationAdherenceCard } from '@/components/health/medication-adherence-card'
import { HealthAlertsCard } from '@/components/health/health-alerts-card'
import { HealthInsightsCard } from '@/components/health/health-insights-card'
import { LabResultsCard } from '@/components/health/lab-results-card'
import { DeviceIntegrationCard } from '@/components/health/device-integration-card'
import { EmergencyMedicalCard } from '@/components/health/emergency-medical-card'

export function ComprehensiveHealthDashboard() {
  const latestVitals = sampleVitalSigns[0]
  const activeGoals = sampleHealthGoals.filter(goal => goal.isActive)
  const unreadAlerts = sampleHealthAlerts.filter(alert => !alert.isRead)
  const recentLabResults = sampleLabResults.slice(0, 3)
  const connectedDevices = sampleConnectedDevices.filter(device => device.isConnected)
  const insights = sampleHealthInsights.slice(0, 2)
  
  // Format chart data for blood pressure
  const bpChartData = sampleVitalSigns.slice(0, 7).map(vital => ({
    date: new Date(vital.measuredAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    systolic: vital.bloodPressureSystolic,
    diastolic: vital.bloodPressureDiastolic
  })).reverse()

  // Format chart data for heart rate
  const hrChartData = sampleVitalSigns.slice(0, 7).map(vital => ({
    date: new Date(vital.measuredAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    heartRate: vital.heartRate
  })).reverse()

  // Medication adherence data for pie chart
  const medicationPieData = [
    { name: 'Taken', value: sampleMedicationAdherence.filter(m => m.status === 'taken').length, color: '#10b981' },
    { name: 'Missed', value: sampleMedicationAdherence.filter(m => m.status === 'missed').length, color: '#ef4444' },
    { name: 'Late', value: sampleMedicationAdherence.filter(m => m.status === 'pending').length, color: '#f59e0b' }
  ]

  // Calculate medication adherence rate
  const calculateAdherenceRate = () => {
    if (sampleMedicationAdherence.length === 0) return 0
    const takenCount = sampleMedicationAdherence.filter(a => a.status === 'taken').length
    return Math.round((takenCount / sampleMedicationAdherence.length) * 100)
  }

  const adherenceRate = calculateAdherenceRate()

  return (
    <div className="space-y-4">
      {/* Header Section with Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Health Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor your health metrics and manage your wellness journey
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Health Status: Good
          </Badge>
          <Badge variant="destructive" className="animate-pulse">
            <AlertCircle className="h-3 w-3 mr-1" />
            {unreadAlerts.length} New Alerts
          </Badge>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Record Vitals
          </Button>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="vitals" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Vitals</span>
          </TabsTrigger>
          <TabsTrigger value="medications" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            <span className="hidden sm:inline">Medications</span>
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Goals</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
          <TabsTrigger value="devices" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            <span className="hidden sm:inline">Devices</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-4">
          {/* Quick Stats Cards - More Compact */}
          <div className="grid gap-3 md:grid-cols-4">
            <Card className="overflow-hidden border-l-4 border-red-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 py-2">
                <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
                <Heart className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent className="py-2">
                <div className="text-2xl font-bold">{latestVitals.bloodPressureSystolic}/{latestVitals.bloodPressureDiastolic}</div>
                <p className="text-xs text-muted-foreground">mmHg • Last checked today</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-l-4 border-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 py-2">
                <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                <Activity className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent className="py-2">
                <div className="text-2xl font-bold">{latestVitals.heartRate}</div>
                <p className="text-xs text-muted-foreground">bpm • Normal range</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-l-4 border-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 py-2">
                <CardTitle className="text-sm font-medium">Medication</CardTitle>
                <Pill className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent className="py-2">
                <div className="text-2xl font-bold">{adherenceRate}%</div>
                <p className="text-xs text-muted-foreground">Adherence this week</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-l-4 border-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 py-2">
                <CardTitle className="text-sm font-medium">Weight</CardTitle>
                <Weight className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent className="py-2">
                <div className="text-2xl font-bold">{latestVitals.weight}</div>
                <p className="text-xs text-muted-foreground">kg • Trending down</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content - First Row */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Vital Signs Card - Using the component */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Vital Signs</CardTitle>
                  <Button variant="outline" size="sm">
                    <Activity className="h-4 w-4 mr-1" />
                    Record New
                  </Button>
                </div>
                <CardDescription>Latest measurements and trends</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Blood Pressure Chart */}
                <div className="h-[200px] mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={bpChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="systolic" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        name="Systolic"
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="diastolic" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Diastolic"
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Vital Signs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <Badge variant="outline" className="text-xs">BP</Badge>
                    </div>
                    <p className="text-lg font-bold">
                      {latestVitals.bloodPressureSystolic}/{latestVitals.bloodPressureDiastolic}
                    </p>
                    <p className="text-xs text-muted-foreground">mmHg</p>
                  </div>

                  <div className="p-2 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <Badge variant="outline" className="text-xs">HR</Badge>
                    </div>
                    <p className="text-lg font-bold">{latestVitals.heartRate}</p>
                    <p className="text-xs text-muted-foreground">bpm</p>
                  </div>

                  <div className="p-2 bg-amber-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <Thermometer className="h-4 w-4 text-amber-500" />
                      <Badge variant="outline" className="text-xs">Temp</Badge>
                    </div>
                    <p className="text-lg font-bold">{latestVitals.temperature}°C</p>
                    <p className="text-xs text-muted-foreground">Celsius</p>
                  </div>

                  <div className="p-2 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <Wind className="h-4 w-4 text-purple-500" />
                      <Badge variant="outline" className="text-xs">O₂</Badge>
                    </div>
                    <p className="text-lg font-bold">{latestVitals.oxygenSaturation}%</p>
                    <p className="text-xs text-muted-foreground">SpO₂</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Medication Adherence Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Medication Adherence</CardTitle>
                <CardDescription>Weekly medication tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[180px] flex items-center justify-center mb-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={medicationPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {medicationPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {sampleEmergencyMedicalInfo.currentMedications.slice(0, 2).map((med, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Pill className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">{med}</span>
                      </div>
                      <Badge variant="outline">Due today</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content - Second Row */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Health Goals Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Health Goals</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Target className="h-4 w-4 mr-1" />
                    Add Goal
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeGoals.slice(0, 3).map(goal => (
                    <div key={goal.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Target className="h-4 w-4 mr-2 text-green-500" />
                          <span className="text-sm">{goal.type.charAt(0).toUpperCase() + goal.type.slice(1)}</span>
                        </div>
                        <span className="text-sm font-medium">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Current: {goal.current} {goal.unit}</span>
                        <span>Target: {goal.target} {goal.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Health Alerts Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Health Alerts</CardTitle>
                  <Badge variant="destructive">{unreadAlerts.length} New</Badge>
                </div>
              </CardHeader>
              <CardContent className="max-h-[220px] overflow-auto">
                <div className="space-y-2">
                  {unreadAlerts.map(alert => (
                    <div 
                      key={alert.id} 
                      className={`p-2 border-l-4 ${
                        alert.severity === 'high' 
                          ? 'border-red-500 bg-red-50/50' 
                          : alert.severity === 'medium' 
                          ? 'border-amber-500 bg-amber-50/50' 
                          : 'border-blue-500 bg-blue-50/50'
                      } rounded`}
                    >
                      <p className="text-sm font-medium">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">{alert.message.substring(0, 60)}...</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Health Insights Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    AI Insights
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="max-h-[220px] overflow-auto">
                <div className="space-y-2">
                  {insights.map(insight => (
                    <div 
                      key={insight.id} 
                      className="p-2 border-l-4 border-blue-500 bg-blue-50/50 rounded"
                    >
                      <p className="text-sm font-medium">{insight.title}</p>
                      <p className="text-xs text-muted-foreground">{insight.description.substring(0, 60)}...</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content - Third Row */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Lab Results Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Lab Results</CardTitle>
                <CardDescription>Latest test results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentLabResults.slice(0, 3).map((result) => (
                    <div key={result.id} className="p-2 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{result.testName}</p>
                        <Badge className={result.isNormal ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {result.isNormal ? 'Normal' : 'Abnormal'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(result.testedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full mt-2">
                    <FileText className="h-4 w-4 mr-1" />
                    View All Results
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Connected Devices Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Connected Devices</CardTitle>
                <CardDescription>{connectedDevices.length} active devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {connectedDevices.slice(0, 3).map((device) => (
                    <div key={device.id} className="p-2 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Smartphone className="h-4 w-4 mr-2 text-blue-500" />
                          <p className="text-sm font-medium">{device.name}</p>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700">Connected</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last sync: {new Date(device.lastSyncedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full mt-2">
                    <Smartphone className="h-4 w-4 mr-1" />
                    Manage Devices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Vitals Tab Content */}
        <TabsContent value="vitals" className="space-y-4">
          <VitalSignsCard 
            vitalSigns={sampleVitalSigns} 
            latestVitals={latestVitals}
          />
        </TabsContent>
        
        {/* Medications Tab Content */}
        <TabsContent value="medications" className="space-y-4">
          <MedicationAdherenceCard 
            medicationAdherence={sampleMedicationAdherence}
            currentMedications={sampleEmergencyMedicalInfo.currentMedications}
          />
        </TabsContent>
        
        {/* Goals Tab Content */}
        <TabsContent value="goals" className="space-y-4">
          <HealthGoalsCard 
            healthGoals={sampleHealthGoals}
          />
        </TabsContent>
        
        {/* Reports Tab Content */}
        <TabsContent value="reports" className="space-y-4">
          <LabResultsCard 
            labResults={sampleLabResults}
          />
        </TabsContent>
        
        {/* Devices Tab Content */}
        <TabsContent value="devices" className="space-y-4">
          <DeviceIntegrationCard 
            connectedDevices={sampleConnectedDevices}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}