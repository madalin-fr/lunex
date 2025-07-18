'use client'

import { useLocale } from '@/hooks/useLocale'
import { Button } from '@/components/ui/button'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  InteractiveCard 
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
      color: '#7c3aed', // Purple
      gradientFrom: 'from-purple-600',
      gradientTo: 'to-pink-600',
      badge: 'Popular'
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: t('services.domestic.title'),
      description: t('services.domestic.subtitle'),
      href: '/services/domestic',
      color: '#10b981', // Green
      gradientFrom: 'from-green-600',
      gradientTo: 'to-teal-600',
      badge: null
    },
    {
      icon: <Hammer className="h-8 w-8" />,
      title: t('services.postRenovation.title'),
      description: t('services.postRenovation.subtitle'),
      href: '/services/post-renovation',
      color: '#f59e0b', // Orange
      gradientFrom: 'from-orange-600',
      gradientTo: 'to-red-600',
      badge: null
    },
    {
      icon: <Crown className="h-8 w-8" />,
      title: t('services.luxury.title'),
      description: t('services.luxury.subtitle'),
      href: '/services/luxury',
      color: '#8b5cf6', // Purple
      gradientFrom: 'from-purple-600',
      gradientTo: 'to-indigo-600',
      badge: 'Premium'
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: t('services.deep.title'),
      description: t('services.deep.subtitle'),
      href: '/services/deep',
      color: '#06b6d4', // Cyan
      gradientFrom: 'from-cyan-600',
      gradientTo: 'to-blue-600',
      badge: null
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.subtitle'),
      href: '/services/maintenance',
      color: '#14b8a6', // Teal
      gradientFrom: 'from-teal-600',
      gradientTo: 'to-green-600',
      badge: 'New'
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
    <div className="min-h-screen bg-white">
      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
        {/* Animated background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-orange-600/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-from)_0%,transparent_70%)] from-purple-600/20" />
        </div>

        <div className="max-w-7xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('services.title')}
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-700">
            {t('services.subtitle')}
          </p>
          <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-600">
            {t('services.description')}
          </p>
        </div>
      </section>

      {/* Services Grid with Modern Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index} 
                className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, ${service.color}, transparent)`
                  }}
                />
                <CardHeader className="text-center relative">
                  {service.badge && (
                    <Badge 
                      className={`absolute top-4 right-4 bg-gradient-to-r ${service.gradientFrom} ${service.gradientTo} text-white border-0`}
                    >
                      {service.badge}
                    </Badge>
                  )}
                  <div 
                    className={`mx-auto rounded-full p-4 w-16 h-16 flex items-center justify-center text-white mb-4 bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} shadow-lg transform transition-transform duration-300 group-hover:scale-110`}
                  >
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl mb-2 text-gray-800">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Link href={service.href}>
                    <Button 
                      className={`w-full bg-gradient-to-r ${service.gradientFrom} ${service.gradientTo} text-white hover:shadow-lg transition-all duration-300 group`}
                    >
                      {t('viewDetails')}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section with Glass Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('services.whyChooseUs.title')}
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              {t('services.whyChooseUs.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div 
                key={index} 
                className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="rounded-full p-3 bg-gradient-to-br from-purple-600 to-pink-600 text-white flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Light gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('services.cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {t('services.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {t('getQuote')}
              </Button>
            </Link>
            <Link href="tel:+393277791867">
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/20 hover:shadow-xl transition-all duration-300"
              >
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