import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { FaUpload } from 'react-icons/fa6'
import * as Yup from 'yup'

interface FormValues {
  file: File | null
}

const ProfileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)

  // Validation Schema
  const validationSchema = Yup.object({
    file: Yup.mixed().required('Profile picture is required'),
  })

  // Handle form submission
  const handleSubmit = async (values: FormValues) => {
    const formData = new FormData()
    if (values.file) {
      formData.append('file', values.file)

      try {
        const response = await axios.post('/api/profile/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        alert('Profile picture uploaded successfully')
      } catch (error) {
        console.error('Error uploading file:', error)
        alert('Error uploading file')
      }
    }
  }

  return (
    <Formik initialValues={{ file }} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ setFieldValue, values, errors, touched }) => (
        <Form className='space-y-4'>
          <div>
            <Label htmlFor='file' className='block mb-2 text-sm text-gray-700'>
              Profile Picture
            </Label>
            <Field
              name='file'
              type='file'
              className='block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const file = event.target.files?.[0]
                if (file) {
                  setFieldValue('file', file)
                }
              }}
            />
            {errors.file && touched.file && <div className='text-sm text-red-500 mt-1'>{errors.file}</div>}
          </div>

          <Button
            type='submit'
            variant='default'
            className='w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg'
          >
            <FaUpload /> Upload
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default ProfileUpload
