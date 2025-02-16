import { useAuth } from './AuthProvider'

type ProtectedContentProps = {
  allowedRoles?: string[]
  allowedPermissions?: string[]
  children: React.ReactNode
}

export default function ProtectedContent({
  allowedRoles = [],
  allowedPermissions = [],
  children,
}: ProtectedContentProps) {
  const { role, permissions = [] } = useAuth() // Ensure permissions defaults to an empty array

  // Check if the user has the required role
  const hasRole = allowedRoles.length === 0 || (role && allowedRoles.includes(role))

  // Check if the user has at least one required permission
  const hasPermission = allowedPermissions.length === 0 || permissions.some(p => allowedPermissions.includes(p))

  // Only render children if the user meets the required role or permission
  if (!hasRole && !hasPermission) return null

  return <>{children}</>
}
