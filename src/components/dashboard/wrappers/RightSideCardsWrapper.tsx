'use client'

import { apiClient } from '@/app/api/apiClient'
import { AttendanceAverageCardDTO } from '@/types/CardDataDTO'
import { useEffect, useState } from 'react'
import RightSideCards from '../RightSideCards'
import { Skeleton } from '@/components/ui/skeleton'

interface RightSideCardsDTO {
  todayAttendanceCard: AttendanceAverageCardDTO
  weeklyAttendanceCard: AttendanceAverageCardDTO
}

const RightSideCardsWrapper = () => {
  const [cardData, setCardData] = useState<RightSideCardsDTO | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/dashboard/cards/right')
        setCardData(response.data.data)
      } catch (error) {
        console.error('Error fetching card data:', error)
      }
    }

    fetchData()
  }, [])

  if (!cardData) {
    return (
      <div className='w-1/2 h-full gap-1 flex'>
        <Skeleton className='w-1/2 h-full' />
        <Skeleton className='w-1/2 h-full' />
      </div>
    )
  }

  return <RightSideCards data={cardData} />
}

export default RightSideCardsWrapper
