export function getCurrentYear(lang: 'en' | 'fa'): number | string {
  const date = new Date()
  return date.toLocaleDateString(lang, { year: 'numeric' })
}
