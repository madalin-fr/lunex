'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Locale, defaultLocale, formatMessage } from '@/i18n'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, values?: Record<string, string | number>) => string
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

const LOCALE_STORAGE_KEY = 'lunex-locale'
const LOCALE_COOKIE_KEY = 'locale'

export function LocaleProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  // Initialize with default locale to avoid SSR/hydration issues
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [isHydrated, setIsHydrated] = useState(false)

  // Detect locale from URL
  useEffect(() => {
    const urlLocale = pathname.startsWith('/en') ? 'en' : 'it'
    setLocaleState(urlLocale)
    
    // Update localStorage and cookie to match URL
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_STORAGE_KEY, urlLocale)
      document.cookie = `${LOCALE_COOKIE_KEY}=${urlLocale}; path=/; max-age=31536000`
      document.documentElement.lang = urlLocale
    }
  }, [pathname])

  // Handle client-side initialization after hydration
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Update localStorage and cookie when locale changes
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    
    // Store in localStorage and cookie
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale)
      document.cookie = `${LOCALE_COOKIE_KEY}=${newLocale}; path=/; max-age=31536000`
    }
  }

  // Sync localStorage and cookie when locale changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale)
      document.cookie = `${LOCALE_COOKIE_KEY}=${locale}; path=/; max-age=31536000`
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