import React from 'react'
import illustration from '@/assets/illustration.png'
import { Inter } from 'next/font/google'
import Image from 'next/image'
const inter = Inter({ subsets: ['latin'] })

const AuthBase = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className={`flex items-center justify-center from-gray-100 to-gray-300 p-2 min-h-screen h-screen ${inter.className}`}
    >
      <div className='flex flex-col sm:flex-row h-[90%] w-full rounded-md backdrop-blur-md shadow-lg p-2 gap-2 sm:max-w-[90%]'>
        {/* This section will be hidden on small devices */}
        <section className='hidden sm:relative sm:flex w-full sm:w-[60%] h-[200px] bg-[#85cef5] sm:h-full rounded-sm border border-opacity-10 border-[#1b9adf] overflow-hidden'>
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
            <div className='w-full h-[20%] flex flex-col gap-1 justify-center items-center'>
              <h3 className='font-semibold text-gray-100 text-md lg:text-2xl'>
                Welcome to{' '}
                <span className='py-1 px-2 text-blue-100 bg-blue-50 bg-opacity-20 rounded-md'>
                  CorpConnect
                </span>
              </h3>
            </div>
            <div className='w-full h-[80%]'>
              {children}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AuthBase
