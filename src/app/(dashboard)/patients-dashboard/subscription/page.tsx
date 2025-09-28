'use client'

import { useState, useEffect } from 'react'
import { SubscriptionDashboard } from '@/components/subscription/subscription-dashboard'
import { SubscriptionDashboardMobile } from '@/components/subscription/subscription-dashboard'
import { subscriptionDashboardData } from '@/data/subscription-data'
import { useMediaQuery } from '@/hooks/use-media-query'

export default function SubscriptionPage() {
  const [isClient, setIsClient] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handlePlanSelect = (planId: string) => {
    console.log('Selected plan:', planId)
    // TODO: Implement plan selection logic
    // This would typically involve:
    // 1. Showing a confirmation dialog
    // 2. Creating a Stripe checkout session
    // 3. Redirecting to Stripe checkout
    // 4. Handling the webhook response
  }

  const handleDownloadInvoice = (paymentId: string) => {
    console.log('Download invoice:', paymentId)
    // TODO: Implement invoice download
    // This would typically involve:
    // 1. Fetching the invoice PDF from storage
    // 2. Creating a download link
    // 3. Triggering the download
  }

  // Use the sample data for now
  // In a real app, this would come from an API call
  const data = subscriptionDashboardData

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4">
      {isMobile ? (
        <SubscriptionDashboardMobile
          data={data}
          onPlanSelect={handlePlanSelect}
          onDownloadInvoice={handleDownloadInvoice}
        />
      ) : (
        <SubscriptionDashboard
          data={data}
          onPlanSelect={handlePlanSelect}
          onDownloadInvoice={handleDownloadInvoice}
        />
      )}
    </div>
  )
}