'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, Building2, Home, Hammer, Crown, Sparkles, CheckCircle } from 'lucide-react'
import { useLocale } from '@/hooks/useLocale'
import { BookingIntegration } from '@/components/booking/BookingIntegration'
import { bookingConfig } from '@/lib/config/booking'

export default function BookingPage() {
  const { t } = useLocale()
  const [showInlineBooking, setShowInlineBooking] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const services = [
    {
      id: 'office',
      icon: <Building2 className="h-6 w-6" />,
      title: t('services.office.title'),
      description: t('services.office.subtitle'),
      duration: '2-4 hours'
      // Removed eventSlug - will use main calendar
    },
    {
      id: 'domestic',
      icon: <Home className="h-6 w-6" />,
      title: t('services.domestic.title'),
      description: t('services.domestic.subtitle'),
      duration: '1-3 hours'
    },
    {
      id: 'postRenovation',
      icon: <Hammer className="h-6 w-6" />,
      title: t('services.postRenovation.title'),
      description: t('services.postRenovation.subtitle'),
      duration: '3-6 hours'
    },
    {
      id: 'luxury',
      icon: <Crown className="h-6 w-6" />,
      title: t('services.luxury.title'),
      description: t('services.luxury.subtitle'),
      duration: '2-5 hours'
    },
    {
      id: 'deep',
      icon: <Sparkles className="h-6 w-6" />,
      title: t('services.deep.title'),
      description: t('services.deep.subtitle'),
      duration: '4-8 hours'
    },
    {
      id: 'maintenance',
      icon: <Calendar className="h-6 w-6" />,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.subtitle'),
      duration: t('bookingPage.maintenance.duration')
    }
  ]

  const handleServiceBooking = (serviceId: string) => {
    // If clicking the same service, toggle the inline booking
    if (selectedService === serviceId && showInlineBooking) {
      setShowInlineBooking(false)
      setSelectedService(null)
    } else {
      setSelectedService(serviceId)
      setShowInlineBooking(true)
      // Scroll to booking section
      setTimeout(() => {
        document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const handleCloseInlineBooking = () => {
    setShowInlineBooking(false)
    setSelectedService(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('bookingPage.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('bookingPage.subtitle')}
          </p>
        </div>

        {/* Main Booking Button - Always show when no inline booking is active */}
        {!showInlineBooking && (
          <div className="text-center mb-12">
            {bookingConfig.cal.username.trim() !== '' ? (
              <BookingIntegration
                service="cal"
                calUsername={bookingConfig.cal.username}
                inline={false}
                primaryColor="#9333ea"
              />
            ) : (
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8"
                onClick={() => window.location.href = 'https://wa.me/393277791867'}
              >
                {t('bookingPage.bookAppointment')}
              </Button>
            )}
          </div>
        )}

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    {service.icon}
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration}</span>
                </div>
                {bookingConfig.cal.username.trim() !== '' ? (
                  <Button
                    className="w-full"
                    onClick={() => handleServiceBooking(service.id)}
                    variant={selectedService === service.id ? "default" : "outline"}
                  >
                    {t('bookingPage.bookService')}
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => window.location.href = 'https://wa.me/393277791867'}
                    variant="outline"
                  >
                    {t('bookingPage.bookService')}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Inline Booking Widget */}
        {showInlineBooking && selectedService && (
          <div id="booking-widget" className="mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{t('bookingPage.selectTimeSlot')}</CardTitle>
                    <CardDescription>
                      {t('bookingPage.selectedService')}: {services.find(s => s.id === selectedService)?.title}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCloseInlineBooking}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {bookingConfig.cal.username.trim() !== '' ? (
                  <BookingIntegration
                    key={`cal-${selectedService}`} // Force re-render with unique key
                    service="cal"
                    calUsername={bookingConfig.cal.username}
                    // Removed calEventSlug - using main calendar for all services
                    inline={true}
                    primaryColor="#9333ea"
                    backgroundColor="#ffffff"
                    textColor="#374151"
                  />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">
                      {t('bookingPage.preferCall.description')}
                    </p>
                    <Button variant="default" size="lg" onClick={() => window.location.href = 'https://wa.me/393277791867'}>
                      📞 +39 327 779 1867
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Show main booking button again if inline booking is active */}
        {showInlineBooking && (
          <div className="text-center mb-12">
            <p className="text-sm text-gray-600 mb-4">Oppure usa il pulsante principale per prenotare</p>
            {bookingConfig.cal.username.trim() !== '' ? (
              <BookingIntegration
                service="cal"
                calUsername={bookingConfig.cal.username}
                inline={false}
                primaryColor="#9333ea"
              />
            ) : (
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8"
                onClick={() => window.location.href = 'https://wa.me/393277791867'}
              >
                {t('bookingPage.bookAppointment')}
              </Button>
            )}
          </div>
        )}

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <CheckCircle className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">{t('bookingPage.benefits.instantConfirmation.title')}</h3>
              <p className="text-sm text-gray-600">
                {t('bookingPage.benefits.instantConfirmation.description')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Calendar className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">{t('bookingPage.benefits.flexibleScheduling.title')}</h3>
              <p className="text-sm text-gray-600">
                {t('bookingPage.benefits.flexibleScheduling.description')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold mb-2">{t('bookingPage.benefits.easyRescheduling.title')}</h3>
              <p className="text-sm text-gray-600">
                {t('bookingPage.benefits.easyRescheduling.description')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="mt-12">
          <CardContent className="text-center py-8">
            <h3 className="text-xl font-semibold mb-4">{t('bookingPage.preferCall.title')}</h3>
            <p className="text-gray-600 mb-4">
              {t('bookingPage.preferCall.description')}
            </p>
            <Button variant="outline" size="lg" onClick={() => window.location.href = 'https://wa.me/393277791867'}>
              📞 +39 327 779 1867
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}