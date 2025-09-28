/**
 * Role-based navigation configuration
 * Defines the navigation structure for each user role
 */

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
  User,
  Heart,
  Package,
  Receipt,
  TrendingUp,
  ClipboardList,
  Clock,
  CheckCircle,
  AlertCircle,
  Subscript
} from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  description?: string
  items?: NavItem[]
}

export interface RoleNavigation {
  primary: NavItem[]
  secondary: NavItem[]
  quickActions?: NavItem[]
}

export const roleNavigation: Record<string, RoleNavigation> = {
  patient: {
    primary: [
      {
        title: 'Dashboard',
        href: '/patients-dashboard',
        icon: LayoutDashboard,
        description: 'Overview of your health and activities',
      },
      {
        title: 'My Health',
        href: '/patients-dashboard/health',
        icon: Heart,
        description: 'Health records and vitals',
      },
      {
        title: 'Store',
        href: '/patients-dashboard/medicine',
        icon: ShoppingCart,
        badge: 'New',
        description: 'Purchase medicines and health products',
      },
      {
        title: 'Appointments',
        href: '/patients-dashboard/appointments',
        icon: Calendar,
        description: 'Schedule and manage appointments',
      },
      {
        title: 'Prescriptions',
        href: '/patients-dashboard/prescriptions',
        icon: FileText,
        description: 'View and manage prescriptions',
      },
      {
        title: 'Subscription',
        href: '/patients-dashboard/subscription',
        icon: Subscript,
        description: 'View and manage subscription plans',
      },
      {
        title: 'Billing',
        href: '/patients-dashboard/billing',
        icon: CreditCard,
        description: 'View invoices and payment history',
      },
      {
        title: 'Messages',
        href: '/patients-dashboard/chat',
        icon: MessageSquare,
        badge: '5',
        description: 'Communicate with doctors and staff',
      },
      {
        title: 'Healtier Talks',
        href: '/patients-dashboard/aitalks',
        icon: MessageSquare,
        badge: '5',
        description: 'Try asking AI',
      },
    ],
    
    secondary: [
      {
        title: 'Settings',
        href: '/patient/settings',
        icon: Settings,
        description: 'Account preferences and privacy',
      },
      {
        title: 'Help & Support',
        href: '/patient/help',
        icon: HelpCircle,
        description: 'Get assistance and find answers',
      },
    ],
    quickActions: [
      {
        title: 'Book Appointment',
        href: '/patient/appointments/new',
        icon: Calendar,
      },
      {
        title: 'Order Medicine',
        href: '/patient/store',
        icon: Pill,
      },
      {
        title: 'View Reports',
        href: '/patient/health/reports',
        icon: Activity,
      },
    ],
  },
  doctor: {
    primary: [
      {
        title: 'Dashboard',
        href: '/doctor-dashboard/dashboard',
        icon: LayoutDashboard,
        description: 'Overview of your practice',
      },
      {
        title: 'My Patients',
        href: '/doctor-dashboard/patients',
        icon: UserCheck,
        description: 'Patient records and management',
      },
      {
        title: 'Appointments',
        href: '/doctor-dashboard/appointments',
        icon: Calendar,
        badge: '3',
        description: 'Schedule and manage appointments',
      },
      {
        title: 'Prescriptions',
        href: '/doctor-dashboard/prescription',
        icon: FileText,
        description: 'Create and manage prescription',
      },
      {
        title: 'Medicines',
        href: '/doctor/medicines',
        icon: Pill,
        description: 'Browse medicine catalog',
      },
      {
        title: 'Analytics',
        href: '/doctor/analytics',
        icon: BarChart3,
        description: 'Practice performance insights',
      },
      {
        title: 'Messages',
        href: '/doctor-dashboard/chat',
        icon: MessageSquare,
        description: 'Communicate with patients and staff',
      },
    ],
    secondary: [
      {
        title: 'Settings',
        href: '/doctor/settings',
        icon: Settings,
        description: 'Practice preferences and profile',
      },
      {
        title: 'Help & Support',
        href: '/doctor/help',
        icon: HelpCircle,
        description: 'Get assistance and find answers',
      },
    ],
    quickActions: [
      {
        title: 'New Appointment',
        href: '/doctor/appointments/new',
        icon: Calendar,
      },
      {
        title: 'Write Prescription',
        href: '/doctor/prescriptions/new',
        icon: FileText,
      },
      {
        title: 'View Schedule',
        href: '/doctor/schedule',
        icon: Clock,
      },
    ],
  },
  admin: {
    primary: [
      {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
        description: 'System overview and metrics',
      },
      {
        title: 'Analytics',
        href: '/admin/analytics',
        icon: BarChart3,
        badge: 'New',
        description: 'System-wide analytics and reports',
      },
      {
        title: 'User Management',
        href: '/admin/users',
        icon: Users,
        description: 'Manage users and roles',
      },
      {
        title: 'Medicines',
        href: '/admin/medicines',
        icon: Pill,
        description: 'Medicine catalog management',
      },
      {
        title: 'Billing & Invoices',
        href: '/admin/billing',
        icon: CreditCard,
        description: 'Financial management',
      },
      {
        title: 'Reports',
        href: '/admin/reports',
        icon: Activity,
        description: 'Generate system reports',
      },
   
    ],
    secondary: [
      {
        title: 'Settings',
        href: '/admin/settings',
        icon: Settings,
        description: 'System configuration',
      },
      {
        title: 'Help & Support',
        href: '/admin/help',
        icon: HelpCircle,
        description: 'Get assistance and find answers',
      },
    ],
    quickActions: [
      {
        title: 'Add User',
        href: '/admin/users/new',
        icon: User,
      },
      {
        title: 'Add Medicine',
        href: '/admin/medicines/new',
        icon: Pill,
      },
      {
        title: 'Generate Report',
        href: '/admin/reports/new',
        icon: TrendingUp,
      },
    ],
  },
}

export const getRoleNavigation = (role: string): RoleNavigation => {
  return roleNavigation[role] || roleNavigation.admin
}