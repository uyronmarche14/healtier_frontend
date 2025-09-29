# Patient Dashboard Components

A comprehensive set of modern, responsive React components for building patient healthcare dashboards. Built with TypeScript, Tailwind CSS, and Shadcn UI components.

## 🎯 Features

- **Modern Design**: Clean, professional UI with gradient backgrounds and smooth animations
- **Fully Responsive**: Optimized for mobile, tablet, and desktop experiences
- **Type Safe**: Complete TypeScript implementation with proper interfaces
- **Accessible**: Built with accessibility best practices using Radix UI primitives
- **Scalable**: Modular component architecture for easy customization and extension
- **Interactive**: Rich interactions with hover effects, loading states, and animations

## 📦 Components

### Core Components

#### `PatientDashboardOverview`
Main dashboard container that orchestrates all other components with responsive layout.

**Props:**
- `patientId?: string` - Patient identifier
- `onNavigate?: (path: string) => void` - Navigation handler

#### `WelcomeHeader`
Personalized welcome section with patient info and quick stats.

**Props:**
- `patientName?: string` - Patient's display name
- `lastVisit?: Date` - Last appointment date
- `upcomingAppointments?: number` - Count of upcoming appointments
- `unreadMessages?: number` - Count of unread messages
- `healthScore?: number` - Overall health score (0-100)

#### `HealthMetricsCard`
Displays vital signs and health measurements with trend indicators.

**Props:**
- `vitals?: VitalSign[]` - Array of vital sign data
- `onViewDetails?: () => void` - View all vitals handler
- `onAddVitals?: () => void` - Add new vitals handler

#### `AppointmentSummaryCard`
Shows upcoming appointments with video call integration.

**Props:**
- `appointments?: Appointment[]` - Array of appointment data
- `onBookAppointment?: () => void` - Book appointment handler
- `onViewAll?: () => void` - View all appointments handler
- `onJoinCall?: (appointmentId: string) => void` - Join video call handler

#### `MedicationTrackerCard`
Medication adherence tracking with dose reminders.

**Props:**
- `medications?: Medication[]` - Array of medication data
- `onMarkTaken?: (medicationId: string, timeSlotIndex: number) => void` - Mark dose taken
- `onViewAll?: () => void` - View all medications handler
- `onAddMedication?: () => void` - Add medication handler

#### `QuickActionsGrid`
Grid of quick action buttons for common tasks.

**Props:**
- `actions?: QuickAction[]` - Array of action configurations
- `onActionClick?: (actionId: string) => void` - Action click handler

#### `HealthInsightsCard`
AI-powered health insights and recommendations.

**Props:**
- `insights?: HealthInsight[]` - Array of AI-generated insights
- `onViewAll?: () => void` - View all insights handler
- `onTakeAction?: (insightId: string) => void` - Take action on insight

### Utility Components

#### `UpcomingRemindersCard`
Displays medication and appointment reminders.

#### `RecentActivityCard`
Shows recent health-related activities and updates.

## 🚀 Usage

### Basic Implementation

```tsx
import { PatientDashboardOverview } from '@/components/patient-dashboard'

export default function PatientDashboard() {
  const handleNavigation = (path: string) => {
    // Handle navigation logic
    router.push(path)
  }

  return (
    <PatientDashboardOverview 
      patientId="patient-001"
      onNavigate={handleNavigation}
    />
  )
}
```

### Individual Component Usage

```tsx
import { 
  WelcomeHeader, 
  HealthMetricsCard, 
  AppointmentSummaryCard 
} from '@/components/patient-dashboard'

export default function CustomDashboard() {
  return (
    <div className="space-y-6">
      <WelcomeHeader 
        patientName="John Doe"
        healthScore={85}
        upcomingAppointments={2}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthMetricsCard 
          onViewDetails={() => router.push('/health')}
        />
        <AppointmentSummaryCard 
          onBookAppointment={() => router.push('/appointments/book')}
        />
      </div>
    </div>
  )
}
```

## 🎨 Customization

### Theming
Components use CSS variables for theming. Customize colors in your `globals.css`:

```css
:root {
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 84% 4.9%;
  /* ... other variables */
}
```

### Component Styling
Each component accepts standard className props for custom styling:

```tsx
<HealthMetricsCard 
  className="custom-health-card"
  onViewDetails={handleViewDetails}
/>
```

### Data Integration
Components are designed to work with your data layer:

```tsx
// With React Query
const { data: vitals } = useQuery(['vitals', patientId], fetchVitals)

<HealthMetricsCard vitals={vitals} />
```

## 📱 Responsive Design

Components automatically adapt to different screen sizes:

- **Mobile (< 768px)**: Single column layout, simplified interactions
- **Tablet (768px - 1024px)**: Two column layout, touch-optimized
- **Desktop (> 1024px)**: Three column layout, full feature set

## 🔧 Development

### Adding New Components

1. Create component file in `/src/components/patient-dashboard/`
2. Follow existing patterns for props and styling
3. Add to index.ts exports
4. Update README documentation

### Testing Components

```bash
# Run component tests
npm run test:components

# Visual regression testing
npm run test:visual
```

## 📋 Type Definitions

Key interfaces used across components:

```typescript
interface VitalSign {
  label: string
  value: string
  unit: string
  status: 'normal' | 'warning' | 'critical'
  trend: 'up' | 'down' | 'stable'
  icon: React.ReactNode
  lastUpdated: Date
}

interface Appointment {
  id: string
  doctorName: string
  specialty: string
  date: Date
  time: string
  type: 'in-person' | 'video' | 'phone'
  status: 'confirmed' | 'pending' | 'completed'
}

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  timeSlots: string[]
  taken: boolean[]
  adherenceRate: number
  nextDose: Date
}
```

## 🤝 Contributing

1. Follow existing code patterns and conventions
2. Ensure TypeScript types are properly defined
3. Add proper accessibility attributes
4. Test on multiple screen sizes
5. Update documentation for new features

## 📄 License

This component library is part of the Healtier Frontend project and follows the same licensing terms.