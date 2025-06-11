'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { propertyService } from '@/services/property.service';
import { toast } from 'react-hot-toast';
import ProtectedRoute from '@/components/ProtectedRoute';

interface PropertyFormData {
  title: string;
  description: string;
  listingType: 'rent' | 'sale';
  price: {
    amount: string;
    frequency: 'monthly' | 'yearly' | null;
    type: 'fixed' | 'negotiable';
  };
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  features: {
    bedrooms: string;
    bathrooms: string;
    squareFeet: string;
    propertyType: string;
    yearBuilt: string;
    parking: string;
    furnished: boolean;
  };
  amenities: string[];
  images: File[];
}

const PROPERTY_TYPES = [
  'House',
  'Apartment',
  'Condo',
  'Townhouse',
  'Villa',
  'Studio',
  'Duplex',
  'Land'
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
  'Internet Ready'
];

export default function CreateProperty() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PropertyFormData>({
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
      parking: '0',
      furnished: false
    },
    amenities: [],
    images: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Append basic fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('listingType', formData.listingType);
      
      // Append price object
      formDataToSend.append('price', JSON.stringify({
        amount: Number(formData.price.amount),
        frequency: formData.listingType === 'sale' ? null : formData.price.frequency,
        type: formData.price.type
      }));

      // Append location object
      formDataToSend.append('location', JSON.stringify(formData.location));

      // Append features object
      formDataToSend.append('features', JSON.stringify({
        ...formData.features,
        bedrooms: Number(formData.features.bedrooms),
        bathrooms: Number(formData.features.bathrooms),
        squareFeet: Number(formData.features.squareFeet),
        yearBuilt: formData.features.yearBuilt ? Number(formData.features.yearBuilt) : undefined,
        parking: Number(formData.features.parking)
      }));

      // Append amenities array
      formDataToSend.append('amenities', JSON.stringify(formData.amenities));

      // Append images
      formData.images.forEach((image) => {
        formDataToSend.append('images', image);
      });

      await propertyService.createProperty(formDataToSend);
      toast.success('Property created successfully!');
      router.push('/dashboard/landlord');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create property');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute roles={['landlord']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#7B341E] mb-8">Create New Property Listing</h1>
        
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
            {/* Basic Information */}
          <div className="bg-white p-6 rounded-xl shadow-md border-2 border-[#7B341E]/20">
            <h2 className="text-xl font-semibold text-[#7B341E] mb-4">Basic Information</h2>
            
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                <label htmlFor="title" className="block text-sm font-medium text-[#7B341E] mb-1">
                    Property Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                    value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="listingType" className="block text-sm font-medium text-[#7B341E] mb-1">
                  Listing Type
                </label>
                <select
                  id="listingType"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                  value={formData.listingType}
                  onChange={(e) => {
                    const newType = e.target.value as 'rent' | 'sale';
                    setFormData({
                      ...formData,
                      listingType: newType,
                      price: {
                        ...formData.price,
                        frequency: newType === 'sale' ? null : 'monthly'
                      }
                    });
                  }}
                >
                  <option value="rent">For Rent</option>
                  <option value="sale">For Sale</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-[#7B341E] mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
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
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
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
                    Payment Frequency
                  </label>
                  <select
                    id="frequency"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                    value={formData.price.frequency || 'monthly'}
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

              <div className="flex items-center space-x-2">
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
                <label htmlFor="furnished" className="text-sm font-medium text-[#7B341E]">
                  Furnished
                </label>
              </div>
              </div>
            </div>

            {/* Location */}
          <div className="bg-white p-6 rounded-xl shadow-md border-2 border-[#7B341E]/20">
            <h2 className="text-xl font-semibold text-[#7B341E] mb-4">Location</h2>
            
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-[#7B341E] mb-1">
                    Street Address
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

            {/* Amenities */}
          <div className="bg-white p-6 rounded-xl shadow-md border-2 border-[#7B341E]/20">
            <h2 className="text-xl font-semibold text-[#7B341E] mb-4">Amenities</h2>
            
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {AMENITIES.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                    id={`amenity-${amenity}`}
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
                  <label htmlFor={`amenity-${amenity}`} className="text-sm text-[#7B341E]">
                    {amenity}
                  </label>
                </div>
                ))}
              </div>
            </div>

            {/* Images */}
          <div className="bg-white p-6 rounded-xl shadow-md border-2 border-[#7B341E]/20">
            <h2 className="text-xl font-semibold text-[#7B341E] mb-4">Property Images</h2>
            
            <div className="space-y-4">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                            setFormData({
                              ...formData,
                    images: files
                            });
                          }}
                className="block w-full text-sm text-[#7B341E]
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-[#7B341E] file:text-white
                  hover:file:bg-[#266044]"
              />
              <p className="text-sm text-[#7B341E]/70">
                You can upload multiple images. Supported formats: JPG, PNG, WebP
              </p>
            </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button 
                type="submit" 
              disabled={isSubmitting}
              className="bg-[#7B341E] text-white px-8 py-3 rounded-lg hover:bg-[#266044] transition-colors"
              >
              {isSubmitting ? 'Creating...' : 'Create Property'}
              </Button>
            </div>
          </form>
      </div>
    </ProtectedRoute>
  );
} 