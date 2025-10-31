import prisma from '@/lib/prisma'
import { unstable_cache } from 'next/cache'
import { STORIES_TAG, getStoriesTag } from '@/lib/cache-tags'

export type WordWithChild = {
  id: string
  childWord: string
  explanation: string
  createdAt: Date
  childName: string | null
}

// Cache key generator for stories
export function getStoriesCacheKey(lang: 'en' | 'fa') {
  return `stories-${lang}`
}

export async function getPublicStories(lang: 'en' | 'fa'): Promise<WordWithChild[]> {
  try {
    // Use unstable_cache for proper caching with tags
    return await unstable_cache(
      async () => {
        const words = await prisma.word.findMany({
          where: { isPublic: true, language: lang },
          select: {
            id: true,
            childWord: true,
            explanation: true,
            createdAt: true,
            childName: true,
          },
          orderBy: { createdAt: 'desc' },
        })
        // Ensure createdAt is a proper Date object
        return words.map(word => ({
          ...word,
          createdAt: new Date(word.createdAt)
        }))
      },
      [getStoriesCacheKey(lang)],
      { 
        tags: [STORIES_TAG, getStoriesTag(lang)],
        revalidate: 3600 // 1 hour cache duration
      }
    )()
  } catch (err) {
    console.error('Failed to fetch stories from database:', err)
    // Gracefully degrade to empty state when DB is not configured
    return []
  }
}

// Uncached version for when you need fresh data
export async function getFreshPublicStories(lang: 'en' | 'fa'): Promise<WordWithChild[]> {
  try {
    const words = await prisma.word.findMany({
      where: { isPublic: true, language: lang },
      select: {
        id: true,
        childWord: true,
        explanation: true,
        createdAt: true,
        childName: true,
      },
      orderBy: { createdAt: 'desc' },
    })
    // Ensure createdAt is a proper Date object
    return words.map(word => ({
      ...word,
      createdAt: new Date(word.createdAt)
    }))
  } catch (err) {
    console.error('Failed to fetch fresh stories from database:', err)
    return []
  }
}