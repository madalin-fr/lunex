import { common as commonIt } from './it/common'
import { common as commonEn } from './en/common'

export const translations = {
  it: {
    common: commonIt,
  },
  en: {
    common: commonEn,
  },
}

export type Locale = keyof typeof translations
export type TranslationKey = keyof typeof translations.it.common

export const defaultLocale: Locale = 'it'
export const locales: Locale[] = ['it', 'en']

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = translations[locale].common
  
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k]
    } else {
      // Fallback to default locale if key not found
      current = translations[defaultLocale].common
      for (const fallbackKey of keys) {
        if (current && typeof current === 'object' && fallbackKey in current) {
          current = current[fallbackKey]
        } else {
          return key // Return key if not found in fallback
        }
      }
      break
    }
  }
  
  return typeof current === 'string' ? current : key
}

export function formatMessage(
  locale: Locale,
  key: string,
  values?: Record<string, string | number>
): string {
  let message = getTranslation(locale, key)
  
  if (values) {
    Object.entries(values).forEach(([placeholder, value]) => {
      message = message.replace(`{${placeholder}}`, String(value))
    })
  }
  
  return message
}