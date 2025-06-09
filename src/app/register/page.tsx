'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';

type UserType = 'tenant' | 'landlord';

export default function RegisterPage() {
  const [userType, setUserType] = useState<UserType>('tenant');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const { register } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const { success, role } = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        userType: userType
      });

      if (success && role) {
        router.push(`/dashboard/${role}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Failed to register. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#DCFFEF] to-[#FFE4C9]">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl border-2 border-[#7B341E] shadow-sm p-8">
          <div className="text-center">
            <Link href="/" className="inline-block mb-8">
              <img 
                src="/logo.png" 
                alt="Homie Logo" 
                className="h-8 w-auto mx-auto"
              />
            </Link>
            <h2 className="text-3xl font-bold text-[#7B341E] mb-2">
              Create your account
            </h2>
            <p className="text-[#7B341E]">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-[#266044] hover:text-[#4DC68C]"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* User Type Selection */}
          <div className="mt-8 flex rounded-lg shadow-sm">
            <button
              type="button"
              className={`w-1/2 py-3 px-4 text-sm font-medium rounded-l-lg focus:outline-none border-2 ${
                userType === 'tenant'
                  ? 'bg-[#7B341E] text-white border-[#7B341E]'
                  : 'bg-white text-[#7B341E] border-[#7B341E] hover:bg-[#7B341E] hover:text-white'
              }`}
              onClick={() => setUserType('tenant')}
            >
              I want to rent
            </button>
            <button
              type="button"
              className={`w-1/2 py-3 px-4 text-sm font-medium rounded-r-lg focus:outline-none border-2 ${
                userType === 'landlord'
                  ? 'bg-[#7B341E] text-white border-[#7B341E]'
                  : 'bg-white text-[#7B341E] border-[#7B341E] hover:bg-[#7B341E] hover:text-white'
              }`}
              onClick={() => setUserType('landlord')}
            >
              I want to list property
            </button>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#7B341E] mb-1">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className={`w-full px-4 py-3 rounded-lg bg-transparent border-2 ${
                      errors.firstName ? 'border-red-500' : 'border-[#7B341E]'
                    } focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]`}
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#7B341E] mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className={`w-full px-4 py-3 rounded-lg bg-transparent border-2 ${
                      errors.lastName ? 'border-red-500' : 'border-[#7B341E]'
                    } focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]`}
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#7B341E] mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`w-full px-4 py-3 rounded-lg bg-transparent border-2 ${
                    errors.email ? 'border-red-500' : 'border-[#7B341E]'
                  } focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]`}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#7B341E] mb-1">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className={`w-full px-4 py-3 rounded-lg bg-transparent border-2 ${
                    errors.phone ? 'border-red-500' : 'border-[#7B341E]'
                  } focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]`}
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#7B341E] mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`w-full px-4 py-3 rounded-lg bg-transparent border-2 ${
                    errors.password ? 'border-red-500' : 'border-[#7B341E]'
                  } focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]`}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#7B341E] mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className={`w-full px-4 py-3 rounded-lg bg-transparent border-2 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-[#7B341E]'
                  } focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]`}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div>
              <Button 
                type="submit" 
                fullWidth 
                isLoading={isLoading}
                className="bg-[#7B341E] hover:bg-[#266044] text-white transition-colors"
              >
                Create Account
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-[#7B341E]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#7B341E]">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                fullWidth
                className="border-2 border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E] hover:text-white"
                onClick={() => {
                  // TODO: Implement Google Sign In
                  console.log('Google Sign In');
                }}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.447,1.563-1.491,2.918-2.918,3.809 c-1.427,0.891-3.082,1.273-4.745,1.091c-1.664-0.182-3.209-0.909-4.382-2.082c-1.173-1.173-1.9-2.718-2.082-4.382 c-0.182-1.664,0.2-3.318,1.091-4.745c0.891-1.427,2.245-2.471,3.809-2.918c1.563-0.447,3.236-0.447,4.8,0 c1.563,0.447,2.918,1.491,3.809,2.918c0.091,0.145,0.137,0.318,0.137,0.5c0,0.336-0.137,0.664-0.373,0.9l-5.09,5.09 C12.882,12.514,12.545,12.151,12.545,12.151z M23.5,12.151L23.5,12.151c0-0.336-0.137-0.664-0.373-0.9l-5.09-5.09 c-0.236-0.236-0.564-0.373-0.9-0.373c-0.182,0-0.355,0.046-0.5,0.137c-1.427,0.891-2.471,2.245-2.918,3.809 c-0.447,1.563-0.447,3.236,0,4.8c0.447,1.563,1.491,2.918,2.918,3.809c0.145,0.091,0.318,0.137,0.5,0.137 c0.336,0,0.664-0.137,0.9-0.373l5.09-5.09C23.363,12.815,23.5,12.487,23.5,12.151z" />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                fullWidth
                className="border-2 border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E] hover:text-white"
                onClick={() => {
                  // TODO: Implement Facebook Sign In
                  console.log('Facebook Sign In');
                }}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 