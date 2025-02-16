// src/app/api/handlers/DeleteUsersSubmit.ts
import { apiClient } from '@/app/api/apiClient'
import ToastManager from '@/utils/toastManager'

export const deleteUsers = async (userIdList: string[]): Promise<void> => {
  try {
    if (userIdList.length === 0) {
      ToastManager.toast({
        title: 'Warning',
        description: 'No users selected for deletion',
        variant: 'warning',
      })
      return
    }

    const queryString = `userIdsToDelete=${userIdList.join(',')}`

    const response = await apiClient.delete(`/user?${queryString}`)

    if (response.status === 200) {
      const message = userIdList.length === 1 ? 'User record deleted successfully' : 'User records deleted successfully'

      ToastManager.toast({
        title: 'Success',
        description: message,
        variant: 'success',
      })
    } else {
      throw new Error(response.data?.message || 'Failed to delete users')
    }
  } catch (error: any) {
    console.error('Error deleting users:', error)

    ToastManager.toast({
      title: 'Error',
      description: error.response?.data?.message || 'An error occurred while deleting users',
      variant: 'error',
    })

    throw error
  }
}
