'use client'

import React from 'react'
import { NavigationProvider } from '@/contexts/navigation-context'
import { Navbar } from '@/components/common/navbarHeader'
import { Sidebar } from '@/components/common/sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole?: 'admin' | 'doctor' | 'patient'
  userName?: string
  userAvatar?: string
}

export function DashboardLayout({ 
  children, 
  userRole = 'admin',
  userName = 'John Doe',
  userAvatar = ''
}: DashboardLayoutProps) {
  return (
    <NavigationProvider>
      <div className="relative flex min-h-screen bg-background">
        <Sidebar 
          userRole={userRole} 
          userName={userName} 
          userAvatar={userAvatar} 
        />
        <div className="flex-1 md:pl-64">
          <Navbar 
            userRole={userRole} 
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