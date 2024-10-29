// app/layout.tsx
import { Toaster } from "react-hot-toast";
import NextTopLoader from 'nextjs-toploader';
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader />
        {children}
        <Toaster position="top-center" reverseOrder={true} />
      </body>
    </html>
  );
}
