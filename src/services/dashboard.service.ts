import api from './api';

interface DashboardStats {
  totalProperties: number;
  activeListings: number;
  totalIncome: number;
  occupancyRate: number;
  totalApplications: number;
  pendingApplications: number;
  maintenanceRequests: number;
  newNotifications: number;
}

interface AdminStats extends DashboardStats {
  totalUsers: number;
  newUsersThisMonth: number;
  totalTransactions: number;
  revenue: number;
}

export const dashboardService = {
  async getTenantStats(): Promise<DashboardStats> {
    const response = await api.get('/dashboard/tenant/stats');
    return response.data;
  },

  async getLandlordStats(): Promise<DashboardStats> {
    const response = await api.get('/dashboard/landlord/stats');
    return response.data;
  },

  async getAdminStats(): Promise<AdminStats> {
    const response = await api.get('/dashboard/admin/stats');
    return response.data;
  },

  async getTenantSavedProperties() {
    const response = await api.get('/dashboard/tenant/saved-properties');
    return response.data;
  },

  async getTenantApplications() {
    const response = await api.get('/dashboard/tenant/applications');
    return response.data;
  },

  async getTenantNotifications() {
    const response = await api.get('/dashboard/tenant/notifications');
    return response.data;
  },

  async getLandlordProperties() {
    const response = await api.get('/dashboard/landlord/properties');
    return response.data;
  },

  async getLandlordApplications() {
    const response = await api.get('/dashboard/landlord/applications');
    return response.data;
  },

  async getLandlordIncome() {
    const response = await api.get('/dashboard/landlord/income');
    return response.data;
  },

  async getAdminUsers() {
    const response = await api.get('/dashboard/admin/users');
    return response.data;
  },

  async getAdminProperties() {
    const response = await api.get('/dashboard/admin/properties');
    return response.data;
  },

  async getAdminTransactions() {
    const response = await api.get('/dashboard/admin/transactions');
    return response.data;
  }
}; 