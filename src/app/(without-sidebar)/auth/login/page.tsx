// page.tsx
import LoginSection from '@/components/login/LoginSection'
import { loginMetadata } from '@/app/metadata/loginMetadata'

export const metadata = loginMetadata

const LoginPage = () => (
  <main className='min-h-screen w-full bg-[#0940AE] flex items-center justify-center'>
    <LoginSection />
  </main>
)

export default LoginPage
