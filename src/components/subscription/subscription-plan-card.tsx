import { SubscriptionPlanWithDetails } from '@/types/subscription.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlanWithDetails
  isCurrent?: boolean
  isRecommended?: boolean
  billingCycle: 'monthly' | 'yearly'
  onSelect?: (planId: string) => void
  onUpgrade?: (planId: string) => void
}

export function SubscriptionPlanCard({
  plan,
  isCurrent = false,
  isRecommended = false,
  billingCycle,
  onSelect,
  onUpgrade
}: SubscriptionPlanCardProps) {
  const monthlyPrice = plan.price
  const yearlyPrice = monthlyPrice * 12
  const discountedYearlyPrice = plan.savings ? yearlyPrice - plan.savings.yearly : yearlyPrice

  const displayPrice = billingCycle === 'monthly' ? monthlyPrice : discountedYearlyPrice
  const savingsAmount = billingCycle === 'yearly' && plan.savings ? plan.savings.yearly : 0

  const handleAction = () => {
    if (isCurrent) return
    if (onUpgrade) onUpgrade(plan.id)
    if (onSelect) onSelect(plan.id)
  }

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-lg",
      isCurrent && "ring-2 ring-primary",
      isRecommended && "ring-2 ring-green-500"
    )}>
      {(isCurrent || isRecommended) && (
        <div className={cn(
          "absolute top-0 right-0 px-3 py-1 text-xs font-medium text-white",
          isCurrent && "bg-primary",
          isRecommended && "bg-green-500"
        )}>
          {isCurrent ? 'Current Plan' : 'Recommended'}
        </div>
      )}
      
      {plan.popular && (
        <Badge className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          Most Popular
        </Badge>
      )}

      <CardHeader className="space-y-2">
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold">${displayPrice}</span>
          <span className="text-muted-foreground">/{billingCycle}</span>
        </div>

        {billingCycle === 'yearly' && savingsAmount > 0 && (
          <div className="text-sm text-green-600 font-medium">
            Save ${savingsAmount}/year
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Consultations */}
        <div className="bg-muted rounded-lg p-3">
          <div className="text-sm font-medium mb-1">Consultations</div>
          <div className="text-lg font-semibold">
            {plan.consultations.type === 'unlimited' 
              ? 'Unlimited' 
              : `${plan.consultations.included} per month`
            }
          </div>
        </div>

        {/* Medicine Discount */}
        <div className="bg-muted rounded-lg p-3">
          <div className="text-sm font-medium mb-1">Medicine Discount</div>
          <div className="text-lg font-semibold">{plan.medicineDiscount.percentage}% off</div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Features</div>
          {plan.features.slice(0, 5).map((feature) => (
            <div key={feature.id} className="flex items-center space-x-2 text-sm">
              {feature.included ? (
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
              ) : (
                <X className="h-4 w-4 text-red-500 flex-shrink-0" />
              )}
              <span className={cn(!feature.included && "text-muted-foreground line-through")}>
                {feature.name}
              </span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <Button 
          className="w-full"
          variant={isCurrent ? "outline" : "default"}
          disabled={isCurrent}
          onClick={handleAction}
        >
          {isCurrent ? 'Current Plan' : isRecommended ? 'Upgrade to Recommended' : 'Select Plan'}
        </Button>
      </CardContent>
    </Card>
  )
}