import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, CheckCircle, Clock, Heart, Activity, AlertCircle } from 'lucide-react'
import { HealthAlert } from '@/types/health.types'
import { cn } from '@/lib/utils'

interface HealthAlertsCardProps {
  alerts: HealthAlert[]
  onAlertClick?: (alertId: string) => void
  onDismissAlert?: (alertId: string) => void
  onMarkAsRead?: (alertId: string) => void
  className?: string
  maxAlerts?: number
}

export function HealthAlertsCard({ 
  alerts, 
  onAlertClick, 
  onDismissAlert, 
  onMarkAsRead,
  className,
  maxAlerts = 5 
}: HealthAlertsCardProps) {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'medium': return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'low': return <Clock className="h-4 w-4 text-blue-500" />
      default: return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': 
        return <Badge className="bg-red-100 text-red-800">High</Badge>
      case 'medium': 
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case 'low': 
        return <Badge className="bg-blue-100 text-blue-800">Low</Badge>
      default: 
        return <Badge variant="secondary">Info</Badge>
    }
  }

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'vital_sign': return 'border-l-red-500'
      case 'medication': return 'border-l-orange-500'
      case 'appointment': return 'border-l-blue-500'
      case 'lab_result': return 'border-l-purple-500'
      case 'goal': return 'border-l-green-500'
      default: return 'border-l-gray-500'
    }
  }

  const unreadAlerts = alerts.filter(alert => !alert.isRead && alert.isActive)
  const recentAlerts = alerts
    .filter(alert => alert.isActive)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, maxAlerts)

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg">Health Alerts</CardTitle>
          <CardDescription>Important health notifications</CardDescription>
        </div>
        {unreadAlerts.length > 0 && (
          <Badge variant="destructive" className="animate-pulse">
            <Heart className="h-3 w-3 mr-1" />
            {unreadAlerts.length} New
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentAlerts.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No active health alerts</p>
              <p className="text-xs text-muted-foreground mt-1">You're all caught up!</p>
            </div>
          ) : (
            recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  'p-4 border rounded-lg border-l-4 hover:bg-muted/50 transition-colors cursor-pointer',
                  getAlertTypeColor(alert.type),
                  !alert.isRead && 'bg-blue-50/50'
                )}
                onClick={() => onAlertClick?.(alert.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    {getSeverityIcon(alert.severity)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium leading-tight">{alert.title}</h4>
                        <div className="flex items-center gap-2">
                          {getSeverityBadge(alert.severity)}
                          {!alert.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                        {alert.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(new Date(alert.createdAt))}
                        </span>
                        {alert.actionRequired && (
                          <Badge variant="outline" className="text-xs">
                            Action Required
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        {recentAlerts.length > 0 && (
          <div className="flex gap-2 pt-4 border-t">
            <Button size="sm" variant="outline" className="flex-1">
              View All Alerts
            </Button>
            {unreadAlerts.length > 0 && (
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  unreadAlerts.forEach(alert => onMarkAsRead?.(alert.id))
                }}
              >
                Mark All Read
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}