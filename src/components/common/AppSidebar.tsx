'use client'

import { apiClient } from '@/app/api/apiClient'
import ProtectedContent from '@/components/common/ProtectedContent'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { doesSegmentExistInUrl, getLastPathSegment } from '@/utils/getLastURLSegment'
import ToastManager from '@/utils/toastManager'
import clsx from 'clsx'
import { Poppins } from 'next/font/google'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  PiCalendarDotsLight,
  PiCalendarXLight,
  PiClockUserLight,
  PiGearLight,
  PiSignOutLight,
  PiSquaresFourLight,
  PiUsersLight,
  PiUserSquareLight,
} from 'react-icons/pi'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

// Menu items with role-based access.
const upperMenuItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: PiSquaresFourLight,
    roles: ['User']
  },
  {
    title: 'Leaves',
    url: '/leaves',
    icon: PiCalendarXLight,
    roles: ['User'],
    permissions: ['user:read']
  },
  {
    title: 'Attendance',
    url: '/attendance',
    icon: PiClockUserLight,
    permissions: ['user:read'],
  },
  {
    title: 'Events',
    url: '/events',
    icon: PiCalendarDotsLight,
    permissions: ['user:read'],
  },
  { title: 'Users', url: '/users', icon: PiUsersLight, roles: ['Admin'] },
]

const lowerMenuItems = [
  { title: 'Profile', url: '/profile', icon: PiUserSquareLight },
  { title: 'Settings', url: '/settings', icon: PiGearLight },
  { title: 'Logout', url: '/auth/login', icon: PiSignOutLight },
]

type AppSidebarProps = {
  userId: string
}

export function AppSidebar({ userId }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const currentSegment = getLastPathSegment(pathname)
  const [loading, setLoading] = useState(false)

  // Handle logout
  const handleLogout = async () => {
    setLoading(true)
    try {
      const response = await apiClient.post('/user/logout')
      if (response?.status === 200) {
        router.push('/auth/login')
        ToastManager.toast({
          title: 'Success',
          description: 'User logged out',
          variant: 'success',
        })
      } else {
        console.error('Logout failed', response)
      }
    } catch (error) {
      console.error('Error during logout', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sidebar collapsible='icon'>
      <SidebarContent className={`bg-sidebarBackground ${poppins.className}`}>
        <SidebarGroup>
          <SidebarGroupLabel>CorpConnect</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {upperMenuItems.map(item => (
                <ProtectedContent
                  key={item.title}
                  allowedRoles={item.roles}
                  allowedPermissions={item.permissions}
                >
                  <SidebarMenuItem className='group'>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className={clsx(
                          'anchor-common',
                          doesSegmentExistInUrl(item.url, currentSegment)
                            ? 'anchor-active'
                            : 'anchor-inactive',
                        )}
                      >
                        <item.icon
                          className={clsx(
                            'icon-common',
                            doesSegmentExistInUrl(item.url, currentSegment)
                              ? 'icon-active'
                              : 'icon-inactive',
                          )}
                        />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </ProtectedContent>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>User</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {lowerMenuItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.title === 'Logout' ? (
                      <button
                        onClick={handleLogout}
                        className={clsx(
                          'anchor-common',
                          doesSegmentExistInUrl(item.url.toLowerCase(), currentSegment)
                            ? 'anchor-active'
                            : 'anchor-inactive',
                        )}
                        disabled={loading}
                      >
                        <item.icon
                          className={clsx(
                            'icon-common',
                            doesSegmentExistInUrl(item.url.toLowerCase(), currentSegment)
                              ? 'icon-active'
                              : 'icon-inactive',
                          )}
                        />
                        <span>{loading ? 'Logging out...' : item.title}</span>
                      </button>
                    ) : (
                      <a
                        href={item.url}
                        className={clsx(
                          'anchor-common',
                          doesSegmentExistInUrl(item.url.toLowerCase(), currentSegment)
                            ? 'anchor-active'
                            : 'anchor-inactive',
                        )}
                      >
                        <item.icon
                          className={clsx(
                            'icon-common',
                            doesSegmentExistInUrl(item.url.toLowerCase(), currentSegment)
                              ? 'icon-active'
                              : 'icon-inactive',
                          )}
                        />
                        <span>{item.title}</span>
                      </a>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
