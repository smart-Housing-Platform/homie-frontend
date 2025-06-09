'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Button from './ui/Button';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="px-4 py-4">
      <nav className="max-w-7xl mx-auto bg-white rounded-xl border-2 border-[#7B341E]">
        <div className="px-8 py-2">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img 
                  src="/logo.png" 
                  alt="Homie Logo" 
                  className="h-8 w-auto"
                />
              </Link>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <Link
                  href="/properties"
                  className="text-[#7B341E]/70 hover:text-[#7B341E] px-3 py-2 text-md font-semibold"
                >
                  Properties
                </Link>
                <Link
                  href="/about"
                  className="text-[#7B341E]/70 hover:text-[#7B341E] px-3 py-2 text-md font-semibold"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-[#7B341E]/70 hover:text-[#7B341E] px-3 py-2 text-md font-semibold"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  {/* Dashboard link based on user role */}
                  <Link
                    href={`/dashboard/${user.role}`}
                    className="text-[#7B341E]/70 hover:text-[#7B341E] px-3 py-2 text-md font-semibold"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="text-[#7B341E]/70 hover:text-[#7B341E] px-3 py-2 text-md font-semibold"
                  >
                    Profile
                  </Link>
                  <Button
                    onClick={logout}
                    variant="outline"
                    className="border-2 border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E] hover:text-white"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="border-2 border-[#7B341E] text-[#7B341E] hover:bg-[#7B341E] hover:text-white"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-[#7B341E] hover:bg-[#266044] text-white transition-colors">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
} 