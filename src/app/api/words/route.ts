import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/src/lib/auth'
import prisma from '@/src/lib/prisma'
import type { Session } from 'next-auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { childName, word, explanation, language } = body as {
      childName: string
      word: string
      explanation: string
      language?: 'fa' | 'en'
    }

    if (!childName || !word || !explanation) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Find or create child for this user
    let child = await prisma.child.findFirst({
      where: { userId: user.id, name: childName },
    })
    if (!child) {
      child = await prisma.child.create({
        data: { userId: user.id, name: childName },
      })
    }

    const created = await prisma.word.create({
      data: {
        childId: child.id,
        userId: user.id,
        originalWord: word,
        childWord: word,
        explanation,
        language: language ?? 'fa',
        isPublic: true,
      },
    })

    return NextResponse.json({ ok: true, word: created }, { status: 201 })
  } catch (err) {
    console.error('Error creating word', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}