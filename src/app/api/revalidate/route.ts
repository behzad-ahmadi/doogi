import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')
  const secret = searchParams.get('secret')

  // Verify the secret to prevent unauthorized revalidation
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  if (!path) {
    return NextResponse.json({ error: 'Path is required' }, { status: 400 })
  }

  try {
    // Revalidate the specific path using Next.js cache API
    revalidatePath(path)
    
    return NextResponse.json({ revalidated: true, path })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json(
      { error: 'Error revalidating', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')
  const secret = searchParams.get('secret')

  // Verify the secret to prevent unauthorized revalidation
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  if (!path) {
    return NextResponse.json({ error: 'Path is required' }, { status: 400 })
  }

  try {
    // Revalidate the specific path using Next.js cache API
    revalidatePath(path)
    
    return NextResponse.json({ revalidated: true, path })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json(
      { error: 'Error revalidating', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}