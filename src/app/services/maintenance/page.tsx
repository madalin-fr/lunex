'use client'

import Link from "next/link"
import { useLocale } from "@/hooks/useLocale"
import { useEffect, useRef } from 'react'
import {
  Calendar,
  Shield,
  Clock,
  DollarSign,
  CheckSquare,
  ArrowRight,
  Sparkles
} from 'lucide-react'

export default function MaintenanceCleaningPage() {
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
      icon: <CheckSquare className="h-6 w-6" />,
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
      description: "Perfect for high-traffic offices and commercial spaces",
      frequency: "Daily",
      popular: false
    },
    {
      title: t('services.maintenance.schedules.weekly'),
      description: "Ideal for most homes and small offices",
      frequency: "Weekly",
      popular: true
    },
    {
      title: t('services.maintenance.schedules.biweekly'),
      description: "Great for busy families and medium-sized offices",
      frequency: "Bi-weekly",
      popular: false
    },
    {
      title: t('services.maintenance.schedules.monthly'),
      description: "Comprehensive maintenance for seasonal care",
      frequency: "Monthly",
      popular: false
    }
  ]

  const benefits = [
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Time Savings",
      description: "Regular maintenance saves time and prevents deep cleaning needs"
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "Cost Effective",
      description: "Ongoing maintenance is more cost-effective than irregular deep cleaning"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Healthier Environment",
      description: "Consistent cleaning maintains a healthier living and working space"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-100/50 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-100/50 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-on-scroll opacity-0">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center glass-morphism">
                  <Calendar className="h-6 w-6 text-teal-600" />
                </div>
                <span className="text-teal-600 font-semibold tracking-wide">{t('services.maintenance.name')}</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {t('services.maintenance.title')}
                <span className="text-gradient bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent"> Scheduled</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('services.maintenance.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group btn-modern bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-center transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    {t('getQuote')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="tel:+393277791867"
                  className="btn-glass border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-full font-semibold text-center transition-all duration-300 hover:bg-teal-600 hover:text-white hover:scale-105"
                >
                  {t('call_now')}
                </Link>
              </div>
            </div>
            
            <div className="relative animate-on-scroll opacity-0 animation-delay-200">
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
      <section ref={featuresRef} className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('services.whyChooseUs.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('services.maintenance.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="animate-on-scroll opacity-0 hover-card group"
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
      <section ref={processRef} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-teal-50/30 to-emerald-50/30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Setting up your maintenance cleaning schedule is simple and straightforward
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('services.maintenance.schedules.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the maintenance schedule that works best for your needs and lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {schedules.map((schedule, index) => (
              <div 
                key={index} 
                className="animate-on-scroll opacity-0 hover-card group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`glass-morphism rounded-3xl p-6 h-full relative transition-all duration-300 hover:shadow-2xl ${schedule.popular ? 'border-2 border-teal-500' : 'border border-gray-200'}`}>
                  {schedule.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
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
                    <Link
                      href="/contact"
                      className={`btn-modern ${schedule.popular ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} px-6 py-3 rounded-full font-semibold text-center w-full block transition-all duration-300`}
                    >
                      Choose Plan
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center animate-on-scroll opacity-0">
            <div className="glass-morphism rounded-3xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('services.maintenance.schedules.custom')}
              </h3>
              <p className="text-gray-600 mb-6">
                Need a custom schedule? We can create a maintenance plan tailored to your specific needs and preferences. Whether you need different frequencies for different areas or have special requirements, we&apos;ll work with you to find the perfect solution.
              </p>
              <Link
                href="/contact"
                className="btn-modern bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold inline-block hover:shadow-xl transition-all duration-300"
              >
                Discuss Custom Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-teal-50/20 to-emerald-50/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 animate-on-scroll opacity-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Benefits of Regular Maintenance
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover why regular cleaning maintenance is the smart choice
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="glass-morphism rounded-2xl p-6 animate-on-scroll opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
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
          <div className="animate-on-scroll opacity-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('cta.ready')}
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your maintenance cleaning needs and create a schedule that works for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-glass bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full hover:bg-white hover:text-teal-600 transition-all duration-300 font-semibold text-lg hover:scale-105"
              >
                {t('getQuote')}
              </Link>
              <Link
                href="tel:+393277791867"
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