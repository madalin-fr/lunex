'use client'

import Link from "next/link"
import { useLocale } from "@/hooks/useLocale"
import { 
  Crown, 
  CheckCircle, 
  Shield, 
  Users, 
  Clock, 
  Sparkles,
  Star,
  Phone,
  Eye,
  Award
} from 'lucide-react'

export default function LuxuryCleaningPage() {
  const { t } = useLocale()

  const features = [
    {
      icon: <Crown className="h-6 w-6" />,
      title: t('services.luxury.features.premium'),
      description: t('services.luxury.features.premiumDesc')
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: t('services.luxury.features.attention'),
      description: t('services.luxury.features.attentionDesc')
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('services.luxury.features.discreet'),
      description: t('services.luxury.features.discreetDesc')
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: t('services.luxury.features.custom'),
      description: t('services.luxury.features.customDesc')
    }
  ]

  const process = [
    {
      step: "01",
      title: t('services.luxury.process.step1'),
      description: t('services.luxury.process.step1Desc')
    },
    {
      step: "02",
      title: t('services.luxury.process.step2'),
      description: t('services.luxury.process.step2Desc')
    },
    {
      step: "03",
      title: t('services.luxury.process.step3'),
      description: t('services.luxury.process.step3Desc')
    },
    {
      step: "04",
      title: t('services.luxury.process.step4'),
      description: t('services.luxury.process.step4Desc')
    }
  ]

  const includes = [
    t('services.luxury.includes.furniture'),
    t('services.luxury.includes.surfaces'),
    t('services.luxury.includes.chandeliers'),
    t('services.luxury.includes.marble'),
    t('services.luxury.includes.carpet'),
    t('services.luxury.includes.outdoor'),
    t('services.luxury.includes.maintenance')
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-50 to-pink-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Crown className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-purple-600 font-semibold">{t('services.luxury.name')}</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {t('services.luxury.title')}
              </h1>
              
              <p className="text-xl text-gray-600">
                {t('services.luxury.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-purple-600 text-white px-8 py-4 rounded-full hover:bg-purple-700 transition-colors font-semibold text-center"
                >
                  {t('getQuote')}
                </Link>
                <Link
                  href="tel:+393277791867"
                  className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full hover:bg-purple-600 hover:text-white transition-colors font-semibold text-center"
                >
                  {t('call_now')}
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-center h-64 bg-purple-50 rounded-lg">
                  <Crown className="h-24 w-24 text-purple-600" />
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
              {t('services.luxury.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-purple-600">
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
              Premium Service Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              White-glove cleaning service with the highest attention to detail and luxury standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg h-full border-2 border-purple-100">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-6 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-300 to-pink-300"></div>
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
                {t('services.luxury.includes.title')}
              </h2>
              <p className="text-lg text-gray-600">
                Comprehensive luxury cleaning services with specialized care for high-end properties and furnishings
              </p>
              
              <div className="space-y-3">
                {includes.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {t('getQuote')}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Premium cleaning services for luxury villas and high-end properties
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-700">{t('contactPage.info.hours.weekdays')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-700">{t('contactPage.info.phone.number')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-700">{t('services.whyChooseUs.insured.title')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-700">Discreet & Professional</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Standards Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <Crown className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Luxury Standards
              </h3>
              <p className="text-gray-600">
                We understand that luxury properties require specialized care and attention to detail
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Premium Products</h4>
                <p className="text-sm text-gray-600">High-end, luxury-grade cleaning products safe for fine materials</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Expert Team</h4>
                <p className="text-sm text-gray-600">Specially trained professionals experienced in luxury property care</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900">White-Glove Service</h4>
                <p className="text-sm text-gray-600">The highest level of service with complete attention to detail</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t('cta.ready')}
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-purple-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              {t('getQuote')}
            </Link>
            <Link
              href="tel:+393277791867"
              className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-purple-600 transition-colors font-semibold text-lg"
            >
              {t('call_now')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}