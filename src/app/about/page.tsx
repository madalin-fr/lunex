'use client'

import { useLocale } from '@/hooks/useLocale'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Users, Award, Leaf, Shield, Clock, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const { t } = useLocale()

  const values = [
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Quality Excellence',
      description: 'We maintain the highest standards in every cleaning service we provide'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Customer First',
      description: 'Your satisfaction is our priority, with personalized service every time'
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: 'Eco-Friendly',
      description: 'Using environmentally safe products for a healthier clean'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Fully Insured',
      description: 'Complete insurance coverage for your peace of mind'
    }
  ]

  const stats = [
    { number: '10+', label: 'Years Experience' },
    { number: '500+', label: 'Happy Customers' },
    { number: '1000+', label: 'Projects Completed' },
    { number: '24/7', label: 'Support Available' }
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
            Professional Cleaning Services in Romano di Lombardia
          </p>
          <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-600">
            With over 10 years of experience, Lunex is your trusted partner for all cleaning needs in the Bergamo province.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                Founded in Romano di Lombardia, Lunex has grown from a small family business to one of the most trusted cleaning services in the Bergamo province. Our commitment to quality and customer satisfaction has been the cornerstone of our success.
              </p>
              <p className="text-gray-600 mb-4">
                We believe that a clean environment is essential for health, productivity, and well-being. That's why we use only the best eco-friendly products and employ trained professionals who care about the details.
              </p>
              <p className="text-gray-600">
                Today, we serve hundreds of homes, offices, and commercial spaces, building lasting relationships based on trust, reliability, and exceptional service.
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
              Our Values
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              What sets us apart in the cleaning industry
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

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Our Team
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              Dedicated professionals committed to excellence
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
                  <h3 className="text-xl font-semibold text-center mb-2">Team Member</h3>
                  <p className="text-center text-gray-600">Professional Cleaner</p>
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
            Ready to Experience the Lunex Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of satisfied customers who trust us with their cleaning needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition-all duration-300"
              >
                <Mail className="h-5 w-5 mr-2" />
                Get in Touch
              </Button>
            </Link>
            <Link href="tel:+393277791867">
              <Button 
                size="lg" 
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50 transition-all duration-300"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Us Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}