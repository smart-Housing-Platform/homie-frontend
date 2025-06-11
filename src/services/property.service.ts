import api from './api';
import propertyApi from './propertyApi';
import { Property, PropertyFilter } from '@/types';

export const propertyService = {
  async getProperties(filters?: PropertyFilter): Promise<Property[]> {
    const response = await api.get('/properties', { params: filters });
    return response.data;
  },

  async getProperty(id: string): Promise<Property> {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  async createProperty(data: FormData): Promise<Property> {
    const response = await propertyApi.post('/properties', data);
    return response.data;
  },

  async updateProperty(id: string, data: any): Promise<Property> {
    const formData = new FormData();
    
    // Convert the data object to FormData
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('listingType', data.listingType);
    formData.append('price', JSON.stringify(data.price));
    formData.append('location', JSON.stringify(data.location));
    formData.append('features', JSON.stringify(data.features));
    formData.append('amenities', JSON.stringify(data.amenities));

    // Append any new images if they exist
    if (data.images) {
      for (const image of data.images) {
        formData.append('images', image);
      }
    }

    const response = await propertyApi.put(`/properties/${id}`, formData);
    return response.data;
  },

  async deleteProperty(id: string): Promise<void> {
    await propertyApi.delete(`/properties/${id}`);
  },

  async saveProperty(id: string): Promise<void> {
    await api.post(`/properties/${id}/save`);
  },

  async unsaveProperty(id: string): Promise<void> {
    await api.delete(`/properties/${id}/save`);
  },

  async isSaved(id: string): Promise<boolean> {
    try {
      const response = await api.get(`/properties/${id}/saved`);
      return response.data.saved;
    } catch (error) {
      return false;
    }
  }
}; 