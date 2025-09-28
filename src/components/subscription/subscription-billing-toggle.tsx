import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface SubscriptionBillingToggleProps {
  currentCycle: 'monthly' | 'yearly'
  onCycleChange: (cycle: 'monthly' | 'yearly') => void
  savings?: {
    monthly: number
    yearly: number
    percentage: number
  }
  className?: string
}

export function SubscriptionBillingToggle({
  currentCycle,
  onCycleChange,
  savings,
  className
}: SubscriptionBillingToggleProps) {
  return (
    <div className={cn("flex items-center justify-center space-x-2", className)}>
      <Button
        variant={currentCycle === 'monthly' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCycleChange('monthly')}
        className={cn(
          currentCycle === 'monthly' && 'bg-gradient-to-r from-blue-500 to-purple-500'
        )}
      >
        Monthly
      </Button>
      
      <Button
        variant={currentCycle === 'yearly' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCycleChange('yearly')}
        className={cn(
          currentCycle === 'yearly' && 'bg-gradient-to-r from-green-500 to-teal-500'
        )}
      >
        Yearly
        {savings && (
          <Badge variant="secondary" className="ml-2 text-xs">
            Save {savings.percentage}%
          </Badge>
        )}
      </Button>
      
      {savings && currentCycle === 'yearly' && (
        <Badge className="bg-green-100 text-green-800 animate-pulse">
          💰 Save ${savings.yearly}/year
        </Badge>
      )}
    </div>
  )
}

// Alternative version with more prominent savings display
export function SubscriptionBillingToggleProminent({
  currentCycle,
  onCycleChange,
  savings,
  className
}: SubscriptionBillingToggleProps) {
  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
        <Button
          variant={currentCycle === 'monthly' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onCycleChange('monthly')}
          className={cn(
            "flex-1",
            currentCycle === 'monthly' && 'bg-gradient-to-r from-blue-500 to-purple-500'
          )}
        >
          Monthly Billing
        </Button>
        
        <Button
          variant={currentCycle === 'yearly' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onCycleChange('yearly')}
          className={cn(
            "flex-1 relative",
            currentCycle === 'yearly' && 'bg-gradient-to-r from-green-500 to-teal-500'
          )}
        >
          Yearly Billing
          {savings && (
            <Badge className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs">
              Save {savings.percentage}%
            </Badge>
          )}
        </Button>
      </div>
      
      {savings && currentCycle === 'yearly' && (
        <div className="text-center space-y-1">
          <div className="text-2xl font-bold text-green-600">${savings.yearly}</div>
          <div className="text-sm text-muted-foreground">Annual Savings</div>
          <div className="text-xs text-green-600">That's {savings.percentage}% off!</div>
        </div>
      )}
    </div>
  )
}