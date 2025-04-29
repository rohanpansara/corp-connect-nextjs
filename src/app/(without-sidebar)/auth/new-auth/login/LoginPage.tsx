import AuthBase from '@/components/auth/AuthBase'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import React from 'react'

const LoginPage: React.FC = () => {
  return (
    <AuthBase>
      <form className='flex flex-col p-2 justify-around h-full'>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-[2px]'>
            <label htmlFor='email' className='text-sm text-gray-200'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className='rounded-sm p-1 bg-slate-200 text-[12px] text-slate-800 placeholder:text-gray-400 pl-2'
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='flex flex-col gap-[2px]'>
            <label htmlFor='password' className='text-sm text-gray-200'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='rounded-sm p-1 bg-slate-200 text-[12px] text-slate-800 placeholder:text-gray-400 pl-2'
              placeholder='Enter your password'
              required
            />
          </div>
          <div className='flex items-center justify-between gap-1'>
            <div className='flex items-center gap-1'>
              <input type='checkbox' id='remember' className='mr-1 rounded-md focus:outline-none' />
              <label htmlFor='remember' className='text-sm text-gray-200'>
                <span className='text-[12px] text-gray-200'>Remember Me</span>
              </label>
            </div>
            <div className='flex items-center gap-1'>
              <Link href={'/auth/forgot-password'} className='text-sm text-gray-200'>
                <span className='text-[12px] text-gray-200 hover:text-gray-300 hover:underline ease-in-out'>Forgot Password?</span>
              </Link>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex flex-col gap-1'>
            <button type='submit' className='bg-blue-600 text-white rounded-sm p-2 hover:bg-blue-700'>
              Login
            </button>
          </div>
          <div className='flex flex-col gap-1 justify-center items-center'>
            <span className='text-[10px] text-gray-200'>Use credentials provided to you by HR.</span>
          </div>
        </div>
      </form>
    </AuthBase>
  )
}

export default LoginPage
