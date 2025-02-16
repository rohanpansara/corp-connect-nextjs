'use client'

import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import Notification from '../Notification'

export interface AppNotification {
  id: string
  icon: JSX.Element
  message: string
}

const NotificationWrapper = () => {
  const [notifications, setNotifications] = useState<AppNotification[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications') // Replace with actual API endpoint
        const data: AppNotification[] = await response.json()
        setNotifications(data)
      } catch (err) {
        setError('Failed to fetch notifications')
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  if (loading) {
    return <Skeleton className='w-8 h-8 rounded-full' />
  }

  if (error) {
    return <div className='text-red-500 text-sm'>{error}</div>
  }

  return notifications ? <Notification notifications={notifications} /> : null
}

export default NotificationWrapper
