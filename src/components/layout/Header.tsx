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
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled 
          ? "glass-morphism shadow-lg backdrop-blur-xl bg-white/70 border-b border-gray-200/20" 
          : "bg-white/50 backdrop-blur-md"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo with hover effect */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Lunex
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA & Language Switcher */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="relative text-sm font-medium px-3 py-1 rounded-full glass-morphism hover:shadow-md transition-all duration-300 hover:scale-105 bg-white/50 backdrop-blur-sm"
            >
              <span className="relative z-10">{locale === 'it' ? 'EN' : 'IT'}</span>
            </button>
            <Link href="/booking">
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 px-6 py-2 rounded-full font-semibold"
              >
                {t('common.book_now')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg glass-morphism hover:shadow-md transition-all duration-300 bg-white/50 backdrop-blur-sm"
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
            'lg:hidden border-t border-gray-200/20 transition-all duration-300',
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
                  "hover:bg-gray-100/50 hover:translate-x-2",
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
            <div className="flex items-center justify-between pt-4 border-t border-gray-200/20">
              <button
                onClick={toggleLanguage}
                className="text-sm font-medium px-3 py-1 rounded-full glass-morphism hover:shadow-md transition-all duration-300 bg-white/50 backdrop-blur-sm"
              >
                {locale === 'it' ? 'EN' : 'IT'}
              </button>
              <Link
                href="/booking"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-300 px-4 py-1.5 rounded-full font-semibold text-sm"
                >
                  {t('common.book_now')}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}