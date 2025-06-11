import api from './api';
import { MaintenanceRequest } from '@/types';

export interface CreateMaintenanceRequest {
  propertyId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

export const maintenanceService = {
  async createRequest(data: CreateMaintenanceRequest) {
    const response = await api.post('/maintenance', data);
    return response.data;
  },

  async getTenantRequests(): Promise<MaintenanceRequest[]> {
    const response = await api.get('/maintenance/tenant');
    return response.data;
  },

  async getLandlordRequests(): Promise<MaintenanceRequest[]> {
    const response = await api.get('/maintenance/landlord');
    return response.data;
  },

  async updateRequestStatus(id: string, status: 'pending' | 'in_progress' | 'completed') {
    const response = await api.put(`/maintenance/${id}/status`, { status });
    return response.data;
  }
}; 