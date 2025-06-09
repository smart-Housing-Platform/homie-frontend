'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface PropertyFormData {
  title: string;
  description: string;
  price: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  squareFeet: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  amenities: string[];
  images: File[];
}

const AMENITIES_OPTIONS = [
  'Air Conditioning',
  'Heating',
  'Washer/Dryer',
  'Dishwasher',
  'Parking',
  'Gym',
  'Pool',
  'Pet Friendly',
  'Furnished',
  'Balcony',
  'Storage',
  'Security System',
];

const PROPERTY_TYPES = [
  'Apartment',
  'House',
  'Condo',
  'Townhouse',
  'Studio',
  'Duplex',
];

export default function CreatePropertyPage() {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    description: '',
    price: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    amenities: [],
    images: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData({ ...formData, images: [...formData.images, ...files] });

    // Create preview URLs
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewUrls]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement property creation
      console.log('Property form submitted:', formData);
    } catch (error) {
      console.error('Error creating property:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#FFE4C9] border-b-2 border-[#7B341E]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#7B341E] mb-4">List Your Property</h1>
          <p className="text-[#7B341E]/70 text-lg max-w-2xl">
            Fill out the form below to create your property listing. Make sure to provide detailed information to attract potential tenants.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl border-2 border-[#7B341E] shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-[#7B341E] mb-6">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-[#7B341E] mb-1"
                >
                  Property Title
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="propertyType"
                  className="block text-sm font-medium text-[#7B341E] mb-1"
                >
                  Property Type
                </label>
                <select
                  id="propertyType"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                  value={formData.propertyType}
                  onChange={(e) =>
                    setFormData({ ...formData, propertyType: e.target.value })
                  }
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
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-[#7B341E] mb-1"
                >
                  Monthly Rent ($)
                </label>
                <input
                  type="number"
                  id="price"
                  required
                  min="0"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="squareFeet"
                  className="block text-sm font-medium text-[#7B341E] mb-1"
                >
                  Square Feet
                </label>
                <input
                  type="number"
                  id="squareFeet"
                  required
                  min="0"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                  value={formData.squareFeet}
                  onChange={(e) =>
                    setFormData({ ...formData, squareFeet: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="bedrooms"
                  className="block text-sm font-medium text-[#7B341E] mb-1"
                >
                  Bedrooms
                </label>
                <input
                  type="number"
                  id="bedrooms"
                  required
                  min="0"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                  value={formData.bedrooms}
                  onChange={(e) =>
                    setFormData({ ...formData, bedrooms: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="bathrooms"
                  className="block text-sm font-medium text-[#7B341E] mb-1"
                >
                  Bathrooms
                </label>
                <input
                  type="number"
                  id="bathrooms"
                  required
                  min="0"
                  step="0.5"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                  value={formData.bathrooms}
                  onChange={(e) =>
                    setFormData({ ...formData, bathrooms: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#E8F5E9] rounded-xl border-2 border-[#7B341E] shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-[#7B341E] mb-6">Description</h2>
            <div>
              <textarea
                id="description"
                rows={6}
                required
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                value={formData.description}
                placeholder="Describe your property in detail..."
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl border-2 border-[#7B341E] shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-[#7B341E] mb-6">Location</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-[#7B341E] mb-1"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  id="address"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-[#7B341E] mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-[#7B341E] mb-1"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-[#7B341E] mb-1"
                >
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                  value={formData.zipCode}
                  onChange={(e) =>
                    setFormData({ ...formData, zipCode: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-[#FFE4C9] rounded-xl border-2 border-[#7B341E] shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-[#7B341E] mb-6">Amenities</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {AMENITIES_OPTIONS.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center p-3 bg-white rounded-lg border-2 border-[#7B341E] cursor-pointer transition-colors hover:bg-[#7B341E] hover:text-white group"
                >
                  <input
                    type="checkbox"
                    className="rounded border-[#7B341E] text-[#266044] focus:ring-[#266044] mr-2"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                  />
                  <span className="text-sm text-[#7B341E] group-hover:text-white">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl border-2 border-[#7B341E] shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-[#7B341E] mb-6">
              Property Images
            </h2>
            <div className="space-y-6">
              <div>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[#7B341E] border-dashed rounded-lg bg-[#FFE4C9]/20">
                  <div className="space-y-2 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-[#7B341E]"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-[#7B341E] justify-center">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer rounded-md font-medium text-[#266044] hover:text-[#4DC68C] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#266044]"
                      >
                        <span>Upload files</span>
                        <input
                          id="images"
                          type="file"
                          multiple
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-[#7B341E]/70">
                      PNG, JPG, GIF up to 10MB each
                    </p>
                  </div>
                </div>
              </div>
              {previewImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {previewImages.map((preview, index) => (
                    <div
                      key={index}
                      className="relative aspect-w-1 aspect-h-1 group"
                    >
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="object-cover rounded-lg border-2 border-[#7B341E]"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#7B341E] hover:text-white border-2 border-[#7B341E]"
                        onClick={() => {
                          setPreviewImages(previewImages.filter((_, i) => i !== index));
                          setFormData({
                            ...formData,
                            images: formData.images.filter((_, i) => i !== index),
                          });
                        }}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button 
              type="submit" 
              isLoading={isLoading}
              className="bg-[#7B341E] hover:bg-[#266044] text-white transition-colors px-8 py-3 text-lg"
            >
              Create Property Listing
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 