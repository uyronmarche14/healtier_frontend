import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { AlertTriangle, CheckCircle, Clock, Pill, Calendar, TrendingUp } from 'lucide-react'
import { MedicationAdherence } from '@/types/health.types'
import {Button} from  "@/components/ui/button"

interface MedicationAdherenceCardProps {
  adherence: MedicationAdherence[]
  className?: string
  onMedicationClick?: (prescriptionId: string) => void
}

export function MedicationAdherenceCard({ 
  adherence, 
  className, 
  onMedicationClick 
}: MedicationAdherenceCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'taken': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'missed': return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'late': return <Clock className="h-4 w-4 text-yellow-500" />
      default: return <Pill className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'taken': 
        return <Badge className="bg-green-100 text-green-800">Taken</Badge>
      case 'missed': 
        return <Badge className="bg-red-100 text-red-800">Missed</Badge>
      case 'late': 
        return <Badge className="bg-yellow-100 text-yellow-800">Late</Badge>
      default: 
        return <Badge variant="secondary">Scheduled</Badge>
    }
  }

  const calculateAdherenceRate = () => {
    if (!adherence || adherence.length === 0) return 0
    const takenCount = adherence.filter(a => a.status === 'taken').length
    return Math.round((takenCount / adherence.length) * 100)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const adherenceRate = calculateAdherenceRate()

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg">Medication Adherence</CardTitle>
          <CardDescription>Track your medication schedule</CardDescription>
        </div>
        <Badge variant="outline">{adherenceRate}% Adherence</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Adherence Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Weekly Adherence</span>
              <span className="font-medium">{adherenceRate}%</span>
            </div>
            <Progress value={adherenceRate} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{adherence?.filter(a => a.status === 'taken')?.length || 0} taken</span>
              <span>{adherence?.filter(a => a.status === 'missed')?.length || 0} missed</span>
            </div>
          </div>

          {/* Recent Medications */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Recent Activity</h4>
            {adherence.length === 0 ? (
              <div className="text-center py-4">
                <Pill className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No medication records</p>
              </div>
            ) : (
              <div className="space-y-2">
                {adherence.slice(0, 5).map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => onMedicationClick?.(record.prescriptionId)}
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(record.status)}
                      <div>
                        <p className="text-sm font-medium">
                          {formatDate(record.scheduledTime)} at {formatTime(record.scheduledTime)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {record.notes || 'No notes'}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(record.status)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              View Schedule
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Trends
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}