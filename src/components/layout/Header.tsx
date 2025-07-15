'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import { NavItem } from '@/types'

export function Header() {
  const { t, locale, setLocale } = useLocale()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation: NavItem[] = [
    { href: '/', label: t('common.home') },
    { href: '/services', label: t('common.servicesNav') },
    { href: '/about', label: t('common.about') },
    { href: '/reviews', label: t('common.reviews') },
    { href: '/blog', label: t('common.blog') },
    { href: '/contact', label: t('common.contact') },
  ]

  const toggleLanguage = () => {
    setLocale(locale === 'it' ? 'en' : 'it')
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Lunex</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-amber-600 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA & Language Switcher */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="text-sm text-gray-600 hover:text-amber-600 transition-colors"
            >
              {locale === 'it' ? 'EN' : 'IT'}
            </button>
            <Link
              href="/booking"
              className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors font-medium"
            >
              {t('common.book_now')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
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
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden border-t border-gray-200 transition-all duration-300',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          )}
        >
          <nav className="py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-gray-700 hover:text-amber-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={toggleLanguage}
                className="text-sm text-gray-600 hover:text-amber-600 transition-colors"
              >
                {locale === 'it' ? 'EN' : 'IT'}
              </button>
              <Link
                href="/booking"
                className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.book_now')}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}