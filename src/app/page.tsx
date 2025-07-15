'use client'

import Link from "next/link"
import { useLocale } from "@/hooks/useLocale"
import { 
  Building2, 
  Home, 
  Hammer, 
  Crown, 
  Sparkles, 
  Calendar,
  Phone,
  CheckCircle,
  Clock,
  Shield,
  Users,
  Star
} from 'lucide-react'

export default function HomePage() {
  const { t } = useLocale()

  const services = [
    {
      icon: <Building2 className="h-8 w-8" />,
      title: t('services.office.title'),
      description: t('services.office.subtitle'),
      href: '/services/office'
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: t('services.domestic.title'),
      description: t('services.domestic.subtitle'),
      href: '/services/domestic'
    },
    {
      icon: <Hammer className="h-8 w-8" />,
      title: t('services.postRenovation.title'),
      description: t('services.postRenovation.subtitle'),
      href: '/services/post-renovation'
    },
    {
      icon: <Crown className="h-8 w-8" />,
      title: t('services.luxury.title'),
      description: t('services.luxury.subtitle'),
      href: '/services/luxury'
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: t('services.deep.title'),
      description: t('services.deep.subtitle'),
      href: '/services/deep'
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.subtitle'),
      href: '/services/maintenance'
    }
  ]

  const whyChooseUs = [
    {
      icon: <Users className="h-6 w-6" />,
      title: t('services.whyChooseUs.experience.title'),
      description: t('services.whyChooseUs.experience.description')
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: t('services.whyChooseUs.quality.title'),
      description: t('services.whyChooseUs.quality.description')
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('services.whyChooseUs.insured.title'),
      description: t('services.whyChooseUs.insured.description')
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-indigo-100 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {t('hero.title')}
                  <span className="text-blue-600"> {t('hero.subtitle')}</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-xl">
                  {t('hero.description')}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors font-semibold text-lg text-center"
                >
                  {t('hero.cta')}
                </Link>
                <Link
                  href="/services"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-600 hover:text-white transition-colors font-semibold text-lg text-center"
                >
                  {t('servicesNav')}
                </Link>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>{t('services.whyChooseUs.experience.title')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>{t('services.whyChooseUs.insured.title')}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-blue-100 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('getQuote')}</h3>
                  <p className="text-gray-600 mb-6">{t('contactPage.info.hours.weekdays')}</p>
                  <Link
                    href="/contact"
                    className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors font-semibold block text-center"
                  >
                    {t('contactUs')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('services.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow group">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link href={service.href} className="text-blue-600 hover:text-blue-700 font-medium">
                  {t('read_more')} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {t('services.whyChooseUs.title')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('services.whyChooseUs.subtitle')}
              </p>
              
              <div className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-white">
                      <CheckCircle className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link
                href="/contact"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                {t('contactUs')}
                <Phone className="w-4 h-4 ml-2" />
              </Link>
            </div>
            
            <div className="relative">
              <div className="bg-blue-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('contactPage.info.hours.title')}</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>{t('contactPage.info.hours.weekdays').split(':')[0]}</span>
                      <span>8:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('contactPage.info.hours.saturday_hours').split(':')[0]}</span>
                      <span>8:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('contactPage.info.hours.sunday_hours').split(':')[0]}</span>
                      <span>{t('contactPage.info.hours.sunday_hours').split(':')[1]}</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-4">{t('contactPage.info.phone.whatsapp')}</p>
                    <Link
                      href="tel:+393277791867"
                      className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors font-semibold block text-center"
                    >
                      {t('call_now')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('reviews')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Servizio di pulizia uffici eccellente! Professionali, puntuali e molto accurati. Il nostro ufficio è sempre impeccabile."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">M</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">Marco Verdi</h4>
                  <p className="text-sm text-gray-600">Direttore Ufficio</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Pulizie domestiche di altissima qualità. Personale affidabile e prodotti eco-compatibili. Consiglio vivamente!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">A</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">Anna Bianchi</h4>
                  <p className="text-sm text-gray-600">Proprietaria Casa</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Dopo la ristrutturazione hanno lasciato tutto perfetto. Servizio post-lavori impeccabile e molto professionale."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">L</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">Luigi Rossi</h4>
                  <p className="text-sm text-gray-600">Proprietario</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/reviews"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              {t('view_all')} {t('reviews')}
              <Phone className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t('cta.ready')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              {t('getQuote')}
            </Link>
            <Link
              href="tel:+393277791867"
              className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-blue-600 transition-colors font-semibold text-lg"
            >
              {t('call_now')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
