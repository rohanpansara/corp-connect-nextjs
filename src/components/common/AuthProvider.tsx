'use client'

import { apiClient } from '@/app/api/apiClient'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import Loader from './Loader'

// Define AuthContext type
type AuthContextType = {
  isAuthenticated: boolean
  role: string | null
  permissions: string[]
}

export function getClientCookie(cookieName: string): string {
  if (typeof document === 'undefined') return ''
  const cookiesArray = document.cookie.split('; ')
  const cookie = cookiesArray.find(row => row.startsWith(`${cookieName}=`))
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : ''
}

// Create context
const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState<string | null>(null)
  const [permissions, setPermissions] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await apiClient.get('/auth/validate/token')
        setIsAuthenticated(true)

        // Extract user role
        const userRole = getClientCookie('User_Role') || null
        setRole(userRole)

        // Extract and decode permissions
        const encodedPermissions = getClientCookie('User_Permission')
        if (encodedPermissions) {
          const decodedPermissions = decodeURIComponent(encodedPermissions)
          const permissionArray = decodedPermissions.split('-')
          setPermissions(permissionArray)
        }
      } catch {
        router.push('/auth/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) return <Loader />

  return <AuthContext.Provider value={{ isAuthenticated, role, permissions }}>{children}</AuthContext.Provider>
}

// Hook to use authentication state
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
