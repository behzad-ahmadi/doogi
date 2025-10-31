'use client'

import { useEffect } from 'react'
import { ENV, FEATURES } from '@/lib/config'
import '@/lib/utils/cache-utils'

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

          // Check for updates every 60 seconds
          setInterval(() => {
            registration.update()
          }, 60000)

          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker is available, prompt user to refresh
                  if (confirm('یک نسخه جدید از برنامه در دسترس است. آیا می‌خواهید صفحه را بازخوانی کنید؟')) {
                    window.location.reload()
                  }
                }
              })
            }
          })
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
