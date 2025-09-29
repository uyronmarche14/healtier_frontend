'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle, TrendingUp, Activity, Heart, Droplets, Clock, Zap } from 'lucide-react'

interface HealthMetric {
  label: string
  value: number
  unit: string
  goal: number
  icon: React.ComponentType<{ className?: string }>
  color: string
}

interface HealthSuggestion {
  type: 'success' | 'warning' | 'info'
  title: string
  message: string
  icon: React.ComponentType<{ className?: string }>
}

export function HealthDashboardClient() {
  const [isClient, setIsClient] = useState(false)
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([])
  const [suggestions, setSuggestions] = useState<HealthSuggestion[]>([])

  useEffect(() => {
    setIsClient(true)
    
    // Initialize with sample data
    setHealthMetrics([
      {
        label: 'Daily Steps',
        value: 7842,
        unit: 'steps',
        goal: 10000,
        icon: Activity,
        color: 'text-blue-600'
      },
      {
        label: 'Heart Rate',
        value: 72,
        unit: 'bpm',
        goal: 80,
        icon: Heart,
        color: 'text-red-600'
      },
      {
        label: 'Water Intake',
        value: 1.8,
        unit: 'L',
        goal: 2.5,
        icon: Droplets,
        color: 'text-cyan-600'
      },
      {
        label: 'Sleep',
        value: 7.2,
        unit: 'hrs',
        goal: 8,
        icon: Clock,
        color: 'text-purple-600'
      }
    ])

    setSuggestions([
      {
        type: 'success',
        title: 'Great job on hydration!',
        message: 'You\'ve maintained good water intake. Keep drinking water regularly throughout the day.',
        icon: CheckCircle
      },
      {
        type: 'warning',
        title: 'Increase physical activity',
        message: 'You\'re 2,158 steps away from your daily goal. Consider a 15-minute walk after lunch.',
        icon: AlertCircle
      },
      {
        type: 'info',
        title: 'Heart health reminder',
        message: 'Your blood pressure is slightly elevated. Try stress-reduction techniques like deep breathing.',
        icon: Heart
      }
    ])
  }, [])

  const getProgressPercentage = (value: number, goal: number) => {
    return Math.min((value / goal) * 100, 100)
  }

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 text-gray-800 dark:text-gray-200'
    }
  }

  const handleQuickAction = (action: string) => {
    // Handle quick action clicks
    console.log(`Action clicked: ${action}`)
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {healthMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isClient ? metric.value.toLocaleString() : metric.value}
                {metric.unit === 'hrs' && isClient ? '' : metric.unit === 'L' && isClient ? '' : ''}
                {metric.unit === 'hrs' ? '' : metric.unit === 'L' ? '' : ` ${metric.unit}`}
              </div>
              <p className="text-xs text-muted-foreground">
                Goal: {metric.goal.toLocaleString()} {metric.unit}
              </p>
              <Progress value={getProgressPercentage(metric.value, metric.goal)} className="mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Health Suggestions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Today's Health Recommendations
            </CardTitle>
            <CardDescription>
              Based on your recent health data and goals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className={`flex items-start gap-3 p-3 rounded-lg ${getSuggestionColor(suggestion.type)}`}
              >
                <suggestion.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-medium text-sm">{suggestion.title}</p>
                  <p className="text-sm opacity-90">
                    {suggestion.message}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => handleQuickAction('exercise')}
            >
              <Activity className="h-4 w-4 mr-2" />
              Log Exercise
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => handleQuickAction('meal')}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Log Meal
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => handleQuickAction('water')}
            >
              <Droplets className="h-4 w-4 mr-2" />
              Log Water
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => handleQuickAction('vitals')}
            >
              <Heart className="h-4 w-4 mr-2" />
              Check Vitals
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Goals Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weekly Fitness Goals</CardTitle>
          <CardDescription>Track your fitness progress this week</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Cardio (150 min/week)</span>
              <span>95/150 min</span>
            </div>
            <Progress value={63} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Strength Training (3x/week)</span>
              <span>2/3 sessions</span>
            </div>
            <Progress value={67} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Flexibility (daily)</span>
              <span>5/7 days</span>
            </div>
            <Progress value={71} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}