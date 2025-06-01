import enTranslations from '../translations/en.json'
import faTranslations from '../translations/fa.json'

export type Language = 'en' | 'fa'

export const locales: Language[] = ['en', 'fa']
export const defaultLocale: Language = 'en'

const translations = {
  en: enTranslations,
  fa: faTranslations,
}

export function getTranslations(lang: Language) {
  return translations[lang]
}

export function getDirection(lang: Language): 'rtl' | 'ltr' {
  return lang === 'fa' ? 'rtl' : 'ltr'
}

export function isValidLocale(locale: string): locale is Language {
  return locales.includes(locale as Language)
}
