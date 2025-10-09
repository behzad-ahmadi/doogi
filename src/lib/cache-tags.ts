// Cache tags for revalidation
export const STORIES_TAG = 'stories'

// Generate tag for specific language stories
export function getStoriesTag(lang: string) {
  return `stories-${lang}`
}