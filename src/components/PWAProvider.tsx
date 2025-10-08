'use client'

import { useEffect } from 'react'
import { ENV, FEATURES } from '@/src/lib/config'

export default function PWAProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const hasSW = 'serviceWorker' in navigator
    const shouldEnablePWA = ENV.IS_PRODUCTION && FEATURES.ENABLE_PWA

    // In production with feature enabled, register the service worker
    if (hasSW && shouldEnablePWA) {
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
      return
    }

    // In development or when PWA is disabled, proactively unregister any existing SW
    if (hasSW && !shouldEnablePWA) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(reg => {
          reg.unregister().then(success => {
            if (success) {
              console.log('Service Worker unregistered in dev/disabled mode')
            }
          })
        })
      })
      if ('caches' in window) {
        caches
          .keys()
          .then(keys => Promise.all(keys.map(key => caches.delete(key))))
          .then(() => console.log('PWA caches cleared in dev/disabled mode'))
          .catch(err => console.warn('Failed to clear caches:', err))
      }
    }
  }, [])

  return <>{children}</>
}
