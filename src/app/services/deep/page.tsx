'use client'

import Link from "next/link"
import { useLocale } from "@/hooks/useLocale"
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useRef } from 'react'
import {
  Sparkles,
  CheckCircle,
  Shield,
  Zap,
  Clock,
  Target,
  RefreshCw,
  Award,
  ArrowRight,
  Home
} from 'lucide-react'

export default function DeepCleaningPage() {
  const { t } = useLocale()
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)

  // Use the safe scroll animation hook
  useScrollAnimation();

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: t('services.deep.features.intensive'),
      description: t('services.deep.features.intensiveDesc')
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: t('services.deep.features.equipment'),
      description: t('services.deep.features.equipmentDesc')
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('services.deep.features.sanitization'),
      description: t('services.deep.features.sanitizationDesc')
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: t('services.deep.features.restoration'),
      description: t('services.deep.features.restorationDesc')
    }
  ]

  const process = [
    {
      step: "01",
      title: t('services.deep.process.step1'),
      description: t('services.deep.process.step1Desc')
    },
    {
      step: "02",
      title: t('services.deep.process.step2'),
      description: t('services.deep.process.step2Desc')
    },
    {
      step: "03",
      title: t('services.deep.process.step3'),
      description: t('services.deep.process.step3Desc')
    },
    {
      step: "04",
      title: t('services.deep.process.step4'),
      description: t('services.deep.process.step4Desc')
    }
  ]

  const includes = [
    t('services.deep.includes.appliances'),
    t('services.deep.includes.grout'),
    t('services.deep.includes.baseboards'),
    t('services.deep.includes.light'),
    t('services.deep.includes.cabinet'),
    t('services.deep.includes.upholstery'),
    t('services.deep.includes.sanitization')
  ]

  const deepCleanBenefits = [
    {
      title: "Health Benefits",
      description: "Eliminates allergens, bacteria, and deep-seated dirt"
    },
    {
      title: "Extended Lifespan",
      description: "Preserves your home's surfaces and appliances"
    },
    {
      title: "Fresh Start",
      description: "Perfect for seasonal cleaning or new beginnings"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-100/50 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-on-scroll opacity-0">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center glass-morphism">
                  <Sparkles className="h-6 w-6 text-cyan-600" />
                </div>
                <span className="text-cyan-600 font-semibold tracking-wide">{t('services.deep.name')}</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {t('services.deep.title')}
                <span className="text-gradient bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"> Intensive</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('services.deep.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group btn-modern bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-center transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    {t('getQuote')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="https://wa.me/393277791867"
                  className="btn-glass border-2 border-cyan-600 text-cyan-600 px-8 py-4 rounded-full font-semibold text-center transition-all duration-300 hover:bg-cyan-600 hover:text-white hover:scale-105"
                >
                  {t('call_now')}
                </Link>
              </div>
            </div>
            
            <div className="relative animate-on-scroll opacity-0 animation-delay-200">
              <div className="glass-morphism rounded-3xl p-8 hover-card">
                <div className="relative bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-2xl p-12 overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  <Sparkles className="h-32 w-32 text-cyan-600 mx-auto relative z-10 animate-float" />
                  <Zap className="absolute top-4 right-4 h-8 w-8 text-cyan-400 animate-pulse" />
                  <RefreshCw className="absolute bottom-4 left-4 h-6 w-6 text-blue-400 animate-spin-slow" />
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
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
              {t('services.deep.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="animate-on-scroll opacity-0 hover-card group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="glass-morphism rounded-2xl p-6 text-center space-y-4 h-full border border-cyan-100/50 transition-all duration-300 hover:border-cyan-300/50">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto bg-gradient-to-br from-cyan-100 to-blue-100 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-cyan-600 group-hover:rotate-12 transition-transform duration-300">
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
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-cyan-50/30 to-blue-50/30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Deep Cleaning Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our systematic deep cleaning process ensures every corner is thoroughly cleaned and sanitized
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
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-7 -right-4 w-8 h-0.5 bg-gradient-to-r from-cyan-300 to-transparent"></div>
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
                {t('services.deep.includes.title')}
              </h2>
              <p className="text-lg text-gray-600">
                Comprehensive deep cleaning services that go beyond surface cleaning for maximum results
              </p>
              
              <div className="space-y-4">
                {includes.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 group animate-on-scroll opacity-0"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-cyan-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-gray-700 text-lg group-hover:text-cyan-700 transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-on-scroll opacity-0 animation-delay-300">
              <div className="glass-morphism rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Why Choose Deep Cleaning?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Professional deep cleaning with intensive sanitization and restoration
                  </p>
                  <div className="space-y-4">
                    {deepCleanBenefits.map((benefit, index) => (
                      <div key={index} className="glass-morphism rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/booking"
                    className="btn-modern bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold text-center mt-6 w-full block hover:shadow-xl transition-all duration-300"
                  >
                    {t('bookNow')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When to Deep Clean Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-cyan-50/20 to-blue-50/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 animate-on-scroll opacity-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              When to Schedule Deep Cleaning
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Deep cleaning is recommended for these situations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-morphism rounded-2xl p-6 animate-on-scroll opacity-0">
              <Clock className="h-8 w-8 text-cyan-600 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Seasonal Cleaning</h4>
              <p className="text-sm text-gray-600">Spring or fall deep cleaning for complete refresh</p>
            </div>
            <div className="glass-morphism rounded-2xl p-6 animate-on-scroll opacity-0 animation-delay-100">
              <Home className="h-8 w-8 text-cyan-600 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Moving In/Out</h4>
              <p className="text-sm text-gray-600">Thorough cleaning for new beginnings</p>
            </div>
            <div className="glass-morphism rounded-2xl p-6 animate-on-scroll opacity-0 animation-delay-200">
              <Award className="h-8 w-8 text-cyan-600 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Special Events</h4>
              <p className="text-sm text-gray-600">Pre-event deep cleaning for perfect presentation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-on-scroll opacity-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('cta.ready')}
            </h2>
            <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-glass bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full hover:bg-white hover:text-cyan-600 transition-all duration-300 font-semibold text-lg hover:scale-105"
              >
                {t('getQuote')}
              </Link>
              <Link
                href="https://wa.me/393277791867"
                className="btn-glass border-2 border-white/50 text-white px-8 py-4 rounded-full hover:bg-white hover:text-cyan-600 transition-all duration-300 font-semibold text-lg hover:scale-105"
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