// app/layout.tsx
import { Toaster } from '@/components/common/Toaster'
import './globals.css'
import { Poppins } from 'next/font/google'
import BlurBackground from '@/components/common/BlurBackground'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={poppins.className}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'light';
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </head>
      <body>
        <BlurBackground />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
