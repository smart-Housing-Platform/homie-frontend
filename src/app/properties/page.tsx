'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Property, PropertyFilter } from '@/types';
import PropertyCard from '@/components/PropertyCard';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { propertyService } from '@/services/property.service';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

interface Filters {
  listingType: 'all' | 'rent' | 'sale';
  location: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  propertyType: string;
  furnished: boolean;
  parking: boolean;
}

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<Filters>({
    listingType: (searchParams.get('listingType') as 'rent' | 'sale' | 'all') || 'all',
    location: searchParams.get('location') || '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    propertyType: '',
    furnished: false,
    parking: false
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      // Prepare filter object for API
      const apiFilters: PropertyFilter = {};
      
      if (filters.listingType !== 'all') {
        apiFilters.listingType = filters.listingType;
      }
      if (filters.location) {
        apiFilters.location = filters.location;
      }
      if (filters.minPrice) {
        apiFilters.minPrice = parseInt(filters.minPrice);
      }
      if (filters.maxPrice) {
        apiFilters.maxPrice = parseInt(filters.maxPrice);
      }
      if (filters.bedrooms) {
        apiFilters.bedrooms = parseInt(filters.bedrooms);
      }
      if (filters.propertyType) {
        apiFilters.propertyType = filters.propertyType;
      }
      if (filters.furnished) {
        apiFilters.furnished = filters.furnished;
      }

      const data = await propertyService.getProperties(apiFilters);
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to fetch properties. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string) => {
    setFilters((prev) => ({ ...prev, [name]: !prev[name as keyof Filters] }));
  };

  const sortedProperties = [...properties].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price.amount - b.price.amount;
      case 'price-desc':
        return b.price.amount - a.price.amount;
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#7B341E]">Browse Properties</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${
              viewMode === 'grid' ? 'bg-[#7B341E] text-white' : 'text-[#7B341E]'
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${
              viewMode === 'list' ? 'bg-[#7B341E] text-white' : 'text-[#7B341E]'
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <Card className="lg:col-span-1 h-fit sticky top-8">
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-[#7B341E] mb-4">Filters</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="listingType" className="block text-sm font-medium text-[#7B341E] mb-1">
                  Listing Type
                </label>
                <select
                  id="listingType"
                  name="listingType"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                  value={filters.listingType}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Properties</option>
                  <option value="rent">For Rent</option>
                  <option value="sale">For Sale</option>
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-[#7B341E] mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                  placeholder="Enter city"
                  value={filters.location}
                  onChange={handleFilterChange}
                />
              </div>

              <div>
                <label htmlFor="minPrice" className="block text-sm font-medium text-[#7B341E] mb-1">
                  Min Price
                </label>
                <input
                  type="number"
                  id="minPrice"
                  name="minPrice"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                  placeholder="Min price"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                />
              </div>

              <div>
                <label htmlFor="maxPrice" className="block text-sm font-medium text-[#7B341E] mb-1">
                  Max Price
                </label>
                <input
                  type="number"
                  id="maxPrice"
                  name="maxPrice"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                  placeholder="Max price"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                />
              </div>

              <div>
                <label htmlFor="bedrooms" className="block text-sm font-medium text-[#7B341E] mb-1">
                  Bedrooms
                </label>
                <select
                  id="bedrooms"
                  name="bedrooms"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>

              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-[#7B341E] mb-1">
                  Property Type
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                  value={filters.propertyType}
                  onChange={handleFilterChange}
                >
                  <option value="">Any</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="furnished"
                    className="w-4 h-4 text-[#7B341E] border-[#7B341E] rounded focus:ring-[#7B341E]"
                    checked={filters.furnished}
                    onChange={() => handleCheckboxChange('furnished')}
                  />
                  <label htmlFor="furnished" className="ml-2 text-sm text-[#7B341E]">
                    Furnished Only
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="parking"
                    className="w-4 h-4 text-[#7B341E] border-[#7B341E] rounded focus:ring-[#7B341E]"
                    checked={filters.parking}
                    onChange={() => handleCheckboxChange('parking')}
                  />
                  <label htmlFor="parking" className="ml-2 text-sm text-[#7B341E]">
                    With Parking
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Properties */}
        <div className="lg:col-span-3">
          {/* Sort and Results Count */}
          <div className="flex justify-between items-center bg-[#FFE4C9] rounded-xl border-2 border-[#7B341E] shadow-sm p-6 mb-8">
            <p className="text-[#7B341E] font-medium">
              {properties.length} properties found
            </p>
            <div className="flex items-center space-x-4">
              <label htmlFor="sortBy" className="text-sm font-medium text-[#7B341E]">
                Sort by:
              </label>
              <select
                id="sortBy"
                className="px-4 py-2 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-[#7B341E] animate-spin mb-4" />
              <p className="text-[#7B341E]">Loading properties...</p>
                    </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#7B341E] text-lg mb-4">No properties found matching your criteria</p>
                    <Button 
                      variant="outline" 
                onClick={() => setFilters({
                  listingType: 'all',
                  location: '',
                  minPrice: '',
                  maxPrice: '',
                  bedrooms: '',
                  propertyType: '',
                  furnished: false,
                  parking: false
                })}
                className="border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E] hover:text-white"
              >
                Clear Filters
                    </Button>
                  </div>
          ) : (
            /* Property Grid */
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2' 
                : 'grid-cols-1'
            }`}>
              {sortedProperties.map((property) => (
                <PropertyCard 
                  key={property._id} 
                  property={property}
                  variant={viewMode}
                />
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  );
} 