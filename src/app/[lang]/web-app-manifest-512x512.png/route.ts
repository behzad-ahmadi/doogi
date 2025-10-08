import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  const iconPath = join(process.cwd(), 'public', 'web-app-manifest-512x512.png')
  const file = readFileSync(iconPath)

  return new NextResponse(file, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}