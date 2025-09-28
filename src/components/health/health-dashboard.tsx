'use client'

import { useState } from 'react'
import { HealthDashboardLayout } from './health-dashboard-layout'
import { VitalSignsCard } from './vital-signs-card'
import { HealthGoalsCard } from './health-goals-card'
import { MedicationAdherenceCard } from './medication-adherence-card'
import { HealthAlertsCard } from './health-alerts-card'
import { LabResultsCard } from './lab-results-card'
import { DeviceIntegrationCard } from './device-integration-card'
import { EmergencyMedicalCard } from './emergency-medical-card'
import { HealthInsightsCard } from './health-insights-card'
import { 
  getVitalSignsData, 
  getHealthGoalsData, 
  getMedicationAdherenceData, 
  getHealthAlertsData, 
  getLabResultsData, 
  getHealthReportsData,
  getConnectedDevicesData,
  getEmergencyMedicalInfo,
  getHealthInsightsData
} from '@/data/health/sample-data'

export function HealthDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  // Sample data from our health data module
  const vitalSigns = getVitalSignsData()
  const healthGoals = getHealthGoalsData()
  const medicationAdherence = getMedicationAdherenceData()
  const healthAlerts = getHealthAlertsData()
  const labResults = getLabResultsData()
  const healthReports = getHealthReportsData()
  const connectedDevices = getConnectedDevicesData()
  const emergencyInfo = getEmergencyMedicalInfo()
  const healthInsights = getHealthInsightsData()

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleAddVitals = () => {
    console.log('Add vital signs clicked')
  }

  const handleViewVitalsHistory = () => {
    console.log('View vitals history clicked')
  }

  const handleSyncDevice = (device: any) => {
    console.log('Sync device:', device)
  }

  const handleDisconnectDevice = (device: any) => {
    console.log('Disconnect device:', device)
  }

  const handleViewInsightDetails = (insight: any) => {
    console.log('View insight details:', insight)
  }

  const handleDismissInsight = (insightId: string) => {
    console.log('Dismiss insight:', insightId)
  }

  const handleEditEmergencyInfo = () => {
    console.log('Edit emergency info clicked')
  }

  const handlePrintEmergencyCard = () => {
    console.log('Print emergency card clicked')
  }

  const handleShareEmergencyInfo = () => {
    console.log('Share emergency info clicked')
  }

  const handleViewLabResult = (result: any) => {
    console.log('View lab result:', result)
  }

  const handleDownloadHealthReport = (report: any) => {
    console.log('Download health report:', report)
  }

  return (

      
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Vital Signs - Full width on mobile, half on desktop */}
            <div className="lg:col-span-2 xl:col-span-2">
              <VitalSignsCard
                vitalSigns={vitalSigns}
                latestVitals={vitalSigns[0]}
                onAddVitals={handleAddVitals}
                onViewHistory={handleViewVitalsHistory}
              />
            </div>

            {/* Health Goals */}
            <HealthGoalsCard
              goals={healthGoals}
              onAddGoal={() => console.log('Add goal clicked')}
            />

            {/* Medication Adherence */}
            <MedicationAdherenceCard
              adherence={medicationAdherence}
              onMedicationClick={(prescriptionId) => console.log('Medication clicked:', prescriptionId)}
            />

            {/* Health Alerts */}
            <HealthAlertsCard
              alerts={healthAlerts}
              onAlertClick={(alertId) => console.log('View alert:', alertId)}
              onDismissAlert={(alertId) => console.log('Dismiss alert:', alertId)}
              onMarkAsRead={(alertId) => console.log('Mark as read:', alertId)}
            />

            {/* Health Insights */}
            <HealthInsightsCard
              insights={healthInsights}
              onViewDetails={handleViewInsightDetails}
              onDismiss={handleDismissInsight}
            />

            {/* Emergency Medical Info - Full width */}
            <div className="lg:col-span-2 xl:col-span-3">
              <EmergencyMedicalCard
                emergencyInfo={emergencyInfo}
                onEdit={handleEditEmergencyInfo}
                onPrint={handlePrintEmergencyCard}
                onShare={handleShareEmergencyInfo}
              />
            </div>
          </div>
        )}

        {/* Vital Signs Tab */}
        {activeTab === 'vitals' && (
          <div className="space-y-6">
            <VitalSignsCard
              vitalSigns={vitalSigns}
              latestVitals={vitalSigns[0]}
              onAddVitals={handleAddVitals}
              onViewHistory={handleViewVitalsHistory}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HealthInsightsCard
                insights={healthInsights.filter(i => i.type === 'trend' || i.type === 'anomaly')}
                onViewDetails={handleViewInsightDetails}
                onDismiss={handleDismissInsight}
              />
              
              <DeviceIntegrationCard
                devices={connectedDevices}
                onSyncDevice={handleSyncDevice}
                onDisconnectDevice={handleDisconnectDevice}
              />
            </div>
          </div>
        )}

        {/* Goals Tab */}
        {activeTab === 'goals' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HealthGoalsCard
              goals={healthGoals}
              onAddGoal={() => console.log('Add goal clicked')}
            />
            
            <HealthInsightsCard
              insights={healthInsights.filter(i => i.type === 'recommendation')}
              onViewDetails={handleViewInsightDetails}
              onDismiss={handleDismissInsight}
            />
          </div>
        )}

        {/* Medications Tab */}
        {activeTab === 'medications' && (
          <div className="space-y-6">
            <MedicationAdherenceCard
              adherence={medicationAdherence}
              onMedicationClick={(prescriptionId) => console.log('Medication clicked:', prescriptionId)}
            />
            
            <HealthAlertsCard
              alerts={healthAlerts.filter(a => a.type === 'medication')}
              onAlertClick={(alertId) => console.log('View alert:', alertId)}
              onDismissAlert={(alertId) => console.log('Dismiss alert:', alertId)}
              onMarkAsRead={(alertId) => console.log('Mark as read:', alertId)}
            />
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <LabResultsCard
            labResults={labResults}
            healthReports={healthReports}
            onViewResult={handleViewLabResult}
            onDownloadReport={handleDownloadHealthReport}
          />
        )}

        {/* Devices Tab */}
        {activeTab === 'devices' && (
          <DeviceIntegrationCard
            devices={connectedDevices}
            onSyncDevice={handleSyncDevice}
            onDisconnectDevice={handleDisconnectDevice}
          />
        )}
      </div>
  )
}