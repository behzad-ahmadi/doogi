import { NextResponse } from 'next/server'
import prisma from '@/src/lib/prisma'

export async function POST(req: Request) {
  try {
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

    // Create word entry with child name
    const created = await prisma.word.create({
      data: {
        originalWord: word,
        childWord: word,
        explanation,
        language: language ?? 'fa',
        isPublic: true,
        childName: childName,
      },
    })

    return NextResponse.json({ ok: true, word: created }, { status: 201 })
  } catch (err) {
    console.error('Error creating word', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}