'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useNavigation } from '@/contexts/navigation-context'
import { getRoleNavigation, type RoleNavigation } from '@/data/navigation/role-navigation'

// Icons
import {
  LayoutDashboard,
  Users,
  FileText,
  Pill,
  CreditCard,
  MessageSquare,
  Settings,
  BarChart3,
  Stethoscope,
  UserCheck,
  ShoppingCart,
  Activity,
  Calendar,
  Bell,
  HelpCircle,
  LogOut,
} from 'lucide-react'

interface SidebarProps {
  userRole?: 'admin' | 'doctor' | 'patient'
  userName?: string
  userAvatar?: string
  navigationConfig?: RoleNavigation
}

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  items?: NavItem[]
}

export function Sidebar({ 
  userRole = 'admin', 
  userName = 'John Doe', 
  userAvatar = '',
  navigationConfig
}: SidebarProps) {
  const pathname = usePathname()
  const { isSidebarOpen, setIsSidebarOpen, isMobile } = useNavigation()

  // Use provided navigation config or fallback to role-based navigation
  const navigationItems = navigationConfig?.primary || getRoleNavigation(userRole).primary

  const NavItem = ({ item, level = 0 }: { item: NavItem; level?: number }) => {
    const isActive = pathname === item.href
    const Icon = item.icon

    return (
      <Link
        href={item.href}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
          isActive
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'text-muted-foreground',
          level > 0 && 'ml-4'
        )}
        onClick={() => isMobile && setIsSidebarOpen(false)}
      >
        <Icon className="h-4 w-4" />
        <span className="flex-1">{item.title}</span>
        {item.badge && (
          <Badge
            variant={isActive ? 'secondary' : 'default'}
            className="ml-auto h-5 px-1 text-xs"
          >
            {item.badge}
          </Badge>
        )}
      </Link>
    )
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* User Profile Section */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">{userName}</p>
            <Badge variant="outline" className="text-xs">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      <Separator />

      {/* Navigation Items */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </nav>
      </ScrollArea>

      <Separator />

      {/* Bottom Actions */}
      <div className="p-3">
        <nav className="space-y-1">
          {/* Secondary Navigation Items */}
          {(navigationConfig?.secondary || []).map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
          {/* Logout Button */}
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => {
              // Handle logout
              if (isMobile) setIsSidebarOpen(false)
            }}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Log out
          </Button>
        </nav>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        'hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:z-40 md:w-64 md:border-r bg-background',
        isSidebarOpen && 'md:w-64'
      )}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-300 ease-in-out md:hidden',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <SidebarContent />
      </aside>
    </>
  )
}