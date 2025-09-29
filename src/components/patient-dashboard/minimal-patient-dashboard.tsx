'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  Pill, 
  MessageSquare, 
  Activity,
  Heart,
  Brain,
  Dumbbell,
  Users,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Bot,
  Target
} from 'lucide-react'

interface MinimalPatientDashboardProps {
  patientId?: string
  onNavigate?: (path: string) => void
}

export default function MinimalPatientDashboard({
  patientId = 'patient-001',
  onNavigate
}: MinimalPatientDashboardProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path)
    } else {
      console.log(`Navigate to: ${path}`)
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-gray-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-8xl mx-auto px-6 py-6 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl border border-gray-100">
          <div className="relative p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Welcome Back
                  </Badge>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {getGreeting()}, John Doe!
                </h1>
                
                <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                  Your personal health companion is here to help you stay on top of your wellness journey. 
                  Track vitals, manage medications, and get AI-powered insights.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Button 
                    onClick={() => handleNavigation('/aitalks')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                  >
                    Get Started Today
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="px-6 py-3"
                    onClick={() => handleNavigation('/health')}
                  >
                    View Health Records
                  </Button>
                </div>
              </div>

              <div className="flex-shrink-0">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                          <Heart className="h-8 w-8 text-white" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                          <Activity className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">85%</h3>
                    <p className="text-sm text-gray-600 mb-3">Health Score</p>
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      Excellent
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Next Appointment', value: 'Tomorrow 2:30 PM', icon: Calendar, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Pending Medications', value: '1', icon: Pill, color: 'text-green-600', bgColor: 'bg-green-50' },
            { label: 'Unread Messages', value: '3', icon: MessageSquare, color: 'text-purple-600', bgColor: 'bg-purple-50' },
            { label: 'Health Score', value: '85%', icon: Activity, color: 'text-orange-600', bgColor: 'bg-orange-50' }
          ].map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow group">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Features Promo */}
        <div className="space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">AI-Powered Health Features</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the future of healthcare with our intelligent AI assistants designed to support your wellness journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'AI Health Talks',
                description: 'Get personalized health advice and answers to your medical questions 24/7',
                icon: MessageSquare,
                color: 'from-purple-500 to-indigo-600',
                badge: 'Most Popular',
                path: '/aitalks'
              },
              {
                title: 'AI Fitness Coach',
                description: 'Personalized workout plans and nutrition guidance tailored to your health goals',
                icon: Dumbbell,
                color: 'from-green-500 to-emerald-600',
                badge: 'New',
                path: '/fitness'
              },
              {
                title: 'Smart Health Assistant',
                description: 'Track symptoms, medication reminders, and get intelligent health insights',
                icon: Bot,
                color: 'from-blue-500 to-cyan-600',
                badge: 'AI Powered',
                path: '/assistant'
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge className="bg-blue-50 text-blue-700 border-0">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <Button 
                    onClick={() => handleNavigation(feature.path)}
                    className={`w-full bg-gradient-to-r ${feature.color} hover:shadow-lg transition-all duration-200 group-hover:scale-105`}
                  >
                    <span>Try Now</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Health Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Common Health Conditions
                </CardTitle>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                  <Users className="h-3 w-3 mr-1" />
                  6.2K Users
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { condition: 'Diabetes', percentage: 35, color: 'bg-red-400' },
                  { condition: 'Hypertension', percentage: 28, color: 'bg-orange-400' },
                  { condition: 'Heart Disease', percentage: 22, color: 'bg-blue-400' },
                  { condition: 'Obesity', percentage: 15, color: 'bg-green-400' }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-900">{item.condition}</span>
                      <span className="font-semibold text-gray-900">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">AI Success Rate</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">87%</p>
                <p className="text-xs text-blue-700">of users see improvement in 30 days</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                AI-Powered Health Improvements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: 'Personalized Diet Plan', improvement: '+23% better outcomes', icon: Target },
                  { title: 'Exercise Optimization', improvement: '+31% adherence rate', icon: TrendingUp },
                  { title: 'Medication Reminders', improvement: '+45% compliance', icon: Brain }
                ].map((rec, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                        <rec.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">{rec.title}</h4>
                        <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                          {rec.improvement}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => handleNavigation('/aitalks')}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Start Your AI Health Journey
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-700 mb-1">94%</div>
              <div className="text-sm text-green-600">User Satisfaction</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-700 mb-1">2.5M+</div>
              <div className="text-sm text-blue-600">Health Insights Generated</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-br from-purple-50 to-indigo-50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-700 mb-1">24/7</div>
              <div className="text-sm text-purple-600">AI Support Available</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}