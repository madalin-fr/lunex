'use client'

import Link from "next/link"
import { useLocale } from "@/hooks/useLocale"
import { 
  Home, 
  CheckCircle, 
  Shield, 
  Users, 
  Clock, 
  Sparkles,
  Star,
  Phone,
  Calendar
} from 'lucide-react'

export default function DomesticCleaningPage() {
  const { t } = useLocale()

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
      <section className="relative bg-gradient-to-r from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Home className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-green-600 font-semibold">{t('services.domestic.name')}</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {t('services.domestic.title')}
              </h1>
              
              <p className="text-xl text-gray-600">
                {t('services.domestic.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition-colors font-semibold text-center"
                >
                  {t('getQuote')}
                </Link>
                <Link
                  href="tel:+393277791867"
                  className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full hover:bg-green-600 hover:text-white transition-colors font-semibold text-center"
                >
                  {t('call_now')}
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-center h-64 bg-green-50 rounded-lg">
                  <Home className="h-24 w-24 text-green-600" />
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
              {t('services.domestic.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
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
              {t('services.domestic.process.step1').split(' ')[0]} {t('services.domestic.process.step2').split(' ')[0]}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our systematic approach ensures thorough and efficient cleaning every time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg h-full">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-6 -right-4 w-8 h-0.5 bg-green-200"></div>
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
                {t('services.domestic.includes.title')}
              </h2>
              <p className="text-lg text-gray-600">
                Our comprehensive domestic cleaning service covers all essential areas of your home
              </p>
              
              <div className="space-y-3">
                {includes.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-green-50 rounded-2xl p-8">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {t('getQuote')}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Professional home cleaning services tailored to your needs
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{t('contactPage.info.hours.weekdays')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{t('contactPage.info.phone.number')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{t('services.whyChooseUs.insured.title')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t('cta.ready')}
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-green-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              {t('getQuote')}
            </Link>
            <Link
              href="tel:+393277791867"
              className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-green-600 transition-colors font-semibold text-lg"
            >
              {t('call_now')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}