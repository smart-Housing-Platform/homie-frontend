'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Property } from '@/types';
import PropertyCard from '@/components/PropertyCard';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Building2, DollarSign, Users, Activity } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { dashboardService } from '@/services/dashboard.service';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsersThisMonth: 0,
    totalProperties: 0,
    pendingApprovals: 0,
    totalTransactions: 0,
    revenue: 0
  });
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsData, usersData, propertiesData, transactionsData] = await Promise.all([
        dashboardService.getAdminStats(),
        dashboardService.getAdminUsers(),
        dashboardService.getAdminProperties(),
        dashboardService.getAdminTransactions()
      ]);

      setStats(statsData);
      setUsers(usersData);
      setProperties(propertiesData);
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter unverified users and pending properties
  const unverifiedUsers = users.filter(user => !user.verified);
  const pendingProperties = properties.filter(p => p.status === 'pending');

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto px-4 py-8 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#7B341E]">Admin Dashboard</h1>
          <div className="space-x-4">
            <Link href="/users/create">
              <Button className="bg-[#7B341E] text-white hover:bg-[#266044]">
                Add User
              </Button>
            </Link>
            <Link href="/properties/create">
              <Button className="bg-[#7B341E] text-white hover:bg-[#266044]">
                Add Property
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
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7B341E]"></div>
              </div>
            ) : (
              <>
                {activeTab === 'overview' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                          <CardTitle className="text-sm font-medium text-[#7B341E]">Total Users</CardTitle>
                          <Users className="w-4 h-4 text-[#7B341E]" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-[#7B341E]">{stats.totalUsers}</div>
                          <p className="text-xs text-[#7B341E]/70">
                            +{stats.newUsersThisMonth} this month
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                          <CardTitle className="text-sm font-medium text-[#7B341E]">Properties</CardTitle>
                          <Building2 className="w-4 h-4 text-[#7B341E]" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-[#7B341E]">{stats.totalProperties}</div>
                          <p className="text-xs text-[#7B341E]/70">
                            {stats.pendingApprovals} pending approvals
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                          <CardTitle className="text-sm font-medium text-[#7B341E]">Transactions</CardTitle>
                          <Activity className="w-4 h-4 text-[#7B341E]" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-[#7B341E]">{stats.totalTransactions}</div>
                          <p className="text-xs text-[#7B341E]/70">This month</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                          <CardTitle className="text-sm font-medium text-[#7B341E]">Revenue</CardTitle>
                          <DollarSign className="w-4 h-4 text-[#7B341E]" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-[#7B341E]">
                            ${stats.revenue.toLocaleString()}
                          </div>
                          <p className="text-xs text-[#7B341E]/70">Total revenue</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-[#7B341E]">Unverified Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {unverifiedUsers.slice(0, 5).map((user) => (
                              <div
                                key={user.id}
                                className="flex items-center justify-between p-4 bg-[#FFE4C9]/20 rounded-lg"
                              >
                                <div>
                                  <h4 className="font-medium text-[#7B341E]">{user.name}</h4>
                                  <p className="text-sm text-[#7B341E]/70">{user.email}</p>
                                </div>
                                <Button variant="outline" size="sm" className="border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E] hover:text-white">
                                  Verify
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-[#7B341E]">Pending Properties</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {pendingProperties.slice(0, 5).map((property) => (
                              <div
                                key={property._id}
                                className="flex items-center justify-between p-4 bg-[#FFE4C9]/20 rounded-lg"
                              >
                                <div>
                                  <h4 className="font-medium text-[#7B341E]">{property.title}</h4>
                                  <p className="text-sm text-[#7B341E]/70">
                                    {property.location.city}, {property.location.state}
                                  </p>
                                </div>
                                <Button variant="outline" size="sm" className="border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E] hover:text-white">
                                  Review
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}

                {activeTab === 'users' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-[#7B341E]">All Users</CardTitle>
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
                            {users.map((user) => (
                              <tr key={user.id}>
                                <td className="px-6 py-4 text-sm text-[#7B341E]">{user.name}</td>
                                <td className="px-6 py-4 text-sm text-[#7B341E]">{user.email}</td>
                                <td className="px-6 py-4 text-sm text-[#7B341E]">
                                  <span className="capitalize">{user.role}</span>
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    user.verified
                                      ? 'bg-[#266044] text-white'
                                      : 'bg-[#FFE4C9] text-[#7B341E]'
                                  }`}>
                                    {user.verified ? 'Verified' : 'Pending'}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <Link href={`/users/${user.id}`}>
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

                {activeTab === 'properties' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {properties.map((property) => (
                      <PropertyCard key={property._id} property={property} />
                    ))}
                  </div>
                )}

                {activeTab === 'transactions' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-[#7B341E]">All Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-[#FFE4C9]">
                            <tr>
                              <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Date</th>
                              <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Property</th>
                              <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Tenant</th>
                              <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Landlord</th>
                              <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Type</th>
                              <th className="px-6 py-3 text-left text-sm font-medium text-[#7B341E]">Amount</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#7B341E]/10">
                            {transactions.map((transaction) => (
                              <tr key={transaction.id}>
                                <td className="px-6 py-4 text-sm text-[#7B341E]">
                                  {new Date(transaction.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-sm text-[#7B341E]">{transaction.property.title}</td>
                                <td className="px-6 py-4 text-sm text-[#7B341E]">{transaction.tenant.name}</td>
                                <td className="px-6 py-4 text-sm text-[#7B341E]">{transaction.property.landlord.name}</td>
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
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 