import prisma from '@/src/lib/prisma'

export type WordWithChild = {
  id: string
  childWord: string
  explanation: string
  createdAt: Date
  child: { name: string } | null
}

export async function getPublicStories(lang: 'en' | 'fa'): Promise<WordWithChild[]> {
  try {
    const words = await prisma.word.findMany({
      where: { isPublic: true, language: lang },
      include: { child: true },
      orderBy: { createdAt: 'desc' },
    })
    
    return words
  } catch (err) {
    console.error('Failed to fetch stories from database:', err)
    // Gracefully degrade to empty state when DB is not configured
    return []
  }
}