'use client'

import Link from "next/link"
import { useLocale } from "@/hooks/useLocale"
import { 
  Hammer, 
  CheckCircle, 
  Shield, 
  Users, 
  Clock, 
  Sparkles,
  Star,
  Phone,
  AlertTriangle,
  HardHat
} from 'lucide-react'

export default function PostRenovationCleaningPage() {
  const { t } = useLocale()

  const features = [
    {
      icon: <HardHat className="h-6 w-6" />,
      title: t('services.postRenovation.features.specialized'),
      description: t('services.postRenovation.features.specializedDesc')
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: t('services.postRenovation.features.debris'),
      description: t('services.postRenovation.features.debrisDesc')
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: t('services.postRenovation.features.dust'),
      description: t('services.postRenovation.features.dustDesc')
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('services.postRenovation.features.safety'),
      description: t('services.postRenovation.features.safetyDesc')
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
    t('services.postRenovation.includes.debris'),
    t('services.postRenovation.includes.dust'),
    t('services.postRenovation.includes.fixtures'),
    t('services.postRenovation.includes.floors'),
    t('services.postRenovation.includes.windows'),
    t('services.postRenovation.includes.sanitization'),
    t('services.postRenovation.includes.final')
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-50 to-yellow-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Hammer className="h-6 w-6 text-orange-600" />
                </div>
                <span className="text-orange-600 font-semibold">{t('services.postRenovation.name')}</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {t('services.postRenovation.title')}
              </h1>
              
              <p className="text-xl text-gray-600">
                {t('services.postRenovation.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-orange-600 text-white px-8 py-4 rounded-full hover:bg-orange-700 transition-colors font-semibold text-center"
                >
                  {t('getQuote')}
                </Link>
                <Link
                  href="tel:+393277791867"
                  className="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-full hover:bg-orange-600 hover:text-white transition-colors font-semibold text-center"
                >
                  {t('call_now')}
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-center h-64 bg-orange-50 rounded-lg">
                  <Hammer className="h-24 w-24 text-orange-600" />
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
              {t('services.postRenovation.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-orange-600">
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
              Our Specialized Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional post-construction cleaning with specialized equipment and techniques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg h-full">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-6 -right-4 w-8 h-0.5 bg-orange-200"></div>
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
                {t('services.postRenovation.includes.title')}
              </h2>
              <p className="text-lg text-gray-600">
                Complete post-construction cleaning services to prepare your space for immediate use
              </p>
              
              <div className="space-y-3">
                {includes.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-orange-50 rounded-2xl p-8">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {t('getQuote')}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Specialized cleaning for post-construction and renovation projects
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <span className="text-gray-700">{t('contactPage.info.hours.weekdays')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-orange-600" />
                      <span className="text-gray-700">{t('contactPage.info.phone.number')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-orange-600" />
                      <span className="text-gray-700">{t('services.whyChooseUs.insured.title')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <HardHat className="h-5 w-5 text-orange-600" />
                      <span className="text-gray-700">Safety Equipment Included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Notice Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Safety First Approach
                </h3>
                <p className="text-gray-600 mb-4">
                  Our team uses proper safety equipment and follows strict protocols when handling construction debris and dust removal. We ensure a safe working environment for our staff and your property.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Protective Equipment</span>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Safety Protocols</span>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Proper Disposal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t('cta.ready')}
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-orange-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              {t('getQuote')}
            </Link>
            <Link
              href="tel:+393277791867"
              className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-orange-600 transition-colors font-semibold text-lg"
            >
              {t('call_now')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}