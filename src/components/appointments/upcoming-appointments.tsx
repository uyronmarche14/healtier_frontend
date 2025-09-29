import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Appointment } from "@/types/appoinments"
import { Calendar, Clock } from "lucide-react"

interface UpcomingAppointmentsProps {
  appointments: Appointment[]
  className?: string
}

export function UpcomingAppointments({ appointments, className = "" }: UpcomingAppointmentsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.map((appointment) => (
          <div 
            key={appointment.id}
            className="flex items-start space-x-4 rounded-md border p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {appointment.doctor}
              </p>
              <p className="text-sm text-muted-foreground">
                {appointment.specialty}
              </p>
              <div className="flex items-center pt-2">
                <Calendar className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {formatDate(appointment.date)}
                </span>
                <Clock className="ml-3 mr-1 h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {formatTime(appointment.date)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}