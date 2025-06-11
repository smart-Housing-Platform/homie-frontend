'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { propertyService } from '@/services/property.service';
import { Property, Application, MaintenanceRequest } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import { toast } from 'react-hot-toast';
import PropertyCard from '@/components/PropertyCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Building2, DollarSign, Users, Activity } from 'lucide-react';

// Mock data (in production, this would come from an API)
const mockProperties: Property[] = [
  {
    _id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Luxurious apartment in prime location',
    listingType: 'rent',
    price: {
      amount: 2500,
      frequency: 'monthly',
      type: 'fixed'
    },
    location: {
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1200,
      propertyType: 'Apartment',
      parking: 1,
      furnished: true
    },
    amenities: ['Central AC', 'In-unit Laundry'],
    images: [{ url: '/images/apartment1.jpg', publicId: 'apt1' }],
    landlordId: 'user1',
    status: 'available',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    title: 'Luxury Waterfront Home',
    description: 'Beautiful waterfront property',
    listingType: 'sale',
    price: {
      amount: 750000,
      type: 'negotiable'
    },
    location: {
      address: '456 Ocean Dr',
      city: 'Miami',
      state: 'FL',
      zipCode: '33139'
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2800,
      propertyType: 'House',
      parking: 2,
      furnished: false
    },
    amenities: ['Pool', 'Ocean View'],
    images: [{ url: '/images/house1.jpg', publicId: 'house1' }],
    landlordId: 'user2',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockStats = {
  totalProperties: 12,
  activeListings: 8,
  totalIncome: 25000,
  occupancyRate: 85
};

export default function LandlordDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [properties, setProperties] = useState<Property[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    propertyId: string | null;
    propertyTitle: string;
  }>({
    isOpen: false,
    propertyId: null,
    propertyTitle: ''
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const data = await propertyService.getProperties();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to fetch properties');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (propertyId: string, propertyTitle: string) => {
    setDeleteModal({
      isOpen: true,
      propertyId,
      propertyTitle
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.propertyId) return;

    try {
      await propertyService.deleteProperty(deleteModal.propertyId);
      toast.success('Property deleted successfully');
      fetchProperties(); // Refresh the list
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
    }
  };

  return (
    <ProtectedRoute allowedRoles={['landlord']}>
      <div className="container mx-auto px-4 py-8 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#7B341E]">Landlord Dashboard</h1>
          <Link href="/properties/create">
            <Button className="bg-[#7B341E] text-white hover:bg-[#266044]">
              Add New Property
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <Card className="lg:col-span-1 h-fit sticky top-8">
            <div className="p-6 space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-[#FFE4C9] text-[#7B341E] font-medium'
                    : 'text-[#7B341E]/70 hover:bg-[#FFE4C9]/50 hover:text-[#7B341E]'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('properties')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'properties'
                    ? 'bg-[#FFE4C9] text-[#7B341E] font-medium'
                    : 'text-[#7B341E]/70 hover:bg-[#FFE4C9]/50 hover:text-[#7B341E]'
                }`}
              >
                My Properties
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'applications'
                    ? 'bg-[#FFE4C9] text-[#7B341E] font-medium'
                    : 'text-[#7B341E]/70 hover:bg-[#FFE4C9]/50 hover:text-[#7B341E]'
                }`}
              >
                Applications
              </button>
              <button
                onClick={() => setActiveTab('income')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'income'
                    ? 'bg-[#FFE4C9] text-[#7B341E] font-medium'
                    : 'text-[#7B341E]/70 hover:bg-[#FFE4C9]/50 hover:text-[#7B341E]'
                }`}
              >
                Income
              </button>
            </div>
          </Card>

        {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium text-[#7B341E]">Total Properties</CardTitle>
                      <Building2 className="w-4 h-4 text-[#7B341E]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#7B341E]">{mockStats.totalProperties}</div>
                      <p className="text-xs text-[#7B341E]/70">
                        {mockStats.activeListings} active listings
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium text-[#7B341E]">Total Income</CardTitle>
                      <DollarSign className="w-4 h-4 text-[#7B341E]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#7B341E]">
                        ${mockStats.totalIncome.toLocaleString()}
                          </div>
                      <p className="text-xs text-[#7B341E]/70">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium text-[#7B341E]">Occupancy Rate</CardTitle>
                      <Users className="w-4 h-4 text-[#7B341E]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#7B341E]">{mockStats.occupancyRate}%</div>
                      <p className="text-xs text-[#7B341E]/70">12 occupied units</p>
                    </CardContent>
                  </Card>
                          </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-[#7B341E]">Recent Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Add recent applications list here */}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-[#7B341E]">Income Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Add income chart here */}
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {activeTab === 'properties' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mockProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                    ))}
                  </div>
                )}

                {activeTab === 'applications' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#7B341E]">Property Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#FFE4C9]">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Property</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Applicant</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Date</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Status</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#7B341E]/10">
                        {/* Add application rows here */}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'income' && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#7B341E]">Income Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Add income charts and stats here */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#7B341E]">Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Add transactions table here */}
                  </CardContent>
                </Card>
                  </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, propertyId: null, propertyTitle: '' })}
        onConfirm={handleDeleteConfirm}
        title="Delete Property"
        message={`Are you sure you want to delete "${deleteModal.propertyTitle}"? This action cannot be undone.`}
        confirmText="Delete Property"
        cancelText="Cancel"
        type="danger"
      />
    </ProtectedRoute>
  );
} 