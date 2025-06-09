'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

// Mock property data
const mockProperties = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Beautiful ${['Apartment', 'House', 'Condo'][i % 3]} in ${['Downtown', 'Uptown', 'Midtown'][i % 3]}`,
  description: 'Modern living space with great amenities and convenient location.',
  price: Math.floor(Math.random() * 2000) + 1000,
  location: `${['Downtown', 'Uptown', 'Midtown'][i % 3]}, City`,
  bedrooms: Math.floor(Math.random() * 3) + 1,
  bathrooms: Math.floor(Math.random() * 2) + 1,
  squareFeet: Math.floor(Math.random() * 1000) + 500,
  image: `https://images.unsplash.com/photo-${1560448204 + i}?w=500&h=400&fit=crop`,
}));

interface Filters {
  location: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  propertyType: string;
}

export default function PropertiesPage() {
  const [filters, setFilters] = useState<Filters>({
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    propertyType: '',
  });

  const [sortBy, setSortBy] = useState('newest');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredProperties = mockProperties.filter((property) => {
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.minPrice && property.price < parseInt(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) {
      return false;
    }
    if (filters.bedrooms && property.bedrooms !== parseInt(filters.bedrooms)) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#FFE4C9] border-b-2 border-[#7B341E]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#7B341E] mb-4">Find Your Perfect Home</h1>
          <p className="text-[#7B341E]/70 text-lg max-w-2xl">
            Explore our curated selection of beautiful properties, from cozy apartments to luxurious houses.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Search and Filters */}
          <div className="bg-white rounded-xl border-2 border-[#7B341E] shadow-sm p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-[#7B341E] mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                  placeholder="Enter location"
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
                  <option value="3">3+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sort and Results Count */}
          <div className="flex justify-between items-center bg-[#E8F5E9] rounded-xl border-2 border-[#7B341E] shadow-sm p-6">
            <p className="text-[#7B341E] font-medium">
              {filteredProperties.length} properties found
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

          {/* Property Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <Link
                key={property.id}
                href={`/properties/${property.id}`}
                className="block group transform transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="bg-white rounded-xl border-2 border-[#7B341E] shadow-sm overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-[#7B341E] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {['Apartment', 'House', 'Condo'][property.id % 3]}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#7B341E] group-hover:text-[#266044]">
                      {property.title}
                    </h3>
                    <p className="mt-1 text-[#7B341E]/70">{property.location}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xl font-bold text-[#266044]">
                        ${property.price}/mo
                      </p>
                      <div className="flex items-center space-x-4 text-[#7B341E]/70">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                          </svg>
                          {property.bedrooms} bd
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 2a1 1 0 011-1h8a1 1 0 011 1v3h3a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V6a1 1 0 011-1h3V2zm10 6H5v8h10V8zm-2-5H7v3h6V3z" clipRule="evenodd" />
                          </svg>
                          {property.bathrooms} ba
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                          </svg>
                          {property.squareFeet} sqft
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="mt-4 w-full border-2 border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E] hover:text-white"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 flex justify-center">
            <Button 
              variant="outline"
              className="border-2 border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E] hover:text-white px-8 py-3"
            >
              Load More Properties
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 