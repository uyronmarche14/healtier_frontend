import { SubscriptionWithPlan } from '@/types/subscription.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, DollarSign, Activity, TrendingUp } from 'lucide-react'

interface SubscriptionUsageStatsProps {
  subscription: SubscriptionWithPlan
  className?: string
}

export function SubscriptionUsageStats({ subscription, className }: SubscriptionUsageStatsProps) {
  const {
    plan,
    usage = {
      consultationsUsed: 0,
      consultationsRemaining: 0,
      medicineDiscountUsed: 0,
      totalSavings: 0
    },
    totalSavings = 0,
    monthlySavings = 0
  } = subscription

  const usageStats = [
    {
      label: 'Consultations Used',
      current: usage.consultationsUsed || 0,
      total: plan.consultations.included || 0,
      icon: Calendar,
      color: 'bg-blue-500',
      unit: 'consultations'
    },
    {
      label: 'Medicine Discounts',
      current: usage.medicineDiscountUsed || 0,
      total: 0, // No total for discounts
      icon: DollarSign,
      color: 'bg-green-500',
      unit: 'discounts'
    },
    {
      label: 'Total Savings',
      current: usage.totalSavings || 0,
      total: 0, // No total for savings
      icon: TrendingUp,
      color: 'bg-purple-500',
      unit: 'dollars'
    }
  ]

  const getProgressPercentage = (current: number, total: number) => {
    if (total === 0) return 0
    return Math.min((current / total) * 100, 100)
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Usage Overview</span>
          <Badge variant="outline">{plan.name}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {usageStats.map((stat, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {stat.current} / {stat.total} {stat.unit}
              </span>
            </div>
            
            {stat.total > 0 && (
              <>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(getProgressPercentage(stat.current, stat.total))}`}
                    style={{ width: `${getProgressPercentage(stat.current, stat.total)}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{getProgressPercentage(stat.current, stat.total).toFixed(0)}% used</span>
                  <span>{stat.total - stat.current} remaining</span>
                </div>
              </>
            )}
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${monthlySavings}</div>
              <div className="text-xs text-muted-foreground">Monthly Savings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${totalSavings}</div>
              <div className="text-xs text-muted-foreground">Total Savings</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Alternative compact version for dashboard widgets
export function SubscriptionUsageCompact({ subscription, className }: SubscriptionUsageStatsProps) {
  const { plan, usage = {
    consultationsUsed: 0,
    consultationsRemaining: 0,
    medicineDiscountUsed: 0,
    totalSavings: 0
  }, totalSavings = 0 } = subscription

  const keyMetrics = [
    {
      label: 'Consultations',
      value: `${usage.consultationsUsed || 0}/${plan.consultations.included || 0}`,
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      label: 'Savings',
      value: `$${totalSavings}`,
      icon: TrendingUp,
      color: 'text-green-600'
    }
  ]

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {keyMetrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
              <span className="text-sm text-muted-foreground">{metric.label}</span>
            </div>
            <span className="font-semibold">{metric.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}