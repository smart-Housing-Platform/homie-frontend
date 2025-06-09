'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import PageLoading from '@/components/ui/PageLoading';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login, isLoading: isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <PageLoading />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { success, role } = await login(formData.email, formData.password);
      if (success && role) {
        router.push(`/dashboard/${role}`);
      } else {
        setError('Invalid email or password');
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE4C9] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl border-2 border-[#7B341E] shadow-sm p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#7B341E]">Welcome Back</h1>
          <p className="mt-2 text-[#7B341E]/70">
            Sign in to continue to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

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
              required
              className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#7B341E] mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7B341E] focus:outline-none focus:ring-2 focus:ring-[#7B341E] placeholder-[#7B341E]/50 text-[#7B341E]"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 rounded border-[#7B341E] text-[#266044] focus:ring-[#266044]"
                checked={formData.rememberMe}
                onChange={(e) =>
                  setFormData({ ...formData, rememberMe: e.target.checked })
                }
                disabled={isLoading}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-[#7B341E]"
              >
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className={`text-sm text-[#266044] hover:text-[#7B341E] ${
                isLoading ? 'pointer-events-none opacity-50' : ''
              }`}
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#7B341E] hover:bg-[#266044] text-white transition-colors py-3"
            isLoading={isLoading}
          >
            Sign In
          </Button>

          <div className="text-center">
            <span className="text-[#7B341E]/70">Don&apos;t have an account? </span>
            <Link
              href="/register"
              className={`text-[#266044] hover:text-[#7B341E] font-medium ${
                isLoading ? 'pointer-events-none opacity-50' : ''
              }`}
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 