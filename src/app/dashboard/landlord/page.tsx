'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { propertyService } from '@/services/property.service';
import { dashboardService } from '@/services/dashboard.service';
import { Property, Application, MaintenanceRequest, User } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import { toast } from 'react-hot-toast';
import PropertyCard from '@/components/PropertyCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Building2, DollarSign, Users, Activity } from 'lucide-react';

export default function LandlordDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    totalIncome: 0,
    occupancyRate: 0,
    totalApplications: 0,
    pendingApplications: 0
  });
  const [properties, setProperties] = useState<Property[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [income, setIncome] = useState<{
    monthly: Array<{
      month: string;
      amount: number;
      transactions: number;
    }>;
    yearly: Array<{
      year: string;
      amount: number;
      transactions: number;
    }>;
    transactions: Array<{
      _id: string;
      date: Date;
      property: Property;
      tenant: User;
      type: string;
      amount: number;
    }>;
  }>({
    monthly: [],
    yearly: [],
    transactions: []
  });
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
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsData, propertiesData, applicationsData, incomeData] = await Promise.all([
        dashboardService.getLandlordStats(),
        dashboardService.getLandlordProperties(),
        dashboardService.getLandlordApplications(),
        dashboardService.getLandlordIncome()
      ]);

      setStats(statsData);
      setProperties(propertiesData);
      setApplications(applicationsData);
      setIncome(incomeData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
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
      console.log('Attempting to delete property:', {
        propertyId: deleteModal.propertyId,
        token: localStorage.getItem('token')
      });
      
      await propertyService.deleteProperty(deleteModal.propertyId);
      toast.success('Property deleted successfully');
      fetchDashboardData(); // Refresh the data
      setDeleteModal({ isOpen: false, propertyId: null, propertyTitle: '' });
    } catch (error: any) {
      console.error('Error deleting property:', {
        status: error.response?.status,
        message: error.response?.data?.message,
        error
      });
      toast.error(error.response?.data?.message || 'Failed to delete property');
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
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7B341E]"></div>
              </div>
            ) : (
              <>
                {activeTab === 'overview' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                          <CardTitle className="text-sm font-medium text-[#7B341E]">Total Properties</CardTitle>
                          <Building2 className="w-4 h-4 text-[#7B341E]" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-[#7B341E]">{stats.totalProperties}</div>
                          <p className="text-xs text-[#7B341E]/70">
                            {stats.activeListings} active listings
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
                            ${stats.totalIncome.toLocaleString()}
                          </div>
                          <p className="text-xs text-[#7B341E]/70">This month</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                          <CardTitle className="text-sm font-medium text-[#7B341E]">Occupancy Rate</CardTitle>
                          <Users className="w-4 h-4 text-[#7B341E]" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-[#7B341E]">{stats.occupancyRate}%</div>
                          <p className="text-xs text-[#7B341E]/70">
                            {properties.filter(p => p.status === 'rented').length} occupied units
                          </p>
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
                            {applications.slice(0, 5).map((application) => (
                              <div
                                key={application._id}
                                className="flex items-center justify-between p-4 bg-[#FFE4C9]/20 rounded-lg"
                              >
                                <div>
                                  <h4 className="font-medium text-[#7B341E]">{application.property.title}</h4>
                                  <p className="text-sm text-[#7B341E]/70">
                                    By {application.tenant.name} on {new Date(application.createdAt).toLocaleDateString()}
                                  </p>
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
                          <CardTitle className="text-[#7B341E]">Income Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {income.monthly.slice(0, 5).map((month) => (
                              <div
                                key={month.month}
                                className="flex items-center justify-between p-4 bg-[#FFE4C9]/20 rounded-lg"
                              >
                                <div>
                                  <h4 className="font-medium text-[#7B341E]">{month.month}</h4>
                                  <p className="text-sm text-[#7B341E]/70">{month.transactions} transactions</p>
                                </div>
                                <span className="font-medium text-[#7B341E]">
                                  ${month.amount.toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}

                {activeTab === 'properties' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {properties.length === 0 ? (
                      <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center">
                        <Building2 className="w-16 h-16 text-[#7B341E]/30 mb-4" />
                        <h3 className="text-xl font-semibold text-[#7B341E] mb-2">No Properties Listed</h3>
                        <p className="text-[#7B341E]/70 mb-6">Start building your real estate portfolio by adding your first property.</p>
                        <Link href="/properties/create">
                          <Button className="bg-[#7B341E] text-white hover:bg-[#266044]">
                            Add New Property
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      properties.map((property) => (
                        <PropertyCard
                          key={property._id}
                          property={property}
                          isLandlord={true}
                          onDelete={handleDeleteClick}
                        />
                      ))
                    )}
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
                            {applications.map((application) => (
                              <tr key={application._id}>
                                <td className="px-6 py-4 text-sm text-[#7B341E]">{application.property.title}</td>
                                <td className="px-6 py-4 text-sm text-[#7B341E]">{application.tenant.name}</td>
                                <td className="px-6 py-4 text-sm text-[#7B341E]">
                                  {new Date(application.createdAt).toLocaleDateString()}
                                </td>
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
                                  <Link href={`/applications/${application._id}`}>
                                    <Button variant="outline" size="sm" className="border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E] hover:text-white">
                                      View Details
                                    </Button>
                                  </Link>
                                </td>
                              </tr>
                            ))}
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
                        <div className="space-y-4">
                          {income.monthly.map((month) => (
                            <div
                              key={month.month}
                              className="flex items-center justify-between p-4 bg-[#FFE4C9]/20 rounded-lg"
                            >
                              <div>
                                <h4 className="font-medium text-[#7B341E]">{month.month}</h4>
                                <p className="text-sm text-[#7B341E]/70">{month.transactions} transactions</p>
                              </div>
                              <span className="font-medium text-[#7B341E]">
                                ${month.amount.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
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
                                <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Date</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Property</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Tenant</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Type</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Amount</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#7B341E]/10">
                              {income.transactions.map((transaction) => (
                                <tr key={transaction._id}>
                                  <td className="px-6 py-4 text-sm text-[#7B341E]">
                                    {new Date(transaction.date).toLocaleDateString()}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-[#7B341E]">{transaction.property.title}</td>
                                  <td className="px-6 py-4 text-sm text-[#7B341E]">{transaction.tenant.name}</td>
                                  <td className="px-6 py-4 text-sm text-[#7B341E]">{transaction.type}</td>
                                  <td className="px-6 py-4 text-sm text-[#7B341E]">
                                    ${transaction.amount.toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </>
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