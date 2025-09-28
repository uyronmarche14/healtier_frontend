import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Brain, TrendingUp, Heart, Activity, Lightbulb, AlertCircle, CheckCircle, Eye } from 'lucide-react'
import { HealthInsight } from '@/types/health.types'
import { format } from 'date-fns'

interface HealthInsightsCardProps {
  insights: HealthInsight[]
  className?: string
  onViewDetails?: (insight: HealthInsight) => void
  onDismiss?: (insightId: string) => void
}

export function HealthInsightsCard({ 
  insights, 
  className, 
  onViewDetails, 
  onDismiss 
}: HealthInsightsCardProps) {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend':
        return <TrendingUp className="h-5 w-5" />
      case 'alert':
        return <AlertCircle className="h-5 w-5" />
      case 'recommendation':
        return <Lightbulb className="h-5 w-5" />
      case 'prediction':
        return <Brain className="h-5 w-5" />
      default:
        return <Activity className="h-5 w-5" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'trend':
        return 'bg-blue-100 text-blue-600'
      case 'alert':
        return 'bg-red-100 text-red-600'
      case 'recommendation':
        return 'bg-green-100 text-green-600'
      case 'prediction':
        return 'bg-purple-100 text-purple-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600'
    if (confidence >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  // Removed getSeverityColor function as severity property doesn't exist

  const unreadInsights = insights.filter(insight => !insight.isRead)
  const recentInsights = insights.slice(0, 5)

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Health Insights
          </CardTitle>
          <CardDescription>Personalized health recommendations and alerts</CardDescription>
        </div>
        {unreadInsights.length > 0 && (
          <Badge variant="destructive">{unreadInsights.length} new</Badge>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {insights.length === 0 ? (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No insights available</p>
            <p className="text-xs text-muted-foreground mt-1">
              Insights will appear as we analyze your health data
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentInsights.map((insight) => (
              <div 
                key={insight.id} 
                className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${
                  !insight.isRead ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getInsightColor(insight.type)}`}>
                      {getInsightIcon(insight.type)}
                    </div>
                    <div>
                      <h4 className="font-medium">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground capitalize">
                        {insight.type} • {format(new Date(insight.createdAt), 'MMM dd, HH:mm')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">
                      {insight.type}
                    </Badge>
                    {!insight.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {insight.description}
                </p>

                {/* Key Points */}
                {insight.actionItems && insight.actionItems.length > 0 && (
                  <div className="mt-3">
                    <h5 className="text-sm font-medium mb-2">Action Items:</h5>
                    <ul className="space-y-1">
                      {insight.actionItems.map((item, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Supporting Data */}
                {insight.dataPoints && Object.keys(insight.dataPoints).length > 0 && (
                  <div className="mt-3">
                    <h5 className="text-sm font-medium mb-2">Supporting Data:</h5>
                    <div className="space-y-2">
                      {Object.entries(insight.dataPoints).map(([key, value], index) => (
                        <div key={index} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                          <span className="text-muted-foreground">{key}:</span>
                          <span className="font-medium">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Confidence Level */}
                 <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-2">
                     <span className="text-xs text-muted-foreground">Confidence:</span>
                     <span className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                       {insight.confidence}%
                     </span>
                   </div>
                   <div className="text-xs text-muted-foreground">
                     Created: {insight.createdAt.toLocaleDateString()}
                   </div>
                 </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => onViewDetails?.(insight)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  {!insight.isRead && (
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => onDismiss?.(insight.id)}
                    >
                      Dismiss
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          <Button size="sm" variant="outline" className="flex-1">
            <Brain className="h-4 w-4 mr-2" />
            View All Insights
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <TrendingUp className="h-4 w-4 mr-2" />
            AI Settings
          </Button>
        </div>

        {/* AI Model Info */}
        <div className="p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">AI Model Version:</span>
            <span className="font-mono">v2.1.3</span>
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-muted-foreground">Last Training:</span>
            <span>{format(new Date('2024-01-15'), 'MMM dd, yyyy')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}