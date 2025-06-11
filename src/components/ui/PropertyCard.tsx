import Link from 'next/link';
import { Property } from '@/types';
import Button from './Button';

interface PropertyCardProps {
  property: Property;
  variant?: 'grid' | 'list';
  showActions?: boolean;
}

export default function PropertyCard({ property, variant = 'grid', showActions = true }: PropertyCardProps) {
  const formatPrice = (price: { amount: number; frequency?: 'monthly' | 'yearly' | null; type: 'fixed' | 'negotiable' }) => {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price.amount);

    if (property.listingType === 'rent') {
      return `${formattedAmount}/${price.frequency === 'yearly' ? 'yr' : 'mo'}`;
    }
    return formattedAmount;
  };

  const getStatusBadgeColor = (status: Property['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rented':
        return 'bg-blue-100 text-blue-800';
      case 'sold':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`bg-white rounded-xl border-2 border-[#7B341E]/20 shadow-sm overflow-hidden
      ${variant === 'list' ? 'flex' : 'block'}`}
    >
      {/* Image Section */}
      <div className={`relative ${variant === 'list' ? 'w-1/3' : ''}`}>
        <div className={`aspect-w-16 aspect-h-9 ${variant === 'list' ? 'h-full' : ''}`}>
          <img
            src={property.images[0]?.url || '/placeholder-property.jpg'}
            alt={property.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(property.status)}`}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
          <span className="bg-[#7B341E] text-white px-2 py-1 rounded-full text-xs font-medium">
            {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className={`p-6 ${variant === 'list' ? 'w-2/3' : ''}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-[#7B341E] line-clamp-1">{property.title}</h3>
          <p className="text-xl font-bold text-[#266044]">
            {formatPrice(property.price)}
            {property.price.type === 'negotiable' && (
              <span className="text-sm font-normal text-[#7B341E]/70 ml-1">(Negotiable)</span>
            )}
          </p>
        </div>

        <p className="text-[#7B341E]/70 mb-4">
          {property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-[#7B341E]/70 mb-4">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            {property.features.bedrooms} bd
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a1 1 0 011-1h8a1 1 0 011 1v3h3a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V6a1 1 0 011-1h3V2zm10 6H5v8h10V8zm-2-5H7v3h6V3z" clipRule="evenodd" />
            </svg>
            {property.features.bathrooms} ba
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
            </svg>
            {property.features.squareFeet} sqft
          </span>
          {property.features.parking > 0 && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 6V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2h2c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h2zm2-2v2h4V4H8z" />
              </svg>
              {property.features.parking} parking
            </span>
          )}
          {property.features.furnished && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-.75-7.25a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5z" clipRule="evenodd" />
              </svg>
              Furnished
            </span>
          )}
        </div>

        {showActions && (
          <div className="flex gap-2">
            <Link href={`/properties/${property._id}`} className="flex-1">
              <Button 
                variant="outline" 
                className="w-full border-2 border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E] hover:text-white"
              >
                View Details
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 