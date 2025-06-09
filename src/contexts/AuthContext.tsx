'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type User, mockUsers } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; role?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; role?: string }>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userType: 'tenant' | 'landlord';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for saved auth state in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call with mock data
    // In a real app, this would be an actual API call
    const foundUser = mockUsers.find(u => u.email === email);
    
    // Simple mock password validation (in real app, this would be proper password hashing)
    if (foundUser && password.length > 0) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return { success: true, role: foundUser.role };
    }
    return { success: false };
  };

  const register = async (userData: RegisterData) => {
    // Simulate API call
    // In a real app, this would be an actual API call to create a new user
    const newUser: User = {
      id: String(mockUsers.length + 1),
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      role: userData.userType,
      phone: userData.phone,
      verified: false,
      createdAt: new Date().toISOString()
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return { success: true, role: userData.userType };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 