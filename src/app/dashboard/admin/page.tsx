'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { mockUsers, mockProperties, mockApplications, type User, type Property, type Application } from '@/data/mockData';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');

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
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r-2 border-[#7B341E]/20 min-h-screen">
          <nav className="mt-8 px-4">
            <div className="space-y-2">
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'users'
                    ? 'bg-[#FFE4C9] text-[#7B341E] font-medium'
                    : 'text-[#7B341E]/70 hover:bg-[#FFE4C9]/50 hover:text-[#7B341E]'
                }`}
                onClick={() => setActiveTab('users')}
              >
                User Verification
              </button>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'properties'
                    ? 'bg-[#FFE4C9] text-[#7B341E] font-medium'
                    : 'text-[#7B341E]/70 hover:bg-[#FFE4C9]/50 hover:text-[#7B341E]'
                }`}
                onClick={() => setActiveTab('properties')}
              >
                Property Approval
              </button>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'applications'
                    ? 'bg-[#FFE4C9] text-[#7B341E] font-medium'
                    : 'text-[#7B341E]/70 hover:bg-[#FFE4C9]/50 hover:text-[#7B341E]'
                }`}
                onClick={() => setActiveTab('applications')}
              >
                Recent Applications
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-white border-b-2 border-[#7B341E]/20 px-8 py-6">
            <h1 className="text-2xl font-bold text-[#7B341E]">
              {activeTab === 'users' && 'User Verification'}
              {activeTab === 'properties' && 'Property Approval'}
              {activeTab === 'applications' && 'Recent Applications'}
            </h1>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-xl border-2 border-[#7B341E]/20 shadow-sm p-6 transition-all duration-200 hover:border-[#7B341E]">
                <h3 className="text-lg font-medium text-[#7B341E]">Total Users</h3>
                <p className="mt-2 text-3xl font-bold text-[#266044]">{analytics.totalUsers}</p>
              </div>
              <div className="bg-white rounded-xl border-2 border-[#7B341E]/20 shadow-sm p-6 transition-all duration-200 hover:border-[#7B341E]">
                <h3 className="text-lg font-medium text-[#7B341E]">Total Properties</h3>
                <p className="mt-2 text-3xl font-bold text-[#266044]">{analytics.totalProperties}</p>
              </div>
              <div className="bg-white rounded-xl border-2 border-[#7B341E]/20 shadow-sm p-6 transition-all duration-200 hover:border-[#7B341E]">
                <h3 className="text-lg font-medium text-[#7B341E]">Total Applications</h3>
                <p className="mt-2 text-3xl font-bold text-[#266044]">{analytics.totalApplications}</p>
              </div>
              <div className="bg-white rounded-xl border-2 border-[#7B341E]/20 shadow-sm p-6 transition-all duration-200 hover:border-[#7B341E]">
                <h3 className="text-lg font-medium text-[#7B341E]">Occupancy Rate</h3>
                <p className="mt-2 text-3xl font-bold text-[#266044]">{analytics.occupancyRate}</p>
              </div>
              <div className="bg-white rounded-xl border-2 border-[#7B341E]/20 shadow-sm p-6 transition-all duration-200 hover:border-[#7B341E]">
                <h3 className="text-lg font-medium text-[#7B341E]">Average Rent</h3>
                <p className="mt-2 text-3xl font-bold text-[#266044]">{analytics.averageRent}</p>
              </div>
              <div className="bg-white rounded-xl border-2 border-[#7B341E]/20 shadow-sm p-6 transition-all duration-200 hover:border-[#7B341E]">
                <h3 className="text-lg font-medium text-[#7B341E]">Active Leases</h3>
                <p className="mt-2 text-3xl font-bold text-[#266044]">{analytics.activeLeases}</p>
              </div>
            </div>

            {activeTab === 'users' && (
              <div className="bg-white rounded-xl border-2 border-[#7B341E]/20 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b-2 border-[#7B341E]/20">
                  <h2 className="text-xl font-semibold text-[#7B341E]">Pending User Verifications</h2>
                </div>
                <div className="divide-y-2 divide-[#7B341E]/20">
                  {unverifiedUsers.map((user: User) => (
                    <div key={user.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-[#7B341E] flex items-center justify-center text-white text-xl font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-[#7B341E]">{user.name}</h3>
                          <p className="text-[#7B341E]/70">{user.email}</p>
                          <p className="text-[#7B341E]/70 text-sm">Role: {user.role}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          className="bg-[#266044] hover:bg-[#4DC68C] text-white transition-colors px-4 py-2"
                        >
                          Verify
                        </Button>
                        <Button 
                          variant="outline"
                          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2"
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'properties' && (
              <div className="bg-white rounded-xl border-2 border-[#7B341E]/20 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b-2 border-[#7B341E]/20">
                  <h2 className="text-xl font-semibold text-[#7B341E]">Pending Property Approvals</h2>
                </div>
                <div className="divide-y-2 divide-[#7B341E]/20">
                  {pendingProperties.map((property: Property) => (
                    <div key={property.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex space-x-4">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="text-lg font-medium text-[#7B341E]">{property.title}</h3>
                            <p className="text-[#7B341E]/70">{property.location.address}</p>
                            <p className="text-[#7B341E]/70">
                              {property.features.bedrooms} beds • {property.features.bathrooms} baths • {property.features.squareFeet} sqft
                            </p>
                            <p className="text-lg font-semibold text-[#266044] mt-2">${property.price}/mo</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            className="bg-[#266044] hover:bg-[#4DC68C] text-white transition-colors px-4 py-2"
                          >
                            Approve
                          </Button>
                          <Button 
                            variant="outline"
                            className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2"
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="bg-white rounded-xl border-2 border-[#7B341E]/20 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b-2 border-[#7B341E]/20">
                  <h2 className="text-xl font-semibold text-[#7B341E]">Recent Applications</h2>
                </div>
                <div className="divide-y-2 divide-[#7B341E]/20">
                  {recentApplications.map((application: Application) => {
                    const property = mockProperties.find((p: Property) => p.id === application.propertyId);
                    const tenant = mockUsers.find((u: User) => u.id === application.tenantId);
                    return (
                      <div key={application.id} className="p-6 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-[#7B341E]">{property?.title}</h3>
                            <p className="text-[#7B341E]/70">
                              Applicant: {tenant?.name}
                            </p>
                            <div className="mt-2">
                              <p className="text-[#7B341E]/70">
                                Credit Score: <span className="font-medium text-[#7B341E]">{application.creditScore}</span>
                              </p>
                              <p className="text-[#7B341E]/70">
                                Annual Income: <span className="font-medium text-[#7B341E]">${application.income?.toLocaleString()}</span>
                              </p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            application.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : application.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 