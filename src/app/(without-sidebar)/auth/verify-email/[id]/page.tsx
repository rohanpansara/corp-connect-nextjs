'use client'

import { apiClient } from '@/app/api/apiClient'
import { otpVerificationMetadata } from '@/app/metadata/authMetadata'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import ToastManager from '@/utils/toastManager'
import { Poppins } from 'next/font/google'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export const metadata = otpVerificationMetadata

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const OTPPage = () => {
  const router = useRouter()
  const [otp, setOtp] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const { userId } = useParams()

  const handleOTPChange = (value: string) => {
    setOtp(value)
  }

  const handleSubmit = async () => {
    if (!otp || otp.length !== 6 || !userId) {
      ToastManager.toast({
        title: 'Invalid OTP Format',
        description: 'Please enter a valid 6-digit OTP.',
        variant: 'error',
      })
      return
    }

    setLoading(true)

    try {
      const response = await apiClient.put('/public/validate/new-user/email-otp', {
        params: { userId, otp },
      })

      if (response.data.success) {
        ToastManager.toast({
          title: 'Verified',
          description: 'OTP verified successfully!',
          variant: 'success',
        })
        router.push('/reset-password')
      } else {
        ToastManager.toast({
          title: 'Invalid OTP',
          description: "Provided OTP doesn't match",
          variant: 'error',
        })
      }
    } catch (error) {
      ToastManager.toast({
        title: 'Something went wrong',
        description: 'Please try again',
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen w-full bg-[#0940AE] flex items-center justify-center ${poppins.className}`}>
      <div className='p-4 flex items-center'>
        <div className='flex flex-col w-full border-[1px] rounded-md p-4 justify-between items-center gap-10'>
          <div className='w-full flex justify-center items-center'>
            <span className='text-xl text-white font-semibold'>OTP Verification</span>
          </div>

          <div className='w-full flex justify-center items-center text-white'>
            <InputOTP maxLength={6} value={otp} onChange={handleOTPChange}>
              <InputOTPGroup>
                <InputOTPSlot index={0} className='border-gray-300' />
                <InputOTPSlot index={1} className='border-gray-300' />
                <InputOTPSlot index={2} className='border-gray-300' />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} className='border-gray-300' />
                <InputOTPSlot index={4} className='border-gray-300' />
                <InputOTPSlot index={5} className='border-gray-300' />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className='w-full flex justify-center items-center'>
            <Button variant='default' onClick={handleSubmit} disabled={loading}>
              {loading ? 'Verifying...' : 'Submit'}
            </Button>
          </div>

          <div className='text-xs text-gray-300'>Enter the OTP sent to your email account.</div>
        </div>
      </div>
    </div>
  )
}

export default OTPPage
