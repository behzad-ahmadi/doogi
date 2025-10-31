import 'server-only'
import { Dictionary } from '@/types/dictionary'

const dictionaries = {
  en: () =>
    import('./dictionaries/en.json').then(
      module => module.default as Dictionary,
    ),
  fa: () =>
    import('./dictionaries/fa.json').then(
      module => module.default as Dictionary,
    ),
}

export const getDictionary = async (locale: 'en' | 'fa'): Promise<Dictionary> =>
  dictionaries[locale]()
