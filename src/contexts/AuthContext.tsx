'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { authService, LoginCredentials, RegisterData } from '@/services/auth.service';
import { toast } from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; role?: string }>;
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    userType: 'tenant' | 'landlord';
  }) => Promise<{ success: boolean; role?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const user = await authService.getProfile();
          setUser(user);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        authService.logout();
        toast.error('Session expired. Please login again.');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await authService.login({ email, password });
      setUser(user);
      toast.success('Welcome back! Successfully logged in.');
      return { success: true, role: user.role };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
      throw error;
    }
  };

  const register = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    userType: 'tenant' | 'landlord';
  }) => {
    try {
      const user = await authService.register({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
        role: data.userType
      });
      setUser(user);
      toast.success('Registration successful! Welcome to Homie.');
      return { success: true, role: user.role };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast.success('Successfully logged out. See you soon!');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
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