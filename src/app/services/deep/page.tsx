'use client'

import { useLocale } from '@/hooks/useLocale'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/badge'
import {
  Sparkles,
  CheckCircle,
  Zap,
  Clock,
  Target,
  RefreshCw,
  Award,
  Home,
  Calendar,
  Phone
} from 'lucide-react'
import Link from 'next/link'

export default function DeepCleaning() {
  const { t, locale } = useLocale()
  const basePath = locale === 'en' ? '/en' : ''

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
      icon: <RefreshCw className="h-6 w-6" />,
      title: t('services.deep.features.restoration'),
      description: t('services.deep.features.restorationDesc')
    }
  ]

  const process = [
    {
      step: '1',
      title: t('services.deep.process.step1'),
      description: t('services.deep.process.step1Desc')
    },
    {
      step: '2',
      title: t('services.deep.process.step2'),
      description: t('services.deep.process.step2Desc')
    },
    {
      step: '3',
      title: t('services.deep.process.step3'),
      description: t('services.deep.process.step3Desc')
    }
  ]

  const includes = [
    t('services.deep.includes.appliances'),
    t('services.deep.includes.grout'),
    t('services.deep.includes.baseboards'),
    t('services.deep.includes.light')
  ]

  const deepCleanBenefits = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: t('services.deep.scheduling.seasonal.title'),
      description: t('services.deep.scheduling.seasonal.description')
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: t('services.deep.scheduling.moving.title'),
      description: t('services.deep.scheduling.moving.description')
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: t('services.deep.scheduling.events.title'),
      description: t('services.deep.scheduling.events.description')
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <IconBadge
              icon={<Sparkles className="h-4 w-4" />}
              className="mb-4 bg-cyan-100 text-cyan-800 border-cyan-200"
            >
              {t('services.deep.name')}
            </IconBadge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('services.deep.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('services.deep.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 w-full sm:w-auto" asChild>
                <Link href={`${basePath}/contact`} className="flex items-center justify-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {t('bookNow')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white" asChild>
                <Link href="https://wa.me/393277791867" className="flex items-center justify-center">
                  <Phone className="h-5 w-5 mr-2" />
                  {t('call_now')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('services.deep.description')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-cyan-100 rounded-full p-3 w-16 h-16 flex items-center justify-center text-cyan-600 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('services.deep.processTitle')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto bg-cyan-600 rounded-full p-4 w-16 h-16 flex items-center justify-center text-white font-bold text-xl mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('services.deep.includes.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive deep cleaning services that go beyond surface cleaning
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {includes.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-cyan-50 transition-colors">
                <CheckCircle className="h-8 w-8 text-cyan-500 flex-shrink-0" />
                <span className="text-gray-800 text-lg font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Deep Clean Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('services.deep.scheduling.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('services.deep.scheduling.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deepCleanBenefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-cyan-100 rounded-full p-3 w-16 h-16 flex items-center justify-center text-cyan-600 mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('services.cta.title')}
          </h2>
          <p className="text-xl text-cyan-100 mb-8">
            {t('services.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-cyan-600 hover:bg-gray-100 w-full sm:w-auto" asChild>
              <Link href={`${basePath}/contact`} className="flex items-center justify-center">
                <Sparkles className="h-5 w-5 mr-2" />
                {t('cta.quote')}
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-cyan-600 w-full sm:w-auto" asChild>
              <Link href="https://wa.me/393277791867" className="flex items-center justify-center">
                <Phone className="h-5 w-5 mr-2" />
                {t('call_now')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}