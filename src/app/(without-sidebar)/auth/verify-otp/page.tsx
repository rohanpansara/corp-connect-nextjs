import { otpVerificationMetadata } from '@/app/metadata/loginMetadata'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { Poppins } from 'next/font/google'

export const metadata = otpVerificationMetadata

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const LoginPage = () => {
  return (
    <div className={`min-h-screen w-full bg-[#0940AE] flex items-center justify-center ${poppins.className}`}>
      <div className='p-4 flex items-center'>
        <div className='flex flex-col w-full border-[1px] rounded-md p-4 justify-between items-center gap-10'>
          <div className='w-full flex justify-center items-center'>
            <span className='text-xl text-white font-semibold'>OTP Verification</span>
          </div>

          <div className='w-full flex justify-center items-center text-white'>
            <InputOTP maxLength={6}>
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
            <Button variant='default'>Submit</Button>
          </div>

          <div className='text-xs text-gray-300'>Enter the OTP sent to your linked email account.</div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
