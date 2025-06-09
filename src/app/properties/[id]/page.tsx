'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

// Mock property data (in real app, this would be fetched from an API)
const mockProperty = {
  id: '1',
  title: 'Modern Downtown Apartment',
  description: 'Beautiful modern apartment in the heart of downtown. Recently renovated with high-end finishes and appliances. Perfect for young professionals or couples.',
  price: 2500,
  location: {
    address: '123 Main Street',
    city: 'Downtown',
    state: 'NY',
    zipCode: '10001',
  },
  features: {
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    propertyType: 'Apartment',
    yearBuilt: 2015,
  },
  amenities: [
    'Central Air',
    'In-unit Laundry',
    'Dishwasher',
    'Hardwood Floors',
    'Parking',
    'Gym',
    'Pet Friendly',
  ],
  images: [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop',
  ],
  landlord: {
    id: '123',
    name: 'John Doe',
    phone: '(555) 123-4567',
    email: 'john@example.com',
  },
};

export default function PropertyDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Auto-advance images every 5 seconds when isPlaying is true
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSelectedImage((current) => 
        current === mockProperty.images.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    console.log('Contact form submitted:', contactForm);
    setShowContactForm(false);
  };

  const handlePrevImage = () => {
    setSelectedImage((current) => 
      current === 0 ? mockProperty.images.length - 1 : current - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((current) => 
      current === mockProperty.images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-[60vh] bg-[#7B341E]">
          <img
            src={mockProperty.images[selectedImage]}
            alt={`Property image ${selectedImage + 1}`}
          className="w-full h-full object-cover opacity-90 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Image Navigation Controls */}
        <div className="absolute inset-x-0 bottom-1/2 flex justify-between items-center px-4">
          <button
            onClick={handlePrevImage}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-[#7B341E] transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNextImage}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-[#7B341E] transition-colors"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Slideshow Controls */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full bg-white/80 text-[#7B341E] text-sm font-medium">
            {selectedImage + 1} / {mockProperty.images.length}
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-[#7B341E] transition-colors"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">{mockProperty.title}</h1>
            <p className="text-lg opacity-90">
              {mockProperty.location.address}, {mockProperty.location.city}, {mockProperty.location.state} {mockProperty.location.zipCode}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl border-2 border-[#7B341E] shadow-sm p-6">
        <div className="grid grid-cols-4 gap-4">
          {mockProperty.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
                    className={`relative aspect-w-16 aspect-h-9 transition-transform duration-300 hover:scale-105 ${
                      selectedImage === index ? 'ring-2 ring-[#266044]' : ''
              }`}
            >
              <img
                src={image}
                alt={`Property thumbnail ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            </button>
          ))}
        </div>
      </div>

            {/* Property Features */}
            <div className="bg-[#FFE4C9] rounded-xl border-2 border-[#7B341E] shadow-sm p-8">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-lg border-2 border-[#7B341E]">
                  <svg className="w-8 h-8 mx-auto mb-2 text-[#266044]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <p className="text-[#7B341E] font-medium">Bedrooms</p>
                  <p className="text-2xl font-bold text-[#7B341E]">{mockProperty.features.bedrooms}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border-2 border-[#7B341E]">
                  <svg className="w-8 h-8 mx-auto mb-2 text-[#266044]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-[#7B341E] font-medium">Bathrooms</p>
                  <p className="text-2xl font-bold text-[#7B341E]">{mockProperty.features.bathrooms}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border-2 border-[#7B341E]">
                  <svg className="w-8 h-8 mx-auto mb-2 text-[#266044]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <p className="text-[#7B341E] font-medium">Square Feet</p>
                  <p className="text-2xl font-bold text-[#7B341E]">{mockProperty.features.squareFeet}</p>
            </div>
            </div>
          </div>

            {/* Description */}
            <div className="bg-white rounded-xl border-2 border-[#7B341E] shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-[#7B341E] mb-4">About this property</h2>
              <p className="text-[#7B341E]/70 leading-relaxed">{mockProperty.description}</p>
          </div>

            {/* Amenities */}
            <div className="bg-[#E8F5E9] rounded-xl border-2 border-[#7B341E] shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-[#7B341E] mb-6">Featured Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {mockProperty.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center bg-white p-4 rounded-lg border-2 border-[#7B341E]">
                  <svg
                      className="w-6 h-6 text-[#266044] mr-3 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                    <span className="text-[#7B341E] font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

          {/* Sidebar */}
        <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Price Card */}
              <div className="bg-white rounded-xl border-2 border-[#7B341E] shadow-sm p-8">
            <div className="text-center mb-6">
                  <p className="text-4xl font-bold text-[#266044]">${mockProperty.price}</p>
                  <p className="text-[#7B341E]/70 text-lg">per month</p>
            </div>

            {showContactForm ? (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                      className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  required
                />
                <input
                  type="tel"
                  placeholder="Your Phone"
                      className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                  value={contactForm.phone}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, phone: e.target.value })
                  }
                />
                <textarea
                  placeholder="Your Message"
                      className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  required
                />
                    <Button 
                      type="submit" 
                      fullWidth
                      className="bg-[#7B341E] hover:bg-[#266044] text-white transition-colors"
                    >
                  Send Message
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <Button
                  fullWidth
                      className="bg-[#7B341E] hover:bg-[#266044] text-white transition-colors"
                  onClick={() => setShowContactForm(true)}
                >
                  Contact Landlord
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                      className="border-2 border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E] hover:text-white"
                >
                  Schedule Viewing
                </Button>
              </div>
            )}
              </div>

              {/* Landlord Info */}
              <div className="bg-[#FFE4C9] rounded-xl border-2 border-[#7B341E] shadow-sm p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#7B341E] flex items-center justify-center text-white text-xl font-bold">
                    {mockProperty.landlord.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-[#7B341E]">Listed by</p>
                    <p className="text-lg font-semibold text-[#7B341E]">{mockProperty.landlord.name}</p>
                  </div>
                </div>
                <div className="space-y-2 text-[#7B341E]/70">
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {mockProperty.landlord.email}
                  </p>
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {mockProperty.landlord.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 