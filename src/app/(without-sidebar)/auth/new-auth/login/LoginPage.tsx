'use client'

import { checkSession } from '@/app/api/checkSession'
import AuthBase from '@/components/auth/AuthBase'
import Loader from '@/components/common/Loader'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { handleLoginSubmit } from '@/app/api/handlers/Login'

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const validateSession = async () => {
      const isLoggedIn = await checkSession()
      if (isLoggedIn) {
        router.push('/dashboard')
      } else {
        setIsLoading(false)
      }
    }
    validateSession()
  }, [])

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('*Email is required'),
    password: Yup.string().required('*Password is required'),
  })

  const initialValues = {
    email: '',
    password: '',
    remember: false,
  }

  if (isLoading) {
    return (
      <AuthBase>
        <div className='flex flex-col p-2 justify-center items-center h-full'>
          <Loader color='lightBlue' />
        </div>
      </AuthBase>
    )
  }

  const handleNavigation = (path: string) => router.push(path)

  return (
    <AuthBase>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={async (values, { setSubmitting }) => {
        try {
          await handleLoginSubmit(values, setIsLoading, handleNavigation)
        } finally {
          setSubmitting(false)
        }
      }}>
        {({ errors, touched }) => (
          <Form className='flex flex-col p-2 justify-around h-full'>
            <div className='flex flex-col gap-3'>
              {/* Email */}
              <div className='flex flex-col gap-[2px]'>
                <div className='flex flex-row justify-between items-center'>
                  <label htmlFor='email' className='text-sm text-gray-200'>
                    Email
                  </label>
                  <ErrorMessage name='email' component='div' className='text-red-400 text-[10px]' />
                </div>
                <Field
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Enter your email'
                  className={`rounded-sm p-1 bg-slate-200 text-[12px] text-slate-800 placeholder:text-gray-400 pl-2 ${errors.email && touched.email ? 'border border-red-500' : ''
                    }`}
                />
              </div>

              {/* Password */}
              <div className='flex flex-col gap-[2px]'>
                <div className='flex flex-row justify-between items-center'>
                  <label htmlFor='password' className='text-sm text-gray-200'>
                    Password
                  </label>
                  <ErrorMessage name='password' component='div' className='text-red-400 text-[10px]' />
                </div>
                <Field
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Enter your password'
                  className={`rounded-sm p-1 bg-slate-200 text-[12px] text-slate-800 placeholder:text-gray-400 pl-2 ${errors.password && touched.password ? 'border border-red-500' : ''
                    }`}
                />
              </div>

              {/* Remember Me + Forgot Password */}
              <div className='flex items-center justify-between gap-1'>
                <div className='flex items-center gap-1'>
                  <Field type='checkbox' id='remember' name='remember' className='mr-1 rounded-md cursor-pointer' />
                  <label htmlFor='remember' className='text-sm text-gray-200'>
                    <span className='text-[12px] text-gray-200'>Remember Me</span>
                  </label>
                </div>
                <Link href='/auth/forgot-password' className='text-sm text-gray-200'>
                  <span className='text-[12px] hover:text-gray-300 hover:underline'>Forgot Password?</span>
                </Link>
              </div>
            </div>

            {/* Submit button */}
            <div className='flex flex-col gap-1'>
              <button type='submit' className='bg-blue-600 text-white rounded-sm p-2 hover:bg-blue-700'>
                Login
              </button>
              <div className='flex justify-center items-center'>
                <span className='text-[10px] text-gray-200'>Use credentials provided to you by HR.</span>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </AuthBase>
  )
}

export default LoginPage
