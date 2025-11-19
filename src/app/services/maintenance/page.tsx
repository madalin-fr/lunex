'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useLocale } from '@/hooks/useLocale'
import {
  Calendar,
  Shield,
  Clock,
  DollarSign,
  CheckSquare,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'

export default function MaintenanceCleaningPage() {
  const { t, locale } = useLocale()
  const basePath = locale === 'en' ? '/en' : ''
  useScrollAnimation()

  const features = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: t('services.maintenance.features.regular'),
      description: t('services.maintenance.features.regularDesc')
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: t('services.maintenance.features.flexible'),
      description: t('services.maintenance.features.flexibleDesc')
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('services.maintenance.features.consistent'),
      description: t('services.maintenance.features.consistentDesc')
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: t('services.maintenance.features.affordable'),
      description: t('services.maintenance.features.affordableDesc')
    }
  ]

  const process = [
    {
      step: "01",
      title: t('services.maintenance.process.step1'),
      description: t('services.maintenance.process.step1Desc')
    },
    {
      step: "02",
      title: t('services.maintenance.process.step2'),
      description: t('services.maintenance.process.step2Desc')
    },
    {
      step: "03",
      title: t('services.maintenance.process.step3'),
      description: t('services.maintenance.process.step3Desc')
    },
    {
      step: "04",
      title: t('services.maintenance.process.step4'),
      description: t('services.maintenance.process.step4Desc')
    }
  ]

  const schedules = [
    {
      title: t('services.maintenance.schedules.daily'),
      description: t('services.maintenance.schedules.dailyDesc'),
      frequency: t('services.maintenance.schedules.dailyFreq'),
      popular: false
    },
    {
      title: t('services.maintenance.schedules.weekly'),
      description: t('services.maintenance.schedules.weeklyDesc'),
      frequency: t('services.maintenance.schedules.weeklyFreq'),
      popular: true
    },
    {
      title: t('services.maintenance.schedules.biweekly'),
      description: t('services.maintenance.schedules.biweeklyDesc'),
      frequency: t('services.maintenance.schedules.biweeklyFreq'),
      popular: false
    },
    {
      title: t('services.maintenance.schedules.monthly'),
      description: t('services.maintenance.schedules.monthlyDesc'),
      frequency: t('services.maintenance.schedules.monthlyFreq'),
      popular: false
    }
  ]

  const benefits = [
    {
      icon: <Clock className="h-5 w-5" />,
      title: t('services.maintenance.schedules.timeSavings'),
      description: t('services.maintenance.schedules.timeSavingsDesc')
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: t('services.maintenance.schedules.costEffective'),
      description: t('services.maintenance.schedules.costEffectiveDesc')
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: t('services.maintenance.schedules.healthierEnv'),
      description: t('services.maintenance.schedules.healthierEnvDesc')
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-100/50 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-100/50 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-on-scroll">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center glass-morphism">
                  <Calendar className="h-6 w-6 text-teal-600" />
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {(() => {
                  const title = t('services.maintenance.title')
                  const styledWord =
                    locale === 'it' ? 'Mantenimento' : 'Maintenance'
                  const parts = title.split(styledWord)
                  return (
                    <>
                      {parts[0]}
                      <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                        {styledWord}
                      </span>
                      {parts[1]}
                    </>
                  )
                })()}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('services.maintenance.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`${basePath}/contact`}
                  className="group btn-modern bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-center transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    {t('getQuote')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="https://wa.me/393277791867"
                  className="btn-glass border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-full font-semibold text-center transition-all duration-300 hover:bg-teal-600 hover:text-white hover:scale-105"
                >
                  {t('call_now')}
                </Link>
              </div>
            </div>
            
            <div className="relative animate-on-scroll animation-delay-200">
              <div className="glass-morphism rounded-3xl p-8 hover-card">
                <div className="relative bg-gradient-to-br from-teal-400/20 to-emerald-400/20 rounded-2xl p-12 overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  <Calendar className="h-32 w-32 text-teal-600 mx-auto relative z-10 animate-float" />
                  <CheckSquare className="absolute top-4 right-4 h-8 w-8 text-teal-400 animate-pulse" />
                  <Sparkles className="absolute bottom-4 left-4 h-6 w-6 text-emerald-400 animate-spin-slow" />
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('services.whyChooseUs.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('services.maintenance.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="animate-on-scroll hover-card group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="glass-morphism rounded-2xl p-6 text-center space-y-4 h-full border border-teal-100/50 transition-all duration-300 hover:border-teal-300/50">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto bg-gradient-to-br from-teal-100 to-emerald-100 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-teal-600 group-hover:rotate-12 transition-transform duration-300">
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
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-teal-50/30 to-emerald-50/30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('services.maintenance.schedules.howItWorks')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('services.maintenance.schedules.howItWorksDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            {process.map((item, index) => (
              <div
                key={index}
                className="relative animate-on-scroll"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="glass-morphism rounded-3xl p-6 h-full hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
                  <div className="text-center space-y-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-7 -right-4 w-8 h-0.5 bg-gradient-to-r from-teal-300 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedules Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('services.maintenance.schedules.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('services.maintenance.schedules.scheduleDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {schedules.map((schedule, index) => (
              <div
                key={index}
                className="animate-on-scroll hover-card group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`glass-morphism rounded-3xl p-6 h-full relative transition-all duration-300 hover:shadow-2xl ${schedule.popular ? 'border-2 border-teal-500' : 'border border-gray-200'}`}>
                  {schedule.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        {t('services.maintenance.schedules.mostPopular')}
                      </span>
                    </div>
                  )}
                  <div className="text-center space-y-4 pt-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {schedule.title}
                    </h3>
                    <div className="text-4xl font-bold text-gradient bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                      {schedule.frequency}
                    </div>
                    <p className="text-gray-600">
                      {schedule.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center animate-on-scroll">
            <div className="glass-morphism rounded-3xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('services.maintenance.schedules.custom')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('services.maintenance.schedules.customDesc')}
              </p>
              <Link
                href={`${basePath}/contact`}
                className="btn-modern bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold inline-block hover:shadow-xl transition-all duration-300"
              >
                {t('services.maintenance.schedules.discussCustom')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-teal-50/20 to-emerald-50/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('services.maintenance.schedules.benefitsTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('services.maintenance.schedules.benefitsDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="glass-morphism rounded-2xl p-6 animate-on-scroll" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start space-x-4">
                  <div className="text-teal-600">{benefit.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-on-scroll">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('cta.ready')}
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              {t('services.maintenance.schedules.ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`${basePath}/contact`}
                className="btn-glass bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full hover:bg-white hover:text-teal-600 transition-all duration-300 font-semibold text-lg hover:scale-105"
              >
                {t('getQuote')}
              </Link>
              <Link
                href="https://wa.me/393277791867"
                className="btn-glass border-2 border-white/50 text-white px-8 py-4 rounded-full hover:bg-white hover:text-teal-600 transition-all duration-300 font-semibold text-lg hover:scale-105"
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