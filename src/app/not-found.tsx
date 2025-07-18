'use client'

import Link from 'next/link'
import { useLocale } from '@/hooks/useLocale'

export default function NotFound() {
  const { t } = useLocale()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          {t('pageNotFound') || 'Page Not Found'}
        </h2>
        <p className="text-gray-600 mt-2 mb-8">
          {t('pageNotFoundDesc') || 'The page you are looking for does not exist.'}
        </p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
        >
          {t('backToHome') || 'Back to Home'}
        </Link>
      </div>
    </div>
  )
}