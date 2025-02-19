import { setPasswordMetadata } from '@/app/metadata/authMetadata'
import SetPasswordSection from '@/components/auth/setPassword/SetPasswordSection'

export const metadata = setPasswordMetadata

const SetPasswordPage = () => (
  <main className='min-h-screen w-full bg-[#0940AE] flex items-center justify-center'>
    <SetPasswordSection />
  </main>
)

export default SetPasswordPage
