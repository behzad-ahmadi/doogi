import enTranslations from '../translations/en.json'
import faTranslations from '../translations/fa.json'

export type Language = 'en' | 'fa'

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
