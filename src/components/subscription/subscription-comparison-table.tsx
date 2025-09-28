import { SubscriptionPlanWithDetails } from '@/types/subscription.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, X, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SubscriptionComparisonTableProps {
  plans: SubscriptionPlanWithDetails[]
  currentPlanId?: string
  onPlanSelect: (planId: string) => void
  billingCycle: 'monthly' | 'yearly'
  className?: string
}

export function SubscriptionComparisonTable({
  plans,
  currentPlanId,
  onPlanSelect,
  billingCycle,
  className
}: SubscriptionComparisonTableProps) {
  const getPrice = (plan: SubscriptionPlanWithDetails) => {
    return billingCycle === 'monthly' ? plan.price : plan.price * 12
  }

  const getFeatureIcon = (value: boolean | string | number) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-red-500" />
      )
    }
    if (typeof value === 'number') {
      return <span className="text-sm font-medium">{value}</span>
    }
    return <span className="text-sm">{value}</span>
  }

  const allFeatures = Array.from(
    new Set(plans.flatMap(plan => plan.features.map(f => f.id)))
  )

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Plan Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">Features</th>
                {plans.map((plan) => (
                  <th key={plan.id} className="text-center p-4 min-w-[150px]">
                    <div className="space-y-2">
                      <div className="font-semibold text-lg">{plan.name}</div>
                      <div className="text-2xl font-bold text-primary">
                        ${getPrice(plan)}
                        <span className="text-sm text-muted-foreground">/{billingCycle}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{plan.description}</div>
                      <div className="flex justify-center">
                        {plan.id === currentPlanId ? (
                          <Badge variant="secondary">Current Plan</Badge>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => onPlanSelect(plan.id)}
                            className={cn(
                              "w-full",
                              plan.popular && "bg-gradient-to-r from-purple-500 to-pink-500"
                            )}
                          >
                            Select
                          </Button>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((feature, index) => (
                <tr key={feature} className={cn(
                  "border-b",
                  index % 2 === 0 && "bg-muted/50"
                )}>
                  <td className="p-4 font-medium capitalize">
                    {feature.replace(/([A-Z])/g, ' $1').trim()}
                  </td>
                  {plans.map((plan) => {
                    const planFeature = plan.features.find(f => f.id === feature)
                    return (
                      <td key={plan.id} className="p-4 text-center">
                        {getFeatureIcon(planFeature?.included ?? false)}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// Alternative mobile-friendly comparison view
export function SubscriptionComparisonMobile({
  plans,
  currentPlanId,
  onPlanSelect,
  billingCycle,
  className
}: SubscriptionComparisonTableProps) {
  const getPrice = (plan: SubscriptionPlanWithDetails) => {
    return billingCycle === 'monthly' ? plan.price : plan.price * 12
  }

  return (
    <div className={cn("space-y-6", className)}>
      {plans.map((plan) => (
        <Card key={plan.id} className={cn(
          "overflow-hidden",
          plan.popular && "border-2 border-purple-200 shadow-lg"
        )}>
          {plan.popular && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-medium">
              Most Popular
            </div>
          )}
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              {plan.id === currentPlanId && (
                <Badge variant="secondary">Current</Badge>
              )}
            </div>
            <div className="text-3xl font-bold text-primary mt-4">
              ${getPrice(plan)}
              <span className="text-sm text-muted-foreground">/{billingCycle}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <div key={feature.id} className="flex items-center space-x-3">
                  {feature.included ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm capitalize">
                    {feature.name}
                    {feature.value && ` (${feature.value})`}
                  </span>
                </div>
              ))}
            </div>
            
            {plan.id !== currentPlanId && (
              <Button
                onClick={() => onPlanSelect(plan.id)}
                className={cn(
                  "w-full"
                )}
              >
                Select Plan
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}