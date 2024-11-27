// app/layout.tsx
import { Toaster } from "sonner";
import "./globals.css";

//👇 Import our second font
import { Open_Sans, Roboto_Mono } from 'next/font/google'

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  //👇 Add variable to our object
  variable: '--font-opensans',
})

//👇 Configure the object for our second font
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={robotoMono.className}>
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
        {children}
        <Toaster richColors={true}/>
      </body>
    </html>
  );
}
