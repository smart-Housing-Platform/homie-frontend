// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'tenant' | 'landlord' | 'admin';
  profilePicture?: string;
  phone?: string;
  verified: boolean;
  createdAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    propertyType: string;
    yearBuilt: number;
  };
  amenities: string[];
  images: string[];
  landlordId: string;
  status: 'available' | 'rented' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  propertyId: string;
  tenantId: string;
  status: 'pending' | 'approved' | 'rejected';
  creditScore?: number;
  income?: number;
  documents?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  tenantId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Lease {
  id: string;
  propertyId: string;
  tenantId: string;
  landlordId: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  securityDeposit: number;
  status: 'draft' | 'pending' | 'active' | 'terminated';
  documents: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  leaseId: string;
  amount: number;
  type: 'rent' | 'deposit' | 'fee';
  status: 'pending' | 'completed' | 'failed';
  dueDate: string;
  paidDate?: string;
  createdAt: string;
}

// Mock Data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'landlord',
    profilePicture: 'https://i.pravatar.cc/150?img=1',
    phone: '(555) 123-4567',
    verified: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'tenant',
    profilePicture: 'https://i.pravatar.cc/150?img=2',
    phone: '(555) 234-5678',
    verified: true,
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    profilePicture: 'https://i.pravatar.cc/150?img=3',
    verified: true,
    createdAt: '2024-01-03T00:00:00Z',
  },
  {
    id: '4',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'landlord',
    phone: '(555) 345-6789',
    verified: false,
    createdAt: '2024-01-04T00:00:00Z',
  },
];

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Beautiful modern apartment in the heart of downtown. Recently renovated with high-end finishes and appliances.',
    price: 2500,
    location: {
      address: '123 Main Street',
      city: 'Downtown',
      state: 'NY',
      zipCode: '10001',
      coordinates: {
        lat: 40.7128,
        lng: -74.0060,
      },
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1200,
      propertyType: 'Apartment',
      yearBuilt: 2015,
    },
    amenities: [
      'Central Air',
      'In-unit Laundry',
      'Dishwasher',
      'Hardwood Floors',
      'Parking',
      'Gym',
      'Pet Friendly',
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop',
    ],
    landlordId: '1',
    status: 'available',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Luxury Waterfront Condo',
    description: 'Stunning waterfront condo with panoramic views. Features high ceilings, gourmet kitchen, and private balcony.',
    price: 3500,
    location: {
      address: '456 Ocean Drive',
      city: 'Beachside',
      state: 'FL',
      zipCode: '33139',
      coordinates: {
        lat: 25.7617,
        lng: -80.1918,
      },
    },
    features: {
      bedrooms: 3,
      bathrooms: 2.5,
      squareFeet: 1800,
      propertyType: 'Condo',
      yearBuilt: 2018,
    },
    amenities: [
      'Ocean View',
      'Pool',
      'Fitness Center',
      'Concierge',
      'Valet Parking',
      'Smart Home Features',
      'Wine Cellar',
    ],
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&h=800&fit=crop',
    ],
    landlordId: '1',
    status: 'pending',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

export const mockApplications: Application[] = [
  {
    id: '1',
    propertyId: '1',
    tenantId: '2',
    status: 'pending',
    creditScore: 750,
    income: 75000,
    documents: ['resume.pdf', 'credit_report.pdf'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    propertyId: '2',
    tenantId: '2',
    status: 'approved',
    creditScore: 780,
    income: 85000,
    documents: ['resume.pdf', 'credit_report.pdf', 'bank_statements.pdf'],
    createdAt: '2024-01-16T00:00:00Z',
    updatedAt: '2024-01-17T00:00:00Z',
  },
];

export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: '1',
    propertyId: '1',
    tenantId: '2',
    title: 'Leaking Faucet',
    description: 'The kitchen faucet has been leaking for the past few days.',
    priority: 'medium',
    status: 'pending',
    images: ['leak1.jpg', 'leak2.jpg'],
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
  {
    id: '2',
    propertyId: '2',
    tenantId: '2',
    title: 'AC Not Working',
    description: 'The air conditioning unit is not cooling properly.',
    priority: 'high',
    status: 'in_progress',
    images: ['ac_unit.jpg'],
    createdAt: '2024-01-21T00:00:00Z',
    updatedAt: '2024-01-22T00:00:00Z',
  },
];

export const mockLeases: Lease[] = [
  {
    id: '1',
    propertyId: '1',
    tenantId: '2',
    landlordId: '1',
    startDate: '2024-02-01T00:00:00Z',
    endDate: '2025-01-31T00:00:00Z',
    monthlyRent: 2500,
    securityDeposit: 2500,
    status: 'active',
    documents: ['lease_agreement.pdf'],
    createdAt: '2024-01-25T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z',
  },
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    leaseId: '1',
    amount: 2500,
    type: 'rent',
    status: 'completed',
    dueDate: '2024-02-01T00:00:00Z',
    paidDate: '2024-01-28T00:00:00Z',
    createdAt: '2024-01-28T00:00:00Z',
  },
  {
    id: '2',
    leaseId: '1',
    amount: 2500,
    type: 'deposit',
    status: 'completed',
    dueDate: '2024-01-25T00:00:00Z',
    paidDate: '2024-01-25T00:00:00Z',
    createdAt: '2024-01-25T00:00:00Z',
  },
]; 