'use client'

import Link from "next/link"
import { useLocale } from "@/hooks/useLocale"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { useRef } from 'react'
import {
  Home,
  CheckCircle,
  Shield,
  Users,
  Clock,
  Sparkles,
  Phone,
  ArrowRight
} from 'lucide-react'

export default function DomesticCleaningPage() {
  const { t } = useLocale()
  useScrollAnimation()
  
  const heroRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const processRef = useRef<HTMLElement>(null)

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: t('services.domestic.features.thorough'),
      description: t('services.domestic.features.thoroughDesc')
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('services.domestic.features.trusted'),
      description: t('services.domestic.features.trustedDesc')
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: t('services.domestic.features.supplies'),
      description: t('services.domestic.features.suppliesDesc')
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('services.domestic.features.customizable'),
      description: t('services.domestic.features.customizableDesc')
    }
  ]

  const process = [
    {
      step: "01",
      title: t('services.domestic.process.step1'),
      description: t('services.domestic.process.step1Desc')
    },
    {
      step: "02",
      title: t('services.domestic.process.step2'),
      description: t('services.domestic.process.step2Desc')
    },
    {
      step: "03",
      title: t('services.domestic.process.step3'),
      description: t('services.domestic.process.step3Desc')
    },
    {
      step: "04",
      title: t('services.domestic.process.step4'),
      description: t('services.domestic.process.step4Desc')
    }
  ]

  const includes = [
    t('services.domestic.includes.bedrooms'),
    t('services.domestic.includes.bathrooms'),
    t('services.domestic.includes.kitchen'),
    t('services.domestic.includes.living'),
    t('services.domestic.includes.floors'),
    t('services.domestic.includes.appliances'),
    t('services.domestic.includes.windows')
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-100/50 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-100/50 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-on-scroll opacity-0">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center glass-morphism">
                  <Home className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-green-600 font-semibold tracking-wide">{t('services.domestic.name')}</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {t('services.domestic.title')}
                <span className="text-gradient bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Professional</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('services.domestic.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group btn-modern bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-center transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    {t('getQuote')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="https://wa.me/393277791867"
                  className="btn-glass border-2 border-green-600 text-green-600 px-8 py-4 rounded-full font-semibold text-center transition-all duration-300 hover:bg-green-600 hover:text-white hover:scale-105"
                >
                  {t('call_now')}
                </Link>
              </div>
            </div>
            
            <div className="relative animate-on-scroll opacity-0 animation-delay-200">
              <div className="glass-morphism rounded-3xl p-8 hover-card">
                <div className="relative bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-2xl p-12 overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  <Home className="h-32 w-32 text-green-600 mx-auto relative z-10 animate-float" />
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl"></div>
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
              {t('services.domestic.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="animate-on-scroll opacity-0 hover-card group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="glass-morphism rounded-2xl p-6 text-center space-y-4 h-full border border-green-100/50 transition-all duration-300 hover:border-green-300/50">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto bg-gradient-to-br from-green-100 to-emerald-100 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-green-600 group-hover:rotate-12 transition-transform duration-300">
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
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-green-50/30 to-emerald-50/30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Cleaning Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our systematic approach ensures thorough and efficient cleaning every time
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
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-7 -right-4 w-8 h-0.5 bg-gradient-to-r from-green-300 to-transparent"></div>
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
                {t('services.domestic.includes.title')}
              </h2>
              <p className="text-lg text-gray-600">
                Our comprehensive domestic cleaning service covers all essential areas of your home
              </p>
              
              <div className="space-y-4">
                {includes.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 group animate-on-scroll opacity-0"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-gray-700 text-lg group-hover:text-green-700 transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-on-scroll opacity-0 animation-delay-300">
              <div className="glass-morphism rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t('getQuote')}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Professional home cleaning services tailored to your needs
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 glass-morphism rounded-xl p-3">
                      <Clock className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{t('contactPage.info.hours.weekdays')}</span>
                    </div>
                    <div className="flex items-center space-x-3 glass-morphism rounded-xl p-3">
                      <Phone className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{t('contactPage.info.phone.number')}</span>
                    </div>
                    <div className="flex items-center space-x-3 glass-morphism rounded-xl p-3">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{t('services.whyChooseUs.insured.title')}</span>
                    </div>
                  </div>
                  <Link
                    href="/booking"
                    className="btn-modern bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold text-center mt-6 w-full block hover:shadow-xl transition-all duration-300"
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
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-on-scroll opacity-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('cta.ready')}
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-glass bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full hover:bg-white hover:text-green-600 transition-all duration-300 font-semibold text-lg hover:scale-105"
              >
                {t('getQuote')}
              </Link>
              <Link
                href="https://wa.me/393277791867"
                className="btn-glass border-2 border-white/50 text-white px-8 py-4 rounded-full hover:bg-white hover:text-green-600 transition-all duration-300 font-semibold text-lg hover:scale-105"
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