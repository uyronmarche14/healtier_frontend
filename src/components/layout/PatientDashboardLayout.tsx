'use client'

import React from 'react'
import { NavigationProvider } from '@/contexts/navigation-context'
import { Navbar } from '@/components/common/navbarHeader'
import { Sidebar } from '@/components/common/sidebar'
import { getRoleNavigation } from '@/data/navigation/role-navigation'

interface PatientDashboardLayoutProps {
  children: React.ReactNode
  userName?: string
  userAvatar?: string
}

export function PatientDashboardLayout({ 
  children, 
  userName = 'Patient User', 
  userAvatar = '' 
}: PatientDashboardLayoutProps) {
  const navigation = getRoleNavigation('patient')

  return (
    <NavigationProvider>
      <div className="relative flex min-h-screen bg-background">
        <Sidebar 
          userRole="patient" 
          userName={userName} 
          userAvatar={userAvatar}
          navigationConfig={navigation}
        />
        <div className="flex-1 md:pl-64">
          <Navbar 
            userRole="patient" 
            userName={userName} 
            userAvatar={userAvatar} 
          />
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </NavigationProvider>
  )
}