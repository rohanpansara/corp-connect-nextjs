import React from 'react'

import { resetPasswordMetadata } from '@/app/metadata/authMetadata'
import ResetPassword from './ResetPassword'

export const metadata = resetPasswordMetadata

const page = () => {
  return (
    <>
      <ResetPassword />
    </>
  )
}

export default page
