import { apiClient } from '@/app/api/apiClient'
import ToastManager from '@/utils/toastManager'

export const handleLoginSubmit = async (
  values: { email: string; password: string },
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  onNavigate: (path: string) => void, 
) => {
  setLoading(true)

  try {
    const response = await apiClient.post('/auth/login', values)

    if (response.status === 200) {
      ToastManager.toast({
        title: 'Success',
        description: response.data.message,
        variant: 'success',
      })

      setLoading(false)

      // Navigate to the dashboard
      onNavigate('/dashboard')
    }
  } catch (err: any) {
    const errorMessage = err?.response?.data?.message || 'An unexpected error occurred. Please try again later.'

    if (err.response) {
      if (err.response.status === 401 || err.response.status === 403) {
        onNavigate('/auth/login')
        ToastManager.toast({
          title: 'Unauthorized',
          description: 'Please log in again',
          variant: 'error',
          action: {
            altText: 'Login Required',
            onClick: () => {},
            label: 'Login Again',
          },
        })
      } else if (err.response.status === 409) {
        onNavigate('/auth/login')
        console.log(err.response)
        ToastManager.toast({
          title: err.response?.data?.message || 'Your account is needs to be verified',
          variant: 'error',
        })
      }
    } else {
      ToastManager.toast({
        title: 'Error',
        description: errorMessage,
        variant: 'error',
        action: {
          altText: 'Retry',
          onClick: () => {},
          label: 'Retry',
        },
      })
    }

    setLoading(false)

  } finally {
    setLoading(false)
  }
}
