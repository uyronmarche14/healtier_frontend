import { 
  Patient, 
  Doctor, 
  Medicine, 
  Appointment, 
  Subscription, 
  SubscriptionPlan,
  ApiResponse,
  PaginatedResponse 
} from '@/types/data.types'

// Data Service Interface
export interface IDataService {
  // Patient operations
  getPatients(): Promise<ApiResponse<Patient[]>>
  getPatientById(id: string): Promise<ApiResponse<Patient | null>>
  searchPatients(query: string): Promise<ApiResponse<Patient[]>>
  getPatientsByBloodType(bloodType: string): Promise<ApiResponse<Patient[]>>
  getPatientsWithAllergies(): Promise<ApiResponse<Patient[]>>
  
  // Doctor operations
  getDoctors(): Promise<ApiResponse<Doctor[]>>
  getDoctorById(id: string): Promise<ApiResponse<Doctor | null>>
  getDoctorsBySpecialization(specialization: string): Promise<ApiResponse<Doctor[]>>
  getTopRatedDoctors(limit: number): Promise<ApiResponse<Doctor[]>>
  getAvailableDoctors(): Promise<ApiResponse<Doctor[]>>
  searchDoctors(query: string): Promise<ApiResponse<Doctor[]>>
  
  // Appointment operations
  getAppointments(): Promise<ApiResponse<Appointment[]>>
  getAppointmentById(id: string): Promise<ApiResponse<Appointment | null>>
  getAppointmentsByPatient(patientId: string): Promise<ApiResponse<Appointment[]>>
  getAppointmentsByDoctor(doctorId: string): Promise<ApiResponse<Appointment[]>>
  getTodayAppointments(): Promise<ApiResponse<Appointment[]>>
  getUpcomingAppointments(days: number): Promise<ApiResponse<Appointment[]>>
  getAppointmentsByStatus(status: string): Promise<ApiResponse<Appointment[]>>
  
  // Subscription operations
  getSubscriptions(): Promise<ApiResponse<Subscription[]>>
  getSubscriptionById(id: string): Promise<ApiResponse<Subscription | null>>
  getSubscriptionsByPatient(patientId: string): Promise<ApiResponse<Subscription[]>>
  getSubscriptionsByPlan(planId: string): Promise<ApiResponse<Subscription[]>>
  getActiveSubscriptions(): Promise<ApiResponse<Subscription[]>>
  getSubscriptionPlans(): Promise<ApiResponse<SubscriptionPlan[]>>
  getSubscriptionPlanById(id: string): Promise<ApiResponse<SubscriptionPlan | null>>
  
  // Dashboard operations
  getDashboardStats(): Promise<ApiResponse<any>>
  getRecentActivity(limit: number): Promise<ApiResponse<any[]>>
}

// Mock Data Service Implementation
export class MockDataService implements IDataService {
  // Import sample data
  private patientsData: () => Promise<Patient[]> = async () => {
    const { samplePatients } = await import('@/data/patients/sample-data')
    return samplePatients
  }
  
  private doctorsData: () => Promise<Doctor[]> = async () => {
    const { sampleDoctors } = await import('@/data/doctors/sample-data')
    return sampleDoctors
  }
  
  private appointmentsData: () => Promise<Appointment[]> = async () => {
    const { sampleAppointments } = await import('@/data/appointments/sample-data')
    return sampleAppointments
  }
  
  private subscriptionsData: () => Promise<Subscription[]> = async () => {
    const { sampleSubscriptions } = await import('@/data/subscriptions/sample-data')
    return sampleSubscriptions
  }
  
  private subscriptionPlansData: () => Promise<SubscriptionPlan[]> = async () => {
    const { sampleSubscriptionPlans } = await import('@/data/subscriptions/sample-data')
    return sampleSubscriptionPlans
  }

  // Helper method to create standardized API response
  private createResponse<T>(data: T, success = true, message = ''): ApiResponse<T> {
    return {
      success,
      data,
      message
    }
  }

  // Helper method to simulate API delay
  private simulateDelay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Patient operations
  async getPatients(): Promise<ApiResponse<Patient[]>> {
    await this.simulateDelay()
    const patients = await this.patientsData()
    return this.createResponse(patients || [])
  }

  async getPatientById(id: string): Promise<ApiResponse<Patient | null>> {
    await this.simulateDelay()
    const { getPatientById } = await import('@/data/patients/sample-data')
    const patient = getPatientById(id)
    return this.createResponse(patient || null)
  }

  async searchPatients(query: string): Promise<ApiResponse<Patient[]>> {
    await this.simulateDelay()
    const { searchPatients } = await import('@/data/patients/sample-data')
    const patients = searchPatients(query)
    return this.createResponse(patients || [])
  }

  async getPatientsByBloodType(bloodType: string): Promise<ApiResponse<Patient[]>> {
    await this.simulateDelay()
    const { getPatientsByBloodType } = await import('@/data/patients/sample-data')
    const patients = getPatientsByBloodType(bloodType)
    return this.createResponse(patients)
  }

  async getPatientsWithAllergies(): Promise<ApiResponse<Patient[]>> {
    await this.simulateDelay()
    const { samplePatients } = await import('@/data/patients/sample-data')
    const patients = samplePatients.filter(patient => patient.allergies && patient.allergies.length > 0)
    return this.createResponse(patients)
  }

  // Doctor operations
  async getDoctors(): Promise<ApiResponse<Doctor[]>> {
    await this.simulateDelay()
    const doctors = await this.doctorsData()
    return this.createResponse(doctors || [])
  }

  async getDoctorById(id: string): Promise<ApiResponse<Doctor | null>> {
    await this.simulateDelay()
    const { getDoctorById } = await import('@/data/doctors/sample-data')
    const doctor = getDoctorById(id)
    return this.createResponse(doctor || null)
  }

  async getDoctorsBySpecialization(specialization: string): Promise<ApiResponse<Doctor[]>> {
    await this.simulateDelay()
    const { getDoctorsBySpecialization } = await import('@/data/doctors/sample-data')
    const doctors = getDoctorsBySpecialization(specialization)
    return this.createResponse(doctors)
  }

  async getTopRatedDoctors(limit: number): Promise<ApiResponse<Doctor[]>> {
    await this.simulateDelay()
    const { getTopRatedDoctors } = await import('@/data/doctors/sample-data')
    const doctors = getTopRatedDoctors(limit)
    return this.createResponse(doctors)
  }

  async getAvailableDoctors(): Promise<ApiResponse<Doctor[]>> {
    await this.simulateDelay()
    const { getAvailableDoctors } = await import('@/data/doctors/sample-data')
    const doctors = getAvailableDoctors()
    return this.createResponse(doctors)
  }

  async searchDoctors(query: string): Promise<ApiResponse<Doctor[]>> {
    await this.simulateDelay()
    const { searchDoctors } = await import('@/data/doctors/sample-data')
    const doctors = searchDoctors(query)
    return this.createResponse(doctors || [])
  }

  // Appointment operations
  async getAppointments(): Promise<ApiResponse<Appointment[]>> {
    await this.simulateDelay()
    const appointments = await this.appointmentsData()
    return this.createResponse(appointments || [])
  }

  async getAppointmentById(id: string): Promise<ApiResponse<Appointment | null>> {
    await this.simulateDelay()
    const { getAppointmentById } = await import('@/data/appointments/sample-data')
    const appointment = getAppointmentById(id)
    return this.createResponse(appointment || null)
  }

  async getAppointmentsByPatient(patientId: string): Promise<ApiResponse<Appointment[]>> {
    await this.simulateDelay()
    const { getAppointmentsByPatient } = await import('@/data/appointments/sample-data')
    const appointments = getAppointmentsByPatient(patientId)
    return this.createResponse(appointments || [])
  }

  async getAppointmentsByDoctor(doctorId: string): Promise<ApiResponse<Appointment[]>> {
    await this.simulateDelay()
    const { getAppointmentsByDoctor } = await import('@/data/appointments/sample-data')
    const appointments = getAppointmentsByDoctor(doctorId)
    return this.createResponse(appointments || [])
  }

  async getTodayAppointments(): Promise<ApiResponse<Appointment[]>> {
    await this.simulateDelay()
    const { getTodayAppointments } = await import('@/data/appointments/sample-data')
    const appointments = getTodayAppointments()
    return this.createResponse(appointments || [])
  }

  async getUpcomingAppointments(days: number = 7): Promise<ApiResponse<Appointment[]>> {
    await this.simulateDelay()
    const { getUpcomingAppointments } = await import('@/data/appointments/sample-data')
    const appointments = getUpcomingAppointments(days)
    return this.createResponse(appointments || [])
  }

  async getAppointmentsByStatus(status: string): Promise<ApiResponse<Appointment[]>> {
    await this.simulateDelay()
    const { getAppointmentsByStatus } = await import('@/data/appointments/sample-data')
    const appointments = getAppointmentsByStatus(status)
    return this.createResponse(appointments || [])
  }

  // Subscription operations
  async getSubscriptions(): Promise<ApiResponse<Subscription[]>> {
    await this.simulateDelay()
    const subscriptions = await this.subscriptionsData()
    return this.createResponse(subscriptions || [])
  }

  async getSubscriptionById(id: string): Promise<ApiResponse<Subscription | null>> {
    await this.simulateDelay()
    const { getSubscriptionById } = await import('@/data/subscriptions/sample-data')
    const subscription = getSubscriptionById(id)
    return this.createResponse(subscription || null)
  }

  async getSubscriptionsByPatient(patientId: string): Promise<ApiResponse<Subscription[]>> {
    await this.simulateDelay()
    const { getSubscriptionsByPatient } = await import('@/data/subscriptions/sample-data')
    const subscriptions = getSubscriptionsByPatient(patientId)
    return this.createResponse(subscriptions || [])
  }

  async getSubscriptionsByPlan(planId: string): Promise<ApiResponse<Subscription[]>> {
    await this.simulateDelay()
    const { getSubscriptionsByPlan } = await import('@/data/subscriptions/sample-data')
    const subscriptions = getSubscriptionsByPlan(planId)
    return this.createResponse(subscriptions || [])
  }

  async getActiveSubscriptions(): Promise<ApiResponse<Subscription[]>> {
    await this.simulateDelay()
    const { getActiveSubscriptions } = await import('@/data/subscriptions/sample-data')
    const subscriptions = getActiveSubscriptions()
    return this.createResponse(subscriptions || [])
  }

  async getSubscriptionPlans(): Promise<ApiResponse<SubscriptionPlan[]>> {
    await this.simulateDelay()
    const plans = await this.subscriptionPlansData()
    return this.createResponse(plans || [])
  }

  async getSubscriptionPlanById(id: string): Promise<ApiResponse<SubscriptionPlan | null>> {
    await this.simulateDelay()
    const { getPlanById } = await import('@/data/subscriptions/sample-data')
    const plan = getPlanById(id)
    return this.createResponse(plan || null)
  }

  // Dashboard operations
  async getDashboardStats(): Promise<ApiResponse<any>> {
    await this.simulateDelay()
    
    // Get all data for dashboard stats
    const [patients, doctors, appointments, subscriptions] = await Promise.all([
      this.patientsData(),
      this.doctorsData(),
      this.appointmentsData(),
      this.subscriptionsData()
    ])

    // Calculate stats with null checks
    const totalPatients = (patients || []).length
    const totalDoctors = (doctors || []).length
    const totalAppointments = (appointments || []).length
    const activeSubscriptions = (subscriptions || []).filter(s => s.status === 'active').length
    const monthlyRevenue = (subscriptions || [])
      .filter(s => s.status === 'active')
      .reduce((sum, sub) => sum + sub.price, 0)

    const stats = {
      totalPatients,
      totalDoctors,
      totalAppointments,
      activeSubscriptions,
      monthlyRevenue,
      recentPatients: (patients || []).slice(-5),
      recentAppointments: (appointments || []).slice(-5),
      topDoctors: (doctors || []).slice(0, 3)
    }

    return this.createResponse(stats)
  }

  async getRecentActivity(limit: number = 10): Promise<ApiResponse<any[]>> {
    await this.simulateDelay()
    
    const [appointments, subscriptions] = await Promise.all([
      this.appointmentsData(),
      this.subscriptionsData()
    ])

    // Create recent activity from appointments and subscriptions with null checks
    const recentActivity = [
      ...((appointments || []).map(apt => ({
        type: 'appointment',
        id: apt.id,
        title: `Appointment scheduled`,
        description: `Patient ${apt.patientId} has an appointment with Dr. ${apt.doctorId}`,
        timestamp: apt.createdAt,
        status: apt.status
      }))),
      ...((subscriptions || []).map(sub => ({
        type: 'subscription',
        id: sub.id,
        title: `Subscription ${sub.status}`,
        description: `Patient ${sub.patientId} ${sub.status} ${sub.planId}`,
        timestamp: sub.createdAt,
        status: sub.status
      })))
    ]
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, limit)

    return this.createResponse(recentActivity)
  }
}

// Singleton instance
export const dataService = new MockDataService()

// Export for dependency injection
export default dataService