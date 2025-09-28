import { SubscriptionWithPlan } from '@/types/subscription.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Calendar, CreditCard, TrendingUp, UserCheck } from 'lucide-react'

interface SubscriptionCurrentOverviewProps {
  subscription: SubscriptionWithPlan
  onUpgrade?: () => void
  onCancel?: () => void
  onViewInvoices?: () => void
}

export function SubscriptionCurrentOverview({
  subscription,
  onUpgrade,
  onCancel,
  onViewInvoices
}: SubscriptionCurrentOverviewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'paused': return 'bg-yellow-500'
      case 'cancelled': return 'bg-red-500'
      case 'expired': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'paused': return 'secondary'
      case 'cancelled': return 'destructive'
      case 'expired': return 'outline'
      default: return 'outline'
    }
  }

  const consultationPercentage = (subscription.usage.consultationsUsed / subscription.plan.consultations.included) * 100
  const daysUntilBilling = Math.ceil((subscription.nextBillingDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Current Plan Status */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
          <div className={`h-2 w-2 rounded-full ${getStatusColor(subscription.status)}`} />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{subscription.plan.name}</div>
            <Badge variant={getStatusBadgeVariant(subscription.status)}>
              {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
            </Badge>
            <div className="text-sm text-muted-foreground">
              ${subscription.price}/{subscription.billingCycle}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Usage This Month</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Consultations</span>
                <span>{subscription.usage.consultationsUsed}/{subscription.plan.consultations.included}</span>
              </div>
              <Progress value={consultationPercentage} className="h-2" />
            </div>
            <div className="flex justify-between text-sm">
              <span>Medicine Savings</span>
              <span className="text-green-600">${subscription.usage.medicineDiscountUsed}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total Savings</span>
              <span className="text-green-600 font-medium">${subscription.usage.totalSavings}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Billing</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>Next billing in {daysUntilBilling} days</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {subscription.nextBillingDate.toLocaleDateString()}
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{subscription.paymentMethod}</Badge>
              {subscription.autoRenew && <Badge variant="secondary">Auto-renew</Badge>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Plan Management</CardTitle>
          <CardDescription>Manage your subscription and billing preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {subscription.canUpgrade && (
              <Button onClick={onUpgrade} className="bg-gradient-to-r from-blue-500 to-purple-500">
                <TrendingUp className="mr-2 h-4 w-4" />
                Upgrade Plan
              </Button>
            )}
            
            <Button variant="outline" onClick={onViewInvoices}>
              <CreditCard className="mr-2 h-4 w-4" />
              View Invoices
            </Button>
            
            {subscription.canCancel && (
              <Button variant="outline" className="text-red-600 hover:text-red-700" onClick={onCancel}>
                Cancel Subscription
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}