'use client'

import { useLocale } from '@/hooks/useLocale'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { IconBadge } from '@/components/ui/badge'
import {
  Building2,
  Clock,
  Sparkles,
  CheckCircle,
  Phone,
  Calendar,
  Users,
  Home
} from 'lucide-react'
import Link from 'next/link'

export default function OfficeCleaning() {
  const { t, locale } = useLocale()
  const basePath = locale === 'en' ? '/en' : ''

  const features = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: t('services.office.features.flexible'),
      description: t('services.office.features.flexibleDesc')
    },
    {
      icon: <Home className="h-6 w-6" />,
      title: t('services.office.features.equipment'),
      description: t('services.office.features.equipmentDesc')
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('services.office.features.daily'),
      description: t('services.office.features.dailyDesc')
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: t('services.office.features.specialized'),
      description: t('services.office.features.specializedDesc')
    }
  ]

  const process = [
    {
      step: '1',
      title: t('services.office.process.step1'),
      description: t('services.office.process.step1Desc')
    },
    {
      step: '2',
      title: t('services.office.process.step2'),
      description: t('services.office.process.step2Desc')
    },
    {
      step: '3',
      title: t('services.office.process.step3'),
      description: t('services.office.process.step3Desc')
    },
    {
      step: '4',
      title: t('services.office.process.step4'),
      description: t('services.office.process.step4Desc')
    }
  ]

  const includes = [
    t('services.office.includes.dusting'),
    t('services.office.includes.vacuuming'),
    t('services.office.includes.bathrooms'),
    t('services.office.includes.kitchen'),
    t('services.office.includes.windows'),
    t('services.office.includes.trash'),
    t('services.office.includes.customPlans')
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <IconBadge
              icon={<Building2 className="h-4 w-4" />}
              className="mb-4 bg-blue-100 text-blue-800 border-blue-200"
            >
              {t('services.office.name')}
            </IconBadge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('services.office.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('services.office.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" asChild>
                <Link href={`${basePath}/contact`} className="flex items-center justify-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {t('bookNow')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white" asChild>
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
              {t('services.office.description')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center text-blue-600 mb-4">
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
              Our Process
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto bg-blue-600 rounded-full p-4 w-16 h-16 flex items-center justify-center text-white font-bold text-xl mb-4">
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('services.office.includes.title')}
              </h2>
              <div className="space-y-4">
                {includes.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center">
                <Building2 className="h-32 w-32 text-blue-600" />
              </div>
            </div>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto" asChild>
              <Link href={`${basePath}/contact`} className="flex items-center justify-center">
                <Sparkles className="h-5 w-5 mr-2" />
                {t('cta.quote')}
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 w-full sm:w-auto" asChild>
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