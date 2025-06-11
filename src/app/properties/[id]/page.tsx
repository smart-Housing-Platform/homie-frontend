'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Property } from '@/types';
import Button from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import { Card } from '@/components/ui/Card';
import { formatPrice } from '@/utils/formatters';
import { MapPin, Bed, Bath, Square, Car, Home, Check, Loader2 } from 'lucide-react';
import { propertyService } from '@/services/property.service';

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [property, setProperty] = useState<Property | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    fetchProperty();
    checkIfSaved();
  }, [params.id]);

  const fetchProperty = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await propertyService.getProperty(params.id);
      setProperty(data);
    } catch (error: any) {
      console.error('Error fetching property:', error);
      setError(error.message || 'Failed to fetch property details');
      toast.error('Failed to fetch property details');
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfSaved = async () => {
    try {
      const saved = await propertyService.isSaved(params.id);
      setIsSaved(saved);
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };

  const handleSaveProperty = async () => {
    try {
      setIsSaving(true);
      if (isSaved) {
        await propertyService.unsaveProperty(params.id);
        setIsSaved(false);
        toast.success('Property removed from saved list');
      } else {
        await propertyService.saveProperty(params.id);
        setIsSaved(true);
        toast.success('Property saved successfully');
      }
    } catch (error: any) {
      console.error('Error saving property:', error);
      toast.error(error.response?.data?.message || 'Failed to save property');
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-advance images every 5 seconds when isPlaying is true
  useEffect(() => {
    if (!isPlaying || !property) return;

    const interval = setInterval(() => {
      setSelectedImage((current) => 
        current === property.images.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, property]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    // TODO: Implement contact form submission
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      toast.success('Message sent successfully! The landlord will contact you soon.');
    setShowContactForm(false);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to send message');
    }
  };

  const handleScheduleViewing = async () => {
    try {
      // TODO: Implement viewing scheduling
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      toast.success('Viewing request sent! The landlord will confirm the appointment.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to schedule viewing');
    }
  };

  const handlePrevImage = () => {
    if (!property) return;
    setSelectedImage((current) => 
      current === 0 ? property.images.length - 1 : current - 1
    );
  };

  const handleNextImage = () => {
    if (!property) return;
    setSelectedImage((current) => 
      current === property.images.length - 1 ? 0 : current + 1
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-[#7B341E] animate-spin mb-4" />
        <p className="text-[#7B341E]">Loading property details...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-[#7B341E] mb-4">
          {error || 'Property not found'}
        </h2>
        <p className="text-[#7B341E]/70 mb-8">
          We couldn't find the property you're looking for.
        </p>
        <Link href="/properties">
          <Button className="bg-[#7B341E] text-white hover:bg-[#266044]">
            View All Properties
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Property Images */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
            <img
              src={property.images[selectedImage].url}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
        <div className="grid grid-cols-4 gap-4">
            {property.images.map((image, index) => (
            <button
                key={image.publicId}
              onClick={() => setSelectedImage(index)}
                className={`aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-[#7B341E]' : 'border-transparent'
              }`}
            >
              <img
                  src={image.url}
                  alt={`${property.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

        {/* Property Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="px-3 py-1 bg-[#FFE4C9] text-[#7B341E] rounded-full text-sm font-medium">
                For {property.listingType === 'rent' ? 'Rent' : 'Sale'}
              </span>
              <span className="px-3 py-1 bg-[#266044] text-white rounded-full text-sm font-medium">
                {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#7B341E] mb-2">{property.title}</h1>
            <div className="flex items-center text-[#7B341E]/70">
              <MapPin className="w-5 h-5 mr-2" />
              <span>
                {property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between py-4 border-y-2 border-[#7B341E]/20">
            <div className="text-center">
              <Bed className="w-6 h-6 mx-auto text-[#7B341E] mb-1" />
              <span className="block text-sm text-[#7B341E]/70">Bedrooms</span>
              <span className="block font-semibold text-[#7B341E]">{property.features.bedrooms}</span>
            </div>
            <div className="text-center">
              <Bath className="w-6 h-6 mx-auto text-[#7B341E] mb-1" />
              <span className="block text-sm text-[#7B341E]/70">Bathrooms</span>
              <span className="block font-semibold text-[#7B341E]">{property.features.bathrooms}</span>
                </div>
            <div className="text-center">
              <Square className="w-6 h-6 mx-auto text-[#7B341E] mb-1" />
              <span className="block text-sm text-[#7B341E]/70">Square Feet</span>
              <span className="block font-semibold text-[#7B341E]">{property.features.squareFeet}</span>
            </div>
            <div className="text-center">
              <Car className="w-6 h-6 mx-auto text-[#7B341E] mb-1" />
              <span className="block text-sm text-[#7B341E]/70">Parking</span>
              <span className="block font-semibold text-[#7B341E]">{property.features.parking || 0}</span>
            </div>
            <div className="text-center">
              <Home className="w-6 h-6 mx-auto text-[#7B341E] mb-1" />
              <span className="block text-sm text-[#7B341E]/70">Type</span>
              <span className="block font-semibold text-[#7B341E]">{property.features.propertyType}</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#7B341E] mb-4">Description</h2>
            <p className="text-[#7B341E]/70 whitespace-pre-line">{property.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#7B341E] mb-4">Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center text-[#7B341E]/70">
                  <Check className="w-5 h-5 mr-2 text-[#266044]" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Price and Contact Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-[#7B341E] mb-4">About this property</h2>
            <div className="prose text-[#7B341E]/70">
              <p>
                This {property.features.propertyType.toLowerCase()} is currently available for{' '}
                {property.listingType === 'rent' ? 'rent' : 'sale'} in {property.location.city}.
                {property.features.furnished && ' The property comes fully furnished.'}
              </p>
              <p className="mt-4">
                With {property.features.bedrooms} bedrooms and {property.features.bathrooms} bathrooms,
                this {property.features.squareFeet} square foot property is perfect for{' '}
                {property.features.bedrooms > 2 ? 'families' : 'individuals or couples'}.
              </p>
              {property.features.parking && property.features.parking > 0 && (
                <p className="mt-4">
                  The property includes {property.features.parking} parking space
                  {property.features.parking > 1 ? 's' : ''}.
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-[#7B341E]">
                {formatPrice(property.price.amount)}
                {property.listingType === 'rent' && property.price.frequency && (
                  <span className="text-lg font-normal">
                    /{property.price.frequency === 'yearly' ? 'yr' : 'mo'}
                  </span>
                )}
              </div>
              {property.price.type === 'negotiable' && (
                <span className="text-sm text-[#7B341E]/70">Price is negotiable</span>
              )}
            </div>

            {!showContactForm ? (
              <div className="space-y-4">
                <Button
                  className="w-full bg-[#7B341E] text-white hover:bg-[#266044]"
                  onClick={() => setShowContactForm(true)}
                >
                  Contact {property.listingType === 'rent' ? 'Landlord' : 'Agent'}
                </Button>
                <Button
                  variant="outline"
                  className={`w-full border-2 ${
                    isSaved 
                      ? 'border-[#266044] text-[#266044] hover:bg-[#266044]' 
                      : 'border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E]'
                  } hover:text-white`}
                  onClick={handleSaveProperty}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                  ) : isSaved ? (
                    'Saved'
                  ) : (
                    'Save Property'
                  )}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#7B341E] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                    required
                  />
              </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#7B341E] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                    required
                  />
                  </div>
                  <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#7B341E] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#7B341E] mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                    required
                    defaultValue={`Hi, I am interested in this ${property.features.propertyType.toLowerCase()} for ${property.listingType}. Please contact me with more information.`}
                  />
                </div>
                <Button type="submit" className="w-full bg-[#7B341E] text-white hover:bg-[#266044]">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
} 