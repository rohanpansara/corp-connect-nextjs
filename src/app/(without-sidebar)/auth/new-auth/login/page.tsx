import React from 'react'
import LoginPage from './LoginPage'
import { loginMetadata } from '@/app/metadata/authMetadata'

export const metadata = loginMetadata

const page = () => {
  return (
    <LoginPage />
  )
}

export default page