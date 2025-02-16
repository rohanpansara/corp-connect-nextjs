import { EditUserDialogProps } from '@/app/api/interfaces/props/EditUserDialogProps'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { UserEditDTO } from '@/types/EditUser'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useEffect } from 'react'
import * as Yup from 'yup'

const EditUserDialog: React.FC<EditUserDialogProps> = ({ isOpen, onClose, user, onSubmit }) => {
  const initialValues: UserEditDTO = {
    id: user?.id || '',
    name: user?.name || '',
    email: user?.email || '',
    roles: user?.roles || '',
    isAccountEnabled: user?.isAccountEnabled ?? 'false',
    isAccountNonLocked: user?.isAccountNonLocked ?? 'false',
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid').required('Required'),
    roles: Yup.string().required('Required'),
  })

  useEffect(() => {
    console.log('Editing User:', user)
  }, [user])

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className='sm:max-w-[550px] md:max-w-[650px] bg-mainBackground'>
        <DialogHeader>
          <DialogTitle>Edit User Details</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className='space-y-4'>
              <div className='grid grid-cols-4 gap-4'>
                <div className='col-span-4'>
                  <label className='text-sm'>Name</label>
                  <Field name='name' className='input border p-2 w-full' />
                  <ErrorMessage name='name' component='span' className='text-red-600 text-xs' />
                </div>
                <div className='col-span-4'>
                  <label className='text-sm'>Email</label>
                  <Field name='email' type='email' className='input border p-2 w-full' disabled />
                </div>
                <div className='col-span-4'>
                  <label className='text-sm'>Role</label>
                  <Field as='select' name='roles' className='input border p-2 w-full'>
                    <option value=''>Select Role</option>
                    <option value='ADMIN'>Project Admin</option>
                    <option value='PMS_MANAGER'>Project Manager</option>
                    <option value='HR_MANAGER'>HR Manager</option>
                    <option value='USER'>User</option>
                  </Field>
                  <ErrorMessage name='roles' component='span' className='text-red-600 text-xs' />
                </div>
              </div>
              <DialogFooter>
                <Button type='submit' disabled={isSubmitting}>
                  {isSubmitting ? 'Updating...' : 'Save Changes'}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default EditUserDialog
