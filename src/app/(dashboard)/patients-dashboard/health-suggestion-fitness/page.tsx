import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HealthDashboardClient } from '@/components/health/health-dashboard-client'
import { 
  Activity, 
  Heart, 
  Target, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Apple,
  Droplets,
  Dumbbell,
  Utensils,
  BarChart3
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Health & Fitness Suggestions',
  description: 'Personalized health recommendations and fitness tracking',
}

export default function HealthSuggestionFitnessPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Health & Fitness</h1>
          <p className="text-muted-foreground">
            Personalized suggestions to improve your health and fitness
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-2" />
            Track Activity
          </Button>
          <Button size="sm">
            <Target className="h-4 w-4 mr-2" />
            Set Goals
          </Button>
        </div>
      </div>

      {/* Interactive Dashboard */}
      <HealthDashboardClient />

      {/* Detailed Sections */}
      <Tabs defaultValue="fitness" className="space-y-4">
        <TabsList>
          <TabsTrigger value="fitness" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            Fitness Goals
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            Nutrition
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fitness" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Exercise Goals</CardTitle>
                <CardDescription>Track your fitness progress</CardDescription>
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

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommended Workouts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Morning Walk</h4>
                    <Badge variant="secondary">20 min</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Brisk walk to boost metabolism and cardiovascular health
                  </p>
                  <Button size="sm" variant="outline">Start Workout</Button>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Desk Stretches</h4>
                    <Badge variant="secondary">5 min</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Simple stretches to reduce tension from prolonged sitting
                  </p>
                  <Button size="sm" variant="outline">View Routine</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Nutrition</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Calories</span>
                  <span className="text-sm font-medium">1,650 / 2,000</span>
                </div>
                <Progress value={83} />
                <div className="flex justify-between">
                  <span className="text-sm">Protein</span>
                  <span className="text-sm font-medium">65g / 80g</span>
                </div>
                <Progress value={81} />
                <div className="flex justify-between">
                  <span className="text-sm">Fiber</span>
                  <span className="text-sm font-medium">22g / 25g</span>
                </div>
                <Progress value={88} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Meals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm">Breakfast</span>
                  <Badge variant="outline">450 cal</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm">Lunch</span>
                  <Badge variant="outline">580 cal</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm">Snacks</span>
                  <Badge variant="outline">120 cal</Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm">Dinner</span>
                  <Badge variant="secondary">500 cal</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Food Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <p className="text-sm font-medium">Add more leafy greens</p>
                  <p className="text-xs text-muted-foreground">Rich in vitamins and fiber</p>
                </div>
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <p className="text-sm font-medium">Include lean protein</p>
                  <p className="text-xs text-muted-foreground">Helps maintain muscle mass</p>
                </div>
                <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                  <p className="text-sm font-medium">Reduce sodium intake</p>
                  <p className="text-xs text-muted-foreground">Helps manage blood pressure</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Progress</CardTitle>
                <CardDescription>Your health metrics this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Weight Change</span>
                    <span className="text-sm font-medium text-green-600">-0.5 kg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. Heart Rate</span>
                    <span className="text-sm font-medium">74 bpm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Exercise Days</span>
                    <span className="text-sm font-medium">4/7 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sleep Quality</span>
                    <Badge variant="outline">Good</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Goal Achievement</CardTitle>
                <CardDescription>This month's completed goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Walk 10,000 steps daily (12 days)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Drink 2.5L water daily (8 days)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Exercise 30 min (6 sessions)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Meditation 10 min (5 days)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}