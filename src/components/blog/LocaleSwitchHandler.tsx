'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from '@/hooks/useLocale'

interface LocaleSwitchHandlerProps {
  currentSlug: string
  slugMap: {
    en: string
    it: string
  }
}

export function LocaleSwitchHandler({ currentSlug, slugMap }: LocaleSwitchHandlerProps) {
  const router = useRouter()
  const { locale } = useLocale()
  const previousLocaleRef = useRef(locale)
  const hasRedirectedRef = useRef(false)

  useEffect(() => {
    // Only redirect if the locale has actually changed (user clicked language switcher)
    // and we haven't already redirected for this locale change
    if (locale !== previousLocaleRef.current && !hasRedirectedRef.current) {
      const targetSlug = slugMap[locale as keyof typeof slugMap]
      
      if (targetSlug && targetSlug !== currentSlug) {
        hasRedirectedRef.current = true
        router.push(`/blog/${targetSlug}`)
      }
      
      previousLocaleRef.current = locale
    }
    
    // Reset the redirect flag when locale stabilizes
    if (locale === previousLocaleRef.current) {
      hasRedirectedRef.current = false
    }
  }, [locale, currentSlug, slugMap, router])

  return null
}