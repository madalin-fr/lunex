'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLocale } from '@/hooks/useLocale'
import { Button } from '@/components/ui/button'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { getLocalizedValue } from '@/lib/sanity/utils'
import { hasValidConfig } from '@/lib/sanity/client'

interface Review {
  _id: string
  customerName: {
    it?: string
    en?: string
  }
  service: {
    it?: string
    en?: string
  }
  rating: number
  comment: {
    it?: string
    en?: string
  }
  reviewDate: string
  customerAvatar?: {
    asset?: {
      _ref: string
      _type: string
      url?: string
    }
    alt?: string
  }
  featured?: boolean
}

// Force dynamic rendering since we use headers
export const dynamic = 'force-dynamic'

async function getReviews(): Promise<Review[]> {
  try {
    const response = await fetch('/api/reviews')
    if (!response.ok) {
      console.error('Failed to fetch reviews:', response.status, response.statusText)
      return []
    }
    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return []
  }
}

export default function ReviewsPage() {
  const { t, locale } = useLocale()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = await getReviews()
      // Ensure reviews is always an array
      setReviews(Array.isArray(fetchedReviews) ? fetchedReviews : [])
      setLoading(false)
    }
    fetchReviews()
  }, [])

  // Calculate values that depend on reviews
  const reviewsPerPage = 6
  const totalPages = Math.ceil(reviews.length / reviewsPerPage)
  
  const currentReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  )

  const averageRating = reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0
  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  }

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    }
    
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!hasValidConfig) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t('reviews.hero.title')}
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              {t('reviews.hero.subtitle')}
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-yellow-800">{t('reviews.setup.title')}</h2>
            </div>
            <p className="text-yellow-700 mb-6 text-lg">
              {t('reviews.setup.description')}
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <ol className="list-decimal list-inside text-yellow-700 space-y-4 text-lg">
                <li>{t('reviews.setup.step1')} <a href="https://sanity.io" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-yellow-900">sanity.io</a></li>
                <li>{t('reviews.setup.step2')}</li>
                <li>{t('reviews.setup.step3')} <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">.env.local</code> {t('reviews.setup.step3_cont')}</li>
                <li>{t('reviews.setup.step4')}
                  <pre className="mt-3 bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production`}
                  </pre>
                </li>
                <li>{t('reviews.setup.step5')}</li>
              </ol>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-700 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('reviews.setup.instructions')}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-800">{t('loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('reviews.hero.title')}
          </h1>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            {t('reviews.hero.subtitle')}
          </p>
          
          {/* Rating Overview */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(averageRating), 'lg')}
                </div>
                <p className="text-purple-100">
                  {t('reviews.basedOn', { count: reviews.length })}
                </p>
              </div>
              
              <div className="col-span-2">
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <span className="text-white w-8">{rating}</span>
                      <Star className="w-4 h-4 text-white mr-2" />
                      <div className="flex-1 bg-white/20 rounded-full h-2 mr-4">
                        <div
                          className="bg-white rounded-full h-2 transition-all duration-300"
                          style={{
                            width: `${reviews.length > 0 ? (ratingDistribution[rating as keyof typeof ratingDistribution] / reviews.length) * 100 : 0}%`
                          }}
                        />
                      </div>
                      <span className="text-white text-sm">
                        {ratingDistribution[rating as keyof typeof ratingDistribution]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {reviews.length > 0 && (
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('reviews.testimonials')}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentReviews.map((review) => (
              <div key={review._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                    {review.customerAvatar?.asset?.url ? (
                      <Image
                        src={review.customerAvatar.asset.url}
                        alt={review.customerAvatar.alt || `${getLocalizedValue(review.customerName, locale) || 'Customer'} avatar`}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-semibold text-lg">
                          {(() => {
                            const name = getLocalizedValue(review.customerName, locale);
                            return name && typeof name === 'string'
                              ? name.split(' ').map((n: string) => n[0]).join('')
                              : '?';
                          })()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {getLocalizedValue(review.customerName, locale) || 'Anonymous'}
                    </h3>
                    <p className="text-sm text-gray-600">{getLocalizedValue(review.service, locale)}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {renderStars(review.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    {formatDate(review.reviewDate)}
                  </span>
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-purple-200" />
                  <p className="text-gray-700 pl-6 italic">
                    &quot;{getLocalizedValue(review.comment, locale)}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                {t('pagination.previous')}
              </Button>
              
              <div className="flex space-x-2">
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 ${
                      currentPage === i + 1 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-600 hover:bg-purple-50'
                    }`}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center"
              >
                {t('pagination.next')}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
          
          {reviews.length === 0 && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('reviews.noReviews.title')}</h3>
                <p className="text-gray-700 text-lg">{t('reviews.noReviews.description')}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Write Review CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t('reviews.cta.title')}
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('reviews.cta.description')}
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
            {t('reviews.cta.button')}
          </Button>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 bg-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('reviews.finalCta.title')}
          </h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            {t('reviews.finalCta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3">
              {t('reviews.finalCta.bookButton')}
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3">
              {t('reviews.finalCta.servicesButton')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}