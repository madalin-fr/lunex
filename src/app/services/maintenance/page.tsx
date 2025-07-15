'use client'

import Link from "next/link"
import { useLocale } from "@/hooks/useLocale"
import { 
  Calendar, 
  CheckCircle, 
  Shield, 
  Users, 
  Clock, 
  Sparkles,
  Star,
  Phone,
  RefreshCw,
  DollarSign,
  CheckSquare
} from 'lucide-react'

export default function MaintenanceCleaningPage() {
  const { t } = useLocale()

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
      icon: <Calendar className="h-6 w-6" />
    },
    {
      title: t('services.maintenance.schedules.weekly'),
      description: "Ideal for most homes and small offices",
      frequency: "Weekly",
      icon: <Calendar className="h-6 w-6" />
    },
    {
      title: t('services.maintenance.schedules.biweekly'),
      description: "Great for busy families and medium-sized offices",
      frequency: "Bi-weekly",
      icon: <Calendar className="h-6 w-6" />
    },
    {
      title: t('services.maintenance.schedules.monthly'),
      description: "Comprehensive maintenance for seasonal care",
      frequency: "Monthly",
      icon: <Calendar className="h-6 w-6" />
    }
  ]

  const benefits = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time Savings",
      description: "Regular maintenance saves time and prevents deep cleaning needs"
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Cost Effective",
      description: "Ongoing maintenance is more cost-effective than irregular deep cleaning"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Consistent Quality",
      description: "Maintain high standards of cleanliness with regular professional care"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-50 to-green-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-teal-600" />
                </div>
                <span className="text-teal-600 font-semibold">{t('services.maintenance.name')}</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {t('services.maintenance.title')}
              </h1>
              
              <p className="text-xl text-gray-600">
                {t('services.maintenance.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-teal-600 text-white px-8 py-4 rounded-full hover:bg-teal-700 transition-colors font-semibold text-center"
                >
                  {t('getQuote')}
                </Link>
                <Link
                  href="tel:+393277791867"
                  className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-full hover:bg-teal-600 hover:text-white transition-colors font-semibold text-center"
                >
                  {t('call_now')}
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-center h-64 bg-teal-50 rounded-lg">
                  <Calendar className="h-24 w-24 text-teal-600" />
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
              {t('services.maintenance.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto text-teal-600">
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
              Our Service Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Setting up your maintenance cleaning schedule is simple and straightforward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg h-full">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-6 -right-4 w-8 h-0.5 bg-teal-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Schedules Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('services.maintenance.schedules.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the maintenance schedule that works best for your needs and lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {schedules.map((schedule, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600">
                  {schedule.icon}
                </div>
                <div className="mb-4">
                  <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {schedule.frequency}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{schedule.title}</h3>
                <p className="text-gray-600">{schedule.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Benefits of Regular Maintenance
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the advantages of consistent professional cleaning services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 text-teal-600">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Schedule Info */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <RefreshCw className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {t('services.maintenance.schedules.custom')}
                  </h3>
                </div>
                <p className="text-gray-600">
                  Need a custom schedule? We can create a maintenance plan tailored to your specific needs and preferences. Whether you need different frequencies for different areas or have special requirements, we'll work with you to find the perfect solution.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition-colors font-semibold text-center"
                  >
                    Discuss Custom Plan
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-teal-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">What's Included:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-teal-600" />
                      <span className="text-gray-700">Flexible scheduling options</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-teal-600" />
                      <span className="text-gray-700">Consistent quality standards</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-teal-600" />
                      <span className="text-gray-700">Regular quality monitoring</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-teal-600" />
                      <span className="text-gray-700">Professional equipment included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Ready to Set Up Your Schedule?
              </h2>
              <p className="text-lg text-gray-600">
                Contact us today to discuss your maintenance cleaning needs and create a schedule that works for you
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-teal-600" />
                  <span className="text-gray-700">{t('contactPage.info.hours.weekdays')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-teal-600" />
                  <span className="text-gray-700">{t('contactPage.info.phone.number')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-teal-600" />
                  <span className="text-gray-700">{t('services.whyChooseUs.insured.title')}</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-teal-50 rounded-2xl p-8">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {t('getQuote')}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Get a personalized quote for your maintenance cleaning schedule
                  </p>
                  <Link
                    href="/contact"
                    className="w-full bg-teal-600 text-white py-3 rounded-full hover:bg-teal-700 transition-colors font-semibold block text-center"
                  >
                    {t('getQuote')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-green-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t('cta.ready')}
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-teal-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              {t('getQuote')}
            </Link>
            <Link
              href="tel:+393277791867"
              className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-teal-600 transition-colors font-semibold text-lg"
            >
              {t('call_now')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}