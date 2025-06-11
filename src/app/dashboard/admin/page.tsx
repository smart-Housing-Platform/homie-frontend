'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Property } from '@/types';
import PropertyCard from '@/components/PropertyCard';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Building2, DollarSign, Users, Activity } from 'lucide-react';
import { mockUsers, mockProperties, mockApplications, type User, type Application } from '@/data/mockData';
import ProtectedRoute from '@/components/ProtectedRoute';

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
    status: 'pending',
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
  totalUsers: 150,
  newUsersThisMonth: 25,
  totalProperties: 85,
  pendingApprovals: 12,
  totalTransactions: 45,
  revenue: 25000
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Filter unverified users
  const unverifiedUsers = mockUsers.filter((user: User) => !user.verified);
  const pendingProperties = mockProperties.filter((p: Property) => p.status === 'pending');
  const recentApplications = mockApplications.slice(0, 5);

  // Mock analytics data
  const analytics = {
    totalUsers: mockUsers.length,
    totalProperties: mockProperties.length,
    totalApplications: mockApplications.length,
    occupancyRate: '85%',
    averageRent: '$2,500',
    activeLeases: '156',
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto px-4 py-8 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#7B341E]">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link href="/users/create">
              <Button variant="outline" className="border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E] hover:text-white">
                Add User
              </Button>
            </Link>
            <Link href="/settings">
              <Button className="bg-[#7B341E] text-white hover:bg-[#266044]">
                Settings
              </Button>
            </Link>
          </div>
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
                Properties
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'users'
                    ? 'bg-[#FFE4C9] text-[#7B341E] font-medium'
                    : 'text-[#7B341E]/70 hover:bg-[#FFE4C9]/50 hover:text-[#7B341E]'
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'transactions'
                    ? 'bg-[#FFE4C9] text-[#7B341E] font-medium'
                    : 'text-[#7B341E]/70 hover:bg-[#FFE4C9]/50 hover:text-[#7B341E]'
                }`}
              >
                Transactions
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
                      <CardTitle className="text-sm font-medium text-[#7B341E]">Total Users</CardTitle>
                      <Users className="w-4 h-4 text-[#7B341E]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#7B341E]">{mockStats.totalUsers}</div>
                      <p className="text-xs text-[#7B341E]/70">
                        +{mockStats.newUsersThisMonth} this month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium text-[#7B341E]">Total Properties</CardTitle>
                      <Building2 className="w-4 h-4 text-[#7B341E]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#7B341E]">{mockStats.totalProperties}</div>
                      <p className="text-xs text-[#7B341E]/70">
                        {mockStats.pendingApprovals} pending approvals
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium text-[#7B341E]">Total Revenue</CardTitle>
                      <DollarSign className="w-4 h-4 text-[#7B341E]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#7B341E]">
                        ${mockStats.revenue.toLocaleString()}
          </div>
                      <p className="text-xs text-[#7B341E]/70">
                        {mockStats.totalTransactions} transactions
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium text-[#7B341E]">Activity</CardTitle>
                      <Activity className="w-4 h-4 text-[#7B341E]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#7B341E]">85%</div>
                      <p className="text-xs text-[#7B341E]/70">+2% from last month</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-[#7B341E]">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Add recent activity list here */}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-[#7B341E]">Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Add revenue chart here */}
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {activeTab === 'properties' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#7B341E]">Pending Property Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {mockProperties.map((property) => (
                      <PropertyCard key={property._id} property={property} />
                  ))}
                </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'users' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#7B341E]">User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#FFE4C9]">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Name</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Email</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Role</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Status</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#7B341E]/10">
                        {/* Add user rows here */}
                      </tbody>
                    </table>
              </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'transactions' && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#7B341E]">Transaction Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Add transaction charts here */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#7B341E]">Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-[#FFE4C9]">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">ID</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Date</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Type</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Amount</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#7B341E]/10">
                          {/* Add transaction rows here */}
                        </tbody>
                      </table>
                </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 