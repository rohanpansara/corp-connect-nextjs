import React from 'react'

import { otpVerificationMetadata } from '@/app/metadata/authMetadata'
import OTPVerification from './OTPVerification'

export const metadata = otpVerificationMetadata

const page = () => {
  return (
    <>
      <OTPVerification />
    </>
  )
}

export default page
