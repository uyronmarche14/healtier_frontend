import React, { useState, useMemo } from 'react';
import { 
  Bell, Calendar, MessageSquare, Users, Search, Plus, Activity, 
  Clock, AlertCircle, FileText, MoreVertical, ChevronRight, 
  TrendingUp, X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ============================================
// DATE UTILITIES (Replacing date-fns)
// ============================================

const formatDate = (date: Date): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const formatTime = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

const formatFullDate = (date: Date): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
};

const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

const isTomorrow = (date: Date): boolean => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.toDateString() === tomorrow.toDateString();
};

// ============================================
// TYPE DEFINITIONS
// ============================================

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  subscriptionStatus: 'active' | 'expired' | 'trial' | 'canceled';
  lastVisit: Date;
  isNew: boolean;
  avatar?: string;
  unreadMessages: number;
}

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: Date;
  type: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'canceled';
}

interface Message {
  id: string;
  patientId: string;
  patientName: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
  avatar?: string;
}

interface Notification {
  id: string;
  type: 'subscription' | 'expired' | 'system' | 'update';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface AnalyticsData {
  date: string;
  patients: number;
  messages: number;
  appointments: number;
}

// ============================================
// MOCK DATA
// ============================================

const generateMockPatients = (): Patient[] => [
  { id: '1', name: 'Sarah Johnson', age: 34, condition: 'Type 2 Diabetes', subscriptionStatus: 'active', lastVisit: new Date(2025, 8, 27), isNew: false, unreadMessages: 2 },
  { id: '2', name: 'Michael Chen', age: 45, condition: 'Hypertension', subscriptionStatus: 'active', lastVisit: new Date(2025, 8, 28), isNew: true, unreadMessages: 0 },
  { id: '3', name: 'Emma Williams', age: 28, condition: 'Asthma', subscriptionStatus: 'trial', lastVisit: new Date(2025, 8, 25), isNew: false, unreadMessages: 1 },
  { id: '4', name: 'James Martinez', age: 52, condition: 'Arthritis', subscriptionStatus: 'active', lastVisit: new Date(2025, 8, 26), isNew: false, unreadMessages: 3 },
  { id: '5', name: 'Olivia Brown', age: 39, condition: 'Migraine', subscriptionStatus: 'expired', lastVisit: new Date(2025, 8, 20), isNew: false, unreadMessages: 0 },
  { id: '6', name: 'David Lee', age: 61, condition: 'Heart Disease', subscriptionStatus: 'active', lastVisit: new Date(2025, 8, 29), isNew: true, unreadMessages: 1 },
  { id: '7', name: 'Sophia Garcia', age: 31, condition: 'Anxiety', subscriptionStatus: 'active', lastVisit: new Date(2025, 8, 28), isNew: false, unreadMessages: 0 },
];

const generateMockAppointments = (): Appointment[] => [
  { id: '1', patientId: '1', patientName: 'Sarah Johnson', date: new Date(2025, 8, 29, 10, 0), type: 'Follow-up', duration: 30, status: 'scheduled' },
  { id: '2', patientId: '4', patientName: 'James Martinez', date: new Date(2025, 8, 29, 14, 30), type: 'Consultation', duration: 45, status: 'scheduled' },
  { id: '3', patientId: '6', patientName: 'David Lee', date: new Date(2025, 8, 30, 9, 0), type: 'Check-up', duration: 30, status: 'scheduled' },
  { id: '4', patientId: '3', patientName: 'Emma Williams', date: new Date(2025, 8, 30, 11, 0), type: 'Treatment', duration: 60, status: 'scheduled' },
  { id: '5', patientId: '7', patientName: 'Sophia Garcia', date: new Date(2025, 9, 1, 10, 30), type: 'Therapy', duration: 45, status: 'scheduled' },
];

const generateMockMessages = (): Message[] => [
  { id: '1', patientId: '1', patientName: 'Sarah Johnson', lastMessage: 'Thank you for the prescription update. When should I start the new medication?', timestamp: new Date(2025, 8, 29, 8, 30), unread: true },
  { id: '2', patientId: '4', patientName: 'James Martinez', lastMessage: 'My knee pain has reduced significantly after the treatment.', timestamp: new Date(2025, 8, 29, 7, 15), unread: true },
  { id: '3', patientId: '3', patientName: 'Emma Williams', lastMessage: 'Can we reschedule tomorrow\'s appointment?', timestamp: new Date(2025, 8, 28, 16, 45), unread: true },
  { id: '4', patientId: '6', patientName: 'David Lee', lastMessage: 'I have attached my latest blood work results.', timestamp: new Date(2025, 8, 28, 14, 20), unread: false },
];

const generateMockNotifications = (): Notification[] => [
  { id: '1', type: 'subscription', title: 'New Subscription', message: 'Michael Chen subscribed to Premium Plan', timestamp: new Date(2025, 8, 29, 9, 0), read: false },
  { id: '2', type: 'expired', title: 'Subscription Expired', message: 'Olivia Brown\'s subscription has expired', timestamp: new Date(2025, 8, 28, 23, 59), read: false },
  { id: '3', type: 'system', title: 'Medicine Assigned', message: 'New prescription assigned to Sarah Johnson', timestamp: new Date(2025, 8, 28, 15, 30), read: true },
  { id: '4', type: 'subscription', title: 'New Patient', message: 'David Lee joined as a new patient', timestamp: new Date(2025, 8, 28, 10, 0), read: true },
];

const generateAnalyticsData = (): AnalyticsData[] => [
  { date: 'Mon', patients: 18, messages: 45, appointments: 8 },
  { date: 'Tue', patients: 22, messages: 52, appointments: 12 },
  { date: 'Wed', patients: 20, messages: 48, appointments: 10 },
  { date: 'Thu', patients: 24, messages: 61, appointments: 15 },
  { date: 'Fri', patients: 26, messages: 58, appointments: 14 },
  { date: 'Sat', patients: 15, messages: 32, appointments: 6 },
  { date: 'Sun', patients: 12, messages: 28, appointments: 4 },
];

// ============================================
// COMPONENTS
// ============================================

const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold">{value}</h3>
            {trend && <span className="text-xs text-green-600 font-medium">{trend}</span>}
          </div>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const PatientCard = ({ patient }: { patient: Patient }) => (
  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
          {patient.name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-sm">{patient.name}</h4>
          {patient.isNew && <Badge variant="secondary" className="text-xs">New</Badge>}
        </div>
        <p className="text-xs text-muted-foreground">{patient.age} yrs • {patient.condition}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <Badge variant={patient.subscriptionStatus === 'active' ? 'default' : 'secondary'} className="text-xs">
        {patient.subscriptionStatus}
      </Badge>
      {patient.unreadMessages > 0 && (
        <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
          {patient.unreadMessages}
        </Badge>
      )}
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </div>
  </div>
);

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const isUpcoming = isToday(appointment.date) || isTomorrow(appointment.date);
  
  return (
    <div className={`p-4 border rounded-lg hover:bg-accent transition-colors ${isUpcoming ? 'border-blue-500 bg-blue-50' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold text-sm">{formatTime(appointment.date)}</span>
            {isToday(appointment.date) && <Badge className="text-xs">Today</Badge>}
            {isTomorrow(appointment.date) && <Badge variant="outline" className="text-xs">Tomorrow</Badge>}
          </div>
          <h4 className="font-medium">{appointment.patientName}</h4>
          <p className="text-sm text-muted-foreground">{appointment.type} • {appointment.duration} min</p>
        </div>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const MessageCard = ({ message }: { message: Message }) => (
  <div className={`p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer ${message.unread ? 'bg-blue-50 border-blue-200' : ''}`}>
    <div className="flex items-start gap-3">
      <Avatar className="h-9 w-9">
        <AvatarFallback className="bg-gradient-to-br from-green-500 to-teal-500 text-white text-xs">
          {message.patientName.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-sm">{message.patientName}</h4>
          <span className="text-xs text-muted-foreground">{timeAgo(message.timestamp)}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{message.lastMessage}</p>
      </div>
      {message.unread && <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />}
    </div>
  </div>
);

// ============================================
// MAIN DASHBOARD
// ============================================

const EMRDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients] = useState(generateMockPatients());
  const [appointments] = useState(generateMockAppointments());
  const [messages] = useState(generateMockMessages());
  const [notifications] = useState(generateMockNotifications());
  const [analyticsData] = useState(generateAnalyticsData());

  const stats = {
    activePatients: patients.filter(p => p.subscriptionStatus === 'active').length,
    unreadMessages: messages.filter(m => m.unread).length,
    upcomingAppointments: appointments.filter(a => a.status === 'scheduled').length,
    newPatients: patients.filter(p => p.isNew).length,
  };

  const columnHelper = createColumnHelper<Patient>();
  
  const columns = [
    columnHelper.accessor('name', {
      header: 'Patient Name',
      cell: info => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-500 text-white">
              {info.getValue().split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{info.getValue()}</span>
          {info.row.original.isNew && <Badge variant="secondary" className="text-xs">New</Badge>}
        </div>
      ),
    }),
    columnHelper.accessor('age', {
      header: 'Age',
      cell: info => <span>{info.getValue()} yrs</span>,
    }),
    columnHelper.accessor('condition', {
      header: 'Condition',
    }),
    columnHelper.accessor('subscriptionStatus', {
      header: 'Status',
      cell: info => (
        <Badge variant={info.getValue() === 'active' ? 'default' : 'secondary'}>
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor('lastVisit', {
      header: 'Last Visit',
      cell: info => formatDate(info.getValue()),
    }),
  ];

  const filteredPatients = useMemo(() => {
    if (!searchQuery) return patients;
    return patients.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [patients, searchQuery]);

  const table = useReactTable({
    data: filteredPatients,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const upcomingAppointments = appointments.slice(0, 3);
  const recentMessages = messages.slice(0, 4);
  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600" />
              <span className="font-bold text-lg">EMR System</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Welcome back, Dr. Smith</h1>
              <p className="text-sm text-muted-foreground">{formatFullDate(new Date())}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-9 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {unreadNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {unreadNotifications.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Users}
              label="Active Patients"
              value={stats.activePatients}
              trend={`+${stats.newPatients} new`}
              color="from-blue-500 to-blue-600"
            />
            <StatCard
              icon={MessageSquare}
              label="Unread Messages"
              value={stats.unreadMessages}
              color="from-green-500 to-green-600"
            />
            <StatCard
              icon={Calendar}
              label="Upcoming Appointments"
              value={stats.upcomingAppointments}
              trend="This week"
              color="from-purple-500 to-purple-600"
            />
            <StatCard
              icon={Activity}
              label="Patient Satisfaction"
              value="94%"
              trend="+2% from last month"
              color="from-orange-500 to-orange-600"
            />
          </div>

          {/* Notifications */}
          {unreadNotifications.length > 0 && (
            <div className="space-y-2">
              {unreadNotifications.map(notif => (
                <Alert key={notif.id} className="border-blue-200 bg-blue-50">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold">{notif.title}</span> • {notif.message}
                    </div>
                    <Button variant="ghost" size="sm">
                      <X className="h-4 w-4" />
                    </Button>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          )}

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Analytics Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Weekly Overview</span>
                    <Button variant="outline" size="sm">View Details</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                      />
                      <Line type="monotone" dataKey="patients" stroke="#3b82f6" strokeWidth={2} name="Patients" />
                      <Line type="monotone" dataKey="messages" stroke="#10b981" strokeWidth={2} name="Messages" />
                      <Line type="monotone" dataKey="appointments" stroke="#8b5cf6" strokeWidth={2} name="Appointments" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Recent Patients */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Patients</span>
                    <Button variant="ghost" size="sm">View All</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {patients.slice(0, 5).map(patient => (
                    <PatientCard key={patient.id} patient={patient} />
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base">
                    <span>Upcoming Sessions</span>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingAppointments.map(appointment => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                </CardContent>
              </Card>

              {/* Recent Messages */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base">
                    <span>Recent Messages</span>
                    <Badge variant="destructive">{stats.unreadMessages}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {recentMessages.map(message => (
                    <MessageCard key={message.id} message={message} />
                  ))}
                  <Button variant="outline" className="w-full mt-2">
                    View All Messages
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Patient Table with TanStack */}
          <Card>
            <CardHeader>
              <CardTitle>All Patients ({filteredPatients.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    {table.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <th key={header.id} className="px-4 py-3 text-left text-sm font-semibold">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map(row => (
                      <tr key={row.id} className="border-t hover:bg-gray-50 transition-colors">
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id} className="px-4 py-3 text-sm">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
      </main>
    </div>
  );
};

export default EMRDashboard;
