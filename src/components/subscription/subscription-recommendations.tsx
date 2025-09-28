import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Brain, TrendingUp, CheckCircle } from 'lucide-react'
import { PlanRecommendation } from '@/types/subscription.types'
import { cn } from '@/lib/utils'

interface SubscriptionRecommendationsProps {
  recommendations: PlanRecommendation[]
  onPlanSelect?: (planId: string) => void
  className?: string
}

export function SubscriptionRecommendations({ recommendations, onPlanSelect, className }: SubscriptionRecommendationsProps) {
  const topRecommendation = recommendations[0]

  if (!topRecommendation) {
    return null
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <CardTitle className="text-lg">AI-Powered Recommendation</CardTitle>
        </div>
        <CardDescription>
          Based on your usage patterns and health needs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-semibold text-purple-900">{topRecommendation.planName}</h4>
              <p className="text-sm text-purple-700 mt-1">{topRecommendation.reason}</p>
            </div>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Recommended
            </Badge>
          </div>
          
          {topRecommendation.annualSavings && (
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                Save ${topRecommendation.annualSavings} annually
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600">
                {topRecommendation.confidence}% confidence
              </span>
            </div>
            <Button
              size="sm"
              onClick={() => onPlanSelect?.(topRecommendation.planId)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              View Plan
            </Button>
          </div>
        </div>

        {topRecommendation.benefits && topRecommendation.benefits.length > 0 && (
          <div className="space-y-2">
            <h5 className="font-medium text-gray-900">Key Benefits:</h5>
            <ul className="space-y-1">
              {topRecommendation.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Alternative compact version for dashboard
export function SubscriptionRecommendationsCompact({
  recommendations,
  onPlanSelect,
  className
}: SubscriptionRecommendationsProps) {
  const topRecommendation = recommendations[0]

  if (!topRecommendation) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-purple-600" />
            <CardTitle className="text-base">AI Recommendation</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">No recommendations available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-purple-600" />
            <CardTitle className="text-base">AI Recommendation</CardTitle>
          </div>
          <Badge variant="secondary" className="text-xs">
            {topRecommendation.confidence}% confidence
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h4 className="font-medium text-purple-900">{topRecommendation.planName}</h4>
          <p className="text-sm text-gray-600 mt-1">{topRecommendation.reason}</p>
        </div>
        
        {topRecommendation.annualSavings && (
          <div className="flex items-center gap-2">
            <TrendingUp className="h-3 w-3 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              Save ${topRecommendation.annualSavings}/year
            </span>
          </div>
        )}

        <Button
          size="sm"
          onClick={() => onPlanSelect?.(topRecommendation.planId)}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          View Plan
        </Button>
      </CardContent>
    </Card>
  )
}