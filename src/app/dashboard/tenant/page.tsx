'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Property } from '@/types';
import PropertyCard from '@/components/PropertyCard';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Home, Heart, FileText, Bell } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { dashboardService } from '@/services/dashboard.service';
import { toast } from 'react-hot-toast';

export default function TenantDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    totalApplications: 0,
    pendingApplications: 0,
    newNotifications: 0
  });
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsData, propertiesData, applicationsData, notificationsData] = await Promise.all([
        dashboardService.getTenantStats(),
        dashboardService.getTenantSavedProperties(),
        dashboardService.getTenantApplications(),
        dashboardService.getTenantNotifications()
      ]);

      setStats(statsData);
      setSavedProperties(propertiesData);
      setApplications(applicationsData);
      setNotifications(notificationsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

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
                          <CardTitle className="text-sm font-medium text-[#7B341E]">Saved Properties</CardTitle>
                          <Heart className="w-4 h-4 text-[#7B341E]" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-[#7B341E]">{savedProperties.length}</div>
                          <p className="text-xs text-[#7B341E]/70">
                            {savedProperties.filter(p => p.status === 'available').length} available
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                          <CardTitle className="text-sm font-medium text-[#7B341E]">Active Applications</CardTitle>
                          <FileText className="w-4 h-4 text-[#7B341E]" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-[#7B341E]">{stats.pendingApplications}</div>
                          <p className="text-xs text-[#7B341E]/70">Total: {stats.totalApplications}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                          <CardTitle className="text-sm font-medium text-[#7B341E]">Property Views</CardTitle>
                          <Home className="w-4 h-4 text-[#7B341E]" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-[#7B341E]">{stats.totalProperties}</div>
                          <p className="text-xs text-[#7B341E]/70">{stats.activeListings} active</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                          <CardTitle className="text-sm font-medium text-[#7B341E]">New Notifications</CardTitle>
                          <Bell className="w-4 h-4 text-[#7B341E]" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-[#7B341E]">{stats.newNotifications}</div>
                          <p className="text-xs text-[#7B341E]/70">
                            {notifications.filter(n => !n.read).length} unread messages
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
                                key={application.id}
                                className="flex items-center justify-between p-4 bg-[#FFE4C9]/20 rounded-lg"
                              >
                                <div>
                                  <h4 className="font-medium text-[#7B341E]">{application.property.title}</h4>
                                  <p className="text-sm text-[#7B341E]/70">
                                    Submitted on {new Date(application.createdAt).toLocaleDateString()}
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
                          <CardTitle className="text-[#7B341E]">Recent Notifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {notifications.slice(0, 5).map((notification) => (
                              <div
                                key={notification.id}
                                className="flex items-center justify-between p-4 bg-[#FFE4C9]/20 rounded-lg"
                              >
                                <div>
                                  <h4 className="font-medium text-[#7B341E]">{notification.title}</h4>
                                  <p className="text-sm text-[#7B341E]/70">
                                    {new Date(notification.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-[#7B341E] rounded-full"></span>
                                )}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}

                {activeTab === 'saved' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {savedProperties.map((property) => (
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
                            {applications.map((application) => (
                              <tr key={application.id}>
                                <td className="px-6 py-4 text-sm text-[#7B341E]">{application.property.title}</td>
                                <td className="px-6 py-4 text-sm text-[#7B341E]">{application.property.landlord.name}</td>
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
                                  <Link href={`/applications/${application.id}`}>
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

                {activeTab === 'notifications' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-[#7B341E]">Notifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="flex items-center justify-between p-4 bg-[#FFE4C9]/20 rounded-lg"
                          >
                            <div className="flex-grow">
                              <h4 className="font-medium text-[#7B341E]">{notification.title}</h4>
                              <p className="text-sm text-[#7B341E]/70 mt-1">{notification.message}</p>
                              <p className="text-xs text-[#7B341E]/70 mt-2">
                                {new Date(notification.createdAt).toLocaleString()}
                              </p>
                            </div>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-[#7B341E] rounded-full ml-4"></span>
                            )}
                          </div>
                        ))}
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