import { Medicine } from '@/types/data.types'

export const sampleMedicines: Medicine[] = [
  {
    id: 'medicine-001',
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    brand: 'Zestril',
    category: 'Cardiovascular',
    description: 'ACE inhibitor used to treat high blood pressure and heart failure',
    dosage: '10mg once daily',
    form: 'tablet',
    strength: '10mg',
    price: 24.99,
    stock: 150,
    requiresPrescription: true,
    sideEffects: ['Dizziness', 'Cough', 'Headache', 'Fatigue'],
    contraindications: ['Pregnancy', 'History of angioedema'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop',
    isAvailable: true,
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    isActive: true
  },
  {
    id: 'medicine-002',
    name: 'Metformin',
    genericName: 'Metformin HCl',
    brand: 'Glucophage',
    category: 'Diabetes',
    description: 'Oral diabetes medicine that helps control blood sugar levels',
    dosage: '500mg twice daily with meals',
    form: 'tablet',
    strength: '500mg',
    price: 18.50,
    stock: 200,
    requiresPrescription: true,
    sideEffects: ['Nausea', 'Diarrhea', 'Stomach upset', 'Metallic taste'],
    contraindications: ['Kidney disease', 'Liver disease'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop',
    isAvailable: true,
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    isActive: true
  },
  {
    id: 'medicine-003',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    brand: 'Advil',
    category: 'Pain Relief',
    description: 'Nonsteroidal anti-inflammatory drug (NSAID) for pain and inflammation',
    dosage: '200-400mg every 4-6 hours as needed',
    form: 'tablet',
    strength: '200mg',
    price: 12.99,
    stock: 300,
    requiresPrescription: false,
    sideEffects: ['Stomach upset', 'Heartburn', 'Dizziness', 'Rash'],
    contraindications: ['Stomach ulcers', 'Kidney disease', 'Heart disease'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop',
    isAvailable: true,
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    isActive: true
  },
  {
    id: 'medicine-004',
    name: 'Amoxicillin',
    genericName: 'Amoxicillin',
    brand: 'Amoxil',
    category: 'Antibiotics',
    description: 'Penicillin-type antibiotic used to treat bacterial infections',
    dosage: '500mg every 8 hours for 7-10 days',
    form: 'capsule',
    strength: '500mg',
    price: 22.75,
    stock: 120,
    requiresPrescription: true,
    sideEffects: ['Diarrhea', 'Nausea', 'Vomiting', 'Rash'],
    contraindications: ['Penicillin allergy', 'Mononucleosis'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop',
    isAvailable: true,
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    isActive: true
  },
  {
    id: 'medicine-005',
    name: 'Lipitor',
    genericName: 'Atorvastatin',
    brand: 'Lipitor',
    category: 'Cholesterol',
    description: 'Statin medication used to lower cholesterol and triglycerides',
    dosage: '10mg once daily in the evening',
    form: 'tablet',
    strength: '10mg',
    price: 45.99,
    stock: 80,
    requiresPrescription: true,
    sideEffects: ['Muscle pain', 'Joint pain', 'Diarrhea', 'Upset stomach'],
    contraindications: ['Liver disease', 'Pregnancy', 'Breastfeeding'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop',
    isAvailable: true,
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    isActive: true
  },
  {
    id: 'medicine-006',
    name: 'Vitamin D3',
    genericName: 'Cholecalciferol',
    brand: 'Nature Made',
    category: 'Vitamins',
    description: 'Vitamin D supplement for bone health and immune support',
    dosage: '1000 IU daily with food',
    form: 'tablet',
    strength: '1000 IU',
    price: 15.99,
    stock: 250,
    requiresPrescription: false,
    sideEffects: ['Nausea', 'Constipation', 'Loss of appetite'],
    contraindications: ['High calcium levels', 'Kidney disease'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop',
    isAvailable: true,
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    isActive: true
  },
  {
    id: 'medicine-007',
    name: 'Zyrtec',
    genericName: 'Cetirizine',
    brand: 'Zyrtec',
    category: 'Allergy',
    description: 'Antihistamine for allergy relief',
    dosage: '10mg once daily',
    form: 'tablet',
    strength: '10mg',
    price: 19.99,
    stock: 180,
    requiresPrescription: false,
    sideEffects: ['Drowsiness', 'Dry mouth', 'Fatigue', 'Dizziness'],
    contraindications: ['Kidney disease'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop',
    isAvailable: true,
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    isActive: true
  },
  {
    id: 'medicine-008',
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    brand: 'Prilosec',
    category: 'Gastrointestinal',
    description: 'Proton pump inhibitor for acid reflux and heartburn',
    dosage: '20mg once daily before breakfast',
    form: 'capsule',
    strength: '20mg',
    price: 28.50,
    stock: 90,
    requiresPrescription: false,
    sideEffects: ['Headache', 'Stomach pain', 'Diarrhea', 'Nausea'],
    contraindications: ['Liver disease', 'Osteoporosis'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop',
    isAvailable: true,
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    isActive: true
  }
]

// Helper functions for medicine data manipulation
export const getAvailableMedicines = () => sampleMedicines.filter(medicine => medicine.isAvailable && medicine.isActive)

export const getPrescriptionMedicines = () => sampleMedicines.filter(medicine => medicine.requiresPrescription)

export const getOverTheCounterMedicines = () => sampleMedicines.filter(medicine => !medicine.requiresPrescription)

export const getMedicinesByCategory = (category: string) => 
  sampleMedicines.filter(medicine => medicine.category.toLowerCase() === category.toLowerCase())

export const searchMedicines = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return sampleMedicines.filter(medicine => 
    medicine.name.toLowerCase().includes(lowercaseQuery) ||
    medicine.genericName.toLowerCase().includes(lowercaseQuery) ||
    medicine.brand.toLowerCase().includes(lowercaseQuery) ||
    medicine.category.toLowerCase().includes(lowercaseQuery) ||
    medicine.description.toLowerCase().includes(lowercaseQuery)
  )
}

export const getMedicineById = (id: string) => 
  sampleMedicines.find(medicine => medicine.id === id)

export const getLowStockMedicines = (threshold: number = 50) => 
  sampleMedicines.filter(medicine => medicine.stock <= threshold)

export const getMedicinesByPriceRange = (minPrice: number, maxPrice: number) => 
  sampleMedicines.filter(medicine => medicine.price >= minPrice && medicine.price <= maxPrice)