import AuthBase from '@/components/auth/AuthBase'
import React from 'react'

const ForgotPassword: React.FC = () => {
  return (
    <AuthBase>
      <form className='flex flex-col p-2 justify-around h-full'>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-[2px]'>
            <label htmlFor='email' className='text-sm text-gray-200'>
              Registered Email
            </label>
            <input
              type='email'
              id='email'
              className='rounded-sm p-1 bg-slate-200 text-[12px] text-slate-800 placeholder:text-gray-400 pl-2'
              placeholder='Enter your registered email'
              required
            />
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex flex-col gap-1'>
            <button type='submit' className='bg-blue-600 text-white rounded-sm p-2 hover:bg-blue-700'>
              Verify Email
            </button>
          </div>
          <div className='flex flex-col gap-1 justify-center items-center'>
            <span className='text-[10px] text-gray-200'>If any account is registered with this email, a reset password link will be sent.</span>
          </div>
        </div>
      </form>
    </AuthBase>
  )
}

export default ForgotPassword
