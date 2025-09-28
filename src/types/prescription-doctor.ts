export interface PrescriptionMedication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  quantity: number;
  unit: string;
  route: string; // oral, topical, injection, etc.
}

export interface PrescriptionStatus {
  id: string;
  name: 'draft' | 'pending' | 'filled' | 'partially_filled' | 'cancelled' | 'expired';
  color: string;
  label: string;
}

export interface DoctorPrescription {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientPhone?: string;
  doctorId: string;
  doctorName: string;
  appointmentId?: string;
  medications: PrescriptionMedication[];
  status: PrescriptionStatus;
  notes: string;
  instructions: string;
  validUntil: Date;
  filledAt?: Date;
  filledBy?: string;
  createdAt: Date;
  updatedAt: Date;
  totalItems: number;
  priority: 'routine' | 'urgent' | 'stat';
}

export interface PrescriptionFilters {
  status?: string;
  patient?: string;
  dateFrom?: Date;
  dateTo?: Date;
  priority?: string;
}

export interface CreatePrescriptionData {
  patientId: string;
  appointmentId?: string;
  medications: Omit<PrescriptionMedication, 'id'>[];
  notes: string;
  instructions: string;
  validUntil: Date;
  priority: 'routine' | 'urgent' | 'stat';
}

export interface PrescriptionStats {
  total: number;
  pending: number;
  filled: number;
  cancelled: number;
  expired: number;
  urgent: number;
}