import { SubscriptionBenefit } from '@/types/subscription.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface SubscriptionBenefitsGridProps {
  benefits: SubscriptionBenefit[]
  className?: string
}

export function SubscriptionBenefitsGrid({ benefits, className }: SubscriptionBenefitsGridProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'savings': return 'bg-green-100 text-green-800'
      case 'health': return 'bg-blue-100 text-blue-800'
      case 'convenience': return 'bg-purple-100 text-purple-800'
      case 'support': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'savings': return '💰'
      case 'health': return '🏥'
      case 'convenience': return '⚡'
      case 'support': return '🤝'
      default: return '⭐'
    }
  }

  return (
    <div className={className}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <Card key={benefit.id} className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
                <span className="text-2xl">{benefit.icon}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
              
              <div className="flex items-center justify-between">
                <Badge className={getCategoryColor(benefit.category)}>
                  {getCategoryIcon(benefit.category)} {benefit.category}
                </Badge>
                <span className="text-sm font-medium text-primary">{benefit.value}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Alternative compact version for mobile
export function SubscriptionBenefitsCompact({ benefits }: SubscriptionBenefitsGridProps) {
  return (
    <div className="space-y-3">
      {benefits.map((benefit) => (
        <div key={benefit.id} className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
          <span className="text-2xl">{benefit.icon}</span>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">{benefit.title}</p>
              <span className="text-sm font-medium text-primary">{benefit.value}</span>
            </div>
            <p className="text-sm text-muted-foreground">{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}