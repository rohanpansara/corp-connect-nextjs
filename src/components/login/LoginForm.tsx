import { handleLoginSubmit } from '@/app/api/handlers/Login'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import InputField from '../common/InputField'
import PasswordField from '../common/PasswordField'

const LoginForm = ({ validationSchema, setLoading }: any) => {
  const router = useRouter()
  const handleNavigation = (path: string) => router.push(path)

  return (
    <div className='w-full max-w-md p-6 bg-[#ECF1FE] shadow-lg rounded-[12px]'>
      <h2 className='text-2xl font-bold text-center text-gray-700'>
        Welcome To <span className='text-[#407BFD]'>CorpConnect</span>
      </h2>
      <p className='text-xs text-center text-gray-400 mb-6'>
        Use credentials provided to you by the HR team
      </p>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await handleLoginSubmit(values, setLoading, handleNavigation)
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting, setFieldTouched, setFieldError, errors, touched }) => (
          <Form className='space-y-6'>
            {/* Email Input */}
            <InputField
              label='Email'
              name='email'
              type='email'
              placeholder='Enter your email'
              setFieldTouched={setFieldTouched}
              setFieldError={setFieldError}
              errors={errors}
              touched={touched}
            />

            {/* Password Input */}
            <PasswordField
              label='Password'
              name='password'
              placeholder='Enter your password'
              setFieldTouched={setFieldTouched}
              setFieldError={setFieldError}
              errors={errors}
              touched={touched}
            />

            {/* Submit Button */}
            <div>
              <button
                type='submit'
                className='w-full bg-[#407BFD] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#4a76d4] focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition delay-50'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging In...' : 'Log In'}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <p className='mt-2 text-center'>
        <button className='text-xs text-[#407BFD] hover:text-[#4a76d4]'>Forgot password?</button>
      </p>
    </div>
  )
}

export default LoginForm
