'use client'

import illustration from '@/assets/illustration.png'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

const LoginPage: React.FC = () => {

  const [bgColor, setBgColor] = useState<string>('#1781C2') // Default fallback

  useEffect(() => {
    const color = localStorage.getItem('bgColor')
    if (color) {
      setBgColor(color)
    }
  }, [])

  return (
    <>
      <main
        className={`flex items-center justify-center from-gray-100 to-gray-300 p-2 min-h-screen h-screen ${inter.className}`}
      >
        <div className='flex flex-col sm:flex-row h-[90%] w-full rounded-md backdrop-blur-md shadow-lg p-2 gap-2 sm:max-w-[90%]'>
          {/* This section will be hidden on small devices */}
          <section className='hidden sm:relative sm:flex w-full sm:w-[60%] h-[200px] sm:h-full rounded-sm border border-opacity-10 border-gray-800 overflow-hidden'
          style={{ backgroundColor: bgColor }}>
            <Image
              src={illustration}
              alt='Illustration'
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              className='absolute'
            />
          </section>

          {/* This section will always be visible */}
          <section className='w-full sm:w-[40%] h-full rounded-r-sm'>
            <div className='h-full p-2 gap-2 flex flex-col justify-center items-center'>
              <div className='w-full h-[20%] flex flex-col gap-1 justify-center items-center border-b-[1px] border-gray-800'>
                <h3 className='text-2xl font-semibold text-gray-100'>Welcome to CorpConnect</h3>
                <span className='text-sm text-gray-300'>Login to your account</span>
              </div>
              <div className='w-full h-[80%] border-t-[1px] border-gray-800'>
                <form className='flex flex-col gap-2 p-2 justify-evenly h-full'>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor='email' className='text-sm text-gray-600'>
                      Email
                    </label>
                    <input
                      type='email'
                      id='email'
                      className='border-[1px] border-gray-800 rounded-sm p-2'
                      required
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor='password' className='text-sm text-gray-600'>
                      Password
                    </label>
                    <input
                      type='password'
                      id='password'
                      className='border-[1px] border-gray-800 rounded-sm p-2'
                      required
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor='remember' className='text-sm text-gray-600'>
                      <input type='checkbox' id='remember' className='mr-2' />
                      Remember me
                    </label>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <button type='submit' className='bg-blue-600 text-white rounded-sm p-2 hover:bg-blue-700'>
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default LoginPage
