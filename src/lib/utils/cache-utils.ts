/**
 * Cache utilities for managing Service Worker cache
 */

/**
 * Clear all caches and unregister service workers
 * Useful for debugging or when cache issues occur
 */
export async function clearAllCaches(): Promise<void> {
  try {
    // Clear all caches
    if ('caches' in window) {
      const cacheNames = await caches.keys()
      await Promise.all(cacheNames.map(name => caches.delete(name)))
      console.log('All caches cleared')
    }

    // Unregister all service workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations()
      await Promise.all(registrations.map(reg => reg.unregister()))
      console.log('All service workers unregistered')
    }

    // Reload the page to ensure fresh content
    window.location.reload()
  } catch (error) {
    console.error('Error clearing caches:', error)
  }
}

/**
 * Force update service worker
 */
export async function forceUpdateServiceWorker(): Promise<void> {
  try {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        await registration.update()
        console.log('Service worker update forced')
      }
    }
  } catch (error) {
    console.error('Error forcing service worker update:', error)
  }
}

/**
 * Check if service worker is controlling the page
 */
export function isServiceWorkerActive(): boolean {
  return 'serviceWorker' in navigator && !!navigator.serviceWorker.controller
}

/**
 * Add cache clearing function to window for debugging
 * Only in development mode
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  ;(window as typeof window & { 
    clearAllCaches: typeof clearAllCaches
    forceUpdateServiceWorker: typeof forceUpdateServiceWorker 
  }).clearAllCaches = clearAllCaches
  ;(window as typeof window & { 
    clearAllCaches: typeof clearAllCaches
    forceUpdateServiceWorker: typeof forceUpdateServiceWorker 
  }).forceUpdateServiceWorker = forceUpdateServiceWorker
  console.log('Cache utilities available: clearAllCaches(), forceUpdateServiceWorker()')
}