'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface NavigationContextType {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
  isMobile: boolean
  activeSection: string
  setActiveSection: (section: string) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }, [isMobile])

  return (
    <NavigationContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        isMobile,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}