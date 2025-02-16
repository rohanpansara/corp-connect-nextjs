import { apiClient } from '@/app/api/apiClient'
import ToastManager from '@/utils/toastManager'
import { FormikHelpers } from 'formik'
import { EditUserFormValues } from '../interfaces/EditUserFormValues'

export const handleEditUserSubmit = async (
  values: EditUserFormValues,
  { resetForm, setSubmitting }: FormikHelpers<EditUserFormValues>,
) => {
  try {
    const response = await apiClient.put(`/user/${values?.id}`, values)

    const successMessage = response?.data?.message || 'User updated successfully'
    ToastManager.toast({
      title: 'Success',
      description: successMessage,
      variant: 'success',
    })

    resetForm()
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Failed to add user'
    ToastManager.toast({
      title: 'Something went wrong',
      description: errorMessage,
      variant: 'error',
    })
  } finally {
    setSubmitting(false)
  }
}
