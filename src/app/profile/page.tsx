'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { mockUsers, type User } from '@/data/mockData';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProfilePage() {
  // Mock current user (using first user from mock data)
  const currentUser = mockUsers[0];

  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update
    console.log('Profile update:', formData);
    setIsEditing(false);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-[#FFE4C9] border-b-2 border-[#7B341E]">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full bg-[#7B341E] flex items-center justify-center text-white text-4xl font-bold">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[#7B341E] mb-2">{currentUser.name}</h1>
                <p className="text-[#7B341E]/70 text-lg">
                  {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} Account
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex space-x-4 mb-8 border-b-2 border-[#7B341E]">
            <button
              className={
                activeTab === 'profile'
                  ? 'px-6 py-3 text-lg font-medium text-[#7B341E] border-b-2 border-[#7B341E] -mb-0.5'
                  : 'px-6 py-3 text-lg font-medium text-[#7B341E]/60 hover:text-[#7B341E]'
              }
              onClick={() => setActiveTab('profile')}
            >
              Profile Information
            </button>
            <button
              className={
                activeTab === 'password'
                  ? 'px-6 py-3 text-lg font-medium text-[#7B341E] border-b-2 border-[#7B341E] -mb-0.5'
                  : 'px-6 py-3 text-lg font-medium text-[#7B341E]/60 hover:text-[#7B341E]'
              }
              onClick={() => setActiveTab('password')}
            >
              Change Password
            </button>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl border-2 border-[#7B341E] shadow-sm p-8">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[#7B341E] mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#7B341E] mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-[#7B341E] mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end space-x-4">
                    {isEditing ? (
                      <>
                        <Button
                          type="button"
                          variant="outline"
                          className="border-2 border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E] hover:text-white"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-[#7B341E] hover:bg-[#266044] text-white transition-colors"
                        >
                          Save Changes
                        </Button>
                      </>
                    ) : (
                      <Button
                        type="button"
                        className="bg-[#7B341E] hover:bg-[#266044] text-white transition-colors"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'password' && (
              <div className="bg-white rounded-xl border-2 border-[#7B341E] shadow-sm p-8">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="currentPassword"
                        className="block text-sm font-medium text-[#7B341E] mb-1"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                        value={formData.currentPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, currentPassword: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-[#7B341E] mb-1"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                        value={formData.newPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, newPassword: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-[#7B341E] mb-1"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, confirmPassword: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <Button
                      type="submit"
                      className="bg-[#7B341E] hover:bg-[#266044] text-white transition-colors"
                    >
                      Update Password
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 