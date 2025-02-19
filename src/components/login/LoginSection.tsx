'use client'

import { checkSession } from '@/app/api/checkSession'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import LoginIllustration from './LoginIllustration'
import LoginForm from './LoginForm'

const LoginSection = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const validateSession = async () => {
      const isLoggedIn = await checkSession()
      if (isLoggedIn) {
        router.push('/dashboard')
      } else {
        setLoading(false)
      }
    }

    validateSession()
  }, [])

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid format').required('*Email is required'),
    password: Yup.string().required('*Password is required'),
  })

  return (
    <div className='flex w-full xl:w-[90%] h-screen min-h-screen bg-[#0940AE] gap-x-10'>
      {/* First Section: Office Illustration Image */}
      <section className='hidden xl:flex w-1/2 h-full bg-cover bg-center'>
        <LoginIllustration />
      </section>

      {/* Second Section: Login Form */}
      <section className='flex w-[60%] xl:w-1/2 mx-auto h-full justify-center items-center'>
        <LoginForm validationSchema={validationSchema} setLoading={setLoading} />
      </section>
    </div>
  )
}

export default LoginSection
