import React from 'react'

import { forgotPasswordMetadata } from '@/app/metadata/authMetadata'
import ForgotPassword from './ForgotPassword'

export const metadata = forgotPasswordMetadata

const page = () => {
  return (
    <><ForgotPassword/></>
  )
}

export default page