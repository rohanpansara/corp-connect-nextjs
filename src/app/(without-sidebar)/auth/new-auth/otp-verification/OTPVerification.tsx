'use client'

import AuthBase from '@/components/auth/AuthBase'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import React, { useState } from 'react'

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState('')

  const resendOTP = () => {
    alert('OTP resent!')
  }

  return (
    <AuthBase>
      <form className='flex flex-col p-2 justify-around h-full'>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-2 justify-center items-center w-full'>
            <InputOTP maxLength={6} value={otp} onChange={value => setOtp(value)} containerClassName='w-full'>
              <InputOTPGroup className='w-1/2'>
                {[0, 1, 2].map(i => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className={`border border-gray-300 w-1/3 h-[45px] text-gray-800 text-md font-semibold ${
                      otp[i] ? 'bg-gray-200' : 'bg-transparent'
                    }`}
                  />
                ))}
              </InputOTPGroup>
              <InputOTPSeparator className='text-gray-300' />
              <InputOTPGroup className='w-1/2'>
                {[3, 4, 5].map(i => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className={`border border-gray-300 w-1/3 h-[45px] text-gray-800 text-md font-semibold ${
                      otp[i] ? 'bg-gray-200' : 'bg-transparent'
                    }`}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <div className='flex gap-1 ml-auto'>
              <button type='button' className='text-sm text-gray-200' onClick={resendOTP}>
                <span className='text-[12px] text-gray-200 hover:text-gray-300 hover:underline ease-in-out'>
                  Resend OTP
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex flex-col gap-1'>
            <button type='submit' className='bg-blue-600 text-white rounded-sm p-2 hover:bg-blue-700'>
              Verify OTP
            </button>
          </div>
          <div className='flex flex-col gap-1 justify-center items-center'>
            <span className='text-[10px] text-gray-200'>
              If you didn't receive it, check your spam folder or request a new one.
            </span>
          </div>
        </div>
      </form>
    </AuthBase>
  )
}

export default OTPVerification
