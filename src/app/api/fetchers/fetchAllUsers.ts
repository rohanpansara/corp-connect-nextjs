import { apiClient } from '@/app/api/apiClient'
import ToastManager from '@/utils/toastManager'
import { FetchUsersDataProps } from '../interfaces/props/FetchUserDataProps'

export const fetchAllUsers = async ({
  setUsersData,
  setNoResultFound,
  setError,
  setLoading,
  onNavigate,
  filter,
}: FetchUsersDataProps) => {
  setLoading(true)

  try {
    const response = await apiClient.get('/user?deleted=false')

    if (response.data?.data) {
      if (response.data.data.length === 0) {
        setNoResultFound(true)
      }
      setUsersData(response.data.data)
    } else {
      setError('No data found')
    }
  } catch (err: any) {
    if (err.response) {
      if (err.response.status == 401 || err.response.status == 403) {
        onNavigate('/auth/login')
        ToastManager.toast({
          title: 'You are not logged in',
          description: err.response,
          variant: 'error',
        })
      } else if (err.response.status == 500) {
        ToastManager.toast({
          title: "You don't have access to this record",
          description: err.response,
          variant: 'error',
        })
      } else {
        setError(`Error: ${err.response.status} - ${err.response.data.message || 'Failed to fetch users data'}`)
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
