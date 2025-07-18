'use client'

import { useState } from 'react'
import { useLocale } from '@/hooks/useLocale'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react'
import GoogleMap from '@/components/ui/GoogleMap'

export default function ContactPage() {
  const { t } = useLocale()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData)
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('contactPage.title')}
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('contactPage.subtitle')}
          </p>
          <p className="text-lg text-blue-200 max-w-3xl mx-auto">
            {t('contactPage.description')}
          </p>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-800">
                {t('contactPage.info.title')}
              </h2>
              <p className="text-gray-600 mb-8">
                {t('contactPage.info.subtitle')}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {t('contactPage.info.address.title')}
                    </h3>
                    <div className="text-gray-600">
                      <p>{t('contactPage.info.address.line1')}</p>
                      <p>{t('contactPage.info.address.line2')}</p>
                      <p>{t('contactPage.info.address.city')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {t('contactPage.info.phone.title')}
                    </h3>
                    <div className="text-gray-600">
                      <p>{t('contactPage.info.phone.number')}</p>
                      <p className="text-sm text-blue-600">{t('contactPage.info.phone.whatsapp')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {t('contactPage.info.email.title')}
                    </h3>
                    <div className="text-gray-600">
                      <p>{t('contactPage.info.email.address')}</p>
                      <p className="text-sm text-blue-600">{t('contactPage.info.email.response')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {t('contactPage.info.hours.title')}
                    </h3>
                    <div className="text-gray-600 space-y-1">
                      <p>{t('contactPage.info.hours.weekdays')}</p>
                      <p>{t('contactPage.info.hours.saturday_hours')}</p>
                      <p>{t('contactPage.info.hours.sunday_hours')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-800">
                {t('contactPage.form.title')}
              </h2>
              <p className="text-gray-600 mb-8">
                {t('contactPage.form.subtitle')}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contactPage.form.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('contactPage.form.namePlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contactPage.form.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('contactPage.form.emailPlaceholder')}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contactPage.form.phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('contactPage.form.phonePlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contactPage.form.subject')} *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">{t('contactPage.form.selectSubject')}</option>
                      <option value="office">{t('contactPage.form.subjectOptions.office')}</option>
                      <option value="domestic">{t('contactPage.form.subjectOptions.domestic')}</option>
                      <option value="postRenovation">{t('contactPage.form.subjectOptions.postRenovation')}</option>
                      <option value="luxury">{t('contactPage.form.subjectOptions.luxury')}</option>
                      <option value="deep">{t('contactPage.form.subjectOptions.deep')}</option>
                      <option value="maintenance">{t('contactPage.form.subjectOptions.maintenance')}</option>
                      <option value="quote">{t('contactPage.form.subjectOptions.quote')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contactPage.form.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder={t('contactPage.form.messagePlaceholder')}
                  ></textarea>
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">
                          {t('contactPage.form.success.title')}
                        </h3>
                        <p className="text-sm text-green-700 mt-1">
                          {t('contactPage.form.success.description')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <XCircle className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          {t('contactPage.form.error.title')}
                        </h3>
                        <p className="text-sm text-red-700 mt-1">
                          {t('contactPage.form.error.description')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  {isSubmitting ? t('contactPage.form.sending') : t('contactPage.form.submit')}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t('contactPage.map.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('contactPage.map.subtitle')}
            </p>
          </div>
          <div className="relative">
            <GoogleMap
              center={{ lat: 41.8902, lng: 12.4922 }} // Rome coordinates
              zoom={16}
              height="450px"
              className="rounded-lg shadow-xl"
              markers={[
                {
                  position: { lat: 41.8902, lng: 12.4922 },
                  title: 'Lunex Cleaning Services',
                  description: 'Via Example 123, Rome - Professional cleaning services for offices and homes'
                }
              ]}
            />
            <div className="absolute bottom-4 left-4 right-4 flex gap-4 justify-center">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=41.8902,12.4922`, '_blank')}
              >
                {t('contactPage.map.directions')}
              </Button>
              <Button
                variant="outline"
                className="bg-white border-blue-600 text-blue-600 hover:bg-blue-50 shadow-lg"
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=41.8902,12.4922`, '_blank')}
              >
                {t('contactPage.map.viewLarger')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('contactPage.cta.title')}
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            {t('contactPage.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3">
              {t('contactPage.cta.button')}
            </Button>
            <span className="text-blue-100">{t('contactPage.cta.or')}</span>
            <a href="tel:+393277791867">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                {t('contactPage.cta.call')}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}