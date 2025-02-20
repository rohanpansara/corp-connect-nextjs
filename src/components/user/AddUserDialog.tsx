import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { AddUserDialogProps } from '@/app/api/interfaces/props/AddUserDialogProps'
import { handleAddUserSubmit } from '@/app/api/handlers/AddUserSubmit'
import { addUserValidationSchema } from '@/validators/AddUserFormValidator'

const AddUserDialog: React.FC<AddUserDialogProps> = ({ isOpen, onClose }) => {
  const initialValues = {
    name: '',
    email: '',
    userStatus: '',
    roles: '',
    gender: '',
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className='sm:max-w-[550px] md:max-w-[650px] bg-mainBackground'>
        <DialogHeader>
          <DialogTitle>Fill User Details</DialogTitle>
          <DialogDescription className='text-[12px] mt-0'>Ensure all fields are completed correctly.</DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={addUserValidationSchema}
          onSubmit={handleAddUserSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className='space-y-4 sm:space-y-2 '>
              <div className='grid grid-cols-6 grid-rows-3 gap-4 sm:gap-2'>
                {/* Name */}
                <div className='col-span-6 sm:col-span-3 lg:col-span-6'>
                  <div className='flex items-center justify-between w-full'>
                    <label htmlFor='name' className='text-right text-sm text-muted-foreground'>
                      Name
                    </label>
                    <ErrorMessage name='name' component='span' className='text-xs text-red-600' />
                  </div>
                  <Field
                    id='name'
                    name='name'
                    className="border-[1px] pl-2 text-sm md:text-xs rounded-sm border-gray-300 w-full h-8 max-w-full focus:border-none ${errors.name ? 'border-red-600' : ''} "
                  />
                </div>

                {/* Email */}
                <div className='col-span-6 sm:col-span-3 lg:row-start-2 lg:col-span-6 sm:row-start-1 row-start-2'>
                  <div className='flex items-center justify-between'>
                    <label htmlFor='email' className='text-right text-sm text-muted-foreground'>
                      Email
                    </label>
                    <ErrorMessage name='email' component='span' className='text-xs text-red-600' />
                  </div>
                  <Field
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='off'
                    className="input border-[1px] pl-1 rounded-sm border-gray-300 w-full h-8 max-w-full focus:border-none ${errors.email ? 'border-red-600' : ''}"
                  />
                </div>

                {/* Gender (Dropdown) */}
                <div className='col-span-2 lg:row-start-3 md:row-start-2'>
                  <div className='flex items-center justify-between'>
                    <label htmlFor='gender' className='text-right text-sm text-muted-foreground'>
                      User Gender
                    </label>
                    <ErrorMessage name='gender' component='span' className='text-xs text-red-600' />
                  </div>
                  <Field
                    as='select'
                    id='gender'
                    name='gender'
                    className="input border-[1px] text-sm md:text-xs px-2 bg-mainBackground rounded-sm border-gray-300 w-full h-8 max-w-full focus:border-none ${errors.userStatus ? 'border-red-600' : ''}"
                  >
                    <option value='' hidden>
                      Select Gender
                    </option>
                    <option value='MALE'>Male</option>
                    <option value='FEMALE'>Female</option>
                    <option value='OTHER'>Other</option>
                  </Field>
                </div>

                {/* Capacity (Dropdown) */}
                <div className='col-span-2 lg:row-start-3 md:row-start-2'>
                  <div className='flex items-center justify-between'>
                    <label htmlFor='userStatus' className='text-right text-sm text-muted-foreground'>
                      User Capacity
                    </label>
                    <ErrorMessage name='userStatus' component='span' className='text-xs text-red-600' />
                  </div>
                  <Field
                    as='select'
                    id='userStatus'
                    name='userStatus'
                    className="input border-[1px] text-sm md:text-xs px-2 bg-mainBackground rounded-sm border-gray-300 w-full h-8 max-w-full focus:border-none ${errors.userStatus ? 'border-red-600' : ''}"
                  >
                    <option value='' hidden>
                      Select Capacity
                    </option>
                    <option value='FULL_TIME'>Full Time</option>
                    <option value='PART_TIME'>Part Time</option>
                  </Field>
                </div>

                {/* Roles (Dropdown) */}
                <div className='col-span-2 col-start-3 lg:row-start-3 md:row-start-2'>
                  <div className='flex items-center justify-between'>
                    <label htmlFor='roles' className='text-right text-sm text-muted-foreground'>
                      Role
                    </label>
                    <ErrorMessage name='roles' component='span' className='text-xs text-red-600' />
                  </div>
                  <Field
                    as='select'
                    id='roles'
                    name='roles'
                    className="input border-[1px] text-sm md:text-xs px-2 rounded-sm bg-mainBackground border-gray-300 w-full h-8 max-w-full focus:border-none focus:outline-none ${errors.userStatus ? 'border-red-600' : ''}"
                  >
                    <option value='' hidden>
                      Select Role
                    </option>
                    <option value='ADMIN'>Project Admin</option>
                    <option value='PMS_MANAGER'>Project Manager</option>
                    <option value='HR_MANAGER'>HR Manager</option>
                    <option value='USER'>User</option>
                  </Field>
                </div>
              </div>
              <DialogFooter>
                <Button type='submit' disabled={isSubmitting} variant='default'>
                  {isSubmitting ? 'Adding...' : 'Add User'}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default AddUserDialog
