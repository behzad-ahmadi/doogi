import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  const manifestPath = join(process.cwd(), 'public', 'manifest.json')
  const manifestContent = readFileSync(manifestPath, 'utf-8')

  return new NextResponse(manifestContent, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
