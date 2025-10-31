'use server'

import { getStoriesTag } from '@/lib/cache-tags'
import { STORIES_TAG } from '@/lib/cache-tags'
import { revalidateTag } from 'next/cache'

// Server action to revalidate stories for a specific language
export async function revalidateStories(lang: string) {
  try {
    // Revalidate using tags (modern approach)
    revalidateTag(getStoriesTag(lang))
    revalidateTag(STORIES_TAG) // Also revalidate global stories tag

    console.log(`Successfully revalidated stories for language: ${lang}`)
    return { success: true }
  } catch (error) {
    console.error('Error revalidating stories:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
