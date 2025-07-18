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
      color: 'var(--color-primary)',
      badge: 'Popular'
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: t('services.domestic.title'),
      description: t('services.domestic.subtitle'),
      href: '/services/domestic',
      color: 'var(--color-success)',
      badge: null
    },
    {
      icon: <Hammer className="h-8 w-8" />,
      title: t('services.postRenovation.title'),
      description: t('services.postRenovation.subtitle'),
      href: '/services/post-renovation',
      color: 'var(--color-warning)',
      badge: null
    },
    {
      icon: <Crown className="h-8 w-8" />,
      title: t('services.luxury.title'),
      description: t('services.luxury.subtitle'),
      href: '/services/luxury',
      color: 'var(--color-secondary)',
      badge: 'Premium'
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: t('services.deep.title'),
      description: t('services.deep.subtitle'),
      href: '/services/deep',
      color: 'var(--color-accent)',
      badge: null
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.subtitle'),
      href: '/services/maintenance',
      color: 'var(--color-primary)',
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
    <div className="min-h-screen">
      {/* Progress bar */}
      <div className="progress-bar" />

      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        {/* Animated background gradient */}
        <div className="absolute inset-0 -z-10 parallax" style={{ '--parallax-speed': '0.3' } as React.CSSProperties}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,transparent_70%)] opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto text-center scroll-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            {t('services.title')}
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-balance">
            {t('services.subtitle')}
          </p>
          <p className="text-lg mb-12 max-w-2xl mx-auto text-balance opacity-80">
            {t('services.description')}
          </p>
        </div>
      </section>

      {/* Services Grid with Modern Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <InteractiveCard 
                key={index} 
                glowColor={service.color}
                parallax
                className="scroll-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`
                } as React.CSSProperties}
              >
                <CardHeader className="text-center relative">
                  {service.badge && (
                    <Badge 
                      variant="gradient" 
                      className="absolute top-4 right-4"
                      animated
                    >
                      {service.badge}
                    </Badge>
                  )}
                  <div 
                    className="mx-auto rounded-full p-4 w-16 h-16 flex items-center justify-center text-white mb-4 animate-float glass"
                    style={{ 
                      backgroundColor: service.color,
                      animationDelay: `${index * 200}ms`
                    }}
                  >
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-pretty">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Link href={service.href}>
                    <Button 
                      variant="gradient" 
                      className="w-full group"
                    >
                      {t('viewDetails')}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section with Glass Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              {t('services.whyChooseUs.title')}
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-balance">
              {t('services.whyChooseUs.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card 
                key={index} 
                variant="glass" 
                className="feature-card scroll-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`
                } as React.CSSProperties}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full p-3 text-white flex-shrink-0 neo-button">
                      <span className="icon" style={{ color: 'var(--color-primary)' }}>
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm opacity-80">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Glow Effect */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-float">
            {t('services.cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {t('services.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="neo"
                className="bg-white text-primary hover:shadow-glow"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {t('getQuote')}
              </Button>
            </Link>
            <Link href="tel:+393277791867">
              <Button 
                size="lg" 
                variant="glass"
                className="text-white hover:shadow-glow"
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