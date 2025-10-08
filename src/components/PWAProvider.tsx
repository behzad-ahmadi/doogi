'use client'

import { useEffect } from 'react'

export default function PWAProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register service worker
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log(
            'Service Worker registered with scope:',
            registration.scope,
          )
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error)
        })
    }
  }, [])

  return <>{children}</>
}
