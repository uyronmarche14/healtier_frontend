'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight,
  Smartphone,
  Monitor,
  Layers,
  Zap,
  Heart,
  Activity
} from 'lucide-react'

export default function DashboardVersionsPage() {
  const dashboardVersions = [
    {
      id: 'simple',
      title: 'Simple Dashboard',
      description: 'Basic dashboard with just the welcome header for testing',
      features: ['Welcome Header', 'Basic Layout', 'Minimal Components'],
      icon: <Zap className="h-6 w-6" />,
      color: 'from-green-500 to-green-600',
      href: '/patients-dashboard/simple',
      status: 'Stable'
    },
    {
      id: 'standard',
      title: 'Standard Dashboard',
      description: 'Complete dashboard with core health management features',
      features: ['Health Metrics', 'Appointments', 'Medications', 'Quick Actions', 'AI Insights'],
      icon: <Activity className="h-6 w-6" />,
      color: 'from-blue-500 to-blue-600',
      href: '/patients-dashboard/standard',
      status: 'Recommended'
    },
    {
      id: 'enhanced',
      title: 'Enhanced Dashboard',
      description: 'Full-featured dashboard with all components and advanced analytics',
      features: ['All Standard Features', 'Health Analytics', 'Reminders', 'Activity Tracking', 'Health Tips', 'Emergency Contact'],
      icon: <Heart className="h-6 w-6" />,
      color: 'from-purple-500 to-purple-600',
      href: '/patients-dashboard',
      status: 'Current'
    },
    {
      id: 'mobile',
      title: 'Mobile Dashboard',
      description: 'Mobile-optimized dashboard with bottom navigation',
      features: ['Mobile UI', 'Bottom Navigation', 'Touch Optimized', 'Responsive Design'],
      icon: <Smartphone className="h-6 w-6" />,
      color: 'from-orange-500 to-orange-600',
      href: '/patients-dashboard/mobile',
      status: 'Mobile'
    },
    {
      id: 'complete',
      title: 'Complete Dashboard',
      description: 'Dashboard with full layout including header and navigation',
      features: ['Full Layout', 'Navigation Header', 'Sidebar', 'All Components', 'Dark Mode'],
      icon: <Monitor className="h-6 w-6" />,
      color: 'from-indigo-500 to-indigo-600',
      href: '/patients-dashboard/complete',
      status: 'Full Layout'
    },
    {
      id: 'demo',
      title: 'Component Demo',
      description: 'Interactive showcase of all individual components',
      features: ['Component Library', 'Interactive Examples', 'Code Samples', 'Documentation'],
      icon: <Layers className="h-6 w-6" />,
      color: 'from-teal-500 to-teal-600',
      href: '/patients-dashboard/demo',
      status: 'Demo'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Current':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'Recommended':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Stable':
        return 'bg-gray-100 text-gray-700 border-gray-200'
      case 'Mobile':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'Full Layout':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200'
      case 'Demo':
        return 'bg-teal-100 text-teal-700 border-teal-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Patient Dashboard Versions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore different versions of the patient dashboard, each designed for specific use cases and requirements.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {dashboardVersions.map((version) => (
            <Card key={version.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${version.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                    {version.icon}
                  </div>
                  <Badge className={`text-xs px-3 py-1 ${getStatusColor(version.status)}`}>
                    {version.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {version.title}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {version.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Features */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">Features:</h4>
                  <div className="space-y-1">
                    {version.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className={`w-full bg-gradient-to-r ${version.color} hover:shadow-lg transition-all duration-200 group-hover:scale-105`}
                  onClick={() => window.location.href = version.href}
                >
                  <span>View Dashboard</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Comparison */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Quick Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Version</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Components</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Mobile</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Analytics</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Layout</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">Simple</td>
                  <td className="py-3 px-4 text-center text-gray-600">1</td>
                  <td className="py-3 px-4 text-center">✅</td>
                  <td className="py-3 px-4 text-center">❌</td>
                  <td className="py-3 px-4 text-center">Basic</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-600">Testing</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">Standard</td>
                  <td className="py-3 px-4 text-center text-gray-600">5</td>
                  <td className="py-3 px-4 text-center">✅</td>
                  <td className="py-3 px-4 text-center">Basic</td>
                  <td className="py-3 px-4 text-center">Standard</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-600">Most Users</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-blue-50">
                  <td className="py-3 px-4 font-medium text-blue-900">Enhanced</td>
                  <td className="py-3 px-4 text-center text-blue-600 font-semibold">9+</td>
                  <td className="py-3 px-4 text-center">✅</td>
                  <td className="py-3 px-4 text-center">✅</td>
                  <td className="py-3 px-4 text-center">Advanced</td>
                  <td className="py-3 px-4 text-center text-sm text-blue-600 font-medium">Production</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">Mobile</td>
                  <td className="py-3 px-4 text-center text-gray-600">6</td>
                  <td className="py-3 px-4 text-center">✅✅</td>
                  <td className="py-3 px-4 text-center">Basic</td>
                  <td className="py-3 px-4 text-center">Mobile</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-600">Mobile Apps</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">Complete</td>
                  <td className="py-3 px-4 text-center text-gray-600">9+</td>
                  <td className="py-3 px-4 text-center">✅</td>
                  <td className="py-3 px-4 text-center">✅</td>
                  <td className="py-3 px-4 text-center">Full</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-600">Enterprise</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">Demo</td>
                  <td className="py-3 px-4 text-center text-gray-600">All</td>
                  <td className="py-3 px-4 text-center">✅</td>
                  <td className="py-3 px-4 text-center">✅</td>
                  <td className="py-3 px-4 text-center">Showcase</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-600">Development</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need Help Choosing?
          </h3>
          <p className="text-gray-600 mb-4">
            Start with the <strong>Enhanced Dashboard</strong> for the complete experience, or try the <strong>Demo</strong> to explore all components.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              className="bg-gradient-to-r from-purple-500 to-purple-600"
              onClick={() => window.location.href = '/patients-dashboard'}
            >
              Try Enhanced Dashboard
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/patients-dashboard/demo'}
            >
              Explore Components
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}