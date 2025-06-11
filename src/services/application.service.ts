import api from './api';
import { ApplicationStatus } from '@/types';

export const applicationService = {
  async submitApplication(propertyId: string) {
    const response = await api.post('/applications', { propertyId });
    return response.data;
  },

  async getTenantApplications(): Promise<ApplicationStatus[]> {
    const response = await api.get('/applications/tenant');
    return response.data;
  },

  async getLandlordApplications(): Promise<ApplicationStatus[]> {
    const response = await api.get('/applications/landlord');
    return response.data;
  },

  async updateApplicationStatus(id: string, status: 'approved' | 'rejected') {
    const response = await api.put(`/applications/${id}/status`, { status });
    return response.data;
  }
}; 