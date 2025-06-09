'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { mockProperties, mockApplications, mockMaintenanceRequests, type Property, type Application, type MaintenanceRequest } from '@/data/mockData';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function LandlordDashboard() {
  const [activeTab, setActiveTab] = useState('properties');

  // Filter properties for current landlord (using mock landlordId '1')
  const myProperties = mockProperties.filter((p: Property) => p.landlordId === '1');
  const applications = mockApplications.filter((a: Application) => 
    myProperties.some((p: Property) => p.id === a.propertyId)
  );
  const maintenanceRequests = mockMaintenanceRequests.filter((r: MaintenanceRequest) =>
    myProperties.some((p: Property) => p.id === r.propertyId)
  );

  return (
    <ProtectedRoute allowedRoles={['landlord']}>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r-2 border-[#7B341E]/20 min-h-screen">
          <nav className="mt-8 px-4">
            <div className="space-y-2">
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'properties'
                    ? 'bg-[#FFE4C9] text-[#7B341E] font-medium'
                    : 'text-[#7B341E]/70 hover:bg-[#FFE4C9]/50 hover:text-[#7B341E]'
                }`}
                onClick={() => setActiveTab('properties')}
              >
                My Properties
              </button>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'applications'
                    ? 'bg-[#FFE4C9] text-[#7B341E] font-medium'
                    : 'text-[#7B341E]/70 hover:bg-[#FFE4C9]/50 hover:text-[#7B341E]'
                }`}
                onClick={() => setActiveTab('applications')}
              >
                Applications
              </button>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'maintenance'
                    ? 'bg-[#FFE4C9] text-[#7B341E] font-medium'
                    : 'text-[#7B341E]/70 hover:bg-[#FFE4C9]/50 hover:text-[#7B341E]'
                }`}
                onClick={() => setActiveTab('maintenance')}
              >
                Maintenance Requests
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-white border-b-2 border-[#7B341E]/20 px-8 py-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#7B341E]">
              {activeTab === 'properties' && 'My Properties'}
              {activeTab === 'applications' && 'Rental Applications'}
              {activeTab === 'maintenance' && 'Maintenance Requests'}
            </h1>
            {activeTab === 'properties' && (
              <Link href="/properties/create">
                <Button className="bg-[#7B341E] hover:bg-[#266044] text-white transition-colors">
                  Add New Property
                </Button>
              </Link>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            {activeTab === 'properties' && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {myProperties.map((property: Property) => (
                  <div key={property.id} className="bg-white rounded-xl border-2 border-[#7B341E]/20 shadow-sm overflow-hidden transition-all duration-200 hover:border-[#7B341E] hover:shadow-md">
                    <div className="aspect-w-16 aspect-h-9 relative">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-[#7B341E] text-white px-3 py-1 rounded-full text-sm font-medium">
                        {property.status}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-[#7B341E]">
                        {property.title}
                      </h3>
                      <p className="mt-1 text-[#7B341E]/70">{property.location.city}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-xl font-bold text-[#266044]">
                          ${property.price}/mo
                        </p>
                        <div className="flex items-center space-x-4 text-[#7B341E]/70">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            {property.features.bedrooms} bd
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 2a1 1 0 011-1h8a1 1 0 011 1v3h3a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V6a1 1 0 011-1h3V2zm10 6H5v8h10V8zm-2-5H7v3h6V3z" clipRule="evenodd" />
                            </svg>
                            {property.features.bathrooms} ba
                          </span>
                        </div>
                      </div>
                      <div className="mt-6 flex space-x-4">
                        <Link href={`/properties/${property.id}/edit`} className="flex-1">
                          <Button 
                            variant="outline"
                            className="w-full border-2 border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E] hover:text-white"
                          >
                            Edit
                          </Button>
                        </Link>
                        <Button 
                          variant="outline"
                          className="flex-1 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="space-y-6">
                {applications.map((application: Application) => {
                  const property = myProperties.find((p: Property) => p.id === application.propertyId);
                  return (
                    <div key={application.id} className="bg-white rounded-xl border-2 border-[#7B341E]/20 shadow-sm p-6 transition-all duration-200 hover:border-[#7B341E]">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-[#7B341E]">
                            {property?.title}
                          </h3>
                          <p className="text-[#7B341E]/70 mt-1">
                            Application received on {new Date(application.createdAt).toLocaleDateString()}
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
                        <div className="flex flex-col items-end space-y-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            application.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : application.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                          {application.status === 'pending' && (
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
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'maintenance' && (
              <div className="space-y-6">
                {maintenanceRequests.map((request: MaintenanceRequest) => {
                  const property = myProperties.find((p: Property) => p.id === request.propertyId);
                  return (
                    <div key={request.id} className="bg-white rounded-xl border-2 border-[#7B341E]/20 shadow-sm p-6 transition-all duration-200 hover:border-[#7B341E]">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-[#7B341E]">
                            {request.title}
                          </h3>
                          <p className="text-[#7B341E]/70 mt-1">
                            {property?.title}
                          </p>
                          <p className="text-[#7B341E]/70 mt-2">
                            {request.description}
                          </p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            request.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : request.status === 'in_progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {request.status.split('_').map((word: string) => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            request.priority === 'high'
                              ? 'bg-red-100 text-red-800'
                              : request.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
                          </span>
                          {request.status !== 'completed' && (
                            <div className="mt-4">
                              <Button 
                                className="bg-[#266044] hover:bg-[#4DC68C] text-white transition-colors px-4 py-2"
                              >
                                {request.status === 'pending' ? 'Start Work' : 'Mark Complete'}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 