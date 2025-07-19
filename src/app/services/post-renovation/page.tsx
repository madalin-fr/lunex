'use client'

import Link from "next/link"
import { useLocale } from "@/hooks/useLocale"
import { useEffect, useRef } from 'react'
import {
  Hammer,
  CheckCircle,
  Shield,
  Sparkles,
  Clock,
  Zap,
  Target,
  Award,
  ArrowRight
} from 'lucide-react'

export default function PostRenovationPage() {
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
      icon: <Zap className="h-6 w-6" />,
      title: t('services.postRenovation.features.dust'),
      description: t('services.postRenovation.features.dustDesc')
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: t('services.postRenovation.features.debris'),
      description: t('services.postRenovation.features.debrisDesc')
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('services.postRenovation.features.surface'),
      description: t('services.postRenovation.features.surfaceDesc')
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: t('services.postRenovation.features.final'),
      description: t('services.postRenovation.features.finalDesc')
    }
  ]

  const process = [
    {
      step: "01",
      title: t('services.postRenovation.process.step1'),
      description: t('services.postRenovation.process.step1Desc')
    },
    {
      step: "02",
      title: t('services.postRenovation.process.step2'),
      description: t('services.postRenovation.process.step2Desc')
    },
    {
      step: "03",
      title: t('services.postRenovation.process.step3'),
      description: t('services.postRenovation.process.step3Desc')
    },
    {
      step: "04",
      title: t('services.postRenovation.process.step4'),
      description: t('services.postRenovation.process.step4Desc')
    }
  ]

  const includes = [
    t('services.postRenovation.includes.dust'),
    t('services.postRenovation.includes.surfaces'),
    t('services.postRenovation.includes.windows'),
    t('services.postRenovation.includes.floors'),
    t('services.postRenovation.includes.fixtures'),
    t('services.postRenovation.includes.debris'),
    t('services.postRenovation.includes.ventilation')
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100/50 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-100/50 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-on-scroll opacity-0">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center glass-morphism">
                  <Hammer className="h-6 w-6 text-orange-600" />
                </div>
                <span className="text-orange-600 font-semibold tracking-wide">{t('services.postRenovation.name')}</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {t('services.postRenovation.title')}
                <span className="text-gradient bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"> Expert</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('services.postRenovation.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group btn-modern bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-full font-semibold text-center transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    {t('getQuote')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="tel:+393277791867"
                  className="btn-glass border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-full font-semibold text-center transition-all duration-300 hover:bg-orange-600 hover:text-white hover:scale-105"
                >
                  {t('call_now')}
                </Link>
              </div>
            </div>
            
            <div className="relative animate-on-scroll opacity-0 animation-delay-200">
              <div className="glass-morphism rounded-3xl p-8 hover-card">
                <div className="relative bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-2xl p-12 overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  <Hammer className="h-32 w-32 text-orange-600 mx-auto relative z-10 animate-float" />
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl"></div>
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
              {t('services.postRenovation.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="animate-on-scroll opacity-0 hover-card group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="glass-morphism rounded-2xl p-6 text-center space-y-4 h-full border border-orange-100/50 transition-all duration-300 hover:border-orange-300/50">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto bg-gradient-to-br from-orange-100 to-amber-100 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-orange-600 group-hover:rotate-12 transition-transform duration-300">
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
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-orange-50/30 to-amber-50/30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Cleaning Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized post-renovation cleaning to transform your construction site into a pristine space
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
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-7 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-300 to-transparent"></div>
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
            <div className="space-y-6 animate-on-scroll opacity-0">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {t('services.postRenovation.includes.title')}
              </h2>
              <p className="text-lg text-gray-600">
                Comprehensive cleaning services specifically designed for post-construction cleanup
              </p>
              
              <div className="space-y-4">
                {includes.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 group animate-on-scroll opacity-0"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-orange-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-gray-700 text-lg group-hover:text-orange-700 transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-on-scroll opacity-0 animation-delay-300">
              <div className="glass-morphism rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t('getQuote')}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Professional post-renovation cleanup for your peace of mind
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 glass-morphism rounded-xl p-3">
                      <Sparkles className="h-5 w-5 text-orange-600" />
                      <span className="text-gray-700">Heavy-duty cleaning equipment</span>
                    </div>
                    <div className="flex items-center space-x-3 glass-morphism rounded-xl p-3">
                      <Shield className="h-5 w-5 text-orange-600" />
                      <span className="text-gray-700">Insured & bonded professionals</span>
                    </div>
                    <div className="flex items-center space-x-3 glass-morphism rounded-xl p-3">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <span className="text-gray-700">Flexible scheduling available</span>
                    </div>
                  </div>
                  <Link
                    href="/booking"
                    className="btn-modern bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-3 rounded-full font-semibold text-center mt-6 w-full block hover:shadow-xl transition-all duration-300"
                  >
                    {t('bookNow')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-on-scroll opacity-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('cta.ready')}
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-glass bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300 font-semibold text-lg hover:scale-105"
              >
                {t('getQuote')}
              </Link>
              <Link
                href="tel:+393277791867"
                className="btn-glass border-2 border-white/50 text-white px-8 py-4 rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300 font-semibold text-lg hover:scale-105"
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