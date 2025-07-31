'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useVerifyToken } from '../hooks'
import { useRefresh } from '../hooks'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { refetch: verifyToken } = useVerifyToken()
  const { mutateAsync: refresh } = useRefresh()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem('access_token')
        const refreshToken = localStorage.getItem('refresh_token')

        if (!accessToken && !refreshToken) {
          router.push('/')
          return
        }

        const result = await verifyToken()

        if (result.error && refreshToken) {
          const response = await refresh({ refresh_token: refreshToken })
          localStorage.setItem('access_token', response.access_token)

        } else if (result.error) {
          localStorage.clear()
          router.push('/')
          return
        }
      } finally {
        setChecking(false)
      }
    }

    checkAuth()
  }, [router, verifyToken, refresh])

  if (checking) return null
  return <>{children}</>
}
