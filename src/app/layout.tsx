// app/layout.tsx
import "./globals.css";
import { CookiesProvider } from 'react-cookie'; // Import CookiesProvider

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CookiesProvider> {/* Wrap your application with CookiesProvider */}
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </CookiesProvider>
  );
}
