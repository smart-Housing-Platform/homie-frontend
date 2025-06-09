'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="bg-background min-h-screen py-4 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#DCFFEF] to-[#FFE4C9] rounded-xl border-2 border-[#7B341E] shadow-sm p-8">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F1B1C] to-[#B53E41] text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-[#7B341E] text-xl mb-6">
            We&apos;re here to help with any questions you might have.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <section className="bg-white rounded-xl border-2 border-[#7B341E] shadow-sm p-8">
            <h2 className="text-2xl font-bold text-[#7B341E] mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#7B341E] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#7B341E] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#7B341E] mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] text-[#7B341E]"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="business">Business Opportunity</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#7B341E] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#7B341E] text-white hover:bg-[#266044] transition-colors"
              >
                Send Message
              </Button>
            </form>
          </section>

          {/* Contact Information */}
          <section className="space-y-8">
            <div className="bg-[#E8F5E9] rounded-xl border-2 border-[#266044] shadow-sm p-8">
              <h2 className="text-2xl font-bold text-[#266044] mb-6">Other Ways to Reach Us</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#266044] mb-2">Email</h3>
                  <p className="text-[#266044]">support@homie.com</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#266044] mb-2">Phone</h3>
                  <p className="text-[#266044]">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#266044] mb-2">Office Hours</h3>
                  <p className="text-[#266044]">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                </div>
              </div>
            </div>

            <div className="bg-[#FFE4C9] rounded-xl border-2 border-[#7B341E] shadow-sm p-8">
              <h2 className="text-2xl font-bold text-[#7B341E] mb-6">FAQ</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#7B341E] mb-2">How long does it take to get a response?</h3>
                  <p className="text-[#7B341E]">We typically respond within 24 hours during business days.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#7B341E] mb-2">Is there an emergency contact?</h3>
                  <p className="text-[#7B341E]">For urgent matters, please call our support line directly.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 