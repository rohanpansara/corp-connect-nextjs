import { apiClient } from '@/app/api/apiClient'
import { AddUserFormValues } from '@/app/api/interfaces/AddUserFormValues' // Adjust the import according to your file structure
import ToastManager from '@/utils/toastManager'
import { FormikHelpers } from 'formik'

export const handleAddUserSubmit = async (
  values: AddUserFormValues,
  { resetForm, setSubmitting }: FormikHelpers<AddUserFormValues>,
) => {
  try {
    const response = await apiClient.post('/public/new-user', values)
    // Show success message from the response (if available)
    ToastManager.toast({
      title: 'Success',
      description: response?.data?.message || 'User addedd successfully',
      variant: 'success',
    })
    resetForm()
  } catch (error: any) {
    // Show error message from the response or fallback to a default message
    const errorMessage = error?.response?.data?.message || 'Failed to add user'
    ToastManager.toast({
      title: 'Something went wrong',
      description: 'Something went wrong',
      variant: 'error',
      action: {
        altText: 'Token Refresh Failed',
        onClick: () => {},
        label: 'Token Refresh',
      },
    })
  } finally {
    setSubmitting(false)
  }
}
