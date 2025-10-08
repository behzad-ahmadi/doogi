'use client'

import { createContext, useContext, ReactNode } from 'react'
import { Dictionary } from '@/src/types/dictionary'

interface LanguageContextType {
  dict: Dictionary
  lang: 'en' | 'fa'
  locale: string
}

const langToLocale = {
  en: 'en-US',
  fa: 'fa-IR',
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
)

export function LanguageProvider({
  children,
  dict,
  lang,
}: {
  children: ReactNode
  dict: Dictionary
  lang: 'en' | 'fa'
}) {
  const locale = langToLocale[lang]
  return (
    <LanguageContext.Provider value={{ dict, lang, locale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
