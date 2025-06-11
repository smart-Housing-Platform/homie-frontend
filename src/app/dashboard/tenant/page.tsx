'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Property } from '@/types';
import PropertyCard from '@/components/PropertyCard';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Home, Heart, FileText, Bell } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

// Mock data (in production, this would come from an API)
const mockSavedProperties: Property[] = [
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
    status: 'available',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockApplications = [
  {
    id: '1',
    property: 'Modern Downtown Apartment',
    status: 'pending',
    submittedDate: '2024-02-15',
    landlord: 'John Doe'
  },
  {
    id: '2',
    property: 'Luxury Waterfront Home',
    status: 'approved',
    submittedDate: '2024-02-10',
    landlord: 'Jane Smith'
  }
];

export default function TenantDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <ProtectedRoute allowedRoles={['tenant']}>
      <div className="container mx-auto px-4 py-8 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#7B341E]">Tenant Dashboard</h1>
          <Link href="/properties">
            <Button className="bg-[#7B341E] text-white hover:bg-[#266044]">
              Browse Properties
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
                onClick={() => setActiveTab('saved')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'saved'
                    ? 'bg-[#FFE4C9] text-[#7B341E] font-medium'
                    : 'text-[#7B341E]/70 hover:bg-[#FFE4C9]/50 hover:text-[#7B341E]'
                }`}
              >
                Saved Properties
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'applications'
                    ? 'bg-[#FFE4C9] text-[#7B341E] font-medium'
                    : 'text-[#7B341E]/70 hover:bg-[#FFE4C9]/50 hover:text-[#7B341E]'
                }`}
              >
                My Applications
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'notifications'
                    ? 'bg-[#FFE4C9] text-[#7B341E] font-medium'
                    : 'text-[#7B341E]/70 hover:bg-[#FFE4C9]/50 hover:text-[#7B341E]'
                }`}
              >
                Notifications
              </button>
            </div>
          </Card>

        {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium text-[#7B341E]">Saved Properties</CardTitle>
                      <Heart className="w-4 h-4 text-[#7B341E]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#7B341E]">{mockSavedProperties.length}</div>
                      <p className="text-xs text-[#7B341E]/70">
                        {mockSavedProperties.filter(p => p.status === 'available').length} available
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium text-[#7B341E]">Active Applications</CardTitle>
                      <FileText className="w-4 h-4 text-[#7B341E]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#7B341E]">
                        {mockApplications.filter(a => a.status === 'pending').length}
                      </div>
                      <p className="text-xs text-[#7B341E]/70">2 this week</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium text-[#7B341E]">Property Views</CardTitle>
                      <Home className="w-4 h-4 text-[#7B341E]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#7B341E]">24</div>
                      <p className="text-xs text-[#7B341E]/70">Last 30 days</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium text-[#7B341E]">New Notifications</CardTitle>
                      <Bell className="w-4 h-4 text-[#7B341E]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#7B341E]">3</div>
                      <p className="text-xs text-[#7B341E]/70">1 unread message</p>
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
                        {mockApplications.map((application) => (
                          <div
                            key={application.id}
                            className="flex items-center justify-between p-4 bg-[#FFE4C9]/20 rounded-lg"
                          >
                            <div>
                              <h4 className="font-medium text-[#7B341E]">{application.property}</h4>
                              <p className="text-sm text-[#7B341E]/70">Submitted on {application.submittedDate}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              application.status === 'approved' 
                                ? 'bg-[#266044] text-white' 
                                : 'bg-[#FFE4C9] text-[#7B341E]'
                            }`}>
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </span>
                          </div>
                        ))}
                        </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-[#7B341E]">Property Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Add property recommendations here */}
                      </div>
                    </CardContent>
                  </Card>
                    </div>
              </>
            )}

            {activeTab === 'saved' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mockSavedProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}

            {activeTab === 'applications' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#7B341E]">My Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#FFE4C9]">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Property</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Landlord</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Submitted</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Status</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#7B341E]/10">
                        {mockApplications.map((application) => (
                          <tr key={application.id}>
                            <td className="px-6 py-4 text-sm text-[#7B341E]">{application.property}</td>
                            <td className="px-6 py-4 text-sm text-[#7B341E]">{application.landlord}</td>
                            <td className="px-6 py-4 text-sm text-[#7B341E]">{application.submittedDate}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            application.status === 'approved'
                                  ? 'bg-[#266044] text-white' 
                                  : 'bg-[#FFE4C9] text-[#7B341E]'
                          }`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                            </td>
                            <td className="px-6 py-4">
                              <Button variant="outline" size="sm" className="border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E] hover:text-white">
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                        </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#7B341E]">Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Add notifications list here */}
                        </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 