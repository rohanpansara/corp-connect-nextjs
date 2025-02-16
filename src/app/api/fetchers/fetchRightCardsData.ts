import { apiClient } from '@/app/api/apiClient'
import ToastManager from '@/utils/toastManager'
import { FetchCardsDataProps, CardsData } from '../interfaces/props/FetchDashboardCardDataProps'

export const fetchRightCardsData = async ({ setCardsData, setError, setLoading, onNavigate }: FetchCardsDataProps) => {
  try {
    setLoading(true)
    const response = await apiClient.get('/dashboard/cards/right')
    setCardsData(response.data.data as CardsData)
  } catch (err: any) {
    if (err.response) {
      if (err.response.status === 401 || err.response.status === 403) {
        onNavigate('/auth/login')
        ToastManager.toast({
          title: 'You are not logged in',
          description: err.response,
          variant: 'error',
          action: {
            altText: 'Token Refresh Failed',
            onClick: () => {},
            label: 'Token Refresh',
          },
        })
      } else {
        setError(`Error: ${err.response.status} - ${err.response.data.message || 'Failed to fetch cards'}`)
      }
    } else if (err.request) {
      setError('Network error: Failed to receive a response')
    } else {
      setError(`Error: ${err.message}`)
    }
  } finally {
    setLoading(false)
  }
}
