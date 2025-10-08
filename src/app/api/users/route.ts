import { NextRequest } from 'next/server'
import { prisma } from '@/src/lib/prisma'
import bcrypt from 'bcryptjs'

export const runtime = 'nodejs'

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return Response.json({
    users: users.map(u => ({
      id: u.id,
      email: u.email,
      name: u.name ?? null,
      image: u.image ?? null,
      role: String(u.role),
      createdAt: u.createdAt.toISOString(),
      updatedAt: u.updatedAt.toISOString(),
    })),
    count: users.length,
  })
}

export async function POST(req: NextRequest) {
  try {
    type CreateUserBody = {
      email: string
      name?: string
      password?: string
      image?: string
    }

    const raw = await req.json().catch(() => ({}))
    const body = raw as Partial<CreateUserBody>
    const { email, name, password, image } = body

    if (!email || typeof email !== 'string') {
      return Response.json({ error: 'email is required' }, { status: 400 })
    }

    const hashedPassword =
      typeof password === 'string' ? await bcrypt.hash(password, 10) : undefined

    const created = await prisma.user.create({
      data: {
        email,
        name: typeof name === 'string' ? name : undefined,
        password: hashedPassword,
        image: typeof image === 'string' ? image : undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return Response.json(
      {
        users: [
          {
            id: created.id,
            email: created.email,
            name: created.name ?? null,
            image: created.image ?? null,
            role: String(created.role),
            createdAt: created.createdAt.toISOString(),
            updatedAt: created.updatedAt.toISOString(),
          },
        ],
        count: 1,
      },
      { status: 201 },
    )
  } catch (err: unknown) {
    const code = (err as { code?: string }).code
    if (code === 'P2002') {
      return Response.json({ error: 'Email already exists' }, { status: 409 })
    }
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
