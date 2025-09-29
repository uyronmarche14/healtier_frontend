import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { AlertCircle, TrendingUp, TrendingDown, CheckCircle, Clock, Target } from 'lucide-react'
import { HealthGoal } from '@/types/health.types'

interface HealthGoalsCardProps {
  goals: HealthGoal[]
  onGoalClick?: (goalId: string) => void
  onAddGoal?: () => void
  className?: string
}

export function HealthGoalsCard({ goals, onGoalClick, onAddGoal, className }: HealthGoalsCardProps) {
  const getGoalIcon = (type: string) => {
    switch (type) {
      case 'weight': return <TrendingDown className="h-4 w-4" />
      case 'exercise': return <Target className="h-4 w-4" />
      case 'blood_pressure': return <TrendingDown className="h-4 w-4" />
      case 'sleep': return <Clock className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 60) return 'bg-yellow-500'
    if (progress >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getStatusBadge = (progress: number, isActive: boolean) => {
    if (!isActive) return <Badge variant="secondary">Paused</Badge>
    if (progress >= 100) return <Badge className="bg-green-100 text-green-800">Completed</Badge>
    if (progress >= 80) return <Badge className="bg-blue-100 text-blue-800">On Track</Badge>
    if (progress >= 50) return <Badge className="bg-yellow-100 text-yellow-800">Behind</Badge>
    return <Badge className="bg-red-100 text-red-800">Needs Attention</Badge>
  }

  const formatDeadline = (deadline: Date | undefined) => {
    if (!deadline) return 'No deadline'
    
    const now = new Date()
    const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysLeft < 0) return 'Overdue'
    if (daysLeft === 0) return 'Due today'
    if (daysLeft === 1) return '1 day left'
    return `${daysLeft} days left`
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg">Health Goals</CardTitle>
          <CardDescription>Track your wellness objectives</CardDescription>
        </div>
        <Button onClick={onAddGoal} size="sm" variant="outline">
          <Target className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!goals || goals.length === 0 ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No active health goals</p>
              <Button onClick={onAddGoal} size="sm" className="mt-3">
                Create Your First Goal
              </Button>
            </div>
          ) : (
            goals.map((goal) => (
              <div
                key={goal.id}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onGoalClick?.(goal.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      {getGoalIcon(goal.type as any)}
                    </div>
                    <div>
                      <h4 className="font-medium capitalize">
                        {goal.type.replace('_', ' ')} Goal
                      </h4>
                      <p className="text-sm text-muted-foreground">
                          {goal.current} / {goal.target} {goal.unit}
                        </p>
                    </div>
                  </div>
                  {getStatusBadge(goal.progress, goal.isActive)}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>{goal.streak} day streak</span>
                    </div>
                    <span>{formatDeadline(goal.deadline)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}