'use client'

import Link from "next/link"
import { useLocale } from "@/hooks/useLocale"
import { useState, useEffect } from 'react'
import { getLocalizedValue } from '@/lib/sanity/utils'
import {
  Building2,
  Home,
  Hammer,
  Crown,
  Sparkles,
  Calendar,
  Phone,
  CheckCircle,
  Shield,
  Star
} from 'lucide-react'

interface Review {
  _id: string
  clientName: string | { it?: string; en?: string }
  service: {
    it?: string
    en?: string
  }
  rating: number
  testimonial: {
    it?: string
    en?: string
  }
  reviewDate: string
  clientPhoto?: {
    asset?: {
      _ref: string
      _type: string
      url?: string
    }
    alt?: string | {
      it?: string
      en?: string
    }
  }
  featured?: boolean
}

async function getFeaturedReviews(): Promise<Review[]> {
  try {
    const response = await fetch('/api/reviews?featured=true&limit=3')
    if (!response.ok) {
      console.error('Failed to fetch reviews:', response.status, response.statusText)
      return []
    }
    const data = await response.json()
    return Array.isArray(data) ? data.slice(0, 3) : []
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return []
  }
}

export default function HomePage() {
  const { t, locale } = useLocale()
  const [featuredReviews, setFeaturedReviews] = useState<Review[]>([])
  const [reviewsLoading, setReviewsLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedReviews = async () => {
      const reviews = await getFeaturedReviews()
      setFeaturedReviews(reviews)
      setReviewsLoading(false)
    }
    fetchFeaturedReviews()
  }, [])

  const services = [
    {
      icon: <Building2 className="h-8 w-8" />,
      title: t('services.office.title'),
      description: t('services.office.subtitle'),
      href: '/services/office'
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: t('services.domestic.title'),
      description: t('services.domestic.subtitle'),
      href: '/services/domestic'
    },
    {
      icon: <Hammer className="h-8 w-8" />,
      title: t('services.postRenovation.title'),
      description: t('services.postRenovation.subtitle'),
      href: '/services/post-renovation'
    },
    {
      icon: <Crown className="h-8 w-8" />,
      title: t('services.luxury.title'),
      description: t('services.luxury.subtitle'),
      href: '/services/luxury'
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: t('services.deep.title'),
      description: t('services.deep.subtitle'),
      href: '/services/deep'
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.subtitle'),
      href: '/services/maintenance'
    }
  ]

  const whyChooseUs = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: t('services.whyChooseUs.quality.title'),
      description: t('services.whyChooseUs.quality.description')
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('services.whyChooseUs.insured.title'),
      description: t('services.whyChooseUs.insured.description')
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-50 to-emerald-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {t('hero.title')}
                  <span className="text-green-600"> {t('hero.subtitle')}</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-xl">
                  {t('hero.description')}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full hover:from-green-700 hover:to-emerald-700 transition-all font-semibold text-lg text-center shadow-lg hover:shadow-xl"
                >
                  {t('hero.cta')}
                </Link>
                <Link
                  href="/services"
                  className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full hover:bg-green-600 hover:text-white transition-all font-semibold text-lg text-center"
                >
                  {t('servicesNav')}
                </Link>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>{t('services.whyChooseUs.quality.title')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>{t('services.whyChooseUs.insured.title')}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('getQuote')}</h3>
                  <p className="text-gray-600 mb-6">{t('contactPage.info.hours.weekdays')}</p>
                  <Link
                    href="/contact"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-full hover:from-green-700 hover:to-emerald-700 transition-all font-semibold block text-center shadow-md hover:shadow-lg"
                  >
                    {t('contactUs')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('services.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow group">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-600 group-hover:text-white transition-all">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                {service.href !== '/services/post-renovation' && service.href !== '/services/luxury' && (
                  <Link href={service.href} className="text-green-600 hover:text-green-700 font-medium">
                    {t('read_more')} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {t('services.whyChooseUs.title')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('services.whyChooseUs.subtitle')}
              </p>
              
              <div className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-white">
                      <CheckCircle className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link
                href="/contact"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
              >
                {t('contactUs')}
                <Phone className="w-4 h-4 ml-2" />
              </Link>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('contactPage.info.hours.title')}</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>{t('contactPage.info.hours.weekdays').split(':')[0]}</span>
                      <span>8:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('contactPage.info.hours.saturday_hours').split(':')[0]}</span>
                      <span>8:00 - 12:00</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-4">{t('contactPage.info.phone.whatsapp')}</p>
                    <Link
                      href="https://wa.me/393277791867"
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-full hover:from-green-700 hover:to-emerald-700 transition-all font-semibold block text-center shadow-md hover:shadow-lg"
                    >
                      {t('call_now')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('reviewsNav')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mt-6"></div>
          </div>

          {reviewsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 animate-pulse">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, j) => (
                        <div key={j} className="w-5 h-5 bg-gray-300 rounded" />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-300 rounded w-full" />
                    <div className="h-4 bg-gray-300 rounded w-3/4" />
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full" />
                    <div className="ml-3 space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-20" />
                      <div className="h-3 bg-gray-300 rounded w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredReviews.map((review) => (
                <div
                  key={review._id}
                  className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Gradient overlay for premium look */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="relative p-8">
                    {/* Rating with better spacing */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 transition-colors ${
                              i < review.rating
                                ? 'text-yellow-400 fill-current drop-shadow-sm'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm font-semibold text-gray-700">
                          {review.rating}.0
                        </span>
                      </div>
                      {/* Verified badge */}
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ring-2 ring-white">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Testimonial with quote styling */}
                    <div className="relative mb-6">
                      <div className="absolute -top-2 -left-2 w-8 h-8 text-green-300 opacity-50">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                          <path d="M14,17h3l2-4V7h-6v6h3M6,17h3l2-4V7H5v6h3L6,17z"/>
                        </svg>
                      </div>
                      <blockquote className="pl-8 pr-4">
                        <p className="text-gray-700 leading-relaxed font-medium italic">
                          {getLocalizedValue(review.testimonial, locale)}
                        </p>
                      </blockquote>
                    </div>
                    
                    {/* Profile section */}
                    <div className="flex items-center">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-3 ring-white shadow-lg">
                          {review.clientPhoto?.asset?.url ? (
                            <img
                              src={review.clientPhoto.asset.url}
                              alt={getLocalizedValue(review.clientName, locale)}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {getLocalizedValue(review.clientName, locale).split(' ').map((n: string) => n[0]).join('')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="font-bold text-gray-900 text-lg">{getLocalizedValue(review.clientName, locale)}</h4>
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200 mt-1">
                          {getLocalizedValue(review.service, locale)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative bottom border */}
                    <div className="mt-6 h-1 w-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto" />
                  </div>
                  
                  {/* Subtle pattern overlay */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <defs>
                        <pattern id="circles-main" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="10" cy="10" r="2" fill="currentColor" />
                        </pattern>
                      </defs>
                      <rect width="100" height="100" fill="url(#circles-main)" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('reviews.noReviews.title')}</h3>
              <p className="text-gray-600">{t('reviews.noReviews.description')}</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/reviews"
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full hover:from-green-700 hover:to-emerald-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {t('view_all')} {t('reviewsNav')}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t('cta.ready')}
          </h2>
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-green-600 px-8 py-4 rounded-full hover:bg-gray-50 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              {t('getQuote')}
            </Link>
            <Link
              href="https://wa.me/393277791867"
              className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-green-600 transition-all font-semibold text-lg"
            >
              {t('call_now')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
