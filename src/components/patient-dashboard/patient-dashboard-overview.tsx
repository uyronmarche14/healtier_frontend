'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'

// Import all dashboard components
import WelcomeHeader from './welcome-header'
import HealthMetricsCard from './health-metrics-card'
import AppointmentSummaryCard from './appointment-summary-card'
import MedicationTrackerCard from './medication-tracker-card'
import QuickActionsGrid from './quick-actions-grid'
import HealthInsightsCard from './health-insights-card'

interface PatientDashboardOverviewProps {
  patientId?: string
  onNavigate?: (path: string) => void
}

export default function PatientDashboardOverview({
  patientId = 'patient-001',
  onNavigate
}: PatientDashboardOverviewProps) {
  const [isClient, setIsClient] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Mock patient data - in real app, this would come from API/context
  const patientData = {
    name: 'John Doe',
    lastVisit: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    upcomingAppointments: 2,
    unreadMessages: 3,
    healthScore: 85
  }

  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path)
    } else {
      // Fallback navigation logic
      console.log(`Navigate to: ${path}`)
    }
  }

  const handleQuickAction = (actionId: string) => {
    const actionRoutes = {
      'book-appointment': '/appointments',
      'ai-chat': '/aitalks',
      'order-medicine': '/medicine',
      'video-call': '/consultations',
      'health-records': '/health',
      'chat-doctor': '/chat',
      'emergency': '/emergency',
      'subscription': '/subscription'
    }
    
    const route = actionRoutes[actionId as keyof typeof actionRoutes]
    if (route) {
      handleNavigation(route)
    }
  }

  const handleMedicationAction = (medicationId: string, timeSlotIndex: number) => {
    console.log(`Mark medication ${medicationId} taken at slot ${timeSlotIndex}`)
    // In real app, this would update the medication tracking state
  }

  const handleAppointmentJoin = (appointmentId: string) => {
    console.log(`Join video call for appointment ${appointmentId}`)
    // In real app, this would open the video call interface
  }

  const handleInsightAction = (insightId: string) => {
    console.log(`Take action on insight ${insightId}`)
    // In real app, this would handle the specific insight action
  }

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Header */}
        <WelcomeHeader
          patientName={patientData.name}
          lastVisit={patientData.lastVisit}
          upcomingAppointments={patientData.upcomingAppointments}
          unreadMessages={patientData.unreadMessages}
          healthScore={patientData.healthScore}
        />

        {/* Quick Actions - Always visible on top for mobile */}
        {isMobile && (
          <QuickActionsGrid onActionClick={handleQuickAction} />
        )}

        {/* Main Dashboard Grid */}
        <div className={`grid gap-6 ${
          isMobile 
            ? 'grid-cols-1' 
            : isTablet 
              ? 'grid-cols-1 lg:grid-cols-2' 
              : 'grid-cols-1 lg:grid-cols-3'
        }`}>
          {/* Left Column - Health Metrics & Appointments */}
          <div className={`space-y-6 ${!isMobile && !isTablet ? 'lg:col-span-2' : ''}`}>
            {/* Health Metrics */}
            <HealthMetricsCard
              onViewDetails={() => handleNavigation('/health')}
              onAddVitals={() => handleNavigation('/health/vitals/add')}
            />

            {/* Appointments */}
            <AppointmentSummaryCard
              onBookAppointment={() => handleNavigation('/appointments/book')}
              onViewAll={() => handleNavigation('/appointments')}
              onJoinCall={handleAppointmentJoin}
            />

            {/* Medication Tracker - Full width on mobile */}
            {(isMobile || isTablet) && (
              <MedicationTrackerCard
                onMarkTaken={handleMedicationAction}
                onViewAll={() => handleNavigation('/medications')}
                onAddMedication={() => handleNavigation('/medications/add')}
              />
            )}
          </div>

          {/* Right Column - Quick Actions & Insights */}
          <div className="space-y-6">
            {/* Quick Actions - Hidden on mobile (shown at top) */}
            {!isMobile && (
              <QuickActionsGrid onActionClick={handleQuickAction} />
            )}

            {/* Health Insights */}
            <HealthInsightsCard
              onViewAll={() => handleNavigation('/insights')}
              onTakeAction={handleInsightAction}
            />

            {/* Medication Tracker - Sidebar on desktop */}
            {!isMobile && !isTablet && (
              <MedicationTrackerCard
                onMarkTaken={handleMedicationAction}
                onViewAll={() => handleNavigation('/medications')}
                onAddMedication={() => handleNavigation('/medications/add')}
              />
            )}
          </div>
        </div>

        {/* Emergency Contact Footer */}
        <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600 font-bold text-lg">!</span>
              </div>
              <div>
                <p className="font-semibold text-red-900 text-sm">
                  Emergency? Need immediate help?
                </p>
                <p className="text-red-700 text-xs">
                  Call 911 or contact your healthcare provider immediately
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
                Call 911
              </button>
              <button className="px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors">
                Contact Doctor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}