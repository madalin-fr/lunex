'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import { NavItem } from '@/types'
import { Button } from '@/components/ui/button'

export function Header() {
  const { t, locale, setLocale } = useLocale()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation: NavItem[] = [
    { href: '/', label: t('home') },
    { href: '/services', label: t('servicesNav') },
    { href: '/about', label: t('about') },
    { href: '/reviews', label: t('reviews') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') },
  ]

  const toggleLanguage = () => {
    setLocale(locale === 'it' ? 'en' : 'it')
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
              className="relative text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm bg-white/50 hover:bg-white/70 border border-gray-200/40 hover:border-gray-300/40 hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 text-gray-700">{locale === 'it' ? 'EN' : 'IT'}</span>
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
            'lg:hidden border-t border-gray-200/20 transition-all duration-300 backdrop-blur-xl bg-white/50',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          )}
        >
          <nav className="py-4 space-y-2">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block py-2 px-4 rounded-lg font-medium transition-all duration-300 text-gray-700",
                  "hover:bg-white/30 hover:translate-x-2",
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
            <div className="flex items-center justify-between pt-4 border-t border-gray-200/30">
              <button
                onClick={toggleLanguage}
                className="text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm bg-white/50 hover:bg-white/70 border border-gray-200/40 hover:border-gray-300/40 hover:shadow-md transition-all duration-300 text-gray-700"
              >
                {locale === 'it' ? 'EN' : 'IT'}
              </button>
              <Link
                href="/booking"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300 px-4 py-1.5 rounded-full font-semibold text-sm"
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