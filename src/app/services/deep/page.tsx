'use client'

import Link from "next/link"
import { useLocale } from "@/hooks/useLocale"
import { 
  Sparkles, 
  CheckCircle, 
  Shield, 
  Users, 
  Clock, 
  Zap,
  Star,
  Phone,
  RefreshCw,
  Target
} from 'lucide-react'

export default function DeepCleaningPage() {
  const { t } = useLocale()

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

  const benefits = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Improved Air Quality",
      description: "Deep cleaning removes dust, allergens, and pollutants for healthier indoor air"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Sanitization",
      description: "Thorough disinfection eliminates bacteria, viruses, and harmful microorganisms"
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: "Surface Restoration",
      description: "Restore surfaces to their original condition with professional techniques"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-cyan-50 to-blue-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-cyan-600" />
                </div>
                <span className="text-cyan-600 font-semibold">{t('services.deep.name')}</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {t('services.deep.title')}
              </h1>
              
              <p className="text-xl text-gray-600">
                {t('services.deep.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-cyan-600 text-white px-8 py-4 rounded-full hover:bg-cyan-700 transition-colors font-semibold text-center"
                >
                  {t('getQuote')}
                </Link>
                <Link
                  href="tel:+393277791867"
                  className="border-2 border-cyan-600 text-cyan-600 px-8 py-4 rounded-full hover:bg-cyan-600 hover:text-white transition-colors font-semibold text-center"
                >
                  {t('call_now')}
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-center h-64 bg-cyan-50 rounded-lg">
                  <Sparkles className="h-24 w-24 text-cyan-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('services.whyChooseUs.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('services.deep.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto text-cyan-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Intensive Cleaning Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our systematic deep cleaning process ensures every corner is thoroughly cleaned and sanitized
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg h-full">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-6 -right-4 w-8 h-0.5 bg-cyan-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {t('services.deep.includes.title')}
              </h2>
              <p className="text-lg text-gray-600">
                Comprehensive deep cleaning services that go beyond surface cleaning for maximum results
              </p>
              
              <div className="space-y-3">
                {includes.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-cyan-50 rounded-2xl p-8">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {t('getQuote')}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Professional deep cleaning with intensive sanitization and restoration
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-cyan-600" />
                      <span className="text-gray-700">{t('contactPage.info.hours.weekdays')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-cyan-600" />
                      <span className="text-gray-700">{t('contactPage.info.phone.number')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-cyan-600" />
                      <span className="text-gray-700">{t('services.whyChooseUs.insured.title')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-cyan-600" />
                      <span className="text-gray-700">Professional Equipment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Benefits of Deep Cleaning
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference our intensive cleaning process makes for your space
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6 text-cyan-600">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Choose Deep Cleaning */}
      <section className="py-16 bg-cyan-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <Sparkles className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                When to Choose Deep Cleaning
              </h3>
              <p className="text-gray-600">
                Deep cleaning is recommended in these situations for optimal results
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-6 w-6 text-cyan-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Seasonal Cleaning</h4>
                <p className="text-sm text-gray-600">Spring or fall deep cleaning for complete refresh</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-cyan-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Special Events</h4>
                <p className="text-sm text-gray-600">Before hosting important events or gatherings</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-cyan-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Health Concerns</h4>
                <p className="text-sm text-gray-600">When dealing with allergies or health issues</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto">
                  <RefreshCw className="h-6 w-6 text-cyan-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Move In/Out</h4>
                <p className="text-sm text-gray-600">Moving into a new space or preparing to leave</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t('cta.ready')}
          </h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-cyan-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              {t('getQuote')}
            </Link>
            <Link
              href="tel:+393277791867"
              className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-cyan-600 transition-colors font-semibold text-lg"
            >
              {t('call_now')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}