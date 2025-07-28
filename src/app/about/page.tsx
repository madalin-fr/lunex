'use client'

import { useLocale } from '@/hooks/useLocale'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Users, Award, Leaf, Shield, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const { t } = useLocale()

  const values = [
    {
      icon: <Award className="h-6 w-6" />,
      title: t('aboutPage.values.qualityExcellence.title'),
      description: t('aboutPage.values.qualityExcellence.description')
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('aboutPage.values.customerFirst.title'),
      description: t('aboutPage.values.customerFirst.description')
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: t('aboutPage.values.ecoFriendly.title'),
      description: t('aboutPage.values.ecoFriendly.description')
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('aboutPage.values.fullyInsured.title'),
      description: t('aboutPage.values.fullyInsured.description')
    }
  ]


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-orange-600/10" />
        </div>

        <div className="max-w-7xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('about')}
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-700">
            {t('aboutPage.subtitle')}
          </p>
          <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-600">
            {t('aboutPage.description')}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('aboutPage.story.title')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('aboutPage.story.content1')}
              </p>
              <p className="text-gray-600 mb-4">
                {t('aboutPage.story.content2')}
              </p>
              <p className="text-gray-600">
                {t('aboutPage.story.content3')}
              </p>
            </div>
            <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <Building2 className="h-32 w-32 text-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('aboutPage.values.title')}
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              {t('aboutPage.values.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto rounded-full p-3 bg-gradient-to-br from-purple-600 to-pink-600 text-white w-fit mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('aboutPage.team.title')}
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              {t('aboutPage.team.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="aspect-square rounded-full bg-gradient-to-br from-purple-600 to-pink-600 mb-4 flex items-center justify-center">
                    <Users className="h-20 w-20 text-white/20" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">{t('aboutPage.team.teamMember')}</h3>
                  <p className="text-center text-gray-600">{t('aboutPage.team.professionalCleaner')}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('aboutPage.cta.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('aboutPage.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition-all duration-300"
              asChild
            >
              <Link href="/contact" className="flex items-center justify-center">
                <Mail className="h-5 w-5 mr-2" />
                {t('aboutPage.cta.getInTouch')}
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-purple-600 text-purple-600 hover:bg-purple-50 transition-all duration-300"
              asChild
            >
              <Link href="https://wa.me/393277791867" className="flex items-center justify-center">
                <Phone className="h-5 w-5 mr-2" />
                {t('aboutPage.cta.callUsNow')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}