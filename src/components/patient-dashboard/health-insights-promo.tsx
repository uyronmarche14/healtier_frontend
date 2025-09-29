'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Users, 
  Target, 
  ArrowRight,
  Brain,
  Heart
} from 'lucide-react'

interface HealthInsightsPromoProps {
  onLearnMore: () => void
}

export default function HealthInsightsPromo({ onLearnMore }: HealthInsightsPromoProps) {
  // Mock survey data for demonstration
  const surveyData = [
    { condition: 'Diabetes', percentage: 35, users: '2.1K', color: 'bg-red-400' },
    { condition: 'Hypertension', percentage: 28, users: '1.8K', color: 'bg-orange-400' },
    { condition: 'Heart Disease', percentage: 22, users: '1.4K', color: 'bg-blue-400' },
    { condition: 'Obesity', percentage: 15, users: '950', color: 'bg-green-400' }
  ]

  const aiRecommendations = [
    {
      title: 'Personalized Diet Plan',
      description: 'AI analyzes your health data to create custom meal plans',
      improvement: '+23% better outcomes',
      icon: Target
    },
    {
      title: 'Exercise Optimization',
      description: 'Smart workout routines based on your fitness level',
      improvement: '+31% adherence rate',
      icon: TrendingUp
    },
    {
      title: 'Medication Reminders',
      description: 'Intelligent scheduling prevents missed doses',
      improvement: '+45% compliance',
      icon: Brain
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          How AI Health is Helping Patients Like You
        </h2>
        <p className="text-gray-600">
          Real data from our community shows significant health improvements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Conditions Survey */}
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
            <p className="text-sm text-gray-600">
              What conditions are our AI helping manage most effectively
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {surveyData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">{item.condition}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{item.users} users</span>
                      <span className="font-semibold text-gray-900">{item.percentage}%</span>
                    </div>
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

        {/* AI Recommendations Impact */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">
              AI-Powered Health Improvements
            </CardTitle>
            <p className="text-sm text-gray-600">
              See how our AI features are making a real difference
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <rec.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{rec.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                        {rec.improvement}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={onLearnMore}
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
  )
}