'use client'

import Link from "next/link"
import Image from "next/image"
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
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
import { AuroraBackground } from '@/components/ui/motion/AuroraBackground'
import { TextReveal } from '@/components/ui/motion/TextReveal'
import { MagneticButton } from '@/components/ui/motion/MagneticButton'
import { SpotlightCard } from '@/components/ui/motion/SpotlightCard'
import { FadeIn, FadeInStagger } from '@/components/ui/motion/FadeIn'

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

  useScrollAnimation()

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
      <AuroraBackground className="py-20 lg:py-32 h-auto min-h-[90vh]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn className="space-y-8" direction="right">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  <TextReveal delay={0.2}>
                    {t('hero.title')}
                  </TextReveal>
                  <span className="text-green-600 block mt-2">
                    <TextReveal delay={0.5}>
                      {t('hero.subtitle')}
                    </TextReveal>
                  </span>
                </h1>
                <FadeIn delay={0.8}>
                  <p className="text-xl text-gray-600 max-w-xl">
                    {t('hero.description')}
                  </p>
                </FadeIn>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton>
                  <Link
                    href="/contact"
                    className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full hover:from-green-700 hover:to-emerald-700 transition-all font-semibold text-lg text-center shadow-lg hover:shadow-xl"
                  >
                    {t('hero.cta')}
                  </Link>
                </MagneticButton>
                <MagneticButton strength={0.3}>
                  <Link
                    href="/services"
                    className="inline-block border-2 border-green-600 text-green-600 px-8 py-4 rounded-full hover:bg-green-600 hover:text-white transition-all font-semibold text-lg text-center bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
                  >
                    {t('servicesNav')}
                  </Link>
                </MagneticButton>
              </div>

              <FadeIn delay={1} className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>{t('services.whyChooseUs.quality.title')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>{t('services.whyChooseUs.insured.title')}</span>
                </div>
              </FadeIn>
            </FadeIn>

            <FadeIn direction="left" delay={0.4} className="relative">
              <div className="bg-gradient-to-br from-green-100/80 to-emerald-100/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50">
                <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('getQuote')}</h3>
                  <p className="text-gray-600 mb-6">{t('contactPage.info.hours.weekdays')}</p>
                  <MagneticButton className="w-full">
                    <Link
                      href="/contact"
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-full hover:from-green-700 hover:to-emerald-700 transition-all font-semibold block text-center shadow-md hover:shadow-lg"
                    >
                      {t('contactUs')}
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </AuroraBackground>

      {/* Services Preview */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-50/50 via-white to-white pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('services.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <SpotlightCard className="h-full" spotlightColor="rgba(22, 163, 74, 0.2)">
                  <div className="p-8 text-center h-full flex flex-col items-center">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-600 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                    {service.href !== '/services/post-renovation' && service.href !== '/services/luxury' && (
                      <Link href={service.href} className="text-green-600 hover:text-green-700 font-medium inline-flex items-center group-hover:translate-x-1 transition-transform">
                        {t('read_more')} <span className="ml-1">→</span>
                      </Link>
                    )}
                  </div>
                </SpotlightCard>
              </FadeIn>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-on-scroll">
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
            
            <div className="relative animate-on-scroll animation-delay-200">
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
                    <Link
                      href="https://wa.me/393277791867"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 rounded-full transition-all font-semibold flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <svg className="w-6 h-6 mr-2 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      {t('chat_whatsapp')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <AuroraBackground className="py-24 h-auto min-h-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
              <Star className="w-5 h-5 text-green-600 fill-current" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              {t('reviewsNav')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('reviews.subtitle')}
            </p>
          </FadeIn>

          {reviewsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-zinc-800/50 rounded-3xl p-8 shadow-sm animate-pulse border border-gray-100 dark:border-zinc-700">
                  <div className="flex items-center mb-6">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, j) => (
                        <div key={j} className="w-5 h-5 bg-gray-200 dark:bg-zinc-700 rounded" />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3 mb-8">
                    <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-full" />
                    <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-3/4" />
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-700 rounded-full" />
                    <div className="ml-4 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-24" />
                      <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredReviews.length > 0 ? (
            <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredReviews.map((review) => (
                <FadeIn key={review._id}>
                  <div
                    className="group relative bg-white backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden h-full"
                  >
                    {/* Decorative gradient blob */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-colors duration-500" />
                    
                    {/* Content */}
                    <div className="relative p-8 flex flex-col h-full">
                      {/* Rating with better spacing */}
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 transition-colors ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        {/* Verified badge */}
                        <div className="flex items-center text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                          <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                          Verified
                        </div>
                      </div>
                      
                      {/* Testimonial with quote styling */}
                      <div className="relative mb-8 flex-grow">
                        <div className="absolute -top-4 -left-2 text-green-500/10 transform -scale-x-100">
                          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                          </svg>
                        </div>
                        <blockquote className="relative z-10">
                          <p className="text-gray-700 leading-relaxed font-medium text-lg">
                            "{getLocalizedValue(review.testimonial, locale)}"
                          </p>
                        </blockquote>
                      </div>
                      
                      {/* Profile section */}
                      <div className="flex items-center pt-6 border-t border-gray-100 dark:border-zinc-700/50">
                        <div className="relative">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-md">
                            {review.clientPhoto?.asset?.url ? (
                              <Image
                                src={review.clientPhoto.asset.url}
                                alt={getLocalizedValue(review.clientName, locale)}
                                fill
                                className="object-cover"
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
                          <h4 className="font-bold text-gray-900 text-base">{getLocalizedValue(review.clientName, locale)}</h4>
                          <div className="text-sm text-green-600 font-medium">
                            {getLocalizedValue(review.service, locale)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </FadeInStagger>
          ) : null}

          <div className="text-center mt-12">
            <MagneticButton className="inline-block">
              <Link
                href="/reviews"
                className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full hover:from-green-700 hover:to-emerald-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                {t('view_all')} {t('reviewsNav')}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </AuroraBackground>

    </div>
  )
}
