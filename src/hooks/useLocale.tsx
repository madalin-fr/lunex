'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Locale, defaultLocale, getTranslation, formatMessage } from '@/i18n'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, values?: Record<string, string | number>) => string
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

const LOCALE_STORAGE_KEY = 'lunex-locale'

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Initialize locale from localStorage, fallback to browser preference or default
  const [locale, setLocaleState] = useState<Locale>(() => {
    // Check localStorage
    if (typeof window !== 'undefined') {
      const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale
      if (storedLocale === 'it' || storedLocale === 'en') {
        return storedLocale
      }
      
      // Check browser language preference
      if (window.navigator) {
        const browserLang = window.navigator.language.toLowerCase()
        if (browserLang.startsWith('it')) {
          return 'it'
        }
      }
    }
    
    return defaultLocale
  })

  // Update localStorage when locale changes
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale)
    }
  }

  // Ensure localStorage is synced on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    }
  }, [locale])

  const t = (key: string, values?: Record<string, string | number>) => {
    return formatMessage(locale, key, values)
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}