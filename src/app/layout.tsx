// app/layout.tsx
import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"

import './globals.css'
import { Providers } from './context/query-provider'
import AuthGuard from '@/features/auth/context/ProtectedRoute'
import { InitAuth } from '@/features/auth/context/AppProvider'

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
          <AuthGuard >
            <InitAuth />
            {children}
          </AuthGuard>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
