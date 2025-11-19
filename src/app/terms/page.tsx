'use client';

import React from 'react';
import { useLocale } from '@/hooks/useLocale';
import Link from 'next/link';

export default function TermsOfServicePage() {
  const { t, locale } = useLocale();
  const basePath = locale === 'en' ? '/en' : '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 to-emerald-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('terms.title')}
            </h1>
            <p className="text-xl text-green-100 mb-8">
              {t('terms.subtitle')}
            </p>
            <div className="bg-white/20 backdrop-blur-sm inline-block px-6 py-3 rounded-full text-white">
              <p className="text-sm">{t('terms.lastUpdated')}: 19 July 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Company Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('contactPage.info.title')}</h2>
              <div className="space-y-2 text-gray-600">
                <p><strong>{t('privacy.company.name')}</strong></p>
                <p>{t('address')}: {t('privacy.company.address')}</p>
              </div>
            </div>

            {/* Acceptance of Terms */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. {t('terms.acceptance.title')}</h2>
              <p className="text-gray-600">{t('terms.acceptance.content')}</p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. {t('terms.services.title')}</h2>
              <p className="text-gray-600 mb-4">{t('terms.services.description.content')}</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.services.description.list.domestic')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.services.description.list.office')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.services.description.list.deep')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.services.description.list.post')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.services.description.list.luxury')}</span>
                </li>
              </ul>
            </div>

            {/* Obligations */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. {t('terms.responsibilities.title')}</h2>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('terms.responsibilities.our.title')}</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.responsibilities.our.professional')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.responsibilities.our.schedule')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.responsibilities.our.trained')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.responsibilities.our.equipment')}</span>
                </li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('terms.responsibilities.client.title')}</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.responsibilities.client.access')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.responsibilities.client.hazards')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.responsibilities.client.payment')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.responsibilities.client.pets')}</span>
                </li>
              </ul>
            </div>

            {/* Pricing and Payment */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. {t('terms.pricing.title')}</h2>
              <p className="text-gray-600 mb-4">{t('terms.pricing.rates.content')}</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.pricing.additional.list.extra')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.pricing.payment.content')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.pricing.additional.title')}</span>
                </li>
              </ul>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. {t('terms.booking.cancellation.title')}</h2>
              <p className="text-gray-600 mb-4">{t('terms.booking.cancellation.content')}</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.booking.cancellation.fee')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.booking.rescheduling.content')}</span>
                </li>
              </ul>
            </div>

            {/* Liability and Insurance */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. {t('terms.liability.title')}</h2>
              <p className="text-gray-600 mb-4">{t('terms.liability.coverage.content')}</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.liability.limitations.content')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.liability.claims.content')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('terms.liability.limitations.list.pre')}</span>
                </li>
              </ul>
            </div>

            {/* Termination */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. {t('terms.termination.title')}</h2>
              <p className="text-gray-600">{t('terms.termination.content')}</p>
            </div>

            {/* Legal Jurisdiction */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.governing.title')}</h2>
              <p className="text-gray-600 mb-4">{t('terms.governing.content')}</p>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.contact.title')}</h2>
              <p className="text-gray-600 mb-6">{t('terms.contact.content')}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href={`${basePath}/contact`}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full text-center hover:shadow-lg transition-all duration-300 inline-block"
                >
                  {t('contactUs')}
                </Link>
                <a 
                  href="mailto:infocleaninglunex@gmail.com"
                  className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-full text-center hover:bg-green-600 hover:text-white transition-all duration-300 inline-block"
                >
                  infocleaninglunex@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}