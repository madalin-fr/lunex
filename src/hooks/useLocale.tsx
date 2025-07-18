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
  // Initialize with default locale to avoid SSR/hydration issues
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [isHydrated, setIsHydrated] = useState(false)

  // Handle client-side initialization after hydration
  useEffect(() => {
    setIsHydrated(true)
    
    // Check localStorage
    const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale
    if (storedLocale === 'it' || storedLocale === 'en') {
      setLocaleState(storedLocale)
      return
    }
    
    // Check browser language preference
    const browserLang = window.navigator.language.toLowerCase()
    if (browserLang.startsWith('it')) {
      setLocaleState('it')
      localStorage.setItem(LOCALE_STORAGE_KEY, 'it')
    }
  }, [])

  // Update localStorage when locale changes
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale)
    }
  }

  // Sync localStorage when locale changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    }
  }, [locale, isHydrated])

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