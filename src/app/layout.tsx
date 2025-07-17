// app/layout.tsx  (still a Server Component)
import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'

import './globals.css'
import { Providers } from './context/query-provider'

const geistSans = Quicksand({
  variable: '--font-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'CHIKA',
  icons: {
    icon: '/header/logo.svg',
    apple: '/header/logo.svg',
    shortcut: '/header/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased bg-[#FFFDF2] leading-tight`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
