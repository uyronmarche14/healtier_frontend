'use client'

import { useState } from 'react'
import { SubscriptionDashboardData } from '@/types/subscription.types'
import { SubscriptionHeader } from './subscription-header'
import { SubscriptionCurrentOverview } from './subscription-current-overview'
import { SubscriptionPlanCard } from './subscription-plan-card'
import { SubscriptionBenefitsGrid } from './subscription-benefits-grid'
import { SubscriptionUsageStats } from './subscription-usage-stats'
import { SubscriptionPaymentHistory } from './subscription-payment-history'
import { SubscriptionRecommendations } from './subscription-recommendations'
import { SubscriptionBillingToggle } from './subscription-billing-toggle'
import { SubscriptionComparisonTable, SubscriptionComparisonMobile } from './subscription-comparison-table'
import { SubscriptionRecommendationsCompact } from './subscription-recommendations'
import { SubscriptionBenefitsCompact } from './subscription-benefits-grid'
import { SubscriptionUsageCompact } from './subscription-usage-stats'
import { SubscriptionPaymentHistoryCompact } from './subscription-payment-history'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/use-media-query'

interface SubscriptionDashboardProps {
  data: SubscriptionDashboardData
  onPlanSelect: (planId: string) => void
  onDownloadInvoice?: (paymentId: string) => void
}

export function SubscriptionDashboard({
  data,
  onPlanSelect,
  onDownloadInvoice
}: SubscriptionDashboardProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const isMobile = useMediaQuery('(max-width: 768px)')

  const {
    currentSubscription,
    availablePlans,
    paymentHistory,
    benefits,
    recommendations,
    comparison,
    spending
  } = data

  const currentPlan = currentSubscription?.plan

  return (
    <div className="space-y-6">
      <SubscriptionHeader
        currentPlan={currentPlan}
        billingCycle={billingCycle}
        onBillingCycleChange={setBillingCycle}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Current Subscription Overview */}
        <div className="lg:col-span-4">
          {currentSubscription && (
            <SubscriptionCurrentOverview
              subscription={currentSubscription}
            />
          )}
          
          {/* Usage Statistics */}
          {currentSubscription && (
            <SubscriptionUsageStats
              subscription={currentSubscription}
              className="mb-6"
            />
          )}
        </div>

        {/* Quick Stats & Recommendations */}
        <div className="space-y-6">
          {recommendations && recommendations.length > 0 && (
            <SubscriptionRecommendations
              recommendations={recommendations}
              onPlanSelect={onPlanSelect}
            />
          )}
          
          <SubscriptionBenefitsGrid
            benefits={benefits || []}
          />
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="plans" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="plans">Available Plans</TabsTrigger>
          <TabsTrigger value="comparison">Compare Plans</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-6">
          {/* Billing Cycle Toggle */}
          <div className="flex justify-center">
            <SubscriptionBillingToggle
              currentCycle={billingCycle}
              onCycleChange={setBillingCycle}
              savings={{
                monthly: 0,
                yearly: comparison.savingsAnalysis.potentialSavings,
                percentage: 17
              }}
            />
          </div>

          {/* Plan Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availablePlans.map((plan) => (
              <SubscriptionPlanCard
                key={plan.id}
                plan={plan}
                isCurrent={currentPlan?.id === plan.id}
                billingCycle={billingCycle}
                onSelect={() => onPlanSelect(plan.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          {/* Billing Cycle Toggle */}
          <div className="flex justify-center">
            <SubscriptionBillingToggle
              currentCycle={billingCycle}
              onCycleChange={setBillingCycle}
              savings={{
                monthly: 0,
                yearly: comparison.savingsAnalysis.potentialSavings,
                percentage: 17
              }}
            />
          </div>

          {/* Comparison Table */}
          {isMobile ? (
            <SubscriptionComparisonMobile
              plans={availablePlans}
              currentPlanId={currentPlan?.id}
              onPlanSelect={onPlanSelect}
              billingCycle={billingCycle}
            />
          ) : (
            <SubscriptionComparisonTable
              plans={availablePlans}
              currentPlanId={currentPlan?.id}
              onPlanSelect={onPlanSelect}
              billingCycle={billingCycle}
            />
          )}
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <SubscriptionPaymentHistory
            payments={paymentHistory || []}
            onDownloadInvoice={onDownloadInvoice}
          />
        </TabsContent>
      </Tabs>

      {/* Mobile-optimized layout */}
      {isMobile && (
        <div className="space-y-6 lg:hidden">
          <Separator />
          
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                >
                  Switch to {billingCycle === 'monthly' ? 'Yearly' : 'Monthly'} Billing
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View All Invoices
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Update Payment Method
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

// Mobile-optimized dashboard
export function SubscriptionDashboardMobile({
  data,
  onPlanSelect,
  onDownloadInvoice
}: SubscriptionDashboardProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const {
    currentSubscription,
    availablePlans,
    paymentHistory,
    benefits,
    recommendations
  } = data

  const currentPlan = currentSubscription?.plan

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-xl font-bold">Subscription</h1>
        <p className="text-sm text-muted-foreground">Manage your plan</p>
        {currentPlan && (
          <div className="text-lg font-semibold text-primary">
            {currentPlan.name} - ${currentPlan.price}/month
          </div>
        )}
      </div>

      {/* Current Plan Status */}
      {currentSubscription && (
        <SubscriptionCurrentOverview
          subscription={currentSubscription}
        />
      )}

      {/* Billing Toggle */}
      <SubscriptionBillingToggle
        currentCycle={billingCycle}
        onCycleChange={setBillingCycle}
      />

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <SubscriptionRecommendationsCompact
          recommendations={recommendations}
          onPlanSelect={onPlanSelect}
        />
      )}

      {/* Available Plans */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Available Plans</h2>
        {availablePlans.map((plan) => (
          <SubscriptionPlanCard
            key={plan.id}
            plan={plan}
            isCurrent={currentPlan?.id === plan.id}
            billingCycle={billingCycle}
            onSelect={() => onPlanSelect(plan.id)}
          />
        ))}
      </div>

      {/* Benefits */}
      {benefits && benefits.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Your Benefits</h2>
          <SubscriptionBenefitsCompact
            benefits={benefits}
          />
        </div>
      )}

      {/* Usage Stats */}
      {currentSubscription && (
        <SubscriptionUsageCompact
          subscription={currentSubscription}
        />
      )}

      {/* Payment History */}
      {paymentHistory && paymentHistory.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Payments</h2>
          <SubscriptionPaymentHistoryCompact
            payments={paymentHistory}
            onDownloadInvoice={onDownloadInvoice}
          />
        </div>
      )}
    </div>
  )
}