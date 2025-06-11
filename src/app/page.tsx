'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Search } from 'lucide-react';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  listingType: 'rent' | 'sale';
  image: string;
}

export default function Home() {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    location: '',
    listingType: 'all'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    
    if (searchParams.location) {
      queryParams.set('location', searchParams.location);
    }
    if (searchParams.listingType !== 'all') {
      queryParams.set('listingType', searchParams.listingType);
    }
    
    router.push(`/properties?${queryParams.toString()}`);
  };

  // Mock featured properties data
  const featuredProperties: Property[] = [
    {
      id: 1,
      title: 'Modern Downtown Apartment',
      location: '123 Mill St, Downtown',
      price: 1900,
      beds: 1,
      baths: 1,
      sqft: 750,
      type: 'APARTMENT',
      listingType: 'rent',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop'
    },
    {
      id: 2,
      title: 'Spacious Family Home',
      location: '456 Oak Ave, Suburbs',
      price: 450000,
      beds: 3,
      baths: 2,
      sqft: 1800,
      type: 'HOUSE',
      listingType: 'sale',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop'
    },
    {
      id: 3,
      title: 'Luxury Condo with View',
      location: '789 Tower Rd, City Center',
      price: 3200,
      beds: 2,
      baths: 2,
      sqft: 1200,
      type: 'CONDO',
      listingType: 'rent',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop'
    },
    {
      id: 4,
      title: 'Cozy Starter Home',
      location: '321 Park St, Midtown',
      price: 275000,
      beds: 2,
      baths: 1,
      sqft: 1000,
      type: 'HOUSE',
      listingType: 'sale',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop'
    }
  ];

  return (
    <main className="bg-background min-h-screen py-4 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#DCFFEF] to-[#FFE4C9] rounded-xl border-2 border-[#7B341E] shadow-sm overflow-hidden">
          <div className="max-w-7xl mx-auto p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 mb-10 lg:mb-0">
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#266044] to-[#4DC68C] text-2xl mb-2">
                  Welcome To Homie
                </p>
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F1B1C] to-[#B53E41] text-5xl font-bold mb-4">
                  FIND YOUR NEXT HOME<br />
                  SAFELY AND SIMPLY
          </h1>
                <p className="text-black-600 mb-6">
                  Connects Renters And Landlords With Verified Listings,<br />
                  Advanced Filters, And Zero Broker Scams.
                </p>
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="flex gap-4">
                    <select
                      value={searchParams.listingType}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, listingType: e.target.value }))}
                      className="px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E] w-40"
                    >
                      <option value="all">All Properties</option>
                      <option value="rent">For Rent</option>
                      <option value="sale">For Sale</option>
                    </select>
                    <div className="flex-1 relative">
              <input
                type="text"
                        placeholder="Enter city, neighborhood, or address"
                        value={searchParams.location}
                        onChange={(e) => setSearchParams(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                      />
                  <button 
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-[#7B341E] hover:bg-[#7B341E] hover:text-white transition-colors"
                    aria-label="Search"
                  >
                    <Search className="w-6 h-6" />
                  </button>
                </div>
                  </div>
                </form>
              </div>
              <div className="lg:w-1/2">
                <img
                  src="/house-illustration.png"
                  alt="Modern house illustration"
                  className="w-full h-auto"
                />
            </div>
          </div>
        </div>
      </section>

        {/* Why Choose Homie Section */}
        <section className="bg-[#FFE4C9] rounded-xl border-2 border-[#7B341E] shadow-sm px-8 py-20">
          <h2 className="text-3xl font-bold text-center text-[#7B341E] mb-4">Why Choose Homie?</h2>
          <p className="text-center text-[#7B341E] mb-12">
            Your one-stop platform for renting, buying, and selling properties with confidence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#E4BB9A] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#7B341E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                    </div>
              <h3 className="text-xl font-semibold mb-2 text-[#7B341E]">Verified Properties</h3>
              <p className="text-[#7B341E]">Every rental and sale listing is verified for authenticity and quality.</p>
        </div>
            <div className="text-center">
              <div className="bg-[#E4BB9A] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#7B341E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#7B341E]">Secure Transactions</h3>
              <p className="text-[#7B341E]">Protected payments and verified documentation for all property transactions.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#E4BB9A] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#7B341E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#7B341E]">Smart Filters</h3>
              <p className="text-[#7B341E]">Find properties to rent or buy with our advanced search and filtering system.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#E4BB9A] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#7B341E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#7B341E]">Market Insights</h3>
              <p className="text-[#7B341E]">Access real-time market data and property value estimates.</p>
            </div>
          </div>
        </section>

        {/* User Features Section */}
        <section className="bg-[#E8F5E9] rounded-xl border-2 border-[#266044] shadow-sm px-8 py-20">
          <h2 className="text-3xl font-bold text-center text-[#266044] mb-4">Features For You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Tenant Features */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-[#266044]">
              <h3 className="text-2xl font-bold text-[#266044] mb-4">For Tenants</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-[#266044]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save and compare favorite properties
                </li>
                <li className="flex items-center gap-2 text-[#266044]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Schedule virtual or in-person viewings
                </li>
                <li className="flex items-center gap-2 text-[#266044]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Submit rental applications online
                </li>
                <li className="flex items-center gap-2 text-[#266044]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Set up rent payment reminders
                </li>
              </ul>
            </div>

            {/* Landlord Features */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-[#266044]">
              <h3 className="text-2xl font-bold text-[#266044] mb-4">For Property Owners</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-[#266044]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  List properties for rent or sale
                </li>
                <li className="flex items-center gap-2 text-[#266044]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Manage property listings and applications
                </li>
                <li className="flex items-center gap-2 text-[#266044]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Access market analysis tools
                </li>
                <li className="flex items-center gap-2 text-[#266044]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Track property performance metrics
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Featured Properties Section */}
        <section className="py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#7B341E]">Featured Properties</h2>
              <p className="text-[#7B341E] mt-2">Discover properties for rent and sale</p>
            </div>
            <Link href="/properties" className="text-[#7B341E] hover:underline">
              View All Properties
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <div key={property.id} className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex gap-2 mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-[#7B341E] text-white rounded">
                    {property.type}
                  </span>
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-[#266044] text-white rounded">
                      {property.listingType === 'rent' ? 'FOR RENT' : 'FOR SALE'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1 text-[#7B341E]">{property.title}</h3>
                  <p className="text-[#7B341E] text-sm mb-2">{property.location}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-[#7B341E] font-bold">
                      ${property.price.toLocaleString()}
                      {property.listingType === 'rent' ? '/mo' : ''}
                    </p>
                    <Link href={`/properties/${property.id}`}>
                      <Button variant="outline" size="sm" className="border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E] hover:text-white">
                        View Details
                      </Button>
                    </Link>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-[#7B341E]">
                    <span>{property.beds} beds</span>
                    <span>{property.baths} baths</span>
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#7B341E] rounded-xl border-2 border-[#8B4513] shadow-sm p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="mb-8">Whether you're looking to rent, buy, or sell a property, Homie has you covered. Join our community today!</p>
            <div className="flex justify-center gap-4">
              <Link href="/properties/create">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#7B341E]">
                  List Your Property
                </Button>
              </Link>
              <Link href="/properties">
                <Button className="bg-white text-[#7B341E] hover:bg-gray-100">
                  Browse Properties
                </Button>
              </Link>
          </div>
        </div>
      </section>
    </div>
    </main>
  );
}
