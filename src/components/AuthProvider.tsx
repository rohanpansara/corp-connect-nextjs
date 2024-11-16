"use client"

// components/AuthProvider.tsx
import { apiClient } from '@/app/api/apiClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from './Loader';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await apiClient.get('/user/validate-token'); // Backend verifies the token in the cookie
        setIsAuthenticated(true);
      } catch {
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <Loader />; // Show a loader while checking authentication
  }

  return <>{isAuthenticated ? children : null}</>;
}
