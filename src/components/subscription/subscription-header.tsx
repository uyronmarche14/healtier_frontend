import { SubscriptionPlanWithDetails } from '@/types/subscription.types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Settings, Bell } from 'lucide-react'
import Link from 'next/link'

interface SubscriptionHeaderProps {
  currentPlan?: SubscriptionPlanWithDetails
  billingCycle: 'monthly' | 'yearly'
  onBillingCycleChange: (cycle: 'monthly' | 'yearly') => void
  className?: string
}

export function SubscriptionHeader({
  currentPlan,
  billingCycle,
  onBillingCycleChange,
  className
}: SubscriptionHeaderProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/patients-dashboard">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            
            <div>
              <h1 className="text-2xl font-bold">Subscription Management</h1>
              <p className="text-muted-foreground">Manage your plan and billing</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
        
        {currentPlan && (
          <div className="mt-6 flex items-center justify-between bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {currentPlan.name.charAt(0)}
                </span>
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-semibold">{currentPlan.name}</h2>
                  {currentPlan.popular && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{currentPlan.description}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold">
                ${billingCycle === 'monthly' ? currentPlan.price : currentPlan.price * 12}
              </div>
              <div className="text-sm text-muted-foreground">/{billingCycle}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Alternative minimal header for embedded views
export function SubscriptionHeaderMinimal({
  currentPlan,
  className
}: Pick<SubscriptionHeaderProps, 'currentPlan' | 'className'>) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Subscription</h2>
          <p className="text-sm text-muted-foreground">Manage your plan</p>
        </div>
        
        {currentPlan && (
          <div className="text-right">
            <div className="text-lg font-semibold">{currentPlan.name}</div>
            <div className="text-sm text-muted-foreground">
              ${currentPlan.price}/month
            </div>
          </div>
        )}
      </div>
    </div>
  )
}