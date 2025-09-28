import { Doctor } from '@/types/data.types'

export const sampleDoctors: Doctor[] = [
  {
    id: 'doctor-001',
    email: 'dr.sarah.johnson@hospital.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    role: 'doctor',
    createdAt: new Date('2022-01-10T08:00:00Z'),
    updatedAt: new Date('2024-01-15T14:30:00Z'),
    isActive: true,
    specialization: 'Internal Medicine',
    licenseNumber: 'MD-NY-12345',
    yearsOfExperience: 12,
    education: [
      'MD - Harvard Medical School',
      'Residency - Johns Hopkins Hospital',
      'Board Certified - Internal Medicine'
    ],
    certifications: [
      'American Board of Internal Medicine',
      'Advanced Cardiac Life Support (ACLS)',
      'Basic Life Support (BLS)'
    ],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      hours: {
        start: '09:00',
        end: '17:00'
      }
    },
    rating: 4.8,
    totalReviews: 156
  },
  {
    id: 'doctor-002',
    email: 'dr.michael.chen@hospital.com',
    firstName: 'Michael',
    lastName: 'Chen',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    role: 'doctor',
    createdAt: new Date('2021-06-15T09:30:00Z'),
    updatedAt: new Date('2024-01-12T11:45:00Z'),
    isActive: true,
    specialization: 'Cardiology',
    licenseNumber: 'MD-NY-23456',
    yearsOfExperience: 15,
    education: [
      'MD - Stanford University School of Medicine',
      'Residency - Mayo Clinic',
      'Fellowship - Cleveland Clinic (Cardiology)'
    ],
    certifications: [
      'American Board of Internal Medicine - Cardiology',
      'National Board of Echocardiography',
      'Society for Cardiovascular Angiography and Interventions'
    ],
    availability: {
      days: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
      hours: {
        start: '08:00',
        end: '16:00'
      }
    },
    rating: 4.9,
    totalReviews: 203
  },
  {
    id: 'doctor-003',
    email: 'dr.emily.rodriguez@hospital.com',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face',
    role: 'doctor',
    createdAt: new Date('2023-02-01T10:15:00Z'),
    updatedAt: new Date('2024-01-14T15:20:00Z'),
    isActive: true,
    specialization: 'Pediatrics',
    licenseNumber: 'MD-NY-34567',
    yearsOfExperience: 8,
    education: [
      'MD - University of California, San Francisco',
      'Residency - Children\'s Hospital of Philadelphia',
      'Board Certified - Pediatrics'
    ],
    certifications: [
      'American Board of Pediatrics',
      'Pediatric Advanced Life Support (PALS)',
      'Neonatal Resuscitation Program (NRP)'
    ],
    availability: {
      days: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
      hours: {
        start: '09:00',
        end: '15:00'
      }
    },
    rating: 4.7,
    totalReviews: 89
  },
  {
    id: 'doctor-004',
    email: 'dr.david.kim@hospital.com',
    firstName: 'David',
    lastName: 'Kim',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1582750433449-6489051c5c9e?w=150&h=150&fit=crop&crop=face',
    role: 'doctor',
    createdAt: new Date('2020-09-20T07:45:00Z'),
    updatedAt: new Date('2024-01-11T12:10:00Z'),
    isActive: true,
    specialization: 'Orthopedic Surgery',
    licenseNumber: 'MD-NY-45678',
    yearsOfExperience: 18,
    education: [
      'MD - Yale School of Medicine',
      'Residency - Hospital for Special Surgery',
      'Fellowship - Sports Medicine, Mayo Clinic'
    ],
    certifications: [
      'American Board of Orthopedic Surgery',
      'American Academy of Orthopedic Surgeons',
      'Arthroscopy Association of North America'
    ],
    availability: {
      days: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      hours: {
        start: '07:30',
        end: '17:30'
      }
    },
    rating: 4.6,
    totalReviews: 134
  },
  {
    id: 'doctor-005',
    email: 'dr.lisa.anderson@hospital.com',
    firstName: 'Lisa',
    lastName: 'Anderson',
    phone: '+1 (555) 567-8901',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face',
    role: 'doctor',
    createdAt: new Date('2021-11-10T09:00:00Z'),
    updatedAt: new Date('2024-01-13T16:45:00Z'),
    isActive: false, // Inactive doctor for testing
    specialization: 'Dermatology',
    licenseNumber: 'MD-NY-56789',
    yearsOfExperience: 10,
    education: [
      'MD - Columbia University Vagelos College of Physicians and Surgeons',
      'Residency - New York Presbyterian Hospital',
      'Board Certified - Dermatology'
    ],
    certifications: [
      'American Board of Dermatology',
      'American Academy of Dermatology',
      'American Society for Dermatologic Surgery'
    ],
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      hours: {
        start: '10:00',
        end: '18:00'
      }
    },
    rating: 4.5,
    totalReviews: 78
  }
]

// Helper functions for doctor data manipulation
export const getActiveDoctors = () => sampleDoctors.filter(doctor => doctor.isActive)

export const getDoctorsBySpecialization = (specialization: string) => 
  sampleDoctors.filter(doctor => doctor.specialization === specialization)

export const getTopRatedDoctors = (minRating: number = 4.0) => 
  sampleDoctors.filter(doctor => (doctor.rating || 0) >= minRating)

export const searchDoctors = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return sampleDoctors.filter(doctor => 
    doctor.firstName.toLowerCase().includes(lowercaseQuery) ||
    doctor.lastName.toLowerCase().includes(lowercaseQuery) ||
    doctor.email.toLowerCase().includes(lowercaseQuery) ||
    doctor.specialization.toLowerCase().includes(lowercaseQuery) ||
    doctor.phone?.includes(query)
  )
}

export const getDoctorById = (id: string) => 
  sampleDoctors.find(doctor => doctor.id === id)

export const getAvailableDoctors = () => 
  sampleDoctors.filter(doctor => doctor.isActive && doctor.availability.days.length > 0)

export const getDoctorsByAvailability = (day: string) => 
  sampleDoctors.filter(doctor => 
    doctor.isActive && doctor.availability.days.includes(day)
  )