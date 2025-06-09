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
  image: string;
}

export default function Home() {
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
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop'
    },
    {
      id: 2,
      title: 'Spacious Family Home',
      location: '456 Oak Ave, Suburbs',
      price: 2500,
      beds: 3,
      baths: 2,
      sqft: 1800,
      type: 'HOUSE',
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
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop'
    },
    {
      id: 4,
      title: 'Cozy Studio Near Park',
      location: '321 Park St, Midtown',
      price: 1200,
      beds: 0,
      baths: 1,
      sqft: 500,
      type: 'STUDIO',
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
                <div className="bg-transparent rounded-lg flex items-center gap-2">
                  <div className="flex-1">
              <input
                type="text"
                      placeholder="Enter your preferred location"
                      className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]"
                    />
                  </div>
                  <button 
                    className="p-3 rounded-lg border-2 border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E] hover:text-white transition-colors"
                    aria-label="Search"
                  >
                    <Search className="w-6 h-6" />
                  </button>
                </div>
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
            We&apos;re committed to making your rental experience as smooth and hassle-free as possible.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#E4BB9A] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#7B341E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                    </div>
              <h3 className="text-xl font-semibold mb-2 text-[#7B341E]">Verified Listings</h3>
              <p className="text-[#7B341E]">Every property is verified by our team to ensure accuracy and quality.</p>
        </div>
            <div className="text-center">
              <div className="bg-[#E4BB9A] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#7B341E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#7B341E]">Zero Broker Scams</h3>
              <p className="text-[#7B341E]">Deal directly with property owners or trusted property managers.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#E4BB9A] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#7B341E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#7B341E]">Advanced Filters</h3>
              <p className="text-[#7B341E]">Find exactly what you&apos;re looking for with our detailed search options.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#E4BB9A] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#7B341E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#7B341E]">Quick Responses</h3>
              <p className="text-[#7B341E]">Get responses from property owners within 24 hours.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-[#E8F5E9] rounded-xl border-2 border-[#266044] shadow-sm px-8 py-20">
          <h2 className="text-3xl font-bold text-center text-[#266044] mb-4">How It Works</h2>
          <p className="text-center text-[#266044] mb-12">
            Finding and renting your next home is simple with our easy three-step process.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="bg-[#86DDB3] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-10 h-10 text-[#266044]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="absolute -top-3 -right-3 bg-[#266044] text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#266044]">Search</h3>
              <p className="text-[#266044]">Enter your desired location and use our filters to find the perfect rental property.</p>
            </div>
            <div className="text-center">
              <div className="relative inline-block">
                <div className="bg-[#86DDB3] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-10 h-10 text-[#266044]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="absolute -top-3 -right-3 bg-[#266044] text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#266044]">Visit</h3>
              <p className="text-[#266044]">Schedule viewings directly through our platform with verified property owners.</p>
            </div>
            <div className="text-center">
              <div className="relative inline-block">
                <div className="bg-[#86DDB3] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-10 h-10 text-[#266044]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="absolute -top-3 -right-3 bg-[#266044] text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#266044]">Move In</h3>
              <p className="text-[#266044]">Complete the paperwork online and move into your new home with ease.</p>
            </div>
          </div>
        </section>

        {/* Featured Properties Section */}
        <section className="py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#7B341E]">Featured Properties</h2>
              <p className="text-[#7B341E] mt-2">Handpicked properties that you might love</p>
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
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-[#7B341E] text-white rounded mb-2">
                    {property.type}
                  </span>
                  <h3 className="font-semibold text-lg mb-1 text-[#7B341E]">{property.title}</h3>
                  <p className="text-[#7B341E] text-sm mb-2">{property.location}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-[#7B341E] font-bold">${property.price}/mo</p>
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
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Home?</h2>
            <p className="mb-8">Join thousands of happy renters who found their home with RentEasy. No hidden fees, no broker commissions.</p>
            <div className="flex justify-center gap-4">
              <Link href="/properties/create">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#7B341E]">
                  List a Property
                </Button>
              </Link>
              <Link href="/properties">
                <Button className="bg-white text-[#7B341E] hover:bg-gray-100">
                  Need a Home
                </Button>
              </Link>
          </div>
        </div>
      </section>
    </div>
    </main>
  );
}
