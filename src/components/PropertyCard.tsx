import { Property } from '@/types';
import Link from 'next/link';
import { Badge } from './ui/Badge';
import { formatPrice } from '@/utils/formatters';

interface PropertyCardProps {
  property: Property;
  variant?: 'grid' | 'list';
}

export default function PropertyCard({ property, variant = 'grid' }: PropertyCardProps) {
  const isGridView = variant === 'grid';
  
  const getPriceDisplay = () => {
    const formattedPrice = formatPrice(property.price.amount);
    if (property.listingType === 'rent') {
      return (
        <span>
          {formattedPrice}
          <span className="text-sm font-normal">
            /{property.price.frequency === 'yearly' ? 'yr' : 'mo'}
          </span>
        </span>
      );
    }
    return <span>{formattedPrice}</span>;
  };

  const getStatusBadge = () => {
    const statusColors = {
      available: 'bg-[#266044] text-white',
      pending: 'bg-[#FFE4C9] text-[#7B341E]',
      rented: 'bg-[#7B341E] text-white',
      sold: 'bg-[#7B341E] text-white',
    };

    return (
      <Badge className={`${statusColors[property.status]} absolute top-4 right-4`}>
        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
      </Badge>
    );
  };

  return (
    <Link
      href={`/properties/${property._id}`}
      className={`block group transform transition-transform duration-300 hover:-translate-y-1 ${
        isGridView ? 'h-full' : 'flex gap-6'
      }`}
    >
      <div className={`bg-white rounded-xl border-2 border-[#7B341E] shadow-sm overflow-hidden ${
        isGridView ? '' : 'flex'
      }`}>
        <div className={`relative ${isGridView ? 'aspect-w-16 aspect-h-9' : 'w-1/3'}`}>
          <img
            src={property.images[0]?.url || '/placeholder-property.jpg'}
            alt={property.title}
            className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
          />
          {getStatusBadge()}
          <div className="absolute top-4 left-4 bg-[#7B341E] text-white px-3 py-1 rounded-full text-sm font-medium">
            {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
          </div>
        </div>
        
        <div className={`p-6 ${isGridView ? '' : 'flex-1'}`}>
          <h3 className="text-lg font-semibold text-[#7B341E] group-hover:text-[#266044]">
            {property.title}
          </h3>
          <p className="mt-1 text-[#7B341E]/70">{property.location.city}, {property.location.state}</p>
          
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xl font-bold text-[#266044]">
              {getPriceDisplay()}
              {property.price.type === 'negotiable' && (
                <span className="text-sm font-normal ml-2">(Negotiable)</span>
              )}
            </p>
          </div>
          
          <div className="mt-4 flex items-center space-x-4 text-[#7B341E]/70">
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
                  <path d="M6 6V4c0-1.1.9-2 2-2h4a2 2 0 012 2v2h2a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8c0-1.1.9-2 2-2h2zm0 2H4v8h12V8h-2v2H6V8zm2-4v4h4V4H8z" />
                </svg>
                {property.features.parking} parking
              </span>
            )}
          </div>
          
          {property.features.furnished && (
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FFE4C9] text-[#7B341E]">
                Furnished
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
} 