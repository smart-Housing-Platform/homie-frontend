import api from './api';
import { Property, PropertyFilter } from '@/types';

export const propertyService = {
  async getProperties(filter?: PropertyFilter) {
    try {
      const response = await api.get('/properties', { params: filter });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch properties');
    }
  },

  async getProperty(id: string): Promise<Property> {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch property details');
    }
  },

  async createProperty(formData: FormData) {
    // Debug logs
    console.log('Form data entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await api.post('/properties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to create property listing';
      throw new Error(errorMessage);
    }
  },

  async updateProperty(id: string, data: Partial<Property> | FormData) {
    try {
      const headers = data instanceof FormData 
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' };

      const response = await api.put(`/properties/${id}`, data, { headers });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update property');
    }
  },

  async deleteProperty(id: string) {
    try {
      await api.delete(`/properties/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete property');
    }
  }
}; 