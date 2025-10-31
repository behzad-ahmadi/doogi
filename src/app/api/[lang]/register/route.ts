import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json()

  const hashedPassword = await bcrypt.hash(password, 12)
  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    })
    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    console.log('register error', error)
    return NextResponse.json({ error: 'User exists' }, { status: 400 })
  }
}
