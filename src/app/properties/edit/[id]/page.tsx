'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { propertyService } from '@/services/property.service';
import { toast } from 'react-hot-toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Property } from '@/types';
import { Loader2 } from 'lucide-react';

const PROPERTY_TYPES = [
  'Apartment',
  'House',
  'Condo',
  'Townhouse',
  'Villa',
  'Studio',
  'Duplex',
  'Penthouse'
];

const AMENITIES = [
  'Air Conditioning',
  'Heating',
  'Washer/Dryer',
  'Dishwasher',
  'Garage',
  'Swimming Pool',
  'Gym',
  'Security System',
  'Balcony',
  'Garden',
  'Pet Friendly',
  'Storage',
  'Elevator',
  'Internet Ready'
];

export default function EditProperty({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    listingType: 'rent',
    price: {
      amount: '',
      frequency: 'monthly',
      type: 'fixed'
    },
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: ''
    },
    features: {
      bedrooms: '',
      bathrooms: '',
      squareFeet: '',
      propertyType: '',
      yearBuilt: '',
      parking: '',
      furnished: false
    },
    amenities: [] as string[],
    images: [] as File[]
  });

  useEffect(() => {
    fetchProperty();
  }, [params.id]);

  const fetchProperty = async () => {
    try {
      setIsLoading(true);
      const data = await propertyService.getProperty(params.id);
      setProperty(data);
      setFormData({
        title: data.title,
        description: data.description,
        listingType: data.listingType,
        price: {
          amount: data.price.amount.toString(),
          frequency: data.price.frequency || 'monthly',
          type: data.price.type
        },
        location: {
          address: data.location.address,
          city: data.location.city,
          state: data.location.state,
          zipCode: data.location.zipCode
        },
        features: {
          bedrooms: data.features.bedrooms.toString(),
          bathrooms: data.features.bathrooms.toString(),
          squareFeet: data.features.squareFeet.toString(),
          propertyType: data.features.propertyType,
          yearBuilt: data.features.yearBuilt?.toString() || '',
          parking: data.features.parking?.toString() || '',
          furnished: data.features.furnished
        },
        amenities: data.amenities,
        images: []
      });
    } catch (error) {
      console.error('Error fetching property:', error);
      toast.error('Failed to fetch property details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const formDataToSend = {
        ...formData,
        price: {
          ...formData.price,
          amount: parseFloat(formData.price.amount),
          frequency: formData.listingType === 'sale' ? null : formData.price.frequency,
        },
        features: {
          ...formData.features,
          bedrooms: parseInt(formData.features.bedrooms),
          bathrooms: parseFloat(formData.features.bathrooms),
          squareFeet: parseInt(formData.features.squareFeet),
          yearBuilt: formData.features.yearBuilt ? parseInt(formData.features.yearBuilt) : undefined,
          parking: formData.features.parking ? parseInt(formData.features.parking) : undefined,
        }
      };

      await propertyService.updateProperty(params.id, formDataToSend);
      toast.success('Property updated successfully');
      router.push('/dashboard/landlord?tab=properties');
    } catch (error: any) {
      console.error('Error updating property:', {
        status: error.response?.status,
        message: error.response?.data?.message,
        error
      });
      toast.error(error.response?.data?.message || 'Failed to update property');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !property) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-[#7B341E] animate-spin" />
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['landlord']}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#7B341E] mb-8">Edit Property</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-[#7B341E]/20">
              <h2 className="text-xl font-semibold text-[#7B341E] mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-[#7B341E] mb-1">
                    Property Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-[#7B341E] mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="listingType" className="block text-sm font-medium text-[#7B341E] mb-1">
                      Listing Type
                    </label>
                    <select
                      id="listingType"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                      value={formData.listingType}
                      onChange={(e) => setFormData({ ...formData, listingType: e.target.value as 'rent' | 'sale' })}
                    >
                      <option value="rent">For Rent</option>
                      <option value="sale">For Sale</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Information */}
            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-[#7B341E]/20">
              <h2 className="text-xl font-semibold text-[#7B341E] mb-4">Price Information</h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-[#7B341E] mb-1">
                    Price Amount
                  </label>
                  <input
                    type="number"
                    id="price"
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                    value={formData.price.amount}
                    onChange={(e) => setFormData({
                      ...formData,
                      price: { ...formData.price, amount: e.target.value }
                    })}
                  />
                </div>

                {formData.listingType === 'rent' && (
                  <div>
                    <label htmlFor="frequency" className="block text-sm font-medium text-[#7B341E] mb-1">
                      Frequency
                    </label>
                    <select
                      id="frequency"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                      value={formData.price.frequency}
                      onChange={(e) => setFormData({
                        ...formData,
                        price: { ...formData.price, frequency: e.target.value as 'monthly' | 'yearly' }
                      })}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                )}

                <div>
                  <label htmlFor="priceType" className="block text-sm font-medium text-[#7B341E] mb-1">
                    Price Type
                  </label>
                  <select
                    id="priceType"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                    value={formData.price.type}
                    onChange={(e) => setFormData({
                      ...formData,
                      price: { ...formData.price, type: e.target.value as 'fixed' | 'negotiable' }
                    })}
                  >
                    <option value="fixed">Fixed</option>
                    <option value="negotiable">Negotiable</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-[#7B341E]/20">
              <h2 className="text-xl font-semibold text-[#7B341E] mb-4">Location</h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-[#7B341E] mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                    value={formData.location.address}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: { ...formData.location, address: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-[#7B341E] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                    value={formData.location.city}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: { ...formData.location, city: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-[#7B341E] mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                    value={formData.location.state}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: { ...formData.location, state: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-[#7B341E] mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                    value={formData.location.zipCode}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: { ...formData.location, zipCode: e.target.value }
                    })}
                  />
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-[#7B341E]/20">
              <h2 className="text-xl font-semibold text-[#7B341E] mb-4">Features</h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-[#7B341E] mb-1">
                    Property Type
                  </label>
                  <select
                    id="propertyType"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                    value={formData.features.propertyType}
                    onChange={(e) => setFormData({
                      ...formData,
                      features: { ...formData.features, propertyType: e.target.value }
                    })}
                  >
                    <option value="">Select a type</option>
                    {PROPERTY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-[#7B341E] mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    id="bedrooms"
                    required
                    min="0"
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                    value={formData.features.bedrooms}
                    onChange={(e) => setFormData({
                      ...formData,
                      features: { ...formData.features, bedrooms: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-[#7B341E] mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    id="bathrooms"
                    required
                    min="0"
                    step="0.5"
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                    value={formData.features.bathrooms}
                    onChange={(e) => setFormData({
                      ...formData,
                      features: { ...formData.features, bathrooms: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <label htmlFor="squareFeet" className="block text-sm font-medium text-[#7B341E] mb-1">
                    Square Feet
                  </label>
                  <input
                    type="number"
                    id="squareFeet"
                    required
                    min="0"
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                    value={formData.features.squareFeet}
                    onChange={(e) => setFormData({
                      ...formData,
                      features: { ...formData.features, squareFeet: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <label htmlFor="yearBuilt" className="block text-sm font-medium text-[#7B341E] mb-1">
                    Year Built
                  </label>
                  <input
                    type="number"
                    id="yearBuilt"
                    min="1800"
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                    value={formData.features.yearBuilt}
                    onChange={(e) => setFormData({
                      ...formData,
                      features: { ...formData.features, yearBuilt: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <label htmlFor="parking" className="block text-sm font-medium text-[#7B341E] mb-1">
                    Parking Spaces
                  </label>
                  <input
                    type="number"
                    id="parking"
                    min="0"
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                    value={formData.features.parking}
                    onChange={(e) => setFormData({
                      ...formData,
                      features: { ...formData.features, parking: e.target.value }
                    })}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="furnished"
                    className="w-5 h-5 rounded border-2 border-[#7B341E] text-[#7B341E] focus:ring-[#7B341E]"
                    checked={formData.features.furnished}
                    onChange={(e) => setFormData({
                      ...formData,
                      features: { ...formData.features, furnished: e.target.checked }
                    })}
                  />
                  <label htmlFor="furnished" className="ml-2 text-sm font-medium text-[#7B341E]">
                    Furnished
                  </label>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-[#7B341E]/20">
              <h2 className="text-xl font-semibold text-[#7B341E] mb-4">Amenities</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {AMENITIES.map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      id={amenity}
                      className="w-5 h-5 rounded border-2 border-[#7B341E] text-[#7B341E] focus:ring-[#7B341E]"
                      checked={formData.amenities.includes(amenity)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            amenities: [...formData.amenities, amenity]
                          });
                        } else {
                          setFormData({
                            ...formData,
                            amenities: formData.amenities.filter(a => a !== amenity)
                          });
                        }
                      }}
                    />
                    <label htmlFor={amenity} className="ml-2 text-sm font-medium text-[#7B341E]">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                className="border-2 border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E] hover:text-white"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#7B341E] text-white hover:bg-[#266044]"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
} 