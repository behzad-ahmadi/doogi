import { URL } from '@/src/lib/config'

export const getImageUrl = (path: string): string => {
  if (typeof window === 'undefined') {
    // Server-side
    return `${URL.BASE_URL}${path}`
  }

  // Client-side
  const baseUrl = window.location.origin
  return `${baseUrl}${path}`
}
