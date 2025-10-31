'use client'

import { useSession } from 'next-auth/react'
import { useLanguage } from '@/contexts/language-context'

export default function TestAuthPage() {
  const { data: session, status } = useSession()
  const { lang } = useLanguage()

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Authentication Test Page</h1>
      
      <div className="bg-base-200 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">Session Status:</h2>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Language:</strong> {lang}</p>
      </div>

      <div className="bg-base-200 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">Session Data:</h2>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      <div className="bg-base-200 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Debug Info:</h2>
        <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
        <p><strong>User Agent:</strong> {typeof window !== 'undefined' ? navigator.userAgent : 'N/A'}</p>
      </div>
    </div>
  )
}