// app/(with-sidebar)/layout.tsx
import { AppNavbar } from '@/components/common/AppNavbar'
import { AppSidebar } from '@/components/common/AppSidebar'
import { AuthProvider } from '@/components/common/AuthProvider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { getCookieAsString } from '@/utils/cookieUtils'
import './../globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const userId = getCookieAsString('User_Id')

  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className={`w-full ${poppins.className}`}>
          <AppNavbar />
          {children}
        </main>
      </SidebarProvider>
    </AuthProvider>
  )
}
