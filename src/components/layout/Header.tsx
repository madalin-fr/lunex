'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import { NavItem } from '@/types'
import { Button } from '@/components/ui/button'

export function Header() {
  const { t } = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Detect current locale from URL
  const isEnglishRoute = pathname.startsWith('/en')
  const currentLocale = isEnglishRoute ? 'en' : 'it'

  // Get navigation links based on current locale
  const getNavLinks = (locale: string): NavItem[] => {
    const basePath = locale === 'en' ? '/en' : ''
    return [
      { href: `${basePath}/`, label: t('home') },
      { href: `${basePath}/services`, label: t('servicesNav') },
      { href: `${basePath}/about`, label: t('about') },
      { href: `${basePath}/reviews`, label: t('reviewsNav') },
      { href: `${basePath}/blog`, label: t('blogNav') },
      { href: `${basePath}/contact`, label: t('contact') },
    ]
  }

  const navigation = getNavLinks(currentLocale)

  const toggleLanguage = () => {
    let newPath = pathname
    
    if (isEnglishRoute) {
      // Switch from English to Italian (remove /en prefix)
      newPath = pathname.replace('/en', '') || '/'
    } else {
      // Switch from Italian to English (add /en prefix)
      newPath = `/en${pathname}`
    }
    
    // Navigate directly without changing locale first
    // The destination page will handle setting the correct locale
    router.push(newPath)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled
          ? "backdrop-blur-xl bg-white/70 shadow-lg border-b border-gray-200/40"
          : "backdrop-blur-md bg-white/20 border-b border-white/10"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo with hover effect */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Lunex
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-gray-700 hover:text-green-600 font-medium transition-all duration-300 hover:scale-105 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 transition-all duration-300 group-hover:w-full shadow-glow" />
              </Link>
            ))}
          </nav>

          {/* CTA & Language Switcher */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="relative p-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label={currentLocale === 'it' ? 'Switch to English' : 'Passa all\'italiano'}
            >
              <span className="text-2xl leading-none filter drop-shadow-sm">
                {currentLocale === 'it' ? '🇬🇧' : '🇮🇹'}
              </span>
            </button>
            <Link href="/booking">
              <Button
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 py-2 rounded-full font-semibold backdrop-blur-sm border border-white/20"
              >
                {t('book_now')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg backdrop-blur-sm bg-white/50 hover:bg-white/70 border border-gray-200/40 hover:border-gray-300/40 hover:shadow-md transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                  className="animate-fade-in"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                  className="animate-fade-in"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation with Glass Effect */}
        <div
          className={cn(
            'lg:hidden transition-all duration-300 backdrop-blur-xl bg-white/95 shadow-lg',
            isMenuOpen ? 'max-h-screen opacity-100 border-t border-gray-200/40' : 'max-h-0 opacity-0 overflow-hidden'
          )}
        >
          <nav className="py-6 space-y-1">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block py-3 px-4 text-lg font-medium transition-all duration-300 text-gray-700",
                  "hover:bg-green-50 hover:text-green-600 hover:translate-x-1",
                  "border-l-4 border-transparent hover:border-green-500",
                  "animate-fade-in"
                )}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col space-y-4 pt-6 border-t border-gray-200/40 mx-4">
              <button
                onClick={toggleLanguage}
                className="self-start p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                aria-label={currentLocale === 'it' ? 'Switch to English' : 'Passa all\'italiano'}
              >
                <span className="text-3xl leading-none">
                  {currentLocale === 'it' ? '🇬🇧' : '🇮🇹'}
                </span>
              </button>
              <Link
                href="/booking"
                onClick={() => setIsMenuOpen(false)}
                className="self-start"
              >
                <Button
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-full font-semibold"
                >
                  {t('book_now')}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}