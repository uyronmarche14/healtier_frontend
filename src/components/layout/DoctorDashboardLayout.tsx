'use client'

import React from 'react'
import { NavigationProvider } from '@/contexts/navigation-context'
import { Navbar } from '@/components/common/navbarHeader'
import { Sidebar } from '@/components/common/sidebar'
import { getRoleNavigation } from '@/data/navigation/role-navigation'

interface DoctorDashboardLayoutProps {
  children: React.ReactNode
  userName?: string
  userAvatar?: string
}

export function DoctorDashboardLayout({ 
  children, 
  userName = 'Dr. Smith', 
  userAvatar = '' 
}: DoctorDashboardLayoutProps) {
  const navigation = getRoleNavigation('doctor')

  return (
    <NavigationProvider>
      <div className="relative flex min-h-screen bg-background">
        <Sidebar 
          userRole="doctor" 
          userName={userName} 
          userAvatar={userAvatar}
          navigationConfig={navigation}
        />
        <div className="flex-1 md:pl-64">
          <Navbar 
            userRole="doctor" 
            userName={userName} 
            userAvatar={userAvatar} 
          />
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-4 md:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </NavigationProvider>
  )
}