// app/layout.tsx
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="./node_modules/preline/dist/preline.js"></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
