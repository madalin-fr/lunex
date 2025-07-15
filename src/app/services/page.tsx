'use client'

import { useLocale } from '@/hooks/useLocale'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Building2, 
  Home, 
  Hammer, 
  Crown, 
  Sparkles, 
  Calendar,
  Phone,
  ArrowRight,
  CheckCircle,
  Users
} from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
  const { t, locale } = useLocale()

  const services = [
    {
      icon: <Building2 className="h-8 w-8" />,
      title: t('services.office.title'),
      description: t('services.office.subtitle'),
      href: '/services/office',
      color: 'bg-blue-500'
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: t('services.domestic.title'),
      description: t('services.domestic.subtitle'),
      href: '/services/domestic',
      color: 'bg-green-500'
    },
    {
      icon: <Hammer className="h-8 w-8" />,
      title: t('services.postRenovation.title'),
      description: t('services.postRenovation.subtitle'),
      href: '/services/post-renovation',
      color: 'bg-orange-500'
    },
    {
      icon: <Crown className="h-8 w-8" />,
      title: t('services.luxury.title'),
      description: t('services.luxury.subtitle'),
      href: '/services/luxury',
      color: 'bg-purple-500'
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: t('services.deep.title'),
      description: t('services.deep.subtitle'),
      href: '/services/deep',
      color: 'bg-indigo-500'
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.subtitle'),
      href: '/services/maintenance',
      color: 'bg-teal-500'
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
      icon: <Calendar className="h-6 w-6" />,
      title: t('services.whyChooseUs.reliable.title'),
      description: t('services.whyChooseUs.reliable.description')
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: t('services.whyChooseUs.eco.title'),
      description: t('services.whyChooseUs.eco.description')
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: t('services.whyChooseUs.insured.title'),
      description: t('services.whyChooseUs.insured.description')
    },
    {
      icon: <Home className="h-6 w-6" />,
      title: t('services.whyChooseUs.local.title'),
      description: t('services.whyChooseUs.local.description')
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('services.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className={`mx-auto ${service.color} rounded-full p-4 w-16 h-16 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Link href={service.href}>
                    <Button className="w-full group-hover:bg-blue-600 transition-colors">
                      {t('viewDetails')}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('services.whyChooseUs.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('services.whyChooseUs.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3 text-blue-600 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('services.cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('services.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Calendar className="h-5 w-5 mr-2" />
                {t('getQuote')}
              </Button>
            </Link>
            <Link href="tel:+393277791867">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Phone className="h-5 w-5 mr-2" />
                {t('call_now')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}