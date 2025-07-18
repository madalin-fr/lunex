'use client'

import Link from "next/link"
import { useLocale } from "@/hooks/useLocale"
import { useEffect, useRef } from 'react'
import { 
  Crown, 
  CheckCircle, 
  Shield, 
  Award, 
  Clock, 
  Eye,
  Diamond,
  Star,
  Phone,
  ArrowRight
} from 'lucide-react'

export default function LuxuryCleaningPage() {
  const { t } = useLocale()
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
        }
      })
    }, observerOptions)

    const sections = [heroRef.current, featuresRef.current, processRef.current]
    sections.forEach(section => {
      if (section) {
        const elements = section.querySelectorAll('.animate-on-scroll')
        elements.forEach(el => observer.observe(el))
      }
    })

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: <Crown className="h-6 w-6" />,
      title: t('services.premium.features.premium'),
      description: t('services.premium.features.premiumDesc')
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: t('services.premium.features.attention'),
      description: t('services.premium.features.attentionDesc')
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('services.premium.features.discreet'),
      description: t('services.premium.features.discreetDesc')
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: t('services.premium.features.custom'),
      description: t('services.premium.features.customDesc')
    }
  ]

  const process = [
    {
      step: "01",
      title: t('services.premium.process.step1'),
      description: t('services.premium.process.step1Desc')
    },
    {
      step: "02",
      title: t('services.premium.process.step2'),
      description: t('services.premium.process.step2Desc')
    },
    {
      step: "03",
      title: t('services.premium.process.step3'),
      description: t('services.premium.process.step3Desc')
    },
    {
      step: "04",
      title: t('services.premium.process.step4'),
      description: t('services.premium.process.step4Desc')
    }
  ]

  const includes = [
    t('services.premium.includes.furniture'),
    t('services.premium.includes.surfaces'),
    t('services.premium.includes.chandeliers'),
    t('services.premium.includes.marble'),
    t('services.premium.includes.carpet'),
    t('services.premium.includes.outdoor'),
    t('services.premium.includes.maintenance')
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100/50 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-100/50 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-on-scroll opacity-0">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center glass-morphism">
                  <Crown className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-purple-600 font-semibold tracking-wide">{t('services.premium.name')}</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {t('services.premium.title')}
                <span className="text-gradient bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> Premium</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('services.premium.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group btn-modern bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-center transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    {t('getQuote')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="tel:+393277791867"
                  className="btn-glass border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full font-semibold text-center transition-all duration-300 hover:bg-purple-600 hover:text-white hover:scale-105"
                >
                  {t('call_now')}
                </Link>
              </div>
            </div>
            
            <div className="relative animate-on-scroll opacity-0 animation-delay-200">
              <div className="glass-morphism rounded-3xl p-8 hover-card">
                <div className="relative bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-2xl p-12 overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  <Crown className="h-32 w-32 text-purple-600 mx-auto relative z-10 animate-float" />
                  <Diamond className="absolute top-4 right-4 h-8 w-8 text-purple-400 animate-pulse" />
                  <Star className="absolute bottom-4 left-4 h-6 w-6 text-indigo-400 animate-spin-slow" />
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('services.whyChooseUs.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('services.premium.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="animate-on-scroll opacity-0 hover-card group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="glass-morphism rounded-2xl p-6 text-center space-y-4 h-full border border-purple-100/50 transition-all duration-300 hover:border-purple-300/50">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto bg-gradient-to-br from-purple-100 to-indigo-100 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-purple-600 group-hover:rotate-12 transition-transform duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-purple-50/30 to-indigo-50/30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Premium Service Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              White-glove cleaning service with the highest attention to detail and premium standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div 
                key={index} 
                className="relative animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="glass-morphism rounded-3xl p-6 h-full hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
                  <div className="text-center space-y-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-7 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-300 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative animate-on-scroll opacity-0">
              <div className="glass-morphism rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t('services.premium.includes.title')}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Premium cleaning services for premium villas and high-end properties
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 glass-morphism rounded-xl p-3">
                      <Diamond className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-700">Premium Products</span>
                    </div>
                    <div className="flex items-center space-x-3 glass-morphism rounded-xl p-3">
                      <Shield className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-700">Expert Team</span>
                    </div>
                    <div className="flex items-center space-x-3 glass-morphism rounded-xl p-3">
                      <Star className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-700">5-Star Service</span>
                    </div>
                  </div>
                  <Link
                    href="/booking"
                    className="btn-modern bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold text-center mt-6 w-full block hover:shadow-xl transition-all duration-300"
                  >
                    {t('bookNow')}
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 animate-on-scroll opacity-0 animation-delay-200">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {t('services.premium.includes.title')}
              </h2>
              <p className="text-lg text-gray-600">
                Comprehensive premium cleaning services with specialized care for high-end properties and furnishings
              </p>
              
              <div className="space-y-4">
                {includes.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 group animate-on-scroll opacity-0"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-gray-700 text-lg group-hover:text-purple-700 transition-colors">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl">
                <p className="text-gray-700 font-medium">
                  We understand that premium properties require specialized care and attention to detail.
                  Our white-glove service ensures your property receives the premium treatment it deserves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-on-scroll opacity-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('cta.ready')}
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-glass bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300 font-semibold text-lg hover:scale-105"
              >
                {t('getQuote')}
              </Link>
              <Link
                href="tel:+393277791867"
                className="btn-glass border-2 border-white/50 text-white px-8 py-4 rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300 font-semibold text-lg hover:scale-105"
              >
                {t('call_now')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}